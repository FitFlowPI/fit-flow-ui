import {Component, OnInit} from '@angular/core';
import {TrainingDayComponent} from "./training-day/training-day.component";
import {NgForOf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {SvgGeneratorComponent} from "../shared/svg-generator/svg-generator.component";
import {PageSliderComponent} from "../shared/page-slider/page-slider.component";
import {TrainingDaySelectComponent} from "./training-day-select/training-day-select.component";
import {TrainingDayCreateComponent} from "./training-day-create/training-day-create.component";
import {TrainingDay} from "../models/gym-chart.model";

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    TrainingDayComponent,
    NgForOf,
    FaIconComponent,
    SvgGeneratorComponent,
    PageSliderComponent,
    TrainingDaySelectComponent,
    TrainingDayCreateComponent
  ],
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css', '../shared/page-slider/slider-children.css']
})
export class TrainingComponent implements OnInit {
  refreshCharts: boolean = false;

  charts?: Array<TrainingDay>;

  ngOnInit() {

  }

  // Method to toggle the refresh
  triggerRefresh() {
    this.refreshCharts = !this.refreshCharts; // This will trigger the ngOnChanges in the child
  }
}
