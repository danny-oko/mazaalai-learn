"use client";

import { Check, Lock, Star } from "lucide-react";
import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export type Lesson = {
  id: string;
  title: string;
  description?: string | null;
  videoUrl?: string | null;
  order: number;
  levelId: string;
  status?: "done" | "active" | "locked";
};

/** Returns a youtube.com/embed/… URL for iframe embedding, or null if not embeddable. */
function toYoutubeEmbedUrl(url: string | null | undefined): string | null {
  if (!url?.trim()) return null;
  const raw = url.trim();
  try {
    const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const u = new URL(withScheme);
    const host = u.hostname.replace(/^www\./i, "").toLowerCase();

    if (host === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname.startsWith("/embed/")) {
        const id = u.pathname.slice("/embed/".length).split("/")[0];
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
      if (u.pathname === "/watch") {
        const v = u.searchParams.get("v");
        return v ? `https://www.youtube.com/embed/${v}` : null;
      }
      if (u.pathname.startsWith("/shorts/")) {
        const id = u.pathname.split("/")[2];
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
      if (u.pathname.startsWith("/live/")) {
        const id = u.pathname.split("/")[2];
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
    }
  } catch {
    return null;
  }
  return null;
}

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

type ProgressItem = {
  lessonId: string;
  status: "LOCKED" | "IN_PROGRESS" | "COMPLETED";
};

function resolveCompletedUpTo(lessons: Lesson[], progress: ProgressItem[]) {
  const sorted = [...lessons].sort((a, b) => a.order - b.order);
  const completedSet = new Set(
    progress
      .filter((item) => item.status === "COMPLETED")
      .map((item) => item.lessonId),
  );
  let contiguousCompleted = 0;
  for (const lesson of sorted) {
    if (!completedSet.has(lesson.id)) break;
    contiguousCompleted += 1;
  }
  return contiguousCompleted;
}

export const useLessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completedUpTo, setCompletedUpTo] = useState(0);

  useEffect(() => {
    Promise.all([
      fetch("/api/lessons").then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      }),
      fetch("/api/progress").then((res) => (res.ok ? res.json() : [])),
    ])
      .then(([lessonsData, progressData]: [Lesson[], ProgressItem[]]) => {
        if (!Array.isArray(lessonsData)) return;
        const nextCompletedUpTo = resolveCompletedUpTo(
          lessonsData,
          Array.isArray(progressData) ? progressData : [],
        );
        setCompletedUpTo(nextCompletedUpTo);
        setLessons(assignStatuses(lessonsData, nextCompletedUpTo));
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  return { lessons, completedUpTo };
};

export const LessonCards = ({
  lessons,
}: {
  lessons: ReturnType<typeof useLessons>["lessons"];
}) => {
  const router = useRouter();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const embedUrl = selectedLesson
    ? toYoutubeEmbedUrl(selectedLesson.videoUrl)
    : null;

  return (
    <>
      <Dialog
        open={selectedLesson !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedLesson(null);
        }}
      >
        <DialogContent
          showCloseButton
          className={cn(
            montserrat.className,
            "max-h-[min(90vh,640px)] overflow-y-auto border-[#ead9bb] sm:max-w-lg",
          )}
          style={{ backgroundColor: "#F0EDE3" }}
        >
          {selectedLesson ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-[#0F5238]">
                  {selectedLesson.title}
                </DialogTitle>
                {selectedLesson.description ? (
                  <DialogDescription className="text-[#3b2f2f]/90">
                    {selectedLesson.description}
                  </DialogDescription>
                ) : (
                  <DialogDescription className="sr-only">
                    Lesson preview
                  </DialogDescription>
                )}
              </DialogHeader>

              <div className="space-y-3">
                {embedUrl ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-inner">
                    <iframe
                      key={embedUrl}
                      title={`Video preview: ${selectedLesson.title}`}
                      src={embedUrl}
                      className="absolute inset-0 h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-[#BFC9C1] bg-[#ECE8D8] text-center text-sm font-medium text-[#7a5930]">
                    No preview video available
                  </div>
                )}
              </div>

              <DialogFooter className="mt-2">
                <Button
                  type="button"
                  className="h-11 w-full border-0 bg-[#58cc02] font-bold uppercase tracking-widest text-white hover:bg-[#58cc02]/90"
                  onClick={() => {
                    router.push(`/lesson/${selectedLesson.id}`);
                    setSelectedLesson(null);
                  }}
                >
                  START LESSON
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogTitle className="sr-only">Lesson</DialogTitle>
              <DialogDescription className="sr-only">
                Lesson details
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>

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
                if (!isLocked) setSelectedLesson(l);
              }}
              className={`
                relative flex items-center justify-center rounded-full transition-all duration-300
                ${isActive && !isLocked ? "hover:-translate-y-1 active:translate-y-0 active:brightness-90 scale-105" : "scale-100"}
                ${
                  isLocked
                    ? "cursor-not-allowed border-2 border-dashed border-[#BFC9C1] bg-[#E8E5DC] dark:border-[#252f35] dark:bg-[#1a2124]"
                    : isDone
                      ? "cursor-pointer border-none bg-[#2C6601] shadow-[0_5px_0_#000000] dark:bg-[#132a24] dark:shadow-[0_5px_0_#09120f]"
                      : "cursor-pointer border-none bg-[#58cc02] shadow-[0_5px_0_rgba(0,118,255,0.39)] dark:bg-[#ffad33] dark:shadow-[0_5px_0_rgba(255,173,51,0.4)]"
                }
              `}
              style={{
                width: isActive ? 80 : 72,
                height: isActive ? 60 : 52,
              }}
            >
              <Icon
                size={isLocked ? 24 : isDone ? 28 : 40}
                strokeWidth={2}
                className={`
                  ${isLocked ? "text-[#BFC9C1] dark:text-[#52606b]" : "text-white dark:text-[#131f24]"}
                  ${isDone ? "fill-transparent" : "fill-current"}
                `}
              />
            </button>
            {isActive && (
              <div className="mt-3 mx-auto max-w-[min(85vw,11rem)] rounded-2xl bg-[#58cc02] dark:bg-[#ffad33] px-4 py-1.5 text-center text-[13px] font-bold uppercase leading-snug tracking-widest text-white dark:text-[#131f24] wrap-break-word sm:max-w-none sm:whitespace-nowrap sm:rounded-full sm:px-5">
                {l.title}
              </div>
            )}
            {!isActive && (
              <p
                className={`
                  mt-2 mx-auto max-w-[min(85vw,11rem)] rounded-2xl bg-[#ECE8D8] dark:bg-[#252f35] px-3 py-1.5 text-center text-[13px] font-bold leading-snug wrap-break-word sm:max-w-none sm:whitespace-nowrap
                  ${isLocked ? "text-[#BFC9C1] dark:text-[#52606b]" : "text-[#0F5238] dark:text-[#4ade80]"}
                `}
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
