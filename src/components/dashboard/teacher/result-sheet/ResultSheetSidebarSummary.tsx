"use client";

import { FileSpreadsheet, Info, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";

interface ResultSheetSidebarSummaryProps {
  examName: string;
  classNameStr: string;
  sectionName: string;
  subjectName: string;
  totalStudents: number;
  marksRange: string;
  averageMarks: number;
  highestMarks: string;
  lowestMarks: string;
  onDownloadPdf?: () => void;
}

export function ResultSheetSidebarSummary({
  examName = "Half Yearly Exam 2026",
  classNameStr = "Class 9",
  sectionName = "A",
  subjectName = "Mathematics",
  totalStudents = 32,
  marksRange = "430 – 650",
  averageMarks = 78.5,
  highestMarks = "650 (Sumaiya Akter)",
  lowestMarks = "430 (Tanjila Rafi)",
  onDownloadPdf,
}: ResultSheetSidebarSummaryProps) {
  const summaryRows = [
    { label: "Exam", value: examName },
    { label: "Class", value: classNameStr },
    { label: "Section", value: sectionName },
    { label: "Subject", value: subjectName },
    { label: "Total Students", value: String(totalStudents) },
    { label: "Marks Range", value: marksRange },
    { label: "Average Marks", value: averageMarks > 0 ? averageMarks.toFixed(1) : "-" },
    { label: "Highest Marks", value: highestMarks },
    { label: "Lowest Marks", value: lowestMarks },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Result Summary Card */}
      <Card className="bg-white border-slate-200/90 rounded-2xl shadow-xs">
        <CardHeader className="p-4 sm:p-5 pb-3 border-b border-slate-100 flex flex-row items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
            <FileSpreadsheet className="h-4 w-4" />
          </div>
          <CardTitle className="text-sm sm:text-base font-bold text-slate-900">
            Result Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-5">
          <div className="space-y-2.5 divide-y divide-slate-100 text-xs">
            {summaryRows.map((row, idx) => (
              <div
                key={row.label}
                className={`flex items-center justify-between gap-3 ${idx > 0 ? "pt-2" : ""}`}
              >
                <span className="text-slate-500 font-medium shrink-0">
                  {row.label}
                </span>
                <span className="text-slate-800 font-semibold text-right truncate">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 2. Note Info Card */}
      <Card className="rounded-2xl border border-blue-100 bg-blue-50/70 shadow-2xs">
        <CardContent className="p-4 sm:p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-xs">
            <div className="p-1 rounded-md bg-blue-600 text-white">
              <Info className="h-3.5 w-3.5" />
            </div>
            <span>Note</span>
          </div>

          <ul className="space-y-1.5 text-[11px] text-blue-900/80 leading-relaxed list-disc list-inside">
            <li>রেজাল্ট শীটে শুধুমাত্র আপনার assigned subject-এর মার্কস এডিট করা যাবে।</li>
            <li>অন্য subject-এর মার্কস দেখতে পারবেন, কিন্তু এডিট করতে পারবেন না।</li>
            <li>এখানে দেখানো ফলাফল সব subject-এর মোট মার্কসের ভিত্তিতে calculate করা হয়েছে।</li>
          </ul>
        </CardContent>
      </Card>

      {/* 3. Download Result Sheet (PDF) Button */}
      <Button
        onClick={onDownloadPdf || (() => window.print())}
        className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm gap-2 shadow-sm shadow-blue-600/25 transition-all cursor-pointer"
      >
        <Download className="h-4 w-4" />
        <span>Download Result Sheet (PDF)</span>
      </Button>
    </div>
  );
}
