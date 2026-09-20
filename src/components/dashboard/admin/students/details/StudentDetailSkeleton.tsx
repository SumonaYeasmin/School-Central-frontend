"use client";

import { Loader2 } from "lucide-react";

export function StudentDetailSkeleton() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top placeholder */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-48 bg-slate-200/70 rounded-md animate-pulse" />
        <div className="h-8 w-32 bg-slate-200/70 rounded-xl animate-pulse" />
      </div>

      {/* Hero card skeleton */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 w-full sm:w-auto">
          <div className="h-20 w-20 rounded-2xl bg-slate-100 animate-pulse" />
          <div className="space-y-2.5 flex-1">
            <div className="h-6 w-40 bg-slate-200/70 rounded-md animate-pulse" />
            <div className="h-4 w-52 bg-slate-100 rounded-md animate-pulse" />
          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="h-14 w-24 bg-slate-100 rounded-2xl animate-pulse" />
          <div className="h-14 w-24 bg-slate-100 rounded-2xl animate-pulse" />
        </div>
      </div>

      {/* Main loading spinner card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-16 flex flex-col items-center justify-center gap-3 text-slate-500 shadow-xs">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-sm font-medium">Loading student details...</p>
      </div>
    </div>
  );
}
