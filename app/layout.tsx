import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Usha Kalaivani | 3D Frontend Developer Portfolio",
  description:
    "Interactive 3D developer portfolio of Usha Kalaivani — MCA graduate & aspiring frontend developer skilled in Next.js, React, TypeScript, Three.js, and modern UI engineering.",
  keywords: [
    "Usha Kalaivani",
    "Frontend Developer",
    "3D Portfolio",
    "Three.js",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Web Developer",
    "MCA Graduate",
  ],
  authors: [{ name: "Usha Kalaivani" }],
  openGraph: {
    title: "Usha Kalaivani | 3D Frontend Developer Portfolio",
    description:
      "Interactive 3D developer portfolio of Usha Kalaivani — MCA graduate & aspiring frontend developer.",
    url: "https://usha-portfolionew.vercel.app/",
    siteName: "Usha Kalaivani 3D Portfolio",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#080b14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#080b14] text-white selection:bg-violet-500/30 selection:text-violet-200">
        {children}
      </body>
    </html>
  );
}
