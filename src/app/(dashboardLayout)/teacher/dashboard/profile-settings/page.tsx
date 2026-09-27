"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Building2,
  Calendar,
  Shield,
  CheckCircle2,
  Lock,
  Info,
  GraduationCap,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { getMyAssignments } from "@/src/services/teacherService";
import { Teacher } from "@/src/types/teacher";

export default function TeacherProfileSettingsPage() {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTeacherProfile() {
      try {
        setIsLoading(true);
        let userEmail = "";
        try {
          const stored = localStorage.getItem("userInfo");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed?.email) userEmail = parsed.email;
          }
        } catch {}

        const data = await getMyAssignments(userEmail);
        if (data?.teacher) {
          setTeacher(data.teacher);
        } else {
          // Fallback demo profile if not logged in with specific database teacher
          setTeacher({
            id: "tch_demo_101",
            teacherId: "TCH-2026-042",
            name: "Dr. Rafiqul Islam",
            designation: "Senior Teacher & Subject Lead",
            department: "Science",
            email: userEmail || "teacher@schoolcentral.edu",
            phone: "+880 1812-987654",
            joiningDate: "January 15, 2024",
          } as Teacher);
        }
      } catch (err) {
        console.error("Failed to load teacher profile:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadTeacherProfile();
  }, []);

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6 container mx-auto pb-12 max-w-5xl">
      {/* 1. Top Faculty Profile Header Banner */}
      <div className="relative bg-gradient-to-r from-slate-900 via-[#0f2c4a] to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden border border-slate-800">
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar / Photo (Read-Only) */}
          <div className="relative shrink-0">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-3xl bg-white/10 border-2 border-white/20 backdrop-blur-md flex items-center justify-center text-white text-3xl font-extrabold overflow-hidden shadow-2xl">
              {teacher?.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={teacher.photo}
                  alt={teacher.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{teacher?.name?.charAt(0) || "T"}</span>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-emerald-600 text-white shadow-md border-2 border-slate-900">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Profile Name & Metadata */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {teacher?.name || "Faculty Member"}
              </h1>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-blue-400" />
                  Faculty / Teacher
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Active Staff
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-blue-100/80">
              {teacher?.designation || "Faculty Member"} • {teacher?.department || "Academic"} Department
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-mono">
                <Shield className="h-3.5 w-3.5 text-blue-400" />
                Teacher ID: {teacher?.teacherId || "TCH-001"}
              </span>
              <span className="flex items-center gap-1.5 font-mono">
                <Mail className="h-3.5 w-3.5 text-blue-400" />
                {teacher?.email || "N/A"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-blue-400" />
                Joined {formatDate(teacher?.joiningDate)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Admin Managed Notice (Read-only explanation) */}
      <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 flex items-start gap-3 text-blue-900 text-xs leading-relaxed">
        <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-blue-950">Administrative Protected Profile</p>
          <p className="text-blue-800/80 mt-0.5">
            Your faculty credentials, departmental designations, and employment details are managed exclusively by the School Administration. If any corrections or updates are required, please contact the Principal’s office.
          </p>
        </div>
      </div>

      {/* 3. Read-Only Personal Information Grid */}
      <Card className="bg-white border-slate-200/90 rounded-3xl shadow-xs overflow-hidden">
        <CardHeader className="p-6 pb-4 border-b border-slate-100 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              <span>Faculty Information</span>
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 mt-0.5">
              Official faculty profile records registered in the institution database.
            </CardDescription>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl flex items-center gap-1 border border-slate-200">
            <Lock className="h-3 w-3 text-slate-400" />
            Read Only
          </span>
        </CardHeader>

        <CardContent className="p-6">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2 text-slate-400">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <span className="text-xs">Loading faculty profile...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {/* 1. Full Name */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-blue-600" />
                  Full Name
                </span>
                <p className="text-sm font-bold text-slate-900">{teacher?.name || "N/A"}</p>
              </div>

              {/* 2. Teacher ID */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-blue-600" />
                  Teacher ID
                </span>
                <p className="text-sm font-bold font-mono text-blue-900">{teacher?.teacherId || "N/A"}</p>
              </div>

              {/* 3. Designation */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-blue-600" />
                  Designation
                </span>
                <p className="text-sm font-bold text-slate-900">{teacher?.designation || "Senior Teacher"}</p>
              </div>

              {/* 4. Department */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-blue-600" />
                  Department
                </span>
                <p className="text-sm font-bold text-slate-900">{teacher?.department || "Academic"}</p>
              </div>

              {/* 5. Email */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-blue-600" />
                  Official Email
                </span>
                <p className="text-sm font-semibold font-mono text-slate-900 truncate">
                  {teacher?.email || "teacher@schoolcentral.edu"}
                </p>
              </div>

              {/* 6. Phone */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-blue-600" />
                  Phone Number
                </span>
                <p className="text-sm font-semibold font-mono text-slate-900">
                  {teacher?.phone || "N/A"}
                </p>
              </div>

              {/* 7. Joining Date */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1 sm:col-span-2 lg:col-span-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-blue-600" />
                  Joining / Employment Date
                </span>
                <p className="text-sm font-semibold text-slate-800">
                  {formatDate(teacher?.joiningDate)}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
