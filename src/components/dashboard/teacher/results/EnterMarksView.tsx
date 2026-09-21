"use client";

import { useState } from "react";
import { EnterMarksHeader } from "./EnterMarksHeader";
import { MarksFilterCard } from "./MarksFilterCard";
import { StudentMarksTable, StudentRowItem } from "./StudentMarksTable";
import { ClassSummaryCard } from "./ClassSummaryCard";
import { QuickInfoCard } from "./QuickInfoCard";
import { CheckCircle2 } from "lucide-react";

const INITIAL_STUDENTS: StudentRowItem[] = [
  { id: "1", roll: "01", name: "Rahim Ahmed", fullMarks: 100, marks: "85", grade: "A+" },
  { id: "2", roll: "02", name: "Karim Hossain", fullMarks: 100, marks: "72", grade: "A" },
  { id: "3", roll: "03", name: "Sumaiya Akter", fullMarks: 100, marks: "91", grade: "A+" },
  { id: "4", roll: "04", name: "Jahid Hasan", fullMarks: 100, marks: "68", grade: "A-" },
  { id: "5", roll: "05", name: "Nusrat Jahan", fullMarks: 100, marks: "88", grade: "A+" },
  { id: "6", roll: "06", name: "Tanvir Islam", fullMarks: 100, marks: "76", grade: "A" },
  { id: "7", roll: "07", name: "Faria Rahman", fullMarks: 100, marks: "65", grade: "A-" },
  { id: "8", roll: "08", name: "Rifat Chowdhury", fullMarks: 100, marks: "92", grade: "A+" },
  { id: "9", roll: "09", name: "Habiba Akter", fullMarks: 100, marks: "80", grade: "A+" },
  { id: "10", roll: "10", name: "Mehedi Hasan", fullMarks: 100, marks: "70", grade: "A" },
];

export function EnterMarksView() {
  const [selectedExam, setSelectedExam] = useState("Half Yearly Exam 2026");
  const [selectedClass, setSelectedClass] = useState("Class 9");
  const [selectedSection, setSelectedSection] = useState("A");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");

  const [students, setStudents] = useState<StudentRowItem[]>(INITIAL_STUDENTS);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);

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

  // Handle inline marks editing with auto-grade
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

  // Reset to empty / initial marks
  const handleReset = () => {
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        marks: "",
        grade: "",
      }))
    );
  };

  // Save marks action
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSaveNotification(true);
      setTimeout(() => setShowSaveNotification(false), 4000);
    }, 600);
  };

  // Compute Summary Statistics
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
    <div className="space-y-5 sm:space-y-6 container mx-auto">
      {/* 1. Header with Info alert banner */}
      <EnterMarksHeader assignedSubject={selectedSubject} />

      {/* Save Success Toast */}
      {showSaveNotification && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Marks Saved Successfully!</p>
              <p className="text-xs text-emerald-700">
                All entered student marks for {selectedSubject} ({selectedClass} - {selectedSection}) have been recorded.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowSaveNotification(false)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-100/60 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2. Filter Bar Card */}
      <MarksFilterCard
        selectedExam={selectedExam}
        onExamChange={setSelectedExam}
        selectedClass={selectedClass}
        onClassChange={setSelectedClass}
        selectedSection={selectedSection}
        onSectionChange={setSelectedSection}
        selectedSubject={selectedSubject}
        onSubjectChange={setSelectedSubject}
        onLoad={() => {
          // Re-load action
        }}
      />

      {/* 3. Main Grid Layout (Table on left 2-cols, Summary Cards on right 1-col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Student Marks Entry Table */}
        <div className="lg:col-span-2">
          <StudentMarksTable
            students={students}
            onMarksChange={handleMarksChange}
            onReset={handleReset}
            onSave={handleSave}
            isSaving={isSaving}
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
            examName={selectedExam}
            classNameStr={selectedClass}
            sectionName={selectedSection}
            subjectName={selectedSubject}
            fullMarks={100}
          />
        </div>
      </div>
    </div>
  );
}
