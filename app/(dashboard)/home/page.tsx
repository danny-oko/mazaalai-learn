import "@fontsource/plus-jakarta-sans";
import { Header } from "@/app/_components/Bar-Sections/header";
import { HomePath } from "./_components/home-page-client";

export default function HomeSection() {
  return (
    <div className="flex min-h-full flex-col items-center bg-[#F0EDE3] pb-28 font-['Plus_Jakarta_Sans'] md:-ml-20 xl:-ml-65">
      <Header streak={0} xp={0} />
      <div className="flex min-h-0 flex-1 w-full flex-col items-center pt-20 sm:pt-24 md:pt-28">
        <HomePath />
      </div>
    </div>
  );
}
