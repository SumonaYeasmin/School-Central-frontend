import { api } from "@/src/lib/api";
import { Student } from "@/src/types/student";

export const getStudents = async (classId?: string, sectionId?: string): Promise<Student[]> => {
  const params: Record<string, string> = {};
  if (classId) params.classId = classId;
  if (sectionId) params.sectionId = sectionId;
  const response = await api.get("/students", { params });
  return response.data;
};

export const getStudentById = async (id: string): Promise<Student> => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};
