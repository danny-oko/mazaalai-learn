import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { ConditionalBars } from "./_components/Bar-Sections/conditional-bars";
import localFont from "next/font/local";

const mongolFont = localFont({
  src: "./font/cmdashitseden.ttf",
  variable: "--font-mongol",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mazaalai Learn",
  description: "Эх хэл бол үндэсний дархлаа юм",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="mn"
      className={`${geistSans.variable} ${geistMono.variable} ${mongolFont.variable} h-full antialiased`}
    >
      <body className="flex h-full min-h-0 flex-row overflow-hidden">
        <ClerkProvider>
          <ConditionalBars />
          <main className="min-h-0 min-w-0 flex-1 overflow-y-auto">{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
