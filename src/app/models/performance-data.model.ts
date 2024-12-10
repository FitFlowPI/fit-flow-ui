import {ExerciseExecutionModel} from "./exercise-execution.model";
import {Exercise} from "./exercise.model";

export interface PerformanceData {
  exerciseExecution: ExerciseExecutionModel;
  exercise: Omit<Exercise, 'thumbnail'>;
  date: Date;
}
