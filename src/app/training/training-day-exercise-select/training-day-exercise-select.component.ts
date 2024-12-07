import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from "../../models/exercise.model";
import {ExerciseComponent} from "../../shared/exercise/exercise.component";
import {NgForOf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-training-day-exercise-select',
  standalone: true,
  imports: [
    ExerciseComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './training-day-exercise-select.component.html',
  styleUrl: './training-day-exercise-select.component.css'
})
export class TrainingDayExerciseSelectComponent implements OnInit{
  // @Input({required: true}) exercises!: Array<Exercise>;

  public exercises: Array<Exercise> =
  [
    {id: '0', name: 'Rosca Direta', thumbnail: '', muscles: ['biceps'], time: 20},
    {id: '1', name: 'Remada Cavalinho', thumbnail: '', muscles: ['costas'], time: 30}
  ];

  private id!: string | null;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    // if (!this.isIdValid(this.id)) {
    //   this.router.navigate(['/training/training-day-select']);
    //   return;
    // }



  }

  private isIdValid(id: string | null) {
    return id;
    //TODO: Check if it is on database
  }

}
