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
    <Element
      id={id}
      className={`scroll-mt-16 py-12 md:py-16 lg:py-24 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">{children}</div>
    </Element>
  );
}
