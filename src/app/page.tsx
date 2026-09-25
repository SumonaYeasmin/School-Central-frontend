"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  FileSpreadsheet,
  School,
  Users,
  UserCheck,
  BookOpen,
  Calendar,
  CheckCircle2,
  Compass,
  Play,
  Layers,
  FileText,
  Bell,
  Award,
  ChevronRight,
  Loader2,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { getExams, ExamItem } from "@/src/services/examService";
import { getStudentExamResult } from "@/src/services/resultService";
import { PublicResultModal } from "@/src/components/modules/home/PublicResultModal";

export default function HomePage() {
  const navLinks = [
    { label: "Home", href: "#home", active: true },
    { label: "About", href: "#about" },
    { label: "Academic", href: "#academic" },
    { label: "Teachers", href: "#teachers" },
    { label: "Students", href: "#students" },
    { label: "Notice", href: "#notice" },
    { label: "Result", href: "#result" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  const stats = [
    {
      id: "students",
      value: "1,250+",
      label: "Total Students",
      icon: Users,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      id: "teachers",
      value: "85+",
      label: "Teachers & Staff",
      icon: UserCheck,
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      id: "classes",
      value: "10",
      label: "Classes (6 - 10)",
      icon: BookOpen,
      iconBg: "bg-purple-50 text-purple-600",
    },
    {
      id: "established",
      value: "1998",
      label: "Established",
      icon: Calendar,
      iconBg: "bg-purple-50 text-purple-600",
    },
  ];

  const notices = [
    {
      id: "not-1",
      day: "12",
      month: "Sep",
      title: "Half Yearly Examination Notice",
      description: "Examination will be held from 25 September 2026...",
    },
    {
      id: "not-2",
      day: "10",
      month: "Sep",
      title: "School Holiday Notice",
      description: "School will remain closed on 15 September 2026...",
    },
    {
      id: "not-3",
      day: "05",
      month: "Sep",
      title: "Parent Meeting Notice",
      description: "All parents are requested to attend the meeting...",
    },
    {
      id: "not-4",
      day: "02",
      month: "Sep",
      title: "Annual Sports Day Notice",
      description: "Sports Day will be held on 20 September 2026...",
    },
  ];

  // State for result modal and quick search widget
  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false);
  const [exams, setExams] = useState<ExamItem[]>([]);
  const [quickExamId, setQuickExamId] = useState<string>("");
  const [quickStudentId, setQuickStudentId] = useState<string>("");
  const [quickYear, setQuickYear] = useState<string>("2026");
  const [isSearchingResult, setIsSearchingResult] = useState<boolean>(false);

  useEffect(() => {
    getExams()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setExams(data);
          const published = data.find((e) => e.status === "PUBLISHED");
          setQuickExamId(published ? published.id : data[0].id);
        }
      })
      .catch((err) => console.error("Error loading exams:", err));
  }, []);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsResultModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* ================= 1. Top Navbar Header ================= */}
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
                  onClick={(e) => {
                    if (link.label === "Result") {
                      e.preventDefault();
                      setIsResultModalOpen(true);
                    }
                  }}
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
                onClick={() => setIsResultModalOpen(true)}
                className="p-2.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Search Result"
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

      {/* ================= 2. Hero Section ================= */}
      <section id="home" className="relative w-full overflow-hidden bg-white min-h-[540px] lg:min-h-[600px] flex items-center">
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
                onClick={() => setIsResultModalOpen(true)}
                className="h-11 px-6 rounded-full bg-white/80 hover:bg-white border border-blue-600 text-blue-600 font-semibold text-sm flex items-center gap-2 shadow-2xs transition-all cursor-pointer active:scale-95"
              >
                <span>View Result</span>
                <FileSpreadsheet className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. Floating Stats Bar ================= */}
      <section className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 mb-10 w-full">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-100 p-6 sm:p-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className={`flex items-center gap-4 ${
                    idx > 0 ? "pt-4 md:pt-0 md:pl-6" : ""
                  }`}
                >
                  <div
                    className={`h-12 w-12 sm:h-14 sm:w-14 rounded-2xl ${stat.iconBg} flex items-center justify-center shrink-0 shadow-xs`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 4. About Our School Section ================= */}
      <section id="about" className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left Column: Story, Mission & Vision, Read More */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-600 text-xs sm:text-sm font-semibold shadow-2xs">
                <School className="h-3.5 w-3.5" />
                <span>About Our School</span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                A Legacy of Excellence
              </h2>

              {/* Description Paragraph */}
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                Greenfield High School was established in 1998 with a vision to provide quality education to every student. Over the years, we have grown into a trusted institution known for academic excellence, discipline and a supportive learning environment.
              </p>

              {/* Mission & Vision 2-Column Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Our Mission */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-5 w-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Our Mission
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      To provide quality education and develop responsible citizens.
                    </p>
                  </div>
                </div>

                {/* Our Vision */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Compass className="h-5 w-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Our Vision
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      To be a leading educational institution in the region.
                    </p>
                  </div>
                </div>
              </div>

              {/* Read More Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  className="h-11 px-7 rounded-full bg-white hover:bg-blue-50/60 border border-blue-600 text-blue-600 font-semibold text-sm inline-flex items-center gap-2 shadow-2xs transition-all cursor-pointer active:scale-95"
                >
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Column: School Campus Photo with Video Play & Overlay Text */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 group">
              {/* Photo */}
              <div className="relative h-[340px] sm:h-[400px] lg:h-[440px] w-full">
                <Image
                  src="/images/about-students.jpg"
                  alt="Students at Greenfield High School Campus"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />

                {/* Center Video Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white/90 backdrop-blur-xs text-blue-600 hover:text-blue-700 hover:scale-110 shadow-2xl flex items-center justify-center transition-all cursor-pointer group/btn"
                    title="Watch Campus Video"
                  >
                    <Play className="h-6 w-6 fill-current ml-1 group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>

                {/* Bottom Right Handwritten Text Overlay */}
                <div className="absolute bottom-5 right-6 text-right select-none pointer-events-none">
                  <div className="font-serif italic font-normal text-white text-2xl sm:text-3xl lg:text-4xl tracking-wide leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    <span>Learn</span> <br />
                    <span className="text-white/95">Grow</span> <br />
                    <span className="text-white">Succeed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. Academic Information (Classes & Subjects) Section ================= */}
      <section id="academic" className="py-14 sm:py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading & Intro */}
            <div className="lg:col-span-5 space-y-5">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-600 text-xs sm:text-sm font-semibold shadow-2xs">
                <School className="h-3.5 w-3.5" />
                <span>Academic Information</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Classes & Subjects
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                We offer classes from 6 to 10 with a well-structured curriculum and a wide range of subjects to ensure holistic development of our students.
              </p>

              {/* Action Button */}
              <div className="pt-1">
                <button
                  type="button"
                  className="h-11 px-7 rounded-full bg-white hover:bg-blue-50/60 border border-blue-600 text-blue-600 font-semibold text-sm inline-flex items-center gap-2 shadow-2xs transition-all cursor-pointer active:scale-95"
                >
                  <span>View Academic Details</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Academic Card with 4 Info Grid + Study Books Photo */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100 p-6 sm:p-7 flex flex-col md:flex-row items-center gap-6">
                {/* 2x2 Info Grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-6 flex-1 w-full">
                  {/* Classes */}
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500">Classes</p>
                      <p className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                        6 - 10
                      </p>
                    </div>
                  </div>

                  {/* Sections */}
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Layers className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500">Sections</p>
                      <p className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                        A, B, C
                      </p>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500">Subjects</p>
                      <p className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                        Science / Arts / Commerce
                      </p>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                        (Grade 9-10)
                      </p>
                    </div>
                  </div>

                  {/* Academic Year */}
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500">Academic Year</p>
                      <p className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                        2026
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Books and Pencils Image */}
                <div className="relative w-full md:w-[200px] lg:w-[230px] h-[170px] sm:h-[185px] rounded-2xl overflow-hidden shrink-0 border border-slate-100 shadow-2xs">
                  <Image
                    src="/images/academic-books.jpg"
                    alt="Academic Study Books and Colored Pencils"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. Latest Notices & Student Result Dual Section ================= */}
      <section id="notice" className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 1. Left Card: Latest Notices */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Bell className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      Latest Notices
                    </h3>
                  </div>

                  <Link
                    href="#notices-all"
                    className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                  >
                    <span>View All</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                {/* Notices List */}
                <div className="divide-y divide-slate-100">
                  {notices.map((n) => (
                    <div
                      key={n.id}
                      className="py-3.5 flex items-center gap-4 hover:bg-slate-50/70 rounded-xl px-2 transition-colors cursor-pointer group"
                    >
                      {/* Date Badge */}
                      <div className="flex flex-col items-center justify-center w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 shrink-0 text-center">
                        <span className="text-sm font-black text-slate-800 leading-none">
                          {n.day}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase mt-0.5">
                          {n.month}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-teal-500 shrink-0" />
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                            {n.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5 pl-3.5">
                          {n.description}
                        </p>
                      </div>

                      {/* Chevron Arrow */}
                      <div className="text-slate-300 group-hover:text-blue-600 transition-colors shrink-0">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Right Card: Student Result Search */}
            <div id="result" className="bg-white rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      Student Result
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsResultModalOpen(true)}
                    className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group cursor-pointer"
                  >
                    <span>View Result</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* Promo Card: Check Your Result */}
                <div className="mt-4 p-4 rounded-2xl bg-blue-50/70 border border-blue-100/80 flex items-center gap-3.5">
                  <div className="h-11 w-11 rounded-2xl bg-blue-600/15 text-blue-600 flex items-center justify-center shrink-0">
                    <div className="h-6 w-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                      <FileSpreadsheet className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Check Your Result
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      View your exam result quickly and easily.
                    </p>
                  </div>
                </div>

                {/* Form Inputs Grid: Select Exam, Roll/Student ID, Year */}
                <form onSubmit={handleQuickSearch} className="mt-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    {/* Select Exam */}
                    <div className="sm:col-span-5 space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">
                        Select Exam
                      </label>
                      <Select
                        value={quickExamId}
                        onValueChange={setQuickExamId}
                      >
                        <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 text-xs sm:text-sm bg-white">
                          <SelectValue placeholder="Choose exam" />
                        </SelectTrigger>
                        <SelectContent>
                          {exams.map((ex) => (
                            <SelectItem key={ex.id} value={ex.id}>
                              {ex.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Roll / Student ID */}
                    <div className="sm:col-span-4 space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">
                        Roll / Student ID
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter roll or student ID"
                        value={quickStudentId}
                        onChange={(e) => setQuickStudentId(e.target.value)}
                        className="h-10 rounded-xl border-slate-200 text-xs sm:text-sm bg-white"
                      />
                    </div>

                    {/* Year */}
                    <div className="sm:col-span-3 space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">
                        Year
                      </label>
                      <Select
                        value={quickYear}
                        onValueChange={setQuickYear}
                      >
                        <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 text-xs sm:text-sm bg-white">
                          <SelectValue placeholder="2026" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2026">2026</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2024">2024</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Search Result Button */}
                  <Button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    <Search className="h-4 w-4" />
                    <span>Search Result</span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Result Modal Popup */}
      <PublicResultModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
      />
    </div>
  );
}
