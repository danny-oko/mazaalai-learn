"use client";

import { Character } from "./CharacterCard";
import { DictionaryPage } from "./DictionaryPage";
export type Filter = "ALL" | "VOWEL" | "CONSONANT";

export const AlphabetClient = ({ characters }: { characters: Character[] }) => {
  return <DictionaryPage characters={characters} />;
};
