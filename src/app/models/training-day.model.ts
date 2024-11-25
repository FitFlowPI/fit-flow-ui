import {Exercise} from "./exercise.model";

export interface TrainingDay {
  id: string;
  name: string;
  kcal: number;
  timeInMinutes: number;
  exercises: Array<Exercise>;
  timeSpent?: number;
}
