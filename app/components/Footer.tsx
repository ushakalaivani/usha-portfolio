"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Heart, Sparkles } from "lucide-react";
import { GithubIcon } from "./Icons";
import { playClickSound, playHoverSound } from "../utils/soundFX";

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#080b14] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600/20 text-xs font-bold text-violet-300">
            UK
          </div>
          <span className="text-sm font-semibold text-white">
            Usha Kalaivani <span className="text-xs text-slate-500 font-normal">| Frontend Developer</span>
          </span>
        </div>

        {/* Center note */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span>Crafted with</span>
          <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
          <span>using Next.js, Three.js & Tailwind CSS</span>
        </div>

        {/* Right Links */}
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <a
            href="https://github.com/ushakalaivani"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHoverSound}
            className="flex items-center gap-1.5 transition hover:text-violet-400"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
          <span className="text-slate-600">·</span>
          <span>© 2026</span>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          onMouseEnter={playHoverSound}
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-500/40 bg-violet-600/90 text-white shadow-xl shadow-violet-600/30 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-violet-500 active:scale-95"
          title="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
}
