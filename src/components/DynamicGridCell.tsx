"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DynamicGridCellProps {
  images: string[];
  intervalMs?: number;
  delayOffsetMs?: number;
  className?: string;
  imageClassName?: string;
}

export default function DynamicGridCell({
  images,
  intervalMs = 4000,
  delayOffsetMs = 0,
  className = "",
  imageClassName = "object-cover w-full h-full",
}: DynamicGridCellProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Initial delay so that cells don't transition simultaneously
    const startTimeout = window.setTimeout(() => {
      setHasStarted(true);
    }, delayOffsetMs);

    return () => window.clearTimeout(startTimeout);
  }, [delayOffsetMs]);

  useEffect(() => {
    if (!hasStarted || images.length <= 1) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [hasStarted, images.length, intervalMs]);

  if (!images || images.length === 0) {
    return <div className={`bg-slate-100 dark:bg-slate-800 ${className}`} />;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className={`absolute inset-0 ${imageClassName}`}
          initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-slate-900/10 dark:bg-black/20 pointer-events-none" />
    </div>
  );
}
