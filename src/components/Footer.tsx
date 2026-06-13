"use client";

import Link from "next/link";
import { ArrowUpRight, Calendar, Mail, MapPin, Phone } from "lucide-react";
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
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-blue-100 dark:border-white/10 bg-white dark:bg-cyber-darker/80">
      <div className="section-shell py-14 sm:py-18">
        <div className="grid gap-10 md:grid-cols-[1.25fr_0.8fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex flex-col">
              <span className="font-display text-xl font-black text-slate-900 dark:text-white">
                Ecom<span className="text-blue-600 dark:text-cyber-cyan">Expert</span>Studio
              </span>
              <span className="mt-1 text-[10px] font-semibold uppercase text-slate-400 dark:text-white/40">
                Digital Growth Experts
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600 dark:text-white/60">
              Premium creative-tech partner for websites, apps, graphic systems, packaging, A+ content, mockups, and cinematic digital assets.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 dark:border-white/10 bg-blue-50 dark:bg-white/[0.035] text-slate-600 dark:text-white/60 transition-all hover:border-blue-400 dark:hover:border-cyber-cyan/45 hover:text-blue-600 dark:hover:text-cyber-cyan"
                  aria-label={label}
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Agency links */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Agency</h3>
            <ul className="mt-5 grid gap-3">
              {footerLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-white/60 transition-colors hover:text-blue-600 dark:hover:text-cyber-cyan"
                  >
                    {item.name}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Capabilities</h3>
            <ul className="mt-5 grid gap-3">
              {capabilities.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-cyber-cyan/70" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Get In Touch</h3>
            <ul className="mt-5 grid gap-4 text-sm text-slate-600 dark:text-white/60">
              <li className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 shrink-0 text-blue-500 dark:text-cyber-cyan" />
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-blue-600 dark:hover:text-cyber-cyan">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 shrink-0 text-blue-500 dark:text-cyber-cyan" />
                <a href={`tel:+91${contact.phone}`} className="transition-colors hover:text-blue-600 dark:hover:text-cyber-cyan">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-blue-500 dark:text-cyber-cyan" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Calendar className="h-4.5 w-4.5 shrink-0 text-blue-500 dark:text-cyber-cyan" />
                <a href={contact.calendlyUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600 dark:hover:text-cyber-cyan">
                  Book a Calendly call
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-blue-100 dark:border-white/10 pt-6 text-xs text-slate-400 dark:text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} EcomXpertStudio. Built for modern high-growth brands.</p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-blue-600 dark:hover:text-cyber-cyan">Privacy</a>
            <a href="#" className="transition-colors hover:text-blue-600 dark:hover:text-cyber-cyan">Terms</a>
            <span className="text-blue-500 dark:text-cyber-cyan/70">System Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
