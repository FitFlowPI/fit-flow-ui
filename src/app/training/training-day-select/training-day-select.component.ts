import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { TrainingDayComponent } from "../training-day/training-day.component";
import { NgForOf } from "@angular/common";
import { TrainingDay } from "../../models/gym-chart.model";
import { buttonRipple } from "../../shared/button/buttonEffects";
import { RouterLink } from "@angular/router";
import { ChartService } from '../../services/chart.service'; // Import your service

@Component({
  selector: 'app-training-day-select',
  standalone: true,
  imports: [
    FaIconComponent,
    TrainingDayComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './training-day-select.component.html',
  styleUrls: ['./training-day-select.component.css', '../training-screens.css']
})
export class TrainingDaySelectComponent implements OnInit {

  constructor(public renderer: Renderer2, private chartService: ChartService) {}

  // PLACEHOLDERS
  trainingDayData: Array<TrainingDay> = [];

  ngOnInit() {
    // Subscribe to charts$ to get updates
    this.chartService.charts$.subscribe(charts => {
      this.trainingDayData = charts;
      this.refreshCharts(); // Call your refresh logic here
    });
  }

  @ViewChild('addButton') addButton?: ElementRef<HTMLButtonElement>;

  addButtonRippleEffect(event: MouseEvent) {
    buttonRipple('addChart', event, this.renderer, this.addButton!.nativeElement);
  }

  newSeriesButtonClick(event: MouseEvent) {
    this.addButtonRippleEffect(event);
  }

  protected readonly faPlus = faPlus;

  // Method to add a new chart
  addNewChart(newChart: TrainingDay) {
    this.trainingDayData.push(newChart);
    this.chartService.updateCharts(this.trainingDayData); // Update the service
  }

  // Refresh charts logic
  refreshCharts() {
    console.log('trainingDayData has changed:', this.trainingDayData);
    // Additional logic to refresh the display
  }
}
