"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Clock,
  ArrowUp,
  ChevronRight,
} from "lucide-react";

interface PublicFooterProps {
  onOpenResultModal?: () => void;
}

export function PublicFooter({ onOpenResultModal }: PublicFooterProps) {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-slate-800/80 overflow-hidden select-none">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* ================= Main Footer 4-Column Grid ================= */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: School Identity & Social (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-blue-500/40 bg-white p-0.5 shrink-0 shadow-md">
                <Image
                  src="/images/school-logo.png"
                  alt="Greenfield High School Logo"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-tight">
                  Greenfield High School
                </h3>
                <p className="text-xs text-blue-400 font-semibold tracking-wide">
                  Knowledge • Discipline • Excellence
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              Committed to nurturing future leaders through modern education, moral values, and academic excellence since 1998.
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Connect With Us
              </p>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-xl bg-[#1877F2]/15 border border-[#1877F2]/30 hover:bg-[#1877F2] text-[#1877F2] hover:text-white flex items-center justify-center transition-all hover:scale-105"
                  title="Facebook Page"
                  aria-label="Facebook Page"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-xl bg-[#FF0000]/15 border border-[#FF0000]/30 hover:bg-[#FF0000] text-[#FF0000] hover:text-white flex items-center justify-center transition-all hover:scale-105"
                  title="YouTube Channel"
                  aria-label="YouTube Channel"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-xl bg-pink-500/15 border border-pink-500/30 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-pink-400 hover:text-white flex items-center justify-center transition-all hover:scale-105"
                  title="Instagram"
                  aria-label="Instagram"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/8801712345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 hover:bg-[#25D366] text-[#25D366] hover:text-white flex items-center justify-center transition-all hover:scale-105"
                  title="WhatsApp Support"
                  aria-label="WhatsApp Support"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="#home" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="#academic" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  <span>Academics</span>
                </Link>
              </li>
              <li>
                <Link href="#teachers" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  <span>Faculty & Teachers</span>
                </Link>
              </li>
              <li>
                <Link href="#notice" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  <span>Notice Board</span>
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  <span>Get In Touch</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Student & Parent Corner / Portals (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Student & Academic Hub
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={onOpenResultModal}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-left cursor-pointer group"
                >
                  <ChevronRight className="h-3 w-3 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  <span>Online Exam Result</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-bold">
                    Fast
                  </span>
                </button>
              </li>
              <li>
                <Link href="/login" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  <span>Student & Parent Portal</span>
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  <span>Teacher & Staff Login</span>
                </Link>
              </li>
              <li>
                <Link href="#notice" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  <span>Exam Routine & Syllabus</span>
                </Link>
              </li>
              <li>
                <Link href="#academic" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 group">
                  <ChevronRight className="h-3 w-3 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  <span>Admission Guidelines</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Location & Office Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Campus & Office
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Dinajpur Sadar, Dinajpur - 5200, Bangladesh</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                <a
                  href="mailto:info@greenfieldhs.edu.bd"
                  className="hover:text-blue-400 transition-colors"
                >
                  info@greenfieldhs.edu.bd
                </a>
              </div>

              {/* Office Hours */}
              <div className="flex items-start gap-2.5 pt-1 border-t border-slate-800/60">
                <Clock className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-300">Office Working Hours:</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Sun – Thu: 8:30 AM – 4:00 PM
                  </p>
                  <p className="text-[10px] text-slate-400">
                    (Friday & Govt. Holidays Closed)
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================= Bottom Copyright & Legal Links ================= */}
      <div className="border-t border-slate-900 bg-slate-950">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            {/* Copyright */}
            <p className="text-center sm:text-left">
              © 2026 <span className="text-slate-300 font-semibold">Greenfield High School</span>. All rights reserved.
            </p>

            {/* Legal Links & Scroll to top */}
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="#" className="hover:text-slate-300 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-slate-700">•</span>
              <Link href="#" className="hover:text-slate-300 transition-colors">
                Terms of Service
              </Link>
              <span className="text-slate-700">•</span>

              {/* Back to top button */}
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold cursor-pointer group"
                title="Scroll back to top"
              >
                <span>Back to Top</span>
                <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
