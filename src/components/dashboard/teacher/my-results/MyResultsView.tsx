"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { MyResultsHeader } from "./MyResultsHeader";
import { MyResultsFilterCard, FilterOption } from "./MyResultsFilterCard";
import { MyResultsStatsCards } from "./MyResultsStatsCards";
import { MyEnteredMarksTable, StudentResultRow } from "./MyEnteredMarksTable";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { getMyAssignments, getTeacherAssignmentStudents, getTeachers } from "@/src/services/teacherService";
import { getExams, ExamItem } from "@/src/services/examService";
import { getResults, createResult } from "@/src/services/resultService";
import { getStudents } from "@/src/services/academicService";
import { mockUsers } from "@/src/services/auth/getUserInfo";

interface AssignmentItem {
  id: string;
  isClassTeacher?: boolean;
  class: { id: string; name: string };
  section: { id: string; name: string };
  subject: { id: string; name: string; code?: string };
}

// Initial demo students matching the mockup
const INITIAL_DEMO_STUDENTS: StudentResultRow[] = [
  { id: "1", roll: "01", name: "Rahim Ahmed", totalMarks: 100, obtainedMarks: 85, percentage: 85.0, grade: "A+", status: "Entered" },
  { id: "2", roll: "02", name: "Karim Hossain", totalMarks: 100, obtainedMarks: 72, percentage: 72.0, grade: "A", status: "Entered" },
  { id: "3", roll: "03", name: "Sumaiya Akter", totalMarks: 100, obtainedMarks: 91, percentage: 91.0, grade: "A+", status: "Entered" },
  { id: "4", roll: "04", name: "Jahid Hasan", totalMarks: 100, obtainedMarks: 68, percentage: 68.0, grade: "A-", status: "Entered" },
  { id: "5", roll: "05", name: "Nusrat Jahan", totalMarks: 100, obtainedMarks: 88, percentage: 88.0, grade: "A+", status: "Entered" },
  { id: "6", roll: "06", name: "Tanvir Islam", totalMarks: 100, obtainedMarks: 76, percentage: 76.0, grade: "A", status: "Entered" },
  { id: "7", roll: "07", name: "Faria Rahman", totalMarks: 100, obtainedMarks: 65, percentage: 65.0, grade: "B+", status: "Entered" },
  { id: "8", roll: "08", name: "Rifat Chowdhury", totalMarks: 100, obtainedMarks: 92, percentage: 92.0, grade: "A+", status: "Entered" },
  { id: "9", roll: "09", name: "Habiba Akter", totalMarks: 100, obtainedMarks: 80, percentage: 80.0, grade: "A", status: "Entered" },
  { id: "10", roll: "10", name: "Mehedi Hasan", totalMarks: 100, obtainedMarks: 70, percentage: 70.0, grade: "A-", status: "Pending" },
];

