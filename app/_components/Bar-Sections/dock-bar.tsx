"use client";

import { usePathname, useRouter } from "next/navigation";
import type { MenuLabel } from "./main-bars";

const menuIcons: Record<MenuLabel, string> = {
  Map: "./house.png",
  Dictionary: "./dictionary.png",
  Leaderboard: "./winner.png",
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
      className="fixed bottom-0 z-50 w-full p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around gap-1 rounded-full border border-[#ead9bb] bg-[#FFF8E7]/95 p-3 shadow-[0_18px_45px_rgba(122,89,48,0.18)] backdrop-blur-md">
        {menuLabels.map((label) => {
          const isActive = active === label;

          return (
            <button
              key={label}
              type="button"
              onClick={() => router.push(menuPaths[label])}
              className={`flex h-[60px] w-[60px] flex-col items-center justify-center gap-1 rounded-4xl px-2 py-2 font-balsamiq transition-all duration-200
                ${
                  isActive
                    ? "border border-[#e8920a] bg-[#fff2d6] shadow-md"
                    : "hover:bg-[#f8e7c7]"
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
