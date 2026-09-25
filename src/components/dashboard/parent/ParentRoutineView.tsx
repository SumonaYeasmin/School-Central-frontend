"use client";

import React, { useState, useEffect } from "react";
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
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { getMyChildren, MyChildrenResponse, ParentChildInfo } from "@/src/services/parentService";
import { getUserInfo } from "@/src/services/auth/getUserInfo";
import { MOCK_ROUTINES, DAYS_OF_WEEK, TIME_SLOTS } from "../admin/routines/mockRoutines";

const THEME_STYLES: Record<string, string> = {
  amber: "bg-gradient-to-br from-amber-50 via-orange-50/70 to-yellow-50/50 border-amber-200 border-l-[4px] border-l-amber-500 text-amber-950",
  blue: "bg-gradient-to-br from-blue-50 via-sky-50/70 to-indigo-50/50 border-blue-200 border-l-[4px] border-l-blue-600 text-blue-950",
  purple: "bg-gradient-to-br from-purple-50 via-violet-50/70 to-indigo-50/50 border-purple-200 border-l-[4px] border-l-purple-600 text-purple-950",
  emerald: "bg-gradient-to-br from-emerald-50 via-teal-50/70 to-green-50/50 border-emerald-200 border-l-[4px] border-l-emerald-600 text-emerald-950",
  rose: "bg-gradient-to-br from-rose-50 via-pink-50/70 to-red-50/50 border-rose-200 border-l-[4px] border-l-rose-500 text-rose-950",
  gray: "bg-slate-50 border-slate-200 border-l-[4px] border-l-slate-400 text-slate-800",
};

