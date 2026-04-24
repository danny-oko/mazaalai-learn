import "@fontsource/plus-jakarta-sans";
import { HomePath } from "./_homeFeatures/HomeSectionPath";
import { Header } from "@/app/_components/Bar-Sections/header";

export default function HomeSection() {
  return (
    <div>
      <Header streak={0} xp={0} />

      <div className="flex flex-col items-center justify-center font-['Plus_Jakarta_Sans'] mt-8 gap-10">
        <div>
          <HomePath />
        </div>
      </div>
    </div>
  );
}
