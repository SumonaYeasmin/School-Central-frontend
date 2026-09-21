"use client";

import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

interface QuickInfoProps {
  examName?: string;
  classNameStr?: string;
  sectionName?: string;
  subjectName?: string;
  fullMarks?: number;
}

export function QuickInfoCard({
  examName = "Half Yearly Exam 2026",
  classNameStr = "Class 9",
  sectionName = "A",
  subjectName = "Mathematics",
  fullMarks = 100,
}: QuickInfoProps) {
  const infoRows = [
    { label: "Exam", value: examName },
    { label: "Class - Section", value: `${classNameStr} - ${sectionName}` },
    { label: "Subject", value: subjectName },
    { label: "Full Marks", value: String(fullMarks) },
    {
      label: "Grade System",
      value: "A+ (80-100), A (70-79), A- (60-69), B+ (50-59), B (40-49), ...",
    },
  ];

  return (
    <Card className="bg-white border-slate-200/90 rounded-2xl shadow-xs">
      <CardHeader className="p-5 pb-3 border-b border-slate-100">
        <CardTitle className="text-sm font-bold text-slate-900">
          Quick Info
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        {/* Info Rows */}
        <div className="space-y-3 divide-y divide-slate-100 text-xs">
          {infoRows.map((row, idx) => (
            <div
              key={row.label}
              className={`flex items-center justify-between gap-3 ${idx > 0 ? "pt-2.5" : ""}`}
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

        {/* Save Important Note Banner */}
        <div className="p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-200/80 flex items-start gap-2.5">
          <div className="p-1 rounded-lg bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-emerald-900">
              Save Important Note
            </h5>
            <p className="text-[11px] text-emerald-700 mt-0.5 font-normal leading-relaxed">
              Make sure you enter the correct marks. You can edit your marks later if needed.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
