"use client";

import { useEffect, useState } from "react";
import { LessonReviewStats } from "./lesson-review-types";
import { Flame, Heart, Star, Trophy } from "lucide-react";

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
          percent >= 80 ? "#E8920A" : percent >= 50 ? "#FBBF24" : "#FF4B4B"
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
    <div className="flex flex-col items-center justify-center gap-1.5 bg-[#FAD99A] rounded-2xl py-5 px-3 border border-[#E8920A]">
      <span
        className="text-[10px] font-black tracking-widest uppercase"
        style={{ color: accent }}
      >
        {label}
      </span>
      <span className="text-2xl sm:text-3xl font-black text-black leading-none">
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
    <div className="min-h-screen bg-[#FEFAE8] flex flex-col items-center justify-center px-4 py-10 font-['Plus_Jakarta_Sans']">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-5xl mb-1">
            {isPerfect ? (
              <Trophy className="h-20 w-20 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.4)]" />
            ) : accuracy >= 80 ? (
              <Star className="h-20 w-20 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]" />
            ) : (
              <Flame className="h-20 w-20 text-orange-500 fill-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]" />
            )}
          </div>
          <h1 className="text-3xl font-black text-black">
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
            <span className="text-3xl font-black text-black leading-none">
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
            accent="#8c6606"
            value={
              <div className="flex items-center gap-2">
                <AnimatedNumber target={xpEarned} />
                <Star className="h-7 w-7 fill-yellow-400 text-yellow-400" />
              </div>
            }
          />
          <StatCard
            label="Hearts"
            accent="#FF4B4B"
            value={
              <div className="flex items-center gap-2">
                <AnimatedNumber target={heartsRemaining} />
                <Heart className="w-8 h-8 fill-[#FF4B4B] text-[#FF4B4B]" />
              </div>
            }
          />
          <StatCard
            label="Time"
            accent="#60A5FA"
            value={<span className="text-xl">{formatTime(timeSeconds)}</span>}
          />
        </div>

        {/* Score bar */}
        <div className="w-full bg-[#FAD99A] rounded-2xl p-4 border border-[#E8920A] flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black tracking-widest uppercase text-[#6B7280]">
              Questions
            </span>
            <span className="text-sm font-black text-black">
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
        <div className="w-full bg-[#FAD99A] rounded-2xl p-4 border border-[#E8920A] flex flex-col gap-2">
          <span className="text-xs font-black tracking-widest uppercase text-[#6B7280]">
            XP Breakdown
          </span>
          <div className="flex justify-between text-sm font-semibold text-[#9CA3AF]">
            <span>Task rewards</span>
            <span className="text-black font-black flex items-center gap-2">
              +{Math.max(0, xpEarned - heartsRemaining * 5)}
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </span>
          </div>
          <div className="flex justify-between text-sm font-semibold text-[#9CA3AF]">
            <span>Hearts bonus</span>
            <span className="text-black font-black flex items-center gap-2">
              +{heartsRemaining * 5}
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </span>
          </div>
          <div className="h-px bg-[#374151]" />
          <div className="flex justify-between text-sm font-black text-black">
            <span>Total</span>
            <span className="text-[#FBBF24] flex items-center gap-2">
              +{xpEarned}
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </span>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="w-full py-4 rounded-2xl font-black text-base tracking-widest uppercase text-white active:scale-95 transition-all"
          style={{ background: "#E8920A", boxShadow: "0 4px 10px #E8920A" }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
