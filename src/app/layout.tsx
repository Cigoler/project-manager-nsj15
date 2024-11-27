import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TanstackQueryProvider } from "@/components/provider/tanstack-query";
import { SessionProvider } from "@/components/provider/session-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Project Manager",
  description: "Project management tool for Rovtech Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <TanstackQueryProvider>
            {children}
          </TanstackQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
