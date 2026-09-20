"use client";

import { useEffect, useState, useCallback } from "react";
import { ParentsHeader } from "@/src/components/dashboard/admin/parents/ParentsHeader";
import { ParentsStats } from "@/src/components/dashboard/admin/parents/ParentsStats";
import { ParentsDirectory } from "@/src/components/dashboard/admin/parents/ParentsDirectory";
import { AddParentModal } from "@/src/components/dashboard/admin/parents/AddParentModal";
import { EditParentModal } from "@/src/components/dashboard/admin/parents/EditParentModal";
import { DeleteParentDialog } from "@/src/components/dashboard/admin/parents/DeleteParentDialog";
import { AssignStudentModal } from "@/src/components/dashboard/admin/parents/AssignStudentModal";
import {
  getParents,
  createParent,
  updateParent,
  deleteParent,
  assignStudentToParent,
  removeStudentFromParent,
} from "@/src/services/parentService";
import { getStudents } from "@/src/services/academicService";
import {
  Parent,
  CreateParentDto,
  UpdateParentDto,
  AssignStudentDto,
} from "@/src/types/parent";
import { Student } from "@/src/types/student";
import { Loader2 } from "lucide-react";

export default function ParentsPage() {
  const [parents, setParents] = useState<Parent[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingParent, setEditingParent] = useState<Parent | null>(null);
  const [deletingParent, setDeletingParent] = useState<Parent | null>(null);
  const [managingStudentsParent, setManagingStudentsParent] =
    useState<Parent | null>(null);

  // Fetch all parents & enrolled students from database
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [parentsData, studentsData] = await Promise.all([
        getParents(),
        getStudents().catch(() => []),
      ]);
      setParents(parentsData || []);
      setStudents(studentsData || []);
    } catch (error) {
      console.error("Failed to fetch parents from database:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handler: Add Parent
  const handleAddParent = async (
    parentData: CreateParentDto,
    studentAssignData?: AssignStudentDto
  ) => {
    const createdParent = await createParent(parentData);
    if (studentAssignData && createdParent?.id) {
      try {
        await assignStudentToParent(createdParent.id, studentAssignData);
      } catch (assignErr) {
        console.error("Failed to link initial student:", assignErr);
      }
    }
    await fetchData();
  };

  // Handler: Update Parent
  const handleUpdateParent = async (id: string, parentData: UpdateParentDto) => {
    await updateParent(id, parentData);
    await fetchData();
  };

  // Handler: Delete Parent
  const handleDeleteParent = async (id: string) => {
    await deleteParent(id);
    await fetchData();
  };

  // Handler: Assign Student
  const handleAssignStudent = async (
    parentId: string,
    data: AssignStudentDto
  ) => {
    await assignStudentToParent(parentId, data);
    const updatedParents = await getParents();
    setParents(updatedParents || []);
    const updatedCurrentParent =
      updatedParents.find((p) => p.id === parentId) || null;
    setManagingStudentsParent(updatedCurrentParent);
  };

  // Handler: Remove Student Link
  const handleRemoveStudent = async (parentId: string, studentId: string) => {
    await removeStudentFromParent(parentId, studentId);
    const updatedParents = await getParents();
    setParents(updatedParents || []);
    const updatedCurrentParent =
      updatedParents.find((p) => p.id === parentId) || null;
    setManagingStudentsParent(updatedCurrentParent);
  };

  // Dynamic Statistics
  const totalParentAccounts = parents.length;
  const totalGuardiansLinked = parents.reduce(
    (acc, p) => acc + (p.students?.length || 0),
    0
  );
  const totalWithEmail = parents.filter((p) => Boolean(p.email)).length;
  const totalUnlinked = parents.filter(
    (p) => !p.students || p.students.length === 0
  ).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header with Breadcrumb and Add Parent Button */}
      <ParentsHeader onAddParent={() => setIsAddModalOpen(true)} />

      {/* 2. Top Summary KPI Stats (Calculated dynamically from database) */}
      <ParentsStats
        parentAccounts={totalParentAccounts}
        guardiansLinked={totalGuardiansLinked}
        withEmail={totalWithEmail}
        unlinked={totalUnlinked}
      />

      {/* 3. Family Directory (Card Grid View & Table View) */}
      {isLoading ? (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-16 flex flex-col items-center justify-center gap-3 text-slate-500 shadow-xs">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm font-medium">Loading parents from database...</p>
        </div>
      ) : (
        <ParentsDirectory
          parents={parents}
          onEdit={(parent) => setEditingParent(parent)}
          onManageStudents={(parent) => setManagingStudentsParent(parent)}
          onDelete={(parent) => setDeletingParent(parent)}
          onAddParent={() => setIsAddModalOpen(true)}
        />
      )}

      {/* 4. Add Parent Modal */}
      <AddParentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        availableStudents={students}
        onAdd={handleAddParent}
      />

      {/* 5. Edit Parent Modal */}
      <EditParentModal
        isOpen={Boolean(editingParent)}
        parent={editingParent}
        onClose={() => setEditingParent(null)}
        onUpdate={handleUpdateParent}
      />

      {/* 6. Delete Parent Dialog */}
      <DeleteParentDialog
        isOpen={Boolean(deletingParent)}
        parent={deletingParent}
        onClose={() => setDeletingParent(null)}
        onDelete={handleDeleteParent}
      />

      {/* 7. Manage / Assign Students Modal */}
      <AssignStudentModal
        isOpen={Boolean(managingStudentsParent)}
        parent={managingStudentsParent}
        availableStudents={students}
        onClose={() => setManagingStudentsParent(null)}
        onAssign={handleAssignStudent}
        onRemove={handleRemoveStudent}
      />
    </div>
  );
}
