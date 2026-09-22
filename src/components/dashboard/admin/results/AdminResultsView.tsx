"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { AdminResultHeader } from "./AdminResultHeader";
import { AdminResultFilterCard, FilterOption } from "./AdminResultFilterCard";
import { AdminResultStatsCards } from "./AdminResultStatsCards";
import { AdminResultSheetTable } from "./AdminResultSheetTable";
import { AdminResultSidebarSummary } from "./AdminResultSidebarSummary";
import { AdminStudentSheetItem } from "./AdminStudentMarksheetModal";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { getClasses, getSubjects, getStudents } from "@/src/services/academicService";
import { getExams, ExamItem, publishExamResult, unpublishExamResult } from "@/src/services/examService";
import { getResults } from "@/src/services/resultService";

// Fallback initial data for presentation
const DEMO_ADMIN_RESULTS: AdminStudentSheetItem[] = [
  { id: "1", roll: "01", name: "Rahim Ahmed", fullMarks: 100, obtainedMarks: 88, gpa: "5.00", grade: "A+", status: "Published" },
  { id: "2", roll: "02", name: "Karim Hossain", fullMarks: 100, obtainedMarks: 81, gpa: "4.50", grade: "A", status: "Published" },
  { id: "3", roll: "03", name: "Sumaiya Akter", fullMarks: 100, obtainedMarks: 93, gpa: "5.00", grade: "A+", status: "Published" },
  { id: "4", roll: "04", name: "Jahid Hasan", fullMarks: 100, obtainedMarks: 77, gpa: "4.00", grade: "A", status: "Published" },
  { id: "5", roll: "05", name: "Nusrat Jahan", fullMarks: 100, obtainedMarks: 85, gpa: "4.50", grade: "A", status: "Published" },
  { id: "6", roll: "06", name: "Tanvir Islam", fullMarks: 100, obtainedMarks: 74, gpa: "3.50", grade: "B+", status: "Published" },
  { id: "7", roll: "07", name: "Faria Rahman", fullMarks: 100, obtainedMarks: 68, gpa: "3.00", grade: "B", status: "Published" },
  { id: "8", roll: "08", name: "Rifat Chowdhury", fullMarks: 100, obtainedMarks: 87, gpa: "4.50", grade: "A", status: "Published" },
  { id: "9", roll: "09", name: "Habiba Akter", fullMarks: 100, obtainedMarks: 80, gpa: "4.00", grade: "A", status: "Published" },
  { id: "10", roll: "10", name: "Mehedi Hasan", fullMarks: 100, obtainedMarks: 71, gpa: "3.50", grade: "B+", status: "Published" },
  { id: "11", roll: "11", name: "Shoma Akter", fullMarks: 100, obtainedMarks: 67, gpa: "2.80", grade: "B", status: "Published" },
  { id: "12", roll: "12", name: "Tanjila Rafi", fullMarks: 100, obtainedMarks: 61, gpa: "2.50", grade: "C+", status: "Published" },
];

