import {Exercise} from "./exercise.model";

export interface GymChart {
  name: string;
  kcal: number;
  timeInMinutes: number;
  exercises: Array<Exercise>;
}
