// Ranks //

const RANK_TIERS: readonly { minXp: number; name: string }[] = [
  { minXp: 3000, name: "Дархан Аварга" },
  { minXp: 2000, name: "Даян Аварга" },
  { minXp: 1000, name: "Аварга" },
  { minXp: 750, name: "Арслан" },
  { minXp: 500, name: "Гарьд" },
  { minXp: 250, name: "Заан" },
  { minXp: 100, name: "Харцага" },
  { minXp: 0, name: "Начин" },
];

export function getRankNameFromXp(totalXp: number): string {
  const xp = Math.floor(Number(totalXp));

  if (Number.isNaN(xp) || xp < 0) {
    return "Начин";
  }

  for (const tier of RANK_TIERS) {
    if (xp >= tier.minXp) {
      return tier.name;
    }
  }

  return "Начин";
}
