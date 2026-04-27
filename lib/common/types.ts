export enum LessonStatus {
  LOCKED = "LOCKED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum TaskType {
  MC = "MC",
  TRANSLATE = "TRANSLATE",
  MATCH = "MATCH",
}

export enum TaskDifficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export type User = {
  id: string;
  name: string | null;
  email: string;
  userName: string;
  avatarUrl: string | null;
  totalXp: number;
  createdAt: Date;
  updatedAt: Date;
  lessonProgress: UserLessonProgress[];
  speechAttempts: SpeechAttempts[];
};

export type Section = {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
};

export type Lesson = {
  id: string;
  title: string;
  description: string | null;
  order: number;
  isCompleted: boolean;
  levelId: string;
  level: Section;
  content: LessonContent[];
  tasks: Task[];
  userProgress: UserLessonProgress[];
};

export type LessonContent = {
  id: string;
  lessonId: string;
  lesson: Lesson;
  name: string;
  text: string;
  imageUrl: string | null;
  order: number;
};

export type Task = {
  id: string;
  lessonId: string;
  lesson: Lesson;
  type: TaskType;
  difficulty: TaskDifficulty;
  xpReward: number;
  question: string;
  correctAnswer: string;
  options: Record<string, unknown> | null;
  order: number;
};

export type UserLessonProgress = {
  id: string;
  userId: string;
  user: User;
  lessonId: string;
  lesson: Lesson;
  status: LessonStatus;
  mistakeCount: number;
  xpEarned: number;
  completedAt: Date | null;
};

export type SpeechTargets = {
  id: string;
  title: string;
  expectedText: string;
  wordsCount: number;
  createdAt: Date;
  attempts: SpeechAttempts[];
};

export type SpeechAttempts = {
  id: string;
  userId: string;
  targetId: string;
  transcribedText: string;
  wordsRead: number;
  createdAt: Date;
  target: SpeechTargets;
  user: User;
};
