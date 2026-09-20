export interface MockSubject {
  id: string;
  name: string;
  type: string; // e.g. "Core curriculum", "Science Group", "Optional curriculum"
  code: string;
  classes: string;
  leadTeacher: string;
}

export const MOCK_SUBJECTS_STATS = {
  totalSubjects: 24,
  coreSubjects: 16,
  optionalSubjects: 8,
};

export const MOCK_SUBJECTS: MockSubject[] = [
  {
    id: "1",
    name: "Mathematics",
    type: "Core curriculum",
    code: "MTH-08",
    classes: "Grades 6–10",
    leadTeacher: "Maya Chen",
  },
  {
    id: "2",
    name: "English Language",
    type: "Core curriculum",
    code: "ENG-04",
    classes: "Grades 5–10",
    leadTeacher: "Jon Bell",
  },
  {
    id: "3",
    name: "General Science",
    type: "Core curriculum",
    code: "SCI-12",
    classes: "Grades 6–9",
    leadTeacher: "Rafael Ortiz",
  },
  {
    id: "4",
    name: "Social Studies",
    type: "Core curriculum",
    code: "SOC-07",
    classes: "Grades 7–10",
    leadTeacher: "Priya Nair",
  },
  {
    id: "5",
    name: "Physics",
    type: "Science Group",
    code: "PHY-09",
    classes: "Grades 9–10",
    leadTeacher: "Dr. Alan Turing",
  },
  {
    id: "6",
    name: "Chemistry",
    type: "Science Group",
    code: "CHM-10",
    classes: "Grades 9–10",
    leadTeacher: "Marie Curie",
  },
  {
    id: "7",
    name: "Higher Mathematics",
    type: "Optional curriculum",
    code: "HMTH-03",
    classes: "Grades 9–10",
    leadTeacher: "Albert Einstein",
  },
  {
    id: "8",
    name: "Accounting",
    type: "Business Studies",
    code: "ACC-05",
    classes: "Grades 9–10",
    leadTeacher: "Warren Buffett",
  },
  {
    id: "9",
    name: "Information & Tech (ICT)",
    type: "Core curriculum",
    code: "ICT-01",
    classes: "Grades 6–10",
    leadTeacher: "Sarah Jenkins",
  },
  {
    id: "10",
    name: "Bangla Literature",
    type: "Core curriculum",
    code: "BNG-02",
    classes: "Grades 6–10",
    leadTeacher: "Rabindranath Tag",
  },
];
