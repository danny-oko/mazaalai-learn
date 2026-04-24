// side-bar.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import "@fontsource/plus-jakarta-sans";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { MenuLabel } from "./ScreenBars";

const menuIcons: Record<MenuLabel, string> = {
  Map: "./house.png",
  Dictionary: "./dictionary.png",
  Leaderboard: "./winner.png",
  Profile: "./chicken.png",
};

type SideBarProps = {
  menuLabels: readonly MenuLabel[];
  menuPaths: Record<MenuLabel, string>;
};

export const SideBarSection = ({ menuLabels, menuPaths }: SideBarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const active =
    menuLabels.find((label) => pathname.startsWith(menuPaths[label])) ??
    menuLabels[0];

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "16rem" } as React.CSSProperties}
      className="min-h-0"
    >
      <Sidebar className="hidden md:flex border-r-0 font-['Plus_Jakarta_Sans'] shadow-2xl xl:w-100 lg:w-80">
        <SidebarHeader className="px-5 h-[60px] flex justify-center border-b border-[#E8DFC8]">
          <h2 className="font-bold text-[#0F5238] text-lg">Mazaalai Learn</h2>
        </SidebarHeader>

        <SidebarContent className="p-3">
          <SidebarMenu>
            {menuLabels.map((label) => {
              const isActive = active === label;
              return (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton
                    onClick={() => router.push(menuPaths[label])}
                    isActive={isActive}
                    className={`flex items-center gap-5 px-4 py-6 rounded-xl font-bold text-[16px]
                      transition-all duration-150
                      ${
                        isActive
                          ? "bg-[#0F5238] text-white"
                          : "text-[#0F5238] hover:bg-[#F2EEDD] hover:text-[#0F5238]"
                      }`}
                  >
                    <img
                      src={menuIcons[label]}
                      alt={label}
                      width={22}
                      height={22}
                    />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};
