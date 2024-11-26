import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TableModule } from "primeng/table";
import { ChipsModule } from "primeng/chips";
import { PaginatorModule } from "primeng/paginator";
import { NgIf, NgStyle } from "@angular/common";
import { ButtonDirective } from "primeng/button";
import { Ripple } from "primeng/ripple";
import { Exercise } from "../../models/exercise.model";
import { InputGroupModule } from "primeng/inputgroup";
import { Router, RouterLink } from '@angular/router';
import { TrainingSheetService } from '../../services/training-sheet.service'; // Import your service
import { ButtonComponent } from '../../shared/button/button.component';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faAdd, faCancel, faCheck, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faX } from "@fortawesome/free-solid-svg-icons/faX";
import { FloatingCardComponent } from "../../shared/floating-card/floating-card.component";
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { TrainingDay } from '../../models/training-day.model';

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

  trainingDayName?: string = "Treino A";
  copiedTrainingDayName?: string;
  exercises: Exercise[] = [];
  clonedExercises: { [s: string]: Exercise } = {};
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
    const chartId = this.route.snapshot.paramMap.get('chartId');
    console.log("chartId from route:", chartId); // Log the chartId from the route
    if (chartId) {
      this.isEditing = true; // Set `isEditing` to true when editing an existing chart
      this.loadTrainingDay(chartId);
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

  onRowEditInit(exercise: Exercise) {
    this.clonedExercises[exercise.id] = { ...exercise };
  }

  onRowEditSave(exercise: Exercise) {
    // Save logic for editing an exercise (implement validation if necessary)
    delete this.clonedExercises[exercise.id];
  }

  onRowEditCancel(exercise: Exercise, index: number) {
    this.exercises[index] = this.clonedExercises[exercise.id];
    delete this.clonedExercises[exercise.id];
  }

  newExercise: Exercise = { id: 0, name: '', series: 0, repetitions: 0 };

  addNewExercise() {
    if (this.newExercise.name && this.newExercise.series && this.newExercise.repetitions) {
      const newExercise: Exercise = {
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

  showCard(exercise?: Exercise): void {
    this.isShowingCard = true;
    if (exercise) {
      this.onRowEditInit(exercise);
    }
  }

  convertRemToPx(remValue: number): number {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return remValue * rootFontSize;
  }

  loadTrainingDay(chartId: string) {
    console.log("Loading training day with chartId:", chartId); // Log the chartId used for loading
  
    // Ensure storedCharts is typed as an array of TrainingDay objects
    const storedChartsRaw = localStorage.getItem('charts');
    console.log("Raw stored charts from localStorage:", storedChartsRaw); // Log raw data from localStorage
  
    const storedCharts: TrainingDay[] = storedChartsRaw ? JSON.parse(storedChartsRaw) : [];
    console.log("Parsed stored charts:", storedCharts); // Log all stored charts in localStorage
  
    // Find the TrainingDay object with the matching ID
    const trainingDay = storedCharts.find((chart: TrainingDay) => chart.id.toString() === chartId);
    console.log("Found training day:", trainingDay); // Log the found training day
  
    if (trainingDay) {
      // Assign the name and exercises from the found trainingDay
      this.trainingDayName = trainingDay.name;
      this.exercises = trainingDay.exercises;
      console.log("Loaded exercises:", this.exercises); // Log the exercises loaded
    } else {
      console.log("No training day found with the provided chartId.");
    }
  }

  submit() {
    const storedCharts = JSON.parse(localStorage.getItem('charts') || '[]');
    console.log("Stored charts before submit:", storedCharts); // Log the charts before submitting
  
    // Determine the series name based on the input or generate a default name
    const nextSeriesName = this.trainingDayName || `Série ${String.fromCharCode(65 + storedCharts.length)}`;
  
    // Define the new chart with its name and exercises
    const newChart: TrainingDay = {
      id: this.isEditing ? this.route.snapshot.paramMap.get('chartId')! : Date.now().toString(), // Unique ID
      name: nextSeriesName,
      exercises: this.exercises,
      kcal: 0,
      timeInMinutes: 0
    };
  
    const chartId = this.route.snapshot.paramMap.get('chartId');
  
    if (chartId) {
      // Edit existing chart
      const index = storedCharts.findIndex((chart: TrainingDay) => chart.id.toString() === chartId); // Ensure IDs match as strings
  
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
