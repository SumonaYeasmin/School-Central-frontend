import { api } from "@/src/lib/api";

// Client-side in-memory cache
const academicCache = new Map<string, { data: any; expiresAt: number }>();

const getCached = (key: string) => {
  const entry = academicCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    academicCache.delete(key);
    return null;
  }
  return entry.data;
};

const setCached = (key: string, data: any, ttlSec = 180) => {
  academicCache.set(key, { data, expiresAt: Date.now() + ttlSec * 1000 });
};

export const getClasses = async () => {
  const cacheKey = "academic:classes";
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const response = await api.get("/academic/classes");
  setCached(cacheKey, response.data, 180);
  return response.data;
};

export const createClass = async (classData: { name: string }) => {
  academicCache.clear();
  const response = await api.post("/academic/classes", classData);
  return response.data;
};

export const updateClass = async (id: string, classData: { name?: string; sections?: string[] }) => {
  academicCache.clear();
  const response = await api.patch(`/academic/classes/${id}`, classData);
  return response.data;
};

export const deleteClass = async (id: string) => {
  academicCache.clear();
  const response = await api.delete(`/academic/classes/${id}`);
  return response.data;
};

export const createSection = async (sectionData: { name: string; classId: string }) => {
  academicCache.clear();
  const response = await api.post("/academic/sections", sectionData);
  return response.data;
};

export const getSubjects = async () => {
  const cacheKey = "academic:subjects";
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const response = await api.get("/academic/subjects");
  setCached(cacheKey, response.data, 180);
  return response.data;
};

export const getSubjectsByClass = async (classId: string) => {
  const cacheKey = `academic:class_subjects:${classId}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const response = await api.get(`/academic/classes/${classId}/subjects`);
  setCached(cacheKey, response.data, 180);
  return response.data;
};

export const createSubject = async (subjectData: {
  name: string;
  code?: string;
  classId?: string;
  classIds?: string[];
}) => {
  academicCache.clear();
  const response = await api.post("/academic/subjects", subjectData);
  return response.data;
};

export const updateSubject = async (
  id: string,
  subjectData: { name?: string; code?: string; classIds?: string[]; groupId?: string | null }
) => {
  academicCache.clear();
  const response = await api.patch(`/academic/subjects/${id}`, subjectData);
  return response.data;
};

export const deleteSubject = async (id: string) => {
  academicCache.clear();
  const response = await api.delete(`/academic/subjects/${id}`);
  return response.data;
};

// সব স্টুডেন্ট নিয়ে আসার ফাংশন
export const getStudents = async (classId?: string, sectionId?: string) => {
  const cacheKey = `students:${classId || 'all'}:${sectionId || 'all'}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const params: Record<string, string> = {};
  if (classId) params.classId = classId;
  if (sectionId) params.sectionId = sectionId;
  const response = await api.get("/students", { params });
  setCached(cacheKey, response.data, 120);
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

// সব ক্লাস রুটিন নিয়ে আসার ফাংশন
export const getRoutines = async (params?: { day?: string; classId?: string; sectionId?: string; teacherId?: string }) => {
  const response = await api.get("/routines", { params });
  return response.data;
};

// Re-export parent service functions
export * from "./parentService";

// Re-export teacher service functions
export * from "./teacherService";


