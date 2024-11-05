import {AfterViewInit, Component, HostListener} from '@angular/core';
import {TableModule} from "primeng/table";
import {ChipsModule} from "primeng/chips";
import {PaginatorModule} from "primeng/paginator";
import {NgIf, NgStyle} from "@angular/common";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {Exercise} from "../../models/exercise.model";
import {InputGroupModule} from "primeng/inputgroup";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-gym-chart-create',
  standalone: true,
  imports: [
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
export class GymChartCreateComponent implements AfterViewInit{

  exercises: Exercise[] = [
    {id: 1, name: 'Supino Inclinado', series: 3, repetitions: 15},
    {id: 2, name: 'Crucifixo', series: 3, repetitions: 12}
  ];
  clonedExercises: { [s: string]: Exercise } = {};
  mobileWidth: number = 800;
  isMobile: boolean = false;


  ngAfterViewInit() {
    this.isMobile = window.innerWidth >= this.mobileWidth;
  }


  @HostListener('window:resize', ['$event'])
  onResize () {
    this.isMobile = window.innerWidth >= this.mobileWidth;
    console.log(this.isMobile);
  }

  onRowEditInit(exercise: Exercise) {
    this.clonedExercises[exercise.id] = { ...exercise };
  }

  onRowEditSave(exercise: Exercise) {
    // check if its invalid
    // if (expression) {
    //   delete this.clonedExercises[exercise.id];
         // save exercise
    //   // create a message service and put here
    // } else {
    //   // if its invalid throw an error message
    // }
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

}
