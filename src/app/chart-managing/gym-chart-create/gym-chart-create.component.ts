import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TableModule } from "primeng/table";
import { ChipsModule } from "primeng/chips";
import { PaginatorModule } from "primeng/paginator";
import { NgIf, NgStyle } from "@angular/common";
import { ButtonDirective } from "primeng/button";
import { Ripple } from "primeng/ripple";
import { Exercise } from "../../models/exercise.model";
import { InputGroupModule } from "primeng/inputgroup";
import { Router } from '@angular/router';
import { ChartService } from '../../services/chart.service'; // Import your service
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-gym-chart-create',
  standalone: true,
  imports: [
    ButtonComponent,
    TableModule,
    ChipsModule,
    PaginatorModule,
    NgIf,
    ButtonDirective,
    Ripple,
    InputGroupModule,
    NgStyle,
  ],
  templateUrl: './gym-chart-create.component.html',
  styleUrls: ['./gym-chart-create.component.scss', '../chart-screens.css']
})
export class GymChartCreateComponent implements AfterViewInit{

  @ViewChild('table') table?: ElementRef<Component>;
  constructor(private router: Router, private chartService: ChartService) { }


  seriesName: string = "";
  exercises: Exercise[] = [];
  clonedExercises: { [s: string]: Exercise } = {};
  mobileWidth: number = 600;
  isMobile: boolean = false;
  minTableSizeRem: number = 40;


  numberInputLayout: 'vertical' | 'horizontal' = 'horizontal';
  showId: boolean = true;

  ngAfterViewInit() {
    this.isMobile = window.innerWidth <= this.mobileWidth;
    this.checkResponsiveness();
  }

  @HostListener('window:resize', ['$event'])
  onResize () {
    this.isMobile = window.innerWidth <= this.mobileWidth;
    this.checkResponsiveness();
  }

  checkResponsiveness() {

    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    if (this.table) {
      if (window.innerWidth <= 680 * (rootFontSize / 16)) {
        this.numberInputLayout = 'vertical';
      } else {
        this.numberInputLayout = 'horizontal';
      }
      this.showId = !(window.innerWidth <= 540 * (rootFontSize / 16));
      console.log('checking');
    }
  }

  onRowEditInit(exercise: Exercise) {
    this.clonedExercises[exercise.id] = { ...exercise };
  }

  onRowEditSave(exercise: Exercise) {
    // Save logic for editing an exercise (implement validation if necessary)
    delete this.clonedExercises[exercise.id];
  }

  onRowEditCancel(exercise: Exercise, index: number) {
    this.exercises[index] = this.clonedExercises[exercise.id];
    delete this.clonedExercises[exercise.id];
  }

  newExercise: Exercise = { id: 0, name: '', series: 0, repetitions: 0 };

  addNewExercise() {
    if (this.newExercise.name && this.newExercise.series && this.newExercise.repetitions) {
      const newExercise: Exercise = {
        ...this.newExercise,
        id: this.exercises.length + 1
      };

      this.exercises.push(newExercise);

      // Reset the inputs
      this.newExercise = { id: 0, name: '', series: 0, repetitions: 0 };
    }
  }

  convertRemToPx(remValue: number): number {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return remValue * rootFontSize;
  }

  submit() {
    const storedCharts = JSON.parse(localStorage.getItem('charts') || '[]');
  
    // Determine the series name based on the input or generate a default name
    const nextSeriesName = this.seriesName || `Série ${String.fromCharCode(65 + storedCharts.length)}`;
  
    // Define the new chart with its name and exercises
    const newChart = {
      id: Date.now(),  // Unique ID
      name: nextSeriesName,
      exercises: this.exercises
    };
  
    // Add the new chart to the service and save it
    this.chartService.updateCharts([...storedCharts, newChart]);
  
    // Reset the inputs
    this.seriesName = ''; // Clear seriesName input field
    this.exercises = [];  // Clear exercises array
  
    // Navigate to the chart selection page
    this.router.navigate(['/chart/chart-select']);
  }
  
}
