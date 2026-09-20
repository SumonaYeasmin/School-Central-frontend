"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Badge } from "@/src/components/ui/badge";
import { BookOpen, Search, Layers, Sparkles } from "lucide-react";
import { Input } from "@/src/components/ui/input";

interface ClassCurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
  classItem: any;
}

export function ClassCurriculumModal({
  isOpen,
  onClose,
  classItem,
}: ClassCurriculumModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  if (!classItem) return null;

  const classSubjects: any[] = classItem.classSubjects || [];

  // Filter subjects by search
  const filteredSubjects = classSubjects.filter((cs) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const nameMatch = cs.subject?.name?.toLowerCase().includes(q);
    const codeMatch = cs.subject?.code?.toLowerCase().includes(q);
    const groupMatch = cs.group?.name?.toLowerCase().includes(q);
    return nameMatch || codeMatch || groupMatch;
  });

  // Group into Common/Compulsory vs Group-specific (Science/Arts/Commerce)
  const commonSubjects = filteredSubjects.filter((cs) => !cs.groupId && !cs.group);
  const groupSubjects = filteredSubjects.filter((cs) => cs.groupId || cs.group);

  // Group by specific group name
  const groupedByGroupName = groupSubjects.reduce((acc: Record<string, any[]>, cs) => {
    const gName = cs.group?.name || "Group Specific";
    if (!acc[gName]) acc[gName] = [];
    acc[gName].push(cs);
    return acc;
  }, {});

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-3xl border border-slate-200/90 shadow-2xl bg-white max-h-[90vh] flex flex-col">
        {/* 1. Header with class title and badges */}
        <div className="bg-slate-50/80 border-b border-slate-200/80 p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white font-bold text-base shadow-sm shrink-0">
              {classItem.name.replace(/[^0-9]/g, "") || classItem.name.charAt(0)}
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-900">
                {classItem.name} Curriculum
              </DialogTitle>
              <p className="text-xs text-slate-500 mt-0.5">
                Assigned academic subjects & curriculum breakdown
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200/80 text-xs font-semibold py-1 px-3 rounded-xl flex items-center gap-1.5"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>{classSubjects.length} Total Subjects</span>
            </Badge>

            {classItem.sections && classItem.sections.length > 0 && (
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700 border-emerald-200/80 text-xs font-semibold py-1 px-3 rounded-xl flex items-center gap-1.5"
              >
                <Layers className="h-3.5 w-3.5" />
                <span>
                  Sections: {classItem.sections.map((s: any) => s.name).join(", ")}
                </span>
              </Badge>
            )}
          </div>
        </div>

        {/* 2. Controls / Search bar */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search subject name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* 3. Scrollable Subjects List */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {classSubjects.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mx-auto">
                <BookOpen className="h-6 w-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">
                No subjects assigned yet
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                There are no subjects linked to {classItem.name} in the database.
              </p>
            </div>
          ) : filteredSubjects.length === 0 ? (
            <div className="py-12 text-center space-y-2 text-slate-500 text-xs">
              <p>No subjects matching &quot;{searchQuery}&quot;</p>
            </div>
          ) : (
            <>
              {/* Common / Compulsory Subjects */}
              {commonSubjects.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Core / Common Subjects ({commonSubjects.length})
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {commonSubjects.map((cs, idx) => (
                      <div
                        key={cs.id || idx}
                        className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="h-8 w-8 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
                            <BookOpen className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {cs.subject?.name || "Subject"}
                            </p>
                            {cs.subject?.code && (
                              <p className="text-[10px] text-slate-400 font-mono">
                                Code: {cs.subject.code}
                              </p>
                            )}
                          </div>
                        </div>

                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 shrink-0">
                          Compulsory
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Group-specific Subjects (e.g. Science, Humanities, Commerce) */}
              {Object.entries(groupedByGroupName).map(([groupName, items]) => (
                <div key={groupName} className="space-y-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-600" />
                    <h4 className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                      {groupName} Group Subjects ({items.length})
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {items.map((cs, idx) => (
                      <div
                        key={cs.id || idx}
                        className="flex items-center justify-between p-3 rounded-2xl bg-purple-50/40 border border-purple-200/60 hover:border-purple-300 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="h-8 w-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold shrink-0">
                            <Sparkles className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {cs.subject?.name || "Subject"}
                            </p>
                            {cs.subject?.code && (
                              <p className="text-[10px] text-slate-400 font-mono">
                                Code: {cs.subject.code}
                              </p>
                            )}
                          </div>
                        </div>

                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 shrink-0">
                          {groupName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
