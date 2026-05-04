"use client";

import { useState } from "react";

type Tab = "weekly" | "monthly" | "alltime" | "friends";

const TABS: { label: string; value: Tab }[] = [
  { label: "7 хоног бүр", value: "weekly" },
  { label: "Сар бүр", value: "monthly" },
  { label: "Бүх цаг үед", value: "alltime" },
  { label: "Найзууд", value: "friends" },
];

interface WebTabToggleProps {
  defaultTab?: Tab;
  onChange?: (tab: Tab) => void;
}

export default function WebTabToggle({
  defaultTab = "weekly",
  onChange,
}: WebTabToggleProps) {
  const [active, setActive] = useState<Tab>(defaultTab);

  function handleSelect(tab: Tab) {
    setActive(tab);
    onChange?.(tab);
  }

  return (
    <div className="flex border-b border-[#E8D9C0]">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleSelect(tab.value)}
          className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
            active === tab.value
              ? "border-[#E8940A] text-[#E8940A]"
              : "border-transparent text-[#888] hover:text-[#555]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
