"use client";

import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface TeacherNotFoundProps {
  error?: string | null;
}

export function TeacherNotFound({ error }: TeacherNotFoundProps) {
  return (
    <div className="container mx-auto my-16 bg-white border border-slate-200/90 rounded-3xl p-8 text-center space-y-4 shadow-xs">
      <div className="h-16 w-16 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
        <AlertCircle className="h-8 w-8" />
      </div>

      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-900">
          Teacher Profile Not Found
        </h2>
        <p className="text-xs text-slate-500 max-w-xs mx-auto">
          {error ||
            "We couldn't find the teacher record you requested. The profile may have been removed."}
        </p>
      </div>

      <Button
        asChild
        className="w-full h-10 rounded-xl bg-[#0f2c4a] hover:bg-[#163e66] text-white text-xs font-semibold shadow-xs"
      >
        <Link href="/admin/dashboard/teachers" className="flex items-center justify-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Teachers Directory</span>
        </Link>
      </Button>
    </div>
  );
}
