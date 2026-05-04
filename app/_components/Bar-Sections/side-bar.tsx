"use client";

import { usePathname, useRouter } from "next/navigation";
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
      className="fixed left-0 top-0 z-40 hidden h-full flex-col border-r border-[#ead9bb] bg-[#FFF8E7] shadow-[12px_0_35px_rgba(122,89,48,0.12)] md:flex md:w-20 lg:w-56"
      aria-label="Main navigation"
    >
      <div className="flex h-[60px] items-center justify-center border-b border-[#ead9bb] px-5 lg:justify-between">
        <img
          src="./bear.png"
          alt="Mazaalai Learn"
          className="block h-12 w-12 object-contain md:block lg:hidden"
        />
        <h2 className="hidden font-balsamiq text-lg font-bold text-[#3b2f2f] lg:block">
          Mazaalai Learn
        </h2>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3 lg:p-4">
        {menuLabels.map((label) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => handleNav(label)}
              className={`flex items-center justify-center rounded-xl px-3 py-3 font-balsamiq text-[18px] font-bold transition-all duration-150 lg:justify-start lg:gap-4 lg:px-4
              ${
                isActive
                  ? "bg-[#e8920a] text-white shadow-[0_10px_24px_rgba(232,146,10,0.25)]"
                  : "text-[#6b4d26] hover:bg-[#f8e7c7] hover:text-[#3b2f2f]"
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
              <div className="hidden uppercase lg:block">
                {label}
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
