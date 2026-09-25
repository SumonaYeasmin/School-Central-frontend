"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  GraduationCap,
  Calendar,
  Sparkles,
  RefreshCw,
  ArrowRight,
  Clock,
} from "lucide-react";
import { ParentChildInfo } from "@/src/services/parentService";

interface ParentOverviewHeaderProps {
  parentName?: string;
  childrenList: ParentChildInfo[];
  selectedChild: ParentChildInfo | undefined;
  onSelectChild: (id: string) => void;
  loading: boolean;
  onRefresh: () => void;
}

export function ParentOverviewHeader({
  parentName = "Parent",
  childrenList,
  selectedChild,
  onSelectChild,
  loading,
  onRefresh,
}: ParentOverviewHeaderProps) {
  const currentDateFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-4">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 p-6 sm:p-8 text-white shadow-xl border border-indigo-800/40">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 h-40 w-40 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
                <span>Parent Portal Analytics</span>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-medium backdrop-blur-xs">
                <Calendar className="h-3 w-3 text-indigo-300" />
                <span>Session 2026</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome back, {parentName}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Comprehensive academic monitoring, real-time period routines, attendance charts, and examination progress for your enrolled children.
            </p>

            <div className="flex items-center gap-2 text-xs text-indigo-200/80 pt-1">
              <Clock className="h-3.5 w-3.5 text-indigo-400" />
              <span>{currentDateFormatted}</span>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap self-start lg:self-auto">
            <button
              onClick={onRefresh}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs backdrop-blur-md transition-all cursor-pointer shadow-xs active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>{loading ? "Refreshing..." : "Refresh"}</span>
            </button>

            <Link
              href="/dashboard/children"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
            >
              <GraduationCap className="h-4 w-4" />
              <span>My Children</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Child Switcher Tabs (when parent has multiple children) */}
      {childrenList && childrenList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
            Viewing Child:
          </span>
          {childrenList.map((child) => (
            <button
              key={child.id}
              onClick={() => onSelectChild(child.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer whitespace-nowrap ${
                child.id === selectedChild?.id
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20"
                  : "bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              <span>{child.name}</span>
              <span className="opacity-80 text-[11px]">({child.class} - {child.section})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
