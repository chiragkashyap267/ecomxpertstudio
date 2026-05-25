import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcomXpertStudio | Premium Futuristic Digital & Creative Studio",
  description:
    "We build modern digital experiences. Specializing in high-converting Next.js websites, AI-powered web applications, high-end 3D product mockups, luxury packaging, and custom cinematic editing.",
  keywords: [
    "Digital Creative Agency",
    "Next.js Developer",
    "React Studio",
    "Futuristic Web Apps",
    "Graphic Designing",
    "A+ Brand Content",
    "EcomXpertStudio",
  ],
  authors: [{ name: "EcomXpertStudio" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "EcomXpertStudio | Digital Growth Experts",
    description: "Building modern high-performance web experiences and stellar design identities.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cyber-bg text-white selection:bg-cyber-cyan/35 selection:text-white flex flex-col relative overflow-x-hidden">
        {/* Futuristic global background gradient orbs */}
        <div className="absolute top-[10%] left-[-10%] -z-20 h-[500px] w-[500px] rounded-full bg-cyber-cyan/4 blur-[130px] animate-pulse-slow pointer-events-none" />
        <div className="absolute top-[40%] right-[-10%] -z-20 h-[600px] w-[600px] rounded-full bg-cyber-purple/3 blur-[140px] animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-[10%] left-[5%] -z-20 h-[500px] w-[500px] rounded-full bg-cyber-blue/3 blur-[120px] animate-pulse-slow pointer-events-none" />

        {/* Dynamic customized particles backdrop */}
        <div className="cyber-grid absolute inset-0 -z-30 opacity-70" />

        {/* Global Loading Boot Terminal */}
        <LoadingScreen />

        {/* High-fidelity interactive neon tracking cursors */}
        <CustomCursor />

        {/* Smooth 60fps Momentum Scrolling Wrapper */}
        <SmoothScroll>
          {/* Floating Glass Header */}
          <Navbar />

          {/* Core Content Area */}
          <main className="flex-grow pt-28 sm:pt-32 pb-4">
            {children}
          </main>

          {/* Modern Web Footer Outline */}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
