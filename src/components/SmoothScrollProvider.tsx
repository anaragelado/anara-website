"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  if (isTouch) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
