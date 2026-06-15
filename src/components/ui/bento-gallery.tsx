"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

// ─── Types ────────────────────────────────────────────
export type GalleryImage = {
  src: string;
  alt: string;
  title?: string;
  category?: string;
};

interface BentoGalleryProps {
  images: GalleryImage[];
  speed?: number; // px/second
}

// ─── Helper: repeat array until min length ────────────
function ensureMinLength(arr: GalleryImage[], min: number): GalleryImage[] {
  if (!arr || arr.length === 0) return [];
  if (arr.length >= min) return arr;
  const result: GalleryImage[] = [];
  while (result.length < min) {
    for (const item of arr) {
      result.push(item);
      if (result.length >= min) break;
    }
  }
  return result;
}

// ─── Modal ────────────────────────────────────────────
const ImageModal = ({
  image,
  onClose,
}: {
  image: GalleryImage;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[999] flex items-center justify-center"
        onClick={onClose}
        style={{ background: "rgba(2,6,23,0.92)", backdropFilter: "blur(18px)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(14,165,233,0.08) 0%, transparent 70%)",
          }}
        />

        <motion.div
          key="modal-card"
          initial={{ scale: 0.88, y: 28, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.88, y: 28, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          className="relative w-full max-w-5xl mx-4 rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          style={{
            border: "1px solid rgba(14,165,233,0.18)",
            background: "rgba(10,18,38,0.95)",
          }}
        >
          <div className="relative w-full">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full object-contain"
              style={{ maxHeight: "75vh", display: "block", margin: "0 auto" }}
            />
          </div>

          {(image.title || image.category) && (
            <div
              className="px-6 py-4 flex items-center gap-4"
              style={{ borderTop: "1px solid rgba(14,165,233,0.12)" }}
            >
              {image.category && (
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(14,165,233,0.12)",
                    color: "#0ea5e9",
                    border: "1px solid rgba(14,165,233,0.25)",
                  }}
                >
                  {image.category}
                </span>
              )}
              {image.title && (
                <span className="text-sm font-semibold text-white/80">
                  {image.title}
                </span>
              )}
            </div>
          )}

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full transition-all"
            style={{
              background: "rgba(14,165,233,0.12)",
              border: "1px solid rgba(14,165,233,0.25)",
              color: "#fff",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(14,165,233,0.28)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(14,165,233,0.12)";
            }}
          >
            <X size={18} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Gallery Card ─────────────────────────────────────
const GalleryCard = ({
  image,
  onClick,
  height = 252,
}: {
  image: GalleryImage;
  onClick: () => void;
  height?: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer"
      style={{
        width: Math.round(height * 0.72),
        height,
        border: "1px solid rgba(14,165,233,0.12)",
        boxShadow: hovered
          ? "0 0 0 1px rgba(14,165,233,0.35), 0 20px 50px rgba(0,0,0,0.5)"
          : "0 4px 24px rgba(0,0,0,0.3)",
        transition: "box-shadow 0.3s ease",
      }}
      whileHover={{ scale: 1.04, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={image.src}
        alt={image.alt}
        draggable={false}
        className="w-full h-full object-cover"
        style={{
          transition: "transform 0.7s ease",
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(2,6,23,0.88) 0%, rgba(2,6,23,0.3) 55%, transparent 100%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Cyber shimmer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(14,165,233,0.08) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Caption */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4"
        style={{
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          opacity: hovered ? 1 : 0,
          transition: "all 0.4s ease",
        }}
      >
        {image.category && (
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 inline-block"
            style={{
              background: "rgba(14,165,233,0.18)",
              color: "#0ea5e9",
              border: "1px solid rgba(14,165,233,0.3)",
            }}
          >
            {image.category}
          </span>
        )}
        {image.title && (
          <p className="text-sm font-bold text-white leading-tight mt-1">
            {image.title}
          </p>
        )}
      </div>

      {/* Zoom icon */}
      <div
        className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full"
        style={{
          background: "rgba(14,165,233,0.18)",
          border: "1px solid rgba(14,165,233,0.35)",
          color: "#0ea5e9",
          backdropFilter: "blur(8px)",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1) rotate(0deg)" : "scale(0.7) rotate(-15deg)",
          transition: "all 0.3s ease",
        }}
      >
        <ZoomIn size={14} />
      </div>
    </motion.div>
  );
};

// ─── Scrolling Row ────────────────────────────────────
const ScrollingRow = ({
  images,
  speed,
  direction,
  height,
  onImageClick,
}: {
  images: GalleryImage[];
  speed: number;
  direction: "left" | "right";
  height: number;
  onImageClick: (img: GalleryImage) => void;
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const posRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Safe quadruple: always at least 1 item, spread 4x for seamless loop
  const looped = images.length > 0
    ? [...images, ...images, ...images, ...images]
    : [];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || looped.length === 0) return;

    if (direction === "right") {
      const singleWidth = track.scrollWidth / 4;
      posRef.current = -singleWidth;
      track.style.transform = `translateX(${posRef.current}px)`;
    }

    const tick = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const delta = Math.min(time - lastTimeRef.current, 50); // cap delta to avoid jumps
      lastTimeRef.current = time;

      if (!pausedRef.current && track) {
        const dir = direction === "left" ? -1 : 1;
        posRef.current += (speed * dir * delta) / 1000;

        const singleWidth = track.scrollWidth / 4;
        if (singleWidth > 0) {
          if (direction === "left" && posRef.current <= -singleWidth) {
            posRef.current += singleWidth;
          } else if (direction === "right" && posRef.current >= 0) {
            posRef.current -= singleWidth;
          }
        }

        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [speed, direction, images.length]);

  if (looped.length === 0) return null;

  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ height }}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div
        ref={trackRef}
        className="flex gap-4 absolute top-0 left-0"
        style={{ willChange: "transform" }}
      >
        {looped.map((img, i) => (
          <GalleryCard
            key={`${i}-${img.src}`}
            image={img}
            onClick={() => onImageClick(img)}
            height={height - 8}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────
const BentoGallery: React.FC<BentoGalleryProps> = ({
  images,
  speed = 60,
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const handleImageClick = useCallback((img: GalleryImage) => {
    setSelectedImage(img);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // Guard: don't render until images are available
  const safeImages = Array.isArray(images) ? images.filter(Boolean) : [];
  if (safeImages.length === 0) return null;

  // Ensure each row has at least 5 images for smooth looping
  const mid = Math.ceil(safeImages.length / 2);
  const rawRow1 = safeImages.slice(0, mid);
  const rawRow2 = safeImages.slice(mid);

  const row1 = ensureMinLength(rawRow1.length > 0 ? rawRow1 : safeImages, 5);
  const row2 = ensureMinLength(rawRow2.length > 0 ? rawRow2 : safeImages, 5);

  return (
    <div className="relative w-full space-y-4 py-2">
      {/* Row 1 — scrolls left */}
      <ScrollingRow
        images={row1}
        speed={speed}
        direction="left"
        height={260}
        onImageClick={handleImageClick}
      />

      {/* Row 2 — scrolls right */}
      <ScrollingRow
        images={row2}
        speed={speed * 0.85}
        direction="right"
        height={220}
        onImageClick={handleImageClick}
      />

      {/* Modal */}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={handleClose} />
      )}
    </div>
  );
};

export default BentoGallery;
