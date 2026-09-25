"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
import {
  Search,
  Loader2,
  FileSpreadsheet,
  School,
  AlertCircle,
  Printer,
  X,
  User,
  CheckCircle2,
  GraduationCap,
  Award,
} from "lucide-react";
import { getExams, ExamItem } from "@/src/services/examService";
import { getStudentExamResult } from "@/src/services/resultService";

interface PublicResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStudentQuery?: string;
  initialExamId?: string;
}

export function PublicResultModal({
  isOpen,
  onClose,
  initialStudentQuery = "",
  initialExamId = "",
}: PublicResultModalProps) {
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
      setErrorMsg(null);
      setResultData(null);

      const queryToSearch = initialStudentQuery.trim();
      setStudentQuery(queryToSearch);

      getExams()
        .then(async (data) => {
          if (Array.isArray(data) && data.length > 0) {
            setExams(data);
            const published = data.find((e) => e.status === "PUBLISHED");
            const targetExamId =
              initialExamId && data.some((e) => e.id === initialExamId)
                ? initialExamId
                : published
                ? published.id
                : data[0].id;

            setSelectedExamId(targetExamId);

            // If a student query was provided from the homepage search, perform search immediately!
            if (queryToSearch && targetExamId) {
              setIsSearching(true);
              try {
                const res = await getStudentExamResult(queryToSearch, targetExamId, true);
                if (res && res.student) {
                  setResultData(res);
                } else {
                  setErrorMsg("No results found for the given Student ID / Roll.");
                }
              } catch (err: any) {
                const msg =
                  err?.response?.data?.message ||
                  "Result not published yet or student ID not found in database.";
                setErrorMsg(msg);
              } finally {
                setIsSearching(false);
              }
            }
          }
        })
        .catch((err) => console.error("Error loading exams:", err))
        .finally(() => setIsLoadingExams(false));
    } else {
      setResultData(null);
      setErrorMsg(null);
      setStudentQuery("");
    }
  }, [isOpen, initialStudentQuery, initialExamId]);

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
        setErrorMsg("No results found for the given Student ID / Roll.");
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
        return "bg-emerald-100 text-emerald-800 border-emerald-300 font-black";
      case "A":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 font-bold";
      case "A-":
        return "bg-lime-50 text-lime-700 border-lime-200 font-semibold";
      case "B":
        return "bg-blue-50 text-blue-700 border-blue-200 font-semibold";
      case "C":
      case "D":
        return "bg-amber-50 text-amber-800 border-amber-200 font-semibold";
      case "F":
        return "bg-rose-50 text-rose-700 border-rose-200 font-bold";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] sm:max-w-4xl lg:max-w-5xl max-h-[92vh] overflow-y-auto p-5 sm:p-8 rounded-3xl bg-white shadow-2xl border border-slate-100">
        {/* ================= Modal Header ================= */}
        <DialogHeader className="pb-4 border-b border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                <FileSpreadsheet className="h-6 w-6" />
              </div>
              <div>
                <DialogTitle className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Online Result & Marksheet Portal
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Greenfield High School • Search and verify student examination results online.
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* ================= Search Controls Container ================= */}
        <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/70 space-y-4">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-end">
            {/* Examination Select */}
            <div className="sm:col-span-6 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
                <span>Select Examination</span>
              </label>
              <Select
                value={selectedExamId}
                onValueChange={setSelectedExamId}
                disabled={isLoadingExams || exams.length === 0}
              >
                <SelectTrigger className="w-full h-11 rounded-xl border-slate-200 bg-white text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-100">
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
            <div className="sm:col-span-4 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-blue-600" />
                <span>Student ID / Roll</span>
              </label>
              <Input
                type="text"
                placeholder="e.g. S01, SC-2026-091"
                value={studentQuery}
                onChange={(e) => setStudentQuery(e.target.value)}
                className="h-11 rounded-xl border-slate-200 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-blue-100 font-medium"
              />
            </div>

            {/* Search Submit Button */}
            <div className="sm:col-span-2">
              <Button
                type="submit"
                disabled={isSearching || !studentQuery.trim()}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span>Search</span>
              </Button>
            </div>
          </form>
        </div>

        {/* ================= Error Alert ================= */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-xs sm:text-sm animate-in fade-in">
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
            <div>
              <p className="font-bold">Unable to find marksheet</p>
              <p className="text-rose-700 mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* ================= Detailed Result Marksheet Card ================= */}
        {resultData && (
          <div className="space-y-6 pt-2 animate-in fade-in zoom-in-95 duration-300">
            {/* Marksheet Container with Official Seal Banner */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
              
              {/* Official Institution Marksheet Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200/80 text-center sm:text-left">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-blue-600/30 bg-white p-0.5 shrink-0 shadow-sm">
                    <Image
                      src="/images/school-logo.png"
                      alt="Greenfield High School Crest"
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      GREENFIELD HIGH SCHOOL
                    </h3>
                    <p className="text-xs text-blue-600 font-semibold tracking-wide">
                      Knowledge • Discipline • Excellence
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                      EIIN: 132456 • Dinajpur Education Board
                    </p>
                  </div>
                </div>

                {/* Exam Pill */}
                <div className="flex flex-col sm:items-end">
                  <Badge className="bg-blue-50 text-blue-700 border border-blue-200/80 font-bold text-xs sm:text-sm px-3.5 py-1 shadow-2xs">
                    {resultData.exam?.name || "Official Examination"}
                  </Badge>
                  <span className="text-[11px] text-slate-400 font-semibold mt-1">
                    Academic Session: 2026
                  </span>
                </div>
              </div>

              {/* Student Credentials 4-Card Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                {/* Student Name */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Student Name
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-1 truncate">
                    {resultData.student?.name || "–"}
                  </p>
                </div>

                {/* Roll Number */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Roll Number
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-1">
                    {resultData.student?.roll || "–"}
                  </p>
                </div>

                {/* Class & Section */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Class & Section
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-1">
                    Class {resultData.student?.class} ({resultData.student?.section || "A"})
                  </p>
                </div>

                {/* Student ID */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Student Code / ID
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-blue-600 mt-1 truncate">
                    {resultData.student?.studentId || "–"}
                  </p>
                </div>
              </div>

              {/* Subject-Wise Marksheet Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-700 font-bold">
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Subject Name</th>
                      <th className="py-3 px-3 text-center">Full Marks</th>
                      <th className="py-3 px-3 text-center">Obtained Marks</th>
                      <th className="py-3 px-3 text-center">Grade Point (GPA)</th>
                      <th className="py-3 px-4 text-center">Letter Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {resultData.subjects?.map((sub: any, idx: number) => (
                      <tr key={sub.subjectId || idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4 text-slate-400 font-medium">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {sub.subjectName}
                        </td>
                        <td className="py-3 px-3 text-center text-slate-500 font-medium">
                          {sub.fullMarks || 100}
                        </td>
                        <td className="py-3 px-3 text-center font-extrabold text-slate-900">
                          {sub.marks ?? "–"}
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-blue-600">
                          {sub.gpa ? Number(sub.gpa).toFixed(2) : "–"}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge
                            variant="outline"
                            className={`text-xs px-2.5 py-0.5 rounded-md ${getGradeBadgeClass(
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
                    <tr className="bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 border-t-2 border-slate-200 font-bold text-slate-900">
                      <td colSpan={2} className="py-3.5 px-4 text-right uppercase tracking-wider font-extrabold">
                        Total Performance:
                      </td>
                      <td className="py-3.5 px-3 text-center text-slate-600 font-bold">
                        {resultData.totalFullMarks || "–"}
                      </td>
                      <td className="py-3.5 px-3 text-center text-blue-600 font-black text-sm sm:text-base">
                        {resultData.totalMarks}
                      </td>
                      <td className="py-3.5 px-3 text-center text-emerald-600 font-black text-sm sm:text-base">
                        GPA: {Number(resultData.gpa || resultData.overallGpa || 0).toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <Badge className="bg-emerald-600 text-white font-black text-xs px-3 py-1 shadow-2xs">
                          {resultData.overallGrade || "PASSED"}
                        </Badge>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Performance Summary Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-900">
                      Official Result Verified & Passed
                    </p>
                    <p className="text-[11px] text-emerald-700 font-medium">
                      Student has successfully passed the academic examination session.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Overall Grade:</span>
                  <span className="text-sm font-black text-emerald-700">
                    {resultData.overallGrade || "A+"} (GPA {Number(resultData.gpa || resultData.overallGpa || 0).toFixed(2)})
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Modal Actions (Print & Close) */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                Press Print to save or print this official report card.
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="h-10 px-6 rounded-xl text-xs sm:text-sm font-bold border-slate-300 hover:bg-slate-100 cursor-pointer"
                >
                  Close
                </Button>
                <Button
                  type="button"
                  onClick={() => window.print()}
                  className="h-10 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 cursor-pointer flex items-center gap-2 active:scale-95"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print Marksheet</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
