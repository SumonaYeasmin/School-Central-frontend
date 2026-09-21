import { api } from "@/src/lib/api";

export interface ResultItem {
  id: string;
  studentId: string;
  examId: string;
  subjectId: string;
  marks: number;
  fullMarks: number;
  student?: {
    id: string;
    studentId: string;
    name: string;
    roll: string;
    class?: { id: string; name: string };
    section?: { id: string; name: string };
  };
  exam?: {
    id: string;
    name: string;
    year: number;
    status: string;
  };
  subject?: {
    id: string;
    name: string;
    code?: string;
  };
}

export interface GetResultsFilter {
  examId?: string;
  studentId?: string;
  subjectId?: string;
  classId?: string;
  sectionId?: string;
}

export const getResults = async (filters?: GetResultsFilter): Promise<ResultItem[]> => {
  const response = await api.get("/results", { params: filters });
  return response.data;
};

export const createResult = async (data: {
  studentId: string;
  examId: string;
  subjectId: string;
  marks: number;
  fullMarks?: number;
}): Promise<any> => {
  const response = await api.post("/results", data);
  return response.data;
};

export const updateResult = async (
  id: string,
  data: { marks?: number; fullMarks?: number }
): Promise<any> => {
  const response = await api.patch(`/results/${id}`, data);
  return response.data;
};

export const getStudentExamResult = async (
  studentId: string,
  examId: string,
  isPublic?: boolean
): Promise<any> => {
  const params: Record<string, string> = {};
  if (isPublic) params.isPublic = "true";
  const response = await api.get(`/results/student/${studentId}/exam/${examId}`, {
    params,
  });
  return response.data;
};
