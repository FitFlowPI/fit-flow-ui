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
  numbers: number[] = []; // Array of digits

  @Output() numberOutput: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
    this.numberOutput.emit(this.number);
    this.divideNumber();
  }

  ngOnChanges() {
    this.divideNumber();
  }

  private divideNumber() {
    this.numbers = this.number
      .toString()
      .split('')
      .map((digit) => parseInt(digit, 10));
  }


  handleIncrement(index: number) {
    if (index < 0 || index >= this.numbers.length) return;

    this.numbers[index] += 1;

    if (this.numbers[index] > 9) {
      this.numbers[index] = 0; // Reset the current digit to 0

      if (index === 0) {
        // Add a new digit at the start of the array
        this.numbers.unshift(1);
      } else {
        // Cascade increment to the previous digit
        this.handleIncrement(index - 1);
      }
    }
  }

  handleDecrement(index: number) {
    if (index < 0 || index >= this.numbers.length) return;

    this.numbers[index] -= 1;

    if (this.numbers[index] < 0) {
      if (index === 0 && this.numbers.length > 1) {
        // Remove the first digit if it underflows and there are multiple digits
        this.numbers.shift();
      } else {
        // Reset the current digit to 9 and cascade to the previous digit
        this.numbers[index] = 9;
        this.handleDecrement(index - 1);
      }
    }
  }

  edit() {
    this.isEditing = true;
  }

  confirmEdit() {
    // Combine digits into a single number
    const updatedNumber = parseInt(this.numbers.join(''), 10);

    // Emit the updated number
    this.numberOutput.emit(updatedNumber);
    this.isEditing = false;
  }

  protected readonly faCheck = faCheck;
  protected readonly faPencil = faPencil;
}
