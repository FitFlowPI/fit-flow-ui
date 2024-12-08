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
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ExerciseService } from '../../services/exercise.service';

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
    CascadeSelectModule
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
    private exerciseService: ExerciseService,
    private route: ActivatedRoute
  ) { }

  trainingDayName?: string = "Treino A";
  copiedTrainingDayName?: string;
  exercises: ExerciseRepsAndSets[] = [];
  clonedExercises: { [s: string]: ExerciseRepsAndSets } = {};
  mobileWidth: number = 600;
  isMobile: boolean = false;
  isEditingName: boolean = false;
  isShowingCard: boolean = false;

  cascadeSelectData: any[] = [];
  groupedExercises: any[] = [];
  selectedExercise: any;

  numberInputLayout: 'vertical' | 'horizontal' = 'horizontal';
  showId: boolean = true;

  // Add the `isEditing` property
  isEditing: boolean = false;

  ngOnInit() {
    this.loadExercises();
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

  loadExercises() {
    this.exerciseService.getAllDefaultExercises().subscribe(
      (exercises: ExerciseRepsAndSets[]) => {
        // Group exercises by category
        const groupedExercises = this.groupExercisesByCategory(exercises);
        this.cascadeSelectData = groupedExercises;
        console.log('Grouped Exercises:', groupedExercises); // Log grouped data for debugging
      },
      (error) => {
        console.error('Error loading default exercises:', error); // Log errors for debugging
      }
    );
  }

  // Helper method to group exercises by category
  groupExercisesByCategory(exercises: ExerciseRepsAndSets[]) {
    const grouped: any[] = [];

    exercises.forEach(exercise => {
      const category = grouped.find(group => group.label === exercise.category);

      if (category) {
        category.children.push({
          label: exercise.name,
          value: exercise.id
        });
      } else {
        grouped.push({
          label: exercise.category,
          value: exercise.category,
          children: [{
            label: exercise.name,
            value: exercise.id
          }]
        });
      }
    });

    return grouped;
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
    this.clonedExercises[exercise.id] = { ...exercise };
  }

  onRowEditSave(exercise: ExerciseRepsAndSets) {
    // Save logic for editing an exercise (implement validation if necessary)
    delete this.clonedExercises[exercise.id];
  }

  onRowEditCancel(exercise: ExerciseRepsAndSets, index: number) {
    this.exercises[index] = this.clonedExercises[exercise.id];
    delete this.clonedExercises[exercise.id];
  }

  newExercise: ExerciseRepsAndSets = { id: 0, name: '', series: 0, repetitions: 0 };

  addNewExercise() {
    if (this.newExercise.name && this.newExercise.series && this.newExercise.repetitions) {
      const newExercise: ExerciseRepsAndSets = {
        ...this.newExercise,
        id: this.exercises.length + 1
      };

      this.exercises.push(newExercise);

      // Reset the inputs
      this.newExercise = { id: 0, name: '', series: 0, repetitions: 0 };
      this.isShowingCard = false;
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

    const storedCharts = JSON.parse(localStorage.getItem('trainingDays') || '[]');
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

    // Save the updated charts
    localStorage.setItem('charts', JSON.stringify(storedCharts));  // Directly update localStorage

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
