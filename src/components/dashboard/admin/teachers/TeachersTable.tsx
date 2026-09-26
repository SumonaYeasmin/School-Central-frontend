"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Users,
  Building2,
  BookOpen,
  Eye,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import Link from "next/link";
import { Teacher } from "@/src/types/teacher";

interface TeachersTableProps {
  teachers?: Teacher[];
  onAddTeacher?: () => void;
  onEdit?: (teacher: Teacher) => void;
  onAssignSubject?: (teacher: Teacher) => void;
  onDelete?: (teacher: Teacher) => void;
}

const AVATAR_COLORS = [
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-rose-100", text: "text-rose-700" },
  { bg: "bg-cyan-100", text: "text-cyan-700" },
];

function getInitials(name: string) {
  if (!name) return "TC";
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TeachersTable({
  teachers = [],
  onEdit = () => { },
  onAssignSubject = () => { },
  onDelete = () => { },
  onAddTeacher = () => { },
}: TeachersTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("ALL");

  // Dynamic Departments from current teachers
  const departmentOptions = useMemo(() => {
    const deptSet = new Set<string>();
    teachers.forEach((t) => {
      if (t.department) deptSet.add(t.department);
    });
    return Array.from(deptSet).sort();
  }, [teachers]);

  // Filter teachers by search query and department
  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      // Department filter
      if (selectedDepartment !== "ALL" && teacher.department !== selectedDepartment) {
        return false;
      }

      // Search query filter
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const nameMatch = teacher.name?.toLowerCase().includes(query);
        const idMatch = teacher.teacherId?.toLowerCase().includes(query);
        const phoneMatch = teacher.phone?.toLowerCase().includes(query);
        const emailMatch = teacher.email?.toLowerCase().includes(query);
        const designationMatch = teacher.designation?.toLowerCase().includes(query);
        const deptMatch = teacher.department?.toLowerCase().includes(query);

        const assignmentMatch = teacher.assignments?.some((a) => {
          const subName = a.subject?.name?.toLowerCase() || "";
          const clsName = a.class?.name?.toLowerCase() || "";
          const secName = a.section?.name?.toLowerCase() || "";
          return (
            subName.includes(query) ||
            clsName.includes(query) ||
            secName.includes(query)
          );
        });

        return (
          nameMatch ||
          idMatch ||
          phoneMatch ||
          emailMatch ||
          designationMatch ||
          deptMatch ||
          assignmentMatch
        );
      }

      return true;
    });
  }, [teachers, selectedDepartment, searchQuery]);

  const hasActiveFilters =
    selectedDepartment !== "ALL" || searchQuery.trim().length > 0;

  const handleResetFilters = () => {
    setSelectedDepartment("ALL");
    setSearchQuery("");
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs space-y-6">
      {/* 1. Directory Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
            FACULTY DIRECTORY
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Teaching staff
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
            Showing <strong className="text-blue-600">{filteredTeachers.length}</strong> of{" "}
            {teachers.length} teachers
          </span>
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-medium text-slate-500 hover:text-rose-600 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-rose-50 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* 2. Controls / Search bar + Department Pills */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by name, ID, subject, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Department Filter Pills */}
        {departmentOptions.length > 0 && (
          <div className="flex items-center flex-wrap gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200/70">
            <span className="text-[11px] font-bold text-slate-400 px-2 uppercase tracking-wide flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              Department:
            </span>
            <button
              type="button"
              onClick={() => setSelectedDepartment("ALL")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${selectedDepartment === "ALL"
                  ? "bg-white text-blue-700 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
                }`}
            >
              All Departments
            </button>
            {departmentOptions.map((dept) => {
              const isSelected = selectedDepartment === dept;
              const count = teachers.filter((t) => t.department === dept).length;
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${isSelected
                      ? "bg-white text-blue-700 shadow-xs border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                  <span>{dept}</span>
                  <span className="text-[10px] text-slate-400">({count})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Teachers Table */}
      {filteredTeachers.length === 0 ? (
        <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center space-y-3 bg-slate-50/40">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mx-auto">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No teachers found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? `No faculty members matching "${searchQuery}". Try a different keyword.`
              : "No teachers currently registered in the database."}
          </p>
          {!searchQuery && (
            <Button
              onClick={onAddTeacher}
              className="bg-[#0f2c4a] hover:bg-[#163e66] text-white text-xs font-semibold px-4 py-2 rounded-xl mt-2 cursor-pointer inline-flex items-center gap-2"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add First Teacher</span>
            </Button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Teacher</th>
                <th className="py-3.5 px-4">Teacher ID</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Assigned Subjects</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredTeachers.map((teacher, index) => {
                const avatar = AVATAR_COLORS[index % AVATAR_COLORS.length];
                const assignments = teacher.assignments || [];

                return (
                  <tr
                    key={teacher.id || index}
                    className="group hover:bg-slate-50/70 transition-colors duration-150"
                  >
                    {/* 1. Teacher (Avatar + Name + Designation) */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3.5">
                        {teacher.photo ? (
                          <div className="h-10 w-10 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={teacher.photo}
                              alt={teacher.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-2xl ${avatar.bg} ${avatar.text} font-bold text-xs shrink-0 shadow-2xs`}
                          >
                            {getInitials(teacher.name)}
                          </div>
                        )}
                        <div>
                          <Link
                            href={`/admin/dashboard/teachers/${teacher.id}`}
                            className="font-bold text-slate-900 text-sm hover:text-blue-600 transition-colors block"
                          >
                            {teacher.name}
                          </Link>
                          <span className="text-[11px] text-slate-400">
                            {teacher.designation || "Teaching Staff"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* 2. Teacher ID */}
                    <td className="py-4 px-4">
                      <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/60">
                        {teacher.teacherId}
                      </span>
                    </td>

                    {/* 3. Department */}
                    <td className="py-4 px-4">
                      <Badge
                        variant="outline"
                        className="bg-slate-50 text-slate-700 border-slate-200/80 text-xs font-semibold py-0.5 px-2.5 rounded-full"
                      >
                        {teacher.department || "General"}
                      </Badge>
                    </td>

                    {/* 4. Assigned Subjects Count */}
                    <td className="py-4 px-4">
                      {assignments.length === 0 ? (
                        <span className="text-xs text-slate-400 font-medium">
                          0 Subjects
                        </span>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200 text-xs font-semibold py-1 px-2.5 rounded-xl inline-flex items-center gap-1.5"
                        >
                          <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                          <span>
                            {assignments.length}{" "}
                            {assignments.length === 1 ? "Subject" : "Subjects"}
                          </span>
                        </Badge>
                      )}
                    </td>

                    {/* 5. Contact */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col text-xs">
                        <span className="font-semibold text-slate-800 font-mono">
                          {teacher.phone}
                        </span>
                        {teacher.email && (
                          <span className="text-[11px] text-slate-400 truncate max-w-[160px]">
                            {teacher.email}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* 6. Actions (Details & Delete buttons) */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          asChild
                          size="sm"
                          variant="ghost"
                          className="h-8 px-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 border border-blue-200/60 font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Link href={`/admin/dashboard/teachers/${teacher.id}`}>
                            <Eye className="h-3.5 w-3.5" />
                            <span>Details</span>
                          </Link>
                        </Button>

                        {onDelete && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onDelete(teacher)}
                            className="h-8 w-8 p-0 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 border border-rose-200/60 flex items-center justify-center cursor-pointer transition-colors"
                            title="Delete Teacher"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
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
