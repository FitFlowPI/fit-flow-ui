export interface Exercise {
  id: string,
  name: string,
  muscles: Array<string>,
  thumbnail: string,
  time: number
  category?: string;
  media?: string;
  description?: string;
}
