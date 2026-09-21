"use client";

import { Info, RotateCcw, Save, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

export interface StudentRowItem {
  id: string;
  roll: string;
  name: string;
  fullMarks: number;
  marks: string;
  grade: string;
}

interface StudentMarksTableProps {
  students: StudentRowItem[];
  onMarksChange: (id: string, newMarks: string) => void;
  onReset: () => void;
  onSave: () => void;
  isSaving?: boolean;
}

export function StudentMarksTable({
  students,
  onMarksChange,
  onReset,
  onSave,
  isSaving = false,
}: StudentMarksTableProps) {
  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case "A+":
        return "bg-emerald-500 text-white hover:bg-emerald-600 font-bold";
      case "A":
        return "bg-emerald-100 text-emerald-800 border-emerald-200 font-bold";
      case "A-":
        return "bg-lime-100 text-lime-800 border-lime-200 font-semibold";
      case "B+":
      case "B":
        return "bg-amber-100 text-amber-800 border-amber-200 font-semibold";
      case "C":
      case "D":
        return "bg-orange-100 text-orange-800 border-orange-200 font-semibold";
      case "F":
        return "bg-rose-100 text-rose-800 border-rose-200 font-bold";
      default:
        return "bg-slate-100 text-slate-400 border-slate-200 font-normal";
    }
  };

  return (
    <Card className="bg-white border-slate-200/90 rounded-2xl shadow-xs flex flex-col">
      <CardHeader className="p-5 pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
        <CardTitle className="text-sm sm:text-base font-bold text-slate-900">
          Student Marks Entry
        </CardTitle>
        <span className="text-xs text-slate-500 font-medium">
          Total: <strong className="text-slate-800 font-bold">{students.length}</strong> students
        </span>
      </CardHeader>

      <CardContent className="p-0 flex-1 flex flex-col">
        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500 font-semibold">
                <th className="py-3.5 px-4 w-20">Roll</th>
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4 w-32">Full Marks</th>
                <th className="py-3.5 px-4 w-32">
                  <div className="flex items-center gap-1">
                    <span>Marks</span>
                    <Info className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4 w-28 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span>Grade</span>
                    <Info className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  {/* Roll */}
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {student.roll}
                  </td>

                  {/* Name */}
                  <td className="py-3.5 px-4 font-medium text-slate-900 truncate">
                    {student.name}
                  </td>

                  {/* Full Marks */}
                  <td className="py-3.5 px-4 text-slate-500 font-medium">
                    {student.fullMarks}
                  </td>

                  {/* Marks Input */}
                  <td className="py-3 px-4">
                    <Input
                      type="number"
                      min={0}
                      max={student.fullMarks}
                      value={student.marks}
                      onChange={(e) => onMarksChange(student.id, e.target.value)}
                      placeholder="0"
                      className="h-9 w-24 px-2.5 text-center font-bold text-slate-900 rounded-lg border-slate-200 bg-white focus:bg-blue-50/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-xs sm:text-sm"
                    />
                  </td>

                  {/* Grade Badge */}
                  <td className="py-3.5 px-4 text-center">
                    <Badge
                      variant="outline"
                      className={`px-3 py-0.5 text-xs rounded-md shadow-2xs transition-all ${getGradeBadge(
                        student.grade
                      )}`}
                    >
                      {student.grade || "-"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer & Action Controls (Without Pagination) */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto bg-slate-50/30">
          <span className="text-xs text-slate-500 font-medium">
            Showing all <strong className="text-slate-800 font-semibold">{students.length}</strong> students
          </span>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={onReset}
              className="flex-1 sm:flex-none h-10 px-4 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 gap-1.5 font-semibold text-xs sm:text-sm cursor-pointer"
            >
              <RotateCcw className="h-4 w-4 text-slate-500" />
              <span>Reset</span>
            </Button>

            <Button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="flex-1 sm:flex-none h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-1.5 shadow-sm shadow-blue-600/25 text-xs sm:text-sm cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Check className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Marks</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
