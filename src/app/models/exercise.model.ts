export interface Exercise {
  id: number;
  name: string;
  series: number;
  repetitions: number;
  doneCount?: number;   // New property to track how many times the exercise has been done
  isDone?: boolean;     // New property to track if the exercise is complete
}
