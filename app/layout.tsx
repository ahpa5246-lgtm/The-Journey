import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_Arabic } from "next/font/google";
import GrainientBackground from "@/components/GrainientBackground";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Journey — Iraq, clearly discovered",
  description:
    "A bilingual discovery platform for Iraq's heritage, trusted places, and creator-led local trails.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${arabic.variable}`}>
        <GrainientBackground />
        {children}
      </body>
    </html>
  );
}
