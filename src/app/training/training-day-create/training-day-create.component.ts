import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TableModule } from "primeng/table";
import { ChipsModule } from "primeng/chips";
import { PaginatorModule } from "primeng/paginator";
import { NgIf } from "@angular/common";
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
import {TrainingDay} from "../../models/training-day.model";
import {ExerciseRepsAndSets} from "../../models/exercise-reps-and-sets.model";
import { DropdownModule } from 'primeng/dropdown';
import { ExerciseService } from '../../services/exercise.service';
import { TrainingDayService } from '../../services/training-day.service';
import { ToastService } from '../../services/toast.service';

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
    FaIconComponent,
    RouterLink,
    FloatingCardComponent,
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
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private trainingDayService: TrainingDayService,
    private toastService: ToastService
  ) { }

  trainingDayName?: string = "Treino A";
  copiedTrainingDayName?: string;
  exercises: ExerciseRepsAndSets[] = [];
  clonedExercises: { [s: string]: ExerciseRepsAndSets } = {};
  mobileWidth: number = 600;
  isMobile: boolean = false;
  isEditingName: boolean = false;
  isShowingCard: boolean = false;

  groupedExercises: any[] = [];
  selectedExercise: any;
  editExercise: any;

  numberInputLayout: 'vertical' | 'horizontal' = 'horizontal';
  showId: boolean = true;

  // Add the `isEditing` property
  isEditing: boolean = false;

  ngOnInit() {
    this.loadExercises();
    this.checkViewportWidth();
    this.checkResponsiveness();
    const trainingDayId = this.route.snapshot.paramMap.get('trainingDayId');
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
    console.log('Loading exercises...');
    this.exerciseService.getAllDefaultExercises().subscribe(
      (response) => {
        console.log('API Response:', response); // Log the response to inspect it
        
        // Extract exercises array from response.data
        const exercises = response.data;
        
        // Call the method to group exercises by category
        const groupedExercises = this.groupExercisesByCategory(exercises);
  
        // Bind grouped exercises
        this.groupedExercises = groupedExercises;
        console.log('Grouped Exercises:', this.groupedExercises); // Log grouped exercises
      },
      (error) => {
        console.error('Error loading exercises:', error);
      }
    );
  }
  
  // Helper method to group exercises by category
  groupExercisesByCategory(exercises: any[]): any[] {
    if (!Array.isArray(exercises)) {
      console.error('Exercises is not an array:', exercises);
      return [];
    }
  
    const grouped: any[] = [];
  
    exercises.forEach((exercise: any) => {
      const category = grouped.find((group: any) => group.label === exercise.category);
  
      if (category) {
        // Push exercise into the items array under the existing category
        category.items.push({
          label: exercise.name,
          value: exercise.name,
          exerciseId: exercise.id, // Add the exercise ID here
        });
      } else {
        // Create a new category and push the exercise into its items array
        grouped.push({
          label: exercise.category,
          value: exercise.category, // Assuming category as value, adjust as needed
          items: [
            {
              label: exercise.name,
              value: exercise.name,
              exerciseId: exercise.id, // Add the exercise ID here
            },
          ],
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
    this.editExercise = { ...exercise };
  }

  onRowEditSave(editExercise: ExerciseRepsAndSets) {
    // Find the exercise in the exercises array by its ID
    const updatedExercise = this.exercises.find(e => e.id === editExercise.id);
  
    if (updatedExercise) {
      
      // Update the exercise with the new values from editExercise
      updatedExercise.name = editExercise.name; // Should be properly updated now
      updatedExercise.series = editExercise.series;
      updatedExercise.repetitions = editExercise.repetitions;
      updatedExercise.exerciseId = editExercise.exerciseId;
      console.log('Updated exercise:', editExercise); // Log to check the updated values
    }
  
    // After saving, remove the cloned exercise (no longer needed)
    delete this.clonedExercises[editExercise.id];
  }
  

  onRowEditCancel(exercise: ExerciseRepsAndSets, index: number) {
    this.exercises[index] = this.clonedExercises[exercise.id];
    delete this.clonedExercises[exercise.id];
  }

  newExercise: ExerciseRepsAndSets = { id: 0, name: '', series: 0, repetitions: 0 };

  addNewExercise() {
    if (this.selectedExercise && this.newExercise.series > 0 && this.newExercise.repetitions > 0) {
      const exerciseName = typeof this.selectedExercise === 'string' ? this.selectedExercise : this.selectedExercise?.value;
  
      if (!exerciseName) {
        console.error('Exercise name is invalid or not selected.');
        return;
      }
  
      console.log('Adding new exercise:', exerciseName);
  
      // Define the type of `item` in `group.items` if not already done
      let exerciseId: string | undefined; // Make exerciseId a string to match the expected type
  
      for (const group of this.groupedExercises) {
        const foundExercise = group.items.find((item: { label: string; exerciseId: string }) => item.label === exerciseName);  // Explicit type for `item`
        if (foundExercise) {
          exerciseId = foundExercise.exerciseId; // Correct exercise ID from grouped data (string type)
          break;
        }
      }
  
      if (exerciseId === undefined) {
        console.error('Could not find exercise ID for selected exercise.');
        return;
      }
  
      // Create the new exercise object with a temporary ID for table display (local ID)
      const newExercise: ExerciseRepsAndSets = {
        id: this.exercises.length + 1,  // Use sequential ID for display purposes in the table
        name: exerciseName,             // Use the selected exercise name
        series: this.newExercise.series,
        repetitions: this.newExercise.repetitions,
        exerciseId: exerciseId,         // Store the correct ID (as string) for backend submission
      };
  
      // Add the new exercise to the exercises array
      this.exercises.push(newExercise);
  
      // Reset the inputs and selected exercise
      this.newExercise = { id: 0, name: '', series: 0, repetitions: 0 };
      this.selectedExercise = null; // Clear the dropdown selection
      this.isShowingCard = false;
    } else {
      console.error('Invalid input. Ensure the dropdown is selected and all fields are filled.', {
        selectedExercise: this.selectedExercise,
        newExercise: this.newExercise,
      });
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

    // Ensure storedCharts is typed as an array of TrainingDay objects
    const storedChartsRaw = localStorage.getItem('charts');

    const storedCharts: TrainingDay[] = storedChartsRaw ? JSON.parse(storedChartsRaw) : [];

    // Find the TrainingDay object with the matching ID
    const trainingDay = storedCharts.find((trainingDay: TrainingDay) => trainingDay.id.toString() === trainingDayId);

    if (trainingDay) {
      // Assign the name and exercises from the found trainingDay
      this.trainingDayName = trainingDay.name;
      this.exercises = trainingDay.exercises;
    } else {
    }
  }

  submit() {
    console.log('Submit button clicked.');
  
    // Determine the next series name
    const nextSeriesName = this.trainingDayName || `Série ${String.fromCharCode(65 + (this.exercises.length + 1))}`;
    console.log('Next series name:', nextSeriesName);
  
    // Build the payload for the backend
    const trainingDay = {
      id: this.isEditing ? Number(this.route.snapshot.paramMap.get('trainingDayId')!) : undefined, // Ensure ID is a number
      name: nextSeriesName, // Training day name
      creationDate: new Date(), // Add the creation date
      exercises: this.exercises.map((exercise) => ({
        exerciseId: exercise.id, // Pass the exercise ID
        series: exercise.series, // Pass the series value
        repetitions: exercise.repetitions, // Pass the repetitions value
        // Do not send weight and restInterval as per the requirement
      })),
    };
  
    console.log('Built training day object:', trainingDay);
  
    // Check if we're editing or creating
    if (this.isEditing) {
      console.log('Editing mode is active.');
      const trainingDayId = this.route.snapshot.paramMap.get('trainingDayId');
      console.log('Training day ID retrieved from route:', trainingDayId);
  
      if (trainingDayId) {
        console.log('Calling updateTrainingDay with:', trainingDayId, trainingDay);
        this.trainingDayService.updateTrainingDay(trainingDayId, trainingDay).subscribe({
          next: () => {
            console.log('Training day successfully updated.');
            this.toastService.showSuccess('Training day updated successfully.');
          },
          error: (err) => {
            console.error('Error updating training day:', err);
            this.toastService.showError('Failed to update the training day.');
          },
        });
      } else {
        console.warn('No training day ID found in route for editing.');
      }
    } else {
      console.log('Creating a new training day.');
      console.log('Calling createTrainingDay with:', trainingDay);
      this.trainingDayService.createTrainingDay(trainingDay).subscribe({
        next: (response) => {
          console.log('Training day successfully created. Response:', response);
          this.toastService.showSuccess('Training day created successfully.');
        },
        error: (err) => {
          console.error('Error creating training day:', err);
          this.toastService.showError('Failed to create the training day.');
        },
      });
    }
  }
  
  
  
  

  protected readonly faAdd = faAdd;
  protected readonly faEdit = faEdit;
  protected readonly faPencil = faPencil;
  protected readonly faCheck = faCheck;
  protected readonly faCancel = faCancel;
  protected readonly faX = faX;
  protected readonly faPlus = faPlus;
}
