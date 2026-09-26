import { api } from "@/src/lib/api";
import {
  Teacher,
  TeacherAssignment,
  CreateTeacherDto,
  UpdateTeacherDto,
  AssignTeacherDto,
} from "@/src/types/teacher";

// Client-side in-memory cache
const teacherCache = new Map<string, { data: any; expiresAt: number }>();

const getCached = (key: string) => {
  const entry = teacherCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    teacherCache.delete(key);
    return null;
  }
  return entry.data;
};

const setCached = (key: string, data: any, ttlSec = 120) => {
  teacherCache.set(key, { data, expiresAt: Date.now() + ttlSec * 1000 });
};

// 1. Fetch all teachers (with optional search and department filter)
export const getTeachers = async (
  search?: string,
  department?: string
): Promise<Teacher[]> => {
  const cacheKey = `teachers:${search || ''}:${department || ''}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const params: Record<string, string> = {};
  if (search) params.search = search;
  if (department && department !== "ALL") params.department = department;
  const response = await api.get("/teachers", { params });
  setCached(cacheKey, response.data, 60);
  return response.data;
};

// 2. Fetch a single teacher by ID or teacherId
export const getTeacherById = async (id: string): Promise<Teacher> => {
  const cacheKey = `teacher:${id}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const response = await api.get(`/teachers/${id}`);
  setCached(cacheKey, response.data, 120);
  return response.data;
};

// 3. Create a new teacher
export const createTeacher = async (
  teacherData: CreateTeacherDto
): Promise<Teacher> => {
  teacherCache.clear();
  const response = await api.post("/teachers", teacherData);
  return response.data;
};

// 4. Update teacher details
export const updateTeacher = async (
  id: string,
  teacherData: UpdateTeacherDto
): Promise<Teacher> => {
  teacherCache.clear();
  const response = await api.patch(`/teachers/${id}`, teacherData);
  return response.data;
};

// 5. Delete a teacher
export const deleteTeacher = async (id: string): Promise<any> => {
  teacherCache.clear();
  const response = await api.delete(`/teachers/${id}`);
  return response.data;
};

// 6. Assign teacher to a class, section, and subject
export const assignTeacher = async (
  teacherId: string,
  data: AssignTeacherDto
): Promise<any> => {
  teacherCache.clear();
  const response = await api.post(`/teachers/${teacherId}/assignments`, data);
  return response.data;
};

// 7. Remove teacher assignment
export const removeTeacherAssignment = async (
  assignmentId: string
): Promise<any> => {
  teacherCache.clear();
  const response = await api.delete(`/teachers/assignments/${assignmentId}`);
  return response.data;
};

// 8. Get students enrolled in a teacher assignment
export const getTeacherAssignmentStudents = async (
  assignmentId: string
): Promise<any> => {
  const cacheKey = `assign_students:${assignmentId}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const response = await api.get(`/teachers/assignments/${assignmentId}/students`);
  setCached(cacheKey, response.data, 120);
  return response.data;
};

// 9. Get logged-in teacher assignments (with class, section & subject)
export const getMyAssignments = async (
  email?: string
): Promise<{ teacher?: Teacher; assignments: TeacherAssignment[] }> => {
  const cacheKey = `my_assignments:${email?.toLowerCase() || 'default'}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const params: Record<string, string> = {};
    if (email) params.email = email;
    const response = await api.get("/teachers/my-assignments", { params });
    const formatted = Array.isArray(response.data)
      ? { assignments: response.data }
      : response.data || { assignments: [] };

    setCached(cacheKey, formatted, 180);
    return formatted;
  } catch (err: any) {
    console.warn("Could not fetch my-assignments:", err?.message || err);
    return { assignments: [] };
  }
};
