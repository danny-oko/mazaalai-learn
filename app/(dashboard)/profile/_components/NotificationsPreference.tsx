"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "mazaalai-profile-email-reminders";

export function NotificationsPreference() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      setEnabled(raw === "1");
    }
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  };

  return (
    <section
      id="notifications"
      className="scroll-mt-24 rounded-2xl border border-[#e6dece] bg-white p-4 md:p-5"
    >
      <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#8a806f]">
        Notifications
      </h2>
      <p className="mb-4 text-sm text-[#706552]">
        Practice reminders (stored in this browser only for now).
      </p>
      <button
        type="button"
        onClick={toggle}
        className="flex w-full max-w-md items-center justify-between rounded-xl border border-[#efe8db] bg-[#faf7f1] px-4 py-3 text-left text-sm font-semibold text-[#2a241e]"
      >
        <span>Daily reminder emails</span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            enabled ? "bg-emerald-100 text-emerald-800" : "bg-neutral-200 text-neutral-600"
          }`}
        >
          {enabled ? "On" : "Off"}
        </span>
      </button>
    </section>
  );
}
