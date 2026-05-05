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
      className="bg-[#f8f4e3] hidden h-full flex-col border-r-2 border-[#d6d4d4] py-5 md:flex md:w-20 md:px-2 lg:w-[300px] lg:px-3 shrink-0"
      aria-label="Main navigation"
    >
      <div className="flex h-[60px] items-center justify-center px-2 lg:justify-start lg:px-5">
        <img
          src="https://d35aaqx5ub95lt.cloudfront.net/vendor/0cecd302cf0bcd0f73d51768feff75fe.svg"
          alt="Mazaalai Learn"
          className="block h-8 w-auto object-contain md:h-9 lg:hidden"
        />
        <img
          src="https://d35aaqx5ub95lt.cloudfront.net/vendor/70a4be81077a8037698067f583816ff9.svg"
          alt="Mazaalai Learn"
          className="hidden h-9 w-auto object-contain lg:block"
        />
      </div>

      <nav className="flex flex-1 flex-col gap-3 md:px-1 lg:p-4">
        {menuLabels.map((label) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => handleNav(label)}
              className={`flex w-full items-center justify-center rounded-xl py-2 text-[16px] md:px-0 lg:justify-start lg:gap-5 lg:px-4
              transition-all duration-150 font-balsamiq border-2
              ${
                isActive
                  ? "bg-[#84d8ff]/50 text-[#1cb0f6] border-[#84d8ff]"
                  : "text-[#777777] hover:bg-[#F2EEDD] border-transparent"
              }`}
            >
              <img
                src={menuIcons[label]}
                alt={label}
                width={35}
                height={35}
                className="h-7 w-7 object-contain transition-all duration-200 md:h-8 md:w-8 lg:h-9 lg:w-9"
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
