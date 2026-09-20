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
  grade: string; // e.g. "Grade 6"
  section: string; // e.g. "Section C"
  fullName: string; // "Grade 6 · Section C"
  classTeacher: string; // "Priya Nair"
  room: string; // "Room 12"
  studentCount: number; // 30
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

export const MOCK_ROUTINES: SectionRoutine[] = [
  // 1. Grade 6 · Section C (From screenshot)
  {
    id: "g6-c",
    grade: "Grade 6",
    section: "Section C",
    fullName: "Grade 6 · Section C",
    classTeacher: "Priya Nair",
    room: "Room 12",
    studentCount: 30,
    schedule: {
      Monday: {
        p1: { subject: "Bangla", teacher: "Priya Nair", room: "Room 12", theme: "amber" },
        p2: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 12", theme: "blue" },
        p3: { subject: "Science", teacher: "Rafael Ortiz", room: "Lab 02", theme: "emerald" },
        p4: { subject: "English", teacher: "Jon Bell", room: "Room 12", theme: "purple" },
        p5: { subject: "Art & Craft", teacher: "Helen Moore", room: "Studio 01", theme: "amber" },
      },
      Tuesday: {
        p1: { subject: "English", teacher: "Jon Bell", room: "Room 12", theme: "purple" },
        p2: { subject: "Social Studies", teacher: "Priya Nair", room: "Room 12", theme: "amber" },
        p3: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 12", theme: "blue" },
        p4: { subject: "ICT Basics", teacher: "Jon Bell", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Physical Education", teacher: "Sam Reed", room: "Field", theme: "emerald" },
      },
      Wednesday: {
        p1: { subject: "Science", teacher: "Rafael Ortiz", room: "Lab 02", theme: "emerald" },
        p2: { subject: "Bangla", teacher: "Priya Nair", room: "Room 12", theme: "amber" },
        p3: { subject: "English", teacher: "Jon Bell", room: "Room 12", theme: "purple" },
        p4: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 12", theme: "blue" },
        p5: { subject: "Library", teacher: "Nora Ellis", room: "Library", theme: "emerald" },
      },
      Thursday: {
        p1: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 12", theme: "blue" },
        p2: { subject: "Science", teacher: "Rafael Ortiz", room: "Lab 02", theme: "emerald" },
        p3: { subject: "Social Studies", teacher: "Priya Nair", room: "Room 12", theme: "amber" },
        p4: { subject: "Bangla", teacher: "Priya Nair", room: "Room 12", theme: "amber" },
        p5: { subject: "Music", teacher: "Mina Park", room: "Music Room", theme: "purple" },
      },
      Friday: {
        p1: { subject: "English", teacher: "Jon Bell", room: "Room 12", theme: "purple" },
        p2: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 12", theme: "blue" },
        p3: { subject: "Health & Wellbeing", teacher: "Sam Reed", room: "Room 12", theme: "emerald" },
        p4: { subject: "Science", teacher: "Rafael Ortiz", room: "Lab 02", theme: "emerald" },
        p5: { subject: "Club Hour", teacher: "Rotating staff", room: "Hall 01", theme: "purple" },
      },
    },
  },

  // 2. Grade 8 · Section A (From screenshot)
  {
    id: "g8-a",
    grade: "Grade 8",
    section: "Section A",
    fullName: "Grade 8 · Section A",
    classTeacher: "Maya Chen",
    room: "Room 18",
    studentCount: 32,
    schedule: {
      Monday: {
        p1: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 18", theme: "blue" },
        p2: { subject: "Higher Math", teacher: "Albert Einstein", room: "Room 18", theme: "blue" },
        p3: { subject: "English", teacher: "Jon Bell", room: "Room 18", theme: "purple" },
        p4: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Bangla Literature", teacher: "Farhana Sultana", room: "Room 18", theme: "amber" },
      },
      Tuesday: {
        p1: { subject: "Physics Intro", teacher: "Rafael Ortiz", room: "Lab 02", theme: "emerald" },
        p2: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 18", theme: "blue" },
        p3: { subject: "Bangla Grammar", teacher: "Farhana Sultana", room: "Room 18", theme: "amber" },
        p4: { subject: "ICT & Coding", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "Physical Training", teacher: "Sam Reed", room: "Playground", theme: "emerald" },
      },
      Wednesday: {
        p1: { subject: "English Grammar", teacher: "Jon Bell", room: "Room 18", theme: "purple" },
        p2: { subject: "Chemistry Basics", teacher: "Marie Curie", room: "Lab 03", theme: "emerald" },
        p3: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 18", theme: "blue" },
        p4: { subject: "Social Studies", teacher: "Priya Nair", room: "Room 18", theme: "amber" },
        p5: { subject: "Creative Arts", teacher: "Helen Moore", room: "Art Studio", theme: "amber" },
      },
      Thursday: {
        p1: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p2: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 18", theme: "blue" },
        p3: { subject: "English Spoken", teacher: "Jon Bell", room: "Language Lab", theme: "purple" },
        p4: { subject: "Moral Education", teacher: "Priya Nair", room: "Room 18", theme: "amber" },
        p5: { subject: "Debate & Speech", teacher: "Farhana Sultana", room: "Auditorium", theme: "purple" },
      },
      Friday: {
        p1: { subject: "Higher Math", teacher: "Albert Einstein", room: "Room 18", theme: "blue" },
        p2: { subject: "ICT Project", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p3: { subject: "Bangladesh Studies", teacher: "Priya Nair", room: "Room 18", theme: "amber" },
        p4: { subject: "Science Experiment", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Robotics & STEM", teacher: "Dr. Alan Turing", room: "Innovation Lab", theme: "blue" },
      },
    },
  },

  // 3. Grade 10 · Section B (From screenshot)
  {
    id: "g10-b",
    grade: "Grade 10",
    section: "Section B",
    fullName: "Grade 10 · Section B",
    classTeacher: "Rafael Ortiz",
    room: "Room 24",
    studentCount: 28,
    schedule: {
      Monday: {
        p1: { subject: "Physics", teacher: "Rafael Ortiz", room: "Physics Lab", theme: "emerald" },
        p2: { subject: "Chemistry", teacher: "Marie Curie", room: "Chem Lab", theme: "emerald" },
        p3: { subject: "Higher Math", teacher: "Mahmud Hasan", room: "Room 24", theme: "blue" },
        p4: { subject: "English 1st Paper", teacher: "Jon Bell", room: "Room 24", theme: "purple" },
        p5: { subject: "Bangla 1st Paper", teacher: "Farhana Sultana", room: "Room 24", theme: "amber" },
      },
      Tuesday: {
        p1: { subject: "Biology", teacher: "Dr. Charles Darwin", room: "Bio Lab", theme: "emerald" },
        p2: { subject: "Physics Lab", teacher: "Rafael Ortiz", room: "Lab 02", theme: "emerald" },
        p3: { subject: "General Mathematics", teacher: "Mahmud Hasan", room: "Room 24", theme: "blue" },
        p4: { subject: "ICT / Programming", teacher: "Sarah Jenkins", room: "Lab 01", theme: "purple" },
        p5: { subject: "English 2nd Paper", teacher: "Jon Bell", room: "Room 24", theme: "purple" },
      },
      Wednesday: {
        p1: { subject: "Chemistry Lab", teacher: "Marie Curie", room: "Chem Lab", theme: "emerald" },
        p2: { subject: "Higher Math Practice", teacher: "Mahmud Hasan", room: "Room 24", theme: "blue" },
        p3: { subject: "Bangla 2nd Paper", teacher: "Farhana Sultana", room: "Room 24", theme: "amber" },
        p4: { subject: "Bangladesh & Global", teacher: "Priya Nair", room: "Room 24", theme: "amber" },
        p5: { subject: "Career Education", teacher: "Maya Chen", room: "Room 24", theme: "purple" },
      },
      Thursday: {
        p1: { subject: "Physics Problem Solving", teacher: "Rafael Ortiz", room: "Room 24", theme: "emerald" },
        p2: { subject: "General Mathematics", teacher: "Mahmud Hasan", room: "Room 24", theme: "blue" },
        p3: { subject: "Biology Lab", teacher: "Dr. Charles Darwin", room: "Bio Lab", theme: "emerald" },
        p4: { subject: "English Writing", teacher: "Jon Bell", room: "Room 24", theme: "purple" },
        p5: { subject: "Religion & Ethics", teacher: "Priya Nair", room: "Room 24", theme: "amber" },
      },
      Friday: {
        p1: { subject: "Higher Math Advanced", teacher: "Mahmud Hasan", room: "Room 24", theme: "blue" },
        p2: { subject: "Chemistry Research", teacher: "Marie Curie", room: "Chem Lab", theme: "emerald" },
        p3: { subject: "ICT Practical", teacher: "Sarah Jenkins", room: "Lab 01", theme: "purple" },
        p4: { subject: "Model Test Review", teacher: "Rafael Ortiz", room: "Room 24", theme: "blue" },
        p5: { subject: "Study Hall & Guidance", teacher: "All Mentors", room: "Auditorium", theme: "amber" },
      },
    },
  },

  // 4. Grade 7 · Section A
  {
    id: "g7-a",
    grade: "Grade 7",
    section: "Section A",
    fullName: "Grade 7 · Section A",
    classTeacher: "Jon Bell",
    room: "Room 14",
    studentCount: 31,
    schedule: {
      Monday: {
        p1: { subject: "English", teacher: "Jon Bell", room: "Room 14", theme: "purple" },
        p2: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 14", theme: "blue" },
        p3: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p4: { subject: "Bangla", teacher: "Priya Nair", room: "Room 14", theme: "amber" },
        p5: { subject: "Art & Design", teacher: "Helen Moore", room: "Studio 01", theme: "amber" },
      },
      Tuesday: {
        p1: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 14", theme: "blue" },
        p2: { subject: "English Grammar", teacher: "Jon Bell", room: "Room 14", theme: "purple" },
        p3: { subject: "Social Science", teacher: "Priya Nair", room: "Room 14", theme: "amber" },
        p4: { subject: "ICT", teacher: "Sarah Jenkins", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Games & Sports", teacher: "Sam Reed", room: "Field", theme: "emerald" },
      },
      Wednesday: {
        p1: { subject: "Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p2: { subject: "Bangla Literature", teacher: "Priya Nair", room: "Room 14", theme: "amber" },
        p3: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 14", theme: "blue" },
        p4: { subject: "English", teacher: "Jon Bell", room: "Room 14", theme: "purple" },
        p5: { subject: "Library Session", teacher: "Nora Ellis", room: "Library", theme: "emerald" },
      },
      Thursday: {
        p1: { subject: "Bangla", teacher: "Priya Nair", room: "Room 14", theme: "amber" },
        p2: { subject: "Science Lab", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p3: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 14", theme: "blue" },
        p4: { subject: "Moral Science", teacher: "Priya Nair", room: "Room 14", theme: "amber" },
        p5: { subject: "Music & Drama", teacher: "Mina Park", room: "Music Room", theme: "purple" },
      },
      Friday: {
        p1: { subject: "English Speaking", teacher: "Jon Bell", room: "Room 14", theme: "purple" },
        p2: { subject: "Mathematics Quiz", teacher: "Maya Chen", room: "Room 14", theme: "blue" },
        p3: { subject: "Science Project", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p4: { subject: "ICT Lab", teacher: "Sarah Jenkins", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Co-curricular Club", teacher: "Staff", room: "Hall 02", theme: "purple" },
      },
    },
  },

  // 5. Grade 9 · Section A (Science)
  {
    id: "g9-a",
    grade: "Grade 9",
    section: "Section A",
    fullName: "Grade 9 · Section A",
    classTeacher: "Sarah Jenkins",
    room: "Room 22",
    studentCount: 34,
    schedule: {
      Monday: {
        p1: { subject: "General Math", teacher: "Mahmud Hasan", room: "Room 22", theme: "blue" },
        p2: { subject: "Physics", teacher: "Rafael Ortiz", room: "Lab 02", theme: "emerald" },
        p3: { subject: "Chemistry", teacher: "Marie Curie", room: "Chem Lab", theme: "emerald" },
        p4: { subject: "English", teacher: "Jon Bell", room: "Room 22", theme: "purple" },
        p5: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 22", theme: "amber" },
      },
      Tuesday: {
        p1: { subject: "Biology", teacher: "Dr. Charles Darwin", room: "Bio Lab", theme: "emerald" },
        p2: { subject: "Higher Math", teacher: "Mahmud Hasan", room: "Room 22", theme: "blue" },
        p3: { subject: "English 2nd", teacher: "Jon Bell", room: "Room 22", theme: "purple" },
        p4: { subject: "ICT Practical", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "Physical Education", teacher: "Sam Reed", room: "Gym", theme: "emerald" },
      },
      Wednesday: {
        p1: { subject: "Physics Lab", teacher: "Rafael Ortiz", room: "Physics Lab", theme: "emerald" },
        p2: { subject: "General Math", teacher: "Mahmud Hasan", room: "Room 22", theme: "blue" },
        p3: { subject: "Bangla 2nd", teacher: "Farhana Sultana", room: "Room 22", theme: "amber" },
        p4: { subject: "Chemistry Lab", teacher: "Marie Curie", room: "Chem Lab", theme: "emerald" },
        p5: { subject: "Bangladesh Studies", teacher: "Priya Nair", room: "Room 22", theme: "amber" },
      },
      Thursday: {
        p1: { subject: "Higher Math", teacher: "Mahmud Hasan", room: "Room 22", theme: "blue" },
        p2: { subject: "Biology Lab", teacher: "Dr. Charles Darwin", room: "Bio Lab", theme: "emerald" },
        p3: { subject: "English 1st", teacher: "Jon Bell", room: "Room 22", theme: "purple" },
        p4: { subject: "Religion & Ethics", teacher: "Priya Nair", room: "Room 22", theme: "amber" },
        p5: { subject: "Science Seminar", teacher: "Rafael Ortiz", room: "Auditorium", theme: "blue" },
      },
      Friday: {
        p1: { subject: "ICT Project", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p2: { subject: "Physics Theory", teacher: "Rafael Ortiz", room: "Room 22", theme: "emerald" },
        p3: { subject: "Chemistry Problem Set", teacher: "Marie Curie", room: "Room 22", theme: "emerald" },
        p4: { subject: "Math Tutorial", teacher: "Mahmud Hasan", room: "Room 22", theme: "blue" },
        p5: { subject: "Club Activity", teacher: "Faculty", room: "Hall 01", theme: "purple" },
      },
    },
  },
];
