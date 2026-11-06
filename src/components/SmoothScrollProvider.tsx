"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import { isTouchDevice, useClientValue } from "@/lib/use-client-value";

/**
 * Watches for layout shifts (sticky elements, animations) and
 * tells Lenis to recalculate its scroll boundaries.
 */
function LenisResizeWatcher() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Observe body for size changes caused by animations / lazy images
    const observer = new ResizeObserver(() => {
      lenis.resize();
    });
    observer.observe(document.body);

    // Also do an initial resize after animations have likely settled
    const timeout = setTimeout(() => lenis.resize(), 1500);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const isTouch = useClientValue(isTouchDevice, true);

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
        autoResize: false, // We handle resize ourselves via ResizeObserver
      }}
    >
      <LenisResizeWatcher />
      {children}
    </ReactLenis>
  );
}
