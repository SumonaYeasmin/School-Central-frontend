"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Coffee,
  GraduationCap,
  BookOpen,
  User,
  ArrowLeft,
  ChevronRight,
  Printer,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Building2,
} from "lucide-react";
import { getMyChildren, MyChildrenResponse, ParentChildInfo } from "@/src/services/parentService";
import { getWeeklyTimetable } from "@/src/services/routineService";
import { getUserInfo } from "@/src/services/auth/getUserInfo";

// Standard 5 School Working Days (Sunday to Thursday)
const DAYS_OF_WEEK = [
  { key: "SUNDAY", title: "Sunday", bangla: "রবিবার", dotColor: "bg-blue-600" },
  { key: "MONDAY", title: "Monday", bangla: "সোমবার", dotColor: "bg-indigo-600" },
  { key: "TUESDAY", title: "Tuesday", bangla: "মঙ্গলবার", dotColor: "bg-emerald-600" },
  { key: "WEDNESDAY", title: "Wednesday", bangla: "বুধবার", dotColor: "bg-amber-600" },
  { key: "THURSDAY", title: "Thursday", bangla: "বৃহস্পতিবার", dotColor: "bg-rose-600" },
];

const PERIOD_SLOTS = [
  { key: "p1" as const, label: "Period 1", time: "10:00 – 11:00 AM", start: "10:00" },
  { key: "p2" as const, label: "Period 2", time: "11:00 – 12:00 PM", start: "11:00" },
  { key: "p3" as const, label: "Period 3", time: "12:00 – 1:00 PM", start: "12:00" },
  { key: "p4" as const, label: "Period 4", time: "2:00 – 3:00 PM", start: "14:00" },
  { key: "p5" as const, label: "Period 5", time: "3:00 – 4:00 PM", start: "15:00" },
];

const morningPeriods = PERIOD_SLOTS.slice(0, 3); // p1, p2, p3
const afternoonPeriods = PERIOD_SLOTS.slice(3); // p4, p5

interface SubjectTheme {
  cardBg: string;
  borderColor: string;
  borderAccent: string;
  titleColor: string;
  teacherColor: string;
  roomBadge: string;
}

const THEME_PRESETS: Record<string, SubjectTheme> = {
  math: {
    cardBg: "bg-gradient-to-br from-blue-50/90 via-sky-50/70 to-indigo-50/50",
    borderColor: "border-blue-200/80 hover:border-blue-400",
    borderAccent: "border-l-[4px] border-l-blue-600",
    titleColor: "text-blue-950 font-bold",
    teacherColor: "text-blue-700 font-medium",
    roomBadge: "bg-white text-blue-900 border border-blue-200",
  },
  science: {
    cardBg: "bg-gradient-to-br from-emerald-50/90 via-teal-50/70 to-green-50/50",
    borderColor: "border-emerald-200/80 hover:border-emerald-400",
    borderAccent: "border-l-[4px] border-l-emerald-600",
    titleColor: "text-emerald-950 font-bold",
    teacherColor: "text-emerald-700 font-medium",
    roomBadge: "bg-white text-emerald-900 border border-emerald-200",
  },
  bangla: {
    cardBg: "bg-gradient-to-br from-amber-50/90 via-orange-50/70 to-yellow-50/50",
    borderColor: "border-amber-200/80 hover:border-amber-400",
    borderAccent: "border-l-[4px] border-l-amber-500",
    titleColor: "text-amber-950 font-bold",
    teacherColor: "text-amber-800 font-medium",
    roomBadge: "bg-white text-amber-900 border border-amber-200",
  },
  english: {
    cardBg: "bg-gradient-to-br from-purple-50/90 via-violet-50/70 to-indigo-50/50",
    borderColor: "border-purple-200/80 hover:border-purple-400",
    borderAccent: "border-l-[4px] border-l-purple-600",
    titleColor: "text-purple-950 font-bold",
    teacherColor: "text-purple-700 font-medium",
    roomBadge: "bg-white text-purple-900 border border-purple-200",
  },
  ict: {
    cardBg: "bg-gradient-to-br from-cyan-50/90 via-sky-50/70 to-blue-50/50",
    borderColor: "border-cyan-200/80 hover:border-cyan-400",
    borderAccent: "border-l-[4px] border-l-cyan-600",
    titleColor: "text-cyan-950 font-bold",
    teacherColor: "text-cyan-700 font-medium",
    roomBadge: "bg-white text-cyan-900 border border-cyan-200",
  },
  social: {
    cardBg: "bg-gradient-to-br from-rose-50/90 via-pink-50/70 to-red-50/50",
    borderColor: "border-rose-200/80 hover:border-rose-400",
    borderAccent: "border-l-[4px] border-l-rose-500",
    titleColor: "text-rose-950 font-bold",
    teacherColor: "text-rose-700 font-medium",
    roomBadge: "bg-white text-rose-900 border border-rose-200",
  },
  religion: {
    cardBg: "bg-gradient-to-br from-teal-50/90 via-emerald-50/70 to-cyan-50/50",
    borderColor: "border-teal-200/80 hover:border-teal-400",
    borderAccent: "border-l-[4px] border-l-teal-600",
    titleColor: "text-teal-950 font-bold",
    teacherColor: "text-teal-700 font-medium",
    roomBadge: "bg-white text-teal-900 border border-teal-200",
  },
};

