"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  User,
} from "lucide-react";

/* ─── Config ─────────────────────────────────────────────── */
const WA_NUMBER = "919548174325";

function buildWhatsAppUrl(name: string, email: string, message: string): string {
  const text = `Hi EcomXpertStudio! 👋\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n— Sent from ecomxpertstudio.com`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/* ─── Floating label input ───────────────────────────────── */
function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  icon: Icon,
  placeholder,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ElementType;
  placeholder: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div style={{ position: "relative" }}>
      {/* Label */}
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: "44px",
          top: focused || hasValue ? "6px" : "50%",
          transform: focused || hasValue ? "none" : "translateY(-50%)",
          fontSize: focused || hasValue ? "10px" : "13px",
          fontWeight: 600,
          color: focused
            ? "#0ea5e9"
            : hasValue
            ? "rgba(148,163,184,0.7)"
            : "rgba(148,163,184,0.55)",
          transition: "all 0.2s ease",
          pointerEvents: "none",
          letterSpacing: focused || hasValue ? "0.06em" : "0",
          textTransform: focused || hasValue ? "uppercase" : "none",
          zIndex: 1,
        }}
      >
        {label}
      </label>

      {/* Icon */}
      <div
        style={{
          position: "absolute",
          left: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          color: focused ? "#0ea5e9" : "rgba(148,163,184,0.4)",
          transition: "color 0.2s ease",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <Icon size={16} />
      </div>

      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=""
        style={{
          width: "100%",
          height: "58px",
          paddingLeft: "44px",
          paddingRight: "16px",
          paddingTop: "20px",
          paddingBottom: "6px",
          borderRadius: "12px",
          border: `1px solid ${focused ? "rgba(14,165,233,0.5)" : "color-mix(in srgb, var(--text-color) 10%, transparent)"}`,
          background: focused
            ? "rgba(14,165,233,0.06)"
            : "color-mix(in srgb, var(--text-color) 4%, transparent)",
          color: "var(--text-color)",
          fontSize: "14px",
          outline: "none",
          fontFamily: "inherit",
          transition: "all 0.25s ease",
          boxShadow: focused ? "0 0 0 3px rgba(14,165,233,0.1)" : "none",
        }}
      />
    </div>
  );
}

