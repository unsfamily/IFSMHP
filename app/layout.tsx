import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "World-Class Notifications",
  description: "The most attractive notification system with stunning animations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
