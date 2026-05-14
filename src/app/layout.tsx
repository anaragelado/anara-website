import type { ReactNode } from "react";
import { Work_Sans, Playfair_Display, Amatic_SC } from "next/font/google";
import { headers } from "next/headers";
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

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = (await headers()).get("x-next-intl-locale") ?? "pt";

  return (
    <html
      lang={locale}
      className={`${workSans.variable} ${playfairDisplay.variable} ${amaticSC.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col overscroll-y-none bg-background-primary text-text-primary font-body">
        {children}
      </body>
    </html>
  );
}
