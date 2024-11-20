import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { GymChartComponent } from "./gym-chart/gym-chart.component";
import { NgForOf } from "@angular/common";
import { GymChart } from "../../models/gym-chart.model";
import { buttonRipple } from "../../shared/button/buttonEffects";
import { RouterLink } from "@angular/router";
import { ChartService } from '../../services/chart.service'; // Import your service

@Component({
  selector: 'app-gym-chart-select',
  standalone: true,
  imports: [
    FaIconComponent,
    GymChartComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './gym-chart-select.component.html',
  styleUrls: ['./gym-chart-select.component.css', '../chart-screens.css']
})
export class GymChartSelectComponent implements OnInit {
  
  constructor(public renderer: Renderer2, private chartService: ChartService) {}

  // PLACEHOLDERS
  chartData: Array<GymChart> = [];

  ngOnInit() {
    // Subscribe to charts$ to get updates
    this.chartService.charts$.subscribe(charts => {
      this.chartData = charts;
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
  addNewChart(newChart: GymChart) {
    this.chartData.push(newChart);
    this.chartService.updateCharts(this.chartData); // Update the service
  }

  // Refresh charts logic
  refreshCharts() {
    console.log('chartData has changed:', this.chartData);
    // Additional logic to refresh the display
  }
}
