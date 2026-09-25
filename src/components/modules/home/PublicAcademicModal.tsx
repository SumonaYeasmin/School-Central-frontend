"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  School,
  Users,
  Layers,
  BookOpen,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  GraduationCap,
} from "lucide-react";

interface PublicAcademicModalProps {
  isOpen: boolean;
  onClose: () => void;
  classes: any[];
  students: any[];
}

export function PublicAcademicModal({
  isOpen,
  onClose,
  classes = [],
  students = [],
}: PublicAcademicModalProps) {
  const [activeTab, setActiveTab] = useState<"structure" | "curriculum" | "schedule">("structure");

  // Calculate Class & Section Enrollment breakdown
  const classBreakdown = classes.map((cls) => {
    // Total students in this class
    const classStudents = students.filter(
      (s) => s.classId === cls.id || (s.class && s.class.id === cls.id) || (s.class && s.class.name === cls.name)
    );

    // Section breakdown
    const sections = Array.isArray(cls.sections) && cls.sections.length > 0
      ? cls.sections.map((sec: any) => {
          const secName = typeof sec === "string" ? sec : sec?.name || "A";
          const secId = typeof sec === "object" ? sec?.id : null;
          
          const secCount = classStudents.filter((s) => {
            if (secId && (s.sectionId === secId || (s.section && s.section.id === secId))) {
              return true;
            }
            return s.section?.name?.toUpperCase() === secName.toUpperCase() || s.section === secName;
          }).length;

          return {
            name: secName,
            count: secCount,
          };
        })
      : [
          {
            name: "A",
            count: classStudents.filter((s) => s.section?.name === "A" || !s.section).length,
          },
          {
            name: "B",
            count: classStudents.filter((s) => s.section?.name === "B").length,
          },
        ];

    return {
      id: cls.id,
      name: cls.name,
      totalStudents: classStudents.length,
      sections,
      subjects: cls.classSubjects || [],
    };
  });

  const totalEnrolled = students.length;
  const totalClassesCount = classes.length || classBreakdown.length;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] sm:max-w-4xl lg:max-w-5xl max-h-[92vh] overflow-y-auto p-5 sm:p-8 rounded-3xl bg-white shadow-2xl border border-slate-100 select-none">
        {/* ================= Modal Header ================= */}
        <DialogHeader className="pb-4 border-b border-slate-100 space-y-1.5">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
              <School className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Academic Information & Class Structure
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Greenfield High School • Live class-wise and section-wise student enrollment details.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* ================= Summary Stats Overview Strip ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500">Total Enrolled</p>
              <p className="text-lg font-black text-slate-900">{totalEnrolled} Students</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500">Total Classes</p>
              <p className="text-lg font-black text-slate-900">{totalClassesCount} Classes</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500">Sections</p>
              <p className="text-lg font-black text-slate-900">Section A & B</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500">Academic Year</p>
              <p className="text-lg font-black text-slate-900">2026 Session</p>
            </div>
          </div>
        </div>

        {/* ================= Navigation Tabs ================= */}
        <div className="flex items-center gap-2 border-b border-slate-200/80 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab("structure")}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "structure"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Class & Section Enrollment</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("curriculum")}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "curriculum"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Subject Curriculum</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("schedule")}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "schedule"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Clock className="h-4 w-4" />
            <span>Class Schedule</span>
          </button>
        </div>

        {/* ================= TAB 1: Class & Section Enrollment ================= */}
        {activeTab === "structure" && (
          <div className="space-y-4 pt-1 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Live Class & Section Capacity Matrix
              </h4>
              <span className="text-xs text-slate-400 font-medium">
                Live Data from Database
              </span>
            </div>

            {/* Class Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {classBreakdown.map((cls) => (
                <div
                  key={cls.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all space-y-3.5"
                >
                  {/* Class Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm">
                        {cls.name.replace(/\D/g, '') || cls.name.charAt(0)}
                      </div>
                      <div>
                        <h5 className="text-sm sm:text-base font-extrabold text-slate-900">
                          {cls.name.startsWith("Class") ? cls.name : `Class ${cls.name}`}
                        </h5>
                        <p className="text-[11px] text-slate-400 font-medium">
                          Session: 2026 • General Curriculum
                        </p>
                      </div>
                    </div>

                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-extrabold text-xs px-2.5 py-0.5">
                      {cls.totalStudents} {cls.totalStudents === 1 ? "Student" : "Students"}
                    </Badge>
                  </div>

                  {/* Section-Wise Student Breakdown Pills */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Section Wise Distribution:
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      {cls.sections.map((sec: any) => (
                        <div
                          key={sec.name}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80"
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            <span className="text-xs font-bold text-slate-800">
                              Section {sec.name}
                            </span>
                          </div>
                          <span className="text-xs font-black text-blue-600">
                            {sec.count} {sec.count === 1 ? "Student" : "Students"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: Subject Curriculum ================= */}
        {activeTab === "curriculum" && (
          <div className="space-y-4 pt-1 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-100">
              <h4 className="text-sm font-bold text-slate-900">
                NCTB Standard Curriculum (Grade 6 - 10)
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Our curriculum fosters modern analytical thinking, languages, science, mathematics, and moral values.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Science Group */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                    SC
                  </div>
                  <h5 className="text-sm font-bold text-slate-900">Science Group</h5>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Physics (পদার্থবিজ্ঞান)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Chemistry (রসায়ন)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Biology (জীববিজ্ঞান)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Higher Math (উচ্চতর গণিত)</span>
                  </li>
                </ul>
              </div>

              {/* Humanities Group */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs">
                    HU
                  </div>
                  <h5 className="text-sm font-bold text-slate-900">Humanities (Arts)</h5>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>History & World Civilization</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Geography & Environment</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Civics & Citizenship</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Economics (অর্থনীতি)</span>
                  </li>
                </ul>
              </div>

              {/* Business Studies Group */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    BS
                  </div>
                  <h5 className="text-sm font-bold text-slate-900">Business Studies</h5>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Accounting (হিসাববিজ্ঞান)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Finance & Banking</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Business Entrepreneurship</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>General Science</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: Daily Schedule ================= */}
        {activeTab === "schedule" && (
          <div className="space-y-4 pt-1 animate-in fade-in duration-200">
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                    <th className="py-3 px-4">Period / Activity</th>
                    <th className="py-3 px-4">Start Time</th>
                    <th className="py-3 px-4">End Time</th>
                    <th className="py-3 px-4">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="bg-blue-50/40 font-semibold">
                    <td className="py-2.5 px-4 text-blue-700">Morning Assembly & National Anthem</td>
                    <td className="py-2.5 px-4">08:45 AM</td>
                    <td className="py-2.5 px-4">09:00 AM</td>
                    <td className="py-2.5 px-4">15 Mins</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-slate-900">1st Period</td>
                    <td className="py-2.5 px-4">09:00 AM</td>
                    <td className="py-2.5 px-4">09:45 AM</td>
                    <td className="py-2.5 px-4">45 Mins</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-slate-900">2nd Period</td>
                    <td className="py-2.5 px-4">09:45 AM</td>
                    <td className="py-2.5 px-4">10:30 AM</td>
                    <td className="py-2.5 px-4">45 Mins</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-slate-900">3rd Period</td>
                    <td className="py-2.5 px-4">10:30 AM</td>
                    <td className="py-2.5 px-4">11:15 AM</td>
                    <td className="py-2.5 px-4">45 Mins</td>
                  </tr>
                  <tr className="bg-amber-50/50 font-semibold">
                    <td className="py-2.5 px-4 text-amber-800">Tiffin & Refreshment Break</td>
                    <td className="py-2.5 px-4">11:15 AM</td>
                    <td className="py-2.5 px-4">11:45 AM</td>
                    <td className="py-2.5 px-4">30 Mins</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-slate-900">4th Period</td>
                    <td className="py-2.5 px-4">11:45 AM</td>
                    <td className="py-2.5 px-4">12:30 PM</td>
                    <td className="py-2.5 px-4">45 Mins</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-slate-900">5th Period</td>
                    <td className="py-2.5 px-4">12:30 PM</td>
                    <td className="py-2.5 px-4">01:15 PM</td>
                    <td className="py-2.5 px-4">45 Mins</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= Modal Footer ================= */}
        <div className="flex items-center justify-end pt-3 border-t border-slate-100">
          <Button
            type="button"
            onClick={onClose}
            className="h-10 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-sm"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
