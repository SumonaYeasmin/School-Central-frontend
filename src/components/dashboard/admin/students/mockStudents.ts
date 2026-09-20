export interface MockStudent {
  id: string;
  name: string;
  initials: string;
  studentId: string; // e.g. "NB-24018"
  class: string; // e.g. "Grade 7 · Section A"
  guardian: string; // e.g. "Leah Williams"
  attendanceRate?: string;
  gender?: "Male" | "Female";
  status?: "ACTIVE" | "INACTIVE";
}

export const MOCK_STUDENTS_STATS = {
  totalStudents: 842,
  newAdmissions: 47,
  activeSections: 84,
  avgAttendance: "92.4%",
};

export const MOCK_STUDENTS: MockStudent[] = [
  {
    id: "1",
    name: "Amina Williams",
    initials: "AW",
    studentId: "NB-24018",
    class: "Grade 7 · Section A",
    guardian: "Leah Williams",
    attendanceRate: "96%",
    gender: "Female",
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Leo Martin",
    initials: "LM",
    studentId: "NB-23984",
    class: "Grade 8 · Section A",
    guardian: "Mara Martin",
    attendanceRate: "94%",
    gender: "Male",
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "Sofia Patel",
    initials: "SP",
    studentId: "NB-23951",
    class: "Grade 10 · Section B",
    guardian: "Ravi Patel",
    attendanceRate: "91%",
    gender: "Female",
    status: "ACTIVE",
  },
  {
    id: "4",
    name: "Noah Kim",
    initials: "NK",
    studentId: "NB-23897",
    class: "Grade 6 · Section C",
    guardian: "Jiyun Kim",
    attendanceRate: "88%",
    gender: "Male",
    status: "ACTIVE",
  },
  {
    id: "5",
    name: "Aarav Sharma",
    initials: "AS",
    studentId: "NB-24102",
    class: "Grade 9 · Section A",
    guardian: "Vikram Sharma",
    attendanceRate: "95%",
    gender: "Male",
    status: "ACTIVE",
  },
  {
    id: "6",
    name: "Chloe Dupont",
    initials: "CD",
    studentId: "NB-23765",
    class: "Grade 10 · Section A",
    guardian: "Marc Dupont",
    attendanceRate: "93%",
    gender: "Female",
    status: "ACTIVE",
  },
  {
    id: "7",
    name: "Zayan Rahman",
    initials: "ZR",
    studentId: "NB-24219",
    class: "Grade 6 · Section A",
    guardian: "Tariq Rahman",
    attendanceRate: "97%",
    gender: "Male",
    status: "ACTIVE",
  },
  {
    id: "8",
    name: "Fatima Al-Mansoor",
    initials: "FA",
    studentId: "NB-24055",
    class: "Grade 8 · Section B",
    guardian: "Yusuf Al-Mansoor",
    attendanceRate: "92%",
    gender: "Female",
    status: "ACTIVE",
  },
];
