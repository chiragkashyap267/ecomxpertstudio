import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel – EcomXpertStudio",
  robots: { index: false, follow: false },
};

// The admin area is completely standalone — no Navbar, Footer, or LoadingScreen.
export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
