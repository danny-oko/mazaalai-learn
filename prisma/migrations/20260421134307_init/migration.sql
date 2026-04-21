-- CreateEnum
CREATE TYPE "LessonStatus" AS ENUM ('LOCKED', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('READ', 'QUIZ_SELECTION', 'CONVERT', 'MATCHING');

-- CreateEnum
CREATE TYPE "TaskDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "users_table" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "totalXp" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "level_table" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "level_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessons_table" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "levelId" TEXT NOT NULL,

    CONSTRAINT "lessons_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks_table" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "type" "TaskType" NOT NULL,
    "difficulty" "TaskDifficulty" NOT NULL,
    "xpReward" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "options" JSONB,
    "order" INTEGER NOT NULL,

    CONSTRAINT "tasks_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_lesson_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "status" "LessonStatus" NOT NULL DEFAULT 'LOCKED',
    "mistakeCount" INTEGER NOT NULL DEFAULT 0,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "user_lesson_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeechTargets" (
    "id" TEXT NOT NULL,
    "expected_text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpeechTargets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeechAttempts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "target_id" TEXT NOT NULL,
    "transcribed_text" TEXT NOT NULL,
    "accuracy_score" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpeechAttempts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_table_email_key" ON "users_table"("email");

-- CreateIndex
CREATE UNIQUE INDEX "level_table_order_key" ON "level_table"("order");

-- CreateIndex
CREATE UNIQUE INDEX "lessons_table_levelId_order_key" ON "lessons_table"("levelId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "user_lesson_progress_userId_lessonId_key" ON "user_lesson_progress"("userId", "lessonId");

-- AddForeignKey
ALTER TABLE "lessons_table" ADD CONSTRAINT "lessons_table_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "level_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks_table" ADD CONSTRAINT "tasks_table_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_lesson_progress" ADD CONSTRAINT "user_lesson_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_lesson_progress" ADD CONSTRAINT "user_lesson_progress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeechAttempts" ADD CONSTRAINT "SpeechAttempts_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "SpeechTargets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
