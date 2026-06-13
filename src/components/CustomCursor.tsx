"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef(false);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const visibleFrame = window.requestAnimationFrame(() => setIsVisible(true));
    document.documentElement.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${clientX - 18}px, ${clientY - 18}px, 0) scale(${hoveredRef.current ? 1.35 : 1})`;
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
      setIsHovered(isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.cancelAnimationFrame(visibleFrame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2.5 w-2.5 rounded-full bg-cyber-cyan shadow-[0_0_14px_rgba(25,230,255,0.9)] transition-transform duration-100 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate3d(-50%, -50%, 0) scale(${isHovered ? 0.55 : 1})`,
        }}
      />

      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-cyber-cyan/45 transition-all duration-300"
        style={{
          willChange: "transform, border-color, background-color",
          borderColor: isHovered ? "rgba(25, 230, 255, 0.95)" : "rgba(25, 230, 255, 0.45)",
          backgroundColor: isHovered ? "rgba(25, 230, 255, 0.08)" : "transparent",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </>
  );
}
