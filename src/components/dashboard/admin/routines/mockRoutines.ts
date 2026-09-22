export interface PeriodSlot {
  subject: string;
  teacher: string;
  room: string;
  theme: "amber" | "blue" | "purple" | "emerald" | "rose" | "gray";
}

export interface DaySchedule {
  p1: PeriodSlot; // 10:00 - 11:00
  p2: PeriodSlot; // 11:00 - 12:00
  p3: PeriodSlot; // 12:00 - 1:00
  p4: PeriodSlot; // 2:00 - 3:00
  p5: PeriodSlot; // 3:00 - 4:00
}

export interface SectionRoutine {
  id: string;
  grade: string; // e.g. "Class 6"
  section: string; // e.g. "Section A"
  fullName: string; // "Class 6 · Section A"
  classTeacher: string; // "Priya Nair"
  room: string; // "Room 101"
  studentCount: number; // 32
  schedule: {
    Monday: DaySchedule;
    Tuesday: DaySchedule;
    Wednesday: DaySchedule;
    Thursday: DaySchedule;
    Friday: DaySchedule;
  };
}

export const TIME_SLOTS = [
  { time: "10:00–11:00", periodKey: "p1" as const, label: "Period 1" },
  { time: "11:00–12:00", periodKey: "p2" as const, label: "Period 2" },
  { time: "12:00–1:00", periodKey: "p3" as const, label: "Period 3" },
  { time: "1:00–2:00", isBreak: true, label: "Tiffin break", duration: "1 hour" },
  { time: "2:00–3:00", periodKey: "p4" as const, label: "Period 4" },
  { time: "3:00–4:00", periodKey: "p5" as const, label: "Period 5" },
];

export const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

export const CLASSES_LIST = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"] as const;

