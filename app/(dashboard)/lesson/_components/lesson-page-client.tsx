"use client";

import "@fontsource/plus-jakarta-sans";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LessonCheckButton } from "./lesson-check-button";
import { LessonChoiceGrid } from "./lesson-choice-grid";
import { LessonContentCard } from "./lesson-content-card";
import { LessonTaskCard } from "./lesson-task-card";
import { LessonStatusScreen } from "./lesson-status-screen";
import { LessonTopBar } from "./lesson-top-bar";
import { useLessonGame } from "./use-lesson-game";
import { LessonReviewScreen } from "./lesson-review-screen";

export function LessonPageClient({
  lessonId,
  userId,
}: {
  lessonId: string;
  userId: string;
}) {
  const router = useRouter();
  const {
    loading,
    phase,
    currentContent,
    currentTask,
    choices,
    selected,
    setSelected,
    hearts,
    progress,
    isFailed,
    reviewStats,
    advanceContent,
    checkTaskAnswer,
  } = useLessonGame(lessonId, userId);
  const [skipped, setSkipped] = useState(false);

  if (loading) return <LessonStatusScreen message="Loading..." animated />;
  if (isFailed)
    return (
      <LessonStatusScreen
        message="You're out of hearts."
        description="Try again after your hearts refill in 1 hour."
        actionLabel="Back to lessons"
        onAction={() => router.back()}
      />
    );
  if (reviewStats)
    return (
      <LessonReviewScreen
        stats={reviewStats}
        onContinue={() => router.back()}
      />
    );
  if (phase === "teaching" && !currentContent)
    return <LessonStatusScreen message="No content found." />;
  if (phase === "tasks" && !currentTask)
    return <LessonStatusScreen message="No tasks found." />;

  function handleCheck() {
    checkTaskAnswer(false);
    if (selected !== currentTask?.correctAnswer) setSkipped(true);
  }

  function handleContinueAfterSkip() {
    setSkipped(false);
    checkTaskAnswer(true);
  }

  return (
    <div className="min-h-screen bg-[#111827] flex flex-col font-['Plus_Jakarta_Sans']">
      <div className="w-full flex flex-1 flex-col">
        <LessonTopBar
          progress={progress}
          hearts={hearts}
          onBack={() => router.back()}
        />
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-5xl px-4 sm:px-8 pt-6 sm:pt-10 pb-4 flex flex-col gap-8">
            {phase === "teaching" && currentContent ? (
              <LessonContentCard item={currentContent} />
            ) : (
              currentTask && (
                <>
                  <LessonTaskCard task={currentTask} />
                  <LessonChoiceGrid
                    choices={choices}
                    selected={selected}
                    onSelect={setSelected}
                  />
                </>
              )
            )}
          </div>
        </div>
        <LessonCheckButton
          isTeaching={phase === "teaching"}
          disabled={phase === "tasks" && !selected && !skipped}
          onClick={phase === "teaching" ? advanceContent : handleCheck}
          onSkip={() => {
            setSkipped(true);
            setSelected(null);
          }}
          skipped={skipped}
          correctAnswer={currentTask?.correctAnswer}
          onContinue={handleContinueAfterSkip}
        />
      </div>
    </div>
  );
}
