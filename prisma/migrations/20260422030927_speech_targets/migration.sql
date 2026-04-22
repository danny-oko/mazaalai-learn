/*
  Warnings:

  - You are about to drop the column `accuracy_score` on the `SpeechAttempts` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `SpeechAttempts` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `SpeechAttempts` table. All the data in the column will be lost.
  - You are about to drop the column `target_id` on the `SpeechAttempts` table. All the data in the column will be lost.
  - You are about to drop the column `transcribed_text` on the `SpeechAttempts` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `SpeechAttempts` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `SpeechTargets` table. All the data in the column will be lost.
  - You are about to drop the column `expected_text` on the `SpeechTargets` table. All the data in the column will be lost.
  - Added the required column `targetId` to the `SpeechAttempts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transcribedText` to the `SpeechAttempts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SpeechAttempts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wordsRead` to the `SpeechAttempts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expectedText` to the `SpeechTargets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `SpeechTargets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wordsCount` to the `SpeechTargets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SpeechAttempts" DROP CONSTRAINT "SpeechAttempts_target_id_fkey";

-- AlterTable
ALTER TABLE "SpeechAttempts" DROP COLUMN "accuracy_score",
DROP COLUMN "created_at",
DROP COLUMN "imageUrl",
DROP COLUMN "target_id",
DROP COLUMN "transcribed_text",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "targetId" TEXT NOT NULL,
ADD COLUMN     "transcribedText" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "wordsRead" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SpeechTargets" DROP COLUMN "created_at",
DROP COLUMN "expected_text",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expectedText" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "wordsCount" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SpeechAttempts" ADD CONSTRAINT "SpeechAttempts_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "SpeechTargets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeechAttempts" ADD CONSTRAINT "SpeechAttempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
