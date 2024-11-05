import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
    NgStyle
  ],
  templateUrl: './gym-chart-create.component.html',
  styleUrls: ['./gym-chart-create.component.css', '../chart-screens.css']
})
export class GymChartCreateComponent implements AfterViewInit, OnInit, OnDestroy {

  constructor(private router: Router, private chartService: ChartService) { }

  @ViewChild('table') table?: ElementRef;
  private resizeObserver!: ResizeObserver;

  exercises: Exercise[] = [];
  clonedExercises: { [s: string]: Exercise } = {};
  mobileWidth: number = 800;
  isMobile: boolean = false;
  minTableSizeRem: number = 40;
  minTablePx: number = 0;

  ngAfterViewInit() {
    this.isMobile = window.innerWidth >= this.mobileWidth;
    this.minTablePx = this.convertRemToPx(this.minTableSizeRem);
  }

  ngOnInit() {
    this.setupResizeObserver();
  }

  ngOnDestroy() {
    // Clean up the observer to prevent memory leaks
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    // Handle resize events if necessary
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

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        console.log(`Element resized: width = ${width}, height = ${height}`);
      }
    });

    if (this.table) this.resizeObserver.observe(this.table.nativeElement);
  }

  submit() {
    // Use the ChartService to manage charts
    const storedCharts = JSON.parse(localStorage.getItem('charts') || '[]');
  
    // Determine the next letter based on the length of stored charts
    const nextCharCode = 65 + storedCharts.length; // ASCII code for 'A' is 65
    const nextSeriesName = `Série ${String.fromCharCode(nextCharCode)}`;
  
    // Define the new chart with its name and exercises
    const newChart = {
      id: Date.now(),  // Keep a unique ID
      name: nextSeriesName,
      exercises: this.exercises
    };
  
    // Add the new chart to the service and save it
    this.chartService.updateCharts([...storedCharts, newChart]);
  
    // Optionally reset exercises
    this.exercises = [];

    // Navigate to the chart selection page
    this.router.navigate(['/chart/chart-select']);
  }
}
