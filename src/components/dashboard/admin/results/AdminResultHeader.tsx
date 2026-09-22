"use client";

import { FileSpreadsheet, Globe, Lock } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

interface AdminResultHeaderProps {
  examStatus?: "DRAFT" | "PUBLISHED";
  examName?: string;
  onPublishToggle?: () => void;
  isPublishing?: boolean;
}

export function AdminResultHeader({
  examStatus = "PUBLISHED",
  examName = "Half Yearly Exam 2026",
  onPublishToggle,
  isPublishing = false,
}: AdminResultHeaderProps) {
  const isPublished = examStatus === "PUBLISHED";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Title & Icon */}
      <div className="flex items-center gap-3.5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/25 shrink-0">
          <FileSpreadsheet className="h-6 w-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Result Sheet
            </h1>
            <Badge
              variant="outline"
              className={`text-xs px-2.5 py-0.5 font-bold ${
                isPublished
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                  : "bg-amber-50 text-amber-700 border-amber-300"
              }`}
            >
              {isPublished ? "PUBLISHED" : "DRAFT"}
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            View, verify, and publish complete result sheet of all classes and subjects.
          </p>
        </div>
      </div>

      {/* Right Admin Publish Status / Toggle */}
      {onPublishToggle && (
        <div className="flex items-center gap-3">
          <Button
            onClick={onPublishToggle}
            disabled={isPublishing}
            className={`h-10 px-4 rounded-xl font-bold text-xs sm:text-sm gap-2 transition-all cursor-pointer shadow-sm ${
              isPublished
                ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300"
                : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25"
            }`}
          >
            {isPublished ? (
              <>
                <Lock className="h-4 w-4 text-slate-500" />
                <span>{isPublishing ? "Updating..." : "Unpublish (Revert to Draft)"}</span>
              </>
            ) : (
              <>
                <Globe className="h-4 w-4" />
                <span>{isPublishing ? "Publishing..." : "Publish Result to Public/Parent"}</span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
