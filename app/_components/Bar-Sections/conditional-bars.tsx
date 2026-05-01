"use client";

import { usePathname } from "next/navigation";
import { BarSections } from "./main-bars";

export const ConditionalBars = () => {
  const pathname = usePathname();
  const hideBars =
    pathname?.startsWith("/lesson/") ||
    pathname?.startsWith("/sign-in") ||
    pathname?.startsWith("/sign-up");

  if (hideBars) return null;

  return <BarSections />;
};
