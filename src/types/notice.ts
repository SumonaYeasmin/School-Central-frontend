export type NoticeCategory =
  | "ACADEMIC"
  | "EXAM"
  | "HOLIDAY"
  | "EVENT"
  | "GENERAL"
  | "EMERGENCY";

export type NoticeAudience = "ALL" | "TEACHERS" | "PARENTS";

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  targetAudience: NoticeAudience;
  attachment?: string | null;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoticeDto {
  title: string;
  content: string;
  category?: NoticeCategory;
  targetAudience?: NoticeAudience;
  attachment?: string;
  isPublished?: boolean;
}

export interface UpdateNoticeDto {
  title?: string;
  content?: string;
  category?: NoticeCategory;
  targetAudience?: NoticeAudience;
  attachment?: string;
  isPublished?: boolean;
}
