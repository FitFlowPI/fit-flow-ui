import {Component, ViewEncapsulation} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faAngleDown, faDumbbell, faPencil} from "@fortawesome/free-solid-svg-icons";
import {ButtonComponent} from "../../shared/button/button.component";
import {faClock} from "@fortawesome/free-solid-svg-icons/faClock";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-exercise-start',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FaIconComponent,
    ButtonComponent,
    NgIf,
    RouterLink,
  ],
  templateUrl: './exercise-start.component.html',
  styleUrl: './exercise-start.component.css'
})
export class ExerciseStartComponent {

  protected readonly faAngleDown = faAngleDown;
  protected readonly faDumbbell = faDumbbell;
  protected readonly faClock = faClock;
  protected readonly faPencil = faPencil;

  isShowingTimer: boolean = false;
  isStopped: boolean = false;
}
