import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Name | Data Science Portfolio",
  description: "Modern portfolio built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-900 text-white`}>
        
        {/* --- Shared Header --- */}
        <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-3xl font-bold tracking-tight">
              <span className="text-white">P</span>
              <span className="text-orange-500">S</span>
              <span className="text-white">A</span>
              <span className="text-orange-500">W</span>
              <span className="text-white">A</span>
              <span className="text-orange-500">I</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="/home" className="hover:text-orange-400 transition">Home</a>
              <a href="/aboutme" className="hover:text-orange-400 transition">About me</a>
              <a href="/portfolio" className="hover:text-orange-400 transition">Portfolio</a>
              <a href="/contact" className="hover:text-orange-400 transition">Contact me</a>
            </div>

            <button className="bg-orange-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition text-sm">
              Hire Me
            </button>
          </nav>
        </header>

        {/* --- Page Content --- */}
        {children}

        <footer className="border-t border-slate-800 bg-slate-950 px-6 py-10 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Nonthcha. Designed for portfolio.</p>
        </footer>

      </body>
    </html>
  );
}