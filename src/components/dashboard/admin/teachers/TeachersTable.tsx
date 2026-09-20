"use client";

import { useState } from "react";
import { Search, Users } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { TeacherTableActions } from "./TeacherTableActions";
import { MockTeacher, MOCK_TEACHERS } from "./mockTeachers";

interface TeachersTableProps {
  teachers?: MockTeacher[];
}

// Avatar color palettes matching screenshot
const AVATAR_COLORS = [
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-rose-100", text: "text-rose-700" },
  { bg: "bg-cyan-100", text: "text-cyan-700" },
];

export function TeachersTable({ teachers = MOCK_TEACHERS }: TeachersTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter teachers by search query
  const filteredTeachers = teachers.filter((teacher) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const nameMatch = teacher.name?.toLowerCase().includes(query);
    const assignmentMatch = teacher.assignment?.toLowerCase().includes(query);
    const emailMatch = teacher.email?.toLowerCase().includes(query);
    return nameMatch || assignmentMatch || emailMatch;
  });

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs space-y-6">
      {/* 1. Directory Section Header */}
      <div>
        <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
          PEOPLE DIRECTORY
        </span>
        <h2 className="text-xl font-bold text-slate-900 mt-1">
          All teachers
        </h2>
      </div>

      {/* 2. Controls / Search bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search teachers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* 3. Teachers Table */}
      {filteredTeachers.length === 0 ? (
        <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mx-auto">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No teachers found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? `No teachers matching "${searchQuery}". Try a different keyword.`
              : "No teacher records available."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Teacher</th>
                <th className="py-3.5 px-4">Assignment</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredTeachers.map((teacher, index) => {
                const avatar = AVATAR_COLORS[index % AVATAR_COLORS.length];

                return (
                  <tr
                    key={teacher.id || index}
                    className="group hover:bg-slate-50/50 transition-colors duration-150"
                  >
                    {/* 1. Teacher (Avatar + Name) */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${avatar.bg} ${avatar.text} font-bold text-xs shrink-0`}
                        >
                          {teacher.initials}
                        </div>
                        <span className="font-bold text-slate-900 text-sm">
                          {teacher.name}
                        </span>
                      </div>
                    </td>

                    {/* 2. Assignment */}
                    <td className="py-4 px-4">
                      <span className="text-xs font-medium text-slate-600">
                        {teacher.assignment}
                      </span>
                    </td>

                    {/* 3. Contact Email */}
                    <td className="py-4 px-4">
                      <span className="text-xs font-medium text-slate-500">
                        {teacher.email}
                      </span>
                    </td>

                    {/* 4. Actions (with Details Button replacing Students) */}
                    <td className="py-4 px-4 text-right">
                      <TeacherTableActions />
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
