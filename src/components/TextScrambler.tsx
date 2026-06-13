"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface TextScramblerProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
}

const CYBER_GLYPHS = "X01$_*&%#@<>[]?{}!+/\\AZ";

export default function TextScrambler({
  text,
  className = "",
  triggerOnHover = true,
}: TextScramblerProps) {
  const [displayText, setDisplayText] = useState(text);
  const isAnimating = useRef(false);

  const triggerScramble = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    let iteration = 0;
    const textArray = text.split("");

    const interval = window.setInterval(() => {
      const scrambled = textArray
        .map((char, idx) => {
          if (char === " ") return " ";
          if (idx < iteration) return text[idx];
          return CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (iteration >= text.length) {
        window.clearInterval(interval);
        setDisplayText(text);
        isAnimating.current = false;
      }

      iteration += 1 / 3;
    }, 25);
  }, [text]);

  useEffect(() => {
    triggerScramble();
  }, [triggerScramble]);

  return (
    <span
      className={`font-mono ${className}`}
      onMouseEnter={() => {
        if (triggerOnHover) triggerScramble();
      }}
    >
      {displayText}
    </span>
  );
}
