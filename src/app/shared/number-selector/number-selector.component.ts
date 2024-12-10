import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-number-selector',
  standalone: true,
  imports: [
    FaIconComponent,
    NgStyle,
    NgIf
  ],
  templateUrl: './number-selector.component.html',
  styleUrl: './number-selector.component.css'
})
export class NumberSelectorComponent implements OnChanges{



  @Input() number: number = 0;
  @Input({required: true}) index!: number;
  @Input() color: string = 'var(--white)';
  @Input() fontSize: number = 1;
  @Input() showButtons: boolean = true;
  @Input() maxLimit: number = 9;
  @Input() padding: string = '0';
  @Output() numberOutput: EventEmitter<{ index: number, number: number }> = new EventEmitter<{ index: number, number: number }>();


  //TODO: checkar overflow e underflow e emitir

  increment() {
    this.number = (this.number + 1) % (this.maxLimit + 1); // Wraps around at maxLimit + 1
    this.numberOutput.emit({index: this.index, number: this.number});
  }

  decrement() {
    this.number = (this.number - 1 + (this.maxLimit + 1)) % (this.maxLimit + 1); // Wraps around at -1
    this.numberOutput.emit({index: this.index, number: this.number});
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['number'] && (this.number < 0 || this.number > 9)) {
      this.number = 0; // Reset to default if invalid
    }
  }

  protected readonly faAngleUp = faAngleUp;
  protected readonly faAngleDown = faAngleDown;
}
