"use client";

import { useState } from "react";
import { Search, GraduationCap } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { StudentTableActions } from "./StudentTableActions";
import { Student } from "@/src/types/student";

interface StudentsTableProps {
  students?: Student[];
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

export function StudentsTable({ students = [] }: StudentsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

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
      const primary = student.parents.find((p) => p.isPrimary) || student.parents[0];
      const rel = primary.relation
        ? ` (${primary.relation.charAt(0).toUpperCase() + primary.relation.slice(1).toLowerCase()})`
        : "";
      return `${primary.parent?.name || "Not Assigned"}${rel}`;
    }
    return "Not Assigned";
  };

  // Filter students by search query
  const filteredStudents = students.filter((student) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const nameMatch = student.name?.toLowerCase().includes(query);
    const idMatch = student.studentId?.toLowerCase().includes(query);
    const rollMatch = student.roll?.toLowerCase().includes(query);
    const classMatch = student.class?.name?.toLowerCase().includes(query);
    const guardianMatch = getGuardianName(student).toLowerCase().includes(query);
    return nameMatch || idMatch || rollMatch || classMatch || guardianMatch;
  });

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs space-y-6">
      {/* 1. Directory Section Header */}
      <div>
        <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
          STUDENT DIRECTORY
        </span>
        <h2 className="text-xl font-bold text-slate-900 mt-1">
          Enrolled students
        </h2>
      </div>

      {/* 2. Controls / Search bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search by name, ID or class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* 3. Students Table */}
      {filteredStudents.length === 0 ? (
        <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mx-auto">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No students found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? `No students matching "${searchQuery}". Try a different keyword.`
              : "No students are currently enrolled in the database."}
          </p>
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
                const sectionName = student.section?.name ? ` · ${student.section.name}` : "";
                const guardian = getGuardianName(student);

                return (
                  <tr
                    key={student.id || index}
                    className="group hover:bg-slate-50/50 transition-colors duration-150"
                  >
                    {/* 1. Student (Avatar + Name) */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${avatar.bg} ${avatar.text} font-bold text-xs shrink-0`}
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
                        <span className="text-xs font-medium text-slate-700 font-mono">
                          {student.studentId}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Roll: {student.roll}
                        </span>
                      </div>
                    </td>

                    {/* 3. Class & Section */}
                    <td className="py-4 px-4">
                      <span className="text-xs font-semibold text-slate-700">
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