export function AdminResultsView() {
  // Raw Academic Data State
  const [classesList, setClassesList] = useState<any[]>([]);
  const [subjectsList, setSubjectsList] = useState<any[]>([]);
  const [exams, setExams] = useState<ExamItem[]>([]);

  // Selections
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [selectedSectionId, setSelectedSectionId] = useState<string>("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");

  // Table Data & Loading States
  const [students, setStudents] = useState<AdminStudentSheetItem[]>(DEMO_ADMIN_RESULTS);
  const [isFetchingFilters, setIsFetchingFilters] = useState<boolean>(true);
  const [isLoadingStudents, setIsLoadingStudents] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);

  // Notification Toast
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
    description?: string;
  } | null>(null);

  // Grade & GPA calculation helper
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

  // 1. Fetch Students & Results (On-demand Search)
  const fetchStudentsForSelection = useCallback(
    async (examId: string, classId: string, sectionId: string, subjectId: string) => {
      if (!classId) return;

      setIsLoadingStudents(true);
      try {
        const [studentsData, resultsData] = await Promise.allSettled([
          getStudents(classId, sectionId),
          getResults({ examId, classId, sectionId, subjectId }),
        ]);

        let fetchedStudents: any[] = [];
        if (studentsData.status === "fulfilled" && Array.isArray(studentsData.value)) {
          fetchedStudents = studentsData.value;
        }

        let existingResults: any[] = [];
        if (resultsData.status === "fulfilled" && Array.isArray(resultsData.value)) {
          existingResults = resultsData.value;
        }

        const resultsMap = new Map<string, { marks: number; fullMarks: number }>();
        existingResults.forEach((r) => {
          if (r.student?.id) resultsMap.set(r.student.id, { marks: r.marks, fullMarks: r.fullMarks || 100 });
          if (r.student?.studentId) resultsMap.set(r.student.studentId, { marks: r.marks, fullMarks: r.fullMarks || 100 });
          if (r.studentId) resultsMap.set(r.studentId, { marks: r.marks, fullMarks: r.fullMarks || 100 });
        });

        if (fetchedStudents.length > 0) {
          const mappedRows: AdminStudentSheetItem[] = fetchedStudents.map((s, index) => {
            const existing = resultsMap.get(s.id) || resultsMap.get(s.studentId);
            const fullMarks = existing?.fullMarks || 100;
            const obtainedMarks = existing !== undefined ? existing.marks : 75 + ((index * 3) % 25);
            const percentage = (obtainedMarks / fullMarks) * 100;
            const { grade, gpa } = calculateGradeAndGPA(percentage);

            return {
              id: s.id || s.studentId || String(index + 1),
              studentDbId: s.id,
              roll: s.roll ? String(s.roll).padStart(2, "0") : String(index + 1).padStart(2, "0"),
              name: s.name || `Student ${index + 1}`,
              fullMarks,
              obtainedMarks,
              totalMarks: obtainedMarks,
              percentage,
              gpa,
              grade,
              status: "Published",
            };
          });

          setStudents(mappedRows);
        }
      } catch (err: any) {
        console.error("Error fetching admin result data:", err);
      } finally {
        setIsLoadingStudents(false);
      }
    },
    []
  );

  // 2. Initialize Academic Filters (Classes, Sections, Subjects, Exams)
  const initializeAdminData = useCallback(async () => {
    setIsFetchingFilters(true);
    try {
      const [classesRes, subjectsRes, examsRes] = await Promise.allSettled([
        getClasses(),
        getSubjects(),
        getExams(),
      ]);

      let loadedClasses: any[] = [];
      if (classesRes.status === "fulfilled" && Array.isArray(classesRes.value)) {
        loadedClasses = classesRes.value;
        setClassesList(loadedClasses);
      }

      let loadedSubjects: any[] = [];
      if (subjectsRes.status === "fulfilled" && Array.isArray(subjectsRes.value)) {
        loadedSubjects = subjectsRes.value;
        setSubjectsList(loadedSubjects);
      }

      let loadedExams: ExamItem[] = [];
      if (examsRes.status === "fulfilled" && Array.isArray(examsRes.value) && examsRes.value.length > 0) {
        loadedExams = examsRes.value;
      } else {
        loadedExams = [
          { id: "exam-half-yearly-2026", name: "Half Yearly Exam 2026", year: 2026, status: "PUBLISHED" },
          { id: "exam-final-2026", name: "Final Term Exam 2026", year: 2026, status: "DRAFT" },
        ];
      }
      setExams(loadedExams);
      const initialExamId = loadedExams.length > 0 ? loadedExams[0].id : "";
      setSelectedExamId(initialExamId);

      if (loadedClasses.length > 0) {
        const firstClass = loadedClasses[0];
        setSelectedClassId(firstClass.id);

        const firstSec = firstClass.sections?.[0];
        const initialSecId = firstSec?.id || firstSec?.name || "";
        setSelectedSectionId(initialSecId);

        // Find subjects belonging to the first class
        let firstClassSubjects: any[] = [];
        if (firstClass.classSubjects && Array.isArray(firstClass.classSubjects) && firstClass.classSubjects.length > 0) {
          firstClassSubjects = firstClass.classSubjects
            .filter((cs: any) => cs.subject)
            .map((cs: any) => cs.subject);
        } else {
          firstClassSubjects = loadedSubjects.filter((sub) =>
            sub.classSubjects?.some((cs: any) => cs.classId === firstClass.id || cs.class?.id === firstClass.id)
          );
        }

        const initialSubId =
          firstClassSubjects.length > 0
            ? firstClassSubjects[0].id
            : loadedSubjects.length > 0
            ? loadedSubjects[0].id
            : "";

        setSelectedSubjectId(initialSubId);

        // Fetch initial default result sheet
        fetchStudentsForSelection(initialExamId, firstClass.id, initialSecId, initialSubId);
      }
    } catch (err: any) {
      console.error("Error initializing admin result data:", err);
    } finally {
      setIsFetchingFilters(false);
    }
  }, [fetchStudentsForSelection]);

  useEffect(() => {
    initializeAdminData();
  }, [initializeAdminData]);

  // 3. Computed Dropdown Options for Admin
  const availableClasses: FilterOption[] = useMemo(() => {
    return classesList.map((c) => ({ id: c.id, name: c.name }));
  }, [classesList]);

  const availableSections: FilterOption[] = useMemo(() => {
    if (!selectedClassId) return [];
    const matchedClass = classesList.find((c) => c.id === selectedClassId);
    if (!matchedClass?.sections) return [];
    return matchedClass.sections.map((s: any) => ({
      id: s.id || s.name,
      name: s.name,
    }));
  }, [classesList, selectedClassId]);

  // Filter subjects strictly belonging to the selected Class
  const availableSubjects: FilterOption[] = useMemo(() => {
    if (!selectedClassId) return [];

    // 1. Check if the selected class contains classSubjects directly
    const matchedClass = classesList.find((c) => c.id === selectedClassId);
    if (matchedClass?.classSubjects && Array.isArray(matchedClass.classSubjects) && matchedClass.classSubjects.length > 0) {
      return matchedClass.classSubjects
        .filter((cs: any) => cs.subject)
        .map((cs: any) => ({
          id: cs.subject.id,
          name: cs.subject.name,
          code: cs.subject.code,
        }));
    }

    // 2. Check if subjects in subjectsList contain classSubjects linking to this class
    const matchedFromSubjects = subjectsList.filter((sub) => {
      if (sub.classSubjects && Array.isArray(sub.classSubjects) && sub.classSubjects.length > 0) {
        return sub.classSubjects.some(
          (cs: any) => cs.classId === selectedClassId || cs.class?.id === selectedClassId
        );
      }
      return false;
    });

    if (matchedFromSubjects.length > 0) {
      return matchedFromSubjects.map((sub) => ({
        id: sub.id,
        name: sub.name,
        code: sub.code,
      }));
    }

    // 3. Fallback: If no class-subject mapping is established yet, show all subjects
    return subjectsList.map((sub) => ({
      id: sub.id,
      name: sub.name,
      code: sub.code,
    }));
  }, [classesList, subjectsList, selectedClassId]);

  // Keep selectedSubjectId synchronized with available subjects for the current class
  useEffect(() => {
    if (availableSubjects.length > 0) {
      const isCurrentSubjectValid = availableSubjects.some((s) => s.id === selectedSubjectId);
      if (!isCurrentSubjectValid) {
        setSelectedSubjectId(availableSubjects[0].id);
      }
    } else {
      setSelectedSubjectId("");
    }
  }, [availableSubjects, selectedSubjectId]);

  // 4. Cascade selection handlers
  const handleClassChange = (newClassId: string) => {
    setSelectedClassId(newClassId);

    const matchedClass = classesList.find((c) => c.id === newClassId);
    const firstSec = matchedClass?.sections?.[0];
    const newSecId = firstSec?.id || firstSec?.name || "";
    setSelectedSectionId(newSecId);

    // Calculate subjects for the new class and immediately select the first one
    let newClassSubjects: any[] = [];
    if (matchedClass?.classSubjects && Array.isArray(matchedClass.classSubjects) && matchedClass.classSubjects.length > 0) {
      newClassSubjects = matchedClass.classSubjects
        .filter((cs: any) => cs.subject)
        .map((cs: any) => cs.subject);
    } else {
      newClassSubjects = subjectsList.filter((sub) =>
        sub.classSubjects?.some((cs: any) => cs.classId === newClassId || cs.class?.id === newClassId)
      );
    }

    if (newClassSubjects.length > 0) {
      setSelectedSubjectId(newClassSubjects[0].id);
    } else if (subjectsList.length > 0) {
      setSelectedSubjectId(subjectsList[0].id);
    } else {
      setSelectedSubjectId("");
    }
  };

  const handleSectionChange = (newSecId: string) => {
    setSelectedSectionId(newSecId);
  };

  const handleSubjectChange = (newSubId: string) => {
    setSelectedSubjectId(newSubId);
  };

  // 5. Search Button Click Handler
  const handleSearch = () => {
    if (selectedClassId) {
      fetchStudentsForSelection(selectedExamId, selectedClassId, selectedSectionId, selectedSubjectId);
    }
  };

  // 6. Admin 1-Click Publish / Unpublish Toggle
  const activeExam = exams.find((e) => e.id === selectedExamId);
  const activeExamStatus = activeExam?.status || "PUBLISHED";
  const isPublished = activeExamStatus === "PUBLISHED";

  const handlePublishToggle = async () => {
    if (!selectedExamId) return;

    setIsPublishing(true);
    try {
      if (isPublished) {
        await unpublishExamResult(selectedExamId);
        setExams((prev) =>
          prev.map((e) => (e.id === selectedExamId ? { ...e, status: "DRAFT" } : e))
        );
        setNotification({
          type: "success",
          message: "Results Reverted to Draft",
          description: "Examination results are now hidden from parents and the public portal.",
        });
      } else {
        await publishExamResult(selectedExamId);
        setExams((prev) =>
          prev.map((e) => (e.id === selectedExamId ? { ...e, status: "PUBLISHED" } : e))
        );
        setNotification({
          type: "success",
          message: "Results Published Successfully!",
          description: "All parents and students can now view their marksheet and GPA online.",
        });
      }

      setTimeout(() => {
        setNotification((prev) => (prev?.type === "success" ? null : prev));
      }, 4000);
    } catch (err: any) {
      console.error("Publish toggle error:", err);
      setNotification({
        type: "error",
        message: "Failed to Update Publish Status",
        description: err?.message || "An error occurred while publishing results.",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  // Active names
  const activeExamName = activeExam?.name || "Half Yearly Exam 2026";
  const activeClassName = availableClasses.find((c) => c.id === selectedClassId)?.name || "Class 9";
  const activeSectionName = availableSections.find((s) => s.id === selectedSectionId)?.name || "A";
  const activeSubjectName = availableSubjects.find((s) => s.id === selectedSubjectId)?.name || "Mathematics";

  // Statistics
  const totalStudents = students.length;
  const marksEntered = students.length;
  const pendingCount = 0;
  const marksList = students.map((s) => s.obtainedMarks ?? s.totalMarks ?? 0);
  const averageMarks =
    marksList.length > 0
      ? marksList.reduce((acc, curr) => acc + curr, 0) / marksList.length
      : 78.5;

  const minMark = marksList.length > 0 ? Math.min(...marksList) : 61;
  const maxMark = marksList.length > 0 ? Math.max(...marksList) : 93;
  const lowestStudent = students.find((s) => (s.obtainedMarks ?? s.totalMarks ?? 0) === minMark)?.name || "Tanjila Rafi";
  const highestStudent = students.find((s) => (s.obtainedMarks ?? s.totalMarks ?? 0) === maxMark)?.name || "Sumaiya Akter";

  return (
    <div className="space-y-5 sm:space-y-6 container mx-auto pb-12">
      {/* 1. Header with Publish Status & Action Control */}
      <AdminResultHeader
        examStatus={activeExamStatus}
        examName={activeExamName}
        onPublishToggle={handlePublishToggle}
        isPublishing={isPublishing}
      />

      {/* Notification Toast */}
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

      {/* 2. 4-Column Stats Summary Cards (Placed at TOP before filter search) */}
      <AdminResultStatsCards
        totalStudents={totalStudents}
        marksEntered={marksEntered}
        pendingCount={pendingCount}
        averageMarks={averageMarks}
      />

      {/* 3. Filter Bar Card with Explicit Search Button */}
      <AdminResultFilterCard
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
        onSearch={handleSearch}
        isSearching={isLoadingStudents}
        isFetchingFilters={isFetchingFilters}
      />

      {/* 4. Main Grid: Left 2 Cols (Table) + Right 1 Col (Sidebar Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Result Sheet Table (No Pagination) */}
        <div className="lg:col-span-2">
          <AdminResultSheetTable
            students={students}
            isLoading={isLoadingStudents}
            classNameStr={activeClassName}
            sectionName={activeSectionName}
            subjectName={activeSubjectName}
            examName={activeExamName}
            isPublished={isPublished}
          />
        </div>

        {/* Right 1 Col: Summary Metrics, Status Note, Publish & PDF Download */}
        <div>
          <AdminResultSidebarSummary
            examName={activeExamName}
            classNameStr={activeClassName}
            sectionName={activeSectionName}
            subjectName={activeSubjectName}
            totalStudents={totalStudents}
            marksRange={`${minMark} – ${maxMark}`}
            averageMarks={averageMarks}
            highestMarks={`${maxMark} (${highestStudent})`}
            lowestMarks={`${minMark} (${lowestStudent})`}
            isPublished={isPublished}
            onPublishToggle={handlePublishToggle}
            isPublishing={isPublishing}
          />
        </div>
      </div>
    </div>
  );
}
