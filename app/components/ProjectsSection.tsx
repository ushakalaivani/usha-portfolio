"use client";

import { useState } from "react";
import TiltCard from "./TiltCard";
import {
  ExternalLink,
  Sparkles,
  BookOpen,
  HeartHandshake,
  Flower2,
  Boxes,
  X,
  CheckCircle2,
  Code,
  Layers,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import { playClickSound, playHoverSound } from "../utils/soundFX";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: string;
  icon: typeof BookOpen;
  accentColor: string;
  highlights: string[];
  githubUrl: string;
  liveUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: "library",
    title: "Library Management System",
    subtitle: "Digital Cataloging & Asset Tracking Platform",
    description:
      "A practice project focused on organizing library records, managing inventory, and tracking borrower activities.",
    longDescription:
      "A web application engineered to solve book cataloging, reader checkouts, and overdue tracking. Includes dynamic searching by author/ISBN, filterable category tags, real-time inventory counter, and responsive data tables designed for desktop and mobile.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "SQL / LocalStorage"],
    category: "Web Application",
    icon: BookOpen,
    accentColor: "#8b5cf6",
    highlights: [
      "Dynamic search and multi-criteria book filtering",
      "Real-time checkout, return, and overdue status tracker",
      "Accessible table layouts with mobile card fallbacks",
      "Modular component structure with TypeScript interfaces",
    ],
    githubUrl: "https://github.com/ushakalaivani",
  },
  {
    id: "petcare",
    title: "Pet Care Centre",
    subtitle: "Healthcare, Grooming & Pet Adoption Web Portal",
    description:
      "A web project concept for presenting pet care services, veterinary appointments, and helpful information for pet parents.",
    longDescription:
      "An engaging, user-friendly platform dedicated to pet wellness and adoption. Features comprehensive service tiers (routine checkups, dental care, grooming), interactive appointment booking form with instant validation, and an adoption showcase with pet profile cards.",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    category: "Service Platform",
    icon: HeartHandshake,
    accentColor: "#06b6d4",
    highlights: [
      "Intuitive multi-step service appointment scheduler",
      "Interactive pet gallery with filterable breed & age tags",
      "CSS3 flexbox/grid layout optimized across all screen sizes",
      "Smooth micro-interactions and accessible color contrasts",
    ],
    githubUrl: "https://github.com/ushakalaivani",
  },
  {
    id: "flowershop",
    title: "Flower Shop",
    subtitle: "Boutique E-Commerce Store with Express Backend",
    description:
      "A practice web application featuring a floral product catalog, interactive cart, and a Node.js Express backend.",
    longDescription:
      "A complete boutique e-commerce web application with end-to-end customer flow. Built with a Node.js and Express RESTful backend powering product retrieval and cart calculations. Frontend offers animated product cards, category filters, and an interactive slide-over cart drawer.",
    tech: ["Node.js", "Express", "JavaScript", "Tailwind CSS"],
    category: "Full-Stack Project",
    icon: Flower2,
    accentColor: "#f43f5e",
    highlights: [
      "RESTful API endpoints for flower catalog and inventory",
      "Interactive slide-over cart drawer with live subtotal calculation",
      "Category filtering (Bouquets, Occasions, Indoor Plants)",
      "Express middleware for request logging and error handling",
    ],
    githubUrl: "https://github.com/ushakalaivani",
  },
  {
    id: "portfolio-3d",
    title: "3D Developer Portfolio",
    subtitle: "Next-Gen WebGL & Three.js Interactive Showcase",
    description:
      "This interactive 3D portfolio featuring real-time WebGL rendering, physics particle starfield, and spatial Web Audio.",
    longDescription:
      "Designed to elevate the traditional developer resume into a cinematic 3D journey. Features a custom WebGL Three.js interactive core with customizable geometry, dynamic lighting, 3D mouse perspective tilt cards, and Web Audio API synthesizer chimes.",
    tech: ["Three.js", "WebGL", "Next.js", "TypeScript", "Tailwind CSS"],
    category: "3D Creative Web",
    icon: Boxes,
    accentColor: "#10b981",
    highlights: [
      "Interactive 3D WebGL core with 4 switchable geometries and colors",
      "Dynamic mouse-parallax cosmic particle background with 1200+ stars",
      "Perspective 3D tilt cards with cursor-following radial spotlight",
      "Synthesized sound FX generated directly in browser with Web Audio API",
    ],
    githubUrl: "https://github.com/ushakalaivani/usha-portfolio",
    liveUrl: "https://usha-portfolionew.vercel.app/",
  },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-violet-300">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Featured Projects & Work
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            Hands-on web applications showcasing practical problem-solving, clean code
            organization, and responsive frontend implementations.
          </p>
        </div>

        {/* 3D Projects Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {PROJECTS.map((project) => {
            const Icon = project.icon;
            return (
              <TiltCard
                key={project.id}
                glowColor={project.accentColor + "33"}
                maxTilt={10}
                className="group flex flex-col justify-between border-white/10 p-7 transition hover:border-violet-500/50"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: project.accentColor + "20",
                        color: project.accentColor,
                        boxShadow: `0 0 20px ${project.accentColor}30`,
                      }}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-mono text-slate-300">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-white transition group-hover:text-violet-300">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-violet-400">
                    {project.subtitle}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-slate-400">
                    {project.description}
                  </p>

                  {/* Highlights preview */}
                  <div className="mt-5 space-y-2">
                    {project.highlights.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300 transition hover:border-violet-500/40"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
                  <button
                    onClick={() => {
                      playClickSound();
                      setSelectedProject(project);
                    }}
                    onMouseEnter={playHoverSound}
                    className="flex-1 rounded-xl bg-violet-600 px-4 py-2.5 text-center text-xs font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-500 active:scale-95"
                  >
                    View Project Details
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClickSound}
                    onMouseEnter={playHoverSound}
                    className="flex items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2.5 text-slate-300 transition hover:bg-white/15 hover:text-white"
                    title="View GitHub Repository"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClickSound}
                      onMouseEnter={playHoverSound}
                      className="flex items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2.5 text-slate-300 transition hover:bg-white/15 hover:text-white"
                      title="View Live Website"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-violet-500/30 bg-[#0d1220] p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                playClickSound();
                setSelectedProject(null);
              }}
              className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/5 p-2 text-slate-400 transition hover:bg-white/15 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: selectedProject.accentColor + "20",
                  color: selectedProject.accentColor,
                }}
              >
                <selectedProject.icon className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-violet-400">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {selectedProject.longDescription}
            </p>

            {/* Key Features */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-violet-300">
                Key Architectural Highlights
              </h4>
              <div className="mt-3 space-y-2.5">
                {selectedProject.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-black/20 p-3 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-violet-300">
                Technology Stack
              </h4>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {selectedProject.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-mono text-violet-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-white/10 pt-5">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/15"
              >
                <GithubIcon className="h-4 w-4" />
                <span>Source Code</span>
              </a>

              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-500"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Launch Live Site</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
