import { AlphabetClient } from "./components/AlphabetClient";
import alphabetData from "./components/alphabetData.json";
import { Character } from "./components/CharacterCard";

const characters = alphabetData as Character[];

export default function Page() {
  return <AlphabetClient characters={characters} />;
}
