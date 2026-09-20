
export interface Student {
  id: string;
  studentId: string;
  name: string;
  roll: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  dateOfBirth?: string;
  photo?: string | null;
  status?: "ACTIVE" | "INACTIVE" | "TRANSFERRED";
  admissionDate?: string;
  classId: string;
  sectionId: string;
  class?: {
    id: string;
    name: string;
  };
  section?: {
    id: string;
    name: string;
  };
  parents?: Array<{
    id?: string;
    relation?: "FATHER" | "MOTHER" | "GUARDIAN" | "OTHER" | string;
    isPrimary?: boolean;
    parent: {
      id: string;
      name: string;
      phone: string;
      email?: string | null;
      address?: string | null;
    };
  }>;
}
