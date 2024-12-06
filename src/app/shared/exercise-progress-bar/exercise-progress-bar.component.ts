import {Component, Input, OnInit} from '@angular/core';
import {faDumbbell, faRepeat, faStopwatch} from "@fortawesome/free-solid-svg-icons";
import {faClock} from "@fortawesome/free-solid-svg-icons/faClock";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgClass, NgForOf, NgStyle} from "@angular/common";
import {Series} from "../../models/series";
import {FormatTimePipe} from "../pipes/format-time.pipe";

@Component({
  selector: 'app-exercise-progress-bar',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf,
    NgClass,
    NgStyle,
    FormatTimePipe
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

  calculateProgressLineHeight(): string {
    const height = Math.min((Math.max(this.numberOfCompletedSeries - 1, 0) * 100) / (this.numberOfSeries - 1), 100);
    return `${height}%`;
  }

  protected readonly faDumbbell = faDumbbell;
  protected readonly faClock = faClock;
  protected readonly faRepeat = faRepeat;
  protected readonly faStopwatch = faStopwatch;
}
