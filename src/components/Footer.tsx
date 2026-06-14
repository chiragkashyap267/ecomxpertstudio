"use client";

import { CinematicFooter } from "@/components/ui/motion-footer";
import { contact, socialLinks } from "@/data/site";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const capabilities = [
  "Next.js app experiences",
  "Custom web applications",
  "AI chatbot interfaces",
  "Premium packaging design",
  "Amazon A+ content",
  "Motion brand assets",
];

export default function Footer() {
  return (
    <CinematicFooter
      brand="EcomXpertStudio"
      eyebrow="Digital Growth Experts"
      description="Premium creative-tech partner for websites, apps, graphic systems, packaging, A+ content, mockups, and cinematic digital assets."
      navigation={footerLinks}
      capabilities={capabilities}
      contact={contact}
      socialLinks={socialLinks}
    />
  );
}
