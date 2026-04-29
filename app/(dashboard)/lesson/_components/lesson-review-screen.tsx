"use client";

import { useEffect, useState } from "react";
import { LessonReviewStats } from "./lesson-review-types";

function AnimatedNumber({
  target,
  duration = 1200,
}: {
  target: number;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return <>{value}</>;
}

function CircleProgress({ percent }: { percent: number }) {
  const [animated, setAnimated] = useState(0);
  const size = 140,
    stroke = 12;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(percent), 100);
    return () => clearTimeout(t);
  }, [percent]);

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#1F2937"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={
          percent >= 80 ? "#58CC02" : percent >= 50 ? "#FBBF24" : "#FF4B4B"
        }
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ - (animated / 100) * circ}
        style={{
          transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </svg>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 bg-[#1F2937] rounded-2xl py-5 px-3 border border-[#374151]">
      <span
        className="text-[10px] font-black tracking-widest uppercase"
        style={{ color: accent }}
      >
        {label}
      </span>
      <span className="text-2xl sm:text-3xl font-black text-white leading-none">
        {value}
      </span>
    </div>
  );
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  return m > 0 ? `${m}m ${s % 60}s` : `${s}s`;
}

export function LessonReviewScreen({
  stats,
  onContinue,
}: {
  stats: LessonReviewStats;
  onContinue: () => void;
}) {
  const {
    xpEarned,
    totalQuestions,
    correctAnswers,
    heartsRemaining,
    timeSeconds,
  } = stats;
  const accuracy =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 100;
  const isPerfect = heartsRemaining === 3 && accuracy === 100;

  return (
    <div className="min-h-screen bg-[#111827] flex flex-col items-center justify-center px-4 py-10 font-['Plus_Jakarta_Sans']">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-5xl mb-1">
            {isPerfect ? "🏆" : accuracy >= 80 ? "⭐" : "💪"}
          </div>
          <h1 className="text-3xl font-black text-white">
            {isPerfect
              ? "Perfect Lesson!"
              : accuracy >= 80
                ? "Lesson Complete!"
                : "Keep Practicing!"}
          </h1>
          <p className="text-[#6B7280] text-sm font-semibold">
            {isPerfect
              ? "Flawless — not a single mistake!"
              : accuracy >= 50
                ? "Good effort, keep it up!"
                : "Review the material and try again."}
          </p>
        </div>

        {/* Accuracy ring */}
        <div className="relative flex items-center justify-center">
          <CircleProgress percent={accuracy} />
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-black text-white leading-none">
              <AnimatedNumber target={accuracy} />%
            </span>
            <span className="text-[10px] font-black tracking-widest uppercase text-[#6B7280]">
              Accuracy
            </span>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-3 w-full">
          <StatCard
            label="XP Earned"
            accent="#FBBF24"
            value={
              <>
                <AnimatedNumber target={xpEarned} />
                <span className="text-base ml-0.5">✨</span>
              </>
            }
          />
          <StatCard
            label="Hearts"
            accent="#FF4B4B"
            value={
              <>
                <AnimatedNumber target={heartsRemaining} />
                <span className="text-base ml-0.5">❤️</span>
              </>
            }
          />
          <StatCard
            label="Time"
            accent="#60A5FA"
            value={<span className="text-xl">{formatTime(timeSeconds)}</span>}
          />
        </div>

        {/* Score bar */}
        <div className="w-full bg-[#1F2937] rounded-2xl p-4 border border-[#374151] flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black tracking-widest uppercase text-[#6B7280]">
              Questions
            </span>
            <span className="text-sm font-black text-white">
              {correctAnswers} / {totalQuestions} correct
            </span>
          </div>
          <div className="h-3 rounded-full overflow-hidden bg-[#374151]">
            <div
              className="h-full rounded-full transition-all delay-300"
              style={{
                width: `${accuracy}%`,
                background:
                  accuracy >= 80
                    ? "#58CC02"
                    : accuracy >= 50
                      ? "#FBBF24"
                      : "#FF4B4B",
                transition: "width 1.2s cubic-bezier(0.4,0,0.2,1) 0.3s",
              }}
            />
          </div>
        </div>

        {/* XP breakdown */}
        <div className="w-full bg-[#1F2937] rounded-2xl p-4 border border-[#374151] flex flex-col gap-2">
          <span className="text-xs font-black tracking-widest uppercase text-[#6B7280]">
            XP Breakdown
          </span>
          <div className="flex justify-between text-sm font-semibold text-[#9CA3AF]">
            <span>Task rewards</span>
            <span className="text-white font-black">
              +{Math.max(0, xpEarned - heartsRemaining * 5)} ✨
            </span>
          </div>
          <div className="flex justify-between text-sm font-semibold text-[#9CA3AF]">
            <span>Hearts bonus</span>
            <span className="text-white font-black">
              +{heartsRemaining * 5} ✨
            </span>
          </div>
          <div className="h-px bg-[#374151]" />
          <div className="flex justify-between text-sm font-black text-white">
            <span>Total</span>
            <span className="text-[#FBBF24]">+{xpEarned} ✨</span>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="w-full py-4 rounded-2xl font-black text-base tracking-widest uppercase text-white active:scale-95 transition-all"
          style={{ background: "#58CC02", boxShadow: "0 4px 0 #3A8C01" }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
