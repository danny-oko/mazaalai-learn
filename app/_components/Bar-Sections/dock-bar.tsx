"use client";

import { usePathname, useRouter } from "next/navigation";
import type { MenuLabel } from "./main-bars";

const menuIcons: Record<MenuLabel, string> = {
  Map: "https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg",
  Dictionary:
    "https://d35aaqx5ub95lt.cloudfront.net/vendor/80a60f598d6a6b0493aeb4d7b93fc0e3.svg",
  Leaderboard:
    "https://d35aaqx5ub95lt.cloudfront.net/vendor/ca9178510134b4b0893dbac30b6670aa.svg",
  Profile: "./chicken.png",
};

type DockBarProps = {
  menuLabels: readonly MenuLabel[];
  menuPaths: Record<MenuLabel, string>;
};

export const DockBar = ({ menuLabels, menuPaths }: DockBarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const active =
    menuLabels.find((label) => pathname.startsWith(menuPaths[label])) ??
    menuLabels[0];

  return (
    <nav
      className="fixed bottom-0 z-50 w-full md:hidden border-t-2 border-[#d6d4d4]"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around gap-1 rounded-full p-3 shadow-xl backdrop-blur-md">
        {menuLabels.map((label) => {
          const isActive = active === label;

          return (
            <button
              key={label}
              onClick={() => router.push(menuPaths[label])}
              className={`flex flex-col items-center gap-1 px-2 py-2 transition-all duration-200 font-['Plus_Jakarta_Sans'] rounded-4xl w-[60px] h-[60px] justify-center
                border 
                ${
                  isActive
                    ? "bg-[#84d8ff]/50 text-[#1cb0f6] border-[#84d8ff]"
                    : "text-[#777777] hover:bg-[#F2EEDD] border-transparent"
                }`}
            >
              <img
                src={menuIcons[label]}
                alt={label}
                width={30}
                height={30}
                className={`transition-all duration-200`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
