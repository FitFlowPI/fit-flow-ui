import {Component, Input, OnInit} from '@angular/core';
import {faDumbbell, faRepeat, faStopwatch} from "@fortawesome/free-solid-svg-icons";
import {faClock} from "@fortawesome/free-solid-svg-icons/faClock";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgClass, NgForOf, NgStyle} from "@angular/common";
import {Series} from "../../models/series";

@Component({
  selector: 'app-exercise-progress-bar',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf,
    NgClass,
    NgStyle
  ],
  templateUrl: './exercise-progress-bar.component.html',
  styleUrl: './exercise-progress-bar.component.css'
})
export class ExerciseProgressBarComponent implements OnInit{

  @Input() padding: string = '0';
  @Input({required: true}) numberOfSeries!: number;
  @Input() exerciseExecution: Array<Series> = [];

  public numberOfCompletedSeries: number = 0;

  ngOnInit(): void {
    //TODO: checar se já tem uma execução
    this.initializeExerciseExecution();
  }

  private initializeExerciseExecution(): void {
    this.exerciseExecution = Array.from({ length: this.numberOfSeries }, () => ({} as Series));
    console.log('exercise exercution: ', this.exerciseExecution);
  }

  formatTime(seconds?: number): string {

    if (!seconds || isNaN(seconds) || seconds < 0) {
      return '--:--';
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Pad minutes and seconds with leading zeros if necessary
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  calculateProgressLineHeight(): string {
    const height = Math.min((Math.max(this.numberOfCompletedSeries - 1, 0) * 100) / (this.numberOfSeries - 1), 100);
    return `${height}%`;
  }

  protected readonly faDumbbell = faDumbbell;
  protected readonly faClock = faClock;
  protected readonly faRepeat = faRepeat;
  protected readonly faStopwatch = faStopwatch;
}
