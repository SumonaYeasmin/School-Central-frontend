"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Users,
  GraduationCap,
  Phone,
  BookOpen,
  School,
  Loader2,
  Calendar,
  CheckCircle2,
  Sparkles,
  Download,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { getTeacherAssignmentStudents } from "@/src/services/teacherService";
import { Student } from "@/src/types/student";

interface EnrolledStudentsViewProps {
  assignmentId: string;
}

export function EnrolledStudentsView({ assignmentId }: EnrolledStudentsViewProps) {
  const [assignment, setAssignment] = useState<any>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState<"ALL" | "MALE" | "FEMALE">("ALL");

  useEffect(() => {
    fetchData();
  }, [assignmentId]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getTeacherAssignmentStudents(assignmentId);
      if (res) {
        setAssignment(res.assignment || null);
        setStudents(res.students || []);
      }
    } catch (err) {
      console.error("Error loading enrolled students:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const maleCount = students.filter((s) => s.gender === "MALE").length;
  const femaleCount = students.filter((s) => s.gender === "FEMALE").length;

  const filteredStudents = students.filter((st) => {
    // Gender filter
    if (genderFilter !== "ALL" && st.gender !== genderFilter) {
      return false;
    }
    // Search query filter
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      st.name.toLowerCase().includes(q) ||
      st.roll.toLowerCase().includes(q) ||
      st.studentId.toLowerCase().includes(q)
    );
  });

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 font-sans animate-in fade-in duration-300">
      {/* Back to Classes Link */}
      <div className="flex items-center justify-between">
        <Link
          href="/teacher/dashboard/classes"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors group px-3.5 py-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to My Classes</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-blue-900/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500 text-white font-bold text-xs uppercase px-3 py-1 border-0">
                {assignment?.class?.name || "Class"}
              </Badge>
              <Badge className="bg-emerald-500 text-white font-bold text-xs uppercase px-3 py-1 border-0">
                {assignment?.section?.name || "Section"}
              </Badge>
              {assignment?.subject?.code && (
                <span className="text-xs font-mono font-bold bg-white/10 text-blue-200 px-2.5 py-0.5 rounded-lg border border-white/10">
                  Code: {assignment.subject.code}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {assignment?.subject?.name ? `${assignment.subject.name} - Enrolled Students` : "Enrolled Students Roster"}
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-normal">
              Official classroom student list with roll numbers, contact information, and academic status.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[110px]">
              <span className="text-xs text-blue-200 font-medium block">Total Enrolled</span>
              <span className="text-2xl font-black text-white font-mono">{students.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Total Students
          </span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
            {students.length}
          </span>
          <p className="text-[11px] text-slate-400 mt-0.5">Enrolled in section</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
          <span className="text-xs font-bold text-blue-500 uppercase tracking-wider block mb-1">
            Male Students
          </span>
          <span className="text-2xl sm:text-3xl font-black text-blue-700 font-mono">
            {maleCount}
          </span>
          <p className="text-[11px] text-slate-400 mt-0.5">Boys enrolled</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
          <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block mb-1">
            Female Students
          </span>
          <span className="text-2xl sm:text-3xl font-black text-rose-600 font-mono">
            {femaleCount}
          </span>
          <p className="text-[11px] text-slate-400 mt-0.5">Girls enrolled</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block mb-1">
            Active Status
          </span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">
            100%
          </span>
          <p className="text-[11px] text-slate-400 mt-0.5">Verified active</p>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Gender Filter Tabs */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setGenderFilter("ALL")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                genderFilter === "ALL"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              All ({students.length})
            </button>
            <button
              type="button"
              onClick={() => setGenderFilter("MALE")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                genderFilter === "MALE"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              Boys ({maleCount})
            </button>
            <button
              type="button"
              onClick={() => setGenderFilter("FEMALE")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                genderFilter === "FEMALE"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              Girls ({femaleCount})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search by name, roll or student ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9.5 h-10 bg-slate-50 rounded-xl border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="h-9 w-9 animate-spin text-blue-600" />
            <p className="text-sm font-semibold text-slate-600">Loading student roster...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="py-20 text-center text-slate-400 space-y-3">
            <GraduationCap className="h-12 w-12 mx-auto text-slate-300" />
            <h3 className="text-base font-bold text-slate-800">No Students Found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              {searchQuery
                ? "No students match your search filter. Try searching with a different keyword."
                : "No students are currently registered in this section."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/90 text-slate-600 text-xs uppercase font-bold border-b border-slate-200">
                  <th className="py-4 px-6 w-20 text-center">Roll</th>
                  <th className="py-4 px-6">Student Information</th>
                  <th className="py-4 px-6 hidden sm:table-cell">Student ID</th>
                  <th className="py-4 px-6">Gender</th>
                  <th className="py-4 px-6 hidden md:table-cell">Parent Contact</th>
                  <th className="py-4 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filteredStudents.map((st) => {
                  const primaryParent =
                    st.parents?.find((p) => p.isPrimary)?.parent || st.parents?.[0]?.parent;
                  return (
                    <tr key={st.id} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-4 px-6 text-center font-mono font-bold text-blue-700 bg-blue-50/20 text-base">
                        {st.roll}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <Avatar className="h-10 w-10 ring-2 ring-slate-100 shadow-2xs">
                            <AvatarImage src={st.photo || undefined} alt={st.name} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-sm">
                              {st.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-slate-900 text-base leading-tight">
                              {st.name}
                            </p>
                            <span className="text-xs text-slate-400 sm:hidden block font-mono mt-0.5">
                              {st.studentId}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs font-bold text-slate-600 hidden sm:table-cell">
                        {st.studentId}
                      </td>
                      <td className="py-4 px-6">
                        <Badge
                          variant="outline"
                          className={`text-xs font-bold px-2.5 py-0.5 border ${
                            st.gender === "MALE"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}
                        >
                          {st.gender || "N/A"}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-500 hidden md:table-cell">
                        {primaryParent ? (
                          <div className="space-y-0.5">
                            <p className="font-bold text-slate-800">{primaryParent.name}</p>
                            <a
                              href={`tel:${primaryParent.phone}`}
                              className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-mono text-xs font-semibold hover:underline"
                            >
                              <Phone className="h-3 w-3" />
                              {primaryParent.phone}
                            </a>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Not available</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs px-2.5 py-0.5 shadow-none">
                          Active
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
