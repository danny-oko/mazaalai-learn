/*
  Warnings:

  - The values [READ,QUIZ_SELECTION,CONVERT,MATCHING] on the enum `TaskType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `name` on the `users_table` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userName]` on the table `users_table` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `displayName` to the `users_table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskType_new" AS ENUM ('MC', 'TRANSLATE', 'MATCH');
ALTER TABLE "tasks_table" ALTER COLUMN "type" TYPE "TaskType_new" USING ("type"::text::"TaskType_new");
ALTER TYPE "TaskType" RENAME TO "TaskType_old";
ALTER TYPE "TaskType_new" RENAME TO "TaskType";
DROP TYPE "public"."TaskType_old";
COMMIT;

-- AlterTable
ALTER TABLE "lessons_table" ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "user_lesson_progress" ALTER COLUMN "mistakeCount" SET DEFAULT 3;

-- AlterTable
ALTER TABLE "users_table" DROP COLUMN "name",
ADD COLUMN     "displayName" TEXT NOT NULL,
ADD COLUMN     "globalRanking" INTEGER,
ADD COLUMN     "streak" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "lesson_contents_table" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "imageUrl" TEXT,
    "order" INTEGER NOT NULL,

    CONSTRAINT "lesson_contents_table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_table_userName_key" ON "users_table"("userName");

-- AddForeignKey
ALTER TABLE "lesson_contents_table" ADD CONSTRAINT "lesson_contents_table_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
