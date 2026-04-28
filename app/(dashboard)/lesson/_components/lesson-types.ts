export interface LessonContent {
  id: string;
  lessonId: string;
  name: string;
  text: string;
  imageUrl?: string | null;
  order: number;
}
