import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons/faPlay";
import {ButtonComponent} from "../../shared/button/button.component";
import {faRunning} from "@fortawesome/free-solid-svg-icons/faRunning";
import {faFire} from "@fortawesome/free-solid-svg-icons/faFire";
import {faClock} from "@fortawesome/free-solid-svg-icons/faClock";
import {TrainingDay} from "../../models/training-day.model";
import {buttonRipple} from "../../shared/button/buttonEffects";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faPencil} from "@fortawesome/free-solid-svg-icons";
import { TrainingSheetService } from '../../services/training-sheet.service';
import {Router, RouterLink} from '@angular/router'; // Import the Router service

@Component({
  selector: 'app-training-day',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FontAwesomeModule,
    NgIf,
    ButtonComponent,
    NgForOf,
    NgClass,
    RouterLink
  ],
  templateUrl: './training-day.component.html',
  styleUrl: './training-day.component.css'
})
export class TrainingDayComponent {

  constructor(private renderer: Renderer2, private trainingSheetService: TrainingSheetService, private router: Router) {} // Inject Router

  @ViewChild('summary') summary?: ElementRef<HTMLElement>;

  isExerciseListActive: boolean = false;
  isMenuActive: boolean = false;
  isHolding: boolean = false;

  private holdTimeOut: any;

  @Input({required: true}) chartData: TrainingDay = {
    name: '?',
    timeInMinutes: 0,
    kcal: 0,
    exercises: [],
    id: '0'
  };


  // TODO: change so the ID is automatic
  onClick(event: MouseEvent, trainingDayId: string) {
    if (!this.isHolding) {
      this.toggleActive();
    }
    this.isHolding = false;
    buttonRipple('series-card', event, this.renderer, this.summary!.nativeElement);

    // Pass the dynamic chart ID when clicked
    console.log('Clicked trainingDay ID:', trainingDayId);
  }

  onHoldStart() {
    this.holdTimeOut = setTimeout(() => {
      this.isMenuActive = !this.isMenuActive;
      this.isHolding = true;
    }, 700)
  }

  onHoldEnd() {
    clearInterval(this.holdTimeOut);
  }

  toggleActive() {
    this.isExerciseListActive = !this.isExerciseListActive;
  }

  onDeleteChart(trainingDayId: string) {
    this.trainingSheetService.deleteChart(trainingDayId);
  }

  onEditChart(trainingDayId: string) {
    // Navigate to the edit page with the trainingDayId as a route parameter
    this.router.navigate([`/training/training-day-create/${trainingDayId}`]);
  }


  onPlay(trainingDayId: string) {
    console.log('Navigating to: ', `training/exercise-select/${trainingDayId}`);
    this.router.navigate([`/training/exercise-select/${trainingDayId}`]);
  }

  protected readonly faPlay = faPlay;
  protected readonly faRunning = faRunning;
  protected readonly faFire = faFire;
  protected readonly faClock = faClock;
  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faEdit = faEdit;
  protected readonly faTrash = faTrash;
  protected readonly faPencil = faPencil;
}
