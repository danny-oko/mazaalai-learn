// HomePath.tsx
"use client";

import { ROW, SW, useLessons, LessonCards } from "./LessonCards";
import { RoadPath } from "./RoadPath";

export const HomePath = () => {
  const { lessons, completedUpTo, loading, completeLesson } = useLessons();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F0EDE3]">
        <p className="text-[#0F5238] font-bold animate-pulse">Loading...</p>
      </div>
    );
  }

  const totalH = lessons.length * ROW + 80;

  return (
    <div className="flex min-h-screen w-full justify-center bg-[#F0EDE3] px-3 py-8 sm:px-4 sm:py-10 md:px-6">
      <div
        className="relative w-full max-w-[340px]"
        style={{ height: totalH }}
      >
        <RoadPath lessonCount={lessons.length} completedUpTo={completedUpTo} />
        <LessonCards
          lessons={lessons}
          completedUpTo={completedUpTo}
          completeLesson={completeLesson}
        />
      </div>
    </div>
  );
};
