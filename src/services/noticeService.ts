import { api } from "@/src/lib/api";
import {
  Notice,
  NoticeCategory,
  NoticeAudience,
  CreateNoticeDto,
} from "@/src/types/notice";

// 1. Create a new notice (Admin)
export const createNotice = async (
  noticeData: CreateNoticeDto
): Promise<Notice> => {
  const response = await api.post("/notices", noticeData);
  return response.data;
};

// 2. Fetch all notices (with optional filters)
export const getNotices = async (
  search?: string,
  category?: NoticeCategory | "ALL",
  targetAudience?: NoticeAudience | "ALL",
  onlyPublished?: boolean
): Promise<Notice[]> => {
  const params: Record<string, string> = {};
  if (search) params.search = search;
  if (category && category !== "ALL") params.category = category;
  if (targetAudience && targetAudience !== "ALL") params.targetAudience = targetAudience;
  if (onlyPublished !== undefined) params.onlyPublished = String(onlyPublished);

  const response = await api.get("/notices", { params });
  return response.data;
};
