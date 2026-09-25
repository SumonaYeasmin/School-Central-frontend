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
} from "@/src/components/dashboard/admin/routines/mockRoutines";
import { getClasses, getSubjects, getTeachers } from "@/src/services/academicService";
import { getRoutines } from "@/src/services/routineService";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function ClassRoutinesPage() {
  // 1. Live Routine State
  const [routines, setRoutines] = useState<SectionRoutine[]>(MOCK_ROUTINES);
  const [selectedSectionId, setSelectedSectionId] = useState<string>(
    routines[0]?.id || "c6-a"
  );

  // 2. Database Academic State
  const [dbClasses, setDbClasses] = useState<any[]>([]);
  const [dbTeachers, setDbTeachers] = useState<any[]>([]);
  const [dbSubjects, setDbSubjects] = useState<any[]>([]);
  const [isLoadingAcademicData, setIsLoadingAcademicData] = useState<boolean>(true);

  // 3. Notification Toast
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
    description?: string;
  } | null>(null);

  // 4. Modals State
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

  // Helper to convert DB Routine Day to TitleCase (e.g. "SUNDAY" -> "Sunday")
  const formatDayName = (dayStr: string): keyof SectionRoutine["schedule"] => {
    const capitalized = dayStr.charAt(0).toUpperCase() + dayStr.slice(1).toLowerCase();
    return (["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"].includes(capitalized)
      ? capitalized
      : "Sunday") as keyof SectionRoutine["schedule"];
  };

  // Helper to determine periodKey (p1 to p5) from startTime
  const getPeriodKeyFromTime = (startTime: string): "p1" | "p2" | "p3" | "p4" | "p5" => {
    const hour = parseInt(startTime.split(":")[0], 10);
    if (hour <= 10) return "p1";
    if (hour === 11) return "p2";
    if (hour === 12) return "p3";
    if (hour === 14) return "p4";
    return "p5";
  };

  // 5. Fetch DB Academic Filters (Classes, Sections, Teachers, Subjects & Routines)
  const initializeRoutinesPage = useCallback(async () => {
    setIsLoadingAcademicData(true);
    try {
      const [classesRes, teachersRes, subjectsRes, routinesRes] = await Promise.allSettled([
        getClasses(),
        getTeachers(),
        getSubjects(),
        getRoutines(),
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

      // If DB has routines, merge them into routines state
      if (
        routinesRes.status === "fulfilled" &&
        routinesRes.value?.routines &&
        Array.isArray(routinesRes.value.routines) &&
        routinesRes.value.routines.length > 0
      ) {
        const dbRoutineList = routinesRes.value.routines;

        setRoutines((prevRoutines) => {
          const updated = [...prevRoutines];

          dbRoutineList.forEach((dbItem: any) => {
            const dayKey = formatDayName(dbItem.day);
            const pKey = getPeriodKeyFromTime(dbItem.startTime);

            // Find matching section routine by classId / sectionId or name
            const targetRoutine = updated.find(
              (r) =>
                r.id === dbItem.sectionId ||
                r.id === dbItem.classId ||
                r.fullName?.toLowerCase().includes(dbItem.class?.name?.toLowerCase()) ||
                r.grade?.toLowerCase() === dbItem.class?.name?.toLowerCase()
            );

            if (targetRoutine && targetRoutine.schedule?.[dayKey]) {
              targetRoutine.schedule[dayKey][pKey] = {
                subject: dbItem.subject?.name || "Subject",
                teacher: dbItem.teacher?.name || "Teacher",
                room: dbItem.roomNumber || targetRoutine.room || "Room 101",
                theme: "blue",
              };
            }
          });

          return updated;
        });
      }
    } catch (err: any) {
      console.warn("Could not fetch DB routines, using live template:", err);
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

  // 6. Single Period Edit Handler
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

    setNotification({
      type: "success",
      message: "Period Updated Successfully",
      description: `${updatedData.subject} (${updatedData.teacher}) saved for ${day}.`,
    });

    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // 7. Full Routine Save Handler
  const handleSaveFullRoutine = (updatedRoutine: SectionRoutine) => {
    setRoutines((prev) =>
      prev.map((routine) =>
        routine.id === updatedRoutine.id ? updatedRoutine : routine
      )
    );

    setNotification({
      type: "success",
      message: "Routine Updated Successfully",
      description: `Weekly schedule for ${updatedRoutine.fullName} has been updated.`,
    });

    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // 8. Add Routine Slot Handler
  const handleAddPeriod = (
    sectionId: string,
    day: string,
    periodKey: "p1" | "p2" | "p3" | "p4" | "p5",
    data: PeriodSlot,
    createdDbItem?: any
  ) => {
    setRoutines((prev) =>
      prev.map((routine) => {
        // Match by sectionId or class match
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
      })
    );

    // If matching section was found, switch to it
    const matched = routines.find((r) => r.id === sectionId);
    if (matched) {
      setSelectedSectionId(sectionId);
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
        onSelectSection={setSelectedSectionId}
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
