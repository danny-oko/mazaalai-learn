"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import "@fontsource/plus-jakarta-sans";
import {
  Flame,
  Menu,
  X,
  Map,
  BookOpen,
  Trophy,
  User,
  BookOpenCheck,
  type LucideIcon,
} from "lucide-react";
import type { MenuLabel } from "./Header";

const menuIcons: Record<MenuLabel, LucideIcon> = {
  Map,
  Dictionary: BookOpen,
  Leaderboard: Trophy,
  Profile: User,

};

type HeaderClientProps = {
  menuLabels: readonly MenuLabel[];
  menuPaths: Record<MenuLabel, string>;
};

export const HeaderSideBar = ({ menuLabels, menuPaths }: HeaderClientProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const active =
    menuLabels.find((label) => pathname.startsWith(menuPaths[label])) ??
    menuLabels[0];

  const handleNav = (label: MenuLabel) => {
    router.push(menuPaths[label]);
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-full bg-[#FEFAE8] shadow-2xl z-50 flex flex-col md:w-64
          transition-transform duration-300 ease-in-out lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 h-15 border-b border-[#E8DFC8]">
          <h2 className="font-bold text-[#0F5238] text-lg font-['Plus_Jakarta_Sans']">
            Mazaalai Learn
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#0F5238]"
            onClick={() => setOpen(false)}
          >
            <X className="w-5 h-5 lg:hidden" />
          </Button>
        </div>

        <nav className="flex flex-col gap-1 p-4 flex-1">
          {menuLabels.map((label) => {
            const Icon = menuIcons[label];
            const isActive = active === label;
            return (
              <button
                key={label}
                onClick={() => handleNav(label)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm
                  transition-all duration-150 font-['Plus_Jakarta_Sans']
                  ${
                    isActive
                      ? "bg-[#0F5238] text-white shadow-md"
                      : "text-[#0F5238] hover:bg-[#F2EEDD]"
                  }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="bg-[#FEFAE8] w-full h-15 shadow-md font-['Plus_Jakarta_Sans'] text-[#0F5238] relative z-30 min-lg:hidden">
        <div className="flex items-center h-full px-5 justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#0F5238]"
              onClick={() => setOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="font-bold">{active}</h1>
          </div>
          <div className="flex items-center gap-1 font-bold bg-[#F2EEDD] px-3 py-1.5 rounded-2xl text-sm">
            <span>Count</span>
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
          </div>
        </div>
      </div>
    </>
  );
};
