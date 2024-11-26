export interface Exercise {
  id: string,
  name: string,
  muscles: Array<string>,
  thumbnail: string,
  time: number
  doneCount?: number;   // New property to track how many times the exercise has been done
  isDone?: boolean;     // New property to track if the exercise is complete
}
