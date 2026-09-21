"use client";

import { useState } from "react";
import { ListOrdered, Eye, Users, Loader2, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { StudentMarksheetModal, StudentSheetItem } from "./StudentMarksheetModal";

interface ResultSheetTableProps {
  students: StudentSheetItem[];
  isLoading?: boolean;
  classNameStr: string;
  sectionName: string;
  subjectName: string;
  examName: string;
}

export function ResultSheetTable({
  students,
  isLoading = false,
  classNameStr,
  sectionName,
  subjectName,
  examName,
}: ResultSheetTableProps) {
  const [viewingStudent, setViewingStudent] = useState<StudentSheetItem | null>(null);

  // Grade badge styling
  const getGradeBadgeClass = (grade: string) => {
    switch (grade) {
      case "A+":
        return "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold";
      case "A":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold";
      case "A-":
        return "bg-lime-50 text-lime-700 border-lime-200 font-semibold";
      case "B+":
      case "B":
        return "bg-amber-50 text-amber-800 border-amber-200 font-semibold";
      case "C+":
      case "C":
      case "D":
        return "bg-orange-50 text-orange-800 border-orange-200 font-semibold";
      case "F":
        return "bg-rose-50 text-rose-700 border-rose-200 font-bold";
      default:
        return "bg-slate-50 text-slate-400 border-slate-200 font-normal";
    }
  };

  return (
    <Card className="bg-white border-slate-200/90 rounded-2xl shadow-xs flex flex-col">
      {/* Header with Title & Exam Details */}
      <CardHeader className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
            <ListOrdered className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {classNameStr} - Section {sectionName} | {subjectName}
            </h2>
            <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>{examName}</span>
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium bg-slate-50 border border-slate-200/60 px-3 py-1.5 rounded-xl">
          Total Students: <strong className="text-slate-800 font-bold">{students.length}</strong>
        </div>
      </CardHeader>

      {/* Table Content (No pagination - full direct list) */}
      <CardContent className="p-0 flex-1">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-sm font-medium text-slate-600">Loading complete result sheet...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center text-slate-400 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400">
              <Users className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">No student records found</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Select your assigned Class, Section, and Subject from the filters above.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse table-fixed min-w-[780px]">
              <colgroup>
                <col className="w-[8%] min-w-[55px]" />
                <col className="w-[24%] min-w-[160px]" />
                <col className="w-[17%] min-w-[120px]" />
                <col className="w-[14%] min-w-[95px]" />
                <col className="w-[10%] min-w-[75px]" />
                <col className="w-[9%] min-w-[70px]" />
                <col className="w-[10%] min-w-[85px]" />
                <col className="w-[8%] min-w-[70px]" />
              </colgroup>
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-semibold">
                  <th className="py-4 px-4">Roll</th>
                  <th className="py-4 px-4">Student Name</th>
                  <th className="py-4 px-4">Total Marks</th>
                  <th className="py-4 px-4">Percentage</th>
                  <th className="py-4 px-4">GPA</th>
                  <th className="py-4 px-4 text-center">Grade</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    {/* Roll */}
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      {student.roll}
                    </td>

                    {/* Student Name */}
                    <td className="py-4 px-4 font-medium text-slate-900 truncate">
                      {student.name}
                    </td>

                    {/* Total Marks */}
                    <td className="py-4 px-4 font-medium text-slate-900">
                      {student.totalMarks}
                    </td>

                    {/* Percentage */}
                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {student.percentage.toFixed(2)}%
                    </td>

                    {/* GPA */}
                    <td className="py-4 px-4 font-semibold text-slate-800">
                      {student.gpa}
                    </td>

                    {/* Grade Badge */}
                    <td className="py-4 px-4 text-center">
                      <Badge
                        variant="outline"
                        className={`px-2.5 py-0.5 text-xs rounded-md shadow-2xs ${getGradeBadgeClass(
                          student.grade
                        )}`}
                      >
                        {student.grade}
                      </Badge>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                        {student.status || "Published"}
                      </span>
                    </td>

                    {/* Action: View Button */}
                    <td className="py-4 px-4 text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setViewingStudent(student)}
                        className="h-8 px-2.5 rounded-lg border-blue-200 bg-blue-50/40 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-xs gap-1 shadow-2xs transition-all cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>View</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>

      {/* Marksheet View Modal */}
      <StudentMarksheetModal
        student={viewingStudent}
        onClose={() => setViewingStudent(null)}
        examName={examName}
        classNameStr={classNameStr}
        sectionName={sectionName}
        subjectName={subjectName}
      />
    </Card>
  );
}
