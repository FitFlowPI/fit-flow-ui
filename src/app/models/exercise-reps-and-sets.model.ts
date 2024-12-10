export interface ExerciseRepsAndSets {
  id: number;
  name: string;
  series: number;
  repetitions: number;
  category?: string; // Add category if needed
  description?: string; // Description of the exercise
  media?: string; // Media link (e.g., YouTube link)
}
