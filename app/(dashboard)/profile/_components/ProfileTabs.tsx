"use client";

import { mnProfile } from "@/lib/i18n/mn-profile";

import type { ProfileTab } from "../common/types";

type ProfileTabsProps = {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
};

const tabs: Array<{ id: ProfileTab; label: string }> = [
  { id: "overview", label: mnProfile.tabOverview },
  { id: "achievements", label: mnProfile.tabAchievements },
  { id: "stats", label: mnProfile.tabStats },
  { id: "settings", label: mnProfile.tabSettings },
];

export default function ProfileTabs({
  activeTab,
  onTabChange,
}: ProfileTabsProps) {
  return (
    <nav
      className="flex w-full max-w-full flex-nowrap gap-1 overflow-x-auto rounded-2xl border border-[#ead9bb]/90 bg-gradient-to-r from-[#faf3e6] to-[#f5ecda] p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] md:inline-flex md:w-auto [&::-webkit-scrollbar]:hidden"
      aria-label="Profile sections"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            type="button"
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
              isActive
                ? "bg-white text-[#2a241e] shadow-sm ring-1 ring-[#e8d4b0]"
                : "text-[#7d7364] hover:bg-white/60 hover:text-[#433c31]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
