"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import {
  Search,
  Users,
  GraduationCap,
  Phone,
  UserCheck,
  Loader2,
  X,
  BookOpen,
} from "lucide-react";
import { getTeacherAssignmentStudents } from "@/src/services/teacherService";
import { getStudents } from "@/src/services/studentService";
import { Student } from "@/src/types/student";

interface StudentsRosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: {
    id: string;
    classId?: string;
    sectionId?: string;
    class: { id: string; name: string };
    section: { id: string; name: string };
    subject: { id: string; name: string; code?: string | null };
  } | null;
}

export function StudentsRosterModal({
  isOpen,
  onClose,
  assignment,
}: StudentsRosterModalProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isOpen && assignment) {
      fetchStudents();
    } else {
      setStudents([]);
      setSearchQuery("");
    }
  }, [isOpen, assignment]);

  const fetchStudents = async () => {
    if (!assignment) return;
    try {
      setIsLoading(true);
      // Try fetching via assignment endpoint first or fallback to direct class/section
      let list: Student[] = [];
      try {
        const res = await getTeacherAssignmentStudents(assignment.id);
        list = res?.students || (Array.isArray(res) ? res : []);
      } catch {
        // Fallback to getStudents
        const classId = assignment.class.id;
        const sectionId = assignment.section.id;
        list = await getStudents(classId, sectionId);
      }
      setStudents(list);
    } catch (err) {
      console.error("Error loading students roster:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!assignment) return null;

  const filteredStudents = students.filter((st) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      st.name.toLowerCase().includes(q) ||
      st.roll.toLowerCase().includes(q) ||
      st.studentId.toLowerCase().includes(q)
    );
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl w-full p-0 overflow-hidden bg-white rounded-3xl border-slate-200 shadow-2xl">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-blue-600/90 text-white font-bold text-xs uppercase px-2.5 py-0.5 border-0">
                  {assignment.class.name}
                </Badge>
                <Badge className="bg-emerald-600/90 text-white font-bold text-xs uppercase px-2.5 py-0.5 border-0">
                  {assignment.section.name}
                </Badge>
              </div>
              <DialogTitle className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>Student Roster</span>
                <span className="text-blue-300 font-normal text-base sm:text-lg">
                  ({assignment.subject.name})
                </span>
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Full list of students enrolled in this section
              </DialogDescription>
            </div>

            <div className="flex items-center gap-2">
              <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                <span className="text-xs text-blue-200 font-medium block">Total Students</span>
                <span className="text-lg font-black text-white">{students.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search by student name, roll, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9.5 h-10 bg-white rounded-xl border-slate-300 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="max-h-[420px] overflow-y-auto p-4 sm:p-6">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-sm font-medium">Loading student roster...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="py-14 text-center text-slate-400 space-y-2">
              <GraduationCap className="h-10 w-10 mx-auto text-slate-300" />
              <p className="text-sm font-medium text-slate-600">No students found</p>
              <p className="text-xs text-slate-400">
                {searchQuery ? "Try searching with a different name or roll" : "No students are currently registered in this section"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-600 text-xs uppercase font-bold border-b border-slate-200">
                    <th className="py-3 px-4 w-16 text-center">Roll</th>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4 hidden sm:table-cell">ID</th>
                    <th className="py-3 px-4">Gender</th>
                    <th className="py-3 px-4 hidden md:table-cell">Parent Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {filteredStudents.map((st) => {
                    const primaryParent = st.parents?.find((p) => p.isPrimary)?.parent || st.parents?.[0]?.parent;
                    return (
                      <tr key={st.id} className="hover:bg-blue-50/40 transition-colors">
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-blue-700 bg-blue-50/30">
                          {st.roll}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 ring-1 ring-slate-200">
                              <AvatarImage src={st.photo || undefined} alt={st.name} />
                              <AvatarFallback className="bg-blue-600 text-white font-bold text-xs">
                                {st.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-bold text-slate-900 leading-tight">{st.name}</p>
                              <span className="text-[11px] text-slate-400 sm:hidden">
                                ID: {st.studentId}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs text-slate-500 hidden sm:table-cell">
                          {st.studentId}
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge
                            variant="outline"
                            className={`text-[11px] font-semibold px-2 py-0.5 border ${
                              st.gender === "MALE"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-rose-50 text-rose-700 border-rose-200"
                            }`}
                          >
                            {st.gender || "N/A"}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-500 hidden md:table-cell">
                          {primaryParent ? (
                            <div className="space-y-0.5">
                              <p className="font-medium text-slate-700">{primaryParent.name}</p>
                              <p className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
                                <Phone className="h-3 w-3 text-slate-400" />
                                {primaryParent.phone}
                              </p>
                            </div>
                          ) : (
                            <span className="text-slate-400 italic">Not available</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Close Roster
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
