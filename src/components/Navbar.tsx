"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 z-40 w-[92%] max-w-7xl -translate-x-1/2 transition-all duration-500 ${
          isScrolled 
            ? "top-2 w-[95%] sm:w-[92%]" 
            : "top-4"
        }`}
      >
        <div className="glass-panel relative rounded-2xl border border-white/5 bg-cyber-dark/45 px-5 py-3.5 shadow-2xl backdrop-blur-xl sm:px-8">
          {/* Neon cyan horizontal gradient line below the navbar */}
          <div className="absolute bottom-0 left-1/10 right-1/10 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/35 to-transparent" />

          <nav className="flex items-center justify-between">
            {/* BRAND LOGO */}
            <Link href="/" className="group flex flex-col focus:outline-none">
              <span className="font-display text-lg font-black tracking-widest text-white sm:text-xl">
                ECOM<span className="text-cyber-cyan transition-all duration-300 group-hover:text-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]">XPERT</span>STUDIO
              </span>
              <span className="text-[8px] font-bold tracking-widest text-white/40 uppercase group-hover:text-cyber-cyan/50 transition-colors">
                Digital Growth Experts
              </span>
            </Link>

            {/* DESKTOP NAV LINKS */}
            <ul className="hidden items-center space-x-1 md:flex">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`relative px-4 py-1.5 font-display text-sm font-semibold tracking-wider transition-colors duration-300 focus:outline-none ${
                        isActive ? "text-cyber-cyan" : "text-white/70 hover:text-white"
                      }`}
                    >
                      {link.name}
                      {/* Active underline indicator */}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavTab"
                          className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-cyber-blue to-cyber-cyan shadow-[0_0_8px_#00f0ff]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CALL TO ACTION BUTTON */}
            <div className="hidden items-center space-x-4 md:flex">
              <Link href="/contact" className="focus:outline-none">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group flex items-center space-x-1.5 rounded-xl border border-cyber-cyan/30 bg-cyber-cyan/5 px-4.5 py-2 font-display text-xs font-bold tracking-widest text-cyber-cyan uppercase shadow-[0_0_15px_rgba(0,240,255,0.05)] transition-all hover:border-cyber-cyan hover:bg-cyber-cyan/15 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                >
                  <span>Book a Meeting</span>
                  <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.button>
              </Link>
            </div>

            {/* MOBILE HAMBURGER TOGGLE */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/3 text-white transition-colors hover:bg-white/7 md:hidden focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-5 w-5 text-cyber-cyan" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>
        </div>
      </header>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-24 z-30 mx-auto w-[92%] rounded-2xl border border-white/5 bg-[#040813]/95 p-6 shadow-3xl backdrop-blur-2xl md:hidden"
          >
            {/* Micro Cyber grid pattern inside drawer */}
            <div className="cyber-grid absolute inset-0 opacity-40 rounded-2xl" />

            <ul className="relative z-10 flex flex-col space-y-4">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`block px-2 py-1.5 font-display text-base font-bold tracking-wide transition-colors ${
                        isActive ? "text-cyber-cyan" : "text-white/60 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{link.name}</span>
                        {isActive && <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-[0_0_8px_#00f0ff]" />}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="relative z-10 mt-6 border-t border-white/5 pt-6">
              <Link href="/contact" className="block focus:outline-none">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan py-3.5 font-display text-sm font-black tracking-widest text-white uppercase shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  <span>Book a Call</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
