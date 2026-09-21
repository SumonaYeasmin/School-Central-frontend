"use client";

import { Search } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

interface MarksFilterCardProps {
  selectedExam: string;
  onExamChange: (val: string) => void;
  selectedClass: string;
  onClassChange: (val: string) => void;
  selectedSection: string;
  onSectionChange: (val: string) => void;
  selectedSubject: string;
  onSubjectChange: (val: string) => void;
  onLoad: () => void;
  isLoading?: boolean;
}

export function MarksFilterCard({
  selectedExam,
  onExamChange,
  selectedClass,
  onClassChange,
  selectedSection,
  onSectionChange,
  selectedSubject,
  onSubjectChange,
  onLoad,
  isLoading = false,
}: MarksFilterCardProps) {
  return (
    <Card className="bg-white border-slate-200/90 rounded-2xl shadow-xs">
      <CardContent className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* 1. Exam Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Exam</label>
            <Select value={selectedExam} onValueChange={onExamChange}>
              <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500/20">
                <SelectValue placeholder="Select Exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Half Yearly Exam 2026">Half Yearly Exam 2026</SelectItem>
                <SelectItem value="Final Term Exam 2026">Final Term Exam 2026</SelectItem>
                <SelectItem value="First Term Exam 2026">First Term Exam 2026</SelectItem>
                <SelectItem value="Pre-Test Examination 2026">Pre-Test Examination 2026</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 2. Class Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Class</label>
            <Select value={selectedClass} onValueChange={onClassChange}>
              <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500/20">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Class 9">Class 9</SelectItem>
                <SelectItem value="Class 10">Class 10</SelectItem>
                <SelectItem value="Class 8">Class 8</SelectItem>
                <SelectItem value="Class 7">Class 7</SelectItem>
                <SelectItem value="Class 6">Class 6</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 3. Section Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Section</label>
            <Select value={selectedSection} onValueChange={onSectionChange}>
              <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500/20">
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
                <SelectItem value="C">Section C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 4. Subject Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Subject</label>
            <Select value={selectedSubject} onValueChange={onSubjectChange}>
              <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500/20">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Bangla">Bangla</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 5. Load Button */}
          <div>
            <Button
              onClick={onLoad}
              disabled={isLoading}
              className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm gap-2 shadow-sm shadow-blue-600/25 transition-all cursor-pointer"
            >
              <Search className="h-4 w-4" />
              <span>{isLoading ? "Loading..." : "Load"}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
