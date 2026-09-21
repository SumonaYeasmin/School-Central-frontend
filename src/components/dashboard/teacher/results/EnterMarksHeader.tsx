"use client";

import { FileSpreadsheet, Info } from "lucide-react";

interface EnterMarksHeaderProps {
  assignedSubject?: string;
}

export function EnterMarksHeader({ assignedSubject = "Mathematics" }: EnterMarksHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      {/* Title & Icon */}
      <div className="flex items-center gap-3.5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/25 shrink-0">
          <FileSpreadsheet className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Enter Marks
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            Add or update marks for your assigned class and subject
          </p>
        </div>
      </div>

      {/* Info Banner Alert */}
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-blue-50/90 border border-blue-200/80 text-blue-700 text-xs font-medium shadow-2xs">
        <div className="p-1 rounded-lg bg-blue-100/80 text-blue-700 shrink-0">
          <Info className="h-4 w-4" />
        </div>
        <span>
          You can only enter marks for your assigned subject (<strong className="font-semibold">{assignedSubject}</strong>) in this class.
        </span>
      </div>
    </div>
  );
}
