"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  assignTeacher,
  removeTeacherAssignment,
} from "@/src/services/teacherService";
import { getClasses, getSubjects } from "@/src/services/academicService";
import {
  Teacher,
  UpdateTeacherDto,
  AssignTeacherDto,
} from "@/src/types/teacher";
import {
  TeacherDetailsBreadcrumb,
  TeacherProfileCard,
  TeacherAssignmentsCard,
  TeacherContactInfoCard,
  TeacherDetailSkeleton,
  TeacherNotFound,
} from "@/src/components/dashboard/admin/teachers/details";
import { EditTeacherModal } from "@/src/components/dashboard/admin/teachers/details/EditTeacherModal";
import { AssignSubjectModal } from "@/src/components/dashboard/admin/teachers/AssignSubjectModal";
import { DeleteTeacherDialog } from "@/src/components/dashboard/admin/teachers/DeleteTeacherDialog";
import { Loader2 } from "lucide-react";

export default function TeacherDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const teacherIdParam = params?.id as string;

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchTeacherData = useCallback(async () => {
    if (!teacherIdParam) return;
    try {
      setIsLoading(true);
      setError(null);

      const [teacherData, classesData, subjectsData] = await Promise.all([
        getTeacherById(teacherIdParam),
        getClasses().catch(() => []),
        getSubjects().catch(() => []),
      ]);

      setTeacher(teacherData);
      setClasses(classesData || []);
      setSubjects(subjectsData || []);
    } catch (err: any) {
      console.error("Failed to load teacher details:", err);
      setError(err?.response?.data?.message || "Teacher profile not found.");
    } finally {
      setIsLoading(false);
    }
  }, [teacherIdParam]);

  useEffect(() => {
    fetchTeacherData();
  }, [fetchTeacherData]);

  // Handle Edit Teacher
  const handleUpdateTeacher = async (id: string, data: UpdateTeacherDto) => {
    const updated = await updateTeacher(id, data);
    if (updated) {
      setTeacher(updated);
    }
    if (updated?.id && teacherIdParam !== updated.id && teacherIdParam !== updated.teacherId) {
      router.replace(`/admin/dashboard/teachers/${updated.id}`);
    } else {
      await fetchTeacherData();
    }
  };

  // Handle Assign Subject
  const handleAssignSubject = async (tId: string, data: AssignTeacherDto) => {
    await assignTeacher(tId, data);
    await fetchTeacherData();
  };

  // Handle Remove Assignment
  const handleRemoveAssignment = async (assignmentId: string) => {
    await removeTeacherAssignment(assignmentId);
    await fetchTeacherData();
  };

  // Handle Delete Teacher
  const handleDeleteTeacher = async (id: string) => {
    setIsRedirecting(true);
    try {
      await deleteTeacher(id);
      router.replace("/admin/dashboard/teachers");
    } catch (err: any) {
      setIsRedirecting(false);
      throw err;
    }
  };

  if (isRedirecting) {
    return (
      <div className="bg-white border border-slate-200/90 rounded-3xl p-16 flex flex-col items-center justify-center gap-3 text-slate-500 shadow-xs max-w-xl mx-auto my-12 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-rose-600" />
        <p className="text-sm font-semibold text-slate-800">Teacher profile removed</p>
        <p className="text-xs text-slate-500">Redirecting to faculty directory...</p>
      </div>
    );
  }

  if (isLoading) {
    return <TeacherDetailSkeleton />;
  }

  if (error || !teacher) {
    return <TeacherNotFound error={error} />;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 1. Header Navigation & Breadcrumb */}
      <TeacherDetailsBreadcrumb teacherName={teacher.name} />

      {/* 2. Top Profile Hero Card */}
      <TeacherProfileCard
        teacher={teacher}
        onEdit={() => setIsEditModalOpen(true)}
        onAssign={() => setIsAssignModalOpen(true)}
        onDelete={() => setIsDeleteModalOpen(true)}
      />

      {/* 3. Assigned Subjects & Class Allocation Grid */}
      <TeacherAssignmentsCard
        teacher={teacher}
        onAssign={() => setIsAssignModalOpen(true)}
        onRemoveAssignment={handleRemoveAssignment}
      />

      {/* 4. Contact & Employment Details Card */}
      <TeacherContactInfoCard teacher={teacher} />

      {/* Modals */}
      <EditTeacherModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        teacher={teacher}
        onUpdate={handleUpdateTeacher}
      />

      <AssignSubjectModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        teacher={teacher}
        classes={classes}
        subjects={subjects}
        onAssign={handleAssignSubject}
        onRemove={handleRemoveAssignment}
      />

      <DeleteTeacherDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        teacher={teacher}
        onDelete={handleDeleteTeacher}
      />
    </div>
  );
}
