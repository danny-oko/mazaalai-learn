"use client";

import { useEffect, useMemo, useState } from "react";
import { LessonContent } from "./lesson-types";

export function useLessonGame(lessonId: string) {
  const [contents, setContents] = useState<LessonContent[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [hearts, setHearts] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/lesson-contents?lessonId=${lessonId}`)
      .then((res) => res.json())
      .then((data: LessonContent[]) => {
        setContents(data.sort((a, b) => a.order - b.order));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [lessonId]);

  const item = contents[current];
  const progress = (current / Math.max(contents.length, 1)) * 100;
  const isFailed = hearts === 0;

  const choices = useMemo(() => {
    if (!item) return [];
    const distractors = contents
      .map((c) => c.name)
      .filter((name) => name !== item.name)
      .slice(0, 3);
    const insertIndex = current % (distractors.length + 1);
    return [
      ...distractors.slice(0, insertIndex),
      item.name,
      ...distractors.slice(insertIndex),
    ];
  }, [contents, current, item]);

  function checkAnswer(onComplete: () => void) {
    if (!selected || !item) return;
    if (selected === item.name) {
      if (current + 1 < contents.length) {
        setCurrent((p) => p + 1);
      } else {
        onComplete();
      }
    } else {
      setHearts((h) => Math.max(0, h - 1));
    }
    setSelected(null);
  }

  return {
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
  };
}
