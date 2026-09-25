"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Badge } from "@/src/components/ui/badge";
import { Search, Loader2, FileSpreadsheet, School, AlertCircle } from "lucide-react";
import { getExams, ExamItem } from "@/src/services/examService";
import { getStudentExamResult } from "@/src/services/resultService";

interface PublicResultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PublicResultModal({ isOpen, onClose }: PublicResultModalProps) {
  const [exams, setExams] = useState<ExamItem[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [studentQuery, setStudentQuery] = useState<string>("");
  const [isLoadingExams, setIsLoadingExams] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [resultData, setResultData] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsLoadingExams(true);
      getExams()
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setExams(data);
            const published = data.find((e) => e.status === "PUBLISHED");
            setSelectedExamId(published ? published.id : data[0].id);
          }
        })
        .catch((err) => console.error("Error loading exams:", err))
        .finally(() => setIsLoadingExams(false));
    } else {
      setResultData(null);
      setErrorMsg(null);
      setStudentQuery("");
    }
  }, [isOpen]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!studentQuery.trim() || !selectedExamId) return;

    setIsSearching(true);
    setErrorMsg(null);
    setResultData(null);

    try {
      const data = await getStudentExamResult(studentQuery.trim(), selectedExamId, true);
      if (data && data.student) {
        setResultData(data);
      } else {
        setErrorMsg("No results found for the given Student ID / Code.");
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "Result not published yet or student ID not found.";
      setErrorMsg(msg);
    } finally {
      setIsSearching(false);
    }
  };

  const getGradeBadgeClass = (grade: string) => {
    switch (grade) {
      case "A+":
        return "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold";
      case "A":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 font-bold";
      case "A-":
        return "bg-lime-50 text-lime-700 border-lime-200 font-semibold";
      case "B":
        return "bg-amber-50 text-amber-800 border-amber-200 font-semibold";
      case "C":
      case "D":
        return "bg-orange-50 text-orange-800 border-orange-200 font-semibold";
      case "F":
        return "bg-rose-50 text-rose-700 border-rose-200 font-bold";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-5 sm:p-7 rounded-2xl bg-white">
        <DialogHeader className="space-y-1.5 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg sm:text-xl font-bold text-slate-900">
                Online Result Portal
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Check official examination marksheet and grades online.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Search Filter Form */}
        <form onSubmit={handleSearch} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Exam Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Select Examination
              </label>
              <Select
                value={selectedExamId}
                onValueChange={setSelectedExamId}
                disabled={isLoadingExams || exams.length === 0}
              >
                <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 text-xs sm:text-sm font-medium">
                  <SelectValue
                    placeholder={
                      isLoadingExams ? "Loading exams..." : "Choose Examination"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {exams.map((exam) => (
                    <SelectItem key={exam.id} value={exam.id}>
                      {exam.name} {exam.year ? `(${exam.year})` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Student ID / Roll Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Student ID / Code
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="e.g. S01, SC-2026-091"
                  value={studentQuery}
                  onChange={(e) => setStudentQuery(e.target.value)}
                  className="h-10 rounded-xl border-slate-200 text-xs sm:text-sm pl-3 pr-20"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSearching || !studentQuery.trim()}
                  className="absolute right-1 top-1 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 shadow-xs cursor-pointer"
                >
                  {isSearching ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Search className="h-3.5 w-3.5" />
                  )}
                  <span className="ml-1 hidden sm:inline">Search</span>
                </Button>
              </div>
            </div>
          </div>
        </form>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-xs">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
            <div>
              <p className="font-semibold">Unable to fetch result</p>
              <p className="text-rose-700 mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Loaded Result Card */}
        {resultData && (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            {/* Header info */}
            <div className="text-center pb-3 border-b border-slate-100 space-y-1">
              <div className="inline-flex items-center justify-center p-1.5 rounded-xl bg-blue-50 text-blue-600 mb-0.5">
                <School className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                GREENFIELD HIGH SCHOOL
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Academic Marksheet & Performance Report
              </p>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs font-bold px-2.5 py-0.5 mt-1">
                {resultData.exam?.name}
              </Badge>
            </div>

            {/* Student Credentials */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Name</span>
                <p className="text-slate-900 font-bold mt-0.5 truncate">
                  {resultData.student?.name}
                </p>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Roll</span>
                <p className="text-slate-900 font-bold mt-0.5">
                  Roll: {resultData.student?.roll || "–"}
                </p>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Class</span>
                <p className="text-slate-900 font-bold mt-0.5">
                  {resultData.student?.class} (Sec: {resultData.student?.section || "A"})
                </p>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Student ID</span>
                <p className="text-slate-900 font-bold mt-0.5">
                  {resultData.student?.studentId || "–"}
                </p>
              </div>
            </div>

            {/* Subjects Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600">
                    <th className="py-2.5 px-3">Subject</th>
                    <th className="py-2.5 px-2 text-center">Full</th>
                    <th className="py-2.5 px-2 text-center">Marks</th>
                    <th className="py-2.5 px-2 text-center">GPA</th>
                    <th className="py-2.5 px-2 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {resultData.subjects?.map((sub: any, idx: number) => (
                    <tr key={sub.subjectId || idx} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        {sub.subjectName}
                      </td>
                      <td className="py-2.5 px-2 text-center text-slate-500">
                        {sub.fullMarks || 100}
                      </td>
                      <td className="py-2.5 px-2 text-center font-bold text-slate-900">
                        {sub.marks ?? "–"}
                      </td>
                      <td className="py-2.5 px-2 text-center font-semibold">
                        {sub.gpa ? Number(sub.gpa).toFixed(2) : "–"}
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <Badge
                          variant="outline"
                          className={`text-[11px] px-1.5 py-0 ${getGradeBadgeClass(
                            sub.grade
                          )}`}
                        >
                          {sub.grade || "–"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50/80 border-t-2 border-slate-200 font-bold text-slate-900">
                    <td className="py-2.5 px-3 text-right">TOTAL:</td>
                    <td className="py-2.5 px-2 text-center">{resultData.totalFullMarks}</td>
                    <td className="py-2.5 px-2 text-center text-blue-600 font-black">
                      {resultData.totalMarks}
                    </td>
                    <td className="py-2.5 px-2 text-center text-emerald-600 font-black">
                      GPA: {Number(resultData.gpa || resultData.overallGpa || 0).toFixed(2)}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <Badge className="bg-emerald-600 text-white font-bold text-[11px]">
                        {resultData.overallGrade || "PASSED"}
                      </Badge>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Print / Close CTA */}
            <div className="flex items-center justify-end gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="h-9 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close
              </Button>
              <Button
                type="button"
                onClick={() => window.print()}
                className="h-9 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                Print Marksheet
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
