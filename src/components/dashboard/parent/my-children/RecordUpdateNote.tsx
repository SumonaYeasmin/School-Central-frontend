"use client";

import React from "react";
import { Info } from "lucide-react";

export function RecordUpdateNote() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-50 border border-indigo-100 p-5 shadow-2xs space-y-2">
      <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs">
        <Info className="h-4 w-4 text-indigo-600 shrink-0" />
        <span>Profile & Record Updates</span>
      </div>
      <p className="text-[11px] text-slate-600 leading-relaxed">
        To request corrections in name, date of birth, or contact phone number, please contact the School Central Administration Office during school hours (9:00 AM – 2:00 PM).
      </p>
    </div>
  );
}
