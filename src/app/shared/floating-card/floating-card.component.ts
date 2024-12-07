import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {ButtonComponent} from "../button/button.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons/faX";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";

@Component({
  selector: 'app-floating-card',
  standalone: true,
  imports: [
    NgIf,
    ButtonComponent,
    FaIconComponent,
    ButtonDirective,
    Ripple
  ],
  templateUrl: './floating-card.component.html',
  styleUrl: './floating-card.component.css'
})
export class FloatingCardComponent {
  @Input() title?: string;
  @Output() close = new EventEmitter<void>();


  closeComponent() {
    this.close.emit();
  }

  protected readonly faX = faX;
}
