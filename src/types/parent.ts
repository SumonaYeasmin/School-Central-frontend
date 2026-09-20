export type ParentRelationType = "FATHER" | "MOTHER" | "GUARDIAN" | "OTHER";

export interface ParentStudentRelation {
  id: string;
  parentId: string;
  studentId: string;
  relation: ParentRelationType | string;
  isPrimary: boolean;
  createdAt?: string;
  updatedAt?: string;
  student?: {
    id: string;
    studentId: string;
    name: string;
    roll?: string;
    gender?: string;
    class?: {
      id: string;
      name: string;
    };
    section?: {
      id: string;
      name: string;
    };
  };
}

export interface Parent {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  address?: string | null;
  createdAt?: string;
  updatedAt?: string;
  students?: ParentStudentRelation[];
}

export interface CreateParentDto {
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

export interface UpdateParentDto {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface AssignStudentDto {
  studentId: string;
  relation: ParentRelationType;
  isPrimary?: boolean;
}
