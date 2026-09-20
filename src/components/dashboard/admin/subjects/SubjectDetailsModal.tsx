"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Badge } from "@/src/components/ui/badge";
import {
  BookOpen,
  GraduationCap,
  Layers,
  FlaskConical,
  Scroll,
  Briefcase,
  Sparkles,
  Check,
  Copy,
  BookCheck,
} from "lucide-react";

interface SubjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: any;
}

export function SubjectDetailsModal({
  isOpen,
  onClose,
  subject,
}: SubjectDetailsModalProps) {
  const [copied, setCopied] = useState(false);

  if (!subject) return null;

  const code = subject.code || "N/A";
  const classSubjects: any[] = subject.classSubjects || [];

  // Copy code to clipboard
  const handleCopyCode = () => {
    if (code && code !== "N/A") {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Determine Category
  const groupNames = classSubjects
    .map((cs: any) => cs.group?.name)
    .filter(Boolean);

  let categoryLabel = "Compulsory Core";
  let categoryBg = "bg-blue-50 text-blue-700 border-blue-200";
  let CategoryIcon = BookCheck;

  if (groupNames.some((g: string) => g.toLowerCase().includes("science") || g.includes("বিজ্ঞান"))) {
    categoryLabel = "Science Group";
    categoryBg = "bg-emerald-50 text-emerald-700 border-emerald-200";
    CategoryIcon = FlaskConical;
  } else if (groupNames.some((g: string) => g.toLowerCase().includes("humanities") || g.includes("মানবিক") || g.toLowerCase().includes("arts"))) {
    categoryLabel = "Humanities Group";
    categoryBg = "bg-amber-50 text-amber-700 border-amber-200";
    CategoryIcon = Scroll;
  } else if (groupNames.some((g: string) => g.toLowerCase().includes("business") || g.includes("ব্যবসায়") || g.toLowerCase().includes("commerce"))) {
    categoryLabel = "Business Studies";
    categoryBg = "bg-purple-50 text-purple-700 border-purple-200";
    CategoryIcon = Briefcase;
  } else if (
    classSubjects.some((cs: any) => cs.isOptional) ||
    ['কৃষিশিক্ষা', 'গার্হস্থ্যবিজ্ঞান', 'চারু ও কারুকলা', 'আরবি', 'সংস্কৃত', 'পালি', 'সংগীত'].some((k) => subject.name?.includes(k))
  ) {
    categoryLabel = "Optional / Elective";
    categoryBg = "bg-rose-50 text-rose-700 border-rose-200";
    CategoryIcon = Sparkles;
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl p-0 overflow-hidden rounded-3xl border border-slate-200/90 shadow-2xl bg-white max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-50/80 border-b border-slate-200/80 p-6 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white font-bold text-lg shadow-sm shrink-0">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-slate-900">
                  {subject.name}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500">Official NCTB Curriculum</span>
                  {code !== "N/A" && (
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors cursor-pointer"
                      title="Click to copy SSC subject code"
                    >
                      <span>Code: {code}</span>
                      {copied ? (
                        <Check className="h-3 w-3 text-emerald-600" />
                      ) : (
                        <Copy className="h-3 w-3 text-slate-500" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Badge
              variant="outline"
              className={`text-xs font-semibold py-1 px-3 rounded-xl flex items-center gap-1.5 border ${categoryBg}`}
            >
              <CategoryIcon className="h-3.5 w-3.5" />
              <span>{categoryLabel}</span>
            </Badge>

            <Badge
              variant="outline"
              className="bg-slate-100 text-slate-700 border-slate-200 text-xs font-semibold py-1 px-3 rounded-xl flex items-center gap-1.5"
            >
              <GraduationCap className="h-3.5 w-3.5 text-slate-600" />
              <span>{classSubjects.length} Classes Enrolled</span>
            </Badge>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Classes & Groups Distribution */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-blue-600" />
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Assigned Classes & Academic Levels
              </h4>
            </div>

            {classSubjects.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center">
                This subject is not currently assigned to any class.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {classSubjects.map((cs: any, idx: number) => {
                  const className = cs.class?.name || "Class";
                  const isCompulsory = cs.isCompulsory ?? !cs.isOptional;
                  const groupName = cs.group?.name;

                  return (
                    <div
                      key={cs.id || idx}
                      className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-xl bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {className.replace(/[^0-9]/g, "") || "C"}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-xs">{className}</p>
                          {groupName ? (
                            <span className="text-[10px] text-purple-600 font-semibold block">
                              {groupName}
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400 block">
                              All Sections
                            </span>
                          )}
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                          isCompulsory
                            ? "bg-blue-50 text-blue-700 border-blue-200/60"
                            : "bg-rose-50 text-rose-700 border-rose-200/60"
                        }`}
                      >
                        {isCompulsory ? "Compulsory" : "Optional"}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
