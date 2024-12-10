import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { TrainingDayComponent } from "../training-day/training-day.component";
import { NgForOf } from "@angular/common";
import { TrainingDay } from "../../models/training-day.model";
import { buttonRipple } from "../../shared/button/buttonEffects";
import { RouterLink } from "@angular/router";
import { TrainingSheetService } from '../../services/training-sheet.service'; // Import your service

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

  constructor(public renderer: Renderer2, private trainingSheetService: TrainingSheetService) {}

  // Initialize the training day data
  trainingDayData: Array<TrainingDay> = [];

  ngOnInit() {
    const storedData = localStorage.getItem('charts');
    if (storedData) {
      this.trainingDayData = JSON.parse(storedData);
      console.log('Loaded from localStorage:', this.trainingDayData);
    } else {
      console.log('No data in localStorage');
      // Subscribe to trainingDays$ from the service if no data in localStorage
      this.trainingSheetService.trainingDays$.subscribe(trainingDays => {
        console.log('Received from service:', trainingDays);  // Debug log
        this.trainingDayData = trainingDays;
        this.refreshCharts();  // Call your refresh logic here
      });
    }
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
    this.updateLocalStorage(); // Update localStorage when data changes
    this.trainingSheetService.updateTrainingDayList(this.trainingDayData); // Update the service
    console.log('New chart added:', newChart);  // Debug log
    console.log('Updated trainingDayData:', this.trainingDayData);  // Debug log
  }

  // Refresh trainingDays logic
  refreshCharts() {
    console.log('trainingDayData has changed:', this.trainingDayData);  // Debug log
    // Additional logic to refresh the display
  }

  // Helper method to update localStorage
  private updateLocalStorage() {
    localStorage.setItem('trainingDays', JSON.stringify(this.trainingDayData));
    console.log('Updated localStorage with trainingDays:', this.trainingDayData);  // Debug log
  }
}
