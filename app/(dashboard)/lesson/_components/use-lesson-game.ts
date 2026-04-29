"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LessonContent, Task } from "./lesson-types";
import { LessonReviewStats } from "./lesson-review-types";

type Phase = "teaching" | "tasks";

interface State {
  contents: LessonContent[];
  contentIndex: number;
  tasks: Task[];
  taskIndex: number;
  phase: Phase;
  hearts: number;
  selected: string | null;
  loading: boolean;
  reviewStats: LessonReviewStats | null;
  isFailed: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function saveProgress(
  lessonId: string,
  userId: string,
  heartsRemaining: number,
  xpEarned: number,
) {
  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lessonId,
        userId,
        heartsRemaining,
        xpEarned,
        status: "COMPLETED",
      }),
    });
  } catch {}
}

export function useLessonGame(lessonId: string, userId: string) {
  const [state, setState] = useState<State>({
    contents: [],
    contentIndex: 0,
    tasks: [],
    taskIndex: 0,
    phase: "teaching",
    hearts: 3,
    selected: null,
    loading: true,
    reviewStats: null,
    isFailed: false,
  });

  const correctRef = useRef(0);
  const totalRef = useRef(0);
  const startRef = useRef(Date.now());

  useEffect(() => {
    Promise.all([
      fetch(`/api/lesson-contents?lessonId=${lessonId}`).then((r) => r.json()),
      fetch(`/api/tasks?lessonId=${lessonId}`).then((r) => r.json()),
      fetch(`/api/progress?lessonId=${lessonId}&userId=${userId}`).then((r) =>
        r.ok ? r.json() : null,
      ),
    ])
      .then(
        ([contents, tasks, progress]: [
          LessonContent[],
          Task[],
          { mistakeCount: number } | null,
        ]) => {
          startRef.current = Date.now();
          setState((s) => ({
            ...s,
            contents: contents.sort((a, b) => a.order - b.order),
            tasks: tasks.sort((a, b) => a.order - b.order),
            hearts: progress?.mistakeCount ?? 3,
            loading: false,
          }));
        },
      )
      .catch(() => setState((s) => ({ ...s, loading: false })));
  }, [lessonId, userId]);

  const {
    phase,
    contents,
    contentIndex,
    tasks,
    taskIndex,
    hearts,
    selected,
    loading,
    reviewStats,
    isFailed,
  } = state;

  const currentContent = contents[contentIndex] ?? null;
  const currentTask = tasks[taskIndex] ?? null;

  const totalSteps = contents.length + tasks.length;
  const completedSteps =
    phase === "teaching" ? contentIndex : contents.length + taskIndex;
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  const choices: string[] = useMemo(() => {
    if (!currentTask) return [];
    if (currentTask.options?.length) return shuffle(currentTask.options);
    const others = tasks
      .filter((t) => t.id !== currentTask.id)
      .map((t) => t.correctAnswer)
      .slice(0, 3);
    return shuffle([...others, currentTask.correctAnswer]);
  }, [currentTask, tasks]);

  function setSelected(val: string | null) {
    setState((s) => ({ ...s, selected: val }));
  }

  function advanceContent() {
    setState((s) => {
      const next = s.contentIndex + 1;
      if (next < s.contents.length)
        return { ...s, contentIndex: next, selected: null };
      if (!s.tasks.length)
        return { ...s, selected: null, reviewStats: buildReview(s.hearts) };
      return { ...s, phase: "tasks", selected: null };
    });
  }

  function checkTaskAnswer(skip = false) {
    setState((s) => {
      if (!currentTask) return s;
      totalRef.current += 1;
      const isCorrect = !skip && s.selected === currentTask.correctAnswer;
      if (isCorrect) correctRef.current += 1;
      const nextHearts =
        !skip && !isCorrect ? Math.max(0, s.hearts - 1) : s.hearts;
      if (nextHearts === 0)
        return { ...s, hearts: 0, selected: null, isFailed: true };
      if (!skip && !isCorrect)
        return { ...s, hearts: nextHearts, selected: null };
      const nextTaskIndex = s.taskIndex + 1;
      if (nextTaskIndex < s.tasks.length)
        return {
          ...s,
          taskIndex: nextTaskIndex,
          hearts: nextHearts,
          selected: null,
        };
      saveProgress(
        lessonId,
        userId,
        nextHearts,
        calcXp(s.tasks, correctRef.current),
      );
      return {
        ...s,
        hearts: nextHearts,
        selected: null,
        reviewStats: buildReview(nextHearts),
      };
    });
  }

  function buildReview(remainingHearts: number): LessonReviewStats {
    return {
      xpEarned: calcXp(tasks, correctRef.current) + remainingHearts * 5,
      totalQuestions: totalRef.current,
      correctAnswers: correctRef.current,
      heartsRemaining: remainingHearts,
      timeSeconds: Math.round((Date.now() - startRef.current) / 1000),
    };
  }

  function calcXp(tasks: Task[], correct: number) {
    const total = tasks.reduce((sum, t) => sum + t.xpReward, 0);
    return Math.round(total * (tasks.length > 0 ? correct / tasks.length : 1));
  }

  return {
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
  };
}
