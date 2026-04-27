"use client";

import { useRouter } from "next/navigation";
import { LessonCheckButton } from "./lesson-check-button";
import { LessonChoiceGrid } from "./lesson-choice-grid";
import { LessonContentCard } from "./lesson-content-card";
import { LessonStatusScreen } from "./lesson-status-screen";
import { LessonTopBar } from "./lesson-top-bar";
import { useLessonGame } from "./use-lesson-game";

interface LessonPageClientProps {
  lessonId: string;
}

export function LessonPageClient({ lessonId }: LessonPageClientProps) {
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

  if (loading) {
    return <LessonStatusScreen message="Loading..." animated />;
  }

  if (contents.length === 0) {
    return <LessonStatusScreen message="No content found." />;
  }

  if (!item) {
    return <LessonStatusScreen message="No content found." />;
  }

  if (isFailed) {
    return (
      <LessonStatusScreen
        message="You're out of hearts."
        description="You can try again after your hearts refill in 1 hour."
        actionLabel="Back to lesson list"
        onAction={() => router.back()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F4E3] flex flex-col font-['Plus_Jakarta_Sans']">
      <LessonTopBar progress={progress} hearts={hearts} onBack={() => router.back()} />

      <div className="flex-1 px-5 pt-6 pb-4 flex flex-col gap-6">
        <LessonContentCard item={item} />
        <LessonChoiceGrid
          choices={choices}
          selected={selected}
          onSelect={(choice) => setSelected(choice)}
        />
      </div>

      <LessonCheckButton disabled={!selected} onClick={() => checkAnswer(() => router.back())} />
    </div>
  );
}
