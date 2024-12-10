export interface Exercise {
  id: string,
  name: string,
  category: string,
  thumbnail: string,
  time: number
  category?: string;
  media?: string;
  description?: string;
}
