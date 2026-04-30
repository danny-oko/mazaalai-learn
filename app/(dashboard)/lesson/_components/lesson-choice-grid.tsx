import { Montserrat } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import { TaskType } from "./lesson-types";
import { LessonChoice, MatchRenderData } from "./use-lesson-game";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

interface LessonChoiceGridProps {
<<<<<<< HEAD
  // We want the raw array of strings here for the component to remain generic
  choices: string[];
=======
  taskType: TaskType;
  matchData: MatchRenderData | null;
  choices: LessonChoice[];
>>>>>>> 58916d7 (Smart Quiz Type Selector)
  selected: string | null;
  onSelect: (choice: string) => void;
}

export function LessonChoiceGrid({
  taskType,
  matchData,
  choices,
  selected,
  onSelect,
}: LessonChoiceGridProps) {
  const [activeLeftId, setActiveLeftId] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});

  const leftIds = useMemo(
    () => (matchData ? matchData.leftSide.map((item) => item.id) : []),
    [matchData],
  );
  const matchColors = ["#EF4444", "#3B82F6", "#22C55E", "#F59E0B"];
  const rightIdToBadge = useMemo(() => {
    if (!matchData) return new Map<string, string>();
    const map = new Map<string, string>();
    matchData.rightSide.forEach((item, index) => {
      map.set(item.id, String.fromCharCode(65 + index));
    });
    return map;
  }, [matchData]);
  const rightIdToColor = useMemo(() => {
    if (!matchData) return new Map<string, string>();
    const map = new Map<string, string>();
    matchData.rightSide.forEach((item, index) => {
      map.set(item.id, matchColors[index % matchColors.length]);
    });
    return map;
  }, [matchData]);
  const matchResetKey = useMemo(() => {
    if (taskType !== "MATCH" || !matchData) return "nomatch";
    const left = matchData.leftSide.map((item) => item.id).join(",");
    const right = matchData.rightSide.map((item) => item.id).join(",");
    return `${left}|${right}`;
  }, [matchData, taskType]);

  useEffect(() => {
    setActiveLeftId(null);
    setMatches({});
    if (taskType === "MATCH") onSelect("");
  }, [matchResetKey, onSelect, taskType]);

  useEffect(() => {
    if (taskType !== "MATCH") return;
    const complete = leftIds.length > 0 && leftIds.every((id) => matches[id]);
    onSelect(complete ? JSON.stringify(matches) : "");
  }, [leftIds, matches, onSelect, taskType]);

  function handleRightSelect(rightId: string) {
    if (!activeLeftId) return;
    setMatches((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((leftId) => {
        if (next[leftId] === rightId) delete next[leftId];
      });
      next[activeLeftId] = rightId;
      return next;
    });
    setActiveLeftId(null);
  }

  if (taskType === "MATCH" && matchData) {
    return (
      <div
        className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${montserrat.className}`}
      >
        <div className="space-y-3">
          <p className="text-xs font-black uppercase tracking-widest text-[#6B7280]">
            Left Side
          </p>
          {matchData.leftSide.map((item, index) => {
            const isActive = activeLeftId === item.id;
            const matchedRightId = matches[item.id];
            const matchedColor = matchedRightId
              ? (rightIdToColor.get(matchedRightId) ?? "#58CC02")
              : null;
            const matchedBadge = matchedRightId
              ? (rightIdToBadge.get(matchedRightId) ?? matchedRightId)
              : null;
            const leftBadge = String(index + 1);
            const leftBadgeColor =
              matchedColor ?? (isActive ? "#58CC02" : "#4B5563");
            return (
              <button
                key={`left-${item.id}`}
                onClick={() => setActiveLeftId(item.id)}
                className="w-full rounded-2xl border-2 px-4 py-3 text-left text-sm font-bold transition-all"
                style={{
                  background: "#1A202C",
                  borderColor:
                    matchedColor ?? (isActive ? "#58CC02" : "#374151"),
                  color: matchedColor ?? (isActive ? "#58CC02" : "#FFFFFF"),
                  boxShadow: matchedColor
                    ? "0 4px 0 rgba(0,0,0,0.25)"
                    : isActive
                      ? "0 4px 0 #3A8C01"
                      : "0 4px 0 #1F2937",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-black text-white shrink-0"
                    style={{ backgroundColor: leftBadgeColor }}
                  >
                    {leftBadge}
                  </span>
                  <span className="flex-1">{item.text}</span>
                  {matchedBadge ? (
                    <span
                      className="inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-black text-white shrink-0"
                      style={{ backgroundColor: matchedColor ?? "#58CC02" }}
                    >
                      {matchedBadge}
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
        <div className="space-y-3">
          <p className="text-xs font-black uppercase tracking-widest text-[#6B7280]">
            Right Side
          </p>
          {matchData.rightSide.map((item) => {
            const isTaken = Object.values(matches).includes(item.id);
            const badge = rightIdToBadge.get(item.id) ?? item.id;
            const color = rightIdToColor.get(item.id) ?? "#58CC02";
            return (
              <button
                key={`right-${item.id}`}
                onClick={() => handleRightSelect(item.id)}
                className="w-full rounded-2xl border-2 px-4 py-3 text-left text-sm font-bold transition-all"
                style={{
                  background: "#1A202C",
                  borderColor: isTaken ? color : "#374151",
                  color: isTaken ? color : "#FFFFFF",
                  boxShadow: isTaken
                    ? "0 4px 0 rgba(0,0,0,0.25)"
                    : "0 4px 0 #1F2937",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-black text-white"
                    style={{ backgroundColor: color }}
                  >
                    {badge}
                  </span>
                  <span>{item.text}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const gridClass =
    taskType === "MATCH"
      ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
      : "grid grid-cols-2 sm:grid-cols-4 gap-3";

  return (
<<<<<<< HEAD
    // Changed to grid-cols-1 because your text is long sentences
    <div
      className={`grid grid-cols-1 gap-4 w-full max-w-2xl mx-auto ${montserrat.className}`}
    >
      {choices.map((choice, index) => {
        const isSelected = selected === choice;

        return (
          <button
            key={`${index}-${choice}`}
            type="button"
            onClick={() => onSelect(choice)}
            className={`
              flex items-center gap-4 p-5 rounded-2xl border-2
              transition-all duration-100 active:scale-[0.98] text-left
              ${
                isSelected
                  ? "bg-[#1A202C] border-[#58CC02] text-[#58CC02] shadow-[0_4px_0_#3A8C01] -translate-y-[1px]"
                  : "bg-[#1A202C] border-[#374151] text-white shadow-[0_4px_0_#1F2937] hover:bg-[#2D3748]"
              }
            `}
          >
            {/* Index Badge */}
            <div
              className={`
              flex-shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center text-sm font-bold
              ${isSelected ? "border-[#58CC02] bg-[#58CC02]/10" : "border-[#374151] text-[#374151]"}
            `}
            >
              {index + 1}
            </div>

            {/* Answer Text */}
            <span className="text-lg font-semibold leading-snug">{choice}</span>
          </button>
        );
      })}
=======
    <div className={`flex flex-col gap-3 ${montserrat.className}`}>
      <div className={gridClass}>
        {choices.map((choice, index) => {
          const sel = selected === choice.value;

          return (
            <button
              key={`${choice.value}-${index}`}
              onClick={() => onSelect(choice.value)}
              className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-100 active:scale-95"
              style={{
                background: "#1A202C",
                borderColor: sel ? "#E8920A" : "#374151",
                boxShadow: sel ? "0 4px 10px #E8920A" : "0 4px 0 #1F2937",
                color: sel ? "#E8920A" : "#FFFFFF",
              }}
            >
              <span className="text-lg font-black">{choice.label}</span>
            </button>
          );
        })}
      </div>
>>>>>>> 58916d7 (Smart Quiz Type Selector)
    </div>
  );
}
