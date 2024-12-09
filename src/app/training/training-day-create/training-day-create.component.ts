import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TableModule } from "primeng/table";
import { ChipsModule } from "primeng/chips";
import { PaginatorModule } from "primeng/paginator";
import { NgIf } from "@angular/common";
import { ButtonDirective } from "primeng/button";
import { Ripple } from "primeng/ripple";
import { InputGroupModule } from "primeng/inputgroup";
import { Router, RouterLink } from '@angular/router';
import { TrainingSheetService } from '../../services/training-sheet.service';// Import your service
import { ChangeDetectorRef } from '@angular/core';
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
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
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

// Adicionando uma variável para armazenar os exercícios originais
  originalExercises: any[] = [];

  loadExercises() {
    console.log('Loading exercises...');
    this.exerciseService.getAllDefaultExercises().subscribe(
      (response) => {
        console.log('API Response:', response); // Log the response to inspect it

        // Salva a lista original de exercícios
        this.originalExercises = response.data;

        // Agora, em vez de usar a lista filtrada diretamente, você pode usar a lista original para popular o dropdown
        const groupedExercises = this.groupExercisesByCategory(this.originalExercises);

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
        // Adicionando o objeto completo ao invés de apenas o nome
        category.items.push({
          label: exercise.name,
          value: exercise,  // Agora o valor é o objeto completo do exercício
          exerciseId: exercise.id,
        });
      } else {
        // Criando uma nova categoria e adicionando o objeto completo
        grouped.push({
          label: exercise.category,
          value: exercise.category,  // Mantendo o nome da categoria como label
          items: [
            {
              label: exercise.name,
              value: exercise,  // Agora o valor é o objeto completo
              exerciseId: exercise.id,
            },
          ],
        });
      }
    });

    return grouped;
  }


  // Aplicar filtro apenas na exibição (exemplo)
  getFilteredExercises() {
    // Supondo que você tenha um filtro baseado em categoria, por exemplo
    const filteredExercises = this.originalExercises.filter(exercise => {
      return exercise.category === 'Peito'; // Exemplo de filtro
    });

    // Depois, agrupe os exercícios filtrados para exibição
    return this.groupExercisesByCategory(filteredExercises);
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

    // Cria uma cópia isolada do exercício para edição
    this.editExercise = { ...exercise };

    // Log para verificar se a cópia foi realizada corretamente
    console.log('Cópia do exercício para edição:', this.editExercise);

    // Também loga a lista de exercícios para garantir que ela não foi alterada
    console.log('Lista de exercícios antes da edição:', this.exercises);
  }




  onRowEditSave(editExercise: ExerciseRepsAndSets) {
    // Verificando o exercício que está sendo editado
    console.log('Exercício editado:', editExercise);

    // Verificando o exercício selecionado no dropdown
    console.log('Exercício selecionado no dropdown:', this.selectedExercise);

    // Atualizando o exercício editado com os dados do exercício selecionado no dropdown
    editExercise.id = this.selectedExercise.id;
    editExercise.name = this.selectedExercise.name;
    editExercise.exerciseId = this.selectedExercise.id; // Garantir que o exerciseId também seja atualizado
    console.log('Exercício editado após atualização:', editExercise);

    // Encontrando o índice do exercício na lista
    const index = this.exercises.findIndex((ex) => ex?.id === editExercise?.id);
    console.log('Índice do exercício na lista:', index);

    // Se o exercício for encontrado, atualiza a lista
    if (index !== -1) {
      this.exercises[index] = { ...editExercise };  // Atualiza com os novos dados
      console.log('Lista de exercícios após a atualização:', this.exercises);
    } else {
      console.error('Exercício não encontrado para atualização.');
    }
  }



  logSelectedExercise() {
    console.log('Exercício selecionado:', this.editExercise);
    console.log('groupedExercises:', this.groupedExercises);
  }



  onRowEditCancel(exercise: ExerciseRepsAndSets, index: number) {
    this.exercises[index] = this.clonedExercises[exercise.id];
    delete this.clonedExercises[exercise.id];
  }

  newExercise: ExerciseRepsAndSets = { id: 0, name: '', series: 0, repetitions: 0 };

  addNewExercise() {
    if (this.selectedExercise && this.newExercise.series > 0 && this.newExercise.repetitions > 0) {
      // Obter o exercício completo
      const exercise = this.selectedExercise;

      // Obter o ID do exercício selecionado
      const exerciseId = exercise.id;

      // Agora você pode usar o objeto completo do exercício, incluindo o ID
      console.log('Exercício selecionado:', exercise);
      console.log('ID do exercício:', exerciseId);

      // Criar o novo exercício com todos os dados
      const newExercise: ExerciseRepsAndSets = {
        id: this.exercises.length + 1,  // Usando um ID local para a tabela
        name: exercise.name,            // Nome do exercício
        series: this.newExercise.series,
        repetitions: this.newExercise.repetitions,
        exerciseId: exerciseId,         // ID do exercício completo
      };

      // Adicionar o exercício à lista
      this.exercises.push(newExercise);

      // Resetar os campos e limpar a seleção do dropdown
      this.newExercise = { id: 0, name: '', series: 0, repetitions: 0 };
      this.selectedExercise = null; // Limpar a seleção
      this.isShowingCard = false;
    } else {
      console.error('Seleção inválida. Verifique os campos.');
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
