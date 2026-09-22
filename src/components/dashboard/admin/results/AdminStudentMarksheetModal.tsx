"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { GraduationCap, CheckCircle2, Lock } from "lucide-react";

export interface AdminStudentSheetItem {
  id: string;
  studentDbId?: string;
  roll: string;
  name: string;
  fullMarks: number;
  obtainedMarks: number;
  totalMarks?: number;
  percentage?: number;
  gpa: string;
  grade: string;
  status: string;
}

interface AdminStudentMarksheetModalProps {
  student: AdminStudentSheetItem | null;
  onClose: () => void;
  examName: string;
  classNameStr: string;
  sectionName: string;
  subjectName: string;
  isPublished?: boolean;
}

export function AdminStudentMarksheetModal({
  student,
  onClose,
  examName,
  classNameStr,
  sectionName,
  subjectName,
  isPublished = true,
}: AdminStudentMarksheetModalProps) {
  if (!student) return null;

  return (
    <Dialog open={!!student} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg bg-white rounded-2xl p-6">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              <span>Student Marksheet & GPA Report</span>
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-slate-500">
            Official academic examination report for {examName}
          </DialogDescription>
        </DialogHeader>

        {/* Student Profile Card */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-900">{student.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Roll: <strong className="text-slate-800 font-semibold">{student.roll}</strong> • {classNameStr} ({sectionName})
            </p>
          </div>
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 font-bold px-3 py-1 text-sm">
            {student.grade}
          </Badge>
        </div>

        {/* Results Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-medium text-slate-400">Obtained Marks</span>
            <p className="text-lg font-black text-slate-900 mt-0.5">{student.obtainedMarks ?? student.totalMarks ?? 0}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-medium text-slate-400">Full Marks</span>
            <p className="text-lg font-black text-blue-600 mt-0.5">{student.fullMarks ?? 100}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-medium text-slate-400">GPA</span>
            <p className="text-lg font-black text-emerald-600 mt-0.5">{student.gpa}</p>
          </div>
        </div>

        {/* Subject Detail */}
        <div className="space-y-2 border border-slate-100 rounded-xl p-3 bg-slate-50/40">
          <div className="flex items-center justify-between text-xs text-slate-600 pb-2 border-b border-slate-200/60 font-semibold">
            <span>Subject</span>
            <span>Marks & Grade</span>
          </div>
          <div className="flex items-center justify-between text-xs py-1">
            <span className="font-medium text-slate-800">{subjectName}</span>
            <span className="font-bold text-slate-900">
              {student.obtainedMarks ?? student.totalMarks ?? 0} / {student.fullMarks ?? 100}{" "}
              <span className="text-emerald-600">({student.grade})</span>
            </span>
          </div>
        </div>

        {/* Status Indicator */}
        <div
          className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${
            isPublished
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-amber-50 border-amber-200 text-amber-900"
          }`}
        >
          {isPublished ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Status: <strong className="font-bold">PUBLISHED</strong> (Visible on Parent & Public Portal)</span>
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 text-amber-600 shrink-0" />
              <span>Status: <strong className="font-bold">DRAFT</strong> (Hidden from Parent & Public Portal)</span>
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full h-10 rounded-xl border-slate-200 text-slate-700 cursor-pointer"
          >
            Close Marksheet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
