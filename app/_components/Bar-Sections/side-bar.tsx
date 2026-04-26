"use client";

import { usePathname, useRouter } from "next/navigation";
import "@fontsource/plus-jakarta-sans";
import type { MenuLabel } from "./main-bars";

const menuIcons: Record<MenuLabel, string> = {
  Map: "./house.png",
  Dictionary: "./dictionary.png",
  Leaderboard: "./winner.png",
  Profile: "./chicken.png",
};

type HeaderClientProps = {
  menuLabels: readonly MenuLabel[];
  menuPaths: Record<MenuLabel, string>;
};

export const SideBar = ({ menuLabels, menuPaths }: HeaderClientProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const active =
    menuLabels.find((label) => pathname.startsWith(menuPaths[label])) ??
    menuLabels[0];

  const handleNav = (label: MenuLabel) => {
    router.push(menuPaths[label]);
  };

  return (
    <aside
      className="fixed top-0 left-0 z-40 hidden h-full w-[15rem] flex-col bg-[#FEFAE8] shadow-2xl md:flex lg:w-[17.5rem] xl:w-[25rem]"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between px-5 h-[60px] border-b border-[#E8DFC8]">
        <h2 className="font-bold text-[#0F5238] text-lg font-['Plus_Jakarta_Sans']">
          Mazaalai Learn
        </h2>
      </div>

      <nav className="flex flex-col gap-1 p-4 flex-1">
        {menuLabels.map((label) => {
          const Icon = menuIcons[label];
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => handleNav(label)}
              className={`flex items-center gap-5 px-4 py-3 rounded-xl font-bold text-[16px]
              transition-all duration-150 font-['Plus_Jakarta_Sans']
              ${
                isActive
                  ? "bg-[#0F5238] text-white shadow-md"
                  : "text-[#0F5238] hover:bg-[#F2EEDD]"
              }`}
            >
              <img
                src={menuIcons[label]}
                alt={label}
                width={25}
                height={25}
                className={`transition-all duration-200 ${
                  isActive ? "opacity-100" : "opacity-100"
                }`}
              />
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
