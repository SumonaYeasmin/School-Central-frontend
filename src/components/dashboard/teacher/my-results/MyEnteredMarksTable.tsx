"use client";

import { useState } from "react";
import {
  ListOrdered,
  Pencil,
  Users,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";

export interface StudentResultRow {
  id: string;
  studentDbId?: string;
  roll: string;
  name: string;
  totalMarks: number;
  obtainedMarks: number | null;
  percentage: number | null;
  grade: string;
  status: "Entered" | "Pending";
}

interface MyEnteredMarksTableProps {
  students: StudentResultRow[];
  isLoading?: boolean;
  onSaveMark: (studentId: string, marks: number, fullMarks: number) => Promise<void>;
  subjectName?: string;
  examName?: string;
}

export function MyEnteredMarksTable({
  students,
  isLoading = false,
  onSaveMark,
  subjectName = "Mathematics",
  examName = "Half Yearly Exam 2026",
}: MyEnteredMarksTableProps) {
  // Edit Modal State
  const [editingStudent, setEditingStudent] = useState<StudentResultRow | null>(null);
  const [inputMarks, setInputMarks] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Grade badge styling
  const getGradeBadgeClass = (grade: string) => {
    switch (grade) {
      case "A+":
        return "bg-emerald-100/90 text-emerald-800 border-emerald-300 font-bold";
      case "A":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold";
      case "A-":
        return "bg-lime-50 text-lime-700 border-lime-200 font-semibold";
      case "B+":
      case "B":
        return "bg-amber-50 text-amber-800 border-amber-200 font-semibold";
      case "C":
      case "D":
        return "bg-orange-50 text-orange-800 border-orange-200 font-semibold";
      case "F":
        return "bg-rose-50 text-rose-700 border-rose-200 font-bold";
      default:
        return "bg-slate-50 text-slate-400 border-slate-200 font-normal";
    }
  };

  // Status badge styling
  const getStatusBadge = (status: "Entered" | "Pending") => {
    if (status === "Entered") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
          Entered
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
        Pending
      </span>
    );
  };

  // Open Edit Dialog
  const handleOpenEdit = (student: StudentResultRow) => {
    setEditingStudent(student);
    setInputMarks(student.obtainedMarks !== null ? String(student.obtainedMarks) : "");
    setErrorMsg(null);
  };

  // Calculate live preview in modal
  const modalMarksNum = Number(inputMarks);
  const modalValid = inputMarks.trim() !== "" && !isNaN(modalMarksNum) && modalMarksNum >= 0 && modalMarksNum <= (editingStudent?.totalMarks || 100);
  const modalPercentage = modalValid && editingStudent ? ((modalMarksNum / editingStudent.totalMarks) * 100).toFixed(2) : "-";
  
  const calculateModalGrade = (pctNum: number): string => {
    if (isNaN(pctNum)) return "-";
    if (pctNum >= 80) return "A+";
    if (pctNum >= 70) return "A";
    if (pctNum >= 60) return "A-";
    if (pctNum >= 50) return "B";
    if (pctNum >= 40) return "C";
    if (pctNum >= 33) return "D";
    return "F";
  };

  const modalGrade = modalValid ? calculateModalGrade(Number(modalPercentage)) : "-";

  // Submit Edit
  const handleSaveModal = async () => {
    if (!editingStudent) return;
    if (inputMarks.trim() === "" || isNaN(modalMarksNum) || modalMarksNum < 0 || modalMarksNum > editingStudent.totalMarks) {
      setErrorMsg(`Please enter valid marks between 0 and ${editingStudent.totalMarks}`);
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      await onSaveMark(editingStudent.studentDbId || editingStudent.id, modalMarksNum, editingStudent.totalMarks);
      setEditingStudent(null);
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to save mark. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-white border-slate-200/90 rounded-2xl shadow-xs flex flex-col">
      {/* Table Header without Pagination */}
      <CardHeader className="p-4 sm:p-5 border-b border-slate-100 flex flex-row items-center justify-between">
        {/* Left Title */}
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
            <ListOrdered className="h-5 w-5" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            My Entered Marks
          </h2>
        </div>

        {/* Right Total Count */}
        <span className="text-xs text-slate-500 font-medium">
          Total Students: <strong className="text-slate-800 font-bold">{students.length}</strong>
        </span>
      </CardHeader>

      {/* Table Content */}
      <CardContent className="p-0 flex-1">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-sm font-medium text-slate-600">Loading student marksheet...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center text-slate-400 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">No student records found</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Select your assigned Class, Section, and Subject from the filters above and click &quot;Search&quot;.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse table-fixed min-w-[850px]">
              {/* Proportional Column Widths */}
              <colgroup>
                <col className="w-[8%] min-w-[65px]" />
                <col className="w-[23%] min-w-[170px]" />
                <col className="w-[12%] min-w-[95px]" />
                <col className="w-[15%] min-w-[110px]" />
                <col className="w-[14%] min-w-[105px]" />
                <col className="w-[10%] min-w-[85px]" />
                <col className="w-[10%] min-w-[95px]" />
                <col className="w-[8%] min-w-[80px]" />
              </colgroup>
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-semibold">
                  <th className="py-4 px-5">Roll</th>
                  <th className="py-4 px-5">Student Name</th>
                  <th className="py-4 px-5">Total Marks</th>
                  <th className="py-4 px-5">Obtained Marks</th>
                  <th className="py-4 px-5">Percentage</th>
                  <th className="py-4 px-5 text-center">Grade</th>
                  <th className="py-4 px-5 text-center">Status</th>
                  <th className="py-4 px-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    {/* Roll */}
                    <td className="py-4 px-5 font-semibold text-slate-900">
                      {student.roll}
                    </td>

                    {/* Student Name */}
                    <td className="py-4 px-5 font-medium text-slate-900 truncate">
                      {student.name}
                    </td>

                    {/* Total Marks */}
                    <td className="py-4 px-5 text-slate-600 font-medium">
                      {student.totalMarks}
                    </td>

                    {/* Obtained Marks */}
                    <td className="py-4 px-5 font-semibold text-slate-900">
                      {student.obtainedMarks !== null ? student.obtainedMarks : "-"}
                    </td>

                    {/* Percentage */}
                    <td className="py-4 px-5 text-slate-600 font-medium">
                      {student.percentage !== null ? `${student.percentage.toFixed(2)}%` : "-"}
                    </td>

                    {/* Grade Badge */}
                    <td className="py-4 px-5 text-center">
                      <Badge
                        variant="outline"
                        className={`px-2.5 py-0.5 text-xs rounded-md shadow-2xs ${getGradeBadgeClass(
                          student.grade
                        )}`}
                      >
                        {student.grade || "-"}
                      </Badge>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-5 text-center">
                      {getStatusBadge(student.status)}
                    </td>

                    {/* Action: Edit Button */}
                    <td className="py-4 px-5 text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenEdit(student)}
                        className="h-8 px-3 rounded-lg border-blue-200 bg-blue-50/40 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-xs gap-1.5 shadow-2xs transition-all cursor-pointer"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>

      {/* Edit Marks Dialog / Modal */}
      <Dialog open={!!editingStudent} onOpenChange={(open) => !open && setEditingStudent(null)}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Pencil className="h-5 w-5 text-blue-600" />
              <span>Edit Student Marks</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Update exam score for <strong>{editingStudent?.name}</strong> (Roll: {editingStudent?.roll}) in {subjectName} ({examName}).
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Student Info Card */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400">Total Marks</span>
                <p className="text-slate-800 font-bold text-sm">{editingStudent?.totalMarks || 100}</p>
              </div>
              <div className="text-right">
                <span className="text-slate-400">Current Status</span>
                <p className="mt-0.5">{editingStudent ? getStatusBadge(editingStudent.status) : null}</p>
              </div>
            </div>

            {/* Marks Input Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Obtained Marks (out of {editingStudent?.totalMarks || 100})
              </label>
              <Input
                type="text"
                inputMode="numeric"
                value={inputMarks}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d*$/.test(val)) {
                    setInputMarks(val);
                  }
                }}
                placeholder="Enter marks e.g. 85"
                className="h-10 rounded-xl border-slate-200 text-slate-900 font-bold text-sm focus:ring-2 focus:ring-blue-500/20"
                autoFocus
              />
            </div>

            {/* Live Calculation Preview */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-xs">
              <div>
                <span className="text-slate-500">Calculated Percentage:</span>
                <p className="font-bold text-blue-700 text-sm">{modalPercentage}{modalValid ? "%" : ""}</p>
              </div>
              <div>
                <span className="text-slate-500">Calculated Grade:</span>
                <p className="font-bold text-blue-700 text-sm">{modalGrade}</p>
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs font-semibold text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                {errorMsg}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditingStudent(null)}
              disabled={isSubmitting}
              className="h-10 rounded-xl border-slate-200 text-slate-700 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveModal}
              disabled={isSubmitting || inputMarks.trim() === ""}
              className="h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-1.5 shadow-sm shadow-blue-600/25 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
