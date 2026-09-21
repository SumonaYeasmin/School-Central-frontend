"use client";

import { FileSpreadsheet } from "lucide-react";

export function ResultSheetHeader() {
  return (
    <div className="flex items-center gap-3.5">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/25 shrink-0">
        <FileSpreadsheet className="h-6 w-6" />
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Result Sheet
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
          View complete result sheet of your assigned class and subject.
        </p>
      </div>
    </div>
  );
}
