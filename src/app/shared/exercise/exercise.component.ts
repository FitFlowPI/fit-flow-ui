import {Component, ElementRef, HostListener, Input, Renderer2, ViewChild} from '@angular/core';
import {Exercise} from "../../models/exercise.model";
import {faClock} from "@fortawesome/free-solid-svg-icons/faClock";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {buttonRipple} from "../button/buttonEffects";

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf,
    NgOptimizedImage,
    NgStyle,
    NgIf
  ],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent {

  @ViewChild('exerciseContainer') exerciseContainer!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {
  }

  @Input({required: true}) exercise!: Exercise;
  @Input() showBorder: boolean = true;
  @Input() nameSize: string = '1rem'
  @Input() showMuscles: boolean = true;
  @Input() clickable: boolean = true;

  OnClick(event: MouseEvent) {
    if (this.exerciseContainer) buttonRipple('exercise', event, this.renderer, this.exerciseContainer.nativeElement);
  }

  protected readonly faClock = faClock;
}
