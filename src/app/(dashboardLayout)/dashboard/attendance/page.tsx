"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ClipboardList,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";
import { getMyChildren, MyChildrenResponse } from "@/src/services/parentService";
import { getUserInfo } from "@/src/services/auth/getUserInfo";

export default function ParentAttendancePage() {
  const [data, setData] = useState<MyChildrenResponse | null>(null);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const userInfo = await getUserInfo("PARENT");
        const email = userInfo?.email || "rafiqul@example.com";
        const res = await getMyChildren(email);
        setData(res);
        if (res.children && res.children.length > 0) {
          setSelectedChildId(res.children[0].id);
        }
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const selectedChild = data?.children.find((c) => c.id === selectedChildId) || data?.children[0];

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="container mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-xl border border-emerald-800/40 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-xs">
              <ClipboardList className="h-3.5 w-3.5 text-emerald-400" />
              <span>Attendance Tracker</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Student Attendance Report
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Real-time daily presence, monthly attendance rate, and attendance history.
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

        {/* Selected Child Info */}
        {selectedChild && (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center text-base">
                {selectedChild.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-sm">{selectedChild.name}</h2>
                <p className="text-xs text-slate-500">
                  {selectedChild.class} • {selectedChild.section} • Roll #{selectedChild.roll}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-slate-500">Attendance Rate</div>
                <div className="text-base font-black text-emerald-600">96.4% Present</div>
              </div>
            </div>
          </div>
        )}

        {/* KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-3xl bg-white border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">118 Days</div>
              <div className="text-xs text-slate-500 font-medium">Present this Term</div>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <XCircle className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">4 Days</div>
              <div className="text-xs text-slate-500 font-medium">Absences Recorded</div>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">122 Days</div>
              <div className="text-xs text-slate-500 font-medium">Total Working Days</div>
            </div>
          </div>
        </div>

        {/* Daily Record Table */}
        <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Recent Attendance Logs (September 2026)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Day</th>
                  <th className="py-3 px-3">Check-In Time</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { date: "24 Sep 2026", day: "Thursday", time: "8:52 AM", status: "PRESENT", remarks: "On Time" },
                  { date: "23 Sep 2026", day: "Wednesday", time: "8:48 AM", status: "PRESENT", remarks: "On Time" },
                  { date: "22 Sep 2026", day: "Tuesday", time: "8:55 AM", status: "PRESENT", remarks: "On Time" },
                  { date: "21 Sep 2026", day: "Monday", time: "8:50 AM", status: "PRESENT", remarks: "On Time" },
                  { date: "20 Sep 2026", day: "Sunday", time: "8:45 AM", status: "PRESENT", remarks: "On Time" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-semibold text-slate-800">{row.date}</td>
                    <td className="py-3 px-3 text-slate-600">{row.day}</td>
                    <td className="py-3 px-3 text-slate-600">{row.time}</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>{row.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500">{row.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
