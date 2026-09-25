"use client";

import React from "react";
import { ShieldCheck, Phone, Mail, MapPin, GraduationCap, RefreshCw } from "lucide-react";

interface MyChildrenHeaderProps {
  parentName?: string;
  phone?: string;
  email?: string;
  address?: string;
  totalChildren: number;
  loading: boolean;
  onRefresh: () => void;
}

export function MyChildrenHeader({
  parentName,
  phone,
  email,
  address,
  totalChildren,
  loading,
  onRefresh,
}: MyChildrenHeaderProps) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-xs relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-800" />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pt-1">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
            <span>Parent Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Student Profile & Academic Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Welcome back, <span className="font-bold text-slate-800">{parentName || "Parent"}</span>. Review your child&apos;s complete student profile, registered subjects, and guardian records below.
          </p>

          {/* Parent Contact Badges */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs text-slate-600">
            {phone && (
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200/80">
                <Phone className="h-3.5 w-3.5 text-indigo-600" />
                <span className="font-medium">{phone}</span>
              </div>
            )}
            {email && (
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200/80">
                <Mail className="h-3.5 w-3.5 text-blue-600" />
                <span className="font-medium">{email}</span>
              </div>
            )}
            {address && (
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200/80">
                <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                <span className="font-medium">{address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Action & Child Count */}
        <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
          <div className="bg-indigo-50/80 border border-indigo-100 rounded-2xl px-4 py-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900 leading-none">
                {totalChildren}
              </div>
              <div className="text-[11px] text-slate-500 font-semibold mt-0.5">
                Enrolled {totalChildren === 1 ? "Child" : "Children"}
              </div>
            </div>
          </div>

          <button
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold shadow-2xs transition-all cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${loading ? "animate-spin text-indigo-600" : ""}`}
            />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
}
