import { HeaderSideBar } from "./HeaderSideBar";

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

export const Header = () => {
  return <HeaderSideBar menuLabels={menuLabels} menuPaths={menuPaths} />;
};
