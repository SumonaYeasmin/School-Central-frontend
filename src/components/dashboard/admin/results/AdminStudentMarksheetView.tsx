"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  GraduationCap,
  Calendar,
  Layers,
  User,
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { getStudents } from "@/src/services/academicService";
import { getStudentExamResult } from "@/src/services/resultService";
import { ExamItem } from "@/src/services/examService";

interface AdminStudentMarksheetViewProps {
  classes: any[];
  exams: ExamItem[];
  isFetchingFilters?: boolean;
}

export function AdminStudentMarksheetView({
  classes = [],
  exams = [],
  isFetchingFilters = false,
}: AdminStudentMarksheetViewProps) {
  // 1. Selection states
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [selectedSectionId, setSelectedSectionId] = useState<string>("");
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");

  // 2. Student list state for selected class & section
  const [studentsList, setStudentsList] = useState<any[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState<boolean>(false);

  // 3. Marksheet data & loading state
  const [marksheetData, setMarksheetData] = useState<any | null>(null);
  const [isLoadingMarksheet, setIsLoadingMarksheet] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Grade badge styling helper
  const getGradeBadgeClass = (grade: string) => {
    switch (grade) {
      case "A+":
        return "bg-emerald-100 text-emerald-800 border-emerald-300 font-black";
      case "A":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 font-bold";
      case "A-":
        return "bg-lime-50 text-lime-700 border-lime-200 font-bold";
      case "B+":
      case "B":
        return "bg-amber-50 text-amber-800 border-amber-200 font-bold";
      case "C+":
      case "C":
      case "D":
        return "bg-orange-50 text-orange-800 border-orange-200 font-bold";
      case "F":
        return "bg-rose-50 text-rose-700 border-rose-200 font-black";
      default:
        return "bg-slate-100 text-slate-500 border-slate-200 font-medium";
    }
  };

  // 4. Initial default selections on mount
  useEffect(() => {
    if (exams.length > 0 && !selectedExamId) {
      setSelectedExamId(exams[0].id);
    }
    if (classes.length > 0 && !selectedClassId) {
      const firstClass = classes[0];
      setSelectedClassId(firstClass.id);
      const firstSec = firstClass.sections?.[0];
      setSelectedSectionId(firstSec?.id || firstSec?.name || "");
    }
  }, [exams, classes, selectedExamId, selectedClassId]);

  // 5. Available sections for current selected class
  const availableSections = useMemo(() => {
    if (!selectedClassId) return [];
    const matchedClass = classes.find((c) => c.id === selectedClassId);
    if (!matchedClass?.sections) return [];
    return matchedClass.sections.map((s: any) => ({
      id: s.id || s.name,
      name: s.name,
    }));
  }, [classes, selectedClassId]);

  // 6. Fetch Marksheet directly for a student & exam
  const fetchStudentMarksheet = useCallback(
    async (studentId: string, examId: string) => {
      if (!studentId || !examId) return;

      setIsLoadingMarksheet(true);
      setErrorMsg(null);

      try {
        const data = await getStudentExamResult(studentId, examId, false);
        if (data && data.student) {
          setMarksheetData(data);
        } else {
          setMarksheetData(null);
        }
      } catch (err: any) {
        console.warn("Could not fetch student marksheet:", err);
        setErrorMsg(err?.response?.data?.message || err?.message || "Failed to load marksheet");
        setMarksheetData(null);
      } finally {
        setIsLoadingMarksheet(false);
      }
    },
    []
  );

  // 7. Fetch students whenever class or section changes
  useEffect(() => {
    if (!selectedClassId) return;

    let isMounted = true;
    const loadStudents = async () => {
      setIsLoadingStudents(true);
      try {
        const students = await getStudents(selectedClassId, selectedSectionId);
        if (!isMounted) return;

        if (Array.isArray(students) && students.length > 0) {
          setStudentsList(students);
          const firstStudentId = students[0].id || students[0].studentId;
          setSelectedStudentId(firstStudentId);

          if (selectedExamId) {
            fetchStudentMarksheet(firstStudentId, selectedExamId);
          }
        } else {
          setStudentsList([]);
          setSelectedStudentId("");
          setMarksheetData(null);
        }
      } catch (err) {
        console.error("Error fetching students for class/section:", err);
        if (isMounted) {
          setStudentsList([]);
          setSelectedStudentId("");
          setMarksheetData(null);
        }
      } finally {
        if (isMounted) {
          setIsLoadingStudents(false);
        }
      }
    };

    loadStudents();

    return () => {
      isMounted = false;
    };
  }, [selectedClassId, selectedSectionId, selectedExamId, fetchStudentMarksheet]);

  // 8. Class Change Handler
  const handleClassChange = (newClassId: string) => {
    setSelectedClassId(newClassId);
    const matchedClass = classes.find((c) => c.id === newClassId);
    const firstSec = matchedClass?.sections?.[0];
    setSelectedSectionId(firstSec?.id || firstSec?.name || "");
  };

  // 9. Student Change Handler
  const handleStudentChange = (newStudentId: string) => {
    setSelectedStudentId(newStudentId);
    if (selectedExamId) {
      fetchStudentMarksheet(newStudentId, selectedExamId);
    }
  };

  // 10. Exam Change Handler
  const handleExamChange = (newExamId: string) => {
    setSelectedExamId(newExamId);
    if (selectedStudentId) {
      fetchStudentMarksheet(selectedStudentId, newExamId);
    }
  };

  // 11. Quick Previous / Next Student Navigator
  const currentStudentIndex = useMemo(() => {
    return studentsList.findIndex(
      (s) => s.id === selectedStudentId || s.studentId === selectedStudentId
    );
  }, [studentsList, selectedStudentId]);

  const handlePrevStudent = () => {
    if (currentStudentIndex > 0) {
      const prevStudent = studentsList[currentStudentIndex - 1];
      const prevId = prevStudent.id || prevStudent.studentId;
      setSelectedStudentId(prevId);
      if (selectedExamId) {
        fetchStudentMarksheet(prevId, selectedExamId);
      }
    }
  };

  const handleNextStudent = () => {
    if (currentStudentIndex < studentsList.length - 1) {
      const nextStudent = studentsList[currentStudentIndex + 1];
      const nextId = nextStudent.id || nextStudent.studentId;
      setSelectedStudentId(nextId);
      if (selectedExamId) {
        fetchStudentMarksheet(nextId, selectedExamId);
      }
    }
  };

  // 12. Manual Search Button Trigger
  const handleSearchClick = () => {
    if (selectedStudentId && selectedExamId) {
      fetchStudentMarksheet(selectedStudentId, selectedExamId);
    }
  };

  // Check if any entered subjects failed
  const hasFailedSubject = useMemo(() => {
    if (!marksheetData?.subjects) return false;
    return marksheetData.subjects.some(
      (sub: any) => sub.isEntered && (sub.grade === "F" || Number(sub.marks) < (sub.passMarks || 33))
    );
  }, [marksheetData]);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* 1. Filter & Search Controls Card */}
      <Card className="bg-white border-slate-200/90 rounded-2xl shadow-xs">
        <CardHeader className="p-4 sm:p-5 pb-3 border-b border-slate-100 flex flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <User className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-sm sm:text-base font-bold text-slate-900">
                Student Marksheet Filter
              </CardTitle>
              <p className="text-xs text-slate-500 font-medium">
                Select Exam, Class, Section, and Student to view their complete marksheet.
              </p>
            </div>
          </div>

          {/* Quick Next / Prev Navigator */}
          {studentsList.length > 1 && (
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200/80 p-1 rounded-xl text-xs">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handlePrevStudent}
                disabled={currentStudentIndex <= 0 || isLoadingMarksheet}
                className="h-7 w-7 p-0 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 disabled:opacity-30 cursor-pointer"
                title="Previous Student"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="px-1.5 font-bold text-slate-700 text-xs">
                {currentStudentIndex + 1} / {studentsList.length}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleNextStudent}
                disabled={currentStudentIndex >= studentsList.length - 1 || isLoadingMarksheet}
                className="h-7 w-7 p-0 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 disabled:opacity-30 cursor-pointer"
                title="Next Student"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 items-end">
            {/* Exam Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-blue-600" />
                <span>Exam</span>
              </label>
              <Select
                value={selectedExamId}
                onValueChange={handleExamChange}
                disabled={isFetchingFilters || exams.length === 0}
              >
                <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 bg-white text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500/20">
                  <SelectValue placeholder="Select Exam" />
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

            {/* Class Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
                <span>Class</span>
              </label>
              <Select
                value={selectedClassId}
                onValueChange={handleClassChange}
                disabled={isFetchingFilters || classes.length === 0}
              >
                <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 bg-white text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500/20">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Section Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-blue-600" />
                <span>Section</span>
              </label>
              <Select
                value={selectedSectionId}
                onValueChange={setSelectedSectionId}
                disabled={isFetchingFilters || availableSections.length === 0}
              >
                <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 bg-white text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500/20">
                  <SelectValue placeholder="Select Section" />
                </SelectTrigger>
                <SelectContent>
                  {availableSections.map((sec: any) => (
                    <SelectItem key={sec.id} value={sec.id}>
                      Section {sec.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Student Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-blue-600" />
                <span>Student</span>
              </label>
              <Select
                value={selectedStudentId}
                onValueChange={handleStudentChange}
                disabled={isLoadingStudents || studentsList.length === 0}
              >
                <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 bg-white text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500/20">
                  <SelectValue
                    placeholder={
                      isLoadingStudents
                        ? "Loading students..."
                        : studentsList.length === 0
                        ? "No students found"
                        : "Select Student"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {studentsList.map((st) => (
                    <SelectItem key={st.id || st.studentId} value={st.id || st.studentId}>
                      Roll {st.roll ? String(st.roll).padStart(2, "0") : "–"}: {st.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Action Button */}
            <div>
              <Button
                type="button"
                onClick={handleSearchClick}
                disabled={isLoadingMarksheet || !selectedStudentId}
                className="w-full h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm gap-2 shadow-sm shadow-blue-600/20 cursor-pointer transition-all active:scale-[0.98]"
              >
                {isLoadingMarksheet ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span>Search Marksheet</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Loading State Indicator */}
      {isLoadingMarksheet && (
        <Card className="bg-white border-slate-200/90 rounded-2xl p-12 text-center shadow-xs">
          <div className="flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-sm font-semibold text-slate-700">Loading Student Marksheet...</p>
            <p className="text-xs text-slate-400">Fetching all subjects and results from database</p>
          </div>
        </Card>
      )}

      {/* 3. Empty State when No Student Found */}
      {!isLoadingMarksheet && !marksheetData && (
        <Card className="bg-white border-slate-200/90 rounded-2xl p-10 text-center shadow-xs">
          <div className="max-w-md mx-auto flex flex-col items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              {studentsList.length === 0 ? "No Students Found" : "No Marksheet Selected"}
            </h3>
            <p className="text-xs text-slate-500">
              {studentsList.length === 0
                ? "There are no students in the selected Class and Section. Please select another class or add students."
                : errorMsg
                ? errorMsg
                : "Select an Exam, Class, Section, and Student above to view their complete marksheet."}
            </p>
          </div>
        </Card>
      )}

      {/* 4. Complete Dynamic Student Marksheet View */}
      {!isLoadingMarksheet && marksheetData && (
        <div className="space-y-5">
          {/* Top Performance Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {/* Total Marks */}
            <Card className="bg-white border-slate-200/90 rounded-2xl shadow-xs p-4 flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Total Marks</p>
                <p className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                  {marksheetData.totalMarks}{" "}
                  <span className="text-xs font-semibold text-slate-400">
                    / {marksheetData.totalFullMarks || (marksheetData.subjects?.length || 1) * 100}
                  </span>
                </p>
              </div>
            </Card>

            {/* Overall GPA */}
            <Card className="bg-white border-slate-200/90 rounded-2xl shadow-xs p-4 flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Overall GPA</p>
                <p className="text-base sm:text-lg font-black text-emerald-600 mt-0.5">
                  {Number(marksheetData.overallGpa ?? marksheetData.gpa ?? 0).toFixed(2)}{" "}
                  <span className="text-xs font-semibold text-slate-400">/ 5.00</span>
                </p>
              </div>
            </Card>

            {/* Letter Grade */}
            <Card className="bg-white border-slate-200/90 rounded-2xl shadow-xs p-4 flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Grade Letter</p>
                <div className="mt-0.5">
                  <Badge
                    variant="outline"
                    className={`px-2.5 py-0.5 text-xs rounded-md ${getGradeBadgeClass(
                      marksheetData.overallGrade || "–"
                    )}`}
                  >
                    Grade: {marksheetData.overallGrade || "–"}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Subjects Progress */}
            <Card className="bg-white border-slate-200/90 rounded-2xl shadow-xs p-4 flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Evaluation</p>
                <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
                  {marksheetData.enteredSubjects ?? marksheetData.subjects?.filter((s: any) => s.isEntered).length ?? 0}{" "}
                  of {marksheetData.subjects?.length ?? 0} Subjects
                </p>
                <span
                  className={`inline-block text-[11px] font-bold mt-0.5 ${
                    hasFailedSubject ? "text-rose-600" : "text-emerald-600"
                  }`}
                >
                  {hasFailedSubject ? "Result: FAILED" : "Result: PASSED"}
                </span>
              </div>
            </Card>
          </div>

          {/* Student Marksheet Table Card */}
          <Card className="bg-white border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
            <CardContent className="p-5 sm:p-6 space-y-5">
              {/* Student Metadata Info Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                    Student Name
                  </span>
                  <p className="text-slate-900 font-bold text-sm mt-0.5">
                    {marksheetData.student?.name || "–"}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                    Roll Number
                  </span>
                  <p className="text-slate-900 font-bold text-sm mt-0.5">
                    Roll: {marksheetData.student?.roll ? String(marksheetData.student.roll).padStart(2, "0") : "–"}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                    Class & Section
                  </span>
                  <p className="text-slate-900 font-bold text-sm mt-0.5">
                    {marksheetData.student?.class || "–"}
                    {marksheetData.student?.section ? ` (Sec: ${marksheetData.student.section})` : ""}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
                    Exam
                  </span>
                  <p className="text-slate-900 font-bold text-sm mt-0.5">
                    {marksheetData.exam?.name || "Examination"}
                  </p>
                </div>
              </div>

              {/* Subject-Wise Complete Marksheet Table */}
              <div className="border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                      <th className="py-3 px-3 w-10 text-center">#</th>
                      <th className="py-3 px-4">Subject Name</th>
                      <th className="py-3 px-3 text-center hidden md:table-cell">Code</th>
                      <th className="py-3 px-3 text-center hidden sm:table-cell">Type</th>
                      <th className="py-3 px-3 text-center">Full Marks</th>
                      <th className="py-3 px-3 text-center">Pass Marks</th>
                      <th className="py-3 px-4 text-center">Obtained</th>
                      <th className="py-3 px-3 text-center">GPA</th>
                      <th className="py-3 px-3 text-center">Grade</th>
                      <th className="py-3 px-3 text-center">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                    {marksheetData.subjects && marksheetData.subjects.length > 0 ? (
                      marksheetData.subjects.map((sub: any, idx: number) => {
                        const isEntered = sub.isEntered && sub.marks !== null && sub.marks !== undefined;
                        const isPassed = isEntered && sub.grade !== "F" && Number(sub.marks) >= (sub.passMarks || 33);

                        return (
                          <tr
                            key={sub.subjectId || idx}
                            className="hover:bg-blue-50/20 transition-colors"
                          >
                            {/* Index */}
                            <td className="py-3 px-3 text-center font-semibold text-slate-400">
                              {idx + 1}
                            </td>

                            {/* Subject Name */}
                            <td className="py-3 px-4 font-bold text-slate-900">
                              {sub.subjectName}
                            </td>

                            {/* Subject Code */}
                            <td className="py-3 px-3 text-center font-medium text-slate-500 hidden md:table-cell">
                              {sub.subjectCode || "–"}
                            </td>

                            {/* Subject Type */}
                            <td className="py-3 px-3 text-center hidden sm:table-cell">
                              <span
                                className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                                  sub.isOptional
                                    ? "bg-purple-50 text-purple-700 border border-purple-200/60"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {sub.isOptional ? "Optional" : "Compulsory"}
                              </span>
                            </td>

                            {/* Full Marks */}
                            <td className="py-3 px-3 text-center font-medium text-slate-600">
                              {sub.fullMarks || 100}
                            </td>

                            {/* Pass Marks */}
                            <td className="py-3 px-3 text-center font-medium text-slate-500">
                              {sub.passMarks || 33}
                            </td>

                            {/* Obtained Marks */}
                            <td className="py-3 px-4 text-center font-black text-slate-900 text-sm">
                              {isEntered ? (
                                sub.marks
                              ) : (
                                <span className="text-slate-400 font-normal italic text-xs">
                                  Not Entered
                                </span>
                              )}
                            </td>

                            {/* GPA */}
                            <td className="py-3 px-3 text-center font-bold text-slate-800">
                              {isEntered ? Number(sub.gpa).toFixed(2) : "–"}
                            </td>

                            {/* Grade */}
                            <td className="py-3 px-3 text-center">
                              {isEntered ? (
                                <Badge
                                  variant="outline"
                                  className={`px-2 py-0.5 text-xs rounded-md shadow-2xs ${getGradeBadgeClass(
                                    sub.grade
                                  )}`}
                                >
                                  {sub.grade}
                                </Badge>
                              ) : (
                                <span className="text-slate-400 text-xs">–</span>
                              )}
                            </td>

                            {/* Subject Status */}
                            <td className="py-3 px-3 text-center">
                              {isEntered ? (
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold ${
                                    isPassed
                                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                                      : "bg-rose-50 text-rose-700 border border-rose-200/80"
                                  }`}
                                >
                                  {isPassed ? "PASSED" : "FAILED"}
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-50 text-slate-400 border border-slate-200/60">
                                  PENDING
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={10} className="py-8 text-center text-slate-400 font-medium">
                          No subjects assigned to this class yet.
                        </td>
                      </tr>
                    )}
                  </tbody>

                  {/* Grand Total Footer */}
                  {marksheetData.subjects && marksheetData.subjects.length > 0 && (
                    <tfoot>
                      <tr className="border-t-2 border-slate-300 bg-slate-50 text-xs sm:text-sm font-bold text-slate-900">
                        <td colSpan={4} className="py-3.5 px-4 text-right tracking-wide uppercase font-black">
                          Grand Total & Summary:
                        </td>
                        <td className="py-3.5 px-3 text-center font-black text-slate-700">
                          {marksheetData.totalFullMarks || marksheetData.subjects.length * 100}
                        </td>
                        <td className="py-3.5 px-3 text-center text-slate-400">–</td>
                        <td className="py-3.5 px-4 text-center text-blue-600 font-black text-sm">
                          {marksheetData.totalMarks}
                        </td>
                        <td className="py-3.5 px-3 text-center text-emerald-600 font-black">
                          {Number(marksheetData.overallGpa ?? marksheetData.gpa ?? 0).toFixed(2)}
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <Badge
                            className={`font-black text-xs px-2.5 py-0.5 ${
                              hasFailedSubject
                                ? "bg-rose-600 text-white"
                                : "bg-emerald-600 text-white"
                            }`}
                          >
                            {hasFailedSubject ? "F" : marksheetData.overallGrade || "A+"}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span
                            className={`font-black text-xs px-2 py-1 rounded-md ${
                              hasFailedSubject
                                ? "bg-rose-100 text-rose-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {hasFailedSubject ? "FAILED" : "PASSED"}
                          </span>
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
