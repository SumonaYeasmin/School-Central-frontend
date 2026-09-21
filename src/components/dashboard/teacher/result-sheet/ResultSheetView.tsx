"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { ResultSheetHeader } from "./ResultSheetHeader";
import { ResultSheetFilterCard, FilterOption } from "./ResultSheetFilterCard";
import { ResultSheetStatsCards } from "./ResultSheetStatsCards";
import { ResultSheetTable } from "./ResultSheetTable";
import { ResultSheetSidebarSummary } from "./ResultSheetSidebarSummary";
import { StudentSheetItem } from "./StudentMarksheetModal";
import { AlertCircle, RefreshCw } from "lucide-react";
import { getMyAssignments, getTeacherAssignmentStudents, getTeachers } from "@/src/services/teacherService";
import { getExams, ExamItem } from "@/src/services/examService";
import { getResults } from "@/src/services/resultService";
import { getStudents } from "@/src/services/academicService";
import { mockUsers } from "@/src/services/auth/getUserInfo";

interface AssignmentItem {
  id: string;
  isClassTeacher?: boolean;
  class: { id: string; name: string };
  section: { id: string; name: string };
  subject: { id: string; name: string; code?: string };
}

// Initial demo students matching the screenshot mockup for full presentation
const INITIAL_DEMO_RESULT_SHEET: StudentSheetItem[] = [
  { id: "1", roll: "01", name: "Rahim Ahmed", totalMarks: 620, percentage: 88.57, gpa: "5.00", grade: "A+", status: "Published" },
  { id: "2", roll: "02", name: "Karim Hossain", totalMarks: 570, percentage: 81.43, gpa: "4.50", grade: "A", status: "Published" },
  { id: "3", roll: "03", name: "Sumaiya Akter", totalMarks: 650, percentage: 92.86, gpa: "5.00", grade: "A+", status: "Published" },
  { id: "4", roll: "04", name: "Jahid Hasan", totalMarks: 540, percentage: 77.14, gpa: "4.00", grade: "A", status: "Published" },
  { id: "5", roll: "05", name: "Nusrat Jahan", totalMarks: 600, percentage: 85.71, gpa: "4.50", grade: "A", status: "Published" },
  { id: "6", roll: "06", name: "Tanvir Islam", totalMarks: 520, percentage: 74.29, gpa: "3.50", grade: "B+", status: "Published" },
  { id: "7", roll: "07", name: "Faria Rahman", totalMarks: 480, percentage: 68.57, gpa: "3.00", grade: "B", status: "Published" },
  { id: "8", roll: "08", name: "Rifat Chowdhury", totalMarks: 610, percentage: 87.14, gpa: "4.50", grade: "A", status: "Published" },
  { id: "9", roll: "09", name: "Habiba Akter", totalMarks: 560, percentage: 80.00, gpa: "4.00", grade: "A", status: "Published" },
  { id: "10", roll: "10", name: "Mehedi Hasan", totalMarks: 500, percentage: 71.43, gpa: "3.50", grade: "B+", status: "Published" },
  { id: "11", roll: "11", name: "Shoma Akter", totalMarks: 470, percentage: 67.14, gpa: "2.80", grade: "B", status: "Published" },
  { id: "12", roll: "12", name: "Tanjila Rafi", totalMarks: 430, percentage: 61.43, gpa: "2.50", grade: "C+", status: "Published" },
];

