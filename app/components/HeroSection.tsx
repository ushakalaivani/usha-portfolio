"use client";

import { useState, useEffect } from "react";
import Hero3DCanvas from "./Hero3DCanvas";
import { Sparkles, ArrowRight, Mail, FolderGit2, Compass, CheckCircle } from "lucide-react";
import { playClickSound, playHoverSound } from "../utils/soundFX";

const ROLES = [
  "Aspiring Frontend Developer",
  "Master of Computer Applications (MCA)",
  "Modern UI & React Enthusiast",
  "Interactive 3D Web Explorer",
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }, 70);
    } else if (!isDeleting && displayText.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
      }, 40);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 pt-36 pb-20 md:grid-cols-2 md:pt-40 md:pb-28">
      {/* Left Column: Narrative & CTA */}
      <div>
        {/* Availability Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1.5 text-xs font-medium text-violet-300 shadow-sm backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-semibold tracking-wide">OPEN TO OPPORTUNITIES</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-300">Jobs & Internships</span>
        </div>

        {/* Introduction */}
        <p className="mt-6 text-lg font-medium text-violet-300">
          Hello, I'm
        </p>

        <h1 className="mt-1 text-5xl font-extrabold tracking-tight text-white md:text-7xl">
          Usha <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400">Kalaivani</span>
        </h1>

        {/* Typewriter Subtitle */}
        <div className="mt-4 flex min-h-[36px] items-center text-xl font-semibold text-slate-300 md:text-2xl">
          <span>{displayText}</span>
          <span className="ml-1 inline-block h-6 w-0.5 animate-pulse bg-violet-400" />
        </div>

        {/* Narrative Description */}
        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
          MCA graduate with a Computer Science background, building web projects
          and developing my skills in modern frontend technologies. I'm looking for a
          frontend developer job or internship where I can learn, contribute, and grow.
        </p>

        {/* Key Competency Badges */}
        <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-300">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/30 px-2.5 py-1">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> Next.js & React
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/30 px-2.5 py-1">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> TypeScript
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/30 px-2.5 py-1">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> Tailwind CSS
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/30 px-2.5 py-1">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> Three.js 3D Web
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            className="group inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-600/30 transition hover:bg-violet-500 active:scale-95"
          >
            <FolderGit2 className="h-4 w-4" />
            <span>Explore My Projects</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#contact"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-violet-500/50 hover:bg-white/10 active:scale-95"
          >
            <Mail className="h-4 w-4 text-violet-400" />
            <span>Contact Me</span>
          </a>

          <a
            href="#about"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition hover:text-violet-300"
          >
            <Compass className="h-3.5 w-3.5" />
            <span>View Journey</span>
          </a>
        </div>
      </div>

      {/* Right Column: 3D Holographic Interactive Canvas */}
      <div className="relative">
        {/* Glow backdrop aura */}
        <div className="absolute -inset-4 rounded-full bg-violet-600/20 blur-3xl" />
        <Hero3DCanvas />
      </div>
    </section>
  );
}
