import { api } from "@/src/lib/api";
import {
  Parent,
  CreateParentDto,
  UpdateParentDto,
  AssignStudentDto,
} from "@/src/types/parent";

// 1. Fetch all parents from the database (with optional search query)
export const getParents = async (search?: string): Promise<Parent[]> => {
  const params: Record<string, string> = {};
  if (search) params.search = search;
  const response = await api.get("/parents", { params });
  return response.data;
};

// 2. Fetch a single parent by ID
export const getParentById = async (id: string): Promise<Parent> => {
  const response = await api.get(`/parents/${id}`);
  return response.data;
};

// 3. Create a new parent
export const createParent = async (
  parentData: CreateParentDto
): Promise<Parent> => {
  const response = await api.post("/parents", parentData);
  return response.data;
};

// 4. Update parent details
export const updateParent = async (
  id: string,
  parentData: UpdateParentDto
): Promise<Parent> => {
  const response = await api.patch(`/parents/${id}`, parentData);
  return response.data;
};

// 5. Delete a parent
export const deleteParent = async (id: string): Promise<any> => {
  const response = await api.delete(`/parents/${id}`);
  return response.data;
};

// 6. Assign a student to a parent
export const assignStudentToParent = async (
  parentId: string,
  data: AssignStudentDto
): Promise<any> => {
  const response = await api.post(`/parents/${parentId}/students`, data);
  return response.data;
};

// 7. Remove student link from parent
export const removeStudentFromParent = async (
  parentId: string,
  studentId: string
): Promise<any> => {
  const response = await api.delete(`/parents/${parentId}/students/${studentId}`);
  return response.data;
};
