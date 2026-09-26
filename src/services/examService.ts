import { api } from "@/src/lib/api";

export interface ExamItem {
  id: string;
  name: string;
  year: number;
  status: "DRAFT" | "PUBLISHED";
  resultPublishedAt?: string | null;
  createdAt?: string;
  _count?: {
    results: number;
  };
}

// Client-side in-memory cache
const examCache = new Map<string, { data: any; expiresAt: number }>();

const getCached = (key: string) => {
  const entry = examCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    examCache.delete(key);
    return null;
  }
  return entry.data;
};

const setCached = (key: string, data: any, ttlSec = 180) => {
  examCache.set(key, { data, expiresAt: Date.now() + ttlSec * 1000 });
};

export const getExams = async (): Promise<ExamItem[]> => {
  const cacheKey = "exams:all";
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const response = await api.get("/exams");
  setCached(cacheKey, response.data, 180);
  return response.data;
};

export const getExamById = async (id: string): Promise<ExamItem> => {
  const cacheKey = `exam:${id}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const response = await api.get(`/exams/${id}`);
  setCached(cacheKey, response.data, 180);
  return response.data;
};

export const createExam = async (data: {
  name: string;
  year: number;
  status?: "DRAFT" | "PUBLISHED";
}): Promise<any> => {
  examCache.clear();
  const response = await api.post("/exams", data);
  return response.data;
};

export const publishExamResult = async (id: string): Promise<any> => {
  examCache.clear();
  const response = await api.patch(`/exams/${id}/publish`);
  return response.data;
};

export const unpublishExamResult = async (id: string): Promise<any> => {
  examCache.clear();
  const response = await api.patch(`/exams/${id}/unpublish`);
  return response.data;
};
