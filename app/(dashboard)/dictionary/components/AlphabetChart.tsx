"use client";

import { Character } from "./CharacterCard";

import { BottomSheet } from "./BottomSheet";
import { CharacterDetail } from "./CharacterDetail";
import { LetterGrid } from "./LetterGrid";

export const AlphabetChart = ({
  characters,
  selectedCharacter,
  onMobileSelect,
  onDesktopSelect,
  isSheetOpen,
  onCloseSheet,
}: {
  characters: Character[];
  selectedCharacter: Character | null;
  onMobileSelect: (character: Character) => void;
  onDesktopSelect: (character: Character) => void;
  isSheetOpen: boolean;
  onCloseSheet: () => void;
}) => {
  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden bg-[#FAF7F1] px-4 py-6 md:px-8 xl:pl-[420px] xl:pr-8">
      <div className="h-full w-full max-w-[1180px] min-w-0 xl:mx-auto">
        <div className="block xl:hidden">
          <LetterGrid
            characters={characters}
            selectedCharacter={selectedCharacter}
            onSelect={onMobileSelect}
          />

          <BottomSheet isOpen={isSheetOpen} onClose={onCloseSheet}>
            {selectedCharacter && (
              <CharacterDetail character={selectedCharacter} />
            )}
          </BottomSheet>
        </div>

        <div className="hidden h-full min-w-0 gap-6 xl:grid xl:grid-cols-[0.85fr_1.15fr]">
          <LetterGrid
            characters={characters}
            selectedCharacter={selectedCharacter}
            onSelect={onDesktopSelect}
          />

          {selectedCharacter && (
            <CharacterDetail character={selectedCharacter} compact />
          )}
        </div>
      </div>
    </div>
  );
};
