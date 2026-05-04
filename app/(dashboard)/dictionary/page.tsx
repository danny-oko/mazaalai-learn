import { DictionaryPage } from "./components/DictionaryPage";
import alphabetData from "./components/alphabetData.json";
import { Character } from "./components/LetterCard";

const characters = alphabetData as Character[];

export default function Page() {
  return <DictionaryPage characters={characters} />;
}
