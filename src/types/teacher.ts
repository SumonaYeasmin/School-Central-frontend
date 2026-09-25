export interface TeacherAssignment {
  id: string;
  teacherId: string;
  classId: string;
  sectionId: string;
  subjectId: string;
  isClassTeacher: boolean;
  createdAt?: string;
  updatedAt?: string;
  class: {
    id: string;
    name: string;
  };
  section: {
    id: string;
    name: string;
  };
  subject: {
    id: string;
    name: string;
    code?: string | null;
  };
}

export interface Teacher {
  id: string;
  teacherId: string;
  name: string;
  photo?: string | null;
  email?: string | null;
  phone: string;
  designation: string;
  department?: string | null;
  joiningDate?: string | null;
  assignments?: TeacherAssignment[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTeacherDto {
  teacherId: string;
  name: string;
  photo?: string;
  phone: string;
  designation: string;
  email?: string;
  department?: string;
  joiningDate?: string;
}

export interface UpdateTeacherDto {
  teacherId?: string;
  name?: string;
  photo?: string;
  phone?: string;
  designation?: string;
  email?: string;
  department?: string;
  joiningDate?: string;
}

export interface AssignTeacherDto {
  classId: string;
  sectionId: string;
  subjectId: string;
  isClassTeacher?: boolean;
}
