"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Calendar,
  Award,
  Clock,
  ChevronRight,
  ShieldCheck,
  Megaphone,
  ArrowUpRight,
  BookOpen,
  Sparkles,
  RefreshCw,
  Bell,
  CheckCircle2,
} from "lucide-react";
import { getMyChildren, MyChildrenResponse } from "@/src/services/parentService";
import { getUserInfo } from "@/src/services/auth/getUserInfo";

export function ParentOverviewView() {
  const [data, setData] = useState<MyChildrenResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const userInfo = await getUserInfo("PARENT");
        const email = userInfo?.email || "rafiqul@example.com";
        const res = await getMyChildren(email);
        setData(res);
      } catch (err) {
        console.error("Error loading parent overview:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="container mx-auto space-y-8">
        {/* Hero Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 lg:p-10 text-white shadow-xl border border-indigo-800/40">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
                <span>Parent Portal Dashboard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Welcome, {data?.parentName || "Parent"}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Stay updated with your child&apos;s educational journey at School Central. Access class routines, attendance, academic marks, and school updates from here.
              </p>
            </div>

            <Link
              href="/dashboard/children"
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all active:scale-95 group shrink-0"
            >
              <GraduationCap className="h-4 w-4" />
              <span>View My Children</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Quick KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-3xl bg-white border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">
                {data?.totalChildren ?? (loading ? "..." : 1)}
              </div>
              <div className="text-xs text-slate-500 font-medium">Enrolled Children</div>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">2026</div>
              <div className="text-xs text-slate-500 font-medium">Academic Session</div>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">5 Days</div>
              <div className="text-xs text-slate-500 font-medium">Sun - Thu Schedule</div>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200/80 p-5 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">Active</div>
              <div className="text-xs text-slate-500 font-medium">Academic Status</div>
            </div>
          </div>
        </div>

        {/* My Children Quick Preview Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Enrolled Students</h2>
              <p className="text-xs text-slate-500">Your registered children attending School Central</p>
            </div>
            <Link
              href="/dashboard/children"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
            >
              <span>See Full Details</span>
              <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data?.children && data.children.length > 0 ? (
              data.children.map((child) => (
                <div
                  key={child.id}
                  className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white font-bold flex items-center justify-center text-lg shadow-md">
                        {child.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{child.name}</h3>
                        <p className="text-xs text-slate-500">
                          {child.class} • {child.section} (Roll: #{child.roll})
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      <span>{child.status}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center text-xs">
                    <div className="bg-slate-50 rounded-xl p-2">
                      <div className="text-slate-400 text-[10px] font-medium">Student ID</div>
                      <div className="font-bold text-slate-800 truncate">{child.studentId}</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-2">
                      <div className="text-slate-400 text-[10px] font-medium">Relation</div>
                      <div className="font-bold text-slate-800 capitalize truncate">{child.relation?.toLowerCase()}</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-2">
                      <div className="text-slate-400 text-[10px] font-medium">Contact</div>
                      <div className="font-bold text-indigo-600 truncate">
                        {child.isPrimaryContact ? "Primary" : "Secondary"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/dashboard/children"
                      className="flex-1 py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs text-center transition-colors"
                    >
                      Child Details
                    </Link>
                    <Link
                      href="/dashboard/routines"
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs text-center transition-colors"
                    >
                      Class Routine
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full rounded-3xl bg-white border border-slate-200/80 p-8 text-center text-slate-500 text-xs">
                {loading ? "Loading child information..." : "No children registered under this account."}
              </div>
            )}
          </div>
        </div>

        {/* Quick Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/routines"
            className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all group block space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
              Class Routines & Timetable
            </h3>
            <p className="text-xs text-slate-500">
              Access period schedule from Sunday to Thursday with subject names and assigned teachers.
            </p>
          </Link>

          <Link
            href="/admin/dashboard/results"
            className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all group block space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
              Academic Results & Grade Sheets
            </h3>
            <p className="text-xs text-slate-500">
              Check terminal examination reports, subject-wise marks, GPAs, and teacher remarks.
            </p>
          </Link>

          <Link
            href="/admin/dashboard/notices"
            className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all group block space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Megaphone className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
              School Circulars & Announcements
            </h3>
            <p className="text-xs text-slate-500">
              Stay in the loop with events, parent-teacher meetings, and academic term calendar notices.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
