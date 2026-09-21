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

export const getExams = async (): Promise<ExamItem[]> => {
  const response = await api.get("/exams");
  return response.data;
};

export const getExamById = async (id: string): Promise<ExamItem> => {
  const response = await api.get(`/exams/${id}`);
  return response.data;
};

export const createExam = async (data: {
  name: string;
  year: number;
  status?: "DRAFT" | "PUBLISHED";
}): Promise<any> => {
  const response = await api.post("/exams", data);
  return response.data;
};

export const publishExamResult = async (id: string): Promise<any> => {
  const response = await api.patch(`/exams/${id}/publish`);
  return response.data;
};

export const unpublishExamResult = async (id: string): Promise<any> => {
  const response = await api.patch(`/exams/${id}/unpublish`);
  return response.data;
};
