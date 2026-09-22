"use client";

import { FileSpreadsheet, Globe, Lock, Download, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";

interface AdminResultSidebarSummaryProps {
  examName: string;
  classNameStr: string;
  sectionName: string;
  subjectName: string;
  totalStudents: number;
  marksRange: string;
  averageMarks: number;
  highestMarks: string;
  lowestMarks: string;
  isPublished: boolean;
  onPublishToggle?: () => void;
  isPublishing?: boolean;
  onDownloadPdf?: () => void;
}

export function AdminResultSidebarSummary({
  examName = "Half Yearly Exam 2026",
  classNameStr = "Class 9",
  sectionName = "A",
  subjectName = "Mathematics",
  totalStudents = 32,
  marksRange = "61 – 93",
  averageMarks = 78.5,
  highestMarks = "93 (Sumaiya Akter)",
  lowestMarks = "61 (Tanjila Rafi)",
  isPublished = true,
  onPublishToggle,
  isPublishing = false,
  onDownloadPdf,
}: AdminResultSidebarSummaryProps) {
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

      {/* 2. Admin Publication Status & Note Card */}
      <Card
        className={`rounded-2xl border shadow-2xs ${
          isPublished
            ? "border-emerald-100 bg-emerald-50/70"
            : "border-amber-100 bg-amber-50/70"
        }`}
      >
        <CardContent className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold">
              {isPublished ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="text-emerald-900">Results are Published</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                  <span className="text-amber-900">Results are in Draft</span>
                </>
              )}
            </div>
          </div>

          <ul className="space-y-1.5 text-[11px] leading-relaxed list-disc list-inside text-slate-700">
            {isPublished ? (
              <>
                <li>অভিভাবক এবং শিক্ষার্থীরা পাবলিক পোর্টাল থেকে রেজাল্ট দেখতে পারবেন।</li>
                <li>অ্যাডমিন চাইলে যে কোনো সময় রেজাল্ট ড্রাফট বা আনপাবলিশ করতে পারবেন।</li>
              </>
            ) : (
              <>
                <li>রেজাল্ট এখনও ড্রাফট অবস্থায় রয়েছে (অভিভাবক ও শিক্ষার্থীরা দেখতে পাবে না)।</li>
                <li>সব সাবজেক্টের মার্কস ভেরিফাই করার পর নিচের বাটনে ক্লিক করে পাবলিশ করুন।</li>
              </>
            )}
          </ul>

          {onPublishToggle && (
            <Button
              onClick={onPublishToggle}
              disabled={isPublishing}
              className={`w-full h-9 rounded-xl font-bold text-xs gap-1.5 cursor-pointer shadow-xs transition-all ${
                isPublished
                  ? "bg-white hover:bg-slate-100 text-slate-700 border border-slate-300"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              {isPublished ? (
                <>
                  <Lock className="h-3.5 w-3.5 text-slate-500" />
                  <span>{isPublishing ? "Updating..." : "Unpublish (Revert to Draft)"}</span>
                </>
              ) : (
                <>
                  <Globe className="h-3.5 w-3.5" />
                  <span>{isPublishing ? "Publishing..." : "Publish Result to Parents"}</span>
                </>
              )}
            </Button>
          )}
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
