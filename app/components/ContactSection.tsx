"use client";

import { useState, FormEvent } from "react";
import confetti from "canvas-confetti";
import TiltCard from "./TiltCard";
import {
  Mail,
  Send,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  Clock,
  MapPin,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { playClickSound, playHoverSound, playSuccessSound } from "../utils/soundFX";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const directEmail = "ushakalaivani.dev@gmail.com";

  const handleCopyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText(directEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    playSuccessSound();

    // Fire celebratory confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#8b5cf6", "#06b6d4", "#a855f7", "#ec4899", "#10b981"],
    });

    setFormSubmitted(true);

    // Open mailto client with pre-filled content
    const mailtoUrl = `mailto:${directEmail}?subject=${encodeURIComponent(
      formData.subject || "Frontend Developer Opportunity"
    )}&body=${encodeURIComponent(
      `Hello Usha,\n\nMy name is ${formData.name} (${formData.email}).\n\n${formData.message}`
    )}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 1200);
  };

  return (
    <section id="contact" className="relative z-10 border-t border-white/10 bg-[#080b14]/95 px-6 py-24 backdrop-blur-md">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-violet-300">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            <span>LET'S BUILD SOMETHING GREAT</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Get In Touch
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            I'm actively seeking Frontend Developer roles and internships.
            Whether you have an opportunity or just want to connect, my inbox is open!
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-5">
          {/* Left Column: Direct Info & Quick Copy */}
          <div className="space-y-4 md:col-span-2">
            <TiltCard glowColor="rgba(139, 92, 246, 0.25)" maxTilt={8} className="p-6 border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-400 shadow-inner">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Direct Email</h3>
                  <p className="text-xs text-slate-400">Preferred channel</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-black/40 p-3">
                <span className="truncate font-mono text-xs text-violet-300">
                  {directEmail}
                </span>
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={playHoverSound}
                  className="ml-2 flex items-center gap-1 rounded-lg bg-violet-600/30 px-2.5 py-1 text-xs text-violet-300 transition hover:bg-violet-600 hover:text-white"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-cyan-400" />
                  <span>Response time: Usually within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  <span>Availability: Remote or On-site</span>
                </div>
              </div>
            </TiltCard>

            {/* Social Links Card */}
            <TiltCard glowColor="rgba(6, 182, 212, 0.25)" maxTilt={8} className="p-6 border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Online Profiles
              </h3>
              <div className="mt-4 flex flex-col gap-2.5">
                <a
                  href="https://github.com/ushakalaivani"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  onMouseEnter={playHoverSound}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3 text-xs text-slate-300 transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon className="h-4 w-4 text-violet-400" />
                    <span>github.com/ushakalaivani</span>
                  </div>
                  <Sparkles className="h-3.5 w-3.5 text-slate-500" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  onMouseEnter={playHoverSound}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3 text-xs text-slate-300 transition hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedinIcon className="h-4 w-4 text-cyan-400" />
                    <span>LinkedIn Profile</span>
                  </div>
                  <Sparkles className="h-3.5 w-3.5 text-slate-500" />
                </a>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Holographic Interactive Message Form */}
          <div className="md:col-span-3">
            <TiltCard glowColor="rgba(168, 85, 247, 0.25)" maxTilt={6} className="p-7 border-white/10">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-violet-400" />
                  <h3 className="text-lg font-bold text-white">Send Direct Message</h3>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-mono text-emerald-400">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Ready to Connect</span>
                </div>
              </div>

              {formSubmitted ? (
                <div className="my-10 flex flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                    <Check className="h-8 w-8" />
                  </div>
                  <h4 className="mt-4 text-xl font-bold text-white">Message Prepared!</h4>
                  <p className="mt-2 max-w-sm text-xs text-slate-300">
                    Your default mail client is opening with your formatted message.
                    Thank you for reaching out!
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-6 rounded-xl bg-violet-600 px-5 py-2 text-xs font-semibold text-white transition hover:bg-violet-500"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Connor"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Frontend Opportunity / Project Inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Hi Usha, we reviewed your projects and would love to discuss an opportunity..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                    />
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={playHoverSound}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 text-xs font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:from-violet-500 hover:to-indigo-500 active:scale-[0.99]"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message via Email Client</span>
                  </button>
                </form>
              )}
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
