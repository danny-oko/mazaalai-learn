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

export default function WebSettingsSection() {
  return (
    <div className="flex flex-col gap-4">
      {/* Section label */}
      <h3 className="text-xs font-bold tracking-widest text-[#6B5E4A]">
        SETTINGS
      </h3>

      {/* 2x2 grid */}
      <div className="grid grid-cols-2 gap-3">
        {settingsItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm hover:scale-[0.98] transition-transform"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-[#EDE8E0] flex items-center justify-center shrink-0 text-2xl">
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

        {/* Log Out — grid дотор байна, danger өнгөтэй */}
        <button
          onClick={() => console.log("logout")}
          className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm hover:scale-[0.98] transition-transform"
        >
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0 text-2xl">
            🚪
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-semibold text-red-500">Log Out</p>
            <p className="text-xs text-[#A0917C] mt-0.5">
              Sign out of your account
            </p>
          </div>
          <span className="text-red-300 text-lg shrink-0">›</span>
        </button>
      </div>
    </div>
  );
}
