"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger safely on the client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade";
  delay?: number;
  duration?: number;
}

export default function GSAPReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.85,
}: GSAPRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let initialX = 0;
    let initialY = 0;

    if (direction === "up") initialY = 40;
    if (direction === "down") initialY = -40;
    if (direction === "left") initialX = 40;
    if (direction === "right") initialX = -40;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, x: initialX, y: initialY },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [direction, delay, duration]);

  return (
    <div ref={containerRef} className="will-change-[transform,opacity]">
      {children}
    </div>
  );
}
