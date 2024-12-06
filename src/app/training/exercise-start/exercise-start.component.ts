import {Component, Input, ViewEncapsulation} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {
  faAngleDown,
  faBackwardStep,
  faBars, faCancel,
  faDumbbell,
  faPause,
  faPencil, faRepeat,
  faRotateLeft, faStopwatch
} from "@fortawesome/free-solid-svg-icons";
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
import {FormatTimePipe} from "../../shared/pipes/format-time.pipe";
import {TimerComponent} from "../../shared/timer/timer.component";
import {faStop} from "@fortawesome/free-solid-svg-icons/faStop";


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
    FormatTimePipe,
    TimerComponent,
  ],
  templateUrl: './exercise-start.component.html',
  styleUrl: './exercise-start.component.css'
})
export class ExerciseStartComponent {

  //TODO: esse exercício tem que ser puxado do banco
  exercise: ExerciseRepsAndSets = {id: 1, series: 4, name: 'Supino inclinado', repetitions: 12};
  isShowingTimers: boolean = false;
  isStopped: boolean = false;
  exerciseTimerState: 'stopped' | 'paused' | 'playing' | 'reset' = 'stopped';
  breakTimerState: 'stopped' | 'paused' | 'playing' | 'reset' = 'stopped';
  initialTime: number = -5000;
  exerciseTimer: number = this.initialTime;

  playTimer(): void {
    this.exerciseTimerState = 'playing';
  }

  stopTimer(): void {
    this.exerciseTimerState = 'stopped';
    this.breakTimerState = 'playing';
  }

  resetTimer(): void {
    this.exerciseTimerState = 'reset';
  }

  cancelTimer(): void {
    this.resetTimer();
    this.isShowingTimers = false;
  }

  pauseTimer() {
    this.exerciseTimerState = 'paused';
  }

  onExerciseTimerValueChange(currentValue: number): void {
    this.exerciseTimer = currentValue;
    // console.log(currentValue);
  }


  startExercise() {
    this.isShowingTimers = true;
  }

  isShowingBreakTimer(): boolean {
    return this.exerciseTimerState === 'stopped' && this.exerciseTimer > 0;
  }


  protected readonly faPencil = faPencil;
  protected readonly faForwardStep = faForwardStep;
  protected readonly faBackwardStep = faBackwardStep;
  protected readonly faPlay = faPlay;
  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faBars = faBars;

  protected readonly faStop = faStop;
  protected readonly faPause = faPause;
  protected readonly faRotateLeft = faRotateLeft;
  protected readonly faCancel = faCancel;
  protected readonly faStopwatch = faStopwatch;
  protected readonly faRepeat = faRepeat;
  protected readonly faDumbbell = faDumbbell;
}
