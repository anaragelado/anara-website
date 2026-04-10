import type { ReactNode } from "react";
import { Work_Sans, Playfair_Display, Amatic_SC } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

const amaticSC = Amatic_SC({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-amatic-sc",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt"
      className={`${workSans.variable} ${playfairDisplay.variable} ${amaticSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background-primary text-text-primary font-body">
        {children}
      </body>
    </html>
  );
}
