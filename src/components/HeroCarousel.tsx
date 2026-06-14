"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { contact, serviceSlides } from "@/data/site";

/* ─── 30 portfolio images (Cloudinary + Unsplash fill) ─────────── */
const ALL_IMAGES = [
  { img: "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763814816/portfolio/mockups/buespofuusbrkpxzh2uj.jpg", label: "Mockup Design",     tag: "3D Visual",         glow: "rgba(14,165,233,0.7)" },
  { img: "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763883539/portfolio/social/wrpohsm3xi7iefki3sri.jpg",  label: "Social Creative",   tag: "Campaign",          glow: "rgba(109,40,217,0.6)" },
  { img: "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763994137/portfolio/packaging/ycjo5rjjp73b02lbyglp.jpg",label: "Packaging Design", tag: "Brand Identity",    glow: "rgba(56,189,248,0.65)" },
  { img: "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763814430/portfolio/mockups/buzdocutvne0jsumjqiu.jpg",  label: "Product Mockup",   tag: "Ecom Asset",        glow: "rgba(99,102,241,0.6)" },
  { img: "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763994140/portfolio/packaging/tothmcxuoeortk1sozoy.jpg",label: "Packaging",        tag: "Shelf Ready",       glow: "rgba(6,182,212,0.65)" },
  { img: "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763814414/portfolio/mockups/ksz5rb71hdyrdzw2dawt.jpg",  label: "Studio Mockup",   tag: "Premium Visual",    glow: "rgba(14,165,233,0.7)" },
  { img: "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763814477/portfolio/mockups/mvdvvmiz2m2skpuhmyav.jpg",  label: "Hero Mockup",     tag: "Launch Asset",      glow: "rgba(56,189,248,0.6)" },
  { img: "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763814510/portfolio/mockups/waydneutob2nrbrg4hwt.jpg",  label: "Feature Mockup",  tag: "Product Shot",      glow: "rgba(99,102,241,0.65)" },
  { img: "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763814804/portfolio/mockups/qyclwzwu2igjrrq6qs7o.jpg",  label: "Lifestyle Mock",  tag: "A+ Content",        glow: "rgba(14,165,233,0.6)" },
  { img: "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763883545/portfolio/social/irjfdmntzsqclmvl75g2.jpg",   label: "Social Post",     tag: "Campaign",          glow: "rgba(109,40,217,0.65)" },
  { img: "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763883550/portfolio/social/yxdm1bc45atuyztdalk1.jpg",   label: "Social Banner",   tag: "Ad Creative",       glow: "rgba(56,189,248,0.6)" },
  { img: "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763994142/portfolio/packaging/f88tsiklcgxztfa13hg2.jpg", label: "Label Design",    tag: "Brand System",      glow: "rgba(6,182,212,0.7)" },
  // Unsplash fill images (premium ecom / brand / design themed)
  { img: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=600&q=80", label: "Beauty Mockup",    tag: "Product Visual",  glow: "rgba(236,72,153,0.6)" },
  { img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80", label: "Cosmetic Design",  tag: "Brand Identity",  glow: "rgba(14,165,233,0.65)" },
  { img: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80", label: "Packaging Art",    tag: "Shelf Ready",     glow: "rgba(99,102,241,0.6)" },
  { img: "https://images.unsplash.com/photo-1635070040609-de8e3b0f1a8f?w=600&q=80", label: "UI Dashboard",     tag: "Web App",         glow: "rgba(56,189,248,0.65)" },
  { img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80", label: "Brand System",     tag: "Identity",        glow: "rgba(109,40,217,0.6)" },
  { img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80", label: "Product Launch",   tag: "Ecom Asset",      glow: "rgba(14,165,233,0.7)" },
  { img: "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=600&q=80", label: "Lifestyle Shot",  tag: "Campaign",        glow: "rgba(6,182,212,0.65)" },
  { img: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=600&q=80", label: "Skincare Brand",  tag: "Premium Visual",  glow: "rgba(236,72,153,0.6)" },
  { img: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?w=600&q=80", label: "Motion Reel",     tag: "Video Edit",      glow: "rgba(99,102,241,0.65)" },
  { img: "https://images.unsplash.com/photo-1600267185393-1b14dbc9a98d?w=600&q=80", label: "Ad Creative",     tag: "Social Ad",       glow: "rgba(56,189,248,0.6)" },
  { img: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=600&q=80", label: "A+ Content",      tag: "Amazon Listing",  glow: "rgba(14,165,233,0.7)" },
  { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", label: "Infographic",     tag: "Brand Info",      glow: "rgba(109,40,217,0.6)" },
  { img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80", label: "Product Reel",    tag: "Promo Video",     glow: "rgba(6,182,212,0.65)" },
  { img: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&q=80", label: "Fashion Shoot",   tag: "Campaign",        glow: "rgba(236,72,153,0.6)" },
  { img: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&q=80", label: "Label Art",       tag: "Packaging",       glow: "rgba(99,102,241,0.65)" },
  { img: "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=600&q=80", label: "Web Launch",      tag: "Next.js",         glow: "rgba(56,189,248,0.7)" },
  { img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80", label: "Social Story",    tag: "Instagram",       glow: "rgba(14,165,233,0.65)" },
  { img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80", label: "Luxury Pack",     tag: "Premium Brand",   glow: "rgba(109,40,217,0.7)" },
];

/* ─── Fan spread geometry ──────────────────────────────────────── */
const VISIBLE = 7; // how many cards visible at once in the fan
const HALF = Math.floor(VISIBLE / 2); // 3 cards each side of center

function getFanTransform(slotOffset: number) {
  // slotOffset: -3 .. 0 .. +3
  const abs = Math.abs(slotOffset);
  const sign = slotOffset < 0 ? -1 : slotOffset > 0 ? 1 : 0;

  const rotateZ  = slotOffset * 13;           // degrees rotation
  const x        = slotOffset * 135;          // horizontal spread
  const y        = abs * abs * 9;             // arc upward from center
  const scale    = abs === 0 ? 1.16 : abs === 1 ? 0.83 : abs === 2 ? 0.69 : 0.57;
  const opacity  = abs === 0 ? 1 : abs === 1 ? 0.9 : abs === 2 ? 0.7 : abs === 3 ? 0.45 : 0;
  const zIndex   = VISIBLE - abs;

  return { rotateZ, x, y, scale, opacity, zIndex };
}

export default function HeroCarousel() {
  const [center, setCenter] = useState(2);
  const [isPaused, setIsPaused] = useState(false);
  const total = ALL_IMAGES.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setCenter((p) => (p + 1) % total);
  }, [total]);

  useEffect(() => {
    if (!isPaused) timerRef.current = setInterval(advance, 2600);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, advance]);

  /* Compute the 7 visible slot indices wrapped around the array */
  const slots = Array.from({ length: VISIBLE }, (_, i) => {
    const offset = i - HALF; // -3 .. +3
    const imgIdx = ((center + offset) % total + total) % total;
    return { offset, imgIdx };
  });

  const activeCard = ALL_IMAGES[center];

  return (
    <div className="hero-fan-root">

      {/* ── Centered heading ── */}
      <div className="hero-fan-heading-wrap">
        <div className="hero-fan-pill">
          <Sparkles className="w-3.5 h-3.5" />
          <span>EcomXpertStudio</span>
          <span className="hero-fan-pill-dot" />
          <span style={{ color: "rgba(148,163,184,0.85)", fontWeight: 600 }}>Premium Digital Partner</span>
        </div>

        <h1 className="hero-fan-h1">
          Premium Digital<br />
          <span className="hero-fan-h1-accent">Portfolio</span>
          {" "}Collection
        </h1>

        <p className="hero-fan-sub">
          World-class mockups, packaging, social creatives, web apps &amp; motion assets —<br className="hidden sm:block" />
          crafted for brands that demand the best.
        </p>

        {/* CTA row */}
        <div className="hero-fan-cta-row">
          <a
            href={contact.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-fan-btn-primary"
            id="hero-book-meeting"
          >
            Book a Meeting <ArrowUpRight className="w-4 h-4" />
          </a>
          <Link href="/portfolio" className="hero-fan-btn-ghost" id="hero-view-portfolio">
            View Portfolio <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── Fan stage ── */}
      <div
        className="hero-fan-stage"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Radial floor glow */}
        <div className="hero-fan-floor-glow" />

        {slots.map(({ offset, imgIdx }) => {
          const card = ALL_IMAGES[imgIdx];
          const { rotateZ, x, y, scale, opacity, zIndex } = getFanTransform(offset);
          const isCenter = offset === 0;

          return (
            <motion.div
              key={imgIdx}
              className="hero-fan-card"
              animate={{ rotateZ, x, y, scale, opacity }}
              transition={{ type: "spring", stiffness: 240, damping: 26, mass: 0.85 }}
              style={{ zIndex }}
              onClick={() => setCenter(imgIdx)}
              whileHover={!isCenter ? { scale: scale * 1.07, opacity: Math.min(opacity + 0.15, 1) } : {}}
            >
              <img src={card.img} alt={card.label} className="hero-fan-card-img" draggable={false} />

              {/* Dark gradient overlay at bottom */}
              <div className="hero-fan-card-overlay" />

              {/* Center card badge (top) */}
              <AnimatePresence>
                {isCenter && (
                  <motion.div
                    className="hero-fan-card-badge"
                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <div className="hero-fan-card-badge-avatar">
                      <Star className="w-3 h-3 fill-current text-amber-300" />
                    </div>
                    <div>
                      <div style={{ fontSize: "9px", opacity: 0.65, letterSpacing: "0.06em", textTransform: "uppercase" }}>Featured</div>
                      <div style={{ fontSize: "11px", fontWeight: 800 }}>{card.tag}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom label */}
              <div className="hero-fan-card-bottom">
                <div className="hero-fan-card-label">{card.label}</div>
                <AnimatePresence>
                  {isCenter && (
                    <motion.div
                      className="hero-fan-card-more"
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                    >
                      MORE →
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Glowing border on center */}
              <AnimatePresence>
                {isCenter && (
                  <motion.div
                    className="hero-fan-card-glow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ "--card-glow": card.glow } as React.CSSProperties}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* ── Navigation dots ── */}
      <div className="hero-fan-nav">
        <button
          className="hero-fan-nav-arrow"
          onClick={() => setCenter((p) => (p - 1 + total) % total)}
          aria-label="Previous"
        >
          ‹
        </button>
        <div className="hero-fan-dots">
          {ALL_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCenter(i)}
              className={`hero-fan-dot ${i === center ? "hero-fan-dot-active" : ""}`}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
        <button
          className="hero-fan-nav-arrow"
          onClick={() => setCenter((p) => (p + 1) % total)}
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  );
}
