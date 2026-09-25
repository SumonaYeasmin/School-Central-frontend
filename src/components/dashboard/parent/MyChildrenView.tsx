"use client";

import React, { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Users,
  Calendar,
  Award,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Clock,
  BookOpen,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  UserCheck,
  FileText,
  AlertCircle,
  RefreshCw,
  Search,
  ExternalLink,
} from "lucide-react";
import { getMyChildren, ParentChildInfo, MyChildrenResponse } from "@/src/services/parentService";
import { getUserInfo } from "@/src/services/auth/getUserInfo";

export function MyChildrenView() {
  const [data, setData] = useState<MyChildrenResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [parentEmail, setParentEmail] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const fetchChildren = async () => {
    try {
      setLoading(true);
      setError(null);
      const userInfo = await getUserInfo("PARENT");
      const email = userInfo?.email || "rafiqul@example.com";
      setParentEmail(email);

      const res = await getMyChildren(email);
      setData(res);
      if (res.children && res.children.length > 0) {
        setSelectedChildId(res.children[0].id);
      }
    } catch (err: any) {
      console.error("Failed to load children info:", err);
      setError(
        err?.response?.data?.message ||
        "Could not load children data. Please make sure you are logged in as a parent."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const selectedChild =
    data?.children.find((c) => c.id === selectedChildId) ||
    data?.children[0];

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="container mx-auto max-w-7xl space-y-8">
        {/* ========================================================================= */}
        {/* 1. HERO HEADER: Parent Profile & Children Summary                         */}
        {/* ========================================================================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 lg:p-10 text-white shadow-2xl border border-indigo-900/40">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
          <div className="absolute right-1/3 -bottom-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
                <span>Verified Parent Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                My Children & Academic Profile
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Welcome to your parent portal,{" "}
                <span className="font-semibold text-indigo-200">
                  {data?.parentName || "Valued Parent"}
                </span>
                . Monitor your children&apos;s enrolled classes, routines, attendance, and term results in real time.
              </p>

              {/* Parent Quick Info Chips */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
                {data?.phone && (
                  <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
                    <Phone className="h-3.5 w-3.5 text-indigo-400" />
                    <span>{data.phone}</span>
                  </div>
                )}
                {data?.email && (
                  <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
                    <Mail className="h-3.5 w-3.5 text-blue-400" />
                    <span>{data.email}</span>
                  </div>
                )}
                {data?.address && (
                  <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
                    <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                    <span>{data.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick KPI Count */}
            <div className="flex sm:flex-row lg:flex-col gap-3 shrink-0">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-indigo-500/30 flex items-center justify-center text-indigo-300">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">
                    {data?.totalChildren ?? 0}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    Enrolled {data?.totalChildren === 1 ? "Child" : "Children"}
                  </div>
                </div>
              </div>

              <button
                onClick={fetchChildren}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                <span>Refresh Information</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. LOADING / ERROR STATES                                                 */}
        {/* ========================================================================= */}
        {loading && (
          <div className="rounded-3xl bg-white border border-slate-200/80 p-12 text-center shadow-xs">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-600 mb-4 animate-pulse">
              <RefreshCw className="h-6 w-6 animate-spin" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Loading child details...</h3>
            <p className="text-xs text-slate-500 mt-1">
              Fetching records from school database for {parentEmail}
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="rounded-3xl bg-rose-50 border border-rose-200/80 p-8 text-center shadow-xs">
            <div className="h-12 w-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-rose-900">Unable to Load Children</h3>
            <p className="text-xs text-rose-700 mt-1 max-w-md mx-auto">{error}</p>
            <button
              onClick={fetchChildren}
              className="mt-4 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. MAIN CHILDREN DISPLAY                                                  */}
        {/* ========================================================================= */}
        {!loading && !error && data && (
          <div className="space-y-8">
            {/* Child Selection Cards (if parent has multiple children) */}
            {data.children.length > 1 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Select Child
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.children.map((child) => {
                    const isSelected = child.id === selectedChild?.id;
                    return (
                      <button
                        key={child.id}
                        onClick={() => setSelectedChildId(child.id)}
                        className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20 scale-[1.02]"
                            : "bg-white hover:bg-slate-50 border-slate-200/80 text-slate-800 shadow-xs"
                        }`}
                      >
                        <div
                          className={`h-12 w-12 rounded-xl flex items-center justify-center font-bold text-base shrink-0 ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-indigo-50 text-indigo-600"
                          }`}
                        >
                          {child.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold truncate text-sm">
                            {child.name}
                          </div>
                          <div
                            className={`text-xs truncate ${
                              isSelected ? "text-indigo-100" : "text-slate-500"
                            }`}
                          >
                            {child.class} • {child.section} (Roll: {child.roll})
                          </div>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="h-5 w-5 text-white shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* If no children linked */}
            {data.children.length === 0 && (
              <div className="rounded-3xl bg-white border border-slate-200/80 p-12 text-center shadow-xs">
                <div className="h-16 w-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No Children Linked Yet</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                  There are currently no student accounts linked to this parent profile in the school system.
                  Please contact the school office or administrator to link your student.
                </p>
              </div>
            )}

            {/* Detailed Selected Child Overview Card */}
            {selectedChild && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Student Identity Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500" />

                    {/* Avatar & Main Identity */}
                    <div className="flex flex-col items-center text-center space-y-3 pt-2">
                      <div className="relative">
                        <div className="h-24 w-24 rounded-3xl bg-gradient-to-tr from-indigo-600 to-blue-500 p-1 shadow-xl shadow-indigo-500/20">
                          <div className="h-full w-full bg-slate-900 rounded-[22px] flex items-center justify-center text-white text-3xl font-black">
                            {selectedChild.photo ? (
                              <Image
                                src={selectedChild.photo}
                                alt={selectedChild.name}
                                width={96}
                                height={96}
                                className="h-full w-full object-cover rounded-[22px]"
                              />
                            ) : (
                              selectedChild.name.charAt(0)
                            )}
                          </div>
                        </div>
                        <span className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
                      </div>

                      <div className="space-y-1">
                        <h2 className="text-xl font-bold text-slate-900">
                          {selectedChild.name}
                        </h2>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
                          <UserCheck className="h-3 w-3" />
                          <span>Student ID: {selectedChild.studentId}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Metadata List */}
                    <div className="space-y-3 pt-2 border-t border-slate-100 text-xs sm:text-sm">
                      <div className="flex items-center justify-between py-1.5">
                        <span className="text-slate-500 font-medium">Class & Section</span>
                        <span className="font-bold text-slate-900">
                          {selectedChild.class} — {selectedChild.section}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-1.5">
                        <span className="text-slate-500 font-medium">Roll Number</span>
                        <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                          Roll #{selectedChild.roll}
                        </span>
                      </div>

                      {selectedChild.group && (
                        <div className="flex items-center justify-between py-1.5">
                          <span className="text-slate-500 font-medium">Academic Group</span>
                          <span className="font-semibold text-slate-800">
                            {selectedChild.group}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between py-1.5">
                        <span className="text-slate-500 font-medium">Gender</span>
                        <span className="font-semibold text-slate-800 capitalize">
                          {selectedChild.gender?.toLowerCase() || "Not specified"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-1.5">
                        <span className="text-slate-500 font-medium">Relation to You</span>
                        <span className="font-bold text-slate-900 capitalize">
                          {selectedChild.relation?.toLowerCase() || "Guardian"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-1.5">
                        <span className="text-slate-500 font-medium">Enrollment Status</span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          <span>{selectedChild.status}</span>
                        </span>
                      </div>

                      {selectedChild.isPrimaryContact && (
                        <div className="pt-2">
                          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 text-amber-900 text-xs flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
                            <span>You are designated as the <b>Primary Contact</b> for this student.</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: Academic Modules & Quick Action Cards */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Academic Hub Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Class Routine Card */}
                    <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="h-11 w-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900">
                          Weekly Class Routine
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          View the full 5-day period-by-period class schedule for {selectedChild.class} ({selectedChild.section}).
                        </p>
                      </div>
                      <Link
                        href="/dashboard/routines"
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-bold text-xs border border-slate-200/80 hover:border-indigo-200 transition-all group"
                      >
                        <span>Open Schedule</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Results & Progress Card */}
                    <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="h-11 w-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                          <Award className="h-5 w-5" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900">
                          Academic Results & GPA
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Check marksheet, grade point average (GPA), subject remarks, and term examination reports.
                        </p>
                      </div>
                      <Link
                        href="/admin/dashboard/results"
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-bold text-xs border border-slate-200/80 hover:border-indigo-200 transition-all group"
                      >
                        <span>View Progress Report</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Attendance Report Card */}
                    <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="h-11 w-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                          <Clock className="h-5 w-5" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900">
                          Attendance Summary
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Monitor daily attendance rate, present days, leave history, and monthly attendance percentages.
                        </p>
                      </div>
                      <Link
                        href="/dashboard/attendance"
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-bold text-xs border border-slate-200/80 hover:border-emerald-200 transition-all group"
                      >
                        <span>Check Attendance</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* School Noticeboard Card */}
                    <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="h-11 w-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                          <FileText className="h-5 w-5" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900">
                          Official Notices & Circulars
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Stay updated with upcoming exam dates, parent-teacher conferences, and holiday notices.
                        </p>
                      </div>
                      <Link
                        href="/admin/dashboard/notices"
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-700 font-bold text-xs border border-slate-200/80 hover:border-amber-200 transition-all group"
                      >
                        <span>Read Circulars</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Academic Highlights Banner */}
                  <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-800 p-6 sm:p-7 text-white shadow-lg space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm sm:text-base">
                          {selectedChild.class} ({selectedChild.section}) Academic Session 2026
                        </h4>
                        <p className="text-xs text-indigo-100">
                          Curriculum running according to the national syllabus guidelines.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center text-xs">
                      <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                        <div className="text-lg font-extrabold">5</div>
                        <div className="text-indigo-200 text-[11px]">Periods / Day</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                        <div className="text-lg font-extrabold">Sun - Thu</div>
                        <div className="text-indigo-200 text-[11px]">School Days</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                        <div className="text-lg font-extrabold">Fri - Sat</div>
                        <div className="text-indigo-200 text-[11px]">Weekly Holiday</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                        <div className="text-lg font-extrabold">9:00 - 1:30</div>
                        <div className="text-indigo-200 text-[11px]">School Hours</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
