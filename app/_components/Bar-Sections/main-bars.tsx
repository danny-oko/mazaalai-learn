import { DockBar } from "./dock-bar";
import { SideBar } from "./side-bar";

export const menuLabels = [
  "Нүүр Хуудас",
  "Цагаан Толгой",
  "Уншлага",
  "Онооны Самбар",
  "Профайл",
] as const;
export type MenuLabel = (typeof menuLabels)[number];

export const menuPaths: Record<MenuLabel, string> = {
  "Нүүр Хуудас": "/home",
  "Цагаан Толгой": "/dictionary",
  Уншлага: "/reading",
  "Онооны Самбар": "/leaderboard",
  Профайл: "/profile",
};

export const BarSections = () => {
  return (
    <div>
      <SideBar menuLabels={menuLabels} menuPaths={menuPaths} />
      <DockBar menuLabels={menuLabels} menuPaths={menuPaths} />
    </div>
  );
};