function getSubjectTheme(name: string): SubjectTheme {
  const s = (name || "").toLowerCase();
  if (s.includes("গণিত") || s.includes("math")) return THEME_PRESETS.math;
  if (
    s.includes("পদার্থ") ||
    s.includes("রসায়ন") ||
    s.includes("রসায়ন") ||
    s.includes("জীব") ||
    s.includes("বিজ্ঞান") ||
    s.includes("physics") ||
    s.includes("chem") ||
    s.includes("bio") ||
    s.includes("science")
  )
    return THEME_PRESETS.science;
  if (s.includes("english") || s.includes("ইংরেজি")) return THEME_PRESETS.english;
  if (s.includes("ict") || s.includes("তথ্য") || s.includes("কম্পিউটার")) return THEME_PRESETS.ict;
  if (s.includes("বাংলা") || s.includes("bangla") || s.includes("সাহিত্য")) return THEME_PRESETS.bangla;
  if (s.includes("বাংলাদেশ") || s.includes("ইতিহাস") || s.includes("ভূগোল") || s.includes("bgs"))
    return THEME_PRESETS.social;
  if (s.includes("ধর্ম") || s.includes("নৈতিক") || s.includes("ইসলাম") || s.includes("religion"))
    return THEME_PRESETS.religion;
  return THEME_PRESETS.math;
}

function getPeriodSlotKey(startTime: string, idx: number): "p1" | "p2" | "p3" | "p4" | "p5" {
  if (startTime) {
    const hour = parseInt(startTime.split(":")[0], 10);
    if (hour <= 10) return "p1";
    if (hour === 11) return "p2";
    if (hour === 12) return "p3";
    if (hour === 14) return "p4";
    if (hour >= 15) return "p5";
  }
  const keys: ("p1" | "p2" | "p3" | "p4" | "p5")[] = ["p1", "p2", "p3", "p4", "p5"];
  return keys[idx] || "p1";
}

