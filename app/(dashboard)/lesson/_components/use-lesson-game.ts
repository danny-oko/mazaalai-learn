"use client";

import { useEffect, useState } from "react";
import { LessonContent } from "./lesson-types";

export function useLessonGame(lessonId: string) {
  const [contents, setContents] = useState<LessonContent[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [hearts, setHearts] = useState(5);
  const [loading, setLoading] = useState(true);
  const [choices, setChoices] = useState<string[]>([]);

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

  function buildShuffledChoices(target: LessonContent) {
    const pool = contents
      .map((c) => c.name)
      .filter((n) => n !== target.name)
      .slice(0, 3);
    const next = [...pool, target.name];
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    return next;
  }

  useEffect(() => {
    if (!item) {
      setChoices([]);
      return;
    }
    setChoices(buildShuffledChoices(item));
  }, [contents, current]);

  // skip=true advances without touching hearts
  function checkAnswer(onComplete: () => void, skip = false) {
    if (!item) return;
    if (skip || selected === item.name) {
      if (current + 1 < contents.length) {
        setCurrent((p) => p + 1);
      } else {
        onComplete();
      }
    } else {
      setHearts((h) => Math.max(0, h - 1));
      setChoices(buildShuffledChoices(item));
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
