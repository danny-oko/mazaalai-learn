"use client";

import { Character, CharacterCard } from "./CharacterCard";

type Filter = "ALL" | "VOWEL" | "CONSONANT";

const FILTER_TABS: { label: string; value: Filter }[] = [
  { label: "Бүх үсэг", value: "ALL" },
  { label: "Эгшиг үсэг", value: "VOWEL" },
  { label: "Гийгүүлэгч", value: "CONSONANT" },
];

export const LetterGrid = ({
  characters,
  selectedCharacter,
  onSelect,
  compact = false,
  filter,
  onFilterChange,
}: {
  characters: Character[];
  selectedCharacter?: Character | null;
  onSelect: (character: Character) => void;
  compact?: boolean;
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}) => {
  return (
    <section
      className={[
        "w-full min-w-0 overflow-hidden rounded-[28px] bg-white",
        "shadow-[0_20px_60px_rgba(35,31,25,0.08)]",
        compact ? "h-full p-5" : "p-5 md:p-8",
      ].join(" ")}
    >
      {/* Header */}
      <div className={compact ? "mb-4" : "mb-6"}>
        <div className="flex items-start justify-between gap-3">
          <h2
            className={[
              "font-black tracking-tight text-[#003D27]",
              compact ? "text-3xl" : "text-2xl md:text-4xl",
            ].join(" ")}
          >
            Монгол бичиг
          </h2>

          <span className="shrink-0 rounded-full bg-[#86F0B6] px-3 py-2 text-xs font-medium text-[#007947] md:text-sm">
            {characters.length} Symbols
          </span>
        </div>

        {/* Filter tabs */}
        <div className="mt-4 flex flex-wrap gap-2">
          {FILTER_TABS.map((tab) => {
            const isActive = filter === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => onFilterChange(tab.value)}
                className={[
                  "rounded-full px-4 py-2 text-xs font-medium transition md:text-sm",
                  isActive
                    ? "bg-[#003D27] text-white shadow-md"
                    : "bg-[#E9E6E0] text-[#4B4B4B] hover:bg-[#DDD8CF]",
                ].join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty state */}
      {characters.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-2xl bg-[#F7F5F1] text-sm text-[#6F746F]">
          No characters found.
        </div>
      ) : (
        <div
          className={[
            "grid min-w-0 grid-cols-2 md:grid-cols-3",
            compact ? "gap-3" : "gap-4 md:gap-5",
          ].join(" ")}
        >
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              isSelected={selectedCharacter?.id === character.id}
              onSelect={onSelect}
              compact={compact}
            />
          ))}
        </div>
      )}
    </section>
  );
};
