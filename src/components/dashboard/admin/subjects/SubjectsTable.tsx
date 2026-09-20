"use client";

import { useState } from "react";
import { BookOpen, Search, School } from "lucide-react";
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

  // Filter subjects by search
  const filteredSubjects = subjects.filter((subj) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const nameMatch = subj.name?.toLowerCase().includes(query);
    const codeMatch = subj.code?.toLowerCase().includes(query);
    const classMatch = formatClassesSummary(subj)?.toLowerCase().includes(query);
    const teacherName = getLeadTeacher(subj);
    const teacherMatch = teacherName?.toLowerCase().includes(query);
    return nameMatch || codeMatch || classMatch || teacherMatch;
  });

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs space-y-6">
      {/* 1. Directory Section Header */}
      <div>
        <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
          CURRICULUM LIBRARY
        </span>
        <h2 className="text-xl font-bold text-slate-900 mt-1">
          Subject directory
        </h2>
      </div>

      {/* 2. Controls / Search bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* 3. Subjects Table */}
      {filteredSubjects.length === 0 ? (
        <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mx-auto">
            <School className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No subjects found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? `No subjects matching "${searchQuery}". Try a different keyword.`
              : "No subjects are available in the database."}
          </p>
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
                    className="group hover:bg-slate-50/50 transition-colors duration-150"
                  >
                    {/* 1. Subject Name (সরাসরি DB থেকে subj.name) */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent.bg} ${accent.border} ${accent.text} border shrink-0`}
                        >
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <span className="font-bold text-slate-900 text-sm">
                          {subj.name}
                        </span>
                      </div>
                    </td>

                    {/* 2. Subject Code (সরাসরি DB থেকে subj.code || "N/A") */}
                    <td className="py-4 px-4">
                      <span className="text-xs font-medium text-slate-500 font-mono">
                        {code}
                      </span>
                    </td>

                    {/* 3. Classes (DB রিলেশন subj.classSubjects থেকে ফরম্যাট করা) */}
                    <td className="py-4 px-4">
                      <span className="text-xs font-semibold text-slate-700">
                        {classesSummary}
                      </span>
                    </td>

                    {/* 4. Lead Teacher (DB TeacherAssignment থেকে) */}
                    <td className="py-4 px-4">
                      {teacher ? (
                        <span className="text-xs font-medium text-slate-700">
                          {teacher}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          Not assigned
                        </span>
                      )}
                    </td>

                    {/* 5. Actions (Details Button) */}
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
