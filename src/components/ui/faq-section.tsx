"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export type FAQItem = {
  q: string;
  a: string;
};

export const HOME_FAQS: FAQItem[] = [
  {
    q: "What services does EcomXpertStudio offer?",
    a: "We offer four core service pillars: Web Development (Next.js websites, landing pages, SaaS dashboards), App Development (custom web apps, AI chatbot interfaces, admin panels), Graphic Designing (product mockups, packaging, Amazon A+ content, social creatives), and Video Editing (product reels, promo videos, motion graphics). All four under one studio roof.",
  },
  {
    q: "How long does a typical project take?",
    a: "Timelines vary by scope. A product mockup set takes 2–4 days. Social media creatives take 1–3 days. A landing page or conversion website takes 7–14 days. A full web application or packaging system takes 2–4 weeks. We provide a clear delivery schedule after the initial consultation call.",
  },
  {
    q: "What makes you different from other design agencies?",
    a: "We operate as a focused creative-tech studio — not a large agency with layers of account managers. You work directly with the person building your product. We combine design taste with engineering precision, meaning your visuals are not just beautiful but also conversion-optimized and production-ready.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We work with brands across India, the Middle East, Europe, and the US. All communication is via WhatsApp, email, or Google Meet. We use Calendly for easy scheduling across time zones.",
  },
  {
    q: "How do I get started with a project?",
    a: "The easiest way is to book a free 30-minute growth assessment call via our Calendly link, or simply send us a message on WhatsApp. We'll review your current brand assets, discuss your goals, and send a proposal within 24 hours.",
  },
  {
    q: "What is your pricing model?",
    a: "We offer project-based pricing, not monthly retainers. You pay for exactly what you need. Pricing depends on the service, complexity, and deliverable count. We share a transparent quote after the initial briefing — no hidden fees, no surprise invoices.",
  },
  {
    q: "Can you help with Amazon listing design and A+ content?",
    a: "Absolutely. Amazon A+ content and marketplace graphic design is one of our strongest service areas. We create product infographics, hero images, comparison charts, lifestyle mockups, and full A+ content modules that are optimized for conversion on Amazon, Flipkart, and Meesho.",
  },
  {
    q: "Do you offer revisions?",
    a: "Yes. Every project includes revision rounds — typically 2 to 3 revision cycles depending on the package. We believe in delivering until you're satisfied. Major structural changes beyond agreed scope are scoped separately.",
  },
  {
    q: "Can I see your previous work before hiring?",
    a: "Yes — our full portfolio is available on the Portfolio page with real project samples across mockups, social media, packaging, web apps, and more. You can also request specific category samples via WhatsApp before committing.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, bank transfer (NEFT/IMPS), and international payments via PayPal or Wise for overseas clients. We typically work on a 50% advance, 50% on delivery model for new clients.",
  },
];

function FAQRow({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div
        style={{
          borderRadius: "14px",
          border: `1px solid ${open ? "rgba(14,165,233,0.3)" : "var(--border-color)"}`,
          background: open ? "rgba(14,165,233,0.05)" : "var(--card-color)",
          backdropFilter: "blur(16px)",
          overflow: "hidden",
          transition: "border-color 0.25s ease, background 0.25s ease",
          boxShadow: open ? "0 0 28px rgba(14,165,233,0.08)" : "0 4px 20px rgba(0,0,0,0.03)",
        }}
      >
        {/* Question row */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            padding: "20px 24px",
            cursor: "pointer",
            background: "none",
            border: "none",
            fontFamily: "inherit",
            textAlign: "left",
          }}
          aria-expanded={open}
        >
          <span
            style={{
              fontSize: "clamp(13px, 2vw, 15px)",
              fontWeight: 700,
              color: open ? "#0ea5e9" : "var(--text-color)",
              lineHeight: 1.4,
              transition: "color 0.2s ease",
            }}
          >
            {item.q}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{
              flexShrink: 0,
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: open
                ? "rgba(14,165,233,0.15)"
                : "color-mix(in srgb, var(--text-color) 5%, transparent)",
              border: `1px solid ${open ? "rgba(14,165,233,0.3)" : "var(--border-color)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.25s ease, border-color 0.25s ease",
            }}
          >
            <ChevronDown
              size={14}
              color={open ? "#0ea5e9" : "rgba(148,163,184,0.6)"}
            />
          </motion.div>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  padding: "0 24px 20px",
                  borderTop: "1px solid rgba(14,165,233,0.1)",
                  paddingTop: "16px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    lineHeight: "1.8",
                    color: "var(--text-muted)",
                  }}
                >
                  {item.a}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQSection({ faqs = HOME_FAQS }: { faqs?: FAQItem[] }) {
  return (
    <section
      style={{
        position: "relative",
        paddingBlock: "clamp(4rem, 8vw, 8rem)",
        borderTop: "1px solid var(--border-color)",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background:
            "radial-gradient(ellipse, rgba(14,165,233,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
      />

      <div className="section-shell" style={{ position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ textAlign: "center", marginBottom: "clamp(32px, 5vw, 56px)" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: "rgba(14,165,233,0.1)",
              border: "1px solid rgba(14,165,233,0.2)",
              borderRadius: "999px",
              padding: "6px 16px",
              marginBottom: "18px",
            }}
          >
            <HelpCircle size={12} color="#0ea5e9" />
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#0ea5e9",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Frequently Asked Questions
            </span>
          </div>

          <h2
            style={{
              margin: "0 0 14px",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              color: "var(--text-color)",
            }}
          >
            Got questions?{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              We've got answers.
            </span>
          </h2>
          <p
            style={{
              margin: "0 auto",
              maxWidth: "520px",
              fontSize: "14px",
              lineHeight: "1.7",
              color: "var(--text-muted)",
            }}
          >
            Everything you need to know about working with EcomXpertStudio.
            Can't find your answer?{" "}
            <a
              href={`https://wa.me/919548174325?text=Hi, I have a question about EcomXpertStudio services.`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}
            >
              Ask on WhatsApp →
            </a>
          </p>
        </motion.div>

        {/* Two-column FAQ grid on large screens */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "12px",
            alignItems: "start",
          }}
        >
          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqs
              .filter((_, i) => i % 2 === 0)
              .map((item, i) => (
                <FAQRow key={item.q} item={item} index={i * 2} />
              ))}
          </div>
          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqs
              .filter((_, i) => i % 2 !== 0)
              .map((item, i) => (
                <FAQRow key={item.q} item={item} index={i * 2 + 1} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
