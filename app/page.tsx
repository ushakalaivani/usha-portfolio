"use client";

import { Button, Chip } from "@mui/material";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Material UI",
  "Python",
  "SQL",
  "Git",
];

const projects = [
  {
    title: "Library Management System",
    description:
      "A practice project focused on organizing library records and managing information.",
    tech: "Web Development",
  },
  {
    title: "Pet Care Centre",
    description:
      "A web project concept for presenting pet care services and helpful information.",
    tech: "HTML · CSS · JavaScript",
  },
  {
    title: "Flower Shop",
    description:
      "A practice web application with a Node.js and Express backend.",
    tech: "Node.js · Express",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080b14] text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="#" className="text-xl font-bold tracking-wide">
          UK<span className="text-violet-400">.</span>
        </a>
        <div className="flex gap-5 text-sm text-slate-300">
          <a href="#about" className="hover:text-violet-400">About</a>
          <a href="#skills" className="hover:text-violet-400">Skills</a>
          <a href="#projects" className="hover:text-violet-400">Projects</a>
          <a href="#contact" className="hover:text-violet-400">Contact</a>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
        <div>
          <Chip
            label="OPEN TO OPPORTUNITIES"
            variant="outlined"
            sx={{
              color: "#c4b5fd",
              borderColor: "#7c3aed",
              mb: 3,
            }}
          />

          <p className="mb-3 text-lg text-violet-300">
            Hello, I'm
          </p>

          <h1 className="text-5xl font-bold leading-tight md:text-7xl">
            Usha Kalaivani
          </h1>

          <h2 className="mt-5 text-2xl font-semibold text-slate-300">
            Aspiring Frontend Developer
          </h2>

          <p className="mt-6 max-w-xl leading-8 text-slate-400">
            MCA graduate with a Computer Science background,
            building web projects and developing my skills in
            modern frontend technologies. I'm looking for a
            frontend developer job or internship where I can
            learn, contribute, and grow.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              variant="contained"
              href="#projects"
              sx={{
                backgroundColor: "#7c3aed",
                textTransform: "none",
                px: 3,
                py: 1.3,
                "&:hover": { backgroundColor: "#6d28d9" },
              }}
            >
              Explore My Projects
            </Button>

            <Button
              variant="outlined"
              href="#contact"
              sx={{
                color: "white",
                borderColor: "#475569",
                textTransform: "none",
                px: 3,
                py: 1.3,
              }}
            >
              Contact Me
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-slate-900 p-8 md:p-12">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-violet-500/20 text-4xl font-bold text-violet-300">
            UK
          </div>
          <p className="mt-8 text-sm uppercase tracking-[0.25em] text-violet-300">
            My journey
          </p>
          <h3 className="mt-3 text-3xl font-bold">
            Learn. Build. Improve.
          </h3>
          <p className="mt-4 leading-7 text-slate-400">
            Turning my computer science knowledge into practical
            projects, one step at a time.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-2xl font-bold text-violet-300">10+</p>
              <p className="mt-1 text-sm text-slate-400">Technologies to explore</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-2xl font-bold text-violet-300">3</p>
              <p className="mt-1 text-sm text-slate-400">Featured projects</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">
            About me
          </p>
          <h2 className="mt-3 text-3xl font-bold">A little about my journey</h2>
          <p className="mt-6 leading-8 text-slate-400">
            I completed my Master of Computer Applications (MCA)
            in 2009. I'm refreshing and strengthening my technical
            skills through hands-on development and personal
            projects. My current focus is building responsive,
            accessible websites with modern frontend tools.
          </p>
        </div>
      </section>

      <section id="skills" className="bg-[#0d1220] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">
            Technologies
          </p>
          <h2 className="mt-3 text-3xl font-bold">My technical skills</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                sx={{
                  color: "#e2e8f0",
                  backgroundColor: "#171d2e",
                  border: "1px solid #30384d",
                  py: 2.5,
                }}
              />
            ))}
          </div>
          <p className="mt-5 text-sm text-slate-500">
            This list represents technologies to showcase or learn.
            Adjust it to reflect your actual proficiency.
          </p>
        </div>
      </section>

      <section id="projects" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">
            Selected work
          </p>
          <h2 className="mt-3 text-3xl font-bold">My projects</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="rounded-2xl border border-white/10 bg-[#101625] p-6 transition hover:-translate-y-1 hover:border-violet-400/50"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-xl text-violet-300">
                  {"</>"}
                </div>
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="mt-4 leading-7 text-slate-400">
                  {project.description}
                </p>
                <p className="mt-6 text-sm text-violet-300">
                  {project.tech}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-white/10 bg-[#0d1220] px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">
            Get in touch
          </p>
          <h2 className="mt-3 text-3xl font-bold">
            Let's connect
          </h2>
          <p className="mt-5 leading-7 text-slate-400">
            I'm interested in frontend developer opportunities
            and internships. Feel free to get in touch.
          </p>
          <Button
            variant="contained"
            href="mailto:"
            sx={{
              mt: 4,
              backgroundColor: "#7c3aed",
              textTransform: "none",
              px: 4,
              py: 1.3,
            }}
          >
            Email Me
          </Button>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-6 text-center text-sm text-slate-500">
        © 2026 Usha Kalaivani · Developer Portfolio
      </footer>
    </main>
  );
}