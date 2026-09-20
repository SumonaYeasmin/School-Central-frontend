import { api } from "@/src/lib/api";

export const getClasses = async () => {
  const response = await api.get("/academic/classes");
  return response.data;
};

export const createClass = async (classData: { name: string }) => {
  const response = await api.post("/academic/classes", classData);
  return response.data;
};

export const updateClass = async (id: string, classData: { name?: string; sections?: string[] }) => {
  const response = await api.patch(`/academic/classes/${id}`, classData);
  return response.data;
};

export const deleteClass = async (id: string) => {
  const response = await api.delete(`/academic/classes/${id}`);
  return response.data;
};

export const createSection = async (sectionData: { name: string; classId: string }) => {
  const response = await api.post("/academic/sections", sectionData);
  return response.data;
};

export const getSubjects = async () => {
  const response = await api.get("/academic/subjects");
  return response.data;
};

export const createSubject = async (subjectData: {
  name: string;
  code?: string;
  classId?: string;
  classIds?: string[];
}) => {
  const response = await api.post("/academic/subjects", subjectData);
  return response.data;
};

export const updateSubject = async (
  id: string,
  subjectData: { name?: string; code?: string; classIds?: string[]; groupId?: string | null }
) => {
  const response = await api.patch(`/academic/subjects/${id}`, subjectData);
  return response.data;
};

export const deleteSubject = async (id: string) => {
  const response = await api.delete(`/academic/subjects/${id}`);
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

// Re-export parent service functions
export * from "./parentService";

// Re-export teacher service functions
export * from "./teacherService";


