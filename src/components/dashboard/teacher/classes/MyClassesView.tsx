"use client";

import { useState, useEffect } from "react";
import {
  School,
  BookOpen,
  Users,
  Search,
  RefreshCw,
  Loader2,
  GraduationCap,
  Sparkles,
  Layers,
} from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { getMyAssignments } from "@/src/services/teacherService";
import { TeacherAssignment, Teacher } from "@/src/types/teacher";
import { ClassCard } from "./ClassCard";
import { ClassOverviewStats } from "./ClassOverviewStats";
import { StudentsRosterModal } from "./StudentsRosterModal";

export function MyClassesView() {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [assignments, setAssignments] = useState<TeacherAssignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClassFilter, setSelectedClassFilter] = useState("ALL");
  const [activeModalAssignment, setActiveModalAssignment] =
    useState<TeacherAssignment | null>(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setIsLoading(true);
      // Determine email from session or fallback
      let userEmail = "";
      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("userInfo");
          if (stored) {
            const parsed = JSON.parse(stored);
            userEmail = parsed.email || "";
          }
        } catch {}
      }

      const res = await getMyAssignments(userEmail || undefined);
      if (res && res.assignments) {
        setAssignments(res.assignments);
        if (res.teacher) setTeacher(res.teacher);
      } else if (Array.isArray(res)) {
        setAssignments(res);
      }
    } catch (err) {
      console.error("Error loading teacher assignments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get list of unique class names for filter tabs
  const classNames = Array.from(
    new Set(assignments.map((a) => a.class.name))
  ).sort();

  // Filtered assignments
  const filteredAssignments = assignments.filter((item) => {
    // Class filter
    if (selectedClassFilter !== "ALL" && item.class.name !== selectedClassFilter) {
      return false;
    }
    // Search query filter
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.class.name.toLowerCase().includes(q) ||
      item.section.name.toLowerCase().includes(q) ||
      item.subject.name.toLowerCase().includes(q) ||
      (item.subject.code && item.subject.code.toLowerCase().includes(q))
    );
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 font-sans animate-in fade-in duration-300">
      {/* ================= Header Banner ================= */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-blue-900/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>Faculty Academic Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              My Assigned Classes
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl font-normal">
              View your assigned classroom sections, manage students roster, and quickly enter term grades.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              onClick={fetchAssignments}
              disabled={isLoading}
              variant="outline"
              className="h-11 px-4 rounded-xl bg-white/10 hover:bg-white/20 border-white/20 text-white font-bold text-xs backdrop-blur-md transition-all cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh Classes</span>
            </Button>
          </div>
        </div>
      </div>

      {/* ================= Overview Stats ================= */}
      <ClassOverviewStats assignments={assignments} />

      {/* ================= Filters & Search Bar ================= */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Class Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedClassFilter("ALL")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedClassFilter === "ALL"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              All Classes ({assignments.length})
            </button>
            {classNames.map((cName) => {
              const count = assignments.filter((a) => a.class.name === cName).length;
              return (
                <button
                  key={cName}
                  type="button"
                  onClick={() => setSelectedClassFilter(cName)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    selectedClassFilter === cName
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  {cName} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search section or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9.5 h-10 bg-slate-50 rounded-xl border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>

      {/* ================= Classes Cards Grid ================= */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Loader2 className="h-9 w-9 animate-spin text-blue-600" />
          <p className="text-sm font-semibold text-slate-600">Loading your assigned classes...</p>
        </div>
      ) : filteredAssignments.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-2xs space-y-3">
          <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto">
            <School className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Assigned Classes Found</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            {searchQuery
              ? "No classes match your search query. Try clearing the search."
              : "You do not have any classes assigned yet. Please contact the administrator."}
          </p>
          {searchQuery && (
            <Button
              type="button"
              onClick={() => setSearchQuery("")}
              variant="outline"
              className="h-9 rounded-xl border-slate-300 text-xs font-bold cursor-pointer"
            >
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredAssignments.map((assignment) => (
            <ClassCard
              key={assignment.id}
              assignment={assignment}
              onViewStudents={(a) => setActiveModalAssignment(a)}
            />
          ))}
        </div>
      )}

      {/* ================= Students Roster Modal ================= */}
      <StudentsRosterModal
        isOpen={!!activeModalAssignment}
        onClose={() => setActiveModalAssignment(null)}
        assignment={activeModalAssignment}
      />
    </div>
  );
}
