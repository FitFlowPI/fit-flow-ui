import {Exercise} from "./exercise.model";

export interface TrainingDay {
  name: string;
  kcal: number;
  timeInMinutes: number;
  exercises: Array<Exercise>;
}
