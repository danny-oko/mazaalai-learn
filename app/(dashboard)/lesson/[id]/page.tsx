// app/(dashboard)/lesson/[id]/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { X, Heart, Volume2 } from "lucide-react";

interface LessonContent {
  id: string;
  lessonId: string;
  name: string;
  text: string;
  imageUrl?: string | null;
  order: number;
}

export default function LessonPage() {
  const { id } = useParams();
  const router = useRouter();

  const [contents, setContents] = useState<LessonContent[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [hearts, setHearts] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/lesson-contents?lessonId=${id}`)
      .then((res) => res.json())
      .then((data: LessonContent[]) => {
        setContents(data.sort((a, b) => a.order - b.order));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const item = contents[current];

  // Keep choices stable for the current question; only reshuffle when question changes.
  const choices = useMemo(() => {
    if (!item) return [];

    const allNames = contents.map((c) => c.name);
    const items = [item.name, ...allNames.filter((n) => n !== item.name).slice(0, 3)];

    for (let i = items.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    return items;
  }, [contents, current, item]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8F4E3]">
        <p className="text-[#0F5238] font-bold animate-pulse">Loading...</p>
      </div>
    );
  }

  if (contents.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8F4E3]">
        <p className="text-[#0F5238] font-bold">No content found.</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8F4E3]">
        <p className="text-[#0F5238] font-bold">No content found.</p>
      </div>
    );
  }

  const progress = (current / contents.length) * 100;

  function handleCheck() {
    if (!selected) return;
    if (selected === item.name) {
      if (current + 1 < contents.length) {
        setCurrent((p) => p + 1);
        setSelected(null);
      } else {
        router.back();
      }
    } else {
      setHearts((h) => Math.max(0, h - 1));
      setSelected(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F4E3] flex flex-col font-['Plus_Jakarta_Sans']">
      {/* Top bar */}
      <div className="flex items-center gap-4 px-5 pt-6 pb-2">
        <button
          onClick={() => router.back()}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: "#8B1A1A" }}
          />
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-1.5">
          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
          <span className="font-black text-slate-700">{hearts}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-6 pb-4 flex flex-col gap-6">
        {/* Title + audio */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-black text-slate-800">{item.text}</h1>
          <button className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center text-[#0F5238] hover:bg-slate-100 transition-colors">
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Question */}
        <div>
          <p className="text-lg font-black text-slate-800">
            Select the correct pronunciation
          </p>
          <p className="text-sm text-slate-400 mt-0.5">
            Identify the sound of the vowel above
          </p>
        </div>

        {/* Script display card */}
        <div
          className="w-full rounded-2xl bg-[#F0EDE3] border border-slate-200 flex items-center justify-center relative overflow-hidden"
          style={{ minHeight: 200 }}
        >
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="max-h-40 object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 py-10">
              <div className="w-0.5 h-16 bg-[#0F5238]/30 rounded-full" />
              <p className="absolute bottom-4 right-4 text-sm text-slate-300 italic">
                Classical Mongol Script
              </p>
            </div>
          )}
        </div>

        {/* Answer choices */}
        <div className="grid grid-cols-2 gap-3">
          {choices.map((choice) => {
            const isSelected = selected === choice;
            return (
              <button
                key={choice}
                onClick={() => setSelected(choice)}
                className="flex flex-col items-center justify-center py-6 rounded-2xl border-2 transition-all duration-150 bg-white"
                style={{
                  borderColor: isSelected ? "#0F5238" : "#e2e8f0",
                  background: isSelected ? "#f0faf5" : "white",
                  boxShadow: isSelected
                    ? "0 0 0 2px #0F523820"
                    : "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <span className="text-4xl font-black text-slate-800">
                  {choice[0]}
                </span>
                <span className="text-[11px] font-black tracking-widest uppercase text-slate-400 mt-1">
                  {choice}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Check answer button */}
      <div className="px-5 pb-8">
        <button
          onClick={handleCheck}
          disabled={!selected}
          className="w-full py-4 rounded-2xl font-black text-sm tracking-widest uppercase text-white transition-all duration-200"
          style={{
            background: selected ? "#0F5238" : "#cbd5e1",
            cursor: selected ? "pointer" : "not-allowed",
          }}
        >
          Check Answer
        </button>
      </div>
    </div>
  );
}
