"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LOGS = [
  { text: "INITIALIZING CORE SHADERS...", color: "#0ea5e9" },
  { text: "CONNECTING TO SECURE PORTAL...", color: "#38bdf8" },
  { text: "SPINNING UP GSAP ACCELERATION ENGINES...", color: "#818cf8" },
  { text: "ENGAGING LENIS SMOOTH 60FPS WRAPPERS...", color: "#0ea5e9" },
  { text: "CACHING ULTRA-MODERN GLASS MOCKUPS...", color: "#38bdf8" },
  { text: "DEPLOYING CREATIVE GROWTH STRATEGIES...", color: "#c084fc" },
  { text: "CONNECTION ESTABLISHED. ALL SYSTEMS OPTIMAL.", color: "#4ade80" },
];

function Particle({ index }: { index: number }) {
  const style = {
    left: `${(index * 37 + 11) % 100}%`,
    top: `${(index * 53 + 7) % 100}%`,
    animationDelay: `${(index * 0.4) % 3}s`,
    animationDuration: `${2.5 + (index % 3) * 0.8}s`,
  };
  return (
    <div
      className="absolute w-1 h-1 rounded-full bg-sky-400/40"
      style={{
        ...style,
        animation: `float-particle ${style.animationDuration} ease-in-out ${style.animationDelay} infinite alternate`,
      }}
    />
  );
}

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [currentLogIdx, setCurrentLogIdx] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState<typeof BOOT_LOGS>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("ecomxpert-loaded");
    if (hasLoaded) {
      setProgress(100);
      setIsDone(true);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          sessionStorage.setItem("ecomxpert-loaded", "true");
          setTimeout(() => setIsDone(true), 700);
          return 100;
        }
        const increment = prev > 85 ? 3 : prev > 60 ? 2 : 1.5;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    const logInterval = setInterval(() => {
      setCurrentLogIdx((prev) => {
        const next = prev < BOOT_LOGS.length - 1 ? prev + 1 : prev;
        setVisibleLogs(BOOT_LOGS.slice(0, next + 1));
        return next;
      });
    }, 320);

    setVisibleLogs([BOOT_LOGS[0]]);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, []);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [visibleLogs]);

  if (isDone) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.04,
          filter: "blur(12px)",
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(ellipse at 30% 20%, #040e1f 0%, #020617 50%, #030a1a 100%)",
          fontFamily: "monospace",
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        {/* Floating particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}

        {/* Large ambient glow orbs */}
        <div style={{
          position: "absolute", top: "-10%", left: "10%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14,165,233,0.09) 0%, transparent 70%)",
          pointerEvents: "none", filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute", bottom: "-15%", right: "5%",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)",
          pointerEvents: "none", filter: "blur(50px)",
        }} />

        {/* Corner decorations */}
        <div style={{ position: "absolute", top: 24, left: 24, width: 18, height: 18, borderTop: "2px solid rgba(14,165,233,0.5)", borderLeft: "2px solid rgba(14,165,233,0.5)" }} />
        <div style={{ position: "absolute", top: 24, right: 24, width: 18, height: 18, borderTop: "2px solid rgba(14,165,233,0.5)", borderRight: "2px solid rgba(14,165,233,0.5)" }} />
        <div style={{ position: "absolute", bottom: 24, left: 24, width: 18, height: 18, borderBottom: "2px solid rgba(14,165,233,0.5)", borderLeft: "2px solid rgba(14,165,233,0.5)" }} />
        <div style={{ position: "absolute", bottom: 24, right: 24, width: 18, height: 18, borderBottom: "2px solid rgba(14,165,233,0.5)", borderRight: "2px solid rgba(14,165,233,0.5)" }} />

        {/* Scanline effect */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)",
        }} />

        <div style={{ width: "100%", maxWidth: "520px", padding: "0 24px", position: "relative", zIndex: 2 }}>
          
          {/* Brand header */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            {/* Animated logo mark */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "8px",
                background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 20px rgba(14,165,233,0.5)",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div style={{ fontSize: "13px", fontWeight: 800, letterSpacing: "0.15em", color: "#94a3b8" }}>
                ECOM<span style={{ color: "#0ea5e9" }}>XPERT</span>STUDIO
              </div>
            </div>
            <p style={{ fontSize: "9px", letterSpacing: "0.35em", color: "rgba(148,163,184,0.45)", textTransform: "uppercase" }}>
              SYSTEM BOOT v2.0.0 // DIGITAL GROWTH ENGINE
            </p>
          </div>

          {/* Terminal Box */}
          <div style={{
            marginBottom: "24px",
            borderRadius: "12px",
            border: "1px solid rgba(14,165,233,0.2)",
            background: "rgba(8,15,32,0.85)",
            backdropFilter: "blur(20px)",
            overflow: "hidden",
            boxShadow: "0 0 0 1px rgba(14,165,233,0.05), 0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}>
            {/* Terminal title bar */}
            <div style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "10px 14px",
              borderBottom: "1px solid rgba(14,165,233,0.12)",
              background: "rgba(14,165,233,0.04)",
            }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,95,87,0.8)" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,188,46,0.8)" }} />
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(40,200,64,0.7)" }} />
              <span style={{ marginLeft: "8px", fontSize: "9px", color: "rgba(148,163,184,0.5)", letterSpacing: "0.04em" }}>
                console@ecomxpert:~/boot
              </span>
            </div>

            {/* Log area */}
            <div
              ref={logRef}
              style={{
                padding: "14px 16px",
                height: "130px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                scrollbarWidth: "none",
              }}
            >
              {visibleLogs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "10px", lineHeight: "1.5" }}
                >
                  <span style={{ color: "rgba(14,165,233,0.5)", flexShrink: 0 }}>›</span>
                  <span style={{ color: log.color, fontWeight: index === visibleLogs.length - 1 ? 700 : 500 }}>
                    {log.text}
                  </span>
                  {index === visibleLogs.length - 1 && currentLogIdx < BOOT_LOGS.length - 1 && (
                    <span style={{ color: "#38bdf8", animation: "blink 1s step-end infinite" }}>█</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.25em", color: "rgba(148,163,184,0.6)", textTransform: "uppercase" }}>
                BOOTING INTERFACE
              </span>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#0ea5e9", letterSpacing: "0.08em" }}>
                {String(Math.round(progress)).padStart(3, "0")}%
              </span>
            </div>

            {/* Progress track */}
            <div style={{
              height: "4px", width: "100%", borderRadius: "999px",
              background: "rgba(14,165,233,0.1)",
              border: "1px solid rgba(14,165,233,0.12)",
              overflow: "hidden",
              position: "relative",
            }}>
              <motion.div
                style={{
                  height: "100%",
                  borderRadius: "999px",
                  background: "linear-gradient(90deg, #0b56a6 0%, #0ea5e9 50%, #38bdf8 100%)",
                  boxShadow: "0 0 12px rgba(14,165,233,0.8), 0 0 24px rgba(14,165,233,0.4)",
                  width: `${progress}%`,
                  position: "relative",
                }}
                transition={{ ease: "linear" }}
              >
                {/* Shimmer on progress bar */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer-bar 1.5s linear infinite",
                }} />
              </motion.div>
            </div>

            {/* Segment dots */}
            <div style={{ display: "flex", justifyContent: "space-between", paddingInline: "2px" }}>
              {[0, 25, 50, 75, 100].map((mark) => (
                <div key={mark} style={{
                  width: "4px", height: "4px", borderRadius: "50%",
                  background: progress >= mark ? "#0ea5e9" : "rgba(14,165,233,0.2)",
                  boxShadow: progress >= mark ? "0 0 6px rgba(14,165,233,0.8)" : "none",
                  transition: "all 0.3s ease",
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom metadata */}
        <div style={{
          position: "absolute", bottom: "20px",
          fontSize: "8px", letterSpacing: "0.2em",
          color: "rgba(148,163,184,0.25)", textTransform: "uppercase",
          textAlign: "center",
        }}>
          © 2026 EcomXpertStudio · Secure Digital System
        </div>

        <style>{`
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 16px rgba(14,165,233,0.4); }
            50% { box-shadow: 0 0 28px rgba(14,165,233,0.7), 0 0 48px rgba(99,102,241,0.3); }
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          @keyframes float-particle {
            from { opacity: 0.2; transform: translate(0, 0); }
            to { opacity: 0.6; transform: translate(8px, -12px); }
          }
          @keyframes shimmer-bar {
            from { background-position: 200% center; }
            to { background-position: -200% center; }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
