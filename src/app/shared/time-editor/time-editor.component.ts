import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {NumberSelectorComponent} from "../number-selector/number-selector.component";
import {NgIf, NgStyle} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCheck, faPencil, faStopwatch} from "@fortawesome/free-solid-svg-icons";

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
  @Input() number: number = 0;

  @Output() numberOutput: EventEmitter<number> = new EventEmitter<number>();

  dividedTime: number[] = [0, 0, 0, 0];
  updatedDividedTime: number[] = [];

  //TODO: impedir que a unidade de segundos/minutos aumente pra mais que 0 quando a dezena for 6

  ngOnInit() {
    this.divideTime();
    this.updatedDividedTime = this.dividedTime;
  }

  ngOnChanges() {
    this.divideTime();
  }


  divideTime(): void {
    const totalSeconds = Math.floor(this.number / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);

    this.dividedTime[1] = Math.floor(seconds / 10); // Tens digit of seconds
    this.dividedTime[0] = seconds % 10;            // Units digit of seconds
    this.dividedTime[3] = Math.floor(minutes / 10); // Tens digit of minutes
    this.dividedTime[2] = minutes % 10;            // Units digit of minutes
  }

  handleNumberChange(newNumber: { number: number, index: number }) {
    this.updatedDividedTime[newNumber.index] = newNumber.number;
  }

  edit() {
    this.isEditing = true;
  }

  confirmEdit() {
    // Assemble the updatedDividedTime back into total milliseconds
    const seconds = this.updatedDividedTime[1] * 10 + this.updatedDividedTime[0];
    const minutes = this.updatedDividedTime[3] * 10 + this.updatedDividedTime[2];
    const totalMilliseconds = (minutes * 60 + seconds) * 1000;

    // Emit or process the combined totalMilliseconds
    this.numberOutput.emit(totalMilliseconds);
    this.isEditing = false;
  }

  protected readonly faPencil = faPencil;
  protected readonly faCheck = faCheck;
  protected readonly faStopwatch = faStopwatch;
}
