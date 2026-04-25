"use client";

import Link from "next/link";

type SettingsItem = {
  id: string;
  label: string;
  description: string;
  icon: string;
  href: string;
  danger?: boolean;
};

const settingsItems: SettingsItem[] = [
  {
    id: "account",
    label: "Account Details",
    description: "Update name, username, age and personal info",
    icon: "👤",
    href: "/profile/account",
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Theme, font size, dark/light mode",
    icon: "🎨",
    href: "/profile/appearance",
  },
  {
    id: "privacy",
    label: "Privacy & Policy",
    description: "Data usage, permissions, legal",
    icon: "🔒",
    href: "/profile/privacy",
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Push alerts, reminder times",
    icon: "🔔",
    href: "/profile/notifications",
  },
  {
    id: "help",
    label: "Help & Support",
    description: "FAQ, contact",
    icon: "❓",
    href: "/profile/help",
  },
];

export default function SettingsSection() {
  return (
    <div className="flex flex-col gap-3">
      {/* Section label */}
      <h3 className="text-xs font-bold tracking-widest text-[#6B5E4A]">
        SETTINGS
      </h3>

      {/* Settings жагсаалт */}
      <div className="flex flex-col gap-2.5">
        {settingsItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm active:scale-[0.98] transition-transform"
          >
            {/* Icon */}
            <div className="w-11 h-11 rounded-full bg-[#EDE8E0] flex items-center justify-center shrink-0 text-xl">
              {item.icon}
            </div>

            {/* Label + description */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1A1208]">
                {item.label}
              </p>
              <p className="text-xs text-[#A0917C] mt-0.5 truncate">
                {item.description}
              </p>
            </div>

            {/* Chevron */}
            <span className="text-[#A0917C] text-lg shrink-0">›</span>
          </Link>
        ))}

        {/* Log Out — тусдаа учир нь danger */}
        <button
          onClick={() => console.log("logout")}
          className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm active:scale-[0.98] transition-transform w-full"
        >
          <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center shrink-0 text-xl">
            🚪
          </div>
          <span className="text-sm font-semibold text-red-500">Log Out</span>
        </button>
      </div>
    </div>
  );
}
