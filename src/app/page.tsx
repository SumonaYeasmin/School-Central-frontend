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
  ChevronRight,
  GraduationCap,
  MessageSquare,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  Sparkles,
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
import { getStudents } from "@/src/services/studentService";
import { getTeachers } from "@/src/services/teacherService";
import { getClasses } from "@/src/services/academicService";
import { PublicResultModal } from "@/src/components/modules/home/PublicResultModal";
import { PublicFooter } from "@/src/components/modules/home/PublicFooter";
import { Teacher } from "@/src/types/teacher";

export default function HomePage() {
  const navLinks = [
    { label: "Home", href: "#home", active: true },
    { label: "About", href: "#about" },
    { label: "Academic", href: "#academic" },
    { label: "Teachers", href: "#teachers" },
    { label: "Notice", href: "#notice" },
    { label: "Result", href: "#result" },
    { label: "Contact", href: "#contact" },
  ];

  // Dynamic Database State
  const [totalStudents, setTotalStudents] = useState<number | null>(null);
  const [totalTeachers, setTotalTeachers] = useState<number | null>(null);
  const [totalClasses, setTotalClasses] = useState<number | null>(null);
  const [classesRange, setClassesRange] = useState<string>("6 - 10");
  const [sectionsDisplay, setSectionsDisplay] = useState<string>("A, B");
  const [dbTeachersList, setDbTeachersList] = useState<Teacher[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState<boolean>(true);

  // Fallback demo teachers if DB has none yet
  const fallbackTeachers = [
    {
      id: "tch-1",
      name: "Md. Rahman",
      subject: "Mathematics",
      image: "/images/teacher-1.jpg",
    },
    {
      id: "tch-2",
      name: "Farhana Akter",
      subject: "English",
      image: "/images/teacher-2.jpg",
    },
    {
      id: "tch-3",
      name: "Tanjina Islam",
      subject: "Science",
      image: "/images/teacher-3.jpg",
    },
    {
      id: "tch-4",
      name: "Abdul Karim",
      subject: "Bangla",
      image: "/images/teacher-4.jpg",
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
  const [searchValidationErr, setSearchValidationErr] = useState<string | null>(null);

  useEffect(() => {
    setIsLoadingStats(true);

    // 1. Fetch Students count from DB
    const fetchStudents = getStudents()
      .then((res: any) => {
        const list = Array.isArray(res) ? res : res?.data || [];
        setTotalStudents(list.length);
      })
      .catch((err) => console.error("Error loading students count:", err));

    // 2. Fetch Teachers count and list from DB
    const fetchTeachers = getTeachers()
      .then((res: any) => {
        const list = Array.isArray(res) ? res : res?.data || [];
        setTotalTeachers(list.length);
        if (list.length > 0) {
          setDbTeachersList(list);
        }
      })
      .catch((err) => console.error("Error loading teachers count:", err));

    // 3. Fetch Classes count and info from DB
    const fetchClasses = getClasses()
      .then((res: any) => {
        const list = Array.isArray(res) ? res : res?.data || [];
        setTotalClasses(list.length);
        if (list.length > 0) {
          const first = list[0]?.name || "1";
          const last = list[list.length - 1]?.name || "10";
          setClassesRange(`${first} - ${last}`);

          // Extract unique sections from classes
          const sectionSet = new Set<string>();
          list.forEach((cls: any) => {
            if (Array.isArray(cls.sections)) {
              cls.sections.forEach((sec: any) => {
                const secName = typeof sec === "string" ? sec : sec?.name;
                if (secName) sectionSet.add(secName.trim().toUpperCase());
              });
            }
          });
          if (sectionSet.size > 0) {
            setSectionsDisplay(Array.from(sectionSet).sort().join(", "));
          } else {
            setSectionsDisplay("A, B");
          }
        }
      })
      .catch((err) => console.error("Error loading classes count:", err));

    // 4. Fetch Exams for quick search dropdown
    const fetchExams = getExams()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setExams(data);
          const published = data.find((e) => e.status === "PUBLISHED");
          setQuickExamId(published ? published.id : data[0].id);
        }
      })
      .catch((err) => console.error("Error loading exams:", err));

    Promise.allSettled([fetchStudents, fetchTeachers, fetchClasses, fetchExams]).finally(
      () => {
        setIsLoadingStats(false);
      }
    );
  }, []);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickStudentId.trim()) {
      setSearchValidationErr("Please enter your Student ID or Roll number.");
      return;
    }
    setSearchValidationErr(null);
    setIsResultModalOpen(true);
  };

  // Dynamic 4 Stats Data
  const stats = [
    {
      id: "students",
      value: totalStudents !== null ? `${totalStudents}` : "1,250+",
      label: "Total Students",
      icon: Users,
      iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
    },
    {
      id: "teachers",
      value: totalTeachers !== null ? `${totalTeachers}` : "85+",
      label: "Teachers & Staff",
      icon: UserCheck,
      iconBg: "bg-indigo-50 text-indigo-600 border border-indigo-100",
    },
    {
      id: "classes",
      value: totalClasses !== null ? `${totalClasses}` : "10",
      label: `Classes (${classesRange})`,
      icon: BookOpen,
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    },
    {
      id: "established",
      value: "1998",
      label: "Established",
      icon: Calendar,
      iconBg: "bg-amber-50 text-amber-600 border border-amber-100",
    },
  ];

  // Teachers to render: DB teachers or fallback
  const displayTeachers =
    dbTeachersList.length > 0
      ? dbTeachersList.slice(0, 4).map((t, idx) => ({
          id: t.id || `tch-${idx}`,
          name: t.name,
          subject: t.department || t.designation || "Faculty",
          image: t.photo || `/images/teacher-${(idx % 4) + 1}.jpg`,
        }))
      : fallbackTeachers;

  return (
    <div className="min-h-screen bg-slate-50/40 font-sans flex flex-col selection:bg-blue-100 selection:text-blue-900 text-slate-800">
      {/* ================= 1. Top Navbar Header (Clean Glassmorphism) ================= */}
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-100/90 sticky top-0 z-50 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: School Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 rounded-full overflow-hidden border-2 border-blue-500/20 bg-white shrink-0 flex items-center justify-center shadow-xs">
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
                <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none">
                  Greenfield High School
                </h1>
                <span className="text-[11px] sm:text-xs text-blue-600 font-semibold tracking-wide mt-1">
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
                  className={`relative py-2 text-sm transition-all duration-200 ${
                    link.active
                      ? "text-blue-600 font-bold"
                      : "text-slate-600 hover:text-blue-600 font-medium"
                  }`}
                >
                  {link.label}
                  {link.active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right: Login Button */}
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button
                  type="button"
                  className="h-9 px-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-sm shadow-blue-500/25 transition-all cursor-pointer hover:shadow-md active:scale-95"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ================= 2. Hero Section (Soft Eye-Catching Atmosphere) ================= */}
      <section id="home" className="relative w-full overflow-hidden bg-white min-h-[580px] lg:min-h-[660px] flex items-center border-b border-slate-100 pb-12 sm:pb-16">
        {/* Background School Campus Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/greenfield-campus-clean.jpg"
            alt="Greenfield High School Campus"
            fill
            priority
            className="object-cover object-[75%_bottom] md:object-[68%_bottom] lg:object-[62%_bottom]"
          />

          {/* Left-only gradient for text contrast - Right half has 0% overlay (100% full photo clarity) */}
          <div className="absolute inset-y-0 left-0 w-full sm:w-[65%] md:w-[50%] lg:w-[45%] bg-gradient-to-r from-white via-white/95 via-75% to-transparent" />
        </div>

        {/* Hero Left Content Container */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/95 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold mb-6 shadow-2xs">
              <School className="h-3.5 w-3.5 text-blue-600" />
              <span>Welcome to Greenfield High School</span>
            </div>

            {/* Big Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Quality Education <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">
                for a Better Tomorrow
              </span>
            </h2>

            {/* Paragraph Description */}
            <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed max-w-lg">
              We are committed to providing quality education, building strong character and creating future leaders through knowledge, discipline and moral values.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              {/* Blue Gradient Pill Button */}
              <button
                type="button"
                className="h-11 px-7 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-sm flex items-center gap-2 shadow-md shadow-blue-600/25 transition-all cursor-pointer active:scale-95 hover:shadow-lg"
              >
                <span>Explore Our School</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Outlined Pill Button */}
              <button
                type="button"
                onClick={() => setIsResultModalOpen(true)}
                className="h-11 px-6 rounded-full bg-white/90 hover:bg-blue-50/60 border border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-600 font-semibold text-sm flex items-center gap-2 shadow-2xs transition-all cursor-pointer active:scale-95"
              >
                <span>View Result</span>
                <FileSpreadsheet className="h-4 w-4 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. Floating Stats Bar (Dynamic Database Connected) ================= */}
      <section className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 mb-10 w-full">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40 p-6 sm:p-7 backdrop-blur-sm">
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
                    className={`h-12 w-12 sm:h-14 sm:w-14 rounded-2xl ${stat.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}
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

      {/* ================= 4. About Our School Section (Clean & Institutional) ================= */}
      <section id="about" className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left Column: Story, Mission & Vision, Read More */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold shadow-2xs">
                <School className="h-3.5 w-3.5 text-blue-600" />
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

              {/* Institutional Codes & Accreditation Badges (Clean Soft Badges) */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50/90 border border-blue-200/70 text-xs font-bold text-blue-700 shadow-2xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                  <span>EIIN: 132456</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50/90 border border-amber-200/70 text-xs font-bold text-amber-700 shadow-2xs">
                  <Award className="h-3.5 w-3.5 text-amber-600" />
                  <span>School Code: 4021</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50/90 border border-emerald-200/70 text-xs font-bold text-emerald-700 shadow-2xs">
                  <GraduationCap className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Dinajpur Board</span>
                </div>
              </div>

              {/* Mission & Vision 2-Column Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Our Mission */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-emerald-50/30 hover:border-emerald-200/60 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
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
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-blue-50/30 hover:border-blue-200/60 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
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
                    className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white/95 backdrop-blur-xs text-blue-600 hover:text-blue-700 hover:scale-110 shadow-2xl flex items-center justify-center transition-all cursor-pointer group/btn"
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-semibold shadow-2xs">
                <School className="h-3.5 w-3.5 text-blue-600" />
                <span>Academic Information</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Classes & Subjects
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                We offer classes from {classesRange} with a well-structured curriculum and a wide range of subjects to ensure holistic development of our students.
              </p>
            </div>

            {/* Right Column: Academic Card with 4 Info Grid + Study Books Photo */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-lg shadow-slate-100 p-6 sm:p-7 flex flex-col md:flex-row items-center gap-6">
                {/* 2x2 Info Grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-6 flex-1 w-full">
                  {/* Classes */}
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 shadow-2xs">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500">Classes</p>
                      <p className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                        {classesRange}
                      </p>
                    </div>
                  </div>

                  {/* Sections */}
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0 shadow-2xs">
                      <Layers className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500">Sections</p>
                      <p className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                        {sectionsDisplay}
                      </p>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0 shadow-2xs">
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
                    <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 shadow-2xs">
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
      <section id="notice" className="py-14 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 1. Left Card: Latest Notices */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100/80 p-6 sm:p-7 flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
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
                      className="py-3.5 flex items-center gap-4 hover:bg-slate-50/80 rounded-xl px-2.5 transition-colors cursor-pointer group"
                    >
                      {/* Date Badge */}
                      <div className="flex flex-col items-center justify-center w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/80 shrink-0 text-center group-hover:border-blue-200 group-hover:bg-blue-50/50 transition-colors">
                        <span className="text-sm font-black text-slate-800 leading-none group-hover:text-blue-600">
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
            <div id="result" className="bg-white rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100/80 p-6 sm:p-7 flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      Student Result
                    </h3>
                  </div>
                </div>

                {/* Promo Card: Check Your Result */}
                <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-blue-50/60 border border-blue-100/80 flex items-center gap-3.5">
                  <div className="h-11 w-11 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
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
                        <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-blue-100">
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
                        onChange={(e) => {
                          setQuickStudentId(e.target.value);
                          if (searchValidationErr) setSearchValidationErr(null);
                        }}
                        className={`h-10 rounded-xl text-xs sm:text-sm bg-white focus:ring-2 ${
                          searchValidationErr
                            ? "border-rose-300 focus:ring-rose-100"
                            : "border-slate-200 focus:ring-blue-100"
                        }`}
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
                        <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-blue-100">
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

                  {/* Validation Error Message */}
                  {searchValidationErr && (
                    <p className="text-xs font-semibold text-rose-600 flex items-center gap-1.5">
                      <span>• {searchValidationErr}</span>
                    </p>
                  )}

                  {/* Search Result Button */}
                  <Button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
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

      {/* ================= 7. Our Teachers Section (Dynamic DB / Fallback) ================= */}
      <section id="teachers" className="py-14 sm:py-20 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md shadow-slate-100/80 p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Our Teachers
                </h3>
              </div>

              <Link
                href="#teachers-all"
                className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
              >
                <span>View All</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Teachers 4-Card Grid with Right Carousel Arrow */}
            <div className="relative">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {displayTeachers.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white rounded-2xl border border-slate-200/70 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1.5"
                  >
                    {/* Portrait Photo */}
                    <div className="relative h-44 sm:h-52 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-3.5 sm:p-4 text-center bg-white border-t border-slate-100">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate px-1">
                        {t.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5 truncate px-1">
                        {t.subject}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Carousel Arrow Indicator */}
              <button
                type="button"
                className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-400 hover:text-blue-600 hover:scale-110 transition-all cursor-pointer z-10"
                title="Next Teachers"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 8. Get In Touch & Contact Banner (Soft Eye-Catching Institutional Palette) ================= */}
      <section id="contact" className="py-14 sm:py-18 bg-gradient-to-b from-white via-slate-50 to-blue-50/20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Showcase Card with Radiant Subtle Styling */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
            {/* Soft Ambient Light Glow in background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left: Heading, Intro & Instant WhatsApp CTA */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold backdrop-blur-xs">
                  <MessageSquare className="h-3.5 w-3.5 text-blue-400" />
                  <span>Get In Touch</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  We&apos;d love to hear from you!
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-lg">
                  Have questions regarding admissions, academics, or school activities? Reach out to us directly or start a quick WhatsApp chat.
                </p>

                {/* Instant WhatsApp Action Button with Ping Light */}
                <div className="pt-2">
                  <a
                    href="https://wa.me/8801712345678?text=Hello%20Greenfield%20High%20School%2C%20I%20have%20an%20inquiry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#25D366]/30 transition-all active:scale-95 cursor-pointer group"
                  >
                    <svg className="h-4 w-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>Chat on WhatsApp</span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                  </a>
                </div>
              </div>

              {/* Right: Contact Details 4 Frosted-Glass Cards */}
              <div className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Address Card */}
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="h-10 w-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        Campus Address
                      </p>
                      <p className="text-xs sm:text-sm text-white mt-1 font-semibold leading-snug">
                        Dinajpur, Bangladesh
                      </p>
                    </div>
                  </div>

                  {/* Phone Call Card */}
                  <a
                    href="tel:+8801712345678"
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-400/40 transition-colors group cursor-pointer"
                  >
                    <div className="h-10 w-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        Helpline Call
                      </p>
                      <p className="text-xs sm:text-sm text-white mt-1 font-semibold group-hover:text-blue-300 transition-colors">
                        +880 1712 345678
                      </p>
                    </div>
                  </a>

                  {/* WhatsApp Chat Card */}
                  <a
                    href="https://wa.me/8801712345678?text=Hello%20Greenfield%20High%20School%2C%20I%20have%20an%20inquiry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 hover:border-[#25D366]/40 transition-colors group cursor-pointer"
                  >
                    <div className="h-10 w-10 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                          WhatsApp Chat
                        </p>
                        <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#25D366]/20 text-[#25D366]">
                          Online
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-emerald-300 mt-1 font-semibold group-hover:text-emerald-200 transition-colors">
                        Instant Live Support
                      </p>
                    </div>
                  </a>

                  {/* Email Card */}
                  <a
                    href="mailto:info@greenfieldhs.edu.bd"
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-400/40 transition-colors group cursor-pointer"
                  >
                    <div className="h-10 w-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        Official Email
                      </p>
                      <p className="text-xs sm:text-sm text-white mt-1 font-semibold break-all group-hover:text-blue-300 transition-colors">
                        info@greenfieldhs.edu.bd
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 9. Bottom Footer ================= */}
      <PublicFooter onOpenResultModal={() => setIsResultModalOpen(true)} />

      {/* Online Result Modal Popup */}
      <PublicResultModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        initialStudentQuery={quickStudentId}
        initialExamId={quickExamId}
      />
    </div>
  );
}
