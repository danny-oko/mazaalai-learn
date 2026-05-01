"use client";

import { useMemo, useState } from "react";
import { Character } from "./CharacterCard";
import { AlphabetChart } from "./AlphabetChart";
export type Filter = "ALL" | "VOWEL" | "CONSONANT";

export const AlphabetClient = ({ characters }: { characters: Character[] }) => {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    characters[0] ?? null,
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const filteredCharacters = useMemo(() => {
    if (filter === "ALL") return characters;
    return characters.filter((character) => character.type === filter);
  }, [characters, filter]);

  const handleFilterChange = (nextFilter: Filter) => {
    const nextCharacters =
      nextFilter === "ALL"
        ? characters
        : characters.filter((character) => character.type === nextFilter);

    setFilter(nextFilter);
    setSelectedCharacter(nextCharacters[0] ?? null);
    setIsSheetOpen(false);
  };

  const handleMobileSelect = (character: Character) => {
    setSelectedCharacter(character);
    setIsSheetOpen(true);
  };

  return (
    <AlphabetChart
      characters={filteredCharacters}
      selectedCharacter={selectedCharacter}
      filter={filter}
      onFilterChange={handleFilterChange}
      onMobileSelect={handleMobileSelect}
      onDesktopSelect={setSelectedCharacter}
      isSheetOpen={isSheetOpen}
      onCloseSheet={() => setIsSheetOpen(false)}
    />
  );
};
