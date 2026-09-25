"use client";

import { useMemo } from "react";
import { Clock, Coffee, Sparkles, Layers } from "lucide-react";
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
  // Find current active routine from selectedId
  const currentRoutine = useMemo(() => {
    return routines.find((r) => r.id === selectedId) || routines[0];
  }, [routines, selectedId]);

  const activeGrade = currentRoutine?.grade || "Class 6";

  // Helper to sort classes in natural numerical order (Class 6, Class 7, Class 8, Class 9, Class 10)
  const sortGradeNames = (a: string, b: string): number => {
    const numA = parseInt(a.replace(/\D/g, ""), 10) || 0;
    const numB = parseInt(b.replace(/\D/g, ""), 10) || 0;
    if (numA !== numB) return numA - numB;
    return a.localeCompare(b);
  };

  // Unique classes list sorted numerically (Class 6 -> Class 10)
  const classesList = useMemo(() => {
    const list = Array.from(new Set(routines.map((r) => r.grade)));
    const baseList = list.length > 0 ? list : Array.from(CLASSES_LIST);
    return [...baseList].sort(sortGradeNames);
  }, [routines]);

  // Sections belonging to the currently selected class (sorted alphabetically e.g. Section A, Section B)
  const classSections = useMemo(() => {
    return routines
      .filter((r) => r.grade === activeGrade)
      .sort((a, b) => a.section.localeCompare(b.section));
  }, [routines, activeGrade]);

  // Handle Class change: Always switch directly to Section A of the newly selected class
  const handleClassChange = (grade: string) => {
    // Find Section A for this class
    const sectionA = routines.find(
      (r) =>
        r.grade === grade &&
        (r.section.toLowerCase() === "section a" ||
          r.section.toLowerCase().includes("a") ||
          r.id.toLowerCase().endsWith("-a"))
    );

    if (sectionA) {
      onSelectSection(sectionA.id);
      return;
    }

    // Fallback to first available section of that class
    const firstSection = routines.find((r) => r.grade === grade);
    if (firstSection) {
      onSelectSection(firstSection.id);
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
      {/* 1. Header with Timing Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-blue-500" />
            <span>CLASS & SECTION ROUTINE</span>
          </span>
          <h2 className="text-lg font-black text-slate-900 mt-0.5">
            Weekly Class Routine
          </h2>
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

      {/* 2. Compact Class and Section Selector in one single responsive bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/70 p-3 rounded-2xl border border-slate-200/70">
        {/* Class Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            Class:
          </span>
          {classesList.map((cls) => {
            const isActive = activeGrade === cls;
            return (
              <button
                key={cls}
                type="button"
                onClick={() => handleClassChange(cls)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20 scale-[1.02]"
                    : "bg-white hover:bg-slate-200/60 text-slate-600 hover:text-slate-900 border border-slate-200/80"
                }`}
              >
                {cls}
              </button>
            );
          })}
        </div>

        {/* Compact Section Selector Pills */}
        <div className="flex items-center gap-2 flex-wrap md:border-l md:border-slate-200 md:pl-4">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Layers className="h-3.5 w-3.5 text-blue-500" />
            <span>Section:</span>
          </span>
          {classSections.map((sec) => {
            const isSelected = sec.id === selectedId;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => onSelectSection(sec.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20 scale-[1.02]"
                    : "bg-white hover:bg-slate-200/60 text-slate-700 hover:text-slate-900 border border-slate-200/80"
                }`}
              >
                <span>{sec.section}</span>
                {isSelected && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 inline-block" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
