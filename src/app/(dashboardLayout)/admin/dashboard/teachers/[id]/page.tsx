"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  getTeacherById,
  updateTeacher,
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
import { EditTeacherModal } from "@/src/components/dashboard/admin/teachers/EditTeacherModal";
import { AssignSubjectModal } from "@/src/components/dashboard/admin/teachers/AssignSubjectModal";

export default function TeacherDetailsPage() {
  const params = useParams();
  const teacherIdParam = params?.id as string;

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

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
    await updateTeacher(id, data);
    await fetchTeacherData();
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
    </div>
  );
}
