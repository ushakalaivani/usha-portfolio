"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX, Menu, X, Sparkles, Send } from "lucide-react";
import { toggleSound, isSoundEnabled, playClickSound, playHoverSound } from "../utils/soundFX";

export default function Navbar() {
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSoundOn(isSoundEnabled());

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) {
      playClickSound();
    }
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#080b14]/85 py-3.5 backdrop-blur-xl shadow-xl shadow-black/40"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        {/* Brand */}
        <a
          href="#"
          onClick={playClickSound}
          onMouseEnter={playHoverSound}
          className="group flex items-center gap-2 text-xl font-extrabold tracking-tight text-white"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-sm font-bold text-white shadow-md shadow-violet-500/30 transition-transform group-hover:scale-110">
            UK
          </div>
          <span>
            Usha<span className="text-violet-400 group-hover:text-cyan-400 transition-colors">.3D</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={playClickSound}
                onMouseEnter={playHoverSound}
                className="relative py-1 transition hover:text-violet-400"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 border-l border-white/10 pl-6">
            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              className={`rounded-xl border border-white/10 p-2 text-xs transition ${
                soundOn
                  ? "bg-violet-600/20 text-violet-300 border-violet-500/40"
                  : "bg-white/5 text-slate-500"
              }`}
              title={soundOn ? "Mute interactive sounds" : "Enable sound effects"}
            >
              {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            {/* CTA */}
            <a
              href="#contact"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-500"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Hire Me</span>
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={handleSoundToggle}
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300"
          >
            {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#0d1220]/95 px-6 py-5 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  playClickSound();
                  setMobileMenuOpen(false);
                }}
                className="py-1 hover:text-violet-400"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(false);
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 py-2.5 text-center text-xs font-semibold text-white"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Contact Me</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
