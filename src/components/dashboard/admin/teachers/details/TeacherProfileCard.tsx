"use client";

import { Teacher } from "@/src/types/teacher";
import { Button } from "@/src/components/ui/button";
import { Edit3, Plus } from "lucide-react";

interface TeacherProfileCardProps {
  teacher: Teacher;
  onEdit?: () => void;
  onAssign?: () => void;
}

function getInitials(name: string) {
  if (!name) return "TC";
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TeacherProfileCard({
  teacher,
  onEdit,
  onAssign,
}: TeacherProfileCardProps) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Teacher Identity: Name, Designation badge, and ID */}
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center text-xl sm:text-2xl font-bold shadow-md shadow-blue-500/20 shrink-0">
          {getInitials(teacher.name)}
        </div>

        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {teacher.name}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
              {teacher.designation || "Teacher"}
            </span>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            <span>
              ID: <strong className="text-slate-800 font-bold">{teacher.teacherId}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Assign Subject & Edit */}
      <div className="flex items-center gap-2.5 w-full sm:w-auto self-stretch sm:self-auto">
        {onAssign && (
          <Button
            onClick={onAssign}
            className="flex-1 sm:flex-initial h-9 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Assign Subject</span>
          </Button>
        )}

        {onEdit && (
          <Button
            onClick={onEdit}
            variant="outline"
            className="flex-1 sm:flex-initial h-9 px-4 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="h-3.5 w-3.5 text-slate-500" />
            <span>Update</span>
          </Button>
        )}
      </div>
    </div>
  );
}
