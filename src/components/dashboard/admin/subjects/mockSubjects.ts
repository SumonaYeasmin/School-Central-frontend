export interface MockSubject {
  id: string;
  name: string;
  type: string; // e.g. "Core curriculum", "Science Group", "Optional curriculum"
  code: string;
  classes: string;
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
  },
  {
    id: "2",
    name: "English Language",
    type: "Core curriculum",
    code: "ENG-04",
    classes: "Grades 5–10",
  },
  {
    id: "3",
    name: "General Science",
    type: "Core curriculum",
    code: "SCI-12",
    classes: "Grades 6–9",
  },
  {
    id: "4",
    name: "Social Studies",
    type: "Core curriculum",
    code: "SOC-07",
    classes: "Grades 7–10",
  },
  {
    id: "5",
    name: "Physics",
    type: "Science Group",
    code: "PHY-09",
    classes: "Grades 9–10",
  },
  {
    id: "6",
    name: "Chemistry",
    type: "Science Group",
    code: "CHM-10",
    classes: "Grades 9–10",
  },
  {
    id: "7",
    name: "Higher Mathematics",
    type: "Optional curriculum",
    code: "HMTH-03",
    classes: "Grades 9–10",
  },
  {
    id: "8",
    name: "Accounting",
    type: "Business Studies",
    code: "ACC-05",
    classes: "Grades 9–10",
  },
  {
    id: "9",
    name: "Information & Tech (ICT)",
    type: "Core curriculum",
    code: "ICT-01",
    classes: "Grades 6–10",
  },
  {
    id: "10",
    name: "Bangla Literature",
    type: "Core curriculum",
    code: "BNG-02",
    classes: "Grades 6–10",
  },
];
