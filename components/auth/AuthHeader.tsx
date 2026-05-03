import Image from "next/image";

export function AuthHeader() {
  return (
    <>
      <div className="flex justify-center">
        <Image
          src="/icon.svg"
          alt="Mazaalai bear"
          width={84}
          height={84}
          priority
          className="h-16 w-16 sm:h-[84px] sm:w-[84px]"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#6B3F1D] sm:text-4xl">
          Mazaalai Learn
        </h1>
        <p className="text-xs font-medium text-amber-900/75 sm:text-sm">
          Хэл бичиг бол үндэсний дархлаа юм.
        </p>
      </div>
    </>
  );
}
