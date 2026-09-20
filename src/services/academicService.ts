import { api } from "@/src/lib/api";

export const getClasses = async () => {
  const response = await api.get("/academic/classes");
  return response.data;
};

export const getSubjects = async () => {
  const response = await api.get("/academic/subjects");
  return response.data;
};

// সব স্টুডেন্ট নিয়ে আসার ফাংশন
export const getStudents = async (classId?: string, sectionId?: string) => {
  const params: Record<string, string> = {};
  if (classId) params.classId = classId;
  if (sectionId) params.sectionId = sectionId;
  const response = await api.get("/students", { params });
  return response.data;
};

// সিঙ্গেল স্টুডেন্টের ডিটেইলস নিয়ে আসার ফাংশন
export const getStudentById = async (id: string) => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

// নতুন স্টুডেন্ট তৈরি করার ফাংশন
export const createStudent = async (studentData: any) => {
  const response = await api.post("/students", studentData);
  return response.data;
};
