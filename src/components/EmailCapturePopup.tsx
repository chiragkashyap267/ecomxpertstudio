"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle, Mail, Sparkles, X, Zap } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error" | "duplicate";

/* ─── Perks list ─────────────────────────────────────────── */
const PERKS = [
  "🎨 Exclusive mockup & design drops",
  "🚀 Web & app project case studies",
  "📦 Packaging and A+ content tips",
  "💡 Ecommerce growth strategies",
];

/* ─── Floating particle ──────────────────────────────────── */
function Dot({ style }: { style: React.CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        background: "rgba(14,165,233,0.5)",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function EmailCapturePopup() {
  const [visible, setVisible]   = useState(false);
  const [email, setEmail]       = useState("");
  const [status, setStatus]     = useState<Status>("idle");
  const [dismissed, setDismiss] = useState(false);
  const inputRef                = useRef<HTMLInputElement>(null);

  /* Show popup: 8 s delay OR exit-intent (mouse leaves top of viewport) */
  useEffect(() => {
    const alreadyDone = sessionStorage.getItem("ecomxpert-subscribed");
    if (alreadyDone) return;

    let timer: ReturnType<typeof setTimeout>;

    const showPopup = () => {
      if (!dismissed) setVisible(true);
    };

    // Timer-based trigger
    timer = setTimeout(showPopup, 8000);

    // Exit-intent trigger
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        clearTimeout(timer);
        showPopup();
      }
    };
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [dismissed]);

  /* Focus input when popup opens */
  useEffect(() => {
    if (visible) setTimeout(() => inputRef.current?.focus(), 350);
  }, [visible]);

  const close = () => {
    setVisible(false);
    setDismiss(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: email.trim(), source: "exit_popup" }),
      });

      const data = await res.json();

      if (res.status === 201) {
        setStatus("success");
        sessionStorage.setItem("ecomxpert-subscribed", "true");
        setTimeout(() => setVisible(false), 4000);
      } else if (data?.message === "already_subscribed") {
        setStatus("duplicate");
        setTimeout(() => setVisible(false), 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        /* ── Backdrop ── */
        <motion.div
          key="popup-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
          style={{
            position: "fixed", inset: 0, zIndex: 9998,
            background: "rgba(2,6,23,0.75)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px",
          }}
        >
          {/* ── Card ── */}
          <motion.div
            key="popup-card"
            initial={{ opacity: 0, scale: 0.9, y: 32 }}
            animate={{ opacity: 1, scale: 1,   y: 0  }}
            exit={{   opacity: 0, scale: 0.9, y: 24  }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "480px",
              borderRadius: "20px",
              overflow: "hidden",
              background: "var(--card-color)",
              border: "1px solid var(--border-color)",
              boxShadow: "0 0 0 1px rgba(14,165,233,0.08), 0 32px 80px rgba(0,0,0,0.3), 0 0 80px rgba(14,165,233,0.12)",
            }}
          >
            {/* Ambient dots */}
            <Dot style={{ top: "14%",  left: "8%",  animationDelay: "0s" }} />
            <Dot style={{ top: "60%",  left: "92%", animationDelay: "1s" }} />
            <Dot style={{ top: "80%",  left: "12%", animationDelay: "1.5s" }} />
            <Dot style={{ top: "20%",  left: "85%", animationDelay: "0.5s" }} />

            {/* Gradient top strip */}
            <div style={{
              height: "4px", width: "100%",
              background: "linear-gradient(90deg, #0b56a6 0%, #0ea5e9 40%, #818cf8 70%, #a855f7 100%)",
            }} />

            {/* Close button */}
            <button
              onClick={close}
              aria-label="Close"
              style={{
                position: "absolute", top: "16px", right: "16px",
                width: "32px", height: "32px",
                borderRadius: "50%",
                background: "color-mix(in srgb, var(--text-color) 4%, transparent)",
                border: "1px solid color-mix(in srgb, var(--text-color) 10%, transparent)",
                color: "var(--text-muted)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                zIndex: 10,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "color-mix(in srgb, var(--text-color) 8%, transparent)")}
              onMouseLeave={e => (e.currentTarget.style.background = "color-mix(in srgb, var(--text-color) 4%, transparent)")}
            >
              <X size={14} />
            </button>

            <div style={{ padding: "32px 32px 36px" }}>

              {/* ── Icon + Eyebrow ── */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "10px",
                  background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 20px rgba(14,165,233,0.4)",
                  flexShrink: 0,
                }}>
                  <Sparkles size={18} color="#fff" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: "10px", fontWeight: 700, color: "#0ea5e9", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    EcomXpertStudio Insider
                  </p>
                  <p style={{ margin: 0, fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                    Free · No spam · Unsubscribe anytime
                  </p>
                </div>
              </div>

              {/* ── Headline ── */}
              <h2 style={{
                margin: "0 0 10px",
                fontSize: "clamp(1.3rem, 4vw, 1.75rem)",
                fontWeight: 900,
                lineHeight: 1.2,
                letterSpacing: "-0.025em",
                color: "var(--text-color)",
              }}>
                Get exclusive design<br />
                <span style={{
                  background: "linear-gradient(90deg, #38bdf8, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  insights &amp; samples
                </span>
              </h2>
              <p style={{ margin: "0 0 20px", fontSize: "13px", lineHeight: "1.65", color: "var(--text-muted)" }}>
                Join founders and brand owners getting premium ecommerce content, design tips, and portfolio drops.
              </p>

              {/* ── Perks ── */}
              <ul style={{ margin: "0 0 24px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                {PERKS.map((perk) => (
                  <li key={perk} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-muted)" }}>
                    <Zap size={11} color="#0ea5e9" style={{ flexShrink: 0 }} />
                    {perk}
                  </li>
                ))}
              </ul>

              {/* ── Status: Success ── */}
              <AnimatePresence mode="wait">
                {(status === "success" || status === "duplicate") ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center",
                      gap: "12px", padding: "24px 16px", textAlign: "center",
                      borderRadius: "12px",
                      background: "rgba(16,185,129,0.08)",
                      border: "1px solid rgba(16,185,129,0.2)",
                    }}
                  >
                    <CheckCircle size={36} color="#10b981" />
                    <div>
                      <p style={{ margin: "0 0 4px", fontSize: "15px", fontWeight: 800, color: "var(--text-color)" }}>
                        {status === "duplicate" ? "Already subscribed!" : "You're in! 🎉"}
                      </p>
                      <p style={{ margin: 0, fontSize: "12px", color: "var(--text-muted)" }}>
                        {status === "duplicate"
                          ? "This email is already on our list."
                          : "Check your inbox for a welcome email from us."}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                  >
                    <div style={{ display: "flex", gap: "8px" }}>
                      <div style={{
                        flex: 1, position: "relative",
                        display: "flex", alignItems: "center",
                      }}>
                        <Mail
                          size={14}
                          style={{
                            position: "absolute", left: "14px",
                            color: "var(--text-muted)",
                            pointerEvents: "none",
                          }}
                        />
                        <input
                          ref={inputRef}
                          type="email"
                          required
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                          placeholder="your@email.com"
                          style={{
                            width: "100%",
                            height: "46px",
                            paddingLeft: "38px",
                            paddingRight: "14px",
                            borderRadius: "10px",
                            border: "1px solid color-mix(in srgb, var(--text-color) 10%, transparent)",
                            background: "color-mix(in srgb, var(--text-color) 4%, transparent)",
                            color: "var(--text-color)",
                            fontSize: "14px",
                            outline: "none",
                            fontFamily: "inherit",
                            transition: "border-color 0.2s ease",
                          }}
                          onFocus={e => (e.target.style.borderColor = "rgba(14,165,233,0.5)")}
                          onBlur={e =>  (e.target.style.borderColor = "color-mix(in srgb, var(--text-color) 10%, transparent)")}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        style={{
                          height: "46px",
                          paddingInline: "20px",
                          borderRadius: "10px",
                          background: status === "loading"
                            ? "rgba(14,165,233,0.4)"
                            : "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
                          border: "none",
                          color: "#fff",
                          fontSize: "13px",
                          fontWeight: 700,
                          cursor: status === "loading" ? "not-allowed" : "pointer",
                          display: "flex", alignItems: "center", gap: "6px",
                          whiteSpace: "nowrap",
                          boxShadow: "0 0 20px rgba(14,165,233,0.35)",
                          transition: "all 0.2s ease",
                          fontFamily: "inherit",
                        }}
                      >
                        {status === "loading" ? (
                          <>
                            <span style={{ display: "inline-block", width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                            Joining…
                          </>
                        ) : (
                          <>
                            Join Free
                            <ArrowUpRight size={14} />
                          </>
                        )}
                      </button>
                    </div>

                    {status === "error" && (
                      <p style={{ margin: 0, fontSize: "12px", color: "#f87171", textAlign: "center" }}>
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Social proof */}
              {status !== "success" && status !== "duplicate" && (
                <p style={{ margin: "14px 0 0", fontSize: "11px", color: "var(--text-muted)", textAlign: "center" }}>
                  ✓ 100+ brand owners already subscribed
                </p>
              )}
            </div>

            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
