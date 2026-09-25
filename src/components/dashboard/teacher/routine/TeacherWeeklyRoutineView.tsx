"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  BookOpen,
  School,
  Sparkles,
  Printer,
  ChevronRight,
  CalendarDays,
  Coffee,
  Flame,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  getMyRoutine,
  TeacherRoutineResponse,
  TeacherScheduleSlot,
} from "@/src/services/routineService";

// Standard 5 School Working Days (Friday & Saturday are Weekend / Off-Days)
const DAYS_OF_WEEK = [
  { key: "SUNDAY", title: "Sunday", bangla: "রবিবার", dotColor: "bg-blue-600 shadow-blue-500/50" },
  { key: "MONDAY", title: "Monday", bangla: "সোমবার", dotColor: "bg-indigo-600 shadow-indigo-500/50" },
  { key: "TUESDAY", title: "Tuesday", bangla: "মঙ্গলবার", dotColor: "bg-emerald-600 shadow-emerald-500/50" },
  { key: "WEDNESDAY", title: "Wednesday", bangla: "বুধবার", dotColor: "bg-amber-600 shadow-amber-500/50" },
  { key: "THURSDAY", title: "Thursday", bangla: "বৃহস্পতিবার", dotColor: "bg-rose-600 shadow-rose-500/50" },
];

const PERIOD_SLOTS = [
  { key: "p1" as const, label: "Period 1", time: "10:00–11:00" },
  { key: "p2" as const, label: "Period 2", time: "11:00–12:00" },
  { key: "p3" as const, label: "Period 3", time: "12:00–1:00" },
  { key: "p4" as const, label: "Period 4", time: "2:00–3:00" },
  { key: "p5" as const, label: "Period 5", time: "3:00–4:00" },
];

const morningPeriods = PERIOD_SLOTS.slice(0, 3); // p1, p2, p3
const afternoonPeriods = PERIOD_SLOTS.slice(3); // p4, p5

// Curated vibrant theme styles for each subject type
interface SubjectTheme {
  cardBg: string;
  borderColor: string;
  borderAccent: string;
  titleColor: string;
  classPill: string;
  roomPill: string;
}

