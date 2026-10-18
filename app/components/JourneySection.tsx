"use client";

import TiltCard from "./TiltCard";
import { GraduationCap, Code2, Rocket, Compass, Sparkles, Award, CheckCircle } from "lucide-react";
import { playHoverSound } from "../utils/soundFX";

const MILESTONES = [
  {
    year: "2009",
    title: "Master of Computer Applications (MCA)",
    subtitle: "Core Computer Science Foundation",
    icon: GraduationCap,
    color: "#8b5cf6",
    description:
      "Graduated with a comprehensive Master's degree in Computer Applications, acquiring foundational depth in software engineering, algorithms, data structures, and relational database management (SQL).",
    skills: ["Computer Science Fundamentals", "Object-Oriented Programming", "RDBMS & SQL", "Software Lifecycle"],
  },
  {
    year: "Modernization",
    title: "Frontend Transformation & Modern Web",
    subtitle: "Active Skill Upskilling & Hands-on Coding",
    icon: Code2,
    color: "#06b6d4",
    description:
      "Undertook focused, continuous learning to master contemporary frontend ecosystems: modern JavaScript (ES6+), TypeScript type safety, React component patterns, Next.js App Router, and Tailwind CSS.",
    skills: ["React & Next.js", "TypeScript", "Tailwind CSS", "Semantic HTML5 / a11y"],
  },
  {
    year: "Projects",
    title: "Practical Application Engineering",
    subtitle: "Building Real-World Web Apps",
    icon: Compass,
    color: "#10b981",
    description:
      "Constructed multiple production-grade web applications from scratch—including digital library catalog systems, pet healthcare portals, Node.js/Express e-commerce backends, and 3D WebGL interfaces.",
    skills: ["Fullstack Architecture", "RESTful APIs", "State Management", "Responsive UI"],
  },
  {
    year: "Now & Beyond",
    title: "Ready for Opportunity",
    subtitle: "Frontend Developer Job & Internship Ready",
    icon: Rocket,
    color: "#f43f5e",
    description:
      "Eager to bring dedication, structured problem solving, and fresh modern web development expertise to a dynamic engineering team where I can contribute, learn, and grow.",
    skills: ["Frontend Developer Roles", "Internships", "Cross-Functional Collaboration", "Continuous Improvement"],
  },
];

export default function JourneySection() {
  return (
    <section id="about" className="relative z-10 border-t border-white/10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-violet-300">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            <span>MY BACKGROUND & PASSION</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            About Me & My Journey
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            Learn. Build. Improve. How an MCA foundation paired with relentless modern
            web development practice shapes my engineering approach.
          </p>
        </div>

        {/* Narrative & Story Card */}
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          <TiltCard
            glowColor="rgba(139, 92, 246, 0.2)"
            maxTilt={8}
            className="col-span-full border-white/10 p-8 lg:col-span-1"
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30">
                  <Award className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-white">
                  Lifelong Learner Mindset
                </h3>
                <p className="mt-4 leading-relaxed text-slate-300 text-sm">
                  I completed my Master of Computer Applications (MCA) in 2009.
                  With deep appreciation for technology and creating visually polished user experiences,
                  I dedicated myself to actively refreshing and strengthening my skills in modern web development.
                </p>
                <p className="mt-3 leading-relaxed text-slate-400 text-xs">
                  My present focus centers on building responsive, accessible, high-performance web applications using React, Next.js, TypeScript, and modern styling architectures.
                </p>
              </div>

              <div className="mt-8 rounded-xl border border-violet-500/20 bg-violet-500/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                  What I Bring to Your Team
                </p>
                <div className="mt-3 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Disciplined work ethic & structured problem solving</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Rapid learner eager to adopt team workflows</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Attention to UI details & accessibility</span>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Interactive Timeline Milestones */}
          <div className="space-y-4 lg:col-span-2">
            {MILESTONES.map((milestone) => {
              const Icon = milestone.icon;
              return (
                <TiltCard
                  key={milestone.year}
                  glowColor={milestone.color + "25"}
                  maxTilt={6}
                  className="border-white/10 p-6 transition hover:border-violet-500/40"
                >
                  <div onMouseEnter={playHoverSound} className="flex flex-col sm:flex-row items-start gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl shrink-0"
                      style={{
                        backgroundColor: milestone.color + "20",
                        color: milestone.color,
                        boxShadow: `0 0 15px ${milestone.color}30`,
                      }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span
                          className="rounded-full px-2.5 py-0.5 text-xs font-mono font-bold"
                          style={{
                            backgroundColor: milestone.color + "20",
                            color: milestone.color,
                          }}
                        >
                          {milestone.year}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {milestone.subtitle}
                        </span>
                      </div>

                      <h4 className="mt-2 text-lg font-bold text-white">
                        {milestone.title}
                      </h4>

                      <p className="mt-2 text-xs leading-relaxed text-slate-300">
                        {milestone.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {milestone.skills.map((s) => (
                          <span
                            key={s}
                            className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
