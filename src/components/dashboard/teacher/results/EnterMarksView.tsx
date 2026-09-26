"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { EnterMarksHeader } from "./EnterMarksHeader";
import { MarksFilterCard, FilterOption } from "./MarksFilterCard";
import { StudentMarksTable, StudentRowItem } from "./StudentMarksTable";
import { ClassSummaryCard } from "./ClassSummaryCard";
import { QuickInfoCard } from "./QuickInfoCard";
import { CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
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

export function EnterMarksView() {
  // State for raw data
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [exams, setExams] = useState<ExamItem[]>([]);
  const [activeTeacherName, setActiveTeacherName] = useState<string>("Faculty Teacher");
  const [activeTeacherEmail, setActiveTeacherEmail] = useState<string>(mockUsers.TEACHER.email);

  // Filter selections
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [selectedSectionId, setSelectedSectionId] = useState<string>("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");

  // Table & async states
  const [students, setStudents] = useState<StudentRowItem[]>([]);
  const [isFetchingFilters, setIsFetchingFilters] = useState<boolean>(true);
  const [isLoadingStudents, setIsLoadingStudents] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Notification alerts
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
    description?: string;
  } | null>(null);

  // Compute Grade dynamically from percentage
  const calculateGrade = (marksNum: number, fullMarksNum: number): string => {
    if (isNaN(marksNum) || marksNum < 0) return "";
    const percentage = (marksNum / fullMarksNum) * 100;
    if (percentage >= 80) return "A+";
    if (percentage >= 70) return "A";
    if (percentage >= 60) return "A-";
    if (percentage >= 50) return "B";
    if (percentage >= 40) return "C";
    if (percentage >= 33) return "D";
    return "F";
  };

  // 1. Fetch initial teacher assignments & exams
  const initializeData = useCallback(async () => {
    setIsFetchingFilters(true);
    try {
      let emailToUse = "";
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("userInfo") || localStorage.getItem("user");
        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            if (parsed?.email) emailToUse = parsed.email;
            if (parsed?.name) setActiveTeacherName(parsed.name);
          } catch {}
        }
      }
      if (!emailToUse) emailToUse = "teacher@gmail.com";
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
          { id: "exam-term-1", name: "Half Yearly Examination", year: 2026, status: "DRAFT" },
          { id: "exam-final", name: "Final Term Examination", year: 2026, status: "DRAFT" },
        ];
      }
      setExams(loadedExams);
      if (loadedExams.length > 0) {
        setSelectedExamId(loadedExams[0].id);
      }

      let validAssignments: AssignmentItem[] = [];
      if (assignmentsData.status === "fulfilled" && assignmentsData.value) {
        const resVal: any = assignmentsData.value;
        const list = Array.isArray(resVal)
          ? resVal
          : Array.isArray(resVal?.assignments)
          ? resVal.assignments
          : [];

        if (list.length > 0) {
          validAssignments = list as AssignmentItem[];
          if (resVal.teacher?.name) {
            setActiveTeacherName(resVal.teacher.name);
          }
        }
      }

      if (validAssignments.length === 0) {
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
          console.error("Could not fetch fallback teachers", e);
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

        const initialExamId = loadedExams[0]?.id || "";
        if (initialExamId && initialClassId && initialSectionId && initialSubjectId) {
          fetchStudentsForSelection(
            initialExamId,
            initialClassId,
            initialSectionId,
            initialSubjectId,
            validAssignments
          );
        }
      }
    } catch (err: any) {
      console.error("Initialization error:", err);
      setNotification({
        type: "error",
        message: "Failed to load teacher data",
        description: err?.message || "Please check backend connection",
      });
    } finally {
      setIsFetchingFilters(false);
    }
  }, []);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  // 2. Compute Filter Options based on Logged-in Teacher's Assignments ONLY
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

  // 3. Handle Cascade Selection Changes
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

  // 4. Fetch Students & Existing Marks automatically
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

        let fetchedStudentList: any[] = [];

        if (matchedAssign?.id) {
          try {
            const assignData = await getTeacherAssignmentStudents(matchedAssign.id);
            if (assignData?.students && Array.isArray(assignData.students)) {
              fetchedStudentList = assignData.students;
            }
          } catch (e) {
            console.warn("Assignment student fetch fallback", e);
          }
        }

        if (fetchedStudentList.length === 0) {
          const directStudents = await getStudents(classId, sectionId);
          if (Array.isArray(directStudents)) {
            fetchedStudentList = directStudents;
          }
        }

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
            console.warn("Could not fetch existing results:", e);
          }
        }

        const resultsMap = new Map<string, { marks: number; fullMarks: number }>();
        if (Array.isArray(existingResults)) {
          existingResults.forEach((r) => {
            if (r.student?.id) {
              resultsMap.set(r.student.id, { marks: r.marks, fullMarks: r.fullMarks || 100 });
            }
            if (r.student?.studentId) {
              resultsMap.set(r.student.studentId, { marks: r.marks, fullMarks: r.fullMarks || 100 });
            }
            if (r.studentId) {
              resultsMap.set(r.studentId, { marks: r.marks, fullMarks: r.fullMarks || 100 });
            }
          });
        }

        const mappedRows: StudentRowItem[] = fetchedStudentList.map((s, index) => {
          const studentIdentifier = s.id || s.studentId || String(index + 1);
          const existing = resultsMap.get(s.id) || resultsMap.get(s.studentId);
          const fullMarks = existing?.fullMarks || 100;
          const marksStr = existing !== undefined ? String(existing.marks) : "";
          const grade = marksStr !== "" ? calculateGrade(Number(marksStr), fullMarks) : "";

          return {
            id: studentIdentifier,
            studentDbId: s.id,
            roll: s.roll ? String(s.roll).padStart(2, "0") : String(index + 1).padStart(2, "0"),
            name: s.name || `Student ${index + 1}`,
            fullMarks,
            marks: marksStr,
            grade,
          };
        });

        setStudents(mappedRows);
      } catch (err: any) {
        console.error("Error fetching students:", err);
        setNotification({
          type: "error",
          message: "Failed to load students",
          description: err?.message || "Please verify class and section records",
        });
      } finally {
        setIsLoadingStudents(false);
      }
    },
    [assignments]
  );

  // Auto-fetch whenever filters change (No Load Button needed!)
  useEffect(() => {
    if (selectedClassId && selectedSectionId && selectedSubjectId) {
      fetchStudentsForSelection(selectedExamId, selectedClassId, selectedSectionId, selectedSubjectId);
    }
  }, [selectedExamId, selectedClassId, selectedSectionId, selectedSubjectId, fetchStudentsForSelection]);

  // 5. Marks Editing
  const handleMarksChange = (id: string, newMarks: string) => {
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id === id) {
          const num = Number(newMarks);
          const grade = newMarks.trim() === "" ? "" : calculateGrade(num, student.fullMarks);
          return {
            ...student,
            marks: newMarks,
            grade,
          };
        }
        return student;
      })
    );
  };

  // Reset marks inputs
  const handleReset = () => {
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        marks: "",
        grade: "",
      }))
    );
  };

  // 6. Save Marks Submission to Backend
  const handleSave = async () => {
    if (!selectedExamId) {
      setNotification({
        type: "error",
        message: "Exam Required",
        description: "Please select an exam first",
      });
      return;
    }

    if (!selectedSubjectId) {
      setNotification({
        type: "error",
        message: "Subject Required",
        description: "Please select an assigned subject",
      });
      return;
    }

    const marksToSubmit = students.filter((s) => s.marks.trim() !== "");
    if (marksToSubmit.length === 0) {
      setNotification({
        type: "error",
        message: "No Marks Entered",
        description: "Please enter marks for at least one student before saving",
      });
      return;
    }

    setIsSaving(true);
    try {
      let savedCount = 0;
      for (const student of marksToSubmit) {
        const marksNum = Number(student.marks);
        if (!isNaN(marksNum)) {
          await createResult({
            studentId: student.studentDbId || student.id,
            examId: selectedExamId,
            subjectId: selectedSubjectId,
            marks: marksNum,
            fullMarks: student.fullMarks,
          });
          savedCount++;
        }
      }

      setNotification({
        type: "success",
        message: "Marks Saved Successfully!",
        description: `Successfully recorded marks for ${savedCount} student(s).`,
      });

      setTimeout(() => {
        setNotification((prev) => (prev?.type === "success" ? null : prev));
      }, 4000);
    } catch (err: any) {
      console.error("Save marks error:", err);
      setNotification({
        type: "error",
        message: "Failed to Save Marks",
        description: err?.response?.data?.message || err?.message || "An error occurred while saving marks",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Active names for cards & info display
  const activeExamName = exams.find((e) => e.id === selectedExamId)?.name || "Term Exam";
  const activeClassName = availableClasses.find((c) => c.id === selectedClassId)?.name || "Assigned Class";
  const activeSectionName = availableSections.find((s) => s.id === selectedSectionId)?.name || "Assigned Section";
  const activeSubjectName = availableSubjects.find((s) => s.id === selectedSubjectId)?.name || "Assigned Subject";

  // Statistics
  const totalStudents = students.length;
  const enteredMarksList = students
    .map((s) => Number(s.marks))
    .filter((n) => !isNaN(n) && n > 0);
  const marksEntered = enteredMarksList.length;
  const pendingCount = totalStudents - marksEntered;
  const averageMarks =
    enteredMarksList.length > 0
      ? enteredMarksList.reduce((acc, curr) => acc + curr, 0) / enteredMarksList.length
      : 0;

  return (
    <div className="space-y-5 sm:space-y-6 container mx-auto pb-10">
      {/* 1. Header with Info alert banner */}
      <EnterMarksHeader assignedSubject={activeSubjectName} />

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

      {/* No Assignment Notice */}
      {!isFetchingFilters && assignments.length === 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-sm font-bold">No Subject Assignments Found</p>
              <p className="text-xs text-amber-700 mt-0.5">
                Teacher <strong>{activeTeacherName}</strong> ({activeTeacherEmail}) has not been assigned to any class or subject by the admin yet.
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

      {/* 2. Filter Bar Card (No Load Button, Clean 4-Cols) */}
      <MarksFilterCard
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

      {/* 3. Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Student Marks Entry Table */}
        <div className="lg:col-span-2">
          <StudentMarksTable
            students={students}
            onMarksChange={handleMarksChange}
            onReset={handleReset}
            onSave={handleSave}
            isSaving={isSaving}
            isLoading={isLoadingStudents || isFetchingFilters}
          />
        </div>

        {/* Right 1 Col: Class Summary & Quick Info Cards */}
        <div className="space-y-6">
          {/* Class Summary 2x2 grid */}
          <ClassSummaryCard
            totalStudents={totalStudents}
            marksEntered={marksEntered}
            pendingCount={pendingCount}
            averageMarks={averageMarks}
          />

          {/* Quick Info & Save Note */}
          <QuickInfoCard
            examName={activeExamName}
            classNameStr={activeClassName}
            sectionName={activeSectionName}
            subjectName={activeSubjectName}
            fullMarks={100}
          />
        </div>
      </div>
    </div>
  );
}