const THEME_PRESETS: Record<string, SubjectTheme> = {
  // Mathematics & Higher Math: Crisp Royal Indigo
  math: {
    cardBg: "bg-gradient-to-br from-blue-50 via-sky-50/80 to-indigo-50/60",
    borderColor: "border-blue-200 hover:border-blue-400",
    borderAccent: "border-l-[5px] border-l-blue-600",
    titleColor: "text-blue-950 font-black",
    classPill: "text-blue-800 font-extrabold",
    roomPill: "bg-white text-blue-900 border border-blue-200 shadow-2xs",
  },
  // Science / Physics / Chemistry / Biology: Fresh Emerald & Mint
  science: {
    cardBg: "bg-gradient-to-br from-emerald-50 via-teal-50/80 to-green-50/60",
    borderColor: "border-emerald-200 hover:border-emerald-400",
    borderAccent: "border-l-[5px] border-l-emerald-600",
    titleColor: "text-emerald-950 font-black",
    classPill: "text-emerald-800 font-extrabold",
    roomPill: "bg-white text-emerald-900 border border-emerald-200 shadow-2xs",
  },
  // Bangla & Literature: Warm Golden Amber
  bangla: {
    cardBg: "bg-gradient-to-br from-amber-50 via-orange-50/80 to-yellow-50/60",
    borderColor: "border-amber-200 hover:border-amber-400",
    borderAccent: "border-l-[5px] border-l-amber-500",
    titleColor: "text-amber-950 font-black",
    classPill: "text-amber-900 font-extrabold",
    roomPill: "bg-white text-amber-900 border border-amber-200 shadow-2xs",
  },
  // English: Rich Lavender & Electric Violet
  english: {
    cardBg: "bg-gradient-to-br from-purple-50 via-violet-50/80 to-indigo-50/60",
    borderColor: "border-purple-200 hover:border-purple-400",
    borderAccent: "border-l-[5px] border-l-purple-600",
    titleColor: "text-purple-950 font-black",
    classPill: "text-purple-800 font-extrabold",
    roomPill: "bg-white text-purple-900 border border-purple-200 shadow-2xs",
  },
  // ICT & Computer Science: Vivid Cyan & Sky
  ict: {
    cardBg: "bg-gradient-to-br from-cyan-50 via-sky-50/80 to-blue-50/60",
    borderColor: "border-cyan-200 hover:border-cyan-400",
    borderAccent: "border-l-[5px] border-l-cyan-600",
    titleColor: "text-cyan-950 font-black",
    classPill: "text-cyan-800 font-extrabold",
    roomPill: "bg-white text-cyan-900 border border-cyan-200 shadow-2xs",
  },
  // Social Science / History / Geography: Vibrant Coral & Rose
  social: {
    cardBg: "bg-gradient-to-br from-rose-50 via-pink-50/80 to-red-50/60",
    borderColor: "border-rose-200 hover:border-rose-400",
    borderAccent: "border-l-[5px] border-l-rose-500",
    titleColor: "text-rose-950 font-black",
    classPill: "text-rose-800 font-extrabold",
    roomPill: "bg-white text-rose-900 border border-rose-200 shadow-2xs",
  },
  // Religion & Values: Peaceful Teal & Aquamarine
  religion: {
    cardBg: "bg-gradient-to-br from-teal-50 via-emerald-50/80 to-cyan-50/60",
    borderColor: "border-teal-200 hover:border-teal-400",
    borderAccent: "border-l-[5px] border-l-teal-600",
    titleColor: "text-teal-950 font-black",
    classPill: "text-teal-800 font-extrabold",
    roomPill: "bg-white text-teal-900 border border-teal-200 shadow-2xs",
  },
  // Commerce & Business: Deep Royal Navy
  commerce: {
    cardBg: "bg-gradient-to-br from-indigo-50 via-slate-50/80 to-blue-50/60",
    borderColor: "border-indigo-200 hover:border-indigo-400",
    borderAccent: "border-l-[5px] border-l-indigo-600",
    titleColor: "text-indigo-950 font-black",
    classPill: "text-indigo-800 font-extrabold",
    roomPill: "bg-white text-indigo-900 border border-indigo-200 shadow-2xs",
  },
  // Physical Ed & Arts: Warm Tangerine
  physical: {
    cardBg: "bg-gradient-to-br from-orange-50 via-amber-50/80 to-yellow-50/60",
    borderColor: "border-orange-200 hover:border-orange-400",
    borderAccent: "border-l-[5px] border-l-orange-500",
    titleColor: "text-orange-950 font-black",
    classPill: "text-orange-900 font-extrabold",
    roomPill: "bg-white text-orange-900 border border-orange-200 shadow-2xs",
  },
};

function getSubjectTheme(name: string): SubjectTheme {
  const s = (name || "").toLowerCase();
  if (s.includes("উচ্চতর গণিত") || s.includes("গণিত") || s.includes("math")) return THEME_PRESETS.math;
  if (
    s.includes("পদার্থ") ||
    s.includes("রসায়ন") ||
    s.includes("জীব") ||
    s.includes("বিজ্ঞান") ||
    s.includes("physics") ||
    s.includes("chemistry") ||
    s.includes("biology") ||
    s.includes("science")
  )
    return THEME_PRESETS.science;
  if (s.includes("english") || s.includes("grammar") || s.includes("composition")) return THEME_PRESETS.english;
  if (s.includes("ict") || s.includes("তথ্য ও যোগাযোগ") || s.includes("কম্পিউটার")) return THEME_PRESETS.ict;
  if (s.includes("বাংলা") || s.includes("bangla") || s.includes("সাহিত্য") || s.includes("ব্যাকরণ") || s.includes("কণিকা") || s.includes("সপ্তবর্ণা"))
    return THEME_PRESETS.bangla;
  if (s.includes("বাংলাদেশ") || s.includes("ইতিহাস") || s.includes("ভূগোল") || s.includes("bgs") || s.includes("পৌরনীতি") || s.includes("অর্থনীতি"))
    return THEME_PRESETS.social;
  if (s.includes("ধর্ম") || s.includes("নৈতিক") || s.includes("ইসলাম") || s.includes("হিন্দু") || s.includes("religion") || s.includes("আরবি"))
    return THEME_PRESETS.religion;
  if (s.includes("হিসাববিজ্ঞান") || s.includes("ফিন্যান্স") || s.includes("ব্যবসায়") || s.includes("কর্ম") || s.includes("accounting") || s.includes("business"))
    return THEME_PRESETS.commerce;
  if (s.includes("শারীরিক") || s.includes("চারু") || s.includes("খেলাধুলা") || s.includes("গার্হস্থ্য") || s.includes("কৃষি") || s.includes("সংগীত"))
    return THEME_PRESETS.physical;
  return THEME_PRESETS.math;
}

