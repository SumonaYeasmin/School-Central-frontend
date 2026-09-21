"use client";

import { Parent } from "@/src/types/parent";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  HeartHandshake,
  UserCheck,
  Plus,
} from "lucide-react";
import { ParentActionsMenu } from "./ParentActionsMenu";

interface ParentCardProps {
  parent: Parent;
  avatarColor: { bg: string; text: string };
  onEdit: (parent: Parent) => void;
  onManageStudents: (parent: Parent) => void;
  onDelete: (parent: Parent) => void;
}

// Helper: Initials generator
function getInitials(name: string) {
  if (!name) return "P";
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ParentCard({
  parent,
  avatarColor,
  onEdit,
  onManageStudents,
  onDelete,
}: ParentCardProps) {
  const hasEmail = Boolean(parent.email);
  const studentsCount = parent.students?.length || 0;

  // Extract primary relation label or combined relations
  const primaryRelation =
    parent.students && parent.students.length > 0
      ? parent.students.find((s) => s.isPrimary)?.relation ||
      parent.students[0].relation
      : null;

  return (
    <div className="bg-white border border-slate-200/90 hover:border-blue-300/80 hover:shadow-md transition-all duration-200 rounded-3xl p-5 flex flex-col justify-between space-y-4 group">
      {/* 1. Header: Avatar, Name, Primary Relation & Action Menu */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${avatarColor.bg} ${avatarColor.text} font-bold text-sm shrink-0 shadow-2xs`}
          >
            {getInitials(parent.name)}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
              {parent.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              {primaryRelation ? (
                <span className="text-xs font-semibold text-slate-500 capitalize">
                  {primaryRelation.toLowerCase()}
                </span>
              ) : (
                <span className="text-xs font-medium text-slate-400">
                  Guardian
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions Menu */}
        <div className="flex items-center gap-1">
          {hasEmail ? (
            <Badge
              variant="outline"
              className="bg-emerald-50 text-emerald-700 border-emerald-200/80 text-[10px] font-bold py-0.5 px-2 rounded-full"
            >
              Email Active
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-slate-100 text-slate-600 border-slate-200/80 text-[10px] font-medium py-0.5 px-2 rounded-full"
            >
              Phone Only
            </Badge>
          )}

          <ParentActionsMenu
            parent={parent}
            onEdit={onEdit}
            onManageStudents={onManageStudents}
            onDelete={onDelete}
          />
        </div>
      </div>

      {/* 2. Linked Children / Students */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          <span>Linked Children ({studentsCount})</span>
          {studentsCount > 0 && (
            <button
              onClick={() => onManageStudents(parent)}
              className="text-blue-600 hover:text-blue-700 lowercase font-medium hover:underline cursor-pointer"
            >
              manage
            </button>
          )}
        </div>

        {studentsCount === 0 ? (
          <div className="bg-slate-50 border border-dashed border-slate-200/90 rounded-2xl p-3 flex items-center justify-between">
            <span className="text-xs text-slate-400 italic">No students linked</span>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => onManageStudents(parent)}
              className="h-7 px-2.5 rounded-lg text-xs font-semibold text-blue-600 hover:bg-blue-50 cursor-pointer flex items-center gap-1"
            >
              <Plus className="h-3 w-3" />
              <span>Link Student</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-1.5">
            {parent.students!.map((ps) => {
              const studentName = ps.student?.name || "Student";
              const className = ps.student?.class?.name || "No Class";
              const secName = ps.student?.section?.name
                ? ` · ${ps.student.section.name.startsWith("Section") ? ps.student.section.name : "Section " + ps.student.section.name}`
                : "";

              return (
                <div
                  key={ps.id || ps.studentId}
                  className="bg-slate-50/90 border border-slate-100 rounded-xl p-2.5 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-7 w-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <GraduationCap className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-800 truncate">
                        {studentName}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {className}
                        {secName}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200/60 shrink-0 capitalize">
                    {ps.relation?.toLowerCase()}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Contact Info */}
      <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 text-blue-600 shrink-0" />
          <span className="font-mono font-semibold text-slate-800 truncate">
            {parent.phone}
          </span>
        </div>
        {parent.email && (
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{parent.email}</span>
          </div>
        )}
        {parent.address && (
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate text-slate-500">{parent.address}</span>
          </div>
        )}
      </div>

      {/* 4. Footer Actions */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-100">
        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
          <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Verified Guardian</span>
        </span>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => onManageStudents(parent)}
          className="h-8 px-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 border border-blue-200/60 font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <HeartHandshake className="h-3.5 w-3.5" />
          <span>Children ({studentsCount})</span>
        </Button>
      </div>
    </div>
  );
}
