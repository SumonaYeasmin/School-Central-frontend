"use client";

import { useState, useEffect, useCallback } from "react";
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
  getSubjectThemeColor,
} from "@/src/components/dashboard/admin/routines/mockRoutines";
import { getClasses, getSubjects, getTeachers } from "@/src/services/academicService";
import { getRoutines } from "@/src/services/routineService";
import { CheckCircle2, AlertCircle } from "lucide-react";

// Helper to sort routines numerically by grade (Class 6 to Class 10) and then by section
const sortRoutinesList = (list: SectionRoutine[]): SectionRoutine[] => {
  return [...list].sort((a, b) => {
    const gradeA = parseInt(a.grade.replace(/\D/g, ""), 10) || 0;
    const gradeB = parseInt(b.grade.replace(/\D/g, ""), 10) || 0;
    if (gradeA !== gradeB) return gradeA - gradeB;
    return a.section.localeCompare(b.section);
  });
};

export default function ClassRoutinesPage() {
  const initialSortedRoutines = sortRoutinesList(MOCK_ROUTINES);
  const defaultClass6Section =
    initialSortedRoutines.find((r) => r.grade.toLowerCase().includes("6"))?.id ||
    initialSortedRoutines[0]?.id ||
    "c6-a";

  // 1. Live Routine State (Initialized identically on server and client to avoid SSR hydration error)
  const [routines, setRoutines] = useState<SectionRoutine[]>(initialSortedRoutines);

  // 2. Selected Section Tab (Default Class 6 on SSR, updated on client mount from localStorage)
  const [selectedSectionId, setSelectedSectionId] = useState<string>(defaultClass6Section);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Sync with localStorage on client mount (avoids hydration mismatch)
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      try {
        const savedTab = localStorage.getItem("admin_selected_routine_id");
        if (savedTab && initialSortedRoutines.some((r) => r.id === savedTab)) {
          setSelectedSectionId(savedTab);
        }

        const savedCustom = localStorage.getItem("admin_custom_routines");
        if (savedCustom) {
          const parsed = JSON.parse(savedCustom);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRoutines(sortRoutinesList(parsed));
          }
        }
      } catch (err) {
        console.warn("Could not read custom routines from cache:", err);
      }
    }
  }, []);

  // Handler for changing active Class/Section tab with persistence
  const handleSelectSection = (id: string) => {
    setSelectedSectionId(id);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("admin_selected_routine_id", id);
      } catch {}
    }
  };

  // 3. Database Academic State (For dynamic modal dropdowns)
  const [dbClasses, setDbClasses] = useState<any[]>([]);
  const [dbTeachers, setDbTeachers] = useState<any[]>([]);
  const [dbSubjects, setDbSubjects] = useState<any[]>([]);
  const [isLoadingAcademicData, setIsLoadingAcademicData] = useState<boolean>(true);

  // 4. Notification Toast
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
    description?: string;
  } | null>(null);

  // 5. Modals State
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    day: string;
    timeSlot: string;
    periodKey: "p1" | "p2" | "p3" | "p4" | "p5";
    periodData?: PeriodSlot;
  }>({
    isOpen: false,
    day: "Sunday",
    timeSlot: "10:00–11:00",
    periodKey: "p1",
  });

  const [isFullEditModalOpen, setIsFullEditModalOpen] = useState<boolean>(false);
  const [addModalState, setAddModalState] = useState<{
    isOpen: boolean;
    day?: string;
    periodKey?: "p1" | "p2" | "p3" | "p4" | "p5";
  }>({
    isOpen: false,
  });

  const handleOpenAddModal = (
    day?: string,
    periodKey?: "p1" | "p2" | "p3" | "p4" | "p5"
  ) => {
    setAddModalState({
      isOpen: true,
      day,
      periodKey,
    });
  };

  // 6. Fetch DB Academic Filters (Classes, Sections, Teachers, Subjects) for Add/Edit Modals
  const initializeRoutinesPage = useCallback(async () => {
    setIsLoadingAcademicData(true);
    try {
      const [classesRes, teachersRes, subjectsRes] = await Promise.allSettled([
        getClasses(),
        getTeachers(),
        getSubjects(),
      ]);

      if (classesRes.status === "fulfilled" && Array.isArray(classesRes.value)) {
        setDbClasses(classesRes.value);
      }

      if (teachersRes.status === "fulfilled" && Array.isArray(teachersRes.value)) {
        setDbTeachers(teachersRes.value);
      }

      if (subjectsRes.status === "fulfilled" && Array.isArray(subjectsRes.value)) {
        setDbSubjects(subjectsRes.value);
      }
    } catch (err: any) {
      console.warn("Could not fetch academic metadata:", err);
    } finally {
      setIsLoadingAcademicData(false);
    }
  }, []);

  useEffect(() => {
    initializeRoutinesPage();
  }, [initializeRoutinesPage]);

  // Active selected section routine
  const selectedRoutine =
    routines.find((r) => r.id === selectedSectionId) || routines[0];

  // 7. Single Period Edit Handler
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

  const handleSavePeriod = (
    day: string,
    periodKey: "p1" | "p2" | "p3" | "p4" | "p5",
    updatedData: PeriodSlot
  ) => {
    setRoutines((prev) => {
      const updated = prev.map((routine) => {
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
      });

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("admin_custom_routines", JSON.stringify(updated));
        } catch {}
      }

      return updated;
    });

    setNotification({
      type: "success",
      message: "Period Updated Successfully",
      description: `${updatedData.subject} (${updatedData.teacher}) saved for ${day}.`,
    });

    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // 8. Full Routine Save Handler
  const handleSaveFullRoutine = (updatedRoutine: SectionRoutine) => {
    setRoutines((prev) => {
      const updated = prev.map((routine) =>
        routine.id === updatedRoutine.id ? updatedRoutine : routine
      );

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("admin_custom_routines", JSON.stringify(updated));
        } catch {}
      }

      return updated;
    });

    setNotification({
      type: "success",
      message: "Routine Updated Successfully",
      description: `Weekly schedule for ${updatedRoutine.fullName} has been updated.`,
    });

    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // 9. Add Routine Slot Handler
  const handleAddPeriod = (
    sectionId: string,
    day: string,
    periodKey: "p1" | "p2" | "p3" | "p4" | "p5",
    data: PeriodSlot
  ) => {
    setRoutines((prev) => {
      const updated = prev.map((routine) => {
        if (routine.id !== sectionId && !sectionId.includes(routine.id)) return routine;
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
      });

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("admin_custom_routines", JSON.stringify(updated));
        } catch {}
      }

      return updated;
    });

    // If matching section was found, switch to it and persist
    const matched = routines.find((r) => r.id === sectionId);
    if (matched) {
      handleSelectSection(sectionId);
    }

    setNotification({
      type: "success",
      message: "Class Routine Scheduled Successfully",
      description: `${data.subject} (${data.teacher}) added for ${day} ${data.room}.`,
    });

    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  return (
    <div className="space-y-6 container mx-auto pb-12">
      {/* 1. Header with Breadcrumb and Title */}
      <RoutinesHeader />

      {/* Notification Toast */}
      {notification && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between shadow-sm animate-in fade-in duration-300 ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-rose-50 border-rose-200 text-rose-900"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl ${
                notification.type === "success"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {notification.type === "success" ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
            </div>
            <div>
              <p className="text-sm font-bold">{notification.message}</p>
              {notification.description && (
                <p
                  className={`text-xs ${
                    notification.type === "success"
                      ? "text-emerald-700"
                      : "text-rose-700"
                  }`}
                >
                  {notification.description}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-xs font-semibold px-2.5 py-1 rounded-lg cursor-pointer bg-black/5 hover:bg-black/10"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 2. Interactive Class & Section Card Selector (2 Sections Per Class) */}
      <SectionSelector
        routines={routines}
        selectedId={selectedSectionId}
        onSelectSection={handleSelectSection}
      />

      {/* 3. Full Weekly Timetable Schedule Matrix (Horizontal Periods & Vertical Weekdays) */}
      <WeeklyTimetable
        routine={selectedRoutine}
        onEditPeriod={handleOpenEdit}
        onOpenFullEdit={() => setIsFullEditModalOpen(true)}
        onOpenAddRoutine={() => handleOpenAddModal()}
        onAddPeriodSlot={(day, pKey) => handleOpenAddModal(day, pKey)}
      />

      {/* 4. Single Period Edit Modal */}
      <EditPeriodModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal((prev) => ({ ...prev, isOpen: false }))}
        day={editModal.day}
        timeSlot={editModal.timeSlot}
        periodKey={editModal.periodKey}
        sectionName={selectedRoutine?.fullName || "Class Routine"}
        periodData={editModal.periodData}
        onSave={handleSavePeriod}
      />

      {/* 5. Full Routine Update Modal */}
      <EditRoutineModal
        isOpen={isFullEditModalOpen}
        onClose={() => setIsFullEditModalOpen(false)}
        routine={selectedRoutine}
        onSaveRoutine={handleSaveFullRoutine}
      />

      {/* 6. Dynamic Add Routine Modal (Integrated with Database Classes, Sections, Subjects, Teachers) */}
      <AddRoutineModal
        isOpen={addModalState.isOpen}
        onClose={() => setAddModalState((prev) => ({ ...prev, isOpen: false }))}
        targetRoutine={selectedRoutine}
        dbClasses={dbClasses}
        dbTeachers={dbTeachers}
        dbSubjects={dbSubjects}
        initialDay={addModalState.day}
        initialPeriodKey={addModalState.periodKey}
        onAdd={handleAddPeriod}
      />
    </div>
  );
}
