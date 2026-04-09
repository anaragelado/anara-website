import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  as?: "section" | "div" | "footer";
}

export default function SectionWrapper({
  children,
  id,
  className = "",
  as: Element = "section",
}: SectionWrapperProps) {
  return (
    <Element id={id} className={`py-16 md:py-24 lg:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">{children}</div>
    </Element>
  );
}
