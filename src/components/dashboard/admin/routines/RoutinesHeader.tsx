"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function RoutinesHeader() {
  return (
    <div className="space-y-4">
      {/* 1. Breadcrumb navigation */}
      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
        <Link href="/admin/dashboard" className="hover:text-slate-600 transition-colors">
          School office
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-300" />
        <span className="text-slate-600 font-semibold">Class Routines</span>
      </div>

      {/* 2. Main Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Class routines
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Choose a class and section to see its own weekly timetable.
        </p>
      </div>
    </div>
  );
}
