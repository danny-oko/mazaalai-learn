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
      <div className="flex items-center justify-around gap-1 rounded-full p-3 shadow-xl backdrop-blur-md">
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
                className={`transition-all duration-200`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
