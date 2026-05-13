import { DockBar } from "./dock-bar";
import { SideBar } from "./side-bar";

export const menuLabels = [
  "Map",
  "Dictionary",
  "Reading",
  "Leaderboard",
  "Profile",
] as const;
export type MenuLabel = (typeof menuLabels)[number];

export const menuPaths: Record<MenuLabel, string> = {
  Map: "/home",
  Dictionary: "/dictionary",
  Reading: "/reading",
  Leaderboard: "/leaderboard",
  Profile: "/profile",
};

export const BarSections = () => {
  return (
    <div>
      <SideBar menuLabels={menuLabels} menuPaths={menuPaths} />
      <DockBar menuLabels={menuLabels} menuPaths={menuPaths} />
    </div>
  );
};
