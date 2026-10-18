"use client";

import { useState } from "react";
import TiltCard from "./TiltCard";
import {
  Code2,
  FileCode,
  Layers,
  Cpu,
  Database,
  GitBranch,
  Terminal,
  Sparkles,
  Layout,
  Palette,
  Server,
  Workflow,
} from "lucide-react";
import { playClickSound, playHoverSound } from "../utils/soundFX";

interface SkillItem {
  name: string;
  category: "frontend" | "backend" | "tools";
  level: string;
  icon: typeof Code2;
  color: string;
  desc: string;
}

const SKILLS_DATA: SkillItem[] = [
  {
    name: "HTML5",
    category: "frontend",
    level: "Core & Semantic",
    icon: Code2,
    color: "#f97316",
    desc: "Semantic markup, modern forms, DOM structure & accessibility (a11y)",
  },
  {
    name: "CSS3",
    category: "frontend",
    level: "Advanced Layouts",
    icon: Layout,
    color: "#38bdf8",
    desc: "Flexbox, CSS Grid, 3D transforms, keyframe animations & media queries",
  },
  {
    name: "JavaScript",
    category: "frontend",
    level: "ES6+ Modern",
    icon: FileCode,
    color: "#facc15",
    desc: "Promises, async/await, DOM APIs, event loop, closures & module patterns",
  },
  {
    name: "TypeScript",
    category: "frontend",
    level: "Type-Safe Web",
    icon: Terminal,
    color: "#60a5fa",
    desc: "Interfaces, generics, type guards, strict mode & scalable codebases",
  },
  {
    name: "React.js",
    category: "frontend",
    level: "Component-Driven",
    icon: Cpu,
    color: "#06b6d4",
    desc: "Hooks, state management, memoization, lifecycle & virtual DOM",
  },
  {
    name: "Next.js",
    category: "frontend",
    level: "Full-Stack React",
    icon: Sparkles,
    color: "#c084fc",
    desc: "App Router, SSR, Turbopack, static site generation & API routes",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    level: "Modern Styling",
    icon: Palette,
    color: "#2dd4bf",
    desc: "Utility-first design, dark mode, responsive variants & JIT compilation",
  },
  {
    name: "Material UI",
    category: "frontend",
    level: "Design Systems",
    icon: Layers,
    color: "#818cf8",
    desc: "Enterprise UI components, themes, Emotion styled components & sx props",
  },
  {
    name: "Python",
    category: "backend",
    level: "Data & Logic",
    icon: Terminal,
    color: "#34d399",
    desc: "Scripting, algorithmic problem solving, automation & backend services",
  },
  {
    name: "Node.js & Express",
    category: "backend",
    level: "Server-Side",
    icon: Server,
    color: "#a3e635",
    desc: "RESTful API creation, middleware, JSON endpoints & backend routing",
  },
  {
    name: "SQL",
    category: "backend",
    level: "Relational Data",
    icon: Database,
    color: "#fb923c",
    desc: "Relational database schema modeling, queries, aggregations & indexing",
  },
  {
    name: "Git & GitHub",
    category: "tools",
    level: "Version Control",
    icon: GitBranch,
    color: "#f43f5e",
    desc: "Branching workflows, commits, pull requests, merge conflict resolution",
  },
];

export default function Skills3DSection() {
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "tools">("all");
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  const filteredSkills =
    activeTab === "all"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === activeTab);

  return (
    <section id="skills" className="relative z-10 border-t border-white/10 bg-[#0d1220]/90 px-6 py-24 backdrop-blur-md">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-violet-300">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              <span>INTERACTIVE TECH ARSENAL</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              Skills & Modern Stack
            </h2>
            <p className="mt-3 max-w-2xl text-slate-400">
              Blending fundamental Computer Science theory from an MCA background with
              bleeding-edge frontend tools, 3D web techniques, and responsive architecture.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 rounded-xl border border-white/10 bg-black/40 p-1.5 backdrop-blur-md">
            {[
              { id: "all", label: "All Skills" },
              { id: "frontend", label: "Frontend" },
              { id: "backend", label: "Backend & DB" },
              { id: "tools", label: "Tools" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  playClickSound();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                onMouseEnter={playHoverSound}
                className={`rounded-lg px-4 py-1.5 text-xs font-medium transition ${
                  activeTab === tab.id
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Cards Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredSkills.map((skill) => {
            const Icon = skill.icon;
            return (
              <TiltCard
                key={skill.name}
                glowColor={skill.color + "33"}
                maxTilt={14}
                className="cursor-pointer transition hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10"
              >
                <div
                  className="p-5"
                  onClick={() => {
                    playClickSound();
                    setActiveSkill(skill);
                  }}
                  onMouseEnter={playHoverSound}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: skill.color + "20",
                        color: skill.color,
                        boxShadow: `0 0 15px ${skill.color}30`,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-slate-300">
                      {skill.level}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-white transition group-hover:text-violet-300">
                    {skill.name}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {skill.desc}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[11px] text-slate-500">
                    <span className="capitalize">{skill.category}</span>
                    <span className="text-violet-400 opacity-0 transition group-hover:opacity-100">
                      Interactive 3D ✨
                    </span>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Informative Note */}
        <div className="mt-10 flex items-center justify-between rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-400" />
            <span>
              Constantly expanding my skillset with real-world practice, clean code architecture, and 3D web interfaces.
            </span>
          </div>
          <span className="hidden font-mono text-violet-300 sm:inline">12 Verified Tech Skills</span>
        </div>
      </div>
    </section>
  );
}
