import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BannerNotificationProvider } from "@/components/BannerNotification/BannerNotificationProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IFSMHP - Integrated Family & Social Mental Health Program",
  description: "Supporting mental health and wellbeing for families and communities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BannerNotificationProvider>
          {children}
        </BannerNotificationProvider>
      </body>
    </html>
  );
}
