"use client";

import { Info, RotateCcw, Save, Loader2, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

export interface StudentRowItem {
  id: string;
  studentDbId?: string;
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
  isLoading?: boolean;
}

export function StudentMarksTable({
  students,
  onMarksChange,
  onReset,
  onSave,
  isSaving = false,
  isLoading = false,
}: StudentMarksTableProps) {
  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case "A+":
        return "bg-emerald-500 text-white font-bold border-transparent";
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
    <Card className="bg-white border-slate-200/90 rounded-2xl shadow-xs flex flex-col min-h-[420px]">
      <CardHeader className="p-4 sm:p-5 pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
        <CardTitle className="text-sm sm:text-base font-bold text-slate-900">
          Student Marks Entry
        </CardTitle>
        <span className="text-xs text-slate-500 font-medium">
          Total: <strong className="text-slate-800 font-bold">{students.length}</strong> students
        </span>
      </CardHeader>

      <CardContent className="p-0 flex-1 flex flex-col justify-between">
        {/* Perfectly Centered Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center my-auto">
            <div className="relative flex items-center justify-center mb-4">
              <div className="h-12 w-12 rounded-full border-3 border-blue-100 border-t-blue-600 animate-spin" />
              <Loader2 className="h-6 w-6 text-blue-600 animate-spin absolute" />
            </div>
            <p className="text-sm font-bold text-slate-800">
              Loading student roster and marks...
            </p>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Please wait while we retrieve the latest class data
            </p>
          </div>
        ) : students.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center text-slate-400 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">No students loaded</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Select your assigned Class, Section, and Subject from the filters above, then click &quot;Load Students&quot;.
              </p>
            </div>
          </div>
        ) : (
          /* Responsive Table Wrapper */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse table-fixed min-w-[620px]">
              <colgroup>
                <col className="w-[12%] min-w-[60px]" />
                <col className="w-[38%] min-w-[160px]" />
                <col className="w-[18%] min-w-[90px]" />
                <col className="w-[18%] min-w-[100px]" />
                <col className="w-[14%] min-w-[80px]" />
              </colgroup>
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-semibold">
                  <th className="py-3.5 px-4">Roll</th>
                  <th className="py-3.5 px-4">Student Name</th>
                  <th className="py-3.5 px-4">Full Marks</th>
                  <th className="py-3.5 px-4">
                    <div className="flex items-center gap-1">
                      <span>Marks</span>
                      <Info className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3.5 px-4 text-center">
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
                    className="hover:bg-blue-50/40 transition-colors group"
                  >
                    {/* Roll */}
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {student.roll || "-"}
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
                    <td className="py-2.5 px-4">
                      <Input
                        type="text"
                        inputMode="numeric"
                        value={student.marks}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "" || /^\d*$/.test(val)) {
                            onMarksChange(student.id, val);
                          }
                        }}
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
        )}

        {/* Footer & Action Controls */}
        <div className="p-4 sm:p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto bg-slate-50/40 rounded-b-2xl">
          <span className="text-xs text-slate-500 font-medium">
            Showing all <strong className="text-slate-800 font-semibold">{students.length}</strong> students
          </span>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={onReset}
              disabled={students.length === 0 || isSaving}
              className="flex-1 sm:flex-none h-10 px-4 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 gap-1.5 font-semibold text-xs sm:text-sm cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className="h-4 w-4 text-slate-500" />
              <span>Reset</span>
            </Button>

            <Button
              type="button"
              onClick={onSave}
              disabled={students.length === 0 || isSaving}
              className="flex-1 sm:flex-none h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-1.5 shadow-sm shadow-blue-600/25 text-xs sm:text-sm cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving Marks...</span>
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
