import { api } from "@/src/lib/api";

export interface RoutineItem {
  id: string;
  day: string; // "SATURDAY" | "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY"
  startTime: string; // "10:00"
  endTime: string; // "11:00"
  roomNumber?: string;
  classId: string;
  sectionId: string;
  subjectId: string;
  teacherId: string;
  class?: {
    id: string;
    name: string;
  };
  section?: {
    id: string;
    name: string;
  };
  subject?: {
    id: string;
    name: string;
    code?: string;
  };
  teacher?: {
    id: string;
    teacherId: string;
    name: string;
    email?: string;
    designation?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface GetRoutinesFilter {
  day?: string;
  classId?: string;
  sectionId?: string;
  teacherId?: string;
  subjectId?: string;
}

export interface CreateRoutinePayload {
  day: string;
  startTime: string;
  endTime: string;
  roomNumber?: string;
  classId: string;
  sectionId: string;
  subjectId: string;
  teacherId: string;
}

export interface UpdateRoutinePayload {
  day?: string;
  startTime?: string;
  endTime?: string;
  roomNumber?: string;
  classId?: string;
  sectionId?: string;
  subjectId?: string;
  teacherId?: string;
}

// 1. Get all routines with optional filters
export const getRoutines = async (filters?: GetRoutinesFilter): Promise<any> => {
  const response = await api.get("/routines", { params: filters });
  return response.data;
};

// 2. Get visual weekly timetable for a specific class & section
export const getWeeklyTimetable = async (
  classId: string,
  sectionId: string,
  day?: string
): Promise<any> => {
  const params: Record<string, string> = { classId, sectionId };
  if (day) params.day = day;
  const response = await api.get("/routines/timetable", { params });
  return response.data;
};

// 3. Create a new routine slot
export const createRoutine = async (data: CreateRoutinePayload): Promise<RoutineItem> => {
  const response = await api.post("/routines", data);
  return response.data;
};

// 4. Update an existing routine slot
export const updateRoutine = async (
  id: string,
  data: UpdateRoutinePayload
): Promise<RoutineItem> => {
  const response = await api.patch(`/routines/${id}`, data);
  return response.data;
};

// 5. Delete a routine slot
export const deleteRoutine = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/routines/${id}`);
  return response.data;
};
