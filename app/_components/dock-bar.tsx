"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import type { MenuLabel } from "./Bar-Sections/ScreenBars";

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
    <div className="fixed bottom-0 z-50 md:hidden w-full p-5">
      <div className="flex items-center justify-around gap-1 bg-[#FEFAE8] backdrop-blur-md shadow-xl rounded-full p-3">
        {menuLabels.map((label) => {
          const isActive = active === label;

          return (
            <button
              key={label}
              onClick={() => router.push(menuPaths[label])}
              className={`flex flex-col items-center gap-1 px-2 py-2 transition-all duration-200 font-['Plus_Jakarta_Sans'] rounded-4xl w-[60px] h-[60px] justify-center
                ${
                  isActive
                    ? "bg-[#0F5238]/20 shadow-md border border-[#0F5238]"
                    : "hover:bg-[#F2EEDD]"
                }`}
            >
              <img
                src={menuIcons[label]}
                alt={label}
                width={30}
                height={30}
                className={`transition-all duration-200 ${
                  isActive ? "opacity-100" : "opacity-100"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
