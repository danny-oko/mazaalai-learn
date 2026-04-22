"use client";

import { Lock, BookOpen, PenLine, Check } from "lucide-react";
import { useState } from "react";

const lessons = [
  { id: 1, icon: Check, title: "Introduction", status: "done" },
  { id: 2, icon: BookOpen, title: "Vowels", status: "done" },
  { id: 3, icon: PenLine, title: "Consonants 1", status: "active" },
  { id: 4, icon: Lock, title: "Consonants 2", status: "locked" },
  { id: 5, icon: BookOpen, title: "Grammar", status: "locked" },
  { id: 6, icon: PenLine, title: "Writing", status: "locked" },
  { id: 7, icon: BookOpen, title: "Final Test", status: "locked" },
];

const X = [47, 78, 47, 18, 47, 78, 47];
const ROW = 160;
const SW = 340;

export const LessonCards = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      {lessons.map((l, i) => {
        const isLocked = l.status === "locked";
        const isDone = l.status === "done";
        const isActive = l.status === "active";
        const Icon = l.icon;
        const onRight = X[i] > 50;

        return (
          <div
            key={l.id}
            className="absolute flex flex-col items-center"
            style={{
              left: `${X[i]}%`,
              top: `${i * ROW + 20}px`,
              transform: "translateX(-50%)",
              zIndex: 10,
            }}
          >
            {/* Circle */}
            <button
              disabled={isLocked}
              onClick={() =>
                setSelected(selected === Number(l.id) ? null : Number(l.id))
              }
              className="relative flex items-center justify-center rounded-full transition-transform duration-200"
              style={{
                width: isActive ? 80 : 72,
                height: isActive ? 80 : 72,
                background: isLocked
                  ? "#E8E5DC"
                  : isDone
                  ? "#539f7e"
                  : "#0F5238",
                border: isLocked
                  ? "2px dashed #BFC9C1"
                  : isDone
                  ? "none"
                  : "none",
                cursor: isLocked ? "not-allowed" : "pointer",
                transform: isActive ? "scale(1.05)" : "scale(1)",
              }}
            >
              <Icon
                size={isActive ? 28 : 24}
                color={isLocked ? "#BFC9C1" : "#fff"}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </button>

            {/* Active label pill */}
            {isActive && (
              <div
                className="mt-3 px-5 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase text-white"
                style={{ background: "#0F5238" }}
              >
                {l.title}
              </div>
            )}

            {/* Done / Locked plain label */}
            {!isActive && (
              <p
                className={`mt-2 text-[13px] font-bold bg-[#ECE8D8] rounded-2xl p-1`}
                style={{ color: isLocked ? "#BFC9C1" : "#0F5238" }}
              >
                {l.title}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
