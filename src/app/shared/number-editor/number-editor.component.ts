import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {NumberSelectorComponent} from "../number-selector/number-selector.component";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {FaIconComponent, IconDefinition} from "@fortawesome/angular-fontawesome";
import {faCheck, faPencil} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-number-editor',
  standalone: true,
  imports: [
    NumberSelectorComponent,
    NgForOf,
    FaIconComponent,
    NgIf,
    NgStyle
  ],
  templateUrl: './number-editor.component.html',
  styleUrl: './number-editor.component.css'
})
export class NumberEditorComponent implements OnInit, OnChanges{
  @Input() numberOfChars: number = 2;
  @Input() number: number = 0;
  @Input() isEditing: boolean = false;
  @Input() fontSize: number = 1;
  @Input() editingFontSize: number = 2
  @Input() icon?: IconDefinition;
  dividedNumber: number[] = []; // Array of digits
  updatedDividedNumber: number[] = [];

  @Output() numberOutput: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
    this.divideNumber();
  }

  ngOnChanges() {
    this.divideNumber();
  }

  private divideNumber() {
    this.dividedNumber = this.number
      .toString()
      .split('')
      .map((digit) => parseInt(digit, 10));
  }

  handleNumberChange(newNumber: { number: number, index: number }) {
    // Update the specific index in dividedNumber
    this.updatedDividedNumber[newNumber.index] = newNumber.number;
  }

  edit() {
    this.isEditing = true;
  }

  confirmEdit() {
    // Combine digits into a single number
    const updatedNumber = parseInt(this.updatedDividedNumber.join(''), 10);

    // Emit the updated number
    this.numberOutput.emit(updatedNumber);
    this.isEditing = false;
  }

  protected readonly faCheck = faCheck;
  protected readonly faPencil = faPencil;
}
