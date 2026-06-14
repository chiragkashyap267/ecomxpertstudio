import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

import Aurora from "@/components/Aurora";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative flex min-h-full flex-col overflow-x-hidden bg-[#020b18] transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Global Aurora Background */}
          <div className="fixed inset-0 z-[-1] pointer-events-none opacity-60">
            <Aurora
              colorStops={["#0ea5e9", "#6366f1", "#020b18"]}
              blend={0.5}
              amplitude={1.2}
              speed={0.4}
            />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

