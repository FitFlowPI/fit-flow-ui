import {Component} from '@angular/core';
import {GymChartComponent} from "./gym-chart-select/gym-chart/gym-chart.component";
import {NgForOf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {SvgGeneratorComponent} from "../shared/svg-generator/svg-generator.component";
import {PageSliderComponent} from "../shared/page-slider/page-slider.component";
import {GymChartSelectComponent} from "./gym-chart-select/gym-chart-select.component";
import {GymChartCreateComponent} from "./gym-chart-create/gym-chart-create.component";

@Component({
  selector: 'app-chart-managing',
  standalone: true,
  imports: [
    GymChartComponent,
    NgForOf,
    FaIconComponent,
    SvgGeneratorComponent,
    PageSliderComponent,
    GymChartSelectComponent,
    GymChartCreateComponent
  ],
  templateUrl: './chart-managing.component.html',
  styleUrls: ['./chart-managing.component.css', '../shared/page-slider/slider-children.css']
})
export class ChartManagingComponent {


}
