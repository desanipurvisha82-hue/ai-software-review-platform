import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Software Review Platform",
  description: "AI-powered software review platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}