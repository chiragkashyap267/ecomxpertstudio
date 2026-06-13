"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X, Rocket } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-blue-100 dark:border-white/10 bg-white/80 dark:bg-cyber-bg/80 backdrop-blur-md shadow-sm dark:shadow-none"
          : "bg-transparent"
      }`}
    >
      <nav className="section-shell flex h-20 items-center justify-between">
        {/* Brand */}
        <Link href="/" className="group relative z-50 flex items-center gap-2">
          <span className="font-display text-2xl font-black tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-blue-700 dark:group-hover:text-cyber-cyan">
            Xpert
          </span>
          <span className="absolute -bottom-1 -right-2 h-2 w-2 rounded-full bg-blue-500 dark:bg-cyber-cyan" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden flex-1 items-center justify-center md:flex">
          <div className="flex h-11 items-center gap-1 rounded-full border border-blue-100 dark:border-white/10 bg-white dark:bg-white/[0.03] px-3 shadow-sm dark:shadow-none">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-blue-700 dark:text-white"
                      : "text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 z-[-1] rounded-full bg-blue-50 dark:bg-white/[0.06]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                pathname === "/contact"
                  ? "text-blue-700 dark:text-white"
                  : "text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {pathname === "/contact" && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 z-[-1] rounded-full bg-blue-50 dark:bg-white/[0.06]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              Contact
            </Link>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 dark:border-white/10 bg-white dark:bg-white/[0.03] text-slate-500 dark:text-white/60 shadow-sm dark:shadow-none transition-colors hover:border-blue-300 dark:hover:border-cyber-cyan/45 hover:text-blue-600 dark:hover:text-cyber-cyan"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-4.5 w-4.5 transition-transform group-hover:rotate-45" />
            ) : (
              <Moon className="h-4.5 w-4.5 transition-transform group-hover:-rotate-12" />
            )}
          </button>

          <Link
            href="/contact"
            className="hidden h-10 items-center justify-center gap-2 rounded-full border border-blue-200 dark:border-cyber-cyan/30 bg-blue-50 dark:bg-cyber-cyan/10 px-5 text-sm font-bold text-blue-700 dark:text-cyber-cyan transition-colors hover:bg-blue-100 dark:hover:bg-cyber-cyan/20 md:flex"
          >
            Book Call
            <Rocket className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 dark:border-white/10 bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white shadow-sm dark:shadow-none md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full border-b border-blue-100 dark:border-white/10 bg-white dark:bg-cyber-bg px-4 py-4 shadow-lg md:hidden"
          >
            <div className="flex flex-col gap-2 rounded-xl border border-blue-100 dark:border-white/10 bg-blue-50/50 dark:bg-white/[0.02] p-2">
              {[...navLinks, { name: "Contact", href: "/contact" }].map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-md px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-blue-100 dark:bg-cyber-cyan/10 text-blue-700 dark:text-cyber-cyan"
                        : "text-slate-700 dark:text-white/70 hover:bg-blue-50 dark:hover:bg-white/[0.04] hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {link.name}
                    {isActive && <div className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-cyber-cyan" />}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
