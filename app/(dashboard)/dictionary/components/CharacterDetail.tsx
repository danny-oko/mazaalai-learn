"use client";

import { Character } from "./CharacterCard";

const FORM_LABELS: Record<string, string> = {
  INITIAL: "Initial",
  MEDIAL: "Medial",
  FINAL: "Final",
};
const FORM_ORDER = ["INITIAL", "MEDIAL", "FINAL"];

export default function CharacterDetail({
  character,
}: {
  character: Character;
}) {
  const sorted = [...character.forms].sort(
    (a, b) => FORM_ORDER.indexOf(a.type) - FORM_ORDER.indexOf(b.type),
  );
  const iso =
    character.forms.find((f) => f.type === "ISOLATE") ?? character.forms[0];

  return (
    <div className="w-full bg-[#FDFAF5] border-2 border-[#D9D0BC] rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-6 pt-6 pb-5 border-b border-[#D9D0BC]">
        <div className="flex items-baseline gap-3 mb-1">
          <span className="font-serif text-5xl font-semibold text-[#1B4332] leading-none">
            {character.name}
          </span>
          <span className="text-lg text-[#6B6B5E]">
            /{character.latinForm ?? character.name.toLowerCase()}/
          </span>
        </div>
        {character.description && (
          <p className="text-sm text-[#6B6B5E] mt-2 leading-relaxed">
            {character.description}
          </p>
        )}
      </div>

      {/* Forms */}
      <div className="px-6 py-5 border-b border-[#D9D0BC]">
        <div
          className={`grid gap-2 mb-3`}
          style={{ gridTemplateColumns: `repeat(${sorted.length}, 1fr)` }}
        >
          {sorted.map((f) => (
            <span
              key={f.type}
              className="text-[9px] font-semibold uppercase tracking-widest text-[#6B6B5E] text-center"
            >
              {FORM_LABELS[f.type]}
            </span>
          ))}
        </div>
        <div
          className={`grid gap-2`}
          style={{ gridTemplateColumns: `repeat(${sorted.length}, 1fr)` }}
        >
          {sorted.map((f) => (
            <div
              key={f.type}
              className="aspect-square bg-[#F5F0E8] rounded-full border-2 border-[#D9D0BC] flex items-center justify-center"
            >
              <span className="text-xl text-[#1B4332] [writing-mode:vertical-lr]">
                {f.glyph}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stroke order */}
      <div className="px-6 py-5 flex items-center gap-4">
        <button
          className="w-11 h-11 rounded-full bg-[#E8820C] flex items-center justify-center shrink-0 transition-transform hover:scale-105 active:scale-95"
          aria-label="Listen to pronunciation"
        >
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        <div className="flex-1">
          <span className="block text-[11px] font-semibold text-[#E8820C] mb-1.5">
            Stroke Order
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={[
                  "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold",
                  n === 1
                    ? "bg-[#E8820C] text-white"
                    : "bg-[#D9D0BC] text-[#6B6B5E]",
                ].join(" ")}
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        <div className="w-16 h-16 bg-[#EDE8DC] rounded-xl border border-[#D9D0BC] flex items-center justify-center shrink-0">
          <span className="text-4xl text-[#1B4332] [writing-mode:vertical-lr]">
            {iso?.glyph ?? "?"}
          </span>
        </div>
      </div>
    </div>
  );
}
