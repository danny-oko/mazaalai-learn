// LessonCards.tsx
"use client";

import { Lock, BookOpen, PenLine, Check } from "lucide-react";
import { useEffect, useState } from "react";

type Lesson = {
  id: string;
  title: string;
  description: string;
  order: number;
  levelId: string;
  status?: "done" | "active" | "locked";
};

export const X = [47, 78, 47, 18, 47, 78, 47];
export const ROW = 160;
export const SW = 340;

function getIcon(title: string) {
  if (title.toLowerCase().includes("intro")) return Check;
  if (title.toLowerCase().includes("vowel")) return BookOpen;
  if (title.toLowerCase().includes("consonant")) return PenLine;
  if (title.toLowerCase().includes("grammar")) return BookOpen;
  return PenLine;
}

function assignStatuses(lessons: Lesson[], completedUpTo: number): Lesson[] {
  return lessons
    .sort((a, b) => a.order - b.order)
    .map((l, i) => ({
      ...l,
      status:
        i < completedUpTo ? "done" : i === completedUpTo ? "active" : "locked",
    }));
}

export const useLessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completedUpTo, setCompletedUpTo] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/lessons")
      .then((res) => res.json())
      .then((data: Lesson[]) => {
        setLessons(assignStatuses(data, 0));
        setLoading(false);
      });
  }, []);

  function completeLesson() {
    const next = completedUpTo + 1;
    setCompletedUpTo(next);
    setLessons((prev) => assignStatuses(prev, next));
  }

  return { lessons, completedUpTo, loading, completeLesson };
};

export const LessonCards = ({
  lessons,
  completedUpTo,
  completeLesson,
}: {
  lessons: ReturnType<typeof useLessons>["lessons"];
  completedUpTo: number;
  completeLesson: () => void;
}) => {
  return (
    <>
      {lessons.map((l, i) => {
        const isLocked = l.status === "locked";
        const isDone = l.status === "done";
        const isActive = l.status === "active";
        const Icon = getIcon(l.title);
        const xPos = X[i % X.length];

        return (
          <div
            key={l.id}
            className="absolute flex flex-col items-center transition-all duration-500"
            style={{
              left: `${xPos}%`,
              top: `${i * ROW + 20}px`,
              transform: "translateX(-50%)",
              zIndex: 10,
            }}
          >
            <button
              disabled={isLocked}
              onClick={() => {
                if (isActive) completeLesson();
              }}
              className="relative flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                width: isActive ? 80 : 72,
                height: isActive ? 80 : 72,
                background: isLocked
                  ? "#E8E5DC"
                  : isDone
                  ? "#539f7e"
                  : "#0F5238",
                border: isLocked ? "2px dashed #BFC9C1" : "none",
                boxShadow: isDone
                  ? "0 0 0 6px #C8EDD9"
                  : isActive
                  ? "0 0 0 8px #C8EDD933"
                  : "none",
                cursor: isLocked ? "not-allowed" : "pointer",
                transform: isActive ? "scale(1.05)" : "scale(1)",
              }}
            >
              <Icon
                size={isActive ? 28 : 24}
                color={isLocked ? "#BFC9C1" : "#fff"}
                strokeWidth={2}
              />
            </button>

            {isActive && (
              <div
                className="mt-3 px-5 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase text-white"
                style={{ background: "#0F5238" }}
              >
                {l.title}
              </div>
            )}

            {!isActive && (
              <p
                className="mt-2 text-[13px] font-bold bg-[#ECE8D8] rounded-2xl px-3 py-1"
                style={{ color: isLocked ? "#BFC9C1" : "#0F5238" }}
              >
                {l.title}
              </p>
            )}
          </div>
        );
      })}
    </>
  );
};
