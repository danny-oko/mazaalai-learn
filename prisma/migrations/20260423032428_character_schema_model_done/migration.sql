-- CreateEnum
CREATE TYPE "FormType" AS ENUM ('INITIAL', 'MEDIAL', 'FINAL');

-- CreateEnum
CREATE TYPE "CharacterType" AS ENUM ('VOWALS', 'CONSONANTS');

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unicode" TEXT NOT NULL,
    "description" TEXT,
    "type" "CharacterType" NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "glyph" TEXT NOT NULL,
    "type" "FormType" NOT NULL,
    "imgUrl" TEXT,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Character_unicode_key" ON "Character"("unicode");

-- CreateIndex
CREATE UNIQUE INDEX "Form_characterId_type_key" ON "Form"("characterId", "type");

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
