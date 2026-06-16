import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const GA_ID      = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? "";

export const metadata: Metadata = {
  title: "EcomXpertStudio | Premium Graphic Design & Web Development",
  description:
    "EcomXpertStudio — Premium creative-tech studio building high-converting websites, modern apps, brand systems, product mockups, packaging, A+ content, and cinematic digital assets. Serving ecommerce brands globally.",
  keywords: [
    "graphic design services",
    "web development company",
    "ecommerce design agency",
    "product mockup design",
    "Amazon A+ content design",
    "packaging design",
    "Next.js web development",
    "social media creatives",
    "EcomXpertStudio",
    "Chirag Kashyap",
    "digital marketing agency India",
    "conversion rate optimization",
  ],
  authors: [{ name: "EcomXpertStudio" }],
  metadataBase: new URL("https://ecomxpertstudio.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "EcomXpertStudio | Graphic Design & Web Development",
    description:
      "Premium creative-tech studio for ecommerce brands — mockups, packaging, A+ content, websites, apps, and motion assets.",
    type: "website",
    locale: "en_IN",
    siteName: "EcomXpertStudio",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcomXpertStudio | Graphic Design & Web Development",
    description: "Premium creative-tech studio for ecommerce brands.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
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
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative flex min-h-full flex-col overflow-x-hidden bg-[#020b18] transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>

        {/* Microsoft Clarity — next/script handles placement automatically */}
        {CLARITY_ID && (
          <Script id="clarity-script" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
          </Script>
        )}

        {/* Google Analytics 4 */}
        {GA_ID && GA_ID !== "G-XXXXXXXXXX" && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
