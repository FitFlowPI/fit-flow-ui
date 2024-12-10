import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TableModule } from "primeng/table";
import { ChipsModule } from "primeng/chips";
import { PaginatorModule } from "primeng/paginator";
import { NgIf, NgStyle } from "@angular/common";
import { ButtonDirective } from "primeng/button";
import { Ripple } from "primeng/ripple";
import { InputGroupModule } from "primeng/inputgroup";
import { Router, RouterLink } from '@angular/router';
import { TrainingSheetService } from '../../services/training-sheet.service'; // Import your service
import { ButtonComponent } from '../../shared/button/button.component';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faAdd, faCancel, faCheck, faPencil, faPlus} from "@fortawesome/free-solid-svg-icons";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faX} from "@fortawesome/free-solid-svg-icons/faX";
import {FloatingCardComponent} from "../../shared/floating-card/floating-card.component";
import {ExerciseComponent} from "../../shared/exercise/exercise.component";
import {TrainingDay} from "../../models/training-day.model";
import {ExerciseRepsAndSets} from "../../models/exercise-reps-and-sets.model";
import { groupedExercises } from './exercises-template';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-training-day-create',
  standalone: true,
  imports: [
    ButtonComponent,
    TableModule,
    ChipsModule,
    PaginatorModule,
    NgIf,
    ButtonDirective,
    Ripple,
    InputGroupModule,
    NgStyle,
    FaIconComponent,
    RouterLink,
    FloatingCardComponent,
    ExerciseComponent,
    DropdownModule
  ],
  templateUrl: './training-day-create.component.html',
  styleUrls: ['./training-day-create.component.scss', '../training-screens.css']
})
export class TrainingDayCreateComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('table') table?: ElementRef<Component>;
  @ViewChild('trainingDayNameInput', { static: false }) trainingDayNameInput?: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private trainingSheetService: TrainingSheetService,
    private route: ActivatedRoute
  ) { }

  groupedExercises = groupedExercises;
  selectedExercise: any;
  selectedExercise2: any;
  editExercise: any;

  trainingDayName?: string = "Treino A";
  copiedTrainingDayName?: string;
  exercises: ExerciseRepsAndSets[] = [];
  clonedExercises: { [s: string]: ExerciseRepsAndSets } = {};
  mobileWidth: number = 600;
  isMobile: boolean = false;
  isEditingName: boolean = false;
  isShowingCard: boolean = false;

  numberInputLayout: 'vertical' | 'horizontal' = 'horizontal';
  showId: boolean = true;

  // Add the `isEditing` property
  isEditing: boolean = false;

  ngOnInit() {
    this.checkViewportWidth();
    this.checkResponsiveness();
    const trainingDayId = this.route.snapshot.paramMap.get('trainingDayId');
    console.log("trainingDayId from route:", trainingDayId); // Log the trainingDayId from the route
    if (trainingDayId) {
      this.isEditing = true; // Set `isEditing` to true when editing an existing chart
      this.loadTrainingDay(trainingDayId);
    }
  }

  ngAfterViewInit() {
    this.isMobile = window.innerWidth <= this.mobileWidth;
    this.checkResponsiveness();
  }

  ngAfterViewChecked() {
    if (this.trainingDayNameInput) {
      this.trainingDayNameInput.nativeElement.focus(
        { preventScroll: true, focusVisible: true } as any
      );
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkViewportWidth();
    this.checkResponsiveness();
  }

  checkViewportWidth() {
    this.isMobile = window.innerWidth <= this.mobileWidth;
  }

  editTrainingDayName() {
    this.copiedTrainingDayName = this.trainingDayName;
    this.isEditingName = true;
  }

  confirmNewTrainingDayName() {
    this.isEditingName = false;
  }

  cancelNewTrainingDayName() {
    this.trainingDayName = this.copiedTrainingDayName;
    this.isEditingName = false;
  }

  isFieldsValid(): boolean {
    return this.newExercise.name !== '' && this.newExercise.series !== 0 && this.newExercise.repetitions !== 0;
  }

  checkResponsiveness() {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    if (window.innerWidth <= 680 * (rootFontSize / 16)) {
      this.numberInputLayout = 'vertical';
    } else {
      this.numberInputLayout = 'horizontal';
    }
    this.showId = !(window.innerWidth <= 540 * (rootFontSize / 16));
  }

  onRowEditInit(exercise: ExerciseRepsAndSets) {
    // Log para verificar os dados do exercício original
    console.log('Iniciando edição para o exercício:', exercise);

    this.clonedExercises[exercise.id] = { ...exercise };

    // Cria uma cópia isolada do exercício para edição
    this.editExercise = { ...exercise };

    // Log para verificar se a cópia foi realizada corretamente
    console.log('Cópia do exercício para edição:', this.editExercise);

    // Também loga a lista de exercícios para garantir que ela não foi alterada
    console.log('Lista de exercícios antes da edição:', this.exercises);
  }

  onRowEditSave(editExercise: ExerciseRepsAndSets) {
    console.log('Edited exercise:', editExercise);
  
    // Ensure you find the selected exercise from the dropdown
    const selectedExerciseDetails = this.groupedExercises
      .flatMap(category => category.items)
      .find(item => item.value === this.selectedExercise2);
  
    if (selectedExerciseDetails) {
      // Find the parent category for the exercise
      const selectedCategory = this.groupedExercises.find(category => 
        category.items.some(item => item.value === this.selectedExercise2)
      );
  
      if (selectedCategory) {
        // Update the exercise details
        editExercise.name = selectedExerciseDetails.label;
        editExercise.description = selectedExerciseDetails.description;
        editExercise.media = selectedExerciseDetails.media;
        editExercise.category = selectedCategory.label; // Set the parent category (e.g., "Peito")
  
        // Now update the exercise in the list
        const index = this.exercises.findIndex((ex) => ex.id === editExercise.id);
        if (index !== -1) {
          this.exercises[index] = { ...editExercise }; // Replace the edited exercise
        }
      } else {
        console.error('Parent category not found.');
      }
    } else {
      console.error('Selected exercise details not found.');
    }
  }

  onRowEditCancel(exercise: ExerciseRepsAndSets, index: number) {
    this.exercises[index] = this.clonedExercises[exercise.id];
    delete this.clonedExercises[exercise.id];
  }

  newExercise: ExerciseRepsAndSets = { id: 0, name: '', series: 0, repetitions: 0 };

  addNewExercise() {
    if (this.selectedExercise && this.newExercise.series > 0 && this.newExercise.repetitions > 0) {
      // Find the corresponding exercise category
      const selectedCategory = this.groupedExercises.find(category => 
        category.items.some(item => item.value === this.selectedExercise)
      );
    
      // Find the specific exercise details
      const exerciseDetails = selectedCategory?.items.find(item => item.value === this.selectedExercise);
    
      if (exerciseDetails && selectedCategory) {
        // Now create the new exercise object with description, media, and parent category
        const newExercise: ExerciseRepsAndSets = {
          id: this.exercises.length + 1,
          name: exerciseDetails.label, // Exercise name (e.g., Supino Reto)
          series: this.newExercise.series,
          repetitions: this.newExercise.repetitions,
          description: exerciseDetails.description, // Add description
          media: exerciseDetails.media, // Add media
          category: selectedCategory.label, // Use the parent category label (e.g., "Peito")
        };
    
        // Add the exercise to the list
        this.exercises.push(newExercise);
    
        // Reset the fields
        this.newExercise = { id: 0, name: '', series: 0, repetitions: 0 };
        this.selectedExercise = null;
        this.isShowingCard = false;
      } else {
        console.error('Exercise or category not found.');
      }
    } else {
      console.error('Invalid selection. Please check the fields.');
    }
  }
  

  cancelEditExercise() {
    this.newExercise = { id: 0, name: '', series: 0, repetitions: 0 };
    this.isShowingCard = false;
  }

  showCard(exercise?: ExerciseRepsAndSets): void {
    this.isShowingCard = true;
    if (exercise) {
      this.onRowEditInit(exercise);
    }
  }

  convertRemToPx(remValue: number): number {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return remValue * rootFontSize;
  }

  loadTrainingDay(trainingDayId: string) {
    console.log("Loading training day with trainingDayId:", trainingDayId); // Log the trainingDayId used for loading

    // Ensure storedCharts is typed as an array of TrainingDay objects
    const storedChartsRaw = localStorage.getItem('charts');
    console.log("Raw stored charts from localStorage:", storedChartsRaw); // Log raw data from localStorage

    const storedCharts: TrainingDay[] = storedChartsRaw ? JSON.parse(storedChartsRaw) : [];
    console.log("Parsed stored charts:", storedCharts); // Log all stored charts in localStorage

    // Find the TrainingDay object with the matching ID
    const trainingDay = storedCharts.find((trainingDay: TrainingDay) => trainingDay.id.toString() === trainingDayId);
    console.log("Found training day:", trainingDay); // Log the found training day

    if (trainingDay) {
      // Assign the name and exercises from the found trainingDay
      this.trainingDayName = trainingDay.name;
      this.exercises = trainingDay.exercises;
      console.log("Loaded exercises:", this.exercises); // Log the exercises loaded
    } else {
      console.log("No training day found with the provided trainingDayId.");
    }
  }

  submit() {
    // Retrieve the existing training days from localStorage, or use an empty array if not found
    const storedCharts = JSON.parse(localStorage.getItem('charts') || '[]');
    console.log("Stored charts before submit:", storedCharts); // Log the charts before submitting
  
    // Determine the series name based on the input or generate a default name
    const nextSeriesName = this.trainingDayName || `Série ${String.fromCharCode(65 + storedCharts.length)}`;
  
    // Define the new chart with its name and exercises
    const newChart: TrainingDay = {
      id: this.isEditing ? this.route.snapshot.paramMap.get('trainingDayId')! : Date.now().toString(), // Unique ID
      name: nextSeriesName,
      exercises: this.exercises,
      kcal: 0,
      timeInMinutes: 0
    };
  
    const trainingDayId = this.route.snapshot.paramMap.get('trainingDayId');
  
    if (trainingDayId) {
      // Edit existing chart
      const index = storedCharts.findIndex((trainingDay: TrainingDay) => trainingDay.id.toString() === trainingDayId); // Ensure IDs match as strings
  
      if (index !== -1) {
        // Replace the chart at the found index with the new one
        storedCharts[index] = newChart;
      } else {
        console.error("Training day not found to edit.");
      }
    } else {
      // Create a new chart
      storedCharts.push(newChart);
    }
  
    // Save the updated charts back to localStorage
    localStorage.setItem('charts', JSON.stringify(storedCharts));  // Update localStorage with the new chart data
  
    // Notify the service to update the charts observable
    this.trainingSheetService.updateTrainingDayList(storedCharts);
  
    // Reset the inputs
    this.trainingDayName = ''; // Clear trainingDayName input field
    this.exercises = [];  // Clear exercises array
  
    // Navigate to the chart selection page
    this.router.navigate(['/training/training-day-select']);
  }

  protected readonly faAdd = faAdd;
  protected readonly faEdit = faEdit;
  protected readonly faPencil = faPencil;
  protected readonly faCheck = faCheck;
  protected readonly faCancel = faCancel;
  protected readonly faX = faX;
  protected readonly faPlus = faPlus;
}
