// HomePath.tsx
"use client";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

import { ROW, SW, useLessons, LessonCards } from "./home-lesson-cards";
import { RoadPath } from "./home-road-path";

export const HomePath = () => {
  const { lessons, completedUpTo, loading, completeLesson } = useLessons();

  if (loading) {
    return (
      <div
        className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-3 bg-[#F0EDE3] py-16 font-['Plus_Jakarta_Sans']"
        aria-busy="true"
        aria-label="Loading lessons"
      >
        <img
          src="/bear.png"
          alt=""
          width={48}
          height={48}
          className="animate-spin"
        />
        <p className="text-sm font-semibold text-amber-900/80">Loading lessons…</p>
      </div>
    );
  }

  const totalH = lessons.length * ROW + 80;

  return (
    <div
      className={`flex w-full justify-center bg-[#F0EDE3] px-3 py-8 sm:px-4 sm:py-10 md:px-6 ${montserrat.className}`}
    >
      <div className="relative w-full max-w-[340px]" style={{ height: totalH }}>
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
