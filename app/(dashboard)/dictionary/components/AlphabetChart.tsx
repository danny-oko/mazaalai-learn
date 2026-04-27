"use client";

import { useState } from "react";
import CharacterCard, { Character } from "./CharacterCard";
import CharacterDetail from "./CharacterDetail";

type Filter = "ALL" | "VOWEL" | "CONSONANT";

// Replace with your API fetch
const MOCK_CHARACTERS: Character[] = [
  {
    id: "1",
    name: "A",
    unicode: "U+1820",
    latinForm: "a",
    type: "VOWEL",
    order: 1,
    forms: [
      { type: "ISOLATE", glyph: "ᠠ" },
      { type: "INITIAL", glyph: "ᠠ" },
      { type: "MEDIAL", glyph: "ᠠ" },
      { type: "FINAL", glyph: "ᠠ" },
    ],
  },
  {
    id: "2",
    name: "E",
    unicode: "U+1821",
    latinForm: "e",
    type: "VOWEL",
    order: 2,
    forms: [
      { type: "ISOLATE", glyph: "ᠡ" },
      { type: "INITIAL", glyph: "ᠡ" },
      { type: "MEDIAL", glyph: "ᠡ" },
      { type: "FINAL", glyph: "ᠡ" },
    ],
  },
  {
    id: "3",
    name: "I",
    unicode: "U+1822",
    latinForm: "i",
    type: "VOWEL",
    order: 3,
    forms: [
      { type: "ISOLATE", glyph: "ᠢ" },
      { type: "INITIAL", glyph: "ᠢ" },
      { type: "MEDIAL", glyph: "ᠢ" },
      { type: "FINAL", glyph: "ᠢ" },
    ],
  },
  {
    id: "4",
    name: "O",
    unicode: "U+1823",
    latinForm: "o",
    type: "VOWEL",
    order: 4,
    forms: [
      { type: "ISOLATE", glyph: "ᠣ" },
      { type: "INITIAL", glyph: "ᠣ" },
      { type: "MEDIAL", glyph: "ᠣ" },
      { type: "FINAL", glyph: "ᠣ" },
    ],
  },
  {
    id: "5",
    name: "U",
    unicode: "U+1824",
    latinForm: "u",
    type: "VOWEL",
    order: 5,
    forms: [
      { type: "ISOLATE", glyph: "ᠤ" },
      { type: "INITIAL", glyph: "ᠤ" },
      { type: "MEDIAL", glyph: "ᠤ" },
      { type: "FINAL", glyph: "ᠤ" },
    ],
  },
  {
    id: "6",
    name: "Ö",
    unicode: "U+1825",
    latinForm: "ö",
    type: "VOWEL",
    order: 6,
    forms: [
      { type: "ISOLATE", glyph: "ᠥ" },
      { type: "INITIAL", glyph: "ᠥ" },
      { type: "MEDIAL", glyph: "ᠥ" },
      { type: "FINAL", glyph: "ᠥ" },
    ],
  },
  {
    id: "7",
    name: "Ü",
    unicode: "U+1826",
    latinForm: "ü",
    type: "VOWEL",
    order: 7,
    forms: [
      { type: "ISOLATE", glyph: "ᠦ" },
      { type: "INITIAL", glyph: "ᠦ" },
      { type: "MEDIAL", glyph: "ᠦ" },
      { type: "FINAL", glyph: "ᠦ" },
    ],
  },
  {
    id: "8",
    name: "N",
    unicode: "U+1828",
    latinForm: "n",
    type: "CONSONANT",
    order: 8,
    forms: [
      { type: "ISOLATE", glyph: "ᠨ" },
      { type: "INITIAL", glyph: "ᠨ" },
      { type: "MEDIAL", glyph: "ᠨ" },
      { type: "FINAL", glyph: "ᠨ" },
    ],
  },
  {
    id: "9",
    name: "B",
    unicode: "U+182A",
    latinForm: "b",
    type: "CONSONANT",
    order: 9,
    forms: [
      { type: "ISOLATE", glyph: "ᠪ" },
      { type: "INITIAL", glyph: "ᠪ" },
      { type: "MEDIAL", glyph: "ᠪ" },
      { type: "FINAL", glyph: "ᠪ" },
    ],
  },
  {
    id: "10",
    name: "P",
    unicode: "U+182B",
    latinForm: "p",
    type: "CONSONANT",
    order: 10,
    forms: [
      { type: "ISOLATE", glyph: "ᠫ" },
      { type: "INITIAL", glyph: "ᠫ" },
      { type: "MEDIAL", glyph: "ᠫ" },
      { type: "FINAL", glyph: "ᠫ" },
    ],
  },
  {
    id: "11",
    name: "Q",
    unicode: "U+182C",
    latinForm: "q",
    type: "CONSONANT",
    order: 11,
    forms: [
      { type: "ISOLATE", glyph: "ᠬ" },
      { type: "INITIAL", glyph: "ᠬ" },
      { type: "MEDIAL", glyph: "ᠬ" },
      { type: "FINAL", glyph: "ᠬ" },
    ],
  },
  {
    id: "12",
    name: "G",
    unicode: "U+182D",
    latinForm: "g",
    type: "CONSONANT",
    order: 12,
    forms: [
      { type: "ISOLATE", glyph: "ᠭ" },
      { type: "INITIAL", glyph: "ᠭ" },
      { type: "MEDIAL", glyph: "ᠭ" },
      { type: "FINAL", glyph: "ᠭ" },
    ],
  },
];

