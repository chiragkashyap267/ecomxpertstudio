import type { Metadata } from "next";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "EcomXpertStudio | Digital Growth Experts",
  description:
    "Premium creative-tech studio building high-converting websites, modern apps, brand systems, product mockups, packaging, A+ content, and cinematic digital assets.",
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
  openGraph: {
    title: "EcomXpertStudio | Digital Growth Experts",
    description:
      "Building modern digital experiences for brands that want to look sharper and convert better.",
    type: "website",
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
