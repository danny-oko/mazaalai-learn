import "@fontsource/plus-jakarta-sans";
import { HomePath } from "./_homeFeatures/HomeSectionPath";
import { Header } from "@/app/_components/Bar-Sections/header";

export default function HomeSection() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#F0EDE3] pb-28 font-['Plus_Jakarta_Sans'] md:pb-10">
      <Header streak={0} xp={0} />
      <div className="flex w-full flex-col items-center pt-20 sm:pt-24 md:pt-28">
        <HomePath />
      </div>
    </div>
  );
}
