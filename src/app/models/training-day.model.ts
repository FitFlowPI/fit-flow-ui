import {ExerciseRepsAndSets} from "./exercise-reps-and-sets.model";

export interface TrainingDay {
  id: string;
  name: string;
  kcal: number;
  timeInMinutes: number;
  exercises: Array<ExerciseRepsAndSets>;
  timeSpent?: number;
}