/* ─── Floating label textarea ────────────────────────────── */
function FloatingTextarea({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div style={{ position: "relative" }}>
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: "16px",
          top: focused || hasValue ? "10px" : "18px",
          fontSize: focused || hasValue ? "10px" : "13px",
          fontWeight: 600,
          color: focused
            ? "#0ea5e9"
            : hasValue
            ? "rgba(148,163,184,0.7)"
            : "rgba(148,163,184,0.55)",
          transition: "all 0.2s ease",
          pointerEvents: "none",
          letterSpacing: focused || hasValue ? "0.06em" : "0",
          textTransform: focused || hasValue ? "uppercase" : "none",
          zIndex: 1,
        }}
      >
        {label}
      </label>
      <textarea
        id={id}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={4}
        style={{
          width: "100%",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "28px",
          paddingBottom: "12px",
          borderRadius: "12px",
          border: `1px solid ${focused ? "rgba(14,165,233,0.5)" : "color-mix(in srgb, var(--text-color) 10%, transparent)"}`,
          background: focused
            ? "rgba(14,165,233,0.06)"
            : "color-mix(in srgb, var(--text-color) 4%, transparent)",
          color: "var(--text-color)",
          fontSize: "14px",
          outline: "none",
          resize: "none",
          fontFamily: "inherit",
          transition: "all 0.25s ease",
          boxShadow: focused ? "0 0 0 3px rgba(14,165,233,0.1)" : "none",
          lineHeight: "1.6",
        }}
      />
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function ContactForm() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Open WhatsApp in new tab
    const url = buildWhatsAppUrl(name.trim(), email.trim(), message.trim());
    window.open(url, "_blank", "noopener noreferrer");
    setSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid var(--border-color)",
        background: "var(--card-color)",
        backdropFilter: "blur(24px)",
        boxShadow: "0 10px 40px rgba(11,86,166,0.08)",
      }}
    >
      {/* Top gradient bar */}
      <div style={{
        height: "3px",
        background: "linear-gradient(90deg, #0b56a6 0%, #0ea5e9 35%, #818cf8 65%, #a855f7 100%)",
      }} />

      {/* Grid pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 0%, black, transparent)",
      }} />

      <div style={{ position: "relative", zIndex: 1, padding: "clamp(24px, 5vw, 48px)" }}>

        <AnimatePresence mode="wait">
          {submitted ? (
            /* ── Success state ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                textAlign: "center", gap: "20px", padding: "40px 0",
              }}
            >
              <div style={{
                width: "72px", height: "72px", borderRadius: "50%",
                background: "linear-gradient(135deg, #22c55e, #10b981)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 32px rgba(34,197,94,0.4)",
              }}>
                <CheckCircle size={32} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-color)", margin: "0 0 8px" }}>
                  WhatsApp opened! 🎉
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: "0 0 24px", lineHeight: "1.6" }}>
                  Your message is pre-filled in WhatsApp. Just hit send and we'll reply within a few hours.
                </p>
                <button
                  onClick={handleReset}
                  style={{
                    padding: "10px 28px", borderRadius: "999px",
                    background: "rgba(14,165,233,0.1)",
                    border: "1px solid rgba(14,165,233,0.25)",
                    color: "#7dd3fc", fontSize: "13px", fontWeight: 700,
                    cursor: "pointer", fontFamily: "inherit",
                    transition: "all 0.2s ease",
                  }}
                >
                  Send another message
                </button>
              </div>
            </motion.div>
          ) : (
            /* ── Form ── */
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* Header */}
              <div style={{ marginBottom: "8px" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)",
                  borderRadius: "999px", padding: "5px 14px", marginBottom: "16px",
                }}>
                  <Sparkles size={11} color="#0ea5e9" />
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#0ea5e9", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    Get In Touch
                  </span>
                </div>
                <h2 style={{
                  margin: "0 0 8px", fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 900, color: "var(--text-color)", letterSpacing: "-0.025em", lineHeight: 1.2,
                }}>
                  Let's build something<br />
                  <span style={{
                    background: "linear-gradient(90deg, #38bdf8, #818cf8)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>premium together.</span>
                </h2>
                <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.6" }}>
                  Fill in the form — we'll open WhatsApp with your message pre-filled, ready to send.
                </p>
              </div>

              {/* Fields */}
              <FloatingInput
                id="contact-name"
                label="Full Name"
                value={name}
                onChange={setName}
                icon={User}
                placeholder=""
                required
              />
              <FloatingInput
                id="contact-email"
                label="Email Address"
                type="email"
                value={email}
                onChange={setEmail}
                icon={Mail}
                placeholder=""
                required
              />
              <FloatingTextarea
                id="contact-message"
                label="Your Message"
                value={message}
                onChange={setMessage}
              />

              {/* Quick contact chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
                {[
                  { icon: Phone, label: "+91 95481 74325", href: "tel:+919548174325" },
                  { icon: Mail, label: "businesswithchirag267@gmail.com", href: "mailto:businesswithchirag267@gmail.com" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      padding: "6px 12px", borderRadius: "999px",
                      background: "color-mix(in srgb, var(--text-color) 4%, transparent)",
                      border: "1px solid color-mix(in srgb, var(--text-color) 10%, transparent)",
                      color: "var(--text-muted)", fontSize: "11px", fontWeight: 600,
                      textDecoration: "none", transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(14,165,233,0.35)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#7dd3fc";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "color-mix(in srgb, var(--text-color) 10%, transparent)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)";
                    }}
                  >
                    <item.icon size={11} />
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  marginTop: "4px",
                  height: "52px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)",
                  border: "none",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 0 28px rgba(37,211,102,0.35)",
                  transition: "all 0.25s ease",
                  fontFamily: "inherit",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(37,211,102,0.5)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 28px rgba(37,211,102,0.35)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                <MessageCircle size={18} />
                Send via WhatsApp
                <ArrowUpRight size={16} />
              </button>

              <p style={{ textAlign: "center", fontSize: "11px", color: "rgba(148,163,184,0.4)", margin: 0 }}>
                Opens WhatsApp with your message pre-filled · Usually reply within 2–4 hrs
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
