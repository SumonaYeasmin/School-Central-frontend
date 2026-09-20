"use client";

import { useState, useMemo } from "react";
import { BookOpen, Search, School, X, Layers, Sparkles } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { SubjectTableActions } from "./SubjectTableActions";

interface SubjectsTableProps {
  subjects?: any[];
}

// Icon accent color cycle matching the design
const ACCENT_COLORS = [
  { bg: "bg-blue-50/80", border: "border-blue-100", text: "text-blue-500" },
  { bg: "bg-amber-50/80", border: "border-amber-100", text: "text-amber-500" },
  { bg: "bg-emerald-50/80", border: "border-emerald-100", text: "text-emerald-500" },
  { bg: "bg-purple-50/80", border: "border-purple-100", text: "text-purple-500" },
  { bg: "bg-rose-50/80", border: "border-rose-100", text: "text-rose-500" },
  { bg: "bg-cyan-50/80", border: "border-cyan-100", text: "text-cyan-500" },
];

export function SubjectsTable({ subjects = [] }: SubjectsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClassKey, setSelectedClassKey] = useState<string>("ALL");
  const [selectedGroup, setSelectedGroup] = useState<string>("ALL");

  // Helper: Format classes summary from real classSubjects in DB (e.g. Class 6–10, Class 9, 10)
  const formatClassesSummary = (subj: any) => {
    if (subj.classes) return subj.classes;
    if (!subj.classSubjects || subj.classSubjects.length === 0) return "All Grades";

    const classNames: string[] = subj.classSubjects
      .map((cs: any) => cs.class?.name)
      .filter(Boolean);

    if (classNames.length === 0) return "Class 6–10";

    // Extract numbers to naturally sort (e.g. Class 6, Class 7, Class 8, Class 9, Class 10)
    const gradeNums = Array.from(
      new Set(
        classNames
          .map((name: string) => parseInt(name.replace(/\D/g, ""), 10))
          .filter((n: number) => !isNaN(n))
      )
    ).sort((a: number, b: number) => a - b);

    if (gradeNums.length > 1) {
      const min = gradeNums[0];
      const max = gradeNums[gradeNums.length - 1];
      if (max - min + 1 === gradeNums.length) {
        return `Class ${min}–${max}`;
      }
      return gradeNums.map((g) => `Class ${g}`).join(", ");
    } else if (gradeNums.length === 1) {
      return `Class ${gradeNums[0]}`;
    }

    return classNames.join(", ");
  };

  // Helper: Extract Assigned Teacher from DB (TeacherAssignment)
  const getLeadTeacher = (subj: any) => {
    if (subj.teacherAssignments && subj.teacherAssignments.length > 0) {
      const teachers = subj.teacherAssignments
        .map((ta: any) => ta.teacher?.name)
        .filter(Boolean);

      if (teachers.length > 0) {
        return Array.from(new Set(teachers)).join(", ");
      }
    }

    if (subj.leadTeacher) return subj.leadTeacher;
    return null; // Not assigned yet in database
  };

  // 1. Build list of unique classes present in subjects with count
  const classOptions = useMemo(() => {
    const map = new Map<string, { key: string; name: string; count: number }>();

    subjects.forEach((subj) => {
      const classSubjects = subj.classSubjects || [];
      const seenForThisSubj = new Set<string>();

      classSubjects.forEach((cs: any) => {
        const cName = cs.class?.name;
        if (cName && !seenForThisSubj.has(cName)) {
          seenForThisSubj.add(cName);
          if (!map.has(cName)) {
            map.set(cName, { key: cName, name: cName, count: 0 });
          }
          map.get(cName)!.count += 1;
        }
      });
    });

    const list = Array.from(map.values());
    // Natural numeric sort: Class 6 -> Class 7 -> Class 8...
    return list.sort((a, b) => {
      const numA = parseInt(a.name.replace(/\D/g, ""), 10) || 0;
      const numB = parseInt(b.name.replace(/\D/g, ""), 10) || 0;
      if (numA !== numB) return numA - numB;
      return a.name.localeCompare(b.name, undefined, { numeric: true });
    });
  }, [subjects]);

  // 2. Groups available for the selected class
  const availableGroups = useMemo(() => {
    const groupsSet = new Set<string>();

    subjects.forEach((subj) => {
      const classSubjects = subj.classSubjects || [];
      classSubjects.forEach((cs: any) => {
        const cName = cs.class?.name;
        if (selectedClassKey === "ALL" || cName === selectedClassKey) {
          if (cs.group?.name) {
            groupsSet.add(cs.group.name);
          }
        }
      });
    });

    return Array.from(groupsSet).sort();
  }, [subjects, selectedClassKey]);

  // Handle class selection
  const handleSelectClass = (key: string) => {
    setSelectedClassKey(key);
    setSelectedGroup("ALL");
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedClassKey("ALL");
    setSelectedGroup("ALL");
    setSearchQuery("");
  };

  // 3. Multi-condition Filtered Subjects
  const filteredSubjects = useMemo(() => {
    return subjects.filter((subj) => {
      const classSubjects: any[] = subj.classSubjects || [];

      // Class filter
      if (selectedClassKey !== "ALL") {
        const belongsToClass = classSubjects.some(
          (cs) => cs.class?.name === selectedClassKey
        );
        if (!belongsToClass) return false;
      }

      // Group filter
      if (selectedGroup !== "ALL") {
        if (selectedGroup === "CORE") {
          const isCore = classSubjects.some((cs) => {
            const matchClass =
              selectedClassKey === "ALL" || cs.class?.name === selectedClassKey;
            return matchClass && !cs.groupId && !cs.group && !cs.isOptional;
          });
          if (!isCore) return false;
        } else {
          const matchesGroup = classSubjects.some((cs) => {
            const matchClass =
              selectedClassKey === "ALL" || cs.class?.name === selectedClassKey;
            return matchClass && cs.group?.name === selectedGroup;
          });
          if (!matchesGroup) return false;
        }
      }

      // Search query
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const nameMatch = subj.name?.toLowerCase().includes(query);
        const codeMatch = subj.code?.toLowerCase().includes(query);
        const classMatch = formatClassesSummary(subj)?.toLowerCase().includes(query);
        const teacherName = getLeadTeacher(subj);
        const teacherMatch = teacherName?.toLowerCase().includes(query);
        return nameMatch || codeMatch || classMatch || teacherMatch;
      }

      return true;
    });
  }, [subjects, selectedClassKey, selectedGroup, searchQuery]);

  const hasActiveFilters =
    selectedClassKey !== "ALL" ||
    selectedGroup !== "ALL" ||
    searchQuery.trim().length > 0;

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs space-y-6">
      {/* 1. Directory Section Header & Live Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
            CURRICULUM LIBRARY
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Subject directory
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
            Showing <strong className="text-blue-600">{filteredSubjects.length}</strong> of{" "}
            {subjects.length} subjects
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
          {/* All Subjects Pill */}
          <button
            type="button"
            onClick={() => handleSelectClass("ALL")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
              selectedClassKey === "ALL"
                ? "bg-blue-600 text-white shadow-xs shadow-blue-500/20"
                : "bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
            }`}
          >
            <span>All Subjects</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                selectedClassKey === "ALL"
                  ? "bg-white/20 text-white"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {subjects.length}
            </span>
          </button>

          {/* Dynamic Class Pills */}
          {classOptions.map((cls) => {
            const isSelected = selectedClassKey === cls.key;
            return (
              <button
                key={cls.key}
                type="button"
                onClick={() => handleSelectClass(cls.key)}
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

      {/* 3. Controls / Search bar + Group Pills (if groups available) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
        {/* Search bar */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search subjects by name, code, or teacher..."
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

        {/* Dynamic Group Filter (Shown when groups like Science/Humanities exist) */}
        {availableGroups.length > 0 && (
          <div className="flex items-center flex-wrap gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200/70">
            <span className="text-[11px] font-bold text-slate-400 px-2 uppercase tracking-wide flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-purple-500" />
              Group:
            </span>
            <button
              type="button"
              onClick={() => setSelectedGroup("ALL")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedGroup === "ALL"
                  ? "bg-white text-blue-700 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setSelectedGroup("CORE")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedGroup === "CORE"
                  ? "bg-white text-blue-700 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Core
            </button>
            {availableGroups.map((gName) => {
              const isSelected = selectedGroup === gName;
              return (
                <button
                  key={gName}
                  type="button"
                  onClick={() => setSelectedGroup(gName)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-white text-purple-700 shadow-xs border border-purple-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {gName}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Subjects Table */}
      {filteredSubjects.length === 0 ? (
        <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center space-y-3 bg-slate-50/40">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mx-auto">
            <School className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            No subjects found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? `No subjects matching "${searchQuery}" in ${
                  selectedClassKey !== "ALL" ? selectedClassKey : "the database"
                }.`
              : selectedClassKey !== "ALL"
              ? `No subjects are currently configured for ${selectedClassKey}.`
              : "No subjects are available in the database."}
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
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Code</th>
                <th className="py-3.5 px-4">Classes</th>
                <th className="py-3.5 px-4">Lead Teacher</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredSubjects.map((subj, index) => {
                const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
                const code = subj.code || "N/A";
                const classesSummary = formatClassesSummary(subj);
                const teacher = getLeadTeacher(subj);

                return (
                  <tr
                    key={subj.id || index}
                    className="group hover:bg-slate-50/70 transition-colors duration-150"
                  >
                    {/* 1. Subject Name (সরাসরি DB থেকে subj.name) */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent.bg} ${accent.border} ${accent.text} border shrink-0 shadow-2xs`}
                        >
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 text-sm block">
                            {subj.name}
                          </span>
                          {subj.classSubjects?.some((cs: any) => cs.group?.name) && (
                            <span className="text-[10px] text-purple-600 font-semibold">
                              {subj.classSubjects
                                .map((cs: any) => cs.group?.name)
                                .filter(Boolean)
                                .join(", ")}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* 2. Subject Code */}
                    <td className="py-4 px-4">
                      <span className="text-xs font-semibold text-slate-600 font-mono bg-slate-100 px-2 py-0.5 rounded-md">
                        {code}
                      </span>
                    </td>

                    {/* 3. Classes */}
                    <td className="py-4 px-4">
                      <span className="text-xs font-semibold text-slate-700">
                        {classesSummary}
                      </span>
                    </td>

                    {/* 4. Lead Teacher */}
                    <td className="py-4 px-4">
                      {teacher ? (
                        <span className="text-xs font-medium text-slate-800">
                          {teacher}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          Not assigned
                        </span>
                      )}
                    </td>

                    {/* 5. Actions */}
                    <td className="py-4 px-4 text-right">
                      <SubjectTableActions />
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

