// main-bars.tsx
import { DockBar } from "./dock-bar";
import { SideBarSection } from "./SideBar";

export const menuLabels = [
  "Map",
  "Dictionary",
  "Leaderboard",
  "Profile",
] as const;
export type MenuLabel = (typeof menuLabels)[number];

export const menuPaths: Record<MenuLabel, string> = {
  Map: "/home",
  Dictionary: "/dictionary",
  Leaderboard: "/leaderboard",
  Profile: "/profile",
};

export const BarSections = () => {
  return (
    <>
      <SideBarSection menuLabels={menuLabels} menuPaths={menuPaths} />
      <DockBar menuLabels={menuLabels} menuPaths={menuPaths} />
    </>
  );
};
