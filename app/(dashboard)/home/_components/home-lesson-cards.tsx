// LessonCards.tsx
"use client";

import { Lock, BookOpen, Check, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type Lesson = {
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
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data: Lesson[]) => {
        if (!Array.isArray(data)) return;
        setLessons(assignStatuses(data, 0));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
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
  const router = useRouter();

  return (
    <>
      {lessons.map((l, i) => {
        const isLocked = l.status === "locked";
        const isDone = l.status === "done";
        const isActive = l.status === "active";
        const Icon = isLocked ? Lock : isDone ? Check : Star;
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
                if (!isLocked) router.push(`/lesson/${l.id}`);
              }}
              className="relative flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                width: isActive ? 80 : 72,
                height: isActive ? 80 : 72,
                background: isLocked
                  ? "#E8E5DC"
                  : isDone
                    ? "#539f7e"
                    : "#58cc02",
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
                size={isActive ? 40 : 24}
                color={isLocked ? "#BFC9C1" : "#fff"}
                strokeWidth={2}
                fill={isLocked ? "#BFC9C1" : "#fff"}
              />
            </button>

            {isActive && (
              <div
                className="mt-3 mx-auto max-w-[min(85vw,11rem)] rounded-2xl px-4 py-1.5 text-center text-[13px] font-bold uppercase leading-snug tracking-widest text-white wrap-break-word sm:max-w-none sm:whitespace-nowrap sm:rounded-full sm:px-5"
                style={{ background: "#58cc02" }}
              >
                {l.title}
              </div>
            )}

            {!isActive && (
              <p
                className="mt-2 mx-auto max-w-[min(85vw,11rem)] rounded-2xl bg-[#ECE8D8] px-3 py-1.5 text-center text-[13px] font-bold leading-snug wrap-break-word sm:max-w-none sm:whitespace-nowrap"
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
