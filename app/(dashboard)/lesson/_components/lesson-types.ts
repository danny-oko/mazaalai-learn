export type TaskDifficulty = "EASY" | "MEDIUM" | "HARD";

export interface LessonContent {
  id: string;
  lessonId: string;
  name: string;
  text: string;
  imageUrl?: string | null;
  order: number;
}

export interface Task {
  id: string;
  lessonId: string;
  type: string;
  difficulty: TaskDifficulty;
  xpReward: number;
  question: string;
  correctAnswer: string;
  options: {
    choices: string[];
  } | null;
  order: number;
}
