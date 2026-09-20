"use client";

import { Layers, Clock, Coffee } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { SectionRoutine, MOCK_ROUTINES } from "./mockRoutines";

interface SectionSelectorProps {
  routines?: SectionRoutine[];
  selectedId: string;
  onSelectSection: (id: string) => void;
}

export function SectionSelector({
  routines = MOCK_ROUTINES,
  selectedId,
  onSelectSection,
}: SectionSelectorProps) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs space-y-5">
      {/* 1. Header with Timing Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
            CHOOSE A CLASS & SECTION
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Every section has its own routine
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any section below to load the full weekly schedule.
          </p>
        </div>

        {/* School timing badges */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <Badge
            variant="outline"
            className="bg-blue-50/80 text-blue-700 border-blue-200/80 text-xs font-semibold py-1 px-3 rounded-xl flex items-center gap-1.5"
          >
            <Clock className="h-3.5 w-3.5 text-blue-500" />
            <span>10:00 AM - 4:00 PM</span>
          </Badge>
          <Badge
            variant="outline"
            className="bg-amber-50/80 text-amber-800 border-amber-200/80 text-xs font-semibold py-1 px-3 rounded-xl flex items-center gap-1.5"
          >
            <Coffee className="h-3.5 w-3.5 text-amber-600" />
            <span>Tiffin · 1:00 - 2:00 PM</span>
          </Badge>
        </div>
      </div>

      {/* 2. Interactive Section Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 pt-1">
        {routines.map((routine) => {
          const isSelected = routine.id === selectedId;

          return (
            <div
              key={routine.id}
              onClick={() => onSelectSection(routine.id)}
              className={`rounded-2xl p-4.5 cursor-pointer transition-all duration-200 text-left relative flex flex-col justify-between ${
                isSelected
                  ? "bg-blue-50/40 border-2 border-blue-500 shadow-sm ring-3 ring-blue-500/10"
                  : "bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-xs"
              }`}
            >
              {/* Card Top: Icon & Selected Badge */}
              <div className="flex items-center justify-between gap-2">
                <div
                  className={`h-9 w-9 rounded-xl flex items-center justify-center ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <Layers className="h-4.5 w-4.5" />
                </div>

                {isSelected && (
                  <Badge
                    variant="outline"
                    className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold py-0.5 px-2 rounded-full"
                  >
                    Selected
                  </Badge>
                )}
              </div>

              {/* Card Body: Class Name, Teacher & Room */}
              <div className="mt-3">
                <h3 className="font-bold text-slate-900 text-sm">
                  {routine.fullName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {routine.classTeacher} · {routine.room}
                </p>
              </div>

              {/* Card Footer: Student Count */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{routine.studentCount} students</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
