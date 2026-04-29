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
      className="fixed top-0 left-0 z-40 hidden h-full flex-col bg-[#FEFAE8] shadow-2xl md:flex md:w-20 lg:w-[256px]"
      aria-label="Main navigation"
    >
      <div className="flex h-[60px] items-center justify-center border-b border-[#E8DFC8] px-5 lg:justify-between">
        <img
          src="./bear.png"
          alt="Mazaalai Learn"
          className="block object-contain md:block lg:hidden w-50 h-50"
        />
        <h2 className="font-bold text-[#0F5238] text-lg font-['Plus_Jakarta_Sans'] md:hidden lg:block">
          Mazaalai Learn
        </h2>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3 lg:p-4">
        {menuLabels.map((label) => {
          const Icon = menuIcons[label];
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => handleNav(label)}
              className={`flex items-center justify-center rounded-xl px-3 py-3 font-bold text-[16px] lg:justify-start lg:gap-5 lg:px-4
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
              <div className="md:hidden lg:block">{label}</div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
