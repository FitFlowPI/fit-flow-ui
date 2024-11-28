import {Component, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {Exercise} from "../../models/exercise.model";
import {faClock} from "@fortawesome/free-solid-svg-icons/faClock";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {buttonRipple} from "../button/buttonEffects";

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent {

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  @Input({required: true}) exercise!: Exercise;


  @HostListener('click', ['$event'])
  OnClick(event: MouseEvent) {
    buttonRipple('exercise', event, this.renderer, this.el.nativeElement);
  }

  protected readonly faClock = faClock;
}
