import "@fontsource/plus-jakarta-sans";
import { HomePath } from "./_homeFeatures/HomeSectionPath";
import { Header } from "@/app/_components/Bar-Sections/header";

export default function HomeSection() {
  return (
    <div className="flex flex-col items-center justify-center bg-[#F0EDE3] min-h-screen font-['Plus_Jakarta_Sans']">
      <div className="header-container w-[80%] flex items-center justify-center">
        <Header streak={0} xp={0} />
      </div>
      <div className="pt-24 pb-28 md:pb-10 flex flex-col items-center">
        <HomePath />
      </div>
    </div>
  );
}
