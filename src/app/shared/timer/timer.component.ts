import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {BehaviorSubject, interval, map, startWith, Subject, Subscription, switchMap, takeUntil} from "rxjs";
import {NgIf, NgStyle} from "@angular/common";
import {FaIconComponent, IconDefinition} from "@fortawesome/angular-fontawesome";
import {faStopwatch} from "@fortawesome/free-solid-svg-icons";
import {NumberSelectorComponent} from "../number-selector/number-selector.component";

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [
    NgStyle,
    NgIf,
    FaIconComponent,
    NumberSelectorComponent
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() initialTimerValue: number = 0; // Initial timer value in centiseconds
  @Input() isMilliseconds: boolean = false; // Whether to show centiseconds
  @Input() fontSize: number = 2; // Font size for display
  @Input() showSnoozeIcon: boolean = false;
  @Input() timerState: 'stopped' | 'paused' | 'playing' | 'reset' = 'stopped'; // Timer state
  @Input() icon?: IconDefinition;
  @Input() showMinutes: boolean = false;
  @Input() color: string = 'var(--white)';

  @Output() timerValueChange = new EventEmitter<number>(); // Emit final value on stop

  formattedMinutes: string = '00';
  formattedSeconds: string = '00';
  formattedCentiseconds: string = '00';

  private currentTimerValue: number = 0;
  private startTime: number = 0; // Performance.now() when the timer starts
  public elapsedTime: number = 0; // Elapsed time in centiseconds
  private isRunning: boolean = false; // Timer running state
  private isPaused: boolean = false;

  ngOnInit(): void {
    this.elapsedTime = this.initialTimerValue; // Initialize with input value
    this.updateDisplayValues(this.elapsedTime);
  }

  ngOnChanges(): void {
    switch (this.timerState) {
      case 'playing':
        this.startTimer();
        break;
      case 'paused':
        this.pauseTimer();
        break;
      case 'stopped':
        this.stopTimer();
        break;
      case 'reset':
        this.resetTimer();
        break;
    }
  }

  ngOnDestroy(): void {
    this.stopAnimationFrame();
  }

  private startTimer(): void {
    if (this.isRunning) return;
    this.startTime = !this.isPaused ? performance.now() - this.elapsedTime : performance.now(); // Adjust for elapsed time
    this.isRunning = true;
    this.isPaused = false;
    this.runTimer();
  }

  private runTimer(): void {
    const update = () => {
      if (!this.isRunning) return;

      const now = performance.now();
      const currentElapsed = now - this.startTime; // Convert to centiseconds

      if (this.currentTimerValue < 0) {
        // Countdown logic
        this.elapsedTime = this.currentTimerValue + currentElapsed;
        if (this.elapsedTime >= 0) {
          this.currentTimerValue = 0;
          this.startTime = now; // Reset start time
        }
      } else {
        // Normal timer logic
        this.elapsedTime = currentElapsed;
      }

      this.updateDisplayValues(this.elapsedTime);
      this.timerValueChange.emit(this.elapsedTime);
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  private pauseTimer(): void {
    if (!this.isRunning) return; // Do nothing if the timer isn't running
    this.isRunning = false;
    this.isPaused = true;
    this.currentTimerValue = this.elapsedTime;
  }

  private stopTimer(): void {
    this.resetTimer();
    //TODO: emitir algo para sinalizar que acabou
  }

  private resetTimer(): void {
    this.elapsedTime = this.initialTimerValue; // Reset to initial value
    this.updateDisplayValues(this.elapsedTime);
    this.currentTimerValue = 0;
    this.startTime = 0;
    this.isRunning = false;
    this.isPaused = false;
    this.timerState = 'paused';
  }

  private updateDisplayValues(timerValue: number): void {
    const absValue = Math.abs(timerValue);

    const minutes = Math.floor(absValue / (60 * 1000)); // Fixed to always divide by 6000 (60 seconds * 100 centiseconds)
    const seconds = Math.floor((absValue % (60 * 1000)) / 1000); // Extract seconds correctly
    const centiseconds = Math.floor((absValue % 1000) / 10); // Centiseconds remain unchanged

    this.formattedMinutes = minutes.toString().padStart(2, '0');
    this.formattedSeconds = seconds.toString().padStart(2, '0');
    this.formattedCentiseconds = centiseconds.toString().padStart(2, '0');
  }

  private stopAnimationFrame(): void {
    this.isRunning = false;
  }
}