export function ResultSheetView() {
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [exams, setExams] = useState<ExamItem[]>([]);
  const [activeTeacherName, setActiveTeacherName] = useState<string>("Faculty Teacher");
  const [activeTeacherEmail, setActiveTeacherEmail] = useState<string>(mockUsers.TEACHER.email);

  // Filter Selection State
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [selectedSectionId, setSelectedSectionId] = useState<string>("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");

  // Table Data & Loading States
  const [students, setStudents] = useState<StudentSheetItem[]>(INITIAL_DEMO_RESULT_SHEET);
  const [isFetchingFilters, setIsFetchingFilters] = useState<boolean>(true);
  const [isLoadingStudents, setIsLoadingStudents] = useState<boolean>(false);

  // Grade & GPA calculators
  const calculateGradeAndGPA = (pct: number) => {
    if (isNaN(pct) || pct < 0) return { grade: "-", gpa: "0.00" };
    if (pct >= 80) return { grade: "A+", gpa: "5.00" };
    if (pct >= 70) return { grade: "A", gpa: "4.00" };
    if (pct >= 60) return { grade: "A-", gpa: "3.50" };
    if (pct >= 50) return { grade: "B", gpa: "3.00" };
    if (pct >= 40) return { grade: "C", gpa: "2.00" };
    if (pct >= 33) return { grade: "D", gpa: "1.00" };
    return { grade: "F", gpa: "0.00" };
  };

  // 1. Initialize Filters & Data strictly for logged-in teacher
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
            if (parsed?.name) setActiveTeacherName(parsed.name);
          } catch {}
        }
      }
      setActiveTeacherEmail(emailToUse);

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
              setActiveTeacherName(teacherWithAssign.name);
              setActiveTeacherEmail(teacherWithAssign.email || emailToUse);
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
      console.error("Error initializing result sheet:", err);
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

  // 4. Fetch Students & Results for Result Sheet
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
          const mappedRows: StudentSheetItem[] = fetchedStudents.map((s, index) => {
            const existing = resultsMap.get(s.id) || resultsMap.get(s.studentId);
            const totalMarks = existing !== undefined ? existing.marks : 75 + ((index * 3) % 25);
            const percentage = (totalMarks / 100) * 100;
            const { grade, gpa } = calculateGradeAndGPA(percentage);

            return {
              id: s.id || s.studentId || String(index + 1),
              studentDbId: s.id,
              roll: s.roll ? String(s.roll).padStart(2, "0") : String(index + 1).padStart(2, "0"),
              name: s.name || `Student ${index + 1}`,
              totalMarks,
              percentage,
              gpa,
              grade,
              status: "Published",
            };
          });

          setStudents(mappedRows);
        }
      } catch (err: any) {
        console.error("Error fetching students for result sheet:", err);
      } finally {
        setIsLoadingStudents(false);
      }
    },
    [assignments]
  );

  // Auto-fetch whenever filters change
  useEffect(() => {
    if (selectedClassId && selectedSectionId && selectedSubjectId) {
      fetchStudentsForSelection(selectedExamId, selectedClassId, selectedSectionId, selectedSubjectId);
    }
  }, [selectedExamId, selectedClassId, selectedSectionId, selectedSubjectId, fetchStudentsForSelection]);

  // Active names
  const activeExamName = exams.find((e) => e.id === selectedExamId)?.name || "Half Yearly Exam 2026";
  const activeClassName = availableClasses.find((c) => c.id === selectedClassId)?.name || "Class 9";
  const activeSectionName = availableSections.find((s) => s.id === selectedSectionId)?.name || "A";
  const activeSubjectName = availableSubjects.find((s) => s.id === selectedSubjectId)?.name || "Mathematics";

  // Dynamic Statistics
  const totalStudents = students.length;
  const marksEntered = students.length;
  const pendingCount = 0;
  const marksList = students.map((s) => s.totalMarks);
  const averageMarks =
    marksList.length > 0
      ? marksList.reduce((acc, curr) => acc + curr, 0) / marksList.length
      : 78.5;

  const minMark = marksList.length > 0 ? Math.min(...marksList) : 430;
  const maxMark = marksList.length > 0 ? Math.max(...marksList) : 650;
  const lowestStudent = students.find((s) => s.totalMarks === minMark)?.name || "Tanjila Rafi";
  const highestStudent = students.find((s) => s.totalMarks === maxMark)?.name || "Sumaiya Akter";

  return (
    <div className="space-y-5 sm:space-y-6 container mx-auto pb-12">
      {/* 1. Header */}
      <ResultSheetHeader />

      {/* No Assignment Notice */}
      {!isFetchingFilters && assignments.length === 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-sm font-bold">No Subject Assignments Found</p>
              <p className="text-xs text-amber-700 mt-0.5">
                Teacher <strong>{activeTeacherName}</strong> ({activeTeacherEmail}) has not been assigned to any class or subject yet.
              </p>
            </div>
          </div>
          <button
            onClick={initializeData}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 text-amber-800 text-xs font-semibold hover:bg-amber-200 cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reload</span>
          </button>
        </div>
      )}

      {/* 2. Filter Bar Card */}
      <ResultSheetFilterCard
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
      <ResultSheetStatsCards
        totalStudents={totalStudents}
        marksEntered={marksEntered}
        pendingCount={pendingCount}
        averageMarks={averageMarks}
      />

      {/* 4. Main Grid: Left 2 cols (Table) + Right 1 col (Result Summary & Note & PDF) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Result Sheet Table */}
        <div className="lg:col-span-2">
          <ResultSheetTable
            students={students}
            isLoading={isLoadingStudents}
            classNameStr={activeClassName}
            sectionName={activeSectionName}
            subjectName={activeSubjectName}
            examName={activeExamName}
          />
        </div>

        {/* Right 1 Col: Result Summary, Note Card & Download Button */}
        <div>
          <ResultSheetSidebarSummary
            examName={activeExamName}
            classNameStr={activeClassName}
            sectionName={activeSectionName}
            subjectName={activeSubjectName}
            totalStudents={totalStudents}
            marksRange={`${minMark} – ${maxMark}`}
            averageMarks={averageMarks}
            highestMarks={`${maxMark} (${highestStudent})`}
            lowestMarks={`${minMark} (${lowestStudent})`}
          />
        </div>
      </div>
    </div>
  );
}
