import { api } from "@/src/lib/api";

export const getClasses = async () => {
  const response = await api.get("/academic/classes");
  return response.data;
};

export const getSubjects = async () => {
  const response = await api.get("/academic/subjects");
  return response.data;
};
