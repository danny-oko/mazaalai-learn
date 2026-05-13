"use client";

import { BookOpen } from "lucide-react";

import { cn } from "@/lib/utils";

import type { MenuLabel } from "./main-bars";

const remoteIcons: Record<Exclude<MenuLabel, "Reading">, string> = {
  Map: "https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg",
  Dictionary:
    "https://d35aaqx5ub95lt.cloudfront.net/vendor/80a60f598d6a6b0493aeb4d7b93fc0e3.svg",
  Leaderboard:
    "https://d35aaqx5ub95lt.cloudfront.net/vendor/ca9178510134b4b0893dbac30b6670aa.svg",
  Profile: "./chicken.png",
};

type NavMenuIconProps = {
  label: MenuLabel;
  className?: string;
  width?: number;
  height?: number;
};

export function NavMenuIcon({
  label,
  className,
  width = 35,
  height = 35,
}: NavMenuIconProps) {
  if (label === "Reading") {
    return (
      <BookOpen
        aria-label={label}
        className={cn("shrink-0 text-current", className)}
        strokeWidth={2}
      />
    );
  }

  return (
    <img
      src={remoteIcons[label]}
      alt={label}
      width={width}
      height={height}
      className={cn("object-contain", className)}
    />
  );
}
