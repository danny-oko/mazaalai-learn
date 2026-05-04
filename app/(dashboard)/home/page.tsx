import { Header } from "@/app/_components/Bar-Sections/header";
import { HomePath } from "./_components/home-page-client";

export default function HomeSection() {
  return (
    <div className="flex min-h-full flex-col items-center bg-[#FFF8E7] pb-28 font-balsamiq text-[#3b2f2f]">
      <Header streak={0} xp={0} />
      <div className="flex min-h-0 flex-1 w-full flex-col items-center pt-20 sm:pt-24 md:pt-28">
        <HomePath />
      </div>
    </div>
  );
}
