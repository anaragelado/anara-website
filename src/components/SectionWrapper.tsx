import type { CSSProperties, ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  as?: "section" | "div" | "footer";
  /** Hex color applied as a 2px top border on mobile only (hidden on md+) */
  mobileTopBorderColor?: string;
}

export default function SectionWrapper({
  children,
  id,
  className = "",
  as: Element = "section",
  mobileTopBorderColor,
}: SectionWrapperProps) {
  const borderStyle: CSSProperties | undefined = mobileTopBorderColor
    ? { borderTopColor: mobileTopBorderColor }
    : undefined;

  return (
    <Element
      id={id}
      className={`scroll-mt-16 py-12 md:py-16 lg:py-24 ${mobileTopBorderColor ? "border-t-[10px] md:border-t-0" : ""} ${className}`}
      style={borderStyle}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">{children}</div>
    </Element>
  );
}