export function ParentRoutineView() {
  const [data, setData] = useState<MyChildrenResponse | null>(null);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [timetableData, setTimetableData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [timetableLoading, setTimetableLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch logged-in Parent's linked children
  const fetchChildren = async () => {
    try {
      setLoading(true);
      setError(null);
      const userInfo = await getUserInfo("PARENT");
      const email = userInfo?.email || "rafiqul@example.com";
      const res = await getMyChildren(email);
      setData(res);
      if (res.children && res.children.length > 0) {
        setSelectedChildId(res.children[0].id);
      }
    } catch (err: any) {
      console.error("Error loading parent children:", err);
      setError("Failed to load children records. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const selectedChild =
    data?.children.find((c) => c.id === selectedChildId) || data?.children[0];

  // 2. Fetch real weekly timetable from database whenever selected child changes
  useEffect(() => {
    async function loadRoutine() {
      if (!selectedChild?.classId || !selectedChild?.sectionId) return;
      try {
        setTimetableLoading(true);
        const res = await getWeeklyTimetable(
          selectedChild.classId,
          selectedChild.sectionId
        );
        setTimetableData(res);
      } catch (err) {
        console.error("Error loading live class routine from database:", err);
      } finally {
        setTimetableLoading(false);
      }
    }

    if (selectedChild) {
      loadRoutine();
    }
  }, [selectedChild?.classId, selectedChild?.sectionId]);

  // Build matrix from database timetable response
  const scheduleMatrix = useMemo(() => {
    const matrix: Record<string, Partial<Record<"p1" | "p2" | "p3" | "p4" | "p5", any>>> = {};
    const timetable = timetableData?.timetable || {};

    for (const d of DAYS_OF_WEEK) {
      matrix[d.key] = {};
      const daySlots: any[] = timetable[d.key] || [];

      daySlots.forEach((slot, idx) => {
        const pKey = getPeriodSlotKey(slot.startTime, idx);
        matrix[d.key][pKey] = slot;
      });
    }

    return matrix;
  }, [timetableData]);

  const totalPeriodsCount = timetableData?.totalPeriods || 0;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // 1. Full Page Loading State
  if (loading && !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 font-sans container mx-auto">
        <div className="h-14 w-14 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm animate-pulse">
          <RefreshCw className="h-7 w-7 animate-spin" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-lg font-bold text-slate-900">Loading Class Routine...</h3>
          <p className="text-xs text-slate-500">Fetching weekly timetable from school database</p>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error && !data) {
    return (
      <div className="container mx-auto font-sans py-8">
        <div className="rounded-3xl bg-rose-50 border border-rose-200 p-8 text-center space-y-3 max-w-lg mx-auto">
          <div className="h-12 w-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-rose-900">Failed to Load Class Routine</h3>
          <p className="text-xs text-rose-700">{error}</p>
          <button
            onClick={fetchChildren}
            className="mt-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer transition-all shadow-xs"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 container mx-auto font-sans">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-6 sm:p-8 text-white shadow-xl border border-indigo-800/40 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-xs">
            <Calendar className="h-3.5 w-3.5 text-indigo-400" />
            <span>Real-Time Database Timetable</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Class Routine & Schedule
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            5-Day weekly period timetable (Sunday to Thursday) synced directly from school records.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs backdrop-blur-md transition-all cursor-pointer shadow-xs"
          >
            <Printer className="h-4 w-4" />
            <span>Print Routine</span>
          </button>

          <Link
            href="/dashboard/children"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>My Children</span>
          </Link>
        </div>
      </div>

      {/* Child Selector Tabs (if multiple children) */}
      {data && data.children.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {data.children.map((child) => (
            <button
              key={child.id}
              onClick={() => setSelectedChildId(child.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap ${
                child.id === selectedChild?.id
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20"
                  : "bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              <span>{child.name}</span>
              <span className="opacity-70 text-[11px]">({child.class})</span>
            </button>
          ))}
        </div>
      )}

      {/* Selected Child Info Badge */}
      {selectedChild && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 font-black flex items-center justify-center text-lg border border-indigo-100">
              {selectedChild.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-slate-900 text-base">
                  {selectedChild.name}
                </h2>
                <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                  {selectedChild.class} — {selectedChild.section}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Roll #{selectedChild.roll} • Student ID: {selectedChild.studentId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className="bg-indigo-50 text-indigo-700 px-3.5 py-1.5 rounded-xl font-bold border border-indigo-100">
              {totalPeriodsCount > 0 ? `${totalPeriodsCount} Periods / Week` : "5 Periods / Day"}
            </span>
            <span className="bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-xl font-bold border border-emerald-100">
              10:00 AM – 4:00 PM
            </span>
          </div>
        </div>
      )}

      {/* Weekly Routine Grid Table */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-indigo-500" />
              <span>OFFICIAL WEEKLY SCHEDULE</span>
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
              {selectedChild ? `${selectedChild.class} (${selectedChild.section}) Class Timetable` : "Weekly Timetable"}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Clock className="h-4 w-4 text-indigo-500" />
            <span>Sunday to Thursday · Tiffin Break: 1:00 PM – 2:00 PM</span>
          </div>
        </div>

        {/* Loading Spinner */}
        {timetableLoading ? (
          <div className="py-20 text-center space-y-3">
            <div className="h-8 w-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-semibold">
              Loading live timetable from school database...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-[960px]">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50/90 text-xs text-slate-700">
                  <th className="py-3.5 px-4 w-36 font-black uppercase tracking-wider text-slate-500">
                    Day / Period
                  </th>
                  {morningPeriods.map((slot) => (
                    <th key={slot.key} className="py-3 px-3 text-center font-bold">
                      <div className="text-xs font-extrabold text-slate-900">{slot.label}</div>
                      <div className="text-[11px] font-medium text-slate-400 mt-0.5">{slot.time}</div>
                    </th>
                  ))}
                  <th className="py-3 px-2.5 text-center font-bold w-24 bg-amber-50/70 border-x border-amber-200/80">
                    <div className="text-xs font-extrabold text-amber-800 flex items-center justify-center gap-1">
                      <Coffee className="h-3.5 w-3.5 text-amber-600" />
                      <span>Tiffin</span>
                    </div>
                    <div className="text-[11px] font-medium text-amber-700/90 mt-0.5">1:00–2:00</div>
                  </th>
                  {afternoonPeriods.map((slot) => (
                    <th key={slot.key} className="py-3 px-3 text-center font-bold">
                      <div className="text-xs font-extrabold text-slate-900">{slot.label}</div>
                      <div className="text-[11px] font-medium text-slate-400 mt-0.5">{slot.time}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {DAYS_OF_WEEK.map((day) => {
                  const daySlots = scheduleMatrix[day.key] || {};

                  return (
                    <tr key={day.key} className="hover:bg-slate-50/50 transition-colors">
                      {/* Left Column: Day Label */}
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
                                <span className="text-[11px] font-bold text-slate-400">Off / Study</span>
                                <span className="text-[9px] text-slate-400/80">Self Preparation</span>
                              </div>
                            </td>
                          );
                        }

                        const subjectName = period.subject?.name || period.subject || "Subject";
                        const teacherName = period.teacher?.name || period.teacher || "Faculty";
                        const roomName = period.roomNumber || "Room 101";
                        const theme = getSubjectTheme(subjectName);

                        return (
                          <td key={slot.key} className="py-2.5 px-2 align-middle">
                            <div
                              className={`border ${theme.borderColor} ${theme.borderAccent} ${theme.cardBg} rounded-2xl p-3.5 transition-all duration-150 shadow-2xs hover:shadow-md hover:scale-[1.015] flex flex-col justify-between min-h-[86px] text-left`}
                            >
                              <div>
                                <div className={`text-xs font-black leading-tight ${theme.titleColor}`}>
                                  {subjectName}
                                </div>
                                <div className={`text-[11px] mt-0.5 truncate ${theme.teacherColor}`}>
                                  {teacherName}
                                </div>
                              </div>

                              <div className="flex items-center justify-between text-[11px] font-medium mt-2 pt-1 border-t border-black/5">
                                <span className="text-[10px] text-slate-400 font-semibold">
                                  {period.startTime || slot.start}
                                </span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-lg font-bold shrink-0 ${theme.roomBadge}`}>
                                  {roomName}
                                </span>
                              </div>
                            </div>
                          </td>
                        );
                      })}

                      {/* Tiffin Break Column */}
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
                                <span className="text-[11px] font-bold text-slate-400">Off / Study</span>
                                <span className="text-[9px] text-slate-400/80">Self Preparation</span>
                              </div>
                            </td>
                          );
                        }

                        const subjectName = period.subject?.name || period.subject || "Subject";
                        const teacherName = period.teacher?.name || period.teacher || "Faculty";
                        const roomName = period.roomNumber || "Room 101";
                        const theme = getSubjectTheme(subjectName);

                        return (
                          <td key={slot.key} className="py-2.5 px-2 align-middle">
                            <div
                              className={`border ${theme.borderColor} ${theme.borderAccent} ${theme.cardBg} rounded-2xl p-3.5 transition-all duration-150 shadow-2xs hover:shadow-md hover:scale-[1.015] flex flex-col justify-between min-h-[86px] text-left`}
                            >
                              <div>
                                <div className={`text-xs font-black leading-tight ${theme.titleColor}`}>
                                  {subjectName}
                                </div>
                                <div className={`text-[11px] mt-0.5 truncate ${theme.teacherColor}`}>
                                  {teacherName}
                                </div>
                              </div>

                              <div className="flex items-center justify-between text-[11px] font-medium mt-2 pt-1 border-t border-black/5">
                                <span className="text-[10px] text-slate-400 font-semibold">
                                  {period.startTime || slot.start}
                                </span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-lg font-bold shrink-0 ${theme.roomBadge}`}>
                                  {roomName}
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
          </div>
        )}
      </div>
    </div>
  );
}

