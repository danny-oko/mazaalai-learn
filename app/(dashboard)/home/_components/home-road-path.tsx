// RoadPath.tsx
"use client";

import { X, ROW, SW } from "./home-lesson-cards";

function buildPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1],
      b = pts[i];
    const my = (a.y + b.y) / 2;
    d += ` C ${a.x} ${my} ${b.x} ${my} ${b.x} ${b.y}`;
  }
  return d;
}

export const RoadPath = ({
  lessonCount,
  completedUpTo,
}: {
  lessonCount: number;
  completedUpTo: number;
}) => {
  if (lessonCount < 2) return null;

  const pts = Array.from({ length: lessonCount }, (_, i) => ({
    x: (X[i % X.length] / 100) * SW,
    y: i * ROW + 74,
  }));

  const fullPath = buildPath(pts);
  const donePath = buildPath(pts.slice(0, completedUpTo + 1));

  const totalH = lessonCount * ROW + 80;

  return (
    <svg
      viewBox={`0 0 ${SW} ${totalH}`}
      preserveAspectRatio="none"
      className="absolute inset-0 w-full pointer-events-none"
      style={{ height: totalH }}
    >
      <path
        d={fullPath}
        stroke="#BFC9C1"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="10 8"
      />
      {donePath && (
        <path
          d={donePath}
          stroke="#0F5238"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="10 8"
        />
      )}
    </svg>
  );
};
