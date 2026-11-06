"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { type ReactNode } from "react";
import { isTouchDevice, useClientValue } from "@/lib/use-client-value";

interface HeroParallaxProps {
  children: ReactNode;
}

export default function HeroParallax({ children }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useClientValue(isTouchDevice, true);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Video moves at 30% of scroll speed — desktop only
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // On touch devices, skip the motion wrapper entirely
  if (isTouch) {
    return (
      <div ref={ref} className="absolute inset-0">
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        {children}
      </motion.div>
    </div>
  );
}
