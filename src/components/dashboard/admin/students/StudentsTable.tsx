"use client";

import { useState, useMemo } from "react";
import { Search, GraduationCap, X, SlidersHorizontal, Layers } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { StudentTableActions } from "./StudentTableActions";
import { Student } from "@/src/types/student";

interface StudentsTableProps {
  students?: Student[];
  classesList?: any[];
}

// Avatar color palettes matching the design
const AVATAR_COLORS = [
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-rose-100", text: "text-rose-700" },
  { bg: "bg-cyan-100", text: "text-cyan-700" },
];

export function StudentsTable({
  students = [],
  classesList = [],
}: StudentsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClassId, setSelectedClassId] = useState<string>("ALL");
  const [selectedSectionId, setSelectedSectionId] = useState<string>("ALL");

  // Helper: Initials generator
  const getInitials = (name: string) => {
    if (!name) return "ST";
    return name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // Helper: Guardian Name extractor
  const getGuardianName = (student: Student) => {
    if (student.parents && student.parents.length > 0) {
      const primary =
        student.parents.find((p) => p.isPrimary) || student.parents[0];
      const rel = primary.relation
        ? ` (${primary.relation.charAt(0).toUpperCase() + primary.relation.slice(1).toLowerCase()})`
        : "";
      return `${primary.parent?.name || "Not Assigned"}${rel}`;
    }
    return "Not Assigned";
  };

  // Helper: Section Name formatter (e.g., "Section A" instead of "Sec Section A" or "Sec A")
  const formatSectionName = (name?: string) => {
    if (!name) return "";
    let clean = name.trim();
    // Strip redundant "Sec Section" or "Sec " if present
    clean = clean.replace(/^sec\s+(section\s+)?/i, "$1");
    if (/^section\s+/i.test(clean)) {
      return clean;
    }
    return `Section ${clean}`;
  };

  // 1. Build sorted unique class options from backend list and students
  const classOptions = useMemo(() => {
    const map = new Map<string, { id: string; name: string; count: number }>();

    // Add from classesList
    classesList.forEach((cls) => {
      map.set(cls.id, { id: cls.id, name: cls.name, count: 0 });
    });

    // Count students per class
    students.forEach((s) => {
      const cId = s.classId || s.class?.id;
      const cName = s.class?.name || "Other";
      if (cId) {
        if (!map.has(cId)) {
          map.set(cId, { id: cId, name: cName, count: 0 });
        }
        const item = map.get(cId)!;
        item.count += 1;
      }
    });

    const list = Array.from(map.values());
    // Natural numeric sort (Class 6 -> Class 7 -> Class 8...)
    return list.sort((a, b) => {
      const numA = parseInt(a.name.replace(/\D/g, ""), 10) || 0;
      const numB = parseInt(b.name.replace(/\D/g, ""), 10) || 0;
      if (numA !== numB) return numA - numB;
      return a.name.localeCompare(b.name, undefined, { numeric: true });
    });
  }, [classesList, students]);

  // 2. Sections available for the currently selected class
  const availableSections = useMemo(() => {
    if (selectedClassId === "ALL") return [];

    const matchedBackendClass = classesList.find((c) => c.id === selectedClassId);
    const map = new Map<string, { id: string; name: string; count: number }>();

    if (matchedBackendClass?.sections) {
      matchedBackendClass.sections.forEach((sec: any) => {
        map.set(sec.id, { id: sec.id, name: sec.name, count: 0 });
      });
    }

    // Also count students in each section of this selected class
    students.forEach((s) => {
      const cId = s.classId || s.class?.id;
      if (cId === selectedClassId) {
        const sId = s.sectionId || s.section?.id;
        const sName = s.section?.name || "Default";
        if (sId) {
          if (!map.has(sId)) {
            map.set(sId, { id: sId, name: sName, count: 0 });
          }
          const item = map.get(sId)!;
          item.count += 1;
        }
      }
    });

    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true })
    );
  }, [selectedClassId, classesList, students]);

  // Handle class selection
  const handleSelectClass = (classId: string) => {
    setSelectedClassId(classId);
    setSelectedSectionId("ALL"); // Reset section when class changes
  };

  // Reset all active filters
  const handleResetFilters = () => {
    setSelectedClassId("ALL");
    setSelectedSectionId("ALL");
    setSearchQuery("");
  };

  // 3. Multi-condition Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      // Class filter
      if (selectedClassId !== "ALL") {
        const sClassId = student.classId || student.class?.id;
        if (sClassId !== selectedClassId) return false;
      }

      // Section filter
      if (selectedSectionId !== "ALL") {
        const sSectionId = student.sectionId || student.section?.id;
        if (sSectionId !== selectedSectionId) return false;
      }

      // Search query filter
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const nameMatch = student.name?.toLowerCase().includes(query);
        const idMatch = student.studentId?.toLowerCase().includes(query);
        const rollMatch = student.roll?.toLowerCase().includes(query);
        const classMatch = student.class?.name?.toLowerCase().includes(query);
        const guardianMatch = getGuardianName(student)
          .toLowerCase()
          .includes(query);
        return nameMatch || idMatch || rollMatch || classMatch || guardianMatch;
      }

      return true;
    });
  }, [students, selectedClassId, selectedSectionId, searchQuery]);

  const hasActiveFilters =
    selectedClassId !== "ALL" ||
    selectedSectionId !== "ALL" ||
    searchQuery.trim().length > 0;

  const activeClassName =
    classOptions.find((c) => c.id === selectedClassId)?.name || "";

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs space-y-6">
      {/* 1. Directory Section Header & Live Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
            STUDENT DIRECTORY
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Enrolled students
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
            Showing <strong className="text-blue-600">{filteredStudents.length}</strong> of{" "}
            {students.length} students
          </span>
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-medium text-slate-500 hover:text-rose-600 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-rose-50"
            >
              <X className="h-3.5 w-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* 2. Interactive Class Filter Tabs (Pills) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Layers className="h-3.5 w-3.5 text-blue-600" />
          <span>Filter by Class:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* All Classes Pill */}
          <button
            type="button"
            onClick={() => handleSelectClass("ALL")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
              selectedClassId === "ALL"
                ? "bg-blue-600 text-white shadow-xs shadow-blue-500/20"
                : "bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
            }`}
          >
            <span>All Classes</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                selectedClassId === "ALL"
                  ? "bg-white/20 text-white"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {students.length}
            </span>
          </button>

          {/* Dynamic Class Pills */}
          {classOptions.map((cls) => {
            const isSelected = selectedClassId === cls.id;
            return (
              <button
                key={cls.id}
                type="button"
                onClick={() => handleSelectClass(cls.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-xs shadow-blue-500/20"
                    : "bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                }`}
              >
                <span>{cls.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {cls.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Controls / Search bar + Dynamic Section Pills (if class selected) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
        {/* Search bar */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search student by name, ID, roll or guardian..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-9 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200/50"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Dynamic Section Filter (Shown only when a specific class is selected) */}
        {selectedClassId !== "ALL" && availableSections.length > 0 && (
          <div className="flex items-center flex-wrap gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200/70">
            <span className="text-[11px] font-bold text-slate-400 px-2 uppercase tracking-wide">
              Section:
            </span>
            <button
              type="button"
              onClick={() => setSelectedSectionId("ALL")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedSectionId === "ALL"
                  ? "bg-white text-blue-700 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All
            </button>
            {availableSections.map((sec) => {
              const isSelected = selectedSectionId === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setSelectedSectionId(sec.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                    isSelected
                      ? "bg-white text-blue-700 shadow-xs border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span>{formatSectionName(sec.name)}</span>
                  <span className="text-[10px] text-slate-400">({sec.count})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Students Table */}
      {filteredStudents.length === 0 ? (
        <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center space-y-3 bg-slate-50/40">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mx-auto">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            No students found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? `No students matching "${searchQuery}" in ${
                  selectedClassId !== "ALL" ? activeClassName : "the database"
                }.`
              : selectedClassId !== "ALL"
              ? `No students are currently enrolled in ${activeClassName}.`
              : "No students are currently enrolled in the database."}
          </p>
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors mt-2"
            >
              <X className="h-3.5 w-3.5" />
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Student ID / Roll</th>
                <th className="py-3.5 px-4">Class & Section</th>
                <th className="py-3.5 px-4">Guardian</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredStudents.map((student, index) => {
                const avatar = AVATAR_COLORS[index % AVATAR_COLORS.length];
                const className = student.class?.name || "N/A";
                const sectionName = student.section?.name
                  ? ` · ${formatSectionName(student.section.name)}`
                  : "";
                const guardian = getGuardianName(student);

                return (
                  <tr
                    key={student.id || index}
                    className="group hover:bg-slate-50/70 transition-colors duration-150"
                  >
                    {/* 1. Student (Avatar + Name) */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${avatar.bg} ${avatar.text} font-bold text-xs shrink-0 shadow-2xs`}
                        >
                          {getInitials(student.name)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 text-sm block">
                            {student.name}
                          </span>
                          <span className="text-[11px] text-slate-400 capitalize">
                            {student.gender?.toLowerCase() || "student"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* 2. ID & Roll */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-700 font-mono">
                          {student.studentId}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Roll: {student.roll}
                        </span>
                      </div>
                    </td>

                    {/* 3. Class & Section */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200/60">
                        {className}{sectionName}
                      </span>
                    </td>

                    {/* 4. Guardian */}
                    <td className="py-4 px-4">
                      <span className="text-xs font-medium text-slate-600">
                        {guardian}
                      </span>
                    </td>

                    {/* 5. Actions (with Details Button linking to dynamic details page) */}
                    <td className="py-4 px-4 text-right">
                      <StudentTableActions studentId={student.id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

