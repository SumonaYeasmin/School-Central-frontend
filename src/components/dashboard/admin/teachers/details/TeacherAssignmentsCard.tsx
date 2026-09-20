"use client";

import { useState } from "react";
import { Teacher } from "@/src/types/teacher";
import {
  BookOpen,
  School,
  Layers,
  Star,
  Trash2,
  Loader2,
  Plus,
  Users,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

interface TeacherAssignmentsCardProps {
  teacher: Teacher;
  onAssign?: () => void;
  onRemoveAssignment?: (assignmentId: string) => Promise<void>;
}

export function TeacherAssignmentsCard({
  teacher,
  onAssign,
  onRemoveAssignment,
}: TeacherAssignmentsCardProps) {
  const [removingId, setRemovingId] = useState<string | null>(null);
  const assignments = teacher.assignments || [];

  const handleRemove = async (assignmentId: string) => {
    if (!onRemoveAssignment) return;
    try {
      setRemovingId(assignmentId);
      await onRemoveAssignment(assignmentId);
    } catch (err) {
      console.error("Failed to remove assignment:", err);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Teaching Schedule & Assigned Subjects
            </h3>
            <p className="text-xs text-slate-400">
              Classes, sections, and course allocations
            </p>
          </div>
        </div>

        {onAssign && (
          <Button
            size="sm"
            onClick={onAssign}
            className="h-8 px-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200/60 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Allocation</span>
          </Button>
        )}
      </div>

      {/* Content */}
      {assignments.length === 0 ? (
        <div className="border border-dashed border-slate-200 rounded-2xl p-10 text-center space-y-3 bg-slate-50/50">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mx-auto">
            <BookOpen className="h-6 w-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-800">
            No subjects assigned yet
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            This faculty member is not currently assigned to any class or subject.
          </p>
          {onAssign && (
            <Button
              size="sm"
              onClick={onAssign}
              className="bg-[#0f2c4a] hover:bg-[#163e66] text-white text-xs font-semibold px-4 py-2 rounded-xl mt-1 cursor-pointer"
            >
              Assign First Subject
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignments.map((assignment) => {
            const isRemoving = removingId === assignment.id;

            return (
              <div
                key={assignment.id}
                className="bg-slate-50/80 border border-slate-200/80 hover:border-blue-200 hover:shadow-xs rounded-2xl p-4.5 space-y-3.5 transition-all duration-200 relative group"
              >
                {/* Header: Subject name & Code */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">
                        {assignment.subject?.name}
                      </span>
                      {assignment.subject?.code && (
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white text-slate-600 border border-slate-200">
                          {assignment.subject.code}
                        </span>
                      )}
                    </div>
                    {assignment.isClassTeacher && (
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-800 border-amber-200 text-[10px] font-bold py-0.5 px-2 rounded-md flex items-center gap-1 w-fit"
                      >
                        <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                        <span>Class Teacher</span>
                      </Badge>
                    )}
                  </div>

                  {onRemoveAssignment && (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemove(assignment.id)}
                      disabled={isRemoving}
                      className="h-8 w-8 p-0 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                      title="Remove allocation"
                    >
                      {isRemoving ? (
                        <Loader2 className="h-4 w-4 animate-spin text-rose-500" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>

                {/* Class & Section Details */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60 text-xs">
                  <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 text-slate-700 font-semibold shadow-2xs">
                    <School className="h-3.5 w-3.5 text-blue-600" />
                    <span>{assignment.class?.name || "Class"}</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 text-slate-700 font-semibold shadow-2xs">
                    <Layers className="h-3.5 w-3.5 text-indigo-600" />
                    <span>{assignment.section?.name || "Section"}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
