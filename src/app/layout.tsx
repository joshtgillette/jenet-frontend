import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "./topnav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ['400']
})

export const metadata: Metadata = {
  title: "jenet"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <div>
          <TopNav/>
          {children}
        </div>
      </body>
    </html>
  );
}
