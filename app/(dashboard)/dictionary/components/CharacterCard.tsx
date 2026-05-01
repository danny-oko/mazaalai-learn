"use client";

export interface Form {
  type: "INITIAL" | "MEDIAL" | "FINAL" | "ISOLATE";
  glyph: string;
  imgUrl?: string;
  strokePath?: string;
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
  compact?: boolean;
}

export const CharacterCard = ({
  character,
  onSelect,
  isSelected,
  compact = false,
}: CharacterCardProps) => {
  // ISOLATE form байвал card дээр тэрийг харуулна
  const isolateForm = character.forms.find((form) => form.type === "ISOLATE");
  const glyph = isolateForm?.glyph ?? character.forms[0]?.glyph ?? "?";

  return (
    <button
      onClick={() => onSelect(character)}
      className={[
        "relative flex aspect-square w-full flex-col items-center justify-center",
        "rounded-[28px] border transition-all duration-200",

        // Desktop compact үед card height багасна
        compact
          ? "min-h-[115px]"
          : "min-h-[145px] sm:min-h-[165px] md:min-h-[175px]",

        isSelected
          ? [
              "border-[#003D27] bg-[#003D27] text-white",
              "shadow-[0_14px_28px_rgba(0,61,39,0.22)]",
              "ring-4 ring-[#003D27] ring-offset-4 ring-offset-white",
            ].join(" ")
          : [
              "border-[#EEEAE3] bg-[#F7F5F1] text-[#003D27]",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]",
              "hover:-translate-y-1 hover:border-[#D8D0C5] hover:shadow-xl",
            ].join(" "),
      ].join(" ")}
    >
      {/* Main Mongolian glyph */}
      <span
        className={[
          "font-semibold leading-none [writing-mode:vertical-lr]",
          compact ? "text-[36px]" : "text-[52px] md:text-[60px]",
        ].join(" ")}
      >
        {glyph}
      </span>

      {/* Latin label */}
      <span
        className={[
          "font-medium tracking-wide",
          compact ? "mt-4 text-xs" : "mt-7 text-sm",
          isSelected ? "text-white/85" : "text-[#5F6963]",
        ].join(" ")}
      >
        {character.latinForm?.toUpperCase() ?? character.name}
      </span>
    </button>
  );
};
