"use client";

import { Button } from "@/src/components/ui/button";
import { Plus, ChevronRight } from "lucide-react";
import Link from "next/link";

interface RoutinesHeaderProps {
  onAddRoutine?: () => void;
}

export function RoutinesHeader({ onAddRoutine }: RoutinesHeaderProps) {
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

      {/* 2. Main Title and Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Class routines
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Choose a class and section to see its own weekly timetable.
          </p>
        </div>

        {/* 3. Add Routine Button */}
        <Button
          onClick={onAddRoutine}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer text-sm"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Add Routine</span>
        </Button>
      </div>
    </div>
  );
}
