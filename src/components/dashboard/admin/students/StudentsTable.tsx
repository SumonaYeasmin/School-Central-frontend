"use client";

import { useState } from "react";
import { Search, GraduationCap } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { StudentTableActions } from "./StudentTableActions";
import { MockStudent, MOCK_STUDENTS } from "./mockStudents";

interface StudentsTableProps {
  students?: MockStudent[];
}

// Avatar color palettes matching the screenshot
const AVATAR_COLORS = [
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-rose-100", text: "text-rose-700" },
  { bg: "bg-cyan-100", text: "text-cyan-700" },
];

export function StudentsTable({ students = MOCK_STUDENTS }: StudentsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter students by search query
  const filteredStudents = students.filter((student) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const nameMatch = student.name?.toLowerCase().includes(query);
    const idMatch = student.studentId?.toLowerCase().includes(query);
    const classMatch = student.class?.toLowerCase().includes(query);
    const guardianMatch = student.guardian?.toLowerCase().includes(query);
    return nameMatch || idMatch || classMatch || guardianMatch;
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
            placeholder="Search by name or ID..."
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
              : "No student records available."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">ID</th>
                <th className="py-3.5 px-4">Class</th>
                <th className="py-3.5 px-4">Guardian</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredStudents.map((student, index) => {
                const avatar = AVATAR_COLORS[index % AVATAR_COLORS.length];

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
                          {student.initials}
                        </div>
                        <span className="font-bold text-slate-900 text-sm">
                          {student.name}
                        </span>
                      </div>
                    </td>

                    {/* 2. ID */}
                    <td className="py-4 px-4">
                      <span className="text-xs font-medium text-slate-500 font-mono">
                        {student.studentId}
                      </span>
                    </td>

                    {/* 3. Class */}
                    <td className="py-4 px-4">
                      <span className="text-xs font-semibold text-slate-700">
                        {student.class}
                      </span>
                    </td>

                    {/* 4. Guardian */}
                    <td className="py-4 px-4">
                      <span className="text-xs font-medium text-slate-600">
                        {student.guardian}
                      </span>
                    </td>

                    {/* 5. Actions (with Details Button replacing Attend.) */}
                    <td className="py-4 px-4 text-right">
                      <StudentTableActions />
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
