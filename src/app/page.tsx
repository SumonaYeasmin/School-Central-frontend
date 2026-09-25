"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, FileSpreadsheet, School } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function HomePage() {
  const navLinks = [
    { label: "Home", href: "#", active: true },
    { label: "About", href: "#" },
    { label: "Academic", href: "#" },
    { label: "Teachers", href: "#" },
    { label: "Students", href: "#" },
    { label: "Notice", href: "#" },
    { label: "Result", href: "#" },
    { label: "Gallery", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* 1. Top Navbar Header */}
      <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: School Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 rounded-full overflow-hidden border border-slate-200 bg-white shrink-0 flex items-center justify-center shadow-xs">
                <Image
                  src="/images/school-logo.png"
                  alt="Greenfield High School Logo"
                  width={44}
                  height={44}
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex flex-col">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none">
                  Greenfield High School
                </h1>
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-1">
                  Knowledge • Discipline • Excellence
                </span>
              </div>
            </div>

            {/* Center: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-2 text-sm transition-colors ${
                    link.active
                      ? "text-blue-600 font-semibold"
                      : "text-slate-600 hover:text-slate-900 font-medium"
                  }`}
                >
                  {link.label}
                  {link.active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right: Search Icon & Login Button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="p-2.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Search"
              >
                <Search className="h-4 w-4" />
              </button>

              <Button
                type="button"
                className="h-9 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-xs transition-all cursor-pointer"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative w-full flex-1 overflow-hidden bg-white min-h-[560px] lg:min-h-[620px] flex items-center">
        {/* Background School Campus Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-campus.jpg"
            alt="School Campus"
            fill
            priority
            className="object-cover object-right lg:object-[80%_center]"
          />

          {/* Left-to-right soft white gradient blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-45% md:via-40% to-white/10 lg:to-transparent" />
        </div>

        {/* Hero Left Content Container */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-600 text-xs sm:text-sm font-semibold mb-6 shadow-2xs">
              <School className="h-3.5 w-3.5" />
              <span>Welcome to Greenfield High School</span>
            </div>

            {/* Big Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Quality Education <br />
              for a Better Tomorrow
            </h2>

            {/* Paragraph Description */}
            <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed max-w-lg">
              We are committed to providing quality education, building strong character and creating future leaders through knowledge, discipline and moral values.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              {/* Blue Pill Button */}
              <button
                type="button"
                className="h-11 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center gap-2 shadow-md shadow-blue-600/25 transition-all cursor-pointer active:scale-95"
              >
                <span>Explore Our School</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Outlined Pill Button */}
              <button
                type="button"
                className="h-11 px-6 rounded-full bg-white/80 hover:bg-white border border-blue-600 text-blue-600 font-semibold text-sm flex items-center gap-2 shadow-2xs transition-all cursor-pointer active:scale-95"
              >
                <span>View Result</span>
                <FileSpreadsheet className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
