import {Component, Input, ViewEncapsulation} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faAngleDown, faBackwardStep, faBars, faDumbbell, faPencil} from "@fortawesome/free-solid-svg-icons";
import {ButtonComponent} from "../../shared/button/button.component";
import {faClock} from "@fortawesome/free-solid-svg-icons/faClock";
import {RouterLink} from "@angular/router";
import {ExerciseProgressBarComponent} from "../../shared/exercise-progress-bar/exercise-progress-bar.component";
import {Exercise} from "../../models/exercise.model";
import {ExerciseRepsAndSets} from "../../models/exercise-reps-and-sets.model";
import {faForwardStep} from "@fortawesome/free-solid-svg-icons/faForwardStep";
import {faPlay} from "@fortawesome/free-solid-svg-icons/faPlay";
import {ExerciseComponent} from "../../shared/exercise/exercise.component";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";


@Component({
  selector: 'app-exercise-start',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FaIconComponent,
    ButtonComponent,
    NgIf,
    RouterLink,
    ExerciseProgressBarComponent,
    ExerciseComponent,
  ],
  templateUrl: './exercise-start.component.html',
  styleUrl: './exercise-start.component.css'
})
export class ExerciseStartComponent {

  //TODO: esse exercício tem que ser puxado do banco
  public exercise: ExerciseRepsAndSets = {id: 1, series: 4, name: 'Supino inclinado', repetitions: 4};
  isShowingTimer: boolean = false;
  isStopped: boolean = false;


  startExercise() {
    this.isShowingTimer = true;
  }


  protected readonly faPencil = faPencil;
  protected readonly faForwardStep = faForwardStep;
  protected readonly faBackwardStep = faBackwardStep;
  protected readonly faPlay = faPlay;
  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faBars = faBars;
}
