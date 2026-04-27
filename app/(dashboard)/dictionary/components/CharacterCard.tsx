"use client";

export interface Form {
  type: "INITIAL" | "MEDIAL" | "FINAL" | "ISOLATE";
  glyph: string;
  imgUrl?: string;
}

export interface Character {
  id: string;
  name: string;
  unicode: string;
  latinForm?: string;
  description?: string;
  type: "VOWEL" | "CONSONANT" | "PUNCTUATION";
  order: number;
  forms: Form[];
}

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
  isSelected?: boolean;
}

export default function CharacterCard({
  character,
  onSelect,
  isSelected,
}: CharacterCardProps) {
  const isolateForm = character.forms.find((f) => f.type === "ISOLATE");
  const displayGlyph = isolateForm?.glyph ?? character.forms[0]?.glyph ?? "?";

  return (
    <button
      onClick={() => onSelect(character)}
      aria-label={`${character.name} character`}
      className={[
        "aspect-square flex flex-col items-center justify-center gap-1.5",
        "rounded-xl border-2 cursor-pointer transition-all duration-150 shadow-sm",
        isSelected
          ? "bg-[#E8920A] border-[#E8920A]"
          : "bg-[#FDFAF5] border-[#D9D0BC] hover:border-[#E8920A] hover:-translate-y-0.5 hover:shadow-md",
      ].join(" ")}
    >
      <div
        className={[
          "text-3xl leading-none [writing-mode:vertical-lr]",
          isSelected ? "text-[#F5F0E8]" : "text-[#1B4332]",
        ].join(" ")}
      >
        {displayGlyph}
      </div>
      <div
        className={[
          "text-[11px] font-medium",
          isSelected ? "text-white/60" : "text-[#6B6B5E]",
        ].join(" ")}
      >
        {character.latinForm ?? character.name}
      </div>
    </button>
  );
}