export const MOCK_ROUTINES: SectionRoutine[] = [
  // ==================== CLASS 6 ====================
  // 1. Class 6 · Section A
  {
    id: "c6-a",
    grade: "Class 6",
    section: "Section A",
    fullName: "Class 6 · Section A",
    classTeacher: "Priya Nair",
    room: "Room 101",
    studentCount: 32,
    schedule: {
      Monday: {
        p1: { subject: "Bangla", teacher: "Priya Nair", room: "Room 101", theme: "amber" },
        p2: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 101", theme: "blue" },
        p3: { subject: "English", teacher: "Jon Bell", room: "Room 101", theme: "purple" },
        p4: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Art & Craft", teacher: "Helen Moore", room: "Studio 01", theme: "amber" },
      },
      Tuesday: {
        p1: { subject: "English", teacher: "Jon Bell", room: "Room 101", theme: "purple" },
        p2: { subject: "Social Studies", teacher: "Priya Nair", room: "Room 101", theme: "amber" },
        p3: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 101", theme: "blue" },
        p4: { subject: "ICT Basics", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "Physical Education", teacher: "Sam Reed", room: "Playground", theme: "emerald" },
      },
      Wednesday: {
        p1: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p2: { subject: "Bangla", teacher: "Priya Nair", room: "Room 101", theme: "amber" },
        p3: { subject: "English", teacher: "Jon Bell", room: "Room 101", theme: "purple" },
        p4: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 101", theme: "blue" },
        p5: { subject: "Library Session", teacher: "Nora Ellis", room: "Library", theme: "emerald" },
      },
      Thursday: {
        p1: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 101", theme: "blue" },
        p2: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p3: { subject: "Social Studies", teacher: "Priya Nair", room: "Room 101", theme: "amber" },
        p4: { subject: "Bangla Grammar", teacher: "Priya Nair", room: "Room 101", theme: "amber" },
        p5: { subject: "Music & Rhymes", teacher: "Mina Park", room: "Music Room", theme: "purple" },
      },
      Friday: {
        p1: { subject: "English Spoken", teacher: "Jon Bell", room: "Room 101", theme: "purple" },
        p2: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 101", theme: "blue" },
        p3: { subject: "Health & Hygiene", teacher: "Sam Reed", room: "Room 101", theme: "emerald" },
        p4: { subject: "Science Fun Lab", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Club Activity", teacher: "Faculty", room: "Hall 01", theme: "purple" },
      },
    },
  },

  // 2. Class 6 · Section B
  {
    id: "c6-b",
    grade: "Class 6",
    section: "Section B",
    fullName: "Class 6 · Section B",
    classTeacher: "Jon Bell",
    room: "Room 102",
    studentCount: 30,
    schedule: {
      Monday: {
        p1: { subject: "English", teacher: "Jon Bell", room: "Room 102", theme: "purple" },
        p2: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 102", theme: "amber" },
        p3: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 102", theme: "blue" },
        p4: { subject: "ICT Basics", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "Physical Education", teacher: "Sam Reed", room: "Playground", theme: "emerald" },
      },
      Tuesday: {
        p1: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 102", theme: "blue" },
        p2: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p3: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 102", theme: "amber" },
        p4: { subject: "English", teacher: "Jon Bell", room: "Room 102", theme: "purple" },
        p5: { subject: "Art & Craft", teacher: "Helen Moore", room: "Studio 01", theme: "amber" },
      },
      Wednesday: {
        p1: { subject: "Social Studies", teacher: "Priya Nair", room: "Room 102", theme: "amber" },
        p2: { subject: "English Grammar", teacher: "Jon Bell", room: "Room 102", theme: "purple" },
        p3: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p4: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 102", theme: "blue" },
        p5: { subject: "Music", teacher: "Mina Park", room: "Music Room", theme: "purple" },
      },
      Thursday: {
        p1: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 102", theme: "amber" },
        p2: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 102", theme: "blue" },
        p3: { subject: "English", teacher: "Jon Bell", room: "Room 102", theme: "purple" },
        p4: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Library Session", teacher: "Nora Ellis", room: "Library", theme: "emerald" },
      },
      Friday: {
        p1: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p2: { subject: "Social Studies", teacher: "Priya Nair", room: "Room 102", theme: "amber" },
        p3: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 102", theme: "blue" },
        p4: { subject: "English Reading", teacher: "Jon Bell", room: "Room 102", theme: "purple" },
        p5: { subject: "Club Activity", teacher: "Faculty", room: "Hall 01", theme: "purple" },
      },
    },
  },

  // 3. Class 6 · Section C
  {
    id: "c6-c",
    grade: "Class 6",
    section: "Section C",
    fullName: "Class 6 · Section C",
    classTeacher: "Farhana Sultana",
    room: "Room 103",
    studentCount: 29,
    schedule: {
      Monday: {
        p1: { subject: "Mathematics", teacher: "Mahmud Hasan", room: "Room 103", theme: "blue" },
        p2: { subject: "English", teacher: "Jon Bell", room: "Room 103", theme: "purple" },
        p3: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 103", theme: "amber" },
        p4: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Moral Science", teacher: "Priya Nair", room: "Room 103", theme: "amber" },
      },
      Tuesday: {
        p1: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 103", theme: "amber" },
        p2: { subject: "Mathematics", teacher: "Mahmud Hasan", room: "Room 103", theme: "blue" },
        p3: { subject: "Social Studies", teacher: "Priya Nair", room: "Room 103", theme: "amber" },
        p4: { subject: "English", teacher: "Jon Bell", room: "Room 103", theme: "purple" },
        p5: { subject: "Library", teacher: "Nora Ellis", room: "Library", theme: "emerald" },
      },
      Wednesday: {
        p1: { subject: "English", teacher: "Jon Bell", room: "Room 103", theme: "purple" },
        p2: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p3: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 103", theme: "amber" },
        p4: { subject: "Mathematics", teacher: "Mahmud Hasan", room: "Room 103", theme: "blue" },
        p5: { subject: "Art & Craft", teacher: "Helen Moore", room: "Studio 01", theme: "amber" },
      },
      Thursday: {
        p1: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p2: { subject: "Social Studies", teacher: "Priya Nair", room: "Room 103", theme: "amber" },
        p3: { subject: "Mathematics", teacher: "Mahmud Hasan", room: "Room 103", theme: "blue" },
        p4: { subject: "ICT Basics", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "Physical Education", teacher: "Sam Reed", room: "Field", theme: "emerald" },
      },
      Friday: {
        p1: { subject: "English", teacher: "Jon Bell", room: "Room 103", theme: "purple" },
        p2: { subject: "Mathematics", teacher: "Mahmud Hasan", room: "Room 103", theme: "blue" },
        p3: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 103", theme: "amber" },
        p4: { subject: "Music & Culture", teacher: "Mina Park", room: "Music Room", theme: "purple" },
        p5: { subject: "Club Activity", teacher: "Faculty", room: "Hall 01", theme: "purple" },
      },
    },
  },

  // ==================== CLASS 7 ====================
  // 4. Class 7 · Section A
  {
    id: "c7-a",
    grade: "Class 7",
    section: "Section A",
    fullName: "Class 7 · Section A",
    classTeacher: "Jon Bell",
    room: "Room 104",
    studentCount: 31,
    schedule: {
      Monday: {
        p1: { subject: "English", teacher: "Jon Bell", room: "Room 104", theme: "purple" },
        p2: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 104", theme: "blue" },
        p3: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p4: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 104", theme: "amber" },
        p5: { subject: "Art & Design", teacher: "Helen Moore", room: "Studio 01", theme: "amber" },
      },
      Tuesday: {
        p1: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 104", theme: "blue" },
        p2: { subject: "English Grammar", teacher: "Jon Bell", room: "Room 104", theme: "purple" },
        p3: { subject: "Social Science", teacher: "Priya Nair", room: "Room 104", theme: "amber" },
        p4: { subject: "ICT", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "Games & Sports", teacher: "Sam Reed", room: "Field", theme: "emerald" },
      },
      Wednesday: {
        p1: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p2: { subject: "Bangla Literature", teacher: "Farhana Sultana", room: "Room 104", theme: "amber" },
        p3: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 104", theme: "blue" },
        p4: { subject: "English", teacher: "Jon Bell", room: "Room 104", theme: "purple" },
        p5: { subject: "Library Session", teacher: "Nora Ellis", room: "Library", theme: "emerald" },
      },
      Thursday: {
        p1: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 104", theme: "amber" },
        p2: { subject: "Science Lab", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p3: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 104", theme: "blue" },
        p4: { subject: "Moral Science", teacher: "Priya Nair", room: "Room 104", theme: "amber" },
        p5: { subject: "Music & Drama", teacher: "Mina Park", room: "Music Room", theme: "purple" },
      },
      Friday: {
        p1: { subject: "English Speaking", teacher: "Jon Bell", room: "Room 104", theme: "purple" },
        p2: { subject: "Mathematics Quiz", teacher: "Maya Chen", room: "Room 104", theme: "blue" },
        p3: { subject: "Science Project", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p4: { subject: "ICT Lab", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "Co-curricular Club", teacher: "Staff", room: "Hall 02", theme: "purple" },
      },
    },
  },

  // 5. Class 7 · Section B
  {
    id: "c7-b",
    grade: "Class 7",
    section: "Section B",
    fullName: "Class 7 · Section B",
    classTeacher: "Rafael Ortiz",
    room: "Room 105",
    studentCount: 28,
    schedule: {
      Monday: {
        p1: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 105", theme: "blue" },
        p2: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p3: { subject: "English", teacher: "Jon Bell", room: "Room 105", theme: "purple" },
        p4: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 105", theme: "amber" },
        p5: { subject: "Social Studies", teacher: "Priya Nair", room: "Room 105", theme: "amber" },
      },
      Tuesday: {
        p1: { subject: "English", teacher: "Jon Bell", room: "Room 105", theme: "purple" },
        p2: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 105", theme: "amber" },
        p3: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 105", theme: "blue" },
        p4: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Art Studio", teacher: "Helen Moore", room: "Studio 01", theme: "amber" },
      },
      Wednesday: {
        p1: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 105", theme: "blue" },
        p2: { subject: "ICT / Coding", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p3: { subject: "English", teacher: "Jon Bell", room: "Room 105", theme: "purple" },
        p4: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Physical Training", teacher: "Sam Reed", room: "Playground", theme: "emerald" },
      },
      Thursday: {
        p1: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p2: { subject: "English Grammar", teacher: "Jon Bell", room: "Room 105", theme: "purple" },
        p3: { subject: "Social Studies", teacher: "Priya Nair", room: "Room 105", theme: "amber" },
        p4: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 105", theme: "blue" },
        p5: { subject: "Library Session", teacher: "Nora Ellis", room: "Library", theme: "emerald" },
      },
      Friday: {
        p1: { subject: "Bangla Literature", teacher: "Farhana Sultana", room: "Room 105", theme: "amber" },
        p2: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 105", theme: "blue" },
        p3: { subject: "English", teacher: "Jon Bell", room: "Room 105", theme: "purple" },
        p4: { subject: "Science Experiments", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Club Activity", teacher: "Staff", room: "Hall 02", theme: "purple" },
      },
    },
  },

  // ==================== CLASS 8 ====================
  // 6. Class 8 · Section A
  {
    id: "c8-a",
    grade: "Class 8",
    section: "Section A",
    fullName: "Class 8 · Section A",
    classTeacher: "Maya Chen",
    room: "Room 106",
    studentCount: 34,
    schedule: {
      Monday: {
        p1: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 106", theme: "blue" },
        p2: { subject: "Higher Math Intro", teacher: "Mahmud Hasan", room: "Room 106", theme: "blue" },
        p3: { subject: "English", teacher: "Jon Bell", room: "Room 106", theme: "purple" },
        p4: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Bangla Literature", teacher: "Farhana Sultana", room: "Room 106", theme: "amber" },
      },
      Tuesday: {
        p1: { subject: "Physics Foundations", teacher: "Rafael Ortiz", room: "Lab 02", theme: "emerald" },
        p2: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 106", theme: "blue" },
        p3: { subject: "Bangla Grammar", teacher: "Farhana Sultana", room: "Room 106", theme: "amber" },
        p4: { subject: "ICT & Coding", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "Physical Training", teacher: "Sam Reed", room: "Playground", theme: "emerald" },
      },
      Wednesday: {
        p1: { subject: "English Grammar", teacher: "Jon Bell", room: "Room 106", theme: "purple" },
        p2: { subject: "Chemistry Foundations", teacher: "Marie Curie", room: "Chem Lab", theme: "emerald" },
        p3: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 106", theme: "blue" },
        p4: { subject: "Social Studies", teacher: "Priya Nair", room: "Room 106", theme: "amber" },
        p5: { subject: "Creative Arts", teacher: "Helen Moore", room: "Art Studio", theme: "amber" },
      },
      Thursday: {
        p1: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p2: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 106", theme: "blue" },
        p3: { subject: "English Spoken", teacher: "Jon Bell", room: "Room 106", theme: "purple" },
        p4: { subject: "Moral Education", teacher: "Priya Nair", room: "Room 106", theme: "amber" },
        p5: { subject: "Debate & Speech", teacher: "Farhana Sultana", room: "Auditorium", theme: "purple" },
      },
      Friday: {
        p1: { subject: "Higher Math Intro", teacher: "Mahmud Hasan", room: "Room 106", theme: "blue" },
        p2: { subject: "ICT Project", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p3: { subject: "Bangladesh Studies", teacher: "Priya Nair", room: "Room 106", theme: "amber" },
        p4: { subject: "Science Experiment", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Robotics & STEM", teacher: "Sarah Jenkins", room: "Innovation Lab", theme: "blue" },
      },
    },
  },

  // 7. Class 8 · Section B
  {
    id: "c8-b",
    grade: "Class 8",
    section: "Section B",
    fullName: "Class 8 · Section B",
    classTeacher: "Mahmud Hasan",
    room: "Room 107",
    studentCount: 33,
    schedule: {
      Monday: {
        p1: { subject: "English", teacher: "Jon Bell", room: "Room 107", theme: "purple" },
        p2: { subject: "Mathematics", teacher: "Mahmud Hasan", room: "Room 107", theme: "blue" },
        p3: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 107", theme: "amber" },
        p4: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Social Studies", teacher: "Priya Nair", room: "Room 107", theme: "amber" },
      },
      Tuesday: {
        p1: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p2: { subject: "English", teacher: "Jon Bell", room: "Room 107", theme: "purple" },
        p3: { subject: "Mathematics", teacher: "Mahmud Hasan", room: "Room 107", theme: "blue" },
        p4: { subject: "Bangla Grammar", teacher: "Farhana Sultana", room: "Room 107", theme: "amber" },
        p5: { subject: "Art & Craft", teacher: "Helen Moore", room: "Studio 01", theme: "amber" },
      },
      Wednesday: {
        p1: { subject: "Mathematics", teacher: "Mahmud Hasan", room: "Room 107", theme: "blue" },
        p2: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p3: { subject: "ICT & Coding", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p4: { subject: "English", teacher: "Jon Bell", room: "Room 107", theme: "purple" },
        p5: { subject: "Physical Education", teacher: "Sam Reed", room: "Field", theme: "emerald" },
      },
      Thursday: {
        p1: { subject: "Bangla Literature", teacher: "Farhana Sultana", room: "Room 107", theme: "amber" },
        p2: { subject: "Mathematics", teacher: "Mahmud Hasan", room: "Room 107", theme: "blue" },
        p3: { subject: "Social Studies", teacher: "Priya Nair", room: "Room 107", theme: "amber" },
        p4: { subject: "English", teacher: "Jon Bell", room: "Room 107", theme: "purple" },
        p5: { subject: "Library Session", teacher: "Nora Ellis", room: "Library", theme: "emerald" },
      },
      Friday: {
        p1: { subject: "Science Lab", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p2: { subject: "Mathematics", teacher: "Mahmud Hasan", room: "Room 107", theme: "blue" },
        p3: { subject: "English Grammar", teacher: "Jon Bell", room: "Room 107", theme: "purple" },
        p4: { subject: "ICT Practical", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "Club Activities", teacher: "Faculty", room: "Auditorium", theme: "purple" },
      },
    },
  },

  // ==================== CLASS 9 ====================
  // 8. Class 9 · Section A (Science)
  {
    id: "c9-a",
    grade: "Class 9",
    section: "Section A",
    fullName: "Class 9 · Section A",
    classTeacher: "Sarah Jenkins",
    room: "Room 108",
    studentCount: 35,
    schedule: {
      Monday: {
        p1: { subject: "General Math", teacher: "Mahmud Hasan", room: "Room 108", theme: "blue" },
        p2: { subject: "Physics", teacher: "Rafael Ortiz", room: "Physics Lab", theme: "emerald" },
        p3: { subject: "Chemistry", teacher: "Marie Curie", room: "Chem Lab", theme: "emerald" },
        p4: { subject: "English", teacher: "Jon Bell", room: "Room 108", theme: "purple" },
        p5: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 108", theme: "amber" },
      },
      Tuesday: {
        p1: { subject: "Biology", teacher: "Dr. Charles Darwin", room: "Bio Lab", theme: "emerald" },
        p2: { subject: "Higher Math", teacher: "Mahmud Hasan", room: "Room 108", theme: "blue" },
        p3: { subject: "English 2nd", teacher: "Jon Bell", room: "Room 108", theme: "purple" },
        p4: { subject: "ICT Practical", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "Physical Education", teacher: "Sam Reed", room: "Gym", theme: "emerald" },
      },
      Wednesday: {
        p1: { subject: "Physics Lab", teacher: "Rafael Ortiz", room: "Physics Lab", theme: "emerald" },
        p2: { subject: "General Math", teacher: "Mahmud Hasan", room: "Room 108", theme: "blue" },
        p3: { subject: "Bangla 2nd", teacher: "Farhana Sultana", room: "Room 108", theme: "amber" },
        p4: { subject: "Chemistry Lab", teacher: "Marie Curie", room: "Chem Lab", theme: "emerald" },
        p5: { subject: "Bangladesh Studies", teacher: "Priya Nair", room: "Room 108", theme: "amber" },
      },
      Thursday: {
        p1: { subject: "Higher Math", teacher: "Mahmud Hasan", room: "Room 108", theme: "blue" },
        p2: { subject: "Biology Lab", teacher: "Dr. Charles Darwin", room: "Bio Lab", theme: "emerald" },
        p3: { subject: "English 1st", teacher: "Jon Bell", room: "Room 108", theme: "purple" },
        p4: { subject: "Religion & Ethics", teacher: "Priya Nair", room: "Room 108", theme: "amber" },
        p5: { subject: "Science Seminar", teacher: "Rafael Ortiz", room: "Auditorium", theme: "blue" },
      },
      Friday: {
        p1: { subject: "ICT Project", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p2: { subject: "Physics Theory", teacher: "Rafael Ortiz", room: "Room 108", theme: "emerald" },
        p3: { subject: "Chemistry Problem Set", teacher: "Marie Curie", room: "Room 108", theme: "emerald" },
        p4: { subject: "Math Tutorial", teacher: "Mahmud Hasan", room: "Room 108", theme: "blue" },
        p5: { subject: "Club Activity", teacher: "Faculty", room: "Hall 01", theme: "purple" },
      },
    },
  },

  // 9. Class 9 · Section B (Commerce & Humanities)
  {
    id: "c9-b",
    grade: "Class 9",
    section: "Section B",
    fullName: "Class 9 · Section B",
    classTeacher: "Priya Nair",
    room: "Room 109",
    studentCount: 30,
    schedule: {
      Monday: {
        p1: { subject: "Accounting", teacher: "Robert Kiyosaki", room: "Room 109", theme: "blue" },
        p2: { subject: "General Math", teacher: "Maya Chen", room: "Room 109", theme: "blue" },
        p3: { subject: "English", teacher: "Jon Bell", room: "Room 109", theme: "purple" },
        p4: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 109", theme: "amber" },
        p5: { subject: "Business Ent.", teacher: "Priya Nair", room: "Room 109", theme: "amber" },
      },
      Tuesday: {
        p1: { subject: "Finance & Banking", teacher: "Robert Kiyosaki", room: "Room 109", theme: "blue" },
        p2: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p3: { subject: "Accounting", teacher: "Robert Kiyosaki", room: "Room 109", theme: "blue" },
        p4: { subject: "ICT Practical", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "English 2nd", teacher: "Jon Bell", room: "Room 109", theme: "purple" },
      },
      Wednesday: {
        p1: { subject: "General Math", teacher: "Maya Chen", room: "Room 109", theme: "blue" },
        p2: { subject: "Business Ent.", teacher: "Priya Nair", room: "Room 109", theme: "amber" },
        p3: { subject: "Bangla 2nd", teacher: "Farhana Sultana", room: "Room 109", theme: "amber" },
        p4: { subject: "Economics", teacher: "Robert Kiyosaki", room: "Room 109", theme: "blue" },
        p5: { subject: "Bangladesh Studies", teacher: "Priya Nair", room: "Room 109", theme: "amber" },
      },
      Thursday: {
        p1: { subject: "Accounting Practice", teacher: "Robert Kiyosaki", room: "Room 109", theme: "blue" },
        p2: { subject: "English 1st", teacher: "Jon Bell", room: "Room 109", theme: "purple" },
        p3: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p4: { subject: "Religion & Ethics", teacher: "Priya Nair", room: "Room 109", theme: "amber" },
        p5: { subject: "Business Workshop", teacher: "Robert Kiyosaki", room: "Room 109", theme: "blue" },
      },
      Friday: {
        p1: { subject: "Finance & Banking", teacher: "Robert Kiyosaki", room: "Room 109", theme: "blue" },
        p2: { subject: "General Math Quiz", teacher: "Maya Chen", room: "Room 109", theme: "blue" },
        p3: { subject: "ICT Practical", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p4: { subject: "Bangla Essay", teacher: "Farhana Sultana", room: "Room 109", theme: "amber" },
        p5: { subject: "Club Activity", teacher: "Faculty", room: "Hall 01", theme: "purple" },
      },
    },
  },

  // ==================== CLASS 10 ====================
  // 10. Class 10 · Section A (Science)
  {
    id: "c10-a",
    grade: "Class 10",
    section: "Section A",
    fullName: "Class 10 · Section A",
    classTeacher: "Rafael Ortiz",
    room: "Room 110",
    studentCount: 32,
    schedule: {
      Monday: {
        p1: { subject: "Physics", teacher: "Rafael Ortiz", room: "Physics Lab", theme: "emerald" },
        p2: { subject: "Chemistry", teacher: "Marie Curie", room: "Chem Lab", theme: "emerald" },
        p3: { subject: "Higher Math", teacher: "Mahmud Hasan", room: "Room 110", theme: "blue" },
        p4: { subject: "English 1st Paper", teacher: "Jon Bell", room: "Room 110", theme: "purple" },
        p5: { subject: "Bangla 1st Paper", teacher: "Farhana Sultana", room: "Room 110", theme: "amber" },
      },
      Tuesday: {
        p1: { subject: "Biology", teacher: "Dr. Charles Darwin", room: "Bio Lab", theme: "emerald" },
        p2: { subject: "Physics Lab", teacher: "Rafael Ortiz", room: "Physics Lab", theme: "emerald" },
        p3: { subject: "General Mathematics", teacher: "Mahmud Hasan", room: "Room 110", theme: "blue" },
        p4: { subject: "ICT / Programming", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "English 2nd Paper", teacher: "Jon Bell", room: "Room 110", theme: "purple" },
      },
      Wednesday: {
        p1: { subject: "Chemistry Lab", teacher: "Marie Curie", room: "Chem Lab", theme: "emerald" },
        p2: { subject: "Higher Math Practice", teacher: "Mahmud Hasan", room: "Room 110", theme: "blue" },
        p3: { subject: "Bangla 2nd Paper", teacher: "Farhana Sultana", room: "Room 110", theme: "amber" },
        p4: { subject: "Bangladesh & Global", teacher: "Priya Nair", room: "Room 110", theme: "amber" },
        p5: { subject: "Career Education", teacher: "Maya Chen", room: "Room 110", theme: "purple" },
      },
      Thursday: {
        p1: { subject: "Physics Problem Solving", teacher: "Rafael Ortiz", room: "Room 110", theme: "emerald" },
        p2: { subject: "General Mathematics", teacher: "Mahmud Hasan", room: "Room 110", theme: "blue" },
        p3: { subject: "Biology Lab", teacher: "Dr. Charles Darwin", room: "Bio Lab", theme: "emerald" },
        p4: { subject: "English Writing", teacher: "Jon Bell", room: "Room 110", theme: "purple" },
        p5: { subject: "Religion & Ethics", teacher: "Priya Nair", room: "Room 110", theme: "amber" },
      },
      Friday: {
        p1: { subject: "Higher Math Advanced", teacher: "Mahmud Hasan", room: "Room 110", theme: "blue" },
        p2: { subject: "Chemistry Research", teacher: "Marie Curie", room: "Chem Lab", theme: "emerald" },
        p3: { subject: "ICT Practical", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p4: { subject: "Model Test Review", teacher: "Rafael Ortiz", room: "Room 110", theme: "blue" },
        p5: { subject: "Study Hall & Guidance", teacher: "All Mentors", room: "Auditorium", theme: "amber" },
      },
    },
  },

  // 11. Class 10 · Section B (Commerce & Humanities)
  {
    id: "c10-b",
    grade: "Class 10",
    section: "Section B",
    fullName: "Class 10 · Section B",
    classTeacher: "Mahmud Hasan",
    room: "Room 111",
    studentCount: 28,
    schedule: {
      Monday: {
        p1: { subject: "Accounting", teacher: "Robert Kiyosaki", room: "Room 111", theme: "blue" },
        p2: { subject: "Business Ent.", teacher: "Priya Nair", room: "Room 111", theme: "amber" },
        p3: { subject: "General Math", teacher: "Mahmud Hasan", room: "Room 111", theme: "blue" },
        p4: { subject: "English 1st Paper", teacher: "Jon Bell", room: "Room 111", theme: "purple" },
        p5: { subject: "Bangla 1st Paper", teacher: "Farhana Sultana", room: "Room 111", theme: "amber" },
      },
      Tuesday: {
        p1: { subject: "Finance & Banking", teacher: "Robert Kiyosaki", room: "Room 111", theme: "blue" },
        p2: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p3: { subject: "General Math", teacher: "Mahmud Hasan", room: "Room 111", theme: "blue" },
        p4: { subject: "ICT / Programming", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "English 2nd Paper", teacher: "Jon Bell", room: "Room 111", theme: "purple" },
      },
      Wednesday: {
        p1: { subject: "Accounting Problem Solving", teacher: "Robert Kiyosaki", room: "Room 111", theme: "blue" },
        p2: { subject: "General Math Practice", teacher: "Mahmud Hasan", room: "Room 111", theme: "blue" },
        p3: { subject: "Bangla 2nd Paper", teacher: "Farhana Sultana", room: "Room 111", theme: "amber" },
        p4: { subject: "Bangladesh & Global", teacher: "Priya Nair", room: "Room 111", theme: "amber" },
        p5: { subject: "Economics", teacher: "Robert Kiyosaki", room: "Room 111", theme: "blue" },
      },
      Thursday: {
        p1: { subject: "Finance Practical", teacher: "Robert Kiyosaki", room: "Room 111", theme: "blue" },
        p2: { subject: "General Math", teacher: "Mahmud Hasan", room: "Room 111", theme: "blue" },
        p3: { subject: "Business Ent. Case Studies", teacher: "Priya Nair", room: "Room 111", theme: "amber" },
        p4: { subject: "English Writing", teacher: "Jon Bell", room: "Room 111", theme: "purple" },
        p5: { subject: "Religion & Ethics", teacher: "Priya Nair", room: "Room 111", theme: "amber" },
      },
      Friday: {
        p1: { subject: "Commerce Model Test", teacher: "Robert Kiyosaki", room: "Room 111", theme: "blue" },
        p2: { subject: "Math Model Test Review", teacher: "Mahmud Hasan", room: "Room 111", theme: "blue" },
        p3: { subject: "ICT Practical", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p4: { subject: "English Final Prep", teacher: "Jon Bell", room: "Room 111", theme: "purple" },
        p5: { subject: "Study Hall & Guidance", teacher: "All Mentors", room: "Auditorium", theme: "amber" },
      },
    },
  },
];
