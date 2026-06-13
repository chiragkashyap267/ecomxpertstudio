import { Github, Linkedin } from "lucide-react";

export const contact = {
  brand: "EcomXpertStudio",
  founder: "Chirag Kashyap",
  email: "businesswithchirag267@gmail.com",
  phone: "9548174325",
  phoneDisplay: "+91 95481 74325",
  whatsappNumber: "919548174325",
  address: "46 Mahdi Road, Roorkee, Uttarakhand 247667",
  calendlyUrl: "https://calendly.com/businesswithchirag267",
  linkedinUrl: "http://www.linkedin.com/in/chirag-kashyap-00405633b",
  githubUrl: "https://github.com/chiragkashyap267",
};

export const socialLinks = [
  { icon: Linkedin, href: contact.linkedinUrl, label: "LinkedIn" },
  { icon: Github, href: contact.githubUrl, label: "GitHub" },
];

export const serviceSlides = [
  {
    eyebrow: "Web Development",
    title: "Conversion-ready websites that feel premium on every screen.",
    copy: "Next.js websites, landing pages, SEO structure, speed polish, and launch-ready booking flows.",
    stat: "Web",
  },
  {
    eyebrow: "App Development",
    title: "Custom web apps, dashboards, portals, and AI workflows.",
    copy: "Clean interfaces for admin panels, automations, chatbot tools, analytics, and API-connected systems.",
    stat: "Apps",
  },
  {
    eyebrow: "Graphic Designing",
    title: "Product visuals that lift trust before the first click.",
    copy: "Mockups, packaging, Amazon A+ content, infographics, branding, and marketplace-ready creative assets.",
    stat: "Design",
  },
  {
    eyebrow: "Video Editing",
    title: "Sharp motion assets for launches, reels, and campaigns.",
    copy: "Product reels, promos, short-form ads, motion graphics, sound polish, and content cutdowns.",
    stat: "Motion",
  },
];

export const workItems = [
  {
    id: "facewash-mockup",
    title: "Facewash Product Mockup",
    category: "Mockups",
    client: "Ecommerce Beauty Brand",
    year: "2026",
    scope: "Product mockup, label presentation, ecommerce visual polish",
    img: "/work/mockups/facewash-mockup.png",
    liveUrl: contact.whatsappNumber ? `https://wa.me/${contact.whatsappNumber}?text=I%20want%20a%20mockup%20like%20Facewash%20Product%20Mockup` : "#",
    desc: "A clean product mockup built to make the packaging feel sharper, clearer, and more marketplace-ready.",
    outcome: "Improved product presentation for listing galleries, launch creatives, and social proof assets.",
  },
  {
    id: "serum-mockup",
    title: "Serum Launch Mockup",
    category: "Mockups",
    client: "Premium Skincare Concept",
    year: "2026",
    scope: "Cosmetic mockup, premium lighting, hero asset direction",
    img: "/work/mockups/serum-mockup.png",
    liveUrl: contact.whatsappNumber ? `https://wa.me/${contact.whatsappNumber}?text=I%20want%20a%20serum%20mockup%20like%20this` : "#",
    desc: "A premium skincare product visual designed for a polished ecommerce hero, ad creative, or listing gallery.",
    outcome: "Created a higher-trust launch visual with stronger perceived product value.",
  },
  {
    id: "social-post-1",
    title: "Social Media Creative",
    category: "Social Media",
    client: "Campaign Visual System",
    year: "2026",
    scope: "Post design, brand composition, mobile-first presentation",
    img: "/work/social-media/social-post-1.png",
    liveUrl: contact.whatsappNumber ? `https://wa.me/${contact.whatsappNumber}?text=I%20want%20social%20media%20creatives%20like%20this` : "#",
    desc: "A mobile-first social post visual structured for quick scanning, stronger polish, and campaign consistency.",
    outcome: "Added a reusable direction for posts, ads, stories, and ecommerce promo graphics.",
  },
  {
    id: "web-dashboard",
    title: "SaaS Console Interface",
    category: "Web Apps",
    client: "Dashboard Build",
    year: "2026",
    scope: "Dashboard UX, React front-end, responsive interface",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    liveUrl: "/contact",
    desc: "A compact dashboard direction for analytics, admin workflows, and internal tools.",
    outcome: "Made dense operational data easier to scan and act on.",
  },
  {
    id: "website-launch",
    title: "Growth Website System",
    category: "Websites",
    client: "Service Business",
    year: "2026",
    scope: "Responsive website, conversion flow, SEO-ready structure",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    liveUrl: "/contact",
    desc: "A premium website direction for service brands that need a sharper first impression and a clearer booking path.",
    outcome: "Improved scanning, trust, and lead-capture clarity across mobile and desktop.",
  },
  {
    id: "packaging-system",
    title: "Packaging Design System",
    category: "Packaging Design",
    client: "Consumer Product Brand",
    year: "2026",
    scope: "Packaging design, visual hierarchy, marketplace assets",
    img: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85",
    liveUrl: "/contact",
    desc: "A packaging direction built to feel clean, shelf-ready, and strong inside ecommerce product galleries.",
    outcome: "Created a more cohesive visual system for launch pages, listings, and ads.",
  },
];

