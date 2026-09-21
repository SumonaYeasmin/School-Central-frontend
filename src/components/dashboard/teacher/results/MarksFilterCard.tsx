"use client";

import { BookOpen, Layers, GraduationCap, Calendar } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

export interface FilterOption {
  id: string;
  name: string;
  code?: string;
  year?: number;
}

interface MarksFilterCardProps {
  exams: FilterOption[];
  selectedExamId: string;
  onExamChange: (id: string) => void;
  classes: FilterOption[];
  selectedClassId: string;
  onClassChange: (id: string) => void;
  sections: FilterOption[];
  selectedSectionId: string;
  onSectionChange: (id: string) => void;
  subjects: FilterOption[];
  selectedSubjectId: string;
  onSubjectChange: (id: string) => void;
  isFetchingFilters?: boolean;
}

export function MarksFilterCard({
  exams,
  selectedExamId,
  onExamChange,
  classes,
  selectedClassId,
  onClassChange,
  sections,
  selectedSectionId,
  onSectionChange,
  subjects,
  selectedSubjectId,
  onSubjectChange,
  isFetchingFilters = false,
}: MarksFilterCardProps) {
  return (
    <Card className="bg-white border-slate-200/90 rounded-2xl shadow-xs">
      <CardContent className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 items-end">
          {/* 1. Exam Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-blue-600" />
              <span>Exam</span>
            </label>
            <Select
              value={selectedExamId}
              onValueChange={onExamChange}
              disabled={isFetchingFilters || exams.length === 0}
            >
              <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500/20">
                <SelectValue placeholder={isFetchingFilters ? "Loading exams..." : "Select Exam"} />
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

          {/* 2. Class Selector (Only Teacher's Assigned Classes) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
              <span>Assigned Class</span>
            </label>
            <Select
              value={selectedClassId}
              onValueChange={onClassChange}
              disabled={isFetchingFilters || classes.length === 0}
            >
              <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500/20">
                <SelectValue placeholder={isFetchingFilters ? "Loading..." : classes.length === 0 ? "No classes assigned" : "Select Class"} />
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

          {/* 3. Section Selector (Only Teacher's Assigned Sections for Selected Class) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-blue-600" />
              <span>Assigned Section</span>
            </label>
            <Select
              value={selectedSectionId}
              onValueChange={onSectionChange}
              disabled={isFetchingFilters || sections.length === 0}
            >
              <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500/20">
                <SelectValue placeholder={sections.length === 0 ? "No section" : "Select Section"} />
              </SelectTrigger>
              <SelectContent>
                {sections.map((sec) => (
                  <SelectItem key={sec.id} value={sec.id}>
                    {sec.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 4. Subject Selector (Only Teacher's Assigned Subjects for Selected Class & Section) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-blue-600" />
              <span>Assigned Subject</span>
            </label>
            <Select
              value={selectedSubjectId}
              onValueChange={onSubjectChange}
              disabled={isFetchingFilters || subjects.length === 0}
            >
              <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500/20">
                <SelectValue placeholder={subjects.length === 0 ? "No subject" : "Select Subject"} />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((sub) => (
                  <SelectItem key={sub.id} value={sub.id}>
                    {sub.name} {sub.code ? `(${sub.code})` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
