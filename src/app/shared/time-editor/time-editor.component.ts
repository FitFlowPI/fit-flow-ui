import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {NumberSelectorComponent} from "../number-selector/number-selector.component";
import {NgIf, NgStyle} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCheck, faPencil, faStopwatch} from "@fortawesome/free-solid-svg-icons";

const MAX_DIGIT: number = 9;
const MAX_TENS_DIGIT = 5; // Maximum for tens

@Component({
  selector: 'app-time-editor',
  standalone: true,
  imports: [
    NumberSelectorComponent,
    NgStyle,
    FaIconComponent,
    NgIf
  ],
  templateUrl: './time-editor.component.html',
  styleUrl: './time-editor.component.css'
})
export class TimeEditorComponent implements OnInit, OnChanges{
  @Input() isEditing: boolean = false;
  @Input() fontSize: number = 1;
  @Input() editingFontSize: number = 2
  @Input() milliseconds: number = 0;

  @Output() numberOutput: EventEmitter<number> = new EventEmitter<number>();


  dividedTime: number[] = [0, 0, 0, 0];

  //TODO: impedir que a unidade de segundos/minutos aumente pra mais que 0 quando a dezena for 6

  ngOnInit() {
    this.numberOutput.emit(this.milliseconds);
    this.divideTime();
  }

  ngOnChanges() {
    this.divideTime();
  }


  divideTime(): void {
    const totalSeconds = Math.floor(this.milliseconds / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);

    this.dividedTime[1] = Math.floor(seconds / 10); // Tens digit of seconds
    this.dividedTime[0] = seconds % 10;            // Units digit of seconds
    this.dividedTime[3] = Math.floor(minutes / 10); // Tens digit of minutes
    this.dividedTime[2] = minutes % 10;            // Units digit of minutes
  }

  incrementTime(index: number): void {
    if (index < 0 || index >= this.dividedTime.length) return;

    const maxLimit = index % 2 === 0 ? MAX_DIGIT : MAX_TENS_DIGIT; // Units vs. tens digit
    this.dividedTime[index] += 1;

    if (this.dividedTime[index] > maxLimit) {
      this.dividedTime[index] = 0;
      // Carry over to the next higher digit
      if (index + 1 < this.dividedTime.length) {
        this.incrementTime(index + 1);
      }
    }
  }

  decrementTime(index: number): void {
    if (index < 0 || index >= this.dividedTime.length) return;

    const maxLimit = index % 2 === 0 ? MAX_DIGIT : MAX_TENS_DIGIT; // Units vs. tens digit
    this.dividedTime[index] -= 1;

    if (this.dividedTime[index] < 0) {
      this.dividedTime[index] = maxLimit;
      // Borrow from the next higher digit
      if (index + 1 < this.dividedTime.length) {
        this.decrementTime(index + 1);
      }
    }
  }

  handleIncrement(index: number) {
    this.incrementTime(index);
  }

  handleDecrement(index: number) {
    this.decrementTime(index);
  }

  edit() {
    this.isEditing = true;
  }

  confirmEdit() {
    // Assemble the updatedDividedTime back into total milliseconds
    const seconds = this.dividedTime[1] * 10 + this.dividedTime[0];
    const minutes = this.dividedTime[3] * 10 + this.dividedTime[2];
    const totalMilliseconds = (minutes * 60 + seconds) * 1000;

    // Emit or process the combined totalMilliseconds
    this.numberOutput.emit(totalMilliseconds);
    this.isEditing = false;
  }

  protected readonly faPencil = faPencil;
  protected readonly faCheck = faCheck;
  protected readonly faStopwatch = faStopwatch;
}
