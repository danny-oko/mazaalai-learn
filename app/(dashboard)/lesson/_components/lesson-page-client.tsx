"use client";

import "@fontsource/plus-jakarta-sans";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LessonCheckButton } from "./lesson-check-button";
import { LessonChoiceGrid } from "./lesson-choice-grid";
import { LessonContentCard } from "./lesson-content-card";
import { LessonStatusScreen } from "./lesson-status-screen";
import { LessonTopBar } from "./lesson-top-bar";
import { useLessonGame } from "./use-lesson-game";

export function LessonPageClient({ lessonId }: { lessonId: string }) {
  const router = useRouter();
  const {
    loading,
    contents,
    item,
    selected,
    setSelected,
    hearts,
    progress,
    choices,
    checkAnswer,
    isFailed,
  } = useLessonGame(lessonId);
  const [skipped, setSkipped] = useState(false);

  if (loading) return <LessonStatusScreen message="Loading..." animated />;
  if (!item || contents.length === 0)
    return <LessonStatusScreen message="No content found." />;
  if (isFailed)
    return (
      <LessonStatusScreen
        message="You're out of hearts."
        description="Try again after your hearts refill in 1 hour."
        actionLabel="Back to lessons"
        onAction={() => router.back()}
      />
    );

  function handleSkip() {
    setSkipped(true);
    setSelected(null);
  }

  function handleContinue() {
    setSkipped(false);
    checkAnswer(() => router.back(), true);
  }

  return (
    <div className="min-h-screen bg-[#111827] flex flex-col font-['Plus_Jakarta_Sans']">
      <div className="w-full mx-auto flex flex-1 flex-col">
        <LessonTopBar
          progress={progress}
          hearts={hearts}
          onBack={() => router.back()}
        />
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-5xl px-4 sm:px-8 pt-6 sm:pt-10 pb-4 flex flex-col gap-8">
            <LessonContentCard item={item} />
            <LessonChoiceGrid
              choices={choices}
              selected={selected}
              onSelect={setSelected}
            />
          </div>
        </div>
        <LessonCheckButton
          disabled={!selected && !skipped}
          onClick={() => checkAnswer(() => router.back())}
          onSkip={handleSkip}
          skipped={skipped}
          correctAnswer={item?.name}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
}
