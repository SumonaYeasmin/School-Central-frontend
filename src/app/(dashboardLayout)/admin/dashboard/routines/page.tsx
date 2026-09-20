"use client";

import { useState } from "react";
import { RoutinesHeader } from "@/src/components/dashboard/admin/routines/RoutinesHeader";
import { SectionSelector } from "@/src/components/dashboard/admin/routines/SectionSelector";
import { WeeklyTimetable } from "@/src/components/dashboard/admin/routines/WeeklyTimetable";
import { EditPeriodModal } from "@/src/components/dashboard/admin/routines/EditPeriodModal";
import { EditRoutineModal } from "@/src/components/dashboard/admin/routines/EditRoutineModal";
import { AddRoutineModal } from "@/src/components/dashboard/admin/routines/AddRoutineModal";
import {
  MOCK_ROUTINES,
  SectionRoutine,
  PeriodSlot,
} from "@/src/components/dashboard/admin/routines/mockRoutines";

export default function ClassRoutinesPage() {
  // 1. Routine State (allows real-time live editing)
  const [routines, setRoutines] = useState<SectionRoutine[]>(MOCK_ROUTINES);
  const [selectedSectionId, setSelectedSectionId] = useState<string>(
    routines[0]?.id || "g6-c"
  );

  // 2. Single Period Edit Modal State
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    day: string;
    timeSlot: string;
    periodKey: "p1" | "p2" | "p3" | "p4" | "p5";
    periodData?: PeriodSlot;
  }>({
    isOpen: false,
    day: "Monday",
    timeSlot: "10:00–11:00",
    periodKey: "p1",
  });

  // 3. Full Routine Edit Modal State
  const [isFullEditModalOpen, setIsFullEditModalOpen] = useState(false);

  // 4. Add Routine Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Currently selected section routine
  const selectedRoutine =
    routines.find((r) => r.id === selectedSectionId) || routines[0];

  // Handler for opening single period edit modal
  const handleOpenEdit = (
    day: string,
    timeSlot: string,
    periodKey: "p1" | "p2" | "p3" | "p4" | "p5",
    periodData: PeriodSlot
  ) => {
    setEditModal({
      isOpen: true,
      day,
      timeSlot,
      periodKey,
      periodData,
    });
  };

  // Handler for saving edited single period
  const handleSavePeriod = (
    day: string,
    periodKey: "p1" | "p2" | "p3" | "p4" | "p5",
    updatedData: PeriodSlot
  ) => {
    setRoutines((prev) =>
      prev.map((routine) => {
        if (routine.id !== selectedSectionId) return routine;
        return {
          ...routine,
          schedule: {
            ...routine.schedule,
            [day]: {
              ...routine.schedule[day as keyof typeof routine.schedule],
              [periodKey]: updatedData,
            },
          },
        };
      })
    );
  };

  // Handler for saving full routine batch update
  const handleSaveFullRoutine = (updatedRoutine: SectionRoutine) => {
    setRoutines((prev) =>
      prev.map((routine) =>
        routine.id === updatedRoutine.id ? updatedRoutine : routine
      )
    );
  };

  // Handler for adding a new period assignment
  const handleAddPeriod = (
    sectionId: string,
    day: string,
    periodKey: "p1" | "p2" | "p3" | "p4" | "p5",
    data: PeriodSlot
  ) => {
    setRoutines((prev) =>
      prev.map((routine) => {
        if (routine.id !== sectionId) return routine;
        return {
          ...routine,
          schedule: {
            ...routine.schedule,
            [day]: {
              ...routine.schedule[day as keyof typeof routine.schedule],
              [periodKey]: data,
            },
          },
        };
      })
    );
    setSelectedSectionId(sectionId);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header with Breadcrumb and Add Routine Button */}
      <RoutinesHeader onAddRoutine={() => setIsAddModalOpen(true)} />

      {/* 2. Interactive Class & Section Card Selector */}
      <SectionSelector
        routines={routines}
        selectedId={selectedSectionId}
        onSelectSection={setSelectedSectionId}
      />

      {/* 3. Full Weekly Timetable Schedule Matrix with Prominent Update Button */}
      <WeeklyTimetable
        routine={selectedRoutine}
        onEditPeriod={handleOpenEdit}
        onOpenFullEdit={() => setIsFullEditModalOpen(true)}
      />

      {/* 4. Single Period Edit Modal (Clicking any period slot triggers this) */}
      <EditPeriodModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal((prev) => ({ ...prev, isOpen: false }))}
        day={editModal.day}
        timeSlot={editModal.timeSlot}
        periodKey={editModal.periodKey}
        sectionName={selectedRoutine.fullName}
        periodData={editModal.periodData}
        onSave={handleSavePeriod}
      />

      {/* 5. Full Routine Update Modal (Clicking 'Update Routine' button triggers this) */}
      <EditRoutineModal
        isOpen={isFullEditModalOpen}
        onClose={() => setIsFullEditModalOpen(false)}
        routine={selectedRoutine}
        onSaveRoutine={handleSaveFullRoutine}
      />

      {/* 6. Add Routine Modal */}
      <AddRoutineModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        routines={routines}
        onAdd={handleAddPeriod}
      />
    </div>
  );
}
