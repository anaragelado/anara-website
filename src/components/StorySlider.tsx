"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderImage {
  src: string;
  alt: string;
}

interface StorySliderProps {
  images: SliderImage[];
  interval?: number;
}

export default function StorySlider({ images, interval = 3500 }: StorySliderProps) {
  const [current, setCurrent] = useState(0);
  const dragStartX = useRef<number | null>(null);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Reset the timer on every slide change to avoid an immediate
  // double-advance right after the user swipes or clicks an arrow.
  useEffect(() => {
    const timer = setInterval(advance, interval);
    return () => clearInterval(timer);
  }, [advance, interval, current]);

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: "pan-y" }}
      onPointerDown={(e) => {
        dragStartX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (dragStartX.current === null) return;
        const delta = e.clientX - dragStartX.current;
        if (delta < -40) advance();
        else if (delta > 40) prev();
        dragStartX.current = null;
      }}
      onPointerLeave={() => {
        dragStartX.current = null;
      }}
      onPointerCancel={() => {
        dragStartX.current = null;
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none"
        >
          <Image
            src={images[current].src}
            alt={images[current].alt}
            fill
            priority={current === 0}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      {/* Prev arrow — ghost on mobile, solid on desktop */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Previous image"
        className="pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white/40 text-white transition-all duration-300 ease-in-out
          h-8 w-8 opacity-80 hover:opacity-100
          md:h-10 md:w-10 md:bg-white/40 md:opacity-100 md:hover:bg-white/75"
      >
        <ChevronLeft size={18} strokeWidth={1.5} className="md:hidden" />
        <ChevronLeft size={22} strokeWidth={1.5} className="hidden md:block" />
      </button>

      {/* Next arrow — ghost on mobile, solid on desktop */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); advance(); }}
        aria-label="Next image"
        className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white/40 text-white transition-all duration-300 ease-in-out
          h-8 w-8 opacity-80 hover:opacity-100
          md:h-10 md:w-10 md:bg-white/40 md:opacity-100 md:hover:bg-white/75"
      >
        <ChevronRight size={18} strokeWidth={1.5} className="md:hidden" />
        <ChevronRight size={22} strokeWidth={1.5} className="hidden md:block" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 pointer-events-auto">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Image ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-white"
                : "w-2.5 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
