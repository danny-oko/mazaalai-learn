import { Montserrat } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import { TaskType } from "./lesson-types";
import { LessonChoice, MatchRenderData } from "./use-lesson-game";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

interface LessonChoiceGridProps {
  taskType: TaskType;
  matchData: MatchRenderData | null;
  choices: LessonChoice[];
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
    (async () => {
      setActiveLeftId(null);
      setMatches({});
      if (taskType === "MATCH") onSelect("");
    })();
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
                  background: "#473108",
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
                    className="inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full px-2 text-xs font-black text-white"
                    style={{ backgroundColor: leftBadgeColor }}
                  >
                    {leftBadge}
                  </span>
                  <span className="flex-1">{item.text}</span>
                  {matchedBadge ? (
                    <span
                      className="inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full px-2 text-xs font-black text-white"
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
                  background: "#473108",
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
      ? "grid grid-cols-1 gap-3 sm:grid-cols-2"
      : "grid grid-cols-2 gap-3 sm:grid-cols-4";

  return (
    <div className={`flex flex-col gap-3 ${montserrat.className}`}>
      <div className={gridClass}>
        {choices.map((choice, index) => {
          const sel = selected === choice.value;

          return (
            <button
              key={`${choice.value}-${index}`}
              onClick={() => onSelect(choice.value)}
              className="flex flex-col items-center justify-center rounded-2xl border-2 p-5 transition-all duration-100 active:scale-95"
              style={{
                background: "#FAD99B",
                borderColor: sel ? "#E8920A" : "#FAD99B",
                boxShadow: sel ? "0 4px 10px #E8920A" : "0 4px 0 #FAD99B",
                color: sel ? "#E8920A" : "#000000",
              }}
            >
              <span className="text-lg font-black">{choice.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

//
