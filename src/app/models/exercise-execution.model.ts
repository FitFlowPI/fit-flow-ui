import {ExerciseRepsAndSets} from "./exercise-reps-and-sets.model";

export interface ExerciseExecutionModel extends ExerciseRepsAndSets {
  doneCount?: number;   // New property to track how many times the exercise has been done
  isDone?: boolean;     // New property to track if the exercise is complete
}
