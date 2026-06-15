"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef(false);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    setIsVisible(true);
    document.documentElement.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x - 5}px, ${y - 5}px, 0) scale(${hoveredRef.current ? 0.55 : 1})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x - 18}px, ${y - 18}px, 0) scale(${hoveredRef.current ? 1.35 : 1})`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        Boolean(target.closest("a")) ||
        Boolean(target.closest("button")) ||
        target.getAttribute("role") === "button";

      hoveredRef.current = isClickable;

      if (ringRef.current) {
        ringRef.current.style.borderColor = isClickable
          ? "rgba(25, 230, 255, 0.95)"
          : "rgba(25, 230, 255, 0.45)";
        ringRef.current.style.backgroundColor = isClickable
          ? "rgba(25, 230, 255, 0.08)"
          : "transparent";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2.5 w-2.5 rounded-full bg-cyber-cyan shadow-[0_0_14px_rgba(25,230,255,0.9)]"
        style={{ willChange: "transform" }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-cyber-cyan/45 transition-[border-color,background-color] duration-300"
        style={{
          willChange: "transform",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </>
  );
}
