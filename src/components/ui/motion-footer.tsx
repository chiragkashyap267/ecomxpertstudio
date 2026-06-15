"use client";

import type { ComponentType, SVGProps } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Calendar, Mail, MapPin, Phone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./motion-footer.module.css";

type FooterLink = {
  name: string;
  href: string;
};

type FooterContact = {
  email: string;
  phone: string;
  phoneDisplay: string;
  address: string;
  calendlyUrl: string;
};

type SocialLink = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href: string;
  label: string;
};

type CinematicFooterProps = {
  brand: string;
  eyebrow: string;
  description: string;
  navigation: FooterLink[];
  capabilities: string[];
  contact: FooterContact;
  socialLinks: SocialLink[];
};

function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * 0.22,
        y: y * 0.22,
        rotationX: -y * 0.08,
        rotationY: x * 0.08,
        scale: 1.035,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const reset = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.45)",
        overwrite: "auto",
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", reset);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", reset);
      gsap.killTweensOf(element);
    };
  }, []);

  return ref;
}

function MagneticLink({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useMagnetic<HTMLAnchorElement>();

  return (
    <Link ref={ref} href={href} className={`${styles.glassPill} ${styles.linkPill}`}>
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
    </Link>
  );
}

function Marquee({ capabilities }: { capabilities: string[] }) {
  const items = [...capabilities, ...capabilities];

  return (
    <div className={styles.marqueeTrack} aria-hidden="true">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center gap-7 px-3">
          <span>{item}</span>
          <span className="text-blue-500 dark:text-cyber-cyan">+</span>
        </span>
      ))}
    </div>
  );
}

export function CinematicFooter({
  brand,
  eyebrow,
  description,
  navigation,
  capabilities,
  contact,
  socialLinks,
}: CinematicFooterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    if (!wrapper || !content || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        content.children,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 90%",
            end: "top 50%",
            scrub: 0.5,
          },
        },
      );
    }, wrapper);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div ref={wrapperRef} className={styles.revealWindow}>
      <footer className={styles.footer}>
        <div className={styles.aurora} />
        <div className={styles.grid} />
        <div ref={giantTextRef} className={styles.giantText} aria-hidden="true">
          ECOMXPERT
        </div>

        <div className={styles.marquee}>
          <Marquee capabilities={capabilities} />
        </div>

        <div ref={contentRef} className={`${styles.content} section-shell`}>
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-blue-600 dark:text-cyber-cyan sm:text-xs">
              {eyebrow}
            </p>
            <h2 className={`${styles.metallicText} mt-3 font-display text-5xl font-black tracking-[-0.07em] sm:text-7xl lg:text-8xl`}>
              {brand}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-white/55 sm:text-base sm:leading-7">
              {description}
            </p>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <section className={`${styles.glassPanel} lg:col-span-1`}>
              <h3 className={styles.panelTitle}>Agency</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {navigation.map((item) => (
                  <MagneticLink key={item.name} href={item.href}>
                    {item.name}
                  </MagneticLink>
                ))}
              </div>
            </section>

            <section className={`${styles.glassPanel} lg:col-span-1`}>
              <h3 className={styles.panelTitle}>Capabilities</h3>
              <ul className="mt-4 grid gap-2.5">
                {capabilities.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-600 dark:text-white/55 sm:text-sm">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(14,165,233,0.65)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className={`${styles.glassPanel} sm:col-span-2 lg:col-span-2`}>
              <h3 className={styles.panelTitle}>Get In Touch</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <a className={styles.contactLink} href={`mailto:${contact.email}`}>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span className="truncate">{contact.email}</span>
                </a>
                <a className={styles.contactLink} href={`tel:+91${contact.phone}`}>
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>{contact.phoneDisplay}</span>
                </a>
                <span className={styles.contactLink}>
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{contact.address}</span>
                </span>
                <a className={styles.contactLink} href={contact.calendlyUrl} target="_blank" rel="noopener noreferrer">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span>Book a Calendly call</span>
                </a>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.glassPill} ${styles.socialPill}`}
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className={`${styles.bottomBar} section-shell`}>
          <p>&copy; {currentYear} EcomXpertStudio. Built for modern high-growth brands.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
            <a href="#" className={styles.bottomLink}>Privacy</a>
            <a href="#" className={styles.bottomLink}>Terms</a>
            <span className="text-blue-600 dark:text-cyber-cyan">System Active</span>
            <button type="button" onClick={scrollToTop} className={`${styles.glassPill} ${styles.topButton}`} aria-label="Back to top">
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
