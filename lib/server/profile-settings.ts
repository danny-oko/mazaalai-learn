import type { ProfileSettingItem } from "@/app/(dashboard)/profile/common/types";

export const PROFILE_SETTING_ITEMS: ProfileSettingItem[] = [
  {
    id: "account",
    label: "Account Details",
    description: "Name, username, personal info",
    icon: "👤",
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Theme, font size, dark mode",
    icon: "🌤",
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Push alerts, reminder times",
    icon: "🔔",
  },
  {
    id: "help",
    label: "Help & Support",
    description: "FAQ, contact us",
    icon: "ⓘ",
  },
];