export default function AlphabetChart() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [selected, setSelected] = useState<Character | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const vowels = MOCK_CHARACTERS.filter((c) => c.type === "VOWEL");
  const consonants = MOCK_CHARACTERS.filter((c) => c.type === "CONSONANT");
  const showVowels = filter !== "CONSONANT";
  const showConsonants = filter !== "VOWEL";

  const handleSelect = (char: Character) => {
    setSelected(char);
    setSheetOpen(true);
  };

  const filters: { label: string; value: Filter }[] = [
    { label: "All", value: "ALL" },
    { label: "Vowels", value: "VOWEL" },
    { label: "Consonants", value: "CONSONANT" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex flex-col md:flex-row w-full">
      {/* ── Left: grid panel ── */}
      <div className="w-full md:w-95 lg:w-105 md:shrink-0 md:border-r-2 md:border-[#D9D0BC] overflow-y-auto px-5 pt-6 pb-28 md:pb-8">
        {/* Header */}
        <div className="mb-5">
          <h1 className="font-serif text-2xl font-semibold text-[#1B4332] leading-tight">
            Mongolian Script
          </h1>
          <p className="text-xs text-[#6B6B5E] mt-0.5">
            Traditional Vertical Alphabet
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={[
                "px-4 py-1.5 rounded-full border-2 text-sm font-medium transition-all duration-150",
                filter === value
                  ? "bg-[#E8820C] border-[#E8820C] text-white"
                  : "bg-transparent border-[#D9D0BC] text-[#6B6B5E] hover:border-[#2D6A4F] hover:text-[#1B4332]",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Vowels */}
        {showVowels && (
          <section className="mb-7">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-[#B86E08] mb-3">
              Vowels
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              {vowels.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  isSelected={selected?.id === character.id}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </section>
        )}

        {/* Consonants */}
        {showConsonants && (
          <section className="mb-7">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-[#B86E08] mb-3">
              Consonants
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              {consonants.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  isSelected={selected?.id === character.id}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── Right: detail panel (desktop only) ── */}
      <div className="hidden md:flex flex-1 items-start p-8 min-w-0">
        {selected ? (
          <CharacterDetail character={selected} />
        ) : (
          <div className="w-full flex flex-col items-center justify-center h-64 text-[#6B6B5E] opacity-50 gap-3">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            <p className="text-sm">Select a character</p>
          </div>
        )}
      </div>

      {/* ── Bottom sheet (mobile only) ── */}
      {/* Backdrop */}
      <div
        onClick={() => setSheetOpen(false)}
        className={[
          "md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300",
          sheetOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      />
      {/* Sheet */}
      <div
        className={[
          "md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#F5F0E8] rounded-t-3xl px-5 pt-4 pb-10 transition-transform duration-300",
          sheetOpen ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        {/* Handle */}
        <div className="w-10 h-1 bg-[#D9D0BC] rounded-full mx-auto mb-6" />
        {selected && <CharacterDetail character={selected} />}
      </div>
    </div>
  );
}
