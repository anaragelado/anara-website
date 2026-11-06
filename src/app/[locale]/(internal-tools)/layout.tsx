import type { ReactNode } from "react";
import { notFound } from "next/navigation";

// Content tools used while building the site (flavor tagging, image review,
// colour tests). They stay usable with `npm run dev` but must never be
// reachable on the live site.
export default function InternalToolsLayout({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") notFound();
  return children;
}
