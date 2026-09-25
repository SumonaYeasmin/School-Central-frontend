"use client";

import React, { useState, useMemo } from "react";
import { BookOpen, Search, Sparkles } from "lucide-react";
import { ParentChildInfo } from "@/src/services/parentService";

interface EnrolledSubjectsCardProps {
  child: ParentChildInfo;
}

export function EnrolledSubjectsCard({ child }: EnrolledSubjectsCardProps) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "COMPULSORY" | "OPTIONAL">("ALL");

  const filteredSubjects = useMemo(() => {
    if (!child.subjects) return [];
    return child.subjects.filter((sub) => {
      const matchSearch =
        sub.name.toLowerCase().includes(search.toLowerCase()) ||
        (sub.code && sub.code.toLowerCase().includes(search.toLowerCase()));

      if (!matchSearch) return false;
      if (filterType === "COMPULSORY") return sub.isCompulsory;
      if (filterType === "OPTIONAL") return sub.isOptional || !sub.isCompulsory;
      return true;
    });
  }, [child.subjects, search, filterType]);

  if (!child.subjects || child.subjects.length === 0) return null;

  const compulsoryCount = child.subjects.filter((s) => s.isCompulsory).length;
  const optionalCount = child.subjects.length - compulsoryCount;

  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-5">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Enrolled Curriculum Subjects
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Registered syllabus & courses for {child.class} ({child.section})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3.5 py-1.5 rounded-xl border border-indigo-100 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            {child.subjects.length} Subjects Total
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Box */}
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search subject by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 text-xs font-semibold overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterType("ALL")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              filterType === "ALL"
                ? "bg-indigo-600 text-white font-bold shadow-xs"
                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
            }`}
          >
            All ({child.subjects.length})
          </button>
          <button
            onClick={() => setFilterType("COMPULSORY")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              filterType === "COMPULSORY"
                ? "bg-indigo-600 text-white font-bold shadow-xs"
                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
            }`}
          >
            Compulsory ({compulsoryCount})
          </button>
          {optionalCount > 0 && (
            <button
              onClick={() => setFilterType("OPTIONAL")}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                filterType === "OPTIONAL"
                  ? "bg-indigo-600 text-white font-bold shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              Optional ({optionalCount})
            </button>
          )}
        </div>
      </div>

      {/* 2-Column Subject Cards Grid (Takes natural full space, no scrollbar) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map((sub, idx) => (
            <div
              key={sub.id || idx}
              className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-indigo-300 hover:bg-white hover:shadow-xs transition-all flex items-center justify-between gap-3.5"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs ${
                    sub.isCompulsory
                      ? "bg-indigo-100 text-indigo-700 border border-indigo-200/60"
                      : "bg-emerald-100 text-emerald-700 border border-emerald-200/60"
                  }`}
                >
                  {sub.name.charAt(0)}
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="font-bold text-sm text-slate-900 truncate">
                    {sub.name}
                  </div>
                  <div className="text-xs text-slate-500 font-medium truncate">
                    {sub.code || `Code: SUB-${idx + 101}`}
                  </div>
                </div>
              </div>

              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg shrink-0 ${
                  sub.isCompulsory
                    ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                }`}
              >
                {sub.isCompulsory ? "Compulsory" : "Optional"}
              </span>
            </div>
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-sm text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            No subjects match your search or filter.
          </div>
        )}
      </div>
    </div>
  );
}

