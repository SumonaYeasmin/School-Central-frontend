"use client";

import { useEffect, useState, useCallback } from "react";
import { TeachersHeader } from "@/src/components/dashboard/admin/teachers/TeachersHeader";
import { TeachersStats } from "@/src/components/dashboard/admin/teachers/TeachersStats";
import { TeachersTable } from "@/src/components/dashboard/admin/teachers/TeachersTable";
import { AddTeacherModal } from "@/src/components/dashboard/admin/teachers/AddTeacherModal";
import { EditTeacherModal } from "@/src/components/dashboard/admin/teachers/EditTeacherModal";
import { AssignSubjectModal } from "@/src/components/dashboard/admin/teachers/AssignSubjectModal";
import { DeleteTeacherDialog } from "@/src/components/dashboard/admin/teachers/DeleteTeacherDialog";
import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  assignTeacher,
  removeTeacherAssignment,
} from "@/src/services/teacherService";
import { getClasses, getSubjects } from "@/src/services/academicService";
import {
  Teacher,
  CreateTeacherDto,
  UpdateTeacherDto,
  AssignTeacherDto,
} from "@/src/types/teacher";
import { Loader2 } from "lucide-react";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [assigningTeacher, setAssigningTeacher] = useState<Teacher | null>(null);
  const [deletingTeacher, setDeletingTeacher] = useState<Teacher | null>(null);

  // Fetch all teachers, classes, and subjects from database
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [teachersData, classesData, subjectsData] = await Promise.all([
        getTeachers(),
        getClasses().catch(() => []),
        getSubjects().catch(() => []),
      ]);
      setTeachers(teachersData || []);
      setClasses(classesData || []);
      setSubjects(subjectsData || []);
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handler: Add Teacher
  const handleAddTeacher = async (teacherData: CreateTeacherDto) => {
    await createTeacher(teacherData);
    await fetchData();
  };

  // Handler: Update Teacher
  const handleUpdateTeacher = async (id: string, teacherData: UpdateTeacherDto) => {
    await updateTeacher(id, teacherData);
    await fetchData();
  };

  // Handler: Assign Subject
  const handleAssignSubject = async (tId: string, data: AssignTeacherDto) => {
    await assignTeacher(tId, data);
    const updatedTeachers = await getTeachers();
    setTeachers(updatedTeachers || []);
    const updatedTeacher = updatedTeachers.find((t) => t.id === tId) || null;
    setAssigningTeacher(updatedTeacher);
  };

  // Handler: Remove Assignment
  const handleRemoveAssignment = async (assignmentId: string) => {
    await removeTeacherAssignment(assignmentId);
    const updatedTeachers = await getTeachers();
    setTeachers(updatedTeachers || []);
    if (assigningTeacher) {
      const updatedTeacher =
        updatedTeachers.find((t) => t.id === assigningTeacher.id) || null;
      setAssigningTeacher(updatedTeacher);
    }
  };

  // Handler: Delete Teacher
  const handleDeleteTeacher = async (id: string) => {
    await deleteTeacher(id);
    await fetchData();
  };

  // Dynamic KPI Stats
  const totalStaff = teachers.length;
  const assignedTeachers = teachers.filter(
    (t) => t.assignments && t.assignments.length > 0
  ).length;
  const subjectsCovered = new Set(
    teachers.flatMap((t) => t.assignments?.map((a) => a.subjectId) || [])
  ).size;
  const activeDepartments = new Set(
    teachers.map((t) => t.department).filter(Boolean)
  ).size;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header with Breadcrumb and Add Teacher Button */}
      <TeachersHeader onAddTeacher={() => setIsAddModalOpen(true)} />

      {/* 2. Top Summary KPI Stats */}
      <TeachersStats
        totalStaff={totalStaff}
        assignedTeachers={assignedTeachers}
        subjectsCovered={subjectsCovered}
        activeDepartments={activeDepartments}
      />

      {/* 3. People Directory Table */}
      {isLoading ? (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-16 flex flex-col items-center justify-center gap-3 text-slate-500 shadow-xs">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm font-medium">Loading faculty members from database...</p>
        </div>
      ) : (
        <TeachersTable
          teachers={teachers}
          onEdit={(teacher) => setEditingTeacher(teacher)}
          onAssignSubject={(teacher) => setAssigningTeacher(teacher)}
          onDelete={(teacher) => setDeletingTeacher(teacher)}
          onAddTeacher={() => setIsAddModalOpen(true)}
        />
      )}

      {/* 4. Add Teacher Modal */}
      <AddTeacherModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTeacher}
      />

      {/* 5. Edit Teacher Modal */}
      <EditTeacherModal
        isOpen={Boolean(editingTeacher)}
        teacher={editingTeacher}
        onClose={() => setEditingTeacher(null)}
        onUpdate={handleUpdateTeacher}
      />

      {/* 6. Assign Subject Modal */}
      <AssignSubjectModal
        isOpen={Boolean(assigningTeacher)}
        teacher={assigningTeacher}
        classes={classes}
        subjects={subjects}
        onClose={() => setAssigningTeacher(null)}
        onAssign={handleAssignSubject}
        onRemove={handleRemoveAssignment}
      />

      {/* 7. Delete Teacher Dialog */}
      <DeleteTeacherDialog
        isOpen={Boolean(deletingTeacher)}
        teacher={deletingTeacher}
        onClose={() => setDeletingTeacher(null)}
        onDelete={handleDeleteTeacher}
      />
    </div>
  );
}