export const testimonials = [
  {
    quote:
      "The mockups instantly made our product feel more expensive. The final visuals were clean, practical, and ready to use across our listing and ads.",
    name: "Riya Sharma",
    role: "Skincare Brand Founder",
  },
  {
    quote:
      "Chirag understood the assignment quickly: premium but not cluttered. The website flow became much easier for customers to scan and contact us.",
    name: "Aman Verma",
    role: "Service Business Owner",
  },
  {
    quote:
      "Our social creatives finally looked consistent. The layouts had better spacing, sharper product focus, and a much more modern feel.",
    name: "Neha Kapoor",
    role: "Ecommerce Manager",
  },
  {
    quote:
      "The dashboard UI was clear and fast. We got a clean admin experience without unnecessary complexity.",
    name: "Karan Mehta",
    role: "Operations Lead",
  },
  {
    quote:
      "The packaging concept helped us see the brand direction properly. It felt polished enough for both marketplace and launch campaigns.",
    name: "Simran Arora",
    role: "D2C Brand Strategist",
  },
  {
    quote:
      "Fast communication, sharp design sense, and a practical launch mindset. The result felt custom, not templated.",
    name: "Dev Malhotra",
    role: "Startup Founder",
  },
  {
    quote:
      "Our brand visuals were completely transformed. The attention to detail and modern aesthetics gave us a massive edge in our market.",
    name: "Zeeshan",
    role: "Business Owner, Indore",
  },
  {
    quote:
      "Incredible work on the packaging design. It looks premium and stands out perfectly on both digital marketplaces and physical shelves.",
    name: "Mario Pinto",
    role: "Founder, Tamil Nadu",
  },
  {
    quote:
      "The social media creatives were exactly what we needed to scale our campaigns. Highly engaging and perfectly aligned with our brand.",
    name: "Dhruve Gije",
    role: "Ecommerce Director, Mumbai",
  },
  {
    quote:
      "A flawless execution from start to finish. The infographics made our complex product features easy for customers to understand.",
    name: "Rahul Kumar",
    role: "Operations Head, Uttarakhand",
  },
  {
    quote:
      "They delivered a stunning A+ content system for our tech products that immediately boosted our conversion rates.",
    name: "Elem Consumer Tech",
    role: "Tech Brand, Roorkee",
  },
  {
    quote:
      "The premium branding and design work helped establish tremendous trust for our healthcare products.",
    name: "Vinit Aggarwal",
    role: "Owner at Kindcare Drugs, Uttarakhand",
  },
];

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(subject: string, body: string) {
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
