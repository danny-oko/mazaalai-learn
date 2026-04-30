import { ProfileSettingItem } from "../common/types";

type SettingsPanelProps = {
  settings: ProfileSettingItem[];
};

export default function SettingsPanel({ settings }: SettingsPanelProps) {
  return (
    <section className="rounded-2xl border border-[#e6dece] bg-white p-4">
      <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#8a806f]">
        Settings
      </h2>
      <div className="space-y-2">
        {settings.map((item) => (
          <button
            key={item.id}
            type="button"
            className="flex w-full items-center gap-3 rounded-xl border border-[#efe8db] bg-[#faf7f1] px-3 py-3 text-left"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1e8d6] text-sm">
              {item.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-[#2a241e]">
                {item.label}
              </span>
              <span className="block truncate text-xs text-[#7d7364]">
                {item.description}
              </span>
            </span>
            <span className="text-lg text-[#9f9483]">›</span>
          </button>
        ))}
        <button
          type="button"
          className="mt-2 w-full rounded-xl border border-[#f0d3d3] bg-[#fff7f7] px-3 py-2 text-sm font-semibold text-[#cc5d5d]"
        >
          Log Out
        </button>
      </div>
    </section>
  );
}
