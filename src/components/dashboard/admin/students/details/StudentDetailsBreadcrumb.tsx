"use client";

import { Button } from "@/src/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface StudentDetailsBreadcrumbProps {
  studentName?: string;
  onBack?: () => void;
}

export function StudentDetailsBreadcrumb({
  studentName,
  onBack,
}: StudentDetailsBreadcrumbProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/admin/dashboard/students");
    }
  };

  return (
    <div className="flex items-center justify-between">
      {/* Breadcrumb links */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
        <Link
          href="/admin/dashboard"
          className="hover:text-slate-600 transition-colors"
        >
          School office
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-300" />
        <Link
          href="/admin/dashboard/students"
          className="hover:text-slate-600 transition-colors"
        >
          Students
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-300" />
        <span className="text-slate-700 font-semibold truncate max-w-[200px] sm:max-w-none">
          {studentName || "Student Details"}
        </span>
      </div>

      {/* Back button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleBack}
        className="rounded-xl gap-2 text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to students</span>
      </Button>
    </div>
  );
}
