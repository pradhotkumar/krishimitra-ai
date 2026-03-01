import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KrishiMitra AI - AI-Powered Agricultural Assistant",
  description: "Get AI-powered crop guidance, weather intelligence, government schemes information, and market insights for Indian farmers.",
  keywords: ["agriculture", "farming", "AI", "India", "Hindi", "crop guidance", "weather", "government schemes"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
