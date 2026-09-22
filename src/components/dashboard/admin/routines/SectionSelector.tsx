"use client";

import { useState, useMemo, useEffect } from "react";
import { Layers, Clock, Coffee, Sparkles } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { SectionRoutine, MOCK_ROUTINES, CLASSES_LIST } from "./mockRoutines";

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
  // Find current active class from selectedId
  const currentSelectedRoutine = useMemo(() => {
    return routines.find((r) => r.id === selectedId) || routines[0];
  }, [routines, selectedId]);

  // Selected Class tab (e.g., "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", or "ALL")
  const [activeClassTab, setActiveClassTab] = useState<string>(
    currentSelectedRoutine?.grade || "Class 6"
  );

  // Sync activeClassTab if selectedId changes from outside
  useEffect(() => {
    if (currentSelectedRoutine?.grade && activeClassTab !== "ALL") {
      setActiveClassTab(currentSelectedRoutine.grade);
    }
  }, [currentSelectedRoutine]);

  // Dynamic unique list of classes
  const classesList = useMemo(() => {
    const list = Array.from(new Set(routines.map((r) => r.grade)));
    return list.length > 0 ? list : Array.from(CLASSES_LIST);
  }, [routines]);

  // Filtered routines based on selected class tab
  const filteredRoutines = useMemo(() => {
    if (activeClassTab === "ALL") return routines;
    return routines.filter((r) => r.grade === activeClassTab);
  }, [routines, activeClassTab]);

  // Handle class tab click
  const handleClassTabChange = (cls: string) => {
    setActiveClassTab(cls);
    const firstInSection = routines.find((r) => (cls === "ALL" ? true : r.grade === cls));
    if (firstInSection && firstInSection.id !== selectedId) {
      onSelectSection(firstInSection.id);
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
      {/* 1. Header with Timing Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-blue-500" />
            <span>CHOOSE CLASS & SECTION ROUTINE</span>
          </span>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
            Section-wise Class Routine
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select a Class and Section below to view its specific weekly schedule.
          </p>
        </div>

        {/* School timing badges */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <Badge
            variant="outline"
            className="bg-blue-50/80 text-blue-700 border-blue-200/80 text-xs font-semibold py-1 px-3 rounded-xl flex items-center gap-1.5 shadow-2xs"
          >
            <Clock className="h-3.5 w-3.5 text-blue-500" />
            <span>10:00 AM - 4:00 PM</span>
          </Badge>
          <Badge
            variant="outline"
            className="bg-amber-50/80 text-amber-800 border-amber-200/80 text-xs font-semibold py-1 px-3 rounded-xl flex items-center gap-1.5 shadow-2xs"
          >
            <Coffee className="h-3.5 w-3.5 text-amber-600" />
            <span>Tiffin · 1:00 - 2:00 PM</span>
          </Badge>
        </div>
      </div>

      {/* 2. Class Selector Filter Tabs */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Select Class:
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Showing {filteredRoutines.length} Section{filteredRoutines.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
          {classesList.map((cls) => {
            const isActive = activeClassTab === cls;
            return (
              <button
                key={cls}
                type="button"
                onClick={() => handleClassTabChange(cls)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20 scale-[1.02]"
                    : "bg-slate-100/80 hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 border border-slate-200/60"
                }`}
              >
                {cls}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => handleClassTabChange("ALL")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
              activeClassTab === "ALL"
                ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20 scale-[1.02]"
                : "bg-slate-100/80 hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 border border-slate-200/60"
            }`}
          >
            All Classes
          </button>
        </div>
      </div>

      {/* 3. Section Cards Grid */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Select Section Routine:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 pt-1">
          {filteredRoutines.map((routine) => {
            const isSelected = routine.id === selectedId;

            return (
              <div
                key={routine.id}
                onClick={() => onSelectSection(routine.id)}
                className={`rounded-2xl p-4.5 cursor-pointer transition-all duration-200 text-left relative flex flex-col justify-between group ${
                  isSelected
                    ? "bg-blue-50/50 border-2 border-blue-500 shadow-md ring-4 ring-blue-500/10 scale-[1.01]"
                    : "bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-xs hover:bg-slate-50/50"
                }`}
              >
                {/* Card Top: Icon & Selected Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`h-9 w-9 rounded-xl flex items-center justify-center font-black text-xs transition-colors ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
                      }`}
                    >
                      {routine.section.replace(/Section\s*/i, "") || <Layers className="h-4 w-4" />}
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 block">
                        {routine.grade}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-sm leading-tight">
                        {routine.section}
                      </h3>
                    </div>
                  </div>

                  {isSelected ? (
                    <Badge
                      variant="outline"
                      className="bg-emerald-50 text-emerald-700 border-emerald-300 text-[10px] font-bold py-0.5 px-2 rounded-full"
                    >
                      Active
                    </Badge>
                  ) : (
                    <span className="text-[11px] font-semibold text-slate-400">
                      {routine.room}
                    </span>
                  )}
                </div>

                {/* Card Body: Class Teacher & Room */}
                <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="truncate pr-2">
                    <span className="text-slate-400 text-[11px] block">Teacher</span>
                    <span className="font-semibold text-slate-700 truncate block">
                      {routine.classTeacher}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-slate-400 text-[11px] block">Students</span>
                    <span className="font-bold text-slate-800">
                      {routine.studentCount}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
