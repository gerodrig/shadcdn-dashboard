import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";


export const metadata: Metadata = {
  title: "ShadCDN dashboard",
  description: "ShadCDN dashboard for managing your assets, test most components and features of ShadCDN.",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>{children}
         <SonnerToaster richColors />
        <Toaster />
        </body>
    </html>
  );
}
