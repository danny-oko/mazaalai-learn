import { ProfileTab } from "../common/types";

type ProfileTabsProps = {
  activeTab: ProfileTab;
};

const tabs: Array<{ id: ProfileTab; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "achievements", label: "Achievements" },
  { id: "stats", label: "Stats" },
  { id: "settings", label: "Settings" },
];

export default function ProfileTabs({ activeTab }: ProfileTabsProps) {
  return (
    <nav className="flex items-center gap-6 border-b border-[#dfd6c6] px-1">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            className={`border-b-2 pb-3 text-sm font-semibold transition-colors ${
              isActive
                ? "border-[#d39a2f] text-[#433c31]"
                : "border-transparent text-[#8d8270]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
