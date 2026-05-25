"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Twitter className="h-4.5 w-4.5" />, href: "https://twitter.com", name: "Twitter" },
    { icon: <Linkedin className="h-4.5 w-4.5" />, href: "https://linkedin.com", name: "LinkedIn" },
    { icon: <Instagram className="h-4.5 w-4.5" />, href: "https://instagram.com", name: "Instagram" },
    { icon: <Github className="h-4.5 w-4.5" />, href: "https://github.com", name: "GitHub" },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-[#03050c] pt-20 pb-10">
      {/* Decorative Cyan Gradient Overlay */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent" />
      <div className="absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-cyber-cyan/2 blur-[100px] pointer-events-none" />

      <div className="mx-auto w-[90%] max-w-7xl px-4">
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="group flex flex-col focus:outline-none">
              <span className="font-display text-xl font-black tracking-widest text-white">
                ECOM<span className="text-cyber-cyan">XPERT</span>STUDIO
              </span>
              <span className="text-[9px] font-bold tracking-widest text-white/40 uppercase">
                Digital Growth Experts
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/50 max-w-sm">
              We design and construct modern digital websites, apps, graphics, and visual products that help brands scale dynamically in the Web3 era.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3.5 pt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, borderColor: "#00f0ff", color: "#00f0ff" }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/3 text-white/60 transition-all hover:shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-6">
            <h3 className="font-display text-sm font-bold tracking-wider text-white uppercase border-l-2 border-cyber-cyan pl-3">
              Agency Hub
            </h3>
            <ul className="space-y-3.5">
              {[
                { name: "Home Portfolio", href: "/" },
                { name: "Our Services", href: "/services" },
                { name: "Case Studies", href: "/portfolio" },
                { name: "About Studio", href: "/about" },
                { name: "Contact Team", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex items-center text-sm text-white/50 transition-colors hover:text-cyber-cyan"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialized Solutions */}
          <div className="space-y-6">
            <h3 className="font-display text-sm font-bold tracking-wider text-white uppercase border-l-2 border-cyber-cyan pl-3">
              Capabilities
            </h3>
            <ul className="space-y-3.5">
              {[
                "Next.js App Router Solutions",
                "Full-stack Web Design",
                "Custom Mobile & Chatbot Apps",
                "Amazon A+ Brand Content",
                "Product Mockups & Packages",
                "Cinematic Promo Video Reels",
              ].map((service) => (
                <li key={service} className="text-sm text-white/50">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Coordinates */}
          <div className="space-y-6">
            <h3 className="font-display text-sm font-bold tracking-wider text-white uppercase border-l-2 border-cyber-cyan pl-3">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-sm text-white/60">
                <Mail className="h-4.5 w-4.5 text-cyber-cyan/80 shrink-0" />
                <a href="mailto:hello@ecomxpertstudio.com" className="hover:text-cyber-cyan transition-colors truncate">
                  hello@ecomxpertstudio.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm text-white/60">
                <Phone className="h-4.5 w-4.5 text-cyber-cyan/80 shrink-0" />
                <a href="tel:+1234567890" className="hover:text-cyber-cyan transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start space-x-3 text-sm text-white/60">
                <MapPin className="h-4.5 w-4.5 text-cyber-cyan/80 shrink-0 mt-0.5" />
                <span>San Francisco, CA<br />Digital Studio Node</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Divider */}
        <div className="mt-16 border-t border-white/5 pt-8 text-center sm:flex sm:items-center sm:justify-between">
          <p className="text-xs text-white/30 tracking-wide">
            &copy; {currentYear} EcomXpertStudio. Built with world-class frameworks & design aesthetics.
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-xs text-white/30 sm:mt-0">
            <a href="#" className="hover:text-cyber-cyan transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyber-cyan transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cyber-cyan transition-colors">System Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
