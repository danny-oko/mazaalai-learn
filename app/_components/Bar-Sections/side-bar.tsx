"use client";

import { usePathname } from "next/navigation";
import { useNavLoading } from "../nav-loading-context";
import type { MenuLabel } from "./main-bars";
import { NavMenuIcon } from "./nav-menu-icon";

type HeaderClientProps = {
  menuLabels: readonly MenuLabel[];
  menuPaths: Record<MenuLabel, string>;
};

export const SideBar = ({ menuLabels, menuPaths }: HeaderClientProps) => {
  const pathname = usePathname();
  const { navigateTo } = useNavLoading();

  const active =
    menuLabels.find((label) => pathname.startsWith(menuPaths[label])) ??
    menuLabels[0];

  return (
    <aside
      className="hidden h-full shrink-0 flex-col border-r-2 py-5 md:flex md:w-20 md:px-2 lg:w-[360px] lg:px-3"
      aria-label="Main navigation"
    >
      <div className="flex min-h-[72px] items-center justify-center px-2 pb-1 pt-2 lg:justify-start lg:px-5">
        <img
          src="/logo.png"
          alt="Mazaalai Learn"
          className="block h-10 w-auto max-w-[min(100%,220px)] object-contain drop-shadow-[0_1px_2px_rgba(59,47,47,0.08)] md:h-11 lg:h-[3.25rem] lg:max-w-[280px]"
        />
      </div>

      <nav className="flex flex-1 flex-col gap-3 md:px-1 lg:p-4">
        {menuLabels.map((label) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => navigateTo(menuPaths[label])}
              className={`flex w-full items-center justify-start rounded-xl py-2.5 text-[16px] md:justify-center md:px-0 lg:min-h-[52px] lg:justify-start lg:gap-4 lg:px-3
              transition-all duration-150 font-balsamiq border-2
              ${
                isActive
                  ? "dark:bg-[#84d8ff]/15 dark:border-[#84d8ff] bg-[#ffad33]/10 border-[#ffad33] text-black dark:text-white"
                  : "text-[#777777] border-transparent dark:text-[#94a3b8]"
              }`}
            >
              <NavMenuIcon
                label={label}
                width={40}
                height={40}
                className="size-8 shrink-0 object-contain transition-all duration-200 md:size-9 lg:size-10"
              />
              <div className="hidden min-w-0 flex-1 text-left uppercase text-[14px] font-extrabold leading-none tracking-wide lg:block whitespace-nowrap">
                {label}
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
