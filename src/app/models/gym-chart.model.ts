import {Exercise} from "./exercise.model";

export interface GymChart {
  id: number;
  name: string;
  kcal: number;
  timeInMinutes: number;
  exercises: Array<Exercise>;
}
