import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import AmbientBackground from "@/components/AmbientBackground";

export const metadata: Metadata = {
  title: "KrishiMitra AI - AI-Powered Agricultural Assistant",
  description: "Get AI-powered crop guidance, weather intelligence, government schemes information, and market insights for Indian farmers.",
  keywords: ["agriculture", "farming", "AI", "India", "Hindi", "crop guidance", "weather", "government schemes"],
};

import { ThemeProvider } from '@/components/ThemeProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased text-text-primary selection:bg-glassTint-blue selection:text-white">
        <ThemeProvider>
          <AmbientBackground />
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
          <div className="relative z-50">
            <BottomNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
