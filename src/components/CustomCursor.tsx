"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if it's a touch device - don't show custom cursor on mobile
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    setIsVisible(true);
    document.documentElement.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });

      // Animate the follower ring with a slight delay for buttery movement
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${clientX - 16}px, ${clientY - 16}px, 0) scale(${isHovered ? 1.5 : 1})`;
      }

      // Animate the ambient background glow orb
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${clientX - 192}px, ${clientY - 192}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Trigger hover state on buttons, links, clickable objects, and glass cards
      const isClickable = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("a") || 
        target.closest("button") ||
        target.closest(".glass-panel-cyan") ||
        target.getAttribute("role") === "button";
      
      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [isHovered]);

  if (!isVisible) return null;

  return (
    <>
      {/* Large ambient glowing cursor background (glowing cyan orb behind content) */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 z-0 h-[384px] w-[384px] rounded-full bg-cyber-cyan/7 opacity-60 blur-[130px] transition-transform duration-500 cubic-bezier(0.1, 0.8, 0.2, 1)"
        style={{ willChange: "transform" }}
      />

      {/* Tiny precise cursor dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-100 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyber-cyan shadow-[0_0_10px_#00f0ff] transition-transform duration-100 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate3d(-50%, -50%, 0) scale(${isHovered ? 0.5 : 1})`,
        }}
      />

      {/* Outer delay ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-100 h-8 w-8 rounded-full border border-cyber-cyan/45 shadow-[0_0_12px_rgba(0,240,255,0.15)] transition-all duration-300 cubic-bezier(0.1, 0.8, 0.2, 1)"
        style={{
          willChange: "transform, border-color, background-color",
          borderColor: isHovered ? "rgba(0, 240, 255, 0.9)" : "rgba(0, 240, 255, 0.45)",
          backgroundColor: isHovered ? "rgba(0, 240, 255, 0.08)" : "transparent",
        }}
      />
    </>
  );
}
