import { api } from "@/src/lib/api";
import {
  Teacher,
  CreateTeacherDto,
  UpdateTeacherDto,
  AssignTeacherDto,
} from "@/src/types/teacher";

// 1. Fetch all teachers (with optional search and department filter)
export const getTeachers = async (
  search?: string,
  department?: string
): Promise<Teacher[]> => {
  const params: Record<string, string> = {};
  if (search) params.search = search;
  if (department && department !== "ALL") params.department = department;
  const response = await api.get("/teachers", { params });
  return response.data;
};

// 2. Fetch a single teacher by ID or teacherId
export const getTeacherById = async (id: string): Promise<Teacher> => {
  const response = await api.get(`/teachers/${id}`);
  return response.data;
};

// 3. Create a new teacher
export const createTeacher = async (
  teacherData: CreateTeacherDto
): Promise<Teacher> => {
  const response = await api.post("/teachers", teacherData);
  return response.data;
};

// 4. Update teacher details
export const updateTeacher = async (
  id: string,
  teacherData: UpdateTeacherDto
): Promise<Teacher> => {
  const response = await api.patch(`/teachers/${id}`, teacherData);
  return response.data;
};

// 5. Delete a teacher
export const deleteTeacher = async (id: string): Promise<any> => {
  const response = await api.delete(`/teachers/${id}`);
  return response.data;
};

// 6. Assign teacher to a class, section, and subject
export const assignTeacher = async (
  teacherId: string,
  data: AssignTeacherDto
): Promise<any> => {
  const response = await api.post(`/teachers/${teacherId}/assignments`, data);
  return response.data;
};

// 7. Remove teacher assignment
export const removeTeacherAssignment = async (
  assignmentId: string
): Promise<any> => {
  const response = await api.delete(`/teachers/assignments/${assignmentId}`);
  return response.data;
};

// 8. Get students enrolled in a teacher assignment
export const getTeacherAssignmentStudents = async (
  assignmentId: string
): Promise<any> => {
  const response = await api.get(`/teachers/assignments/${assignmentId}/students`);
  return response.data;
};

// 9. Get logged-in teacher assignments (with class, section & subject)
export const getMyAssignments = async (email?: string): Promise<any[]> => {
  const params: Record<string, string> = {};
  if (email) params.email = email;
  const response = await api.get("/teachers/my-assignments", { params });
  return response.data;
};