export function ParentRoutineView() {
  const [data, setData] = useState<MyChildrenResponse | null>(null);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const userInfo = await getUserInfo("PARENT");
        const email = userInfo?.email || "rafiqul@example.com";
        const res = await getMyChildren(email);
        setData(res);
        if (res.children && res.children.length > 0) {
          setSelectedChildId(res.children[0].id);
        }
      } catch (err) {
        console.error("Error loading parent routine:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const selectedChild = data?.children.find((c) => c.id === selectedChildId) || data?.children[0];

  // Match class routine from MOCK_ROUTINES based on child class
  const classKey = selectedChild?.class?.toLowerCase().includes("10")
    ? "Class 10"
    : selectedChild?.class?.toLowerCase().includes("9")
    ? "Class 9"
    : selectedChild?.class?.toLowerCase().includes("8")
    ? "Class 8"
    : selectedChild?.class?.toLowerCase().includes("7")
    ? "Class 7"
    : "Class 6";

  const matchedRoutine =
    MOCK_ROUTINES.find(
      (r) =>
        r.grade === classKey &&
        r.section.toLowerCase() === (selectedChild?.section?.toLowerCase() || "section a")
    ) ||
    MOCK_ROUTINES.find((r) => r.grade === classKey) ||
    MOCK_ROUTINES[0];

  const regularPeriods = TIME_SLOTS.filter((s) => !s.isBreak);
  const morningPeriods = regularPeriods.slice(0, 3);
  const afternoonPeriods = regularPeriods.slice(3);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="container mx-auto space-y-8">
        {/* Header Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-6 sm:p-8 text-white shadow-xl border border-indigo-800/40 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-xs">
              <Calendar className="h-3.5 w-3.5 text-indigo-400" />
              <span>Student Class Routine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Weekly Timetable Schedule
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              5-Day Period Schedule (Sunday to Thursday) for your enrolled child.
            </p>
          </div>

          <Link
            href="/dashboard/children"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs backdrop-blur-md transition-all self-start md:self-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to My Children</span>
          </Link>
        </div>

        {/* Child Selector Tabs (if multiple children) */}
        {data && data.children.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
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

        {/* Selected Child Info Banner */}
        {selectedChild && (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-base">
                {selectedChild.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-sm">{selectedChild.name}</h2>
                <p className="text-xs text-slate-500">
                  {selectedChild.class} • {selectedChild.section} • Roll #{selectedChild.roll}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg font-semibold border border-indigo-100">
                5 Periods / Day
              </span>
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg font-semibold border border-emerald-100">
                9:00 AM – 1:30 PM
              </span>
            </div>
          </div>
        )}

        {/* Weekly Routine Grid Table */}
        <div className="bg-white border border-slate-200/90 rounded-3xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-[960px]">
              <thead>
                <tr className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white text-[12px] font-bold tracking-wider uppercase border-b border-slate-800">
                  <th className="py-4 px-4 w-[110px] text-center border-r border-slate-800">Day</th>
                  {morningPeriods.map((slot) => (
                    <th key={slot.periodKey} className="py-3 px-3 text-center border-r border-slate-800">
                      <div className="font-extrabold text-indigo-300 text-xs">{slot.label}</div>
                      <div className="text-[10px] text-slate-400 font-medium lowercase tracking-normal">
                        {slot.time}
                      </div>
                    </th>
                  ))}
                  <th className="py-3 px-2 w-[85px] text-center bg-amber-500/20 border-r border-slate-800">
                    <div className="font-extrabold text-amber-300 text-xs">TIFFIN</div>
                    <div className="text-[10px] text-amber-200 font-medium lowercase tracking-normal">
                      1:00-2:00
                    </div>
                  </th>
                  {afternoonPeriods.map((slot) => (
                    <th key={slot.periodKey} className="py-3 px-3 text-center border-r border-slate-800 last:border-r-0">
                      <div className="font-extrabold text-indigo-300 text-xs">{slot.label}</div>
                      <div className="text-[10px] text-slate-400 font-medium lowercase tracking-normal">
                        {slot.time}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {DAYS_OF_WEEK.map((day) => {
                  const dayData = matchedRoutine?.schedule?.[day];
                  const p1 = dayData?.p1;
                  const p2 = dayData?.p2;
                  const p3 = dayData?.p3;
                  const p4 = dayData?.p4;
                  const p5 = dayData?.p5;

                  return (
                    <tr key={day} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-3 font-bold text-slate-800 text-center bg-slate-50/50 border-r border-slate-100">
                        {day}
                      </td>

                      {/* Period 1 */}
                      <td className="p-2 border-r border-slate-100 align-top">
                        {p1 ? (
                          <div className={`p-2.5 rounded-xl border shadow-2xs ${THEME_STYLES[p1.theme || "blue"]}`}>
                            <div className="font-bold text-xs truncate">{p1.subject}</div>
                            <div className="text-[11px] opacity-80 truncate">{p1.teacher}</div>
                            <div className="text-[10px] text-slate-500 mt-1">{p1.room}</div>
                          </div>
                        ) : (
                          <div className="h-16 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-[11px]">
                            Free
                          </div>
                        )}
                      </td>

                      {/* Period 2 */}
                      <td className="p-2 border-r border-slate-100 align-top">
                        {p2 ? (
                          <div className={`p-2.5 rounded-xl border shadow-2xs ${THEME_STYLES[p2.theme || "purple"]}`}>
                            <div className="font-bold text-xs truncate">{p2.subject}</div>
                            <div className="text-[11px] opacity-80 truncate">{p2.teacher}</div>
                            <div className="text-[10px] text-slate-500 mt-1">{p2.room}</div>
                          </div>
                        ) : (
                          <div className="h-16 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-[11px]">
                            Free
                          </div>
                        )}
                      </td>

                      {/* Period 3 */}
                      <td className="p-2 border-r border-slate-100 align-top">
                        {p3 ? (
                          <div className={`p-2.5 rounded-xl border shadow-2xs ${THEME_STYLES[p3.theme || "emerald"]}`}>
                            <div className="font-bold text-xs truncate">{p3.subject}</div>
                            <div className="text-[11px] opacity-80 truncate">{p3.teacher}</div>
                            <div className="text-[10px] text-slate-500 mt-1">{p3.room}</div>
                          </div>
                        ) : (
                          <div className="h-16 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-[11px]">
                            Free
                          </div>
                        )}
                      </td>

                      {/* Tiffin Break Column */}
                      <td className="p-2 border-r border-slate-100 text-center bg-amber-50/40 align-middle">
                        <div className="flex flex-col items-center justify-center text-amber-700 py-2">
                          <Coffee className="h-4 w-4 mb-1" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Break</span>
                        </div>
                      </td>

                      {/* Period 4 */}
                      <td className="p-2 border-r border-slate-100 align-top">
                        {p4 ? (
                          <div className={`p-2.5 rounded-xl border shadow-2xs ${THEME_STYLES[p4.theme || "amber"]}`}>
                            <div className="font-bold text-xs truncate">{p4.subject}</div>
                            <div className="text-[11px] opacity-80 truncate">{p4.teacher}</div>
                            <div className="text-[10px] text-slate-500 mt-1">{p4.room}</div>
                          </div>
                        ) : (
                          <div className="h-16 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-[11px]">
                            Free
                          </div>
                        )}
                      </td>

                      {/* Period 5 */}
                      <td className="p-2 align-top">
                        {p5 ? (
                          <div className={`p-2.5 rounded-xl border shadow-2xs ${THEME_STYLES[p5.theme || "rose"]}`}>
                            <div className="font-bold text-xs truncate">{p5.subject}</div>
                            <div className="text-[11px] opacity-80 truncate">{p5.teacher}</div>
                            <div className="text-[10px] text-slate-500 mt-1">{p5.room}</div>
                          </div>
                        ) : (
                          <div className="h-16 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-[11px]">
                            Free
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
