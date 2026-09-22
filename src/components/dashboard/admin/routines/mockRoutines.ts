export interface GroupSubjectEntry {
  group: "Science" | "Arts" | "Commerce" | string;
  subject: string;
  teacher: string;
  room: string;
}

export interface PeriodSlot {
  subject: string;
  teacher: string;
  room: string;
  theme: "amber" | "blue" | "purple" | "emerald" | "rose" | "gray";
  isGroupPeriod?: boolean;
  groupSlots?: GroupSubjectEntry[];
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

  // ==================== CLASS 7 ====================
  // 3. Class 7 · Section A
  {
    id: "c7-a",
    grade: "Class 7",
    section: "Section A",
    fullName: "Class 7 · Section A",
    classTeacher: "Jon Bell",
    room: "Room 103",
    studentCount: 31,
    schedule: {
      Monday: {
        p1: { subject: "English", teacher: "Jon Bell", room: "Room 103", theme: "purple" },
        p2: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 103", theme: "blue" },
        p3: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p4: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 103", theme: "amber" },
        p5: { subject: "Art & Design", teacher: "Helen Moore", room: "Studio 01", theme: "amber" },
      },
      Tuesday: {
        p1: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 103", theme: "blue" },
        p2: { subject: "English Grammar", teacher: "Jon Bell", room: "Room 103", theme: "purple" },
        p3: { subject: "Social Science", teacher: "Priya Nair", room: "Room 103", theme: "amber" },
        p4: { subject: "ICT", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "Games & Sports", teacher: "Sam Reed", room: "Field", theme: "emerald" },
      },
      Wednesday: {
        p1: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p2: { subject: "Bangla Literature", teacher: "Farhana Sultana", room: "Room 103", theme: "amber" },
        p3: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 103", theme: "blue" },
        p4: { subject: "English", teacher: "Jon Bell", room: "Room 103", theme: "purple" },
        p5: { subject: "Library Session", teacher: "Nora Ellis", room: "Library", theme: "emerald" },
      },
      Thursday: {
        p1: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 103", theme: "amber" },
        p2: { subject: "Science Lab", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p3: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 103", theme: "blue" },
        p4: { subject: "Moral Science", teacher: "Priya Nair", room: "Room 103", theme: "amber" },
        p5: { subject: "Music & Drama", teacher: "Mina Park", room: "Music Room", theme: "purple" },
      },
      Friday: {
        p1: { subject: "English Speaking", teacher: "Jon Bell", room: "Room 103", theme: "purple" },
        p2: { subject: "Mathematics Quiz", teacher: "Maya Chen", room: "Room 103", theme: "blue" },
        p3: { subject: "Science Project", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p4: { subject: "ICT Lab", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "Co-curricular Club", teacher: "Staff", room: "Hall 02", theme: "purple" },
      },
    },
  },

  // 4. Class 7 · Section B
  {
    id: "c7-b",
    grade: "Class 7",
    section: "Section B",
    fullName: "Class 7 · Section B",
    classTeacher: "Rafael Ortiz",
    room: "Room 104",
    studentCount: 28,
    schedule: {
      Monday: {
        p1: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 104", theme: "blue" },
        p2: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p3: { subject: "English", teacher: "Jon Bell", room: "Room 104", theme: "purple" },
        p4: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 104", theme: "amber" },
        p5: { subject: "Social Studies", teacher: "Priya Nair", room: "Room 104", theme: "amber" },
      },
      Tuesday: {
        p1: { subject: "English", teacher: "Jon Bell", room: "Room 104", theme: "purple" },
        p2: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 104", theme: "amber" },
        p3: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 104", theme: "blue" },
        p4: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Art Studio", teacher: "Helen Moore", room: "Studio 01", theme: "amber" },
      },
      Wednesday: {
        p1: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 104", theme: "blue" },
        p2: { subject: "ICT / Coding", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p3: { subject: "English", teacher: "Jon Bell", room: "Room 104", theme: "purple" },
        p4: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Physical Training", teacher: "Sam Reed", room: "Playground", theme: "emerald" },
      },
      Thursday: {
        p1: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p2: { subject: "English Grammar", teacher: "Jon Bell", room: "Room 104", theme: "purple" },
        p3: { subject: "Social Studies", teacher: "Priya Nair", room: "Room 104", theme: "amber" },
        p4: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 104", theme: "blue" },
        p5: { subject: "Library Session", teacher: "Nora Ellis", room: "Library", theme: "emerald" },
      },
      Friday: {
        p1: { subject: "Bangla Literature", teacher: "Farhana Sultana", room: "Room 104", theme: "amber" },
        p2: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 104", theme: "blue" },
        p3: { subject: "English", teacher: "Jon Bell", room: "Room 104", theme: "purple" },
        p4: { subject: "Science Experiments", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Club Activity", teacher: "Staff", room: "Hall 02", theme: "purple" },
      },
    },
  },

  // ==================== CLASS 8 ====================
  // 5. Class 8 · Section A
  {
    id: "c8-a",
    grade: "Class 8",
    section: "Section A",
    fullName: "Class 8 · Section A",
    classTeacher: "Maya Chen",
    room: "Room 105",
    studentCount: 34,
    schedule: {
      Monday: {
        p1: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 105", theme: "blue" },
        p2: { subject: "Higher Math Intro", teacher: "Mahmud Hasan", room: "Room 105", theme: "blue" },
        p3: { subject: "English", teacher: "Jon Bell", room: "Room 105", theme: "purple" },
        p4: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Bangla Literature", teacher: "Farhana Sultana", room: "Room 105", theme: "amber" },
      },
      Tuesday: {
        p1: { subject: "Physics Foundations", teacher: "Rafael Ortiz", room: "Lab 02", theme: "emerald" },
        p2: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 105", theme: "blue" },
        p3: { subject: "Bangla Grammar", teacher: "Farhana Sultana", room: "Room 105", theme: "amber" },
        p4: { subject: "ICT & Coding", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "Physical Training", teacher: "Sam Reed", room: "Playground", theme: "emerald" },
      },
      Wednesday: {
        p1: { subject: "English Grammar", teacher: "Jon Bell", room: "Room 105", theme: "purple" },
        p2: { subject: "Chemistry Foundations", teacher: "Marie Curie", room: "Chem Lab", theme: "emerald" },
        p3: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 105", theme: "blue" },
        p4: { subject: "Social Studies", teacher: "Priya Nair", room: "Room 105", theme: "amber" },
        p5: { subject: "Creative Arts", teacher: "Helen Moore", room: "Art Studio", theme: "amber" },
      },
      Thursday: {
        p1: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p2: { subject: "Mathematics", teacher: "Maya Chen", room: "Room 105", theme: "blue" },
        p3: { subject: "English Spoken", teacher: "Jon Bell", room: "Room 105", theme: "purple" },
        p4: { subject: "Moral Education", teacher: "Priya Nair", room: "Room 105", theme: "amber" },
        p5: { subject: "Debate & Speech", teacher: "Farhana Sultana", room: "Auditorium", theme: "purple" },
      },
      Friday: {
        p1: { subject: "Higher Math Intro", teacher: "Mahmud Hasan", room: "Room 105", theme: "blue" },
        p2: { subject: "ICT Project", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p3: { subject: "Bangladesh Studies", teacher: "Priya Nair", room: "Room 105", theme: "amber" },
        p4: { subject: "Science Experiment", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Robotics & STEM", teacher: "Sarah Jenkins", room: "Innovation Lab", theme: "blue" },
      },
    },
  },

  // 6. Class 8 · Section B
  {
    id: "c8-b",
    grade: "Class 8",
    section: "Section B",
    fullName: "Class 8 · Section B",
    classTeacher: "Mahmud Hasan",
    room: "Room 106",
    studentCount: 33,
    schedule: {
      Monday: {
        p1: { subject: "English", teacher: "Jon Bell", room: "Room 106", theme: "purple" },
        p2: { subject: "Mathematics", teacher: "Mahmud Hasan", room: "Room 106", theme: "blue" },
        p3: { subject: "Bangla", teacher: "Farhana Sultana", room: "Room 106", theme: "amber" },
        p4: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p5: { subject: "Social Studies", teacher: "Priya Nair", room: "Room 106", theme: "amber" },
      },
      Tuesday: {
        p1: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p2: { subject: "English", teacher: "Jon Bell", room: "Room 106", theme: "purple" },
        p3: { subject: "Mathematics", teacher: "Mahmud Hasan", room: "Room 106", theme: "blue" },
        p4: { subject: "Bangla Grammar", teacher: "Farhana Sultana", room: "Room 106", theme: "amber" },
        p5: { subject: "Art & Craft", teacher: "Helen Moore", room: "Studio 01", theme: "amber" },
      },
      Wednesday: {
        p1: { subject: "Mathematics", teacher: "Mahmud Hasan", room: "Room 106", theme: "blue" },
        p2: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p3: { subject: "ICT & Coding", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p4: { subject: "English", teacher: "Jon Bell", room: "Room 106", theme: "purple" },
        p5: { subject: "Physical Education", teacher: "Sam Reed", room: "Field", theme: "emerald" },
      },
      Thursday: {
        p1: { subject: "Bangla Literature", teacher: "Farhana Sultana", room: "Room 106", theme: "amber" },
        p2: { subject: "Mathematics", teacher: "Mahmud Hasan", room: "Room 106", theme: "blue" },
        p3: { subject: "Social Studies", teacher: "Priya Nair", room: "Room 106", theme: "amber" },
        p4: { subject: "English", teacher: "Jon Bell", room: "Room 106", theme: "purple" },
        p5: { subject: "Library Session", teacher: "Nora Ellis", room: "Library", theme: "emerald" },
      },
      Friday: {
        p1: { subject: "Science Lab", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p2: { subject: "Mathematics", teacher: "Mahmud Hasan", room: "Room 106", theme: "blue" },
        p3: { subject: "English Grammar", teacher: "Jon Bell", room: "Room 106", theme: "purple" },
        p4: { subject: "ICT Practical", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "Club Activities", teacher: "Faculty", room: "Auditorium", theme: "purple" },
      },
    },
  },

  // ==================== CLASS 9 ====================
  // 7. Class 9 · Section A (Combined Master Routine with Sci / Arts / Com Electives)
  {
    id: "c9-a",
    grade: "Class 9",
    section: "Section A",
    fullName: "Class 9 · Section A",
    classTeacher: "Sarah Jenkins",
    room: "Room 107",
    studentCount: 35,
    schedule: {
      Monday: {
        p1: { subject: "General Math", teacher: "Mahmud Hasan", room: "Room 107", theme: "blue" },
        p2: {
          subject: "Group Electives (Physics / History / Accounting)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "blue",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Physics", teacher: "Rafael Ortiz", room: "Physics Lab" },
            { group: "Arts", subject: "History & Civics", teacher: "Farhana Sultana", room: "Room 201" },
            { group: "Commerce", subject: "Accounting", teacher: "Robert Kiyosaki", room: "Room 202" },
          ],
        },
        p3: {
          subject: "Group Electives (Chemistry / Geography / Finance)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "emerald",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Chemistry", teacher: "Marie Curie", room: "Chem Lab" },
            { group: "Arts", subject: "Geography", teacher: "Priya Nair", room: "Room 201" },
            { group: "Commerce", subject: "Finance & Banking", teacher: "Robert Kiyosaki", room: "Room 202" },
          ],
        },
        p4: { subject: "English 1st Paper", teacher: "Jon Bell", room: "Room 107", theme: "purple" },
        p5: { subject: "Bangla 1st Paper", teacher: "Farhana Sultana", room: "Room 107", theme: "amber" },
      },
      Tuesday: {
        p1: {
          subject: "Group Electives (Biology / Economics / Business Ent.)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "emerald",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Biology", teacher: "Dr. Charles Darwin", room: "Bio Lab" },
            { group: "Arts", subject: "Economics", teacher: "Priya Nair", room: "Room 201" },
            { group: "Commerce", subject: "Business Ent.", teacher: "Tanvir Ahmed", room: "Room 202" },
          ],
        },
        p2: {
          subject: "Group Electives (Higher Math / Social Work / Marketing)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "blue",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Higher Mathematics", teacher: "Mahmud Hasan", room: "Room 107" },
            { group: "Arts", subject: "Social Work", teacher: "Farhana Sultana", room: "Room 201" },
            { group: "Commerce", subject: "Marketing & Sales", teacher: "Robert Kiyosaki", room: "Room 202" },
          ],
        },
        p3: { subject: "English 2nd Paper", teacher: "Jon Bell", room: "Room 107", theme: "purple" },
        p4: { subject: "ICT Practical", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "Physical Education", teacher: "Sam Reed", room: "Gym", theme: "emerald" },
      },
      Wednesday: {
        p1: {
          subject: "Group Electives (Physics Lab / Islamic History / Statistics)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "emerald",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Physics Lab", teacher: "Rafael Ortiz", room: "Physics Lab" },
            { group: "Arts", subject: "Islamic History", teacher: "Farhana Sultana", room: "Room 201" },
            { group: "Commerce", subject: "Statistics", teacher: "Robert Kiyosaki", room: "Room 202" },
          ],
        },
        p2: { subject: "General Math", teacher: "Mahmud Hasan", room: "Room 107", theme: "blue" },
        p3: { subject: "Bangla 2nd Paper", teacher: "Farhana Sultana", room: "Room 107", theme: "amber" },
        p4: {
          subject: "Group Electives (Chemistry Lab / Civics / Accounting Practice)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "emerald",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Chemistry Lab", teacher: "Marie Curie", room: "Chem Lab" },
            { group: "Arts", subject: "Civics & Good Gov", teacher: "Priya Nair", room: "Room 201" },
            { group: "Commerce", subject: "Accounting Practice", teacher: "Robert Kiyosaki", room: "Room 202" },
          ],
        },
        p5: { subject: "Bangladesh Studies", teacher: "Priya Nair", room: "Room 107", theme: "amber" },
      },
      Thursday: {
        p1: {
          subject: "Group Electives (Higher Math / Logic / Finance)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "blue",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Higher Mathematics", teacher: "Mahmud Hasan", room: "Room 107" },
            { group: "Arts", subject: "Logic & Philosophy", teacher: "Farhana Sultana", room: "Room 201" },
            { group: "Commerce", subject: "Finance & Banking", teacher: "Robert Kiyosaki", room: "Room 202" },
          ],
        },
        p2: {
          subject: "Group Electives (Biology Lab / Geography Field / Business Case)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "emerald",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Biology Lab", teacher: "Dr. Charles Darwin", room: "Bio Lab" },
            { group: "Arts", subject: "Geography Map Lab", teacher: "Priya Nair", room: "Room 201" },
            { group: "Commerce", subject: "Business Case Studies", teacher: "Tanvir Ahmed", room: "Room 202" },
          ],
        },
        p3: { subject: "English 1st Paper", teacher: "Jon Bell", room: "Room 107", theme: "purple" },
        p4: { subject: "Religion & Ethics", teacher: "Priya Nair", room: "Room 107", theme: "amber" },
        p5: { subject: "Career Guidance", teacher: "Sarah Jenkins", room: "Auditorium", theme: "blue" },
      },
      Friday: {
        p1: { subject: "ICT Project", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p2: {
          subject: "Group Electives (Physics Theory / History Review / Commerce Quiz)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "emerald",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Physics Theory", teacher: "Rafael Ortiz", room: "Physics Lab" },
            { group: "Arts", subject: "History Review", teacher: "Farhana Sultana", room: "Room 201" },
            { group: "Commerce", subject: "Commerce Quiz", teacher: "Robert Kiyosaki", room: "Room 202" },
          ],
        },
        p3: {
          subject: "Group Electives (Chemistry Problem / Economics Workshop / Ent. Lab)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "emerald",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Chemistry Problem", teacher: "Marie Curie", room: "Chem Lab" },
            { group: "Arts", subject: "Economics Workshop", teacher: "Priya Nair", room: "Room 201" },
            { group: "Commerce", subject: "Entrepreneurship Lab", teacher: "Tanvir Ahmed", room: "Room 202" },
          ],
        },
        p4: { subject: "General Math Tutorial", teacher: "Mahmud Hasan", room: "Room 107", theme: "blue" },
        p5: { subject: "Club Activity", teacher: "Faculty", room: "Hall 01", theme: "purple" },
      },
    },
  },

  // 8. Class 9 · Section B (Combined Master Routine with Sci / Arts / Com Electives)
  {
    id: "c9-b",
    grade: "Class 9",
    section: "Section B",
    fullName: "Class 9 · Section B",
    classTeacher: "Priya Nair",
    room: "Room 108",
    studentCount: 30,
    schedule: {
      Monday: {
        p1: {
          subject: "Group Electives (Physics / History / Accounting)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "blue",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Physics", teacher: "Rafael Ortiz", room: "Physics Lab" },
            { group: "Arts", subject: "History & Civics", teacher: "Farhana Sultana", room: "Room 203" },
            { group: "Commerce", subject: "Accounting", teacher: "Robert Kiyosaki", room: "Room 204" },
          ],
        },
        p2: { subject: "General Math", teacher: "Maya Chen", room: "Room 108", theme: "blue" },
        p3: { subject: "English 1st Paper", teacher: "Jon Bell", room: "Room 108", theme: "purple" },
        p4: { subject: "Bangla 1st Paper", teacher: "Farhana Sultana", room: "Room 108", theme: "amber" },
        p5: {
          subject: "Group Electives (Chemistry / Geography / Finance)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "emerald",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Chemistry", teacher: "Marie Curie", room: "Chem Lab" },
            { group: "Arts", subject: "Geography", teacher: "Priya Nair", room: "Room 203" },
            { group: "Commerce", subject: "Finance & Banking", teacher: "Robert Kiyosaki", room: "Room 204" },
          ],
        },
      },
      Tuesday: {
        p1: {
          subject: "Group Electives (Biology / Economics / Business Ent.)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "emerald",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Biology", teacher: "Dr. Charles Darwin", room: "Bio Lab" },
            { group: "Arts", subject: "Economics", teacher: "Priya Nair", room: "Room 203" },
            { group: "Commerce", subject: "Business Ent.", teacher: "Tanvir Ahmed", room: "Room 204" },
          ],
        },
        p2: { subject: "General Science / Math", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p3: {
          subject: "Group Electives (Higher Math / Social Work / Marketing)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "blue",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Higher Mathematics", teacher: "Mahmud Hasan", room: "Room 108" },
            { group: "Arts", subject: "Social Work", teacher: "Farhana Sultana", room: "Room 203" },
            { group: "Commerce", subject: "Marketing Practice", teacher: "Robert Kiyosaki", room: "Room 204" },
          ],
        },
        p4: { subject: "ICT Practical", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "English 2nd Paper", teacher: "Jon Bell", room: "Room 108", theme: "purple" },
      },
      Wednesday: {
        p1: { subject: "General Math", teacher: "Maya Chen", room: "Room 108", theme: "blue" },
        p2: {
          subject: "Group Electives (Physics Lab / Islamic History / Statistics)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "emerald",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Physics Lab", teacher: "Rafael Ortiz", room: "Physics Lab" },
            { group: "Arts", subject: "Islamic History", teacher: "Farhana Sultana", room: "Room 203" },
            { group: "Commerce", subject: "Statistics", teacher: "Robert Kiyosaki", room: "Room 204" },
          ],
        },
        p3: { subject: "Bangla 2nd Paper", teacher: "Farhana Sultana", room: "Room 108", theme: "amber" },
        p4: {
          subject: "Group Electives (Chemistry Lab / Civics / Accounting Practice)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "emerald",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Chemistry Lab", teacher: "Marie Curie", room: "Chem Lab" },
            { group: "Arts", subject: "Civics & Good Gov", teacher: "Priya Nair", room: "Room 203" },
            { group: "Commerce", subject: "Accounting Practice", teacher: "Robert Kiyosaki", room: "Room 204" },
          ],
        },
        p5: { subject: "Bangladesh Studies", teacher: "Priya Nair", room: "Room 108", theme: "amber" },
      },
      Thursday: {
        p1: {
          subject: "Group Electives (Higher Math / Logic / Finance)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "blue",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Higher Mathematics", teacher: "Mahmud Hasan", room: "Room 108" },
            { group: "Arts", subject: "Logic & Philosophy", teacher: "Farhana Sultana", room: "Room 203" },
            { group: "Commerce", subject: "Finance & Banking", teacher: "Robert Kiyosaki", room: "Room 204" },
          ],
        },
        p2: { subject: "English 1st Paper", teacher: "Jon Bell", room: "Room 108", theme: "purple" },
        p3: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p4: { subject: "Religion & Ethics", teacher: "Priya Nair", room: "Room 108", theme: "amber" },
        p5: {
          subject: "Group Electives (Biology Lab / Geography / Business Workshop)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "blue",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Biology Lab", teacher: "Dr. Charles Darwin", room: "Bio Lab" },
            { group: "Arts", subject: "Geography Map Lab", teacher: "Priya Nair", room: "Room 203" },
            { group: "Commerce", subject: "Business Workshop", teacher: "Robert Kiyosaki", room: "Room 204" },
          ],
        },
      },
      Friday: {
        p1: {
          subject: "Group Electives (Physics Theory / History / Finance)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "blue",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Physics Problem Set", teacher: "Rafael Ortiz", room: "Physics Lab" },
            { group: "Arts", subject: "History Review", teacher: "Farhana Sultana", room: "Room 203" },
            { group: "Commerce", subject: "Finance Case Study", teacher: "Robert Kiyosaki", room: "Room 204" },
          ],
        },
        p2: { subject: "General Math Quiz", teacher: "Maya Chen", room: "Room 108", theme: "blue" },
        p3: { subject: "ICT Practical", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p4: { subject: "Bangla Essay Writing", teacher: "Farhana Sultana", room: "Room 108", theme: "amber" },
        p5: { subject: "Club Activity", teacher: "Faculty", room: "Hall 01", theme: "purple" },
      },
    },
  },

  // ==================== CLASS 10 ====================
  // 9. Class 10 · Section A (Combined Master Routine with Sci / Arts / Com Electives)
  {
    id: "c10-a",
    grade: "Class 10",
    section: "Section A",
    fullName: "Class 10 · Section A",
    classTeacher: "Rafael Ortiz",
    room: "Room 109",
    studentCount: 32,
    schedule: {
      Monday: {
        p1: {
          subject: "Group Electives (Physics / History / Accounting)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "emerald",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Physics", teacher: "Rafael Ortiz", room: "Physics Lab" },
            { group: "Arts", subject: "History & Civics", teacher: "Farhana Sultana", room: "Room 205" },
            { group: "Commerce", subject: "Accounting", teacher: "Robert Kiyosaki", room: "Room 206" },
          ],
        },
        p2: {
          subject: "Group Electives (Chemistry / Geography / Finance)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "emerald",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Chemistry", teacher: "Marie Curie", room: "Chem Lab" },
            { group: "Arts", subject: "Geography", teacher: "Priya Nair", room: "Room 205" },
            { group: "Commerce", subject: "Finance & Banking", teacher: "Robert Kiyosaki", room: "Room 206" },
          ],
        },
        p3: {
          subject: "Group Electives (Higher Math / Economics / Business Ent.)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "blue",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Higher Mathematics", teacher: "Mahmud Hasan", room: "Room 109" },
            { group: "Arts", subject: "Economics", teacher: "Priya Nair", room: "Room 205" },
            { group: "Commerce", subject: "Business Ent.", teacher: "Tanvir Ahmed", room: "Room 206" },
          ],
        },
        p4: { subject: "English 1st Paper", teacher: "Jon Bell", room: "Room 109", theme: "purple" },
        p5: { subject: "Bangla 1st Paper", teacher: "Farhana Sultana", room: "Room 109", theme: "amber" },
      },
      Tuesday: {
        p1: {
          subject: "Group Electives (Biology / Islamic History / Statistics)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "emerald",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Biology", teacher: "Dr. Charles Darwin", room: "Bio Lab" },
            { group: "Arts", subject: "Islamic History", teacher: "Farhana Sultana", room: "Room 205" },
            { group: "Commerce", subject: "Statistics", teacher: "Robert Kiyosaki", room: "Room 206" },
          ],
        },
        p2: {
          subject: "Group Electives (Physics Lab / Civics / Accounting Practice)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "emerald",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Physics Lab", teacher: "Rafael Ortiz", room: "Physics Lab" },
            { group: "Arts", subject: "Civics & Governance", teacher: "Priya Nair", room: "Room 205" },
            { group: "Commerce", subject: "Accounting Lab", teacher: "Robert Kiyosaki", room: "Room 206" },
          ],
        },
        p3: { subject: "General Mathematics", teacher: "Mahmud Hasan", room: "Room 109", theme: "blue" },
        p4: { subject: "ICT / Programming", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "English 2nd Paper", teacher: "Jon Bell", room: "Room 109", theme: "purple" },
      },
      Wednesday: {
        p1: {
          subject: "Group Electives (Chemistry Lab / Social Science / Marketing)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "emerald",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Chemistry Lab", teacher: "Marie Curie", room: "Chem Lab" },
            { group: "Arts", subject: "Social Studies Advanced", teacher: "Farhana Sultana", room: "Room 205" },
            { group: "Commerce", subject: "Marketing Analysis", teacher: "Robert Kiyosaki", room: "Room 206" },
          ],
        },
        p2: {
          subject: "Group Electives (Higher Math Practice / Logic / Finance)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "blue",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Higher Math Problem Solving", teacher: "Mahmud Hasan", room: "Room 109" },
            { group: "Arts", subject: "Logic & Philosophy", teacher: "Farhana Sultana", room: "Room 205" },
            { group: "Commerce", subject: "Finance & Investment", teacher: "Robert Kiyosaki", room: "Room 206" },
          ],
        },
        p3: { subject: "Bangla 2nd Paper", teacher: "Farhana Sultana", room: "Room 109", theme: "amber" },
        p4: { subject: "Bangladesh & Global", teacher: "Priya Nair", room: "Room 109", theme: "amber" },
        p5: { subject: "Career Guidance & Counseling", teacher: "Maya Chen", room: "Room 109", theme: "purple" },
      },
      Thursday: {
        p1: {
          subject: "Group Electives (Physics Theory / History Exam Prep / Accounting Problem)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "emerald",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Physics Problem Solving", teacher: "Rafael Ortiz", room: "Room 109" },
            { group: "Arts", subject: "History Exam Review", teacher: "Farhana Sultana", room: "Room 205" },
            { group: "Commerce", subject: "Accounting Problem Solving", teacher: "Robert Kiyosaki", room: "Room 206" },
          ],
        },
        p2: { subject: "General Mathematics", teacher: "Mahmud Hasan", room: "Room 109", theme: "blue" },
        p3: {
          subject: "Group Electives (Biology Lab / Geography / Business Ent.)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "emerald",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Biology Lab", teacher: "Dr. Charles Darwin", room: "Bio Lab" },
            { group: "Arts", subject: "Geography Map Reading", teacher: "Priya Nair", room: "Room 205" },
            { group: "Commerce", subject: "Business Ent. Case Studies", teacher: "Tanvir Ahmed", room: "Room 206" },
          ],
        },
        p4: { subject: "English Writing & Grammar", teacher: "Jon Bell", room: "Room 109", theme: "purple" },
        p5: { subject: "Religion & Ethics", teacher: "Priya Nair", room: "Room 109", theme: "amber" },
      },
      Friday: {
        p1: {
          subject: "Group Electives (Higher Math Advanced / Economics Review / Commerce Model)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "blue",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Higher Math Advanced", teacher: "Mahmud Hasan", room: "Room 109" },
            { group: "Arts", subject: "Economics Review", teacher: "Priya Nair", room: "Room 205" },
            { group: "Commerce", subject: "Commerce Model Test", teacher: "Robert Kiyosaki", room: "Room 206" },
          ],
        },
        p2: {
          subject: "Group Electives (Chemistry Research / Civics Seminar / Finance Lab)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "emerald",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Chemistry Research", teacher: "Marie Curie", room: "Chem Lab" },
            { group: "Arts", subject: "Civics & Law Seminar", teacher: "Farhana Sultana", room: "Room 205" },
            { group: "Commerce", subject: "Finance Project Lab", teacher: "Robert Kiyosaki", room: "Room 206" },
          ],
        },
        p3: { subject: "ICT Practical & Coding", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p4: { subject: "Math Model Test Review", teacher: "Rafael Ortiz", room: "Room 109", theme: "blue" },
        p5: { subject: "Study Hall & Guidance", teacher: "All Mentors", room: "Auditorium", theme: "amber" },
      },
    },
  },

  // 10. Class 10 · Section B (Combined Master Routine with Sci / Arts / Com Electives)
  {
    id: "c10-b",
    grade: "Class 10",
    section: "Section B",
    fullName: "Class 10 · Section B",
    classTeacher: "Mahmud Hasan",
    room: "Room 110",
    studentCount: 28,
    schedule: {
      Monday: {
        p1: {
          subject: "Group Electives (Physics / History / Accounting)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "blue",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Physics", teacher: "Rafael Ortiz", room: "Physics Lab" },
            { group: "Arts", subject: "History & Civics", teacher: "Farhana Sultana", room: "Room 207" },
            { group: "Commerce", subject: "Accounting", teacher: "Robert Kiyosaki", room: "Room 208" },
          ],
        },
        p2: {
          subject: "Group Electives (Chemistry / Geography / Business Ent.)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "amber",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Chemistry", teacher: "Marie Curie", room: "Chem Lab" },
            { group: "Arts", subject: "Geography", teacher: "Priya Nair", room: "Room 207" },
            { group: "Commerce", subject: "Business Ent.", teacher: "Tanvir Ahmed", room: "Room 208" },
          ],
        },
        p3: { subject: "General Math", teacher: "Mahmud Hasan", room: "Room 110", theme: "blue" },
        p4: { subject: "English 1st Paper", teacher: "Jon Bell", room: "Room 110", theme: "purple" },
        p5: { subject: "Bangla 1st Paper", teacher: "Farhana Sultana", room: "Room 110", theme: "amber" },
      },
      Tuesday: {
        p1: {
          subject: "Group Electives (Biology / Economics / Finance & Banking)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "blue",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Biology", teacher: "Dr. Charles Darwin", room: "Bio Lab" },
            { group: "Arts", subject: "Economics", teacher: "Priya Nair", room: "Room 207" },
            { group: "Commerce", subject: "Finance & Banking", teacher: "Robert Kiyosaki", room: "Room 208" },
          ],
        },
        p2: { subject: "General Science", teacher: "Rafael Ortiz", room: "Lab 01", theme: "emerald" },
        p3: { subject: "General Math", teacher: "Mahmud Hasan", room: "Room 110", theme: "blue" },
        p4: { subject: "ICT / Programming", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p5: { subject: "English 2nd Paper", teacher: "Jon Bell", room: "Room 110", theme: "purple" },
      },
      Wednesday: {
        p1: {
          subject: "Group Electives (Physics Lab / Civics / Accounting Practice)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "blue",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Physics Lab", teacher: "Rafael Ortiz", room: "Physics Lab" },
            { group: "Arts", subject: "Civics & Governance", teacher: "Farhana Sultana", room: "Room 207" },
            { group: "Commerce", subject: "Accounting Practice", teacher: "Robert Kiyosaki", room: "Room 208" },
          ],
        },
        p2: { subject: "General Math Practice", teacher: "Mahmud Hasan", room: "Room 110", theme: "blue" },
        p3: { subject: "Bangla 2nd Paper", teacher: "Farhana Sultana", room: "Room 110", theme: "amber" },
        p4: { subject: "Bangladesh & Global", teacher: "Priya Nair", room: "Room 110", theme: "amber" },
        p5: {
          subject: "Group Electives (Chemistry Lab / Islamic History / Economics)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "blue",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Chemistry Lab", teacher: "Marie Curie", room: "Chem Lab" },
            { group: "Arts", subject: "Islamic History", teacher: "Farhana Sultana", room: "Room 207" },
            { group: "Commerce", subject: "Economics Applied", teacher: "Robert Kiyosaki", room: "Room 208" },
          ],
        },
      },
      Thursday: {
        p1: {
          subject: "Group Electives (Higher Math / Logic / Finance Practical)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "blue",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Higher Mathematics", teacher: "Mahmud Hasan", room: "Room 110" },
            { group: "Arts", subject: "Logic & Philosophy", teacher: "Farhana Sultana", room: "Room 207" },
            { group: "Commerce", subject: "Finance Practical", teacher: "Robert Kiyosaki", room: "Room 208" },
          ],
        },
        p2: { subject: "General Math", teacher: "Mahmud Hasan", room: "Room 110", theme: "blue" },
        p3: {
          subject: "Group Electives (Biology Lab / Geography / Business Case)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "amber",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Biology Lab", teacher: "Dr. Charles Darwin", room: "Bio Lab" },
            { group: "Arts", subject: "Geography Map Lab", teacher: "Priya Nair", room: "Room 207" },
            { group: "Commerce", subject: "Business Case Studies", teacher: "Tanvir Ahmed", room: "Room 208" },
          ],
        },
        p4: { subject: "English Writing", teacher: "Jon Bell", room: "Room 110", theme: "purple" },
        p5: { subject: "Religion & Ethics", teacher: "Priya Nair", room: "Room 110", theme: "amber" },
      },
      Friday: {
        p1: {
          subject: "Group Electives (Physics Theory / History / Commerce Model)",
          teacher: "Multi Teachers",
          room: "Labs & Rooms",
          theme: "blue",
          isGroupPeriod: true,
          groupSlots: [
            { group: "Science", subject: "Physics Theory Review", teacher: "Rafael Ortiz", room: "Physics Lab" },
            { group: "Arts", subject: "History Review", teacher: "Farhana Sultana", room: "Room 207" },
            { group: "Commerce", subject: "Commerce Model Test", teacher: "Robert Kiyosaki", room: "Room 208" },
          ],
        },
        p2: { subject: "Math Model Test Review", teacher: "Mahmud Hasan", room: "Room 110", theme: "blue" },
        p3: { subject: "ICT Practical", teacher: "Sarah Jenkins", room: "Computer Lab", theme: "purple" },
        p4: { subject: "English Final Prep", teacher: "Jon Bell", room: "Room 110", theme: "purple" },
        p5: { subject: "Study Hall & Guidance", teacher: "All Mentors", room: "Auditorium", theme: "amber" },
      },
    },
  },
];
