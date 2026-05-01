"use client";

import { useEffect, useRef, useState } from "react";

export default function StrokeAnimation({
  path,
  play,
}: {
  path: string;
  play: boolean;
}) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [length, setLength] = useState(0);

  // Path length calculate
  useEffect(() => {
    if (pathRef.current) {
      const totalLength = pathRef.current.getTotalLength();
      setLength(totalLength);
    }
  }, [path]);

  // Play trigger
  useEffect(() => {
    if (!pathRef.current) return;

    const el = pathRef.current;

    if (play) {
      el.style.transition = "none";
      el.style.strokeDashoffset = `${length}`;

      // force repaint
      el.getBoundingClientRect();

      el.style.transition =
        "stroke-dashoffset 2s cubic-bezier(0.47,0,0.745,0.715)";
      el.style.strokeDashoffset = "0";
    }
  }, [play, length]);

  return (
    <svg
      viewBox="0 0 40 50"
      className="h-full w-full"
      fill="none"
      stroke="#003D27"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        ref={pathRef}
        d={path}
        strokeDasharray={length}
        strokeDashoffset={length}
      />
    </svg>
  );
}