function getPeriodKeyFromTime(startTime: string): "p1" | "p2" | "p3" | "p4" | "p5" {
  const hour = parseInt(startTime.split(":")[0], 10);
  if (hour <= 10) return "p1";
  if (hour === 11) return "p2";
  if (hour === 12) return "p3";
  if (hour === 14) return "p4";
  return "p5";
}

export function TeacherWeeklyRoutineView() {
  const [routineData, setRoutineData] = useState<TeacherRoutineResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchRoutine();
  }, []);

  useEffect(() => {
    fetchRoutine();
  }, []);

  const fetchRoutine = async () => {
    try {
      setIsLoading(true);
      let userEmail = "";
      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("userInfo");
          if (stored) {
            const parsed = JSON.parse(stored);
            userEmail = parsed.email || "";
          }
        } catch {}
      }

      const res = await getMyRoutine(userEmail || undefined);
      if (res) {
        setRoutineData(res);
      }
    } catch (err) {
      console.error("Error fetching teacher weekly routine:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const weeklySchedule = routineData?.weeklySchedule || {};
  const totalClasses = routineData?.totalClasses || 0;

  // Calculate live teaching statistics
  const allSlots = useMemo(() => Object.values(weeklySchedule).flat(), [weeklySchedule]);
  const uniqueClassNames = useMemo(
    () => Array.from(new Set(allSlots.map((s) => s.class))).filter(Boolean),
    [allSlots]
  );
  const currentDayKey = useMemo(() => {
    const dayMap = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    return dayMap[new Date().getDay()] || "";
  }, []);
  const todayClassesCount = currentDayKey && weeklySchedule[currentDayKey] ? weeklySchedule[currentDayKey].length : 0;
  const freePeriodsCount = Math.max(0, 25 - totalClasses);

  // Build Day Map for Table (Sunday -> { p1: slot, p2: slot, p3: slot, p4: slot, p5: slot })
  const scheduleMatrix = useMemo(() => {
    const matrix: Record<string, Partial<Record<"p1" | "p2" | "p3" | "p4" | "p5", TeacherScheduleSlot>>> = {};

    for (const d of DAYS_OF_WEEK) {
      matrix[d.key] = {};
      const daySlots = weeklySchedule[d.key] || [];
      for (const slot of daySlots) {
        const pKey = getPeriodKeyFromTime(slot.startTime);
        matrix[d.key][pKey] = slot;
      }
    }

    return matrix;
  }, [weeklySchedule]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="container mx-auto  px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 font-sans">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <Link
              href="/teacher/dashboard"
              className="hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <School className="h-3.5 w-3.5" />
              Teacher Portal
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-blue-600 font-bold">Weekly Routine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <CalendarDays className="h-7 w-7 text-blue-600" />
            Teacher Weekly Routine & Period Schedule
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Color-coded 5-day class timetable from Period 1 to Period 5 (Sunday to Thursday).
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
          <Button
            variant="outline"
            onClick={handlePrint}
            className="h-10 px-4 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Printer className="h-4 w-4 text-slate-500" />
            <span>Print Routine</span>
          </Button>
        </div>
      </div>

      {/* Quick Summary KPI Cards with Real Live Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Weekly Teaching Load */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Weekly Classes</span>
            <div className="h-9 w-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">
                {totalClasses}
              </span>
              <span className="text-xs font-bold text-slate-400">Periods</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">Sunday to Thursday</p>
          </div>
        </div>

        {/* Today's Lectures */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Lectures</span>
            <div className="h-9 w-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Flame className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-amber-600 font-sans tracking-tight">
                {todayClassesCount}
              </span>
              <span className="text-xs font-bold text-slate-400">Classes</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              {todayClassesCount > 0 ? "Scheduled for today" : "No lectures today"}
            </p>
          </div>
        </div>

        {/* Assigned Classes */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Classes</span>
            <div className="h-9 w-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <School className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-sans tracking-tight">
                {uniqueClassNames.length}
              </span>
              <span className="text-xs font-bold text-slate-400">Grades</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium truncate">
              {uniqueClassNames.join(", ") || "Classes 6–10"}
            </p>
          </div>
        </div>

        {/* Free Prep Periods */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Free / Prep Slots</span>
            <div className="h-9 w-9 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-purple-600 font-sans tracking-tight">
                {freePeriodsCount}
              </span>
              <span className="text-xs font-bold text-slate-400">Periods</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-medium">For grading & preparation</p>
          </div>
        </div>
      </div>

      {/* Main Weekly Timetable Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
        {/* Table Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
              <Calendar className="h-3 w-3 text-blue-500" />
              <span>WEEKLY TIMETABLE SCHEDULE</span>
            </span>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <h2 className="text-xl font-black text-slate-900">
                {routineData?.teacher?.name ? `${routineData.teacher.name} · Personal Weekly Schedule` : "Teacher Routine Matrix"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              5 Daily Periods • 10:00 AM – 4:00 PM
            </span>
          </div>
        </div>

        {/* Timetable Table Grid */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-24 text-center space-y-3">
              <div className="h-8 w-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-500 font-semibold">Loading weekly schedule...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[960px]">
              {/* Columns Header (Periods Horizontally) */}
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50/90 text-xs text-slate-700">
                  {/* Vertical Day Header */}
                  <th className="py-3.5 px-4 w-36 font-black uppercase tracking-wider text-slate-500">
                    Weekday
                  </th>

                  {/* Morning Periods (p1, p2, p3) */}
                  {morningPeriods.map((slot) => (
                    <th key={slot.key} className="py-3 px-3 text-center font-bold">
                      <div className="text-xs font-extrabold text-slate-900">{slot.label}</div>
                      <div className="text-[11px] font-medium text-slate-400 mt-0.5">{slot.time}</div>
                    </th>
                  ))}

                  {/* Tiffin Break Column */}
                  <th className="py-3 px-2.5 text-center font-bold w-24 bg-amber-50/70 border-x border-amber-200/80">
                    <div className="text-xs font-extrabold text-amber-800 flex items-center justify-center gap-1">
                      <Coffee className="h-3.5 w-3.5 text-amber-600" />
                      <span>Tiffin</span>
                    </div>
                    <div className="text-[11px] font-medium text-amber-700/90 mt-0.5">1:00–2:00</div>
                  </th>

                  {/* Afternoon Periods (p4, p5) */}
                  {afternoonPeriods.map((slot) => (
                    <th key={slot.key} className="py-3 px-3 text-center font-bold">
                      <div className="text-xs font-extrabold text-slate-900">{slot.label}</div>
                      <div className="text-[11px] font-medium text-slate-400 mt-0.5">{slot.time}</div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Rows (Days of Week Vertically: Sunday to Thursday) */}
              <tbody className="divide-y divide-slate-100 bg-white">
                {DAYS_OF_WEEK.map((day) => {
                  const daySlots = scheduleMatrix[day.key] || {};

                  return (
                    <tr key={day.key} className="hover:bg-slate-50/50 transition-colors">
                      {/* Left Column: Day Label with glowing indicator dot */}
                      <td className="py-4 px-4 font-black text-xs text-slate-800 align-middle">
                        <div className="flex items-center gap-2.5">
                          <div className={`h-2.5 w-2.5 rounded-full ${day.dotColor} shadow-sm shrink-0`} />
                          <div>
                            <span className="text-sm font-extrabold text-slate-900 block">
                              {day.title}
                            </span>
                            <span className="text-[11px] font-medium text-slate-400 block mt-0.5">
                              {day.bangla}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Morning Periods (p1, p2, p3) */}
                      {morningPeriods.map((slot) => {
                        const period = daySlots[slot.key];

                        if (!period) {
                          return (
                            <td key={slot.key} className="py-2.5 px-2 align-middle text-center">
                              <div className="w-full min-h-[86px] bg-slate-50/50 border border-dashed border-slate-200/90 rounded-2xl flex flex-col items-center justify-center gap-0.5 text-slate-400 hover:bg-slate-50 transition-colors">
                                <span className="text-[11px] font-bold text-slate-400">Free Period</span>
                                <span className="text-[9px] text-slate-400/80">Recess / Prep</span>
                              </div>
                            </td>
                          );
                        }

                        const theme = getSubjectTheme(period.subject);

                        return (
                          <td key={slot.key} className="py-2.5 px-2 align-middle">
                            <div
                              className={`border ${theme.borderColor} ${theme.borderAccent} ${theme.cardBg} rounded-2xl p-3.5 transition-all duration-150 shadow-2xs hover:shadow-md hover:scale-[1.015] flex flex-col justify-between min-h-[86px] text-left`}
                            >
                              <div className={`text-xs font-black leading-tight ${theme.titleColor}`}>
                                {period.subject}
                              </div>
                              <div className="flex items-center justify-between text-[11px] font-medium mt-2 pt-1 border-t border-black/5">
                                <span className={`truncate pr-1 text-xs ${theme.classPill}`}>
                                  {period.class} · {period.section}
                                </span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-lg font-black shrink-0 ${theme.roomPill}`}>
                                  {period.roomNumber || "Room 101"}
                                </span>
                              </div>
                            </div>
                          </td>
                        );
                      })}

                      {/* Tiffin Break Column Separator */}
                      <td className="py-2.5 px-2 text-center align-middle bg-amber-50/40 border-x border-amber-200/80">
                        <div className="py-3 px-1 text-[11px] font-extrabold text-amber-800 bg-amber-100/80 border border-amber-300/80 rounded-xl shadow-2xs">
                          Break
                        </div>
                      </td>

                      {/* Afternoon Periods (p4, p5) */}
                      {afternoonPeriods.map((slot) => {
                        const period = daySlots[slot.key];

                        if (!period) {
                          return (
                            <td key={slot.key} className="py-2.5 px-2 align-middle text-center">
                              <div className="w-full min-h-[86px] bg-slate-50/50 border border-dashed border-slate-200/90 rounded-2xl flex flex-col items-center justify-center gap-0.5 text-slate-400 hover:bg-slate-50 transition-colors">
                                <span className="text-[11px] font-bold text-slate-400">Free Period</span>
                                <span className="text-[9px] text-slate-400/80">Recess / Prep</span>
                              </div>
                            </td>
                          );
                        }

                        const theme = getSubjectTheme(period.subject);

                        return (
                          <td key={slot.key} className="py-2.5 px-2 align-middle">
                            <div
                              className={`border ${theme.borderColor} ${theme.borderAccent} ${theme.cardBg} rounded-2xl p-3.5 transition-all duration-150 shadow-2xs hover:shadow-md hover:scale-[1.015] flex flex-col justify-between min-h-[86px] text-left`}
                            >
                              <div className={`text-xs font-black leading-tight ${theme.titleColor}`}>
                                {period.subject}
                              </div>
                              <div className="flex items-center justify-between text-[11px] font-medium mt-2 pt-1 border-t border-black/5">
                                <span className={`truncate pr-1 text-xs ${theme.classPill}`}>
                                  {period.class} · {period.section}
                                </span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-lg font-black shrink-0 ${theme.roomPill}`}>
                                  {period.roomNumber || "Room 101"}
                                </span>
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
