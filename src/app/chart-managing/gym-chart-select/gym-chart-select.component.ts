import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {GymChartComponent} from "../gym-chart/gym-chart.component";
import {NgForOf} from "@angular/common";
import {GymChart} from "../../models/gym-chart.model";
import {buttonRipple} from "../../shared/button/buttonEffects";

@Component({
  selector: 'app-gym-chart-select',
  standalone: true,
  imports: [
    FaIconComponent,
    GymChartComponent,
    NgForOf
  ],
  templateUrl: './gym-chart-select.component.html',
  styleUrl: './gym-chart-select.component.css'
})
export class GymChartSelectComponent {

  constructor(public renderer: Renderer2){}

  // PLACEHOLDERS

  chartData: Array<GymChart> = [{
    name: 'Série A',
    timeInMinutes: 60,
    kcal: 2400,
    exercises: [
      {name: 'Supino Inclinado', series: 3, repetitions: 15},
      {name: 'Crucifixo', series: 3, repetitions: 12}
    ]
  },
    {
      name: 'Série B',
      timeInMinutes: 20,
      kcal: 1400,
      exercises: [
        {name: 'Leg Press', series: 3, repetitions: 10},
        {name: 'Panturrilha', series: 3, repetitions: 15}
      ]
    }];

  // -----------------------------------------------------

  @ViewChild('addButton') addButton?: ElementRef<HTMLButtonElement>

  addButtonRippleEffect(event: MouseEvent) {
    buttonRipple('addChart', event, this.renderer, this.addButton!.nativeElement)
  }

  newSeriesButtonClick(event: MouseEvent) {
    this.addButtonRippleEffect(event);
  }

  protected readonly faPlus = faPlus;
}
