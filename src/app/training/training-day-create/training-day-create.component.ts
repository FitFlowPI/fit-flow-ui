import {AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { TableModule } from "primeng/table";
import { ChipsModule } from "primeng/chips";
import { PaginatorModule } from "primeng/paginator";
import { NgIf, NgStyle } from "@angular/common";
import { ButtonDirective } from "primeng/button";
import { Ripple } from "primeng/ripple";
import { Exercise } from "../../models/exercise.model";
import { InputGroupModule } from "primeng/inputgroup";
import {Router, RouterLink} from '@angular/router';
import { TrainingSheetService } from '../../services/training-sheet.service'; // Import your service
import { ButtonComponent } from '../../shared/button/button.component';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faAdd, faCancel, faCheck, faPencil, faPlus} from "@fortawesome/free-solid-svg-icons";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faX} from "@fortawesome/free-solid-svg-icons/faX";
import {FloatingCardComponent} from "../../shared/floating-card/floating-card.component";
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute

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
  constructor(private router: Router, private trainingSheetService: TrainingSheetService, private route: ActivatedRoute) { }


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

  ngOnInit() {
    this.checkViewportWidth();
    this.checkResponsiveness();
  }

  ngAfterViewInit() {
    this.isMobile = window.innerWidth <= this.mobileWidth;
    this.checkResponsiveness();
  }

  ngAfterViewChecked() {
    if (this.trainingDayNameInput) {
      this.trainingDayNameInput.nativeElement.focus(
        {preventScroll: true, focusVisible: true} as any
      );
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize () {
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

  submit() {
    const storedCharts = JSON.parse(localStorage.getItem('charts') || '[]');

    // Determine the series name based on the input or generate a default name
    const nextSeriesName = this.trainingDayName || `Série ${String.fromCharCode(65 + storedCharts.length)}`;

    // Define the new chart with its name and exercises
    const newChart = {
      id: Date.now(),  // Unique ID
      name: nextSeriesName,
      exercises: this.exercises
    };

    // Add the new chart to the service and save it
    this.trainingSheetService.updateTrainingDayList([...storedCharts, newChart]);

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
