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
      className="fixed top-0 left-0 z-40 hidden h-full flex-col md:flex md:w-20 lg:w-[300px] border-r-2 border-[#d6d4d4] px-3 py-5"
      aria-label="Main navigation"
    >
      <div className="flex h-[60px] items-center justify-center px-5 lg:justify-between">
        <img
          src="https://d35aaqx5ub95lt.cloudfront.net/vendor/0cecd302cf0bcd0f73d51768feff75fe.svg"
          alt="Mazaalai Learn"
          className="block object-contain md:block lg:hidden w-50 h-50"
        />
        <img
          src="https://d35aaqx5ub95lt.cloudfront.net/vendor/70a4be81077a8037698067f583816ff9.svg"
          alt="Mazaalai Learn"
          className="block object-contain md:hidden lg:block w-30 h-50"
        />
      </div>

      <nav className="flex flex-1 flex-col gap-3 p-3 lg:p-4">
        {menuLabels.map((label) => {
          const Icon = menuIcons[label];
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => handleNav(label)}
              className={`flex items-center justify-center rounded-xl px-3 py-1 text-[16px] lg:justify-start lg:gap-5 lg:px-4
              transition-all duration-150 font-balsamiq border-2
              ${
                isActive
                  ? "bg-[#84d8ff]/50 text-[#1cb0f6] border-[#84d8ff]"
                  : "text-[#0F5238] hover:bg-[#F2EEDD] text-[#777777] border-transparent"
              }`}
            >
              <img
                src={menuIcons[label]}
                alt={label}
                width={35}
                height={35}
                className={`transition-all duration-200 ${
                  isActive ? "opacity-100" : "opacity-100"
                }`}
              />
              <div className="md:hidden lg:block uppercase text-[14px] font-extrabold tracking-wider">
                {label}
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
