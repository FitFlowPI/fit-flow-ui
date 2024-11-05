import {Component, Input} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons/faPlay";
import {ButtonComponent} from "../../shared/button/button.component";
import {faRunning} from "@fortawesome/free-solid-svg-icons/faRunning";
import {faFire} from "@fortawesome/free-solid-svg-icons/faFire";
import {faClock} from "@fortawesome/free-solid-svg-icons/faClock";
import {GymChart} from "../../models/gym-chart.model";

@Component({
  selector: 'app-gym-chart',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FontAwesomeModule,
    NgIf,
    ButtonComponent,
    NgForOf
  ],
  templateUrl: './gym-chart.component.html',
  styleUrl: './gym-chart.component.css'
})
export class GymChartComponent {

  isActive: boolean = false;

  @Input({required: true}) chartData: GymChart = {
    name: '?',
    timeInMinutes: 0,
    kcal: 0,
    exercises: []
  };

  toggleActive() {
    this.isActive = !this.isActive;
  }

  protected readonly faPlay = faPlay;
  protected readonly faRunning = faRunning;
  protected readonly faFire = faFire;
  protected readonly faClock = faClock;
}