export function MyResultsView() {
  // Raw Data State
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [exams, setExams] = useState<ExamItem[]>([]);

  // Filter Selection State
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [selectedSectionId, setSelectedSectionId] = useState<string>("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");

  // Table Data & Loading States
  const [students, setStudents] = useState<StudentResultRow[]>(INITIAL_DEMO_STUDENTS);
  const [isFetchingFilters, setIsFetchingFilters] = useState<boolean>(true);
  const [isLoadingStudents, setIsLoadingStudents] = useState<boolean>(false);

  // Toast notifications
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
    description?: string;
  } | null>(null);

  // Calculate grade helper
  const calculateGrade = (pct: number): string => {
    if (isNaN(pct) || pct < 0) return "-";
    if (pct >= 80) return "A+";
    if (pct >= 70) return "A";
    if (pct >= 60) return "A-";
    if (pct >= 50) return "B";
    if (pct >= 40) return "C";
    if (pct >= 33) return "D";
    return "F";
  };

  // 1. Initialize Filters & Data
  const initializeData = useCallback(async () => {
    setIsFetchingFilters(true);
    try {
      let emailToUse = mockUsers.TEACHER.email;
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user") || localStorage.getItem("currentUser");
        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            if (parsed?.email) emailToUse = parsed.email;
          } catch {}
        }
      }

      const [examsData, assignmentsData] = await Promise.allSettled([
        getExams(),
        getMyAssignments(emailToUse),
      ]);

      let loadedExams: ExamItem[] = [];
      if (examsData.status === "fulfilled" && Array.isArray(examsData.value) && examsData.value.length > 0) {
        loadedExams = examsData.value;
      } else {
        loadedExams = [
          { id: "exam-half-yearly-2026", name: "Half Yearly Exam 2026", year: 2026, status: "DRAFT" },
          { id: "exam-final-2026", name: "Final Term Exam 2026", year: 2026, status: "DRAFT" },
        ];
      }
      setExams(loadedExams);
      if (loadedExams.length > 0) {
        setSelectedExamId(loadedExams[0].id);
      }

      let validAssignments: AssignmentItem[] = [];
      if (assignmentsData.status === "fulfilled" && Array.isArray(assignmentsData.value) && assignmentsData.value.length > 0) {
        validAssignments = assignmentsData.value;
      } else {
        try {
          const allTeachers = await getTeachers();
          if (allTeachers && allTeachers.length > 0) {
            const teacherWithAssign = allTeachers.find((t) => t.assignments && t.assignments.length > 0) || allTeachers[0];
            if (teacherWithAssign?.assignments && teacherWithAssign.assignments.length > 0) {
              validAssignments = teacherWithAssign.assignments as AssignmentItem[];
            }
          }
        } catch (e) {
          console.error("Could not fetch fallback assignments", e);
        }
      }

      setAssignments(validAssignments);

      if (validAssignments.length > 0) {
        const firstAssign = validAssignments[0];
        const initialClassId = firstAssign.class.id;
        const initialSectionId = firstAssign.section.id;
        const initialSubjectId = firstAssign.subject.id;

        setSelectedClassId(initialClassId);
        setSelectedSectionId(initialSectionId);
        setSelectedSubjectId(initialSubjectId);
      }
    } catch (err: any) {
      console.error("Error initializing teacher results:", err);
    } finally {
      setIsFetchingFilters(false);
    }
  }, []);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  // 2. Computed assigned dropdown options
  const availableClasses: FilterOption[] = useMemo(() => {
    const classMap = new Map<string, FilterOption>();
    assignments.forEach((a) => {
      if (a.class && !classMap.has(a.class.id)) {
        classMap.set(a.class.id, { id: a.class.id, name: a.class.name });
      }
    });
    return Array.from(classMap.values());
  }, [assignments]);

  const availableSections: FilterOption[] = useMemo(() => {
    if (!selectedClassId) return [];
    const secMap = new Map<string, FilterOption>();
    assignments
      .filter((a) => a.class?.id === selectedClassId)
      .forEach((a) => {
        if (a.section && !secMap.has(a.section.id)) {
          secMap.set(a.section.id, { id: a.section.id, name: a.section.name });
        }
      });
    return Array.from(secMap.values());
  }, [assignments, selectedClassId]);

  const availableSubjects: FilterOption[] = useMemo(() => {
    if (!selectedClassId || !selectedSectionId) return [];
    const subMap = new Map<string, FilterOption>();
    assignments
      .filter((a) => a.class?.id === selectedClassId && a.section?.id === selectedSectionId)
      .forEach((a) => {
        if (a.subject && !subMap.has(a.subject.id)) {
          subMap.set(a.subject.id, {
            id: a.subject.id,
            name: a.subject.name,
            code: a.subject.code,
          });
        }
      });
    return Array.from(subMap.values());
  }, [assignments, selectedClassId, selectedSectionId]);

  // 3. Cascade selection handlers
  const handleClassChange = (newClassId: string) => {
    setSelectedClassId(newClassId);

    const matchingSections = assignments
      .filter((a) => a.class?.id === newClassId)
      .map((a) => a.section);
    const newSectionId = matchingSections[0]?.id || "";
    setSelectedSectionId(newSectionId);

    const matchingSubjects = assignments
      .filter((a) => a.class?.id === newClassId && a.section?.id === newSectionId)
      .map((a) => a.subject);
    const newSubjectId = matchingSubjects[0]?.id || "";
    setSelectedSubjectId(newSubjectId);
  };

  const handleSectionChange = (newSectionId: string) => {
    setSelectedSectionId(newSectionId);

    const matchingSubjects = assignments
      .filter((a) => a.class?.id === selectedClassId && a.section?.id === newSectionId)
      .map((a) => a.subject);
    const newSubjectId = matchingSubjects[0]?.id || "";
    setSelectedSubjectId(newSubjectId);
  };

  const handleSubjectChange = (newSubjectId: string) => {
    setSelectedSubjectId(newSubjectId);
  };

  // 4. Fetch Students & Results automatically
  const fetchStudentsForSelection = useCallback(
    async (
      examId: string,
      classId: string,
      sectionId: string,
      subjectId: string,
      currentAssignments = assignments
    ) => {
      if (!classId || !sectionId) return;

      setIsLoadingStudents(true);
      try {
        const matchedAssign = currentAssignments.find(
          (a) => a.class?.id === classId && a.section?.id === sectionId && a.subject?.id === subjectId
        );

        let fetchedStudents: any[] = [];
        if (matchedAssign?.id) {
          try {
            const assignData = await getTeacherAssignmentStudents(matchedAssign.id);
            if (assignData?.students && Array.isArray(assignData.students)) {
              fetchedStudents = assignData.students;
            }
          } catch (e) {
            console.warn("Assignment student fetch error", e);
          }
        }

        if (fetchedStudents.length === 0) {
          const directStudents = await getStudents(classId, sectionId);
          if (Array.isArray(directStudents)) {
            fetchedStudents = directStudents;
          }
        }

        // Fetch existing results
        let existingResults: any[] = [];
        if (examId && subjectId) {
          try {
            existingResults = await getResults({
              examId,
              subjectId,
              classId,
              sectionId,
            });
          } catch (e) {
            console.warn("Could not fetch results", e);
          }
        }

        const resultsMap = new Map<string, { marks: number; fullMarks: number }>();
        if (Array.isArray(existingResults)) {
          existingResults.forEach((r) => {
            if (r.student?.id) resultsMap.set(r.student.id, { marks: r.marks, fullMarks: r.fullMarks || 100 });
            if (r.student?.studentId) resultsMap.set(r.student.studentId, { marks: r.marks, fullMarks: r.fullMarks || 100 });
            if (r.studentId) resultsMap.set(r.studentId, { marks: r.marks, fullMarks: r.fullMarks || 100 });
          });
        }

        if (fetchedStudents.length > 0) {
          const mappedRows: StudentResultRow[] = fetchedStudents.map((s, index) => {
            const existing = resultsMap.get(s.id) || resultsMap.get(s.studentId);
            const totalMarks = existing?.fullMarks || 100;
            const obtainedMarks = existing !== undefined ? existing.marks : null;
            const percentage = obtainedMarks !== null ? (obtainedMarks / totalMarks) * 100 : null;
            const grade = percentage !== null ? calculateGrade(percentage) : "-";
            const status = obtainedMarks !== null ? "Entered" : "Pending";

            return {
              id: s.id || s.studentId || String(index + 1),
              studentDbId: s.id,
              roll: s.roll ? String(s.roll).padStart(2, "0") : String(index + 1).padStart(2, "0"),
              name: s.name || `Student ${index + 1}`,
              totalMarks,
              obtainedMarks,
              percentage,
              grade,
              status,
            };
          });

          setStudents(mappedRows);
        }
      } catch (err: any) {
        console.error("Error fetching students result:", err);
      } finally {
        setIsLoadingStudents(false);
      }
    },
    [assignments]
  );

  // Auto-fetch whenever filters change (No Search Button needed!)
  useEffect(() => {
    if (selectedClassId && selectedSectionId && selectedSubjectId) {
      fetchStudentsForSelection(selectedExamId, selectedClassId, selectedSectionId, selectedSubjectId);
    }
  }, [selectedExamId, selectedClassId, selectedSectionId, selectedSubjectId, fetchStudentsForSelection]);

  // 5. Save Single Student Mark from Edit Dialog
  const handleSaveStudentMark = async (studentId: string, marks: number, fullMarks: number) => {
    if (!selectedExamId || !selectedSubjectId) {
      throw new Error("Exam and Subject must be selected");
    }

    await createResult({
      studentId,
      examId: selectedExamId,
      subjectId: selectedSubjectId,
      marks,
      fullMarks,
    });

    setStudents((prev) =>
      prev.map((s) => {
        if (s.studentDbId === studentId || s.id === studentId) {
          const percentage = (marks / fullMarks) * 100;
          const grade = calculateGrade(percentage);
          return {
            ...s,
            obtainedMarks: marks,
            percentage,
            grade,
            status: "Entered",
          };
        }
        return s;
      })
    );

    setNotification({
      type: "success",
      message: "Mark Updated Successfully!",
      description: `New score (${marks}/${fullMarks}) has been saved to database.`,
    });

    setTimeout(() => {
      setNotification((prev) => (prev?.type === "success" ? null : prev));
    }, 4000);
  };

  // Active names for headers and labels
  const activeExamName = exams.find((e) => e.id === selectedExamId)?.name || "Half Yearly Exam 2026";
  const activeSubjectName = availableSubjects.find((s) => s.id === selectedSubjectId)?.name || "Mathematics";

  // Summary Metrics calculations
  const totalStudents = students.length;
  const enteredStudents = students.filter((s) => s.status === "Entered" && s.obtainedMarks !== null);
  const marksEntered = enteredStudents.length;
  const pendingCount = totalStudents - marksEntered;
  const averageMarks =
    enteredStudents.length > 0
      ? enteredStudents.reduce((acc, curr) => acc + (curr.obtainedMarks || 0), 0) / enteredStudents.length
      : 0;

  return (
    <div className="space-y-5 sm:space-y-6 container mx-auto pb-12">
      {/* 1. Header with info badge */}
      <MyResultsHeader />

      {/* Notification Banner */}
      {notification && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-3 duration-300 ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-rose-50 border-rose-200 text-rose-900"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl ${
                notification.type === "success"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {notification.type === "success" ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
            </div>
            <div>
              <p className="text-sm font-bold">{notification.message}</p>
              {notification.description && (
                <p
                  className={`text-xs ${
                    notification.type === "success" ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  {notification.description}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => setNotification(null)}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg cursor-pointer ${
              notification.type === "success"
                ? "bg-emerald-100/60 text-emerald-700 hover:text-emerald-900"
                : "bg-rose-100/60 text-rose-700 hover:text-rose-900"
            }`}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2. Filter Bar Card (No Search Button, Clean 4-Cols) */}
      <MyResultsFilterCard
        exams={exams.map((e) => ({ id: e.id, name: e.name, year: e.year }))}
        selectedExamId={selectedExamId}
        onExamChange={setSelectedExamId}
        classes={availableClasses}
        selectedClassId={selectedClassId}
        onClassChange={handleClassChange}
        sections={availableSections}
        selectedSectionId={selectedSectionId}
        onSectionChange={handleSectionChange}
        subjects={availableSubjects}
        selectedSubjectId={selectedSubjectId}
        onSubjectChange={handleSubjectChange}
        isFetchingFilters={isFetchingFilters}
      />

      {/* 3. 4-Column Stats Summary Cards */}
      <MyResultsStatsCards
        totalStudents={totalStudents}
        marksEntered={marksEntered}
        pendingCount={pendingCount}
        averageMarks={averageMarks}
      />

      {/* 4. My Entered Marks Table */}
      <MyEnteredMarksTable
        students={students}
        isLoading={isLoadingStudents}
        onSaveMark={handleSaveStudentMark}
        subjectName={activeSubjectName}
        examName={activeExamName}
      />
    </div>
  );
}
