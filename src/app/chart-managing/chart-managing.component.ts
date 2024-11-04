import {Component} from '@angular/core';
import {GymChartComponent} from "./gym-chart/gym-chart.component";
import {NgForOf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {SvgGeneratorComponent} from "../shared/svg-generator/svg-generator.component";
import {PageSliderComponent} from "../shared/page-slider/page-slider.component";

@Component({
  selector: 'app-chart-managing',
  standalone: true,
  imports: [
    GymChartComponent,
    NgForOf,
    FaIconComponent,
    SvgGeneratorComponent,
    PageSliderComponent
  ],
  templateUrl: './chart-managing.component.html',
  styleUrl: './chart-managing.component.css'
})
export class ChartManagingComponent {


}
