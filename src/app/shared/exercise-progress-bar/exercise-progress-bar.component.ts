import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {faDumbbell, faRepeat, faStopwatch} from "@fortawesome/free-solid-svg-icons";
import {faClock} from "@fortawesome/free-solid-svg-icons/faClock";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgClass, NgForOf, NgStyle} from "@angular/common";
import {Series} from "../../models/series";
import {FormatTimePipe} from "../pipes/format-time.pipe";
import {ExerciseExecutionModel} from "../../models/exercise-execution.model";

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
export class ExerciseProgressBarComponent implements OnInit, OnChanges {

  @Input() padding: string = '0';
  @Input() exerciseExecution: Array<ExerciseExecutionModel | null> = []; // Fixed-size array

  public progressLineHeight: string = '0%';

  ngOnInit() {
    this.updateProgressLineHeight();
  }

  ngOnChanges(): void {
    this.updateProgressLineHeight();
    console.log('changed');
  }

  updateProgressLineHeight(): void {
    const completedCount = this.exerciseExecution.filter(item => item !== null).length;
    const height = Math.min((Math.max(completedCount - 1, 0) * 100) / (this.exerciseExecution.length - 1), 100);
    this.progressLineHeight = `${height}%`;
  }

  protected readonly faDumbbell = faDumbbell;
  protected readonly faClock = faClock;
  protected readonly faRepeat = faRepeat;
  protected readonly faStopwatch = faStopwatch;
}
