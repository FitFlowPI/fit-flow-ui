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
export class NumberSelectorComponent {
  @Input() number: number = 0; // Controlled externally
  @Input({ required: true }) index!: number;
  @Input() color: string = 'var(--white)';
  @Input() fontSize: number = 1;
  @Input() showButtons: boolean = true;
  @Input() padding: string = '0';

  @Output() incrementNumber: EventEmitter<number> = new EventEmitter<number>();
  @Output() decrementNumber: EventEmitter<number> = new EventEmitter<number>();

  increment() {
    this.incrementNumber.emit(this.index);
  }

  decrement() {
    this.decrementNumber.emit(this.index);
  }

  protected readonly faAngleUp = faAngleUp;
  protected readonly faAngleDown = faAngleDown;
}
