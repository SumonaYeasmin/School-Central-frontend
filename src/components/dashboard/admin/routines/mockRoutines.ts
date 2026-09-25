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
    Sunday: DaySchedule;
    Monday: DaySchedule;
    Tuesday: DaySchedule;
    Wednesday: DaySchedule;
    Thursday: DaySchedule;
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

export const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"] as const;

export const CLASSES_LIST = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"] as const;

export const GROUP_SUBJECT_PRESETS = {
  Science: [
    "Physics",
    "Chemistry",
    "Biology",
    "Higher Mathematics",
  ],
  Arts: [
    "History & World Civilization",
    "Geography & Environment",
    "Civics & Citizenship",
    "Economics",
  ],
  Commerce: [
    "Accounting",
    "Finance & Banking",
    "Business Entrepreneurship",
  ],
};

export const AVAILABLE_ROOMS = [
  "Physics Lab",
  "Chemistry Lab",
  "Biology Lab",
  "Science Lab 01",
  "Science Lab 02",
  "ICT / Computer Lab",
  "Room 101",
  "Room 102",
  "Room 103",
  "Room 104",
  "Room 105",
  "Room 201",
  "Room 202",
  "Room 203",
  "Room 204",
  "Room 205",
  "Room 301",
  "Room 302",
  "Room 303",
  "Room 401",
  "Room 402",
  "Room 501",
  "Room 502",
  "Library Room",
  "Auditorium",
];

export const MOCK_ROUTINES: SectionRoutine[] = [
  {
    "id": "c10-a",
    "grade": "Class 10",
    "section": "Section A",
    "fullName": "Class 10 · Section A",
    "classTeacher": "Anisur Rahman",
    "room": "Room 501",
    "studentCount": 24,
    "schedule": {
      "Sunday": {
        "p1": {
          "subject": "গণিত",
          "teacher": "Anisur Rahman",
          "room": "Room 501",
          "theme": "blue"
        },
        "p2": {
          "subject": "পদার্থবিজ্ঞান",
          "teacher": "Rafael Ortiz",
          "room": "Room 501",
          "theme": "emerald"
        },
        "p3": {
          "subject": "হিসাববিজ্ঞান",
          "teacher": "Robert Kiyosaki",
          "room": "Room 501",
          "theme": "emerald"
        },
        "p4": {
          "subject": "জীববিজ্ঞান",
          "teacher": "Dr. Charles Darwin",
          "room": "Room 501",
          "theme": "emerald"
        },
        "p5": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 501",
          "theme": "purple"
        }
      },
      "Monday": {
        "p1": {
          "subject": "English For Today",
          "teacher": "Priya Nair",
          "room": "Room 501",
          "theme": "purple"
        },
        "p2": {
          "subject": "রসায়ন",
          "teacher": "Marie Curie",
          "room": "Room 501",
          "theme": "gray"
        },
        "p3": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 501",
          "theme": "amber"
        },
        "p4": {
          "subject": "ভূগোল ও পরিবেশ",
          "teacher": "Sarah Jenkins",
          "room": "Room 501",
          "theme": "rose"
        },
        "p5": {
          "subject": "শারীরিক শিক্ষা, স্বাস্থ্যবিজ্ঞান ও খেলাধুলা",
          "teacher": "Subrata Roy",
          "room": "Room 501",
          "theme": "emerald"
        }
      },
      "Tuesday": {
        "p1": {
          "subject": "জীববিজ্ঞান",
          "teacher": "Dr. Charles Darwin",
          "room": "Room 501",
          "theme": "emerald"
        },
        "p2": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 501",
          "theme": "purple"
        },
        "p3": {
          "subject": "ধর্ম ও নৈতিক শিক্ষা",
          "teacher": "Mahbubur Rahman",
          "room": "Room 501",
          "theme": "amber"
        },
        "p4": {
          "subject": "উচ্চতর গণিত",
          "teacher": "Akash",
          "room": "Room 501",
          "theme": "blue"
        },
        "p5": {
          "subject": "বাংলা সাহিত্য",
          "teacher": "Farhana Sultana",
          "room": "Room 501",
          "theme": "amber"
        }
      },
      "Wednesday": {
        "p1": {
          "subject": "ভূগোল ও পরিবেশ",
          "teacher": "Sarah Jenkins",
          "room": "Room 501",
          "theme": "rose"
        },
        "p2": {
          "subject": "শারীরিক শিক্ষা, স্বাস্থ্যবিজ্ঞান ও খেলাধুলা",
          "teacher": "Subrata Roy",
          "room": "Room 501",
          "theme": "emerald"
        },
        "p3": {
          "subject": "গণিত",
          "teacher": "Anisur Rahman",
          "room": "Room 501",
          "theme": "blue"
        },
        "p4": {
          "subject": "পদার্থবিজ্ঞান",
          "teacher": "Rafael Ortiz",
          "room": "Room 501",
          "theme": "emerald"
        },
        "p5": {
          "subject": "হিসাববিজ্ঞান",
          "teacher": "Robert Kiyosaki",
          "room": "Room 501",
          "theme": "emerald"
        }
      },
      "Thursday": {
        "p1": {
          "subject": "উচ্চতর গণিত",
          "teacher": "Akash",
          "room": "Room 501",
          "theme": "blue"
        },
        "p2": {
          "subject": "বাংলা সাহিত্য",
          "teacher": "Farhana Sultana",
          "room": "Room 501",
          "theme": "amber"
        },
        "p3": {
          "subject": "English For Today",
          "teacher": "Priya Nair",
          "room": "Room 501",
          "theme": "purple"
        },
        "p4": {
          "subject": "রসায়ন",
          "teacher": "Marie Curie",
          "room": "Room 501",
          "theme": "gray"
        },
        "p5": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 501",
          "theme": "amber"
        }
      }
    }
  },
  {
    "id": "c10-b",
    "grade": "Class 10",
    "section": "Section B",
    "fullName": "Class 10 · Section B",
    "classTeacher": "Farhana Sultana",
    "room": "Room 502",
    "studentCount": 24,
    "schedule": {
      "Sunday": {
        "p1": {
          "subject": "বাংলা সাহিত্য",
          "teacher": "Farhana Sultana",
          "room": "Room 502",
          "theme": "amber"
        },
        "p2": {
          "subject": "English For Today",
          "teacher": "Priya Nair",
          "room": "Room 502",
          "theme": "purple"
        },
        "p3": {
          "subject": "রসায়ন",
          "teacher": "Marie Curie",
          "room": "Room 502",
          "theme": "gray"
        },
        "p4": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 502",
          "theme": "amber"
        },
        "p5": {
          "subject": "ভূগোল ও পরিবেশ",
          "teacher": "Sarah Jenkins",
          "room": "Room 502",
          "theme": "rose"
        }
      },
      "Monday": {
        "p1": {
          "subject": "হিসাববিজ্ঞান",
          "teacher": "Robert Kiyosaki",
          "room": "Room 502",
          "theme": "emerald"
        },
        "p2": {
          "subject": "জীববিজ্ঞান",
          "teacher": "Dr. Charles Darwin",
          "room": "Room 502",
          "theme": "emerald"
        },
        "p3": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 502",
          "theme": "purple"
        },
        "p4": {
          "subject": "ধর্ম ও নৈতিক শিক্ষা",
          "teacher": "Mahbubur Rahman",
          "room": "Room 502",
          "theme": "amber"
        },
        "p5": {
          "subject": "উচ্চতর গণিত",
          "teacher": "Akash",
          "room": "Room 502",
          "theme": "blue"
        }
      },
      "Tuesday": {
        "p1": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 502",
          "theme": "amber"
        },
        "p2": {
          "subject": "ভূগোল ও পরিবেশ",
          "teacher": "Sarah Jenkins",
          "room": "Room 502",
          "theme": "rose"
        },
        "p3": {
          "subject": "শারীরিক শিক্ষা, স্বাস্থ্যবিজ্ঞান ও খেলাধুলা",
          "teacher": "Subrata Roy",
          "room": "Room 502",
          "theme": "emerald"
        },
        "p4": {
          "subject": "গণিত",
          "teacher": "Anisur Rahman",
          "room": "Room 502",
          "theme": "blue"
        },
        "p5": {
          "subject": "পদার্থবিজ্ঞান",
          "teacher": "Rafael Ortiz",
          "room": "Room 502",
          "theme": "emerald"
        }
      },
      "Wednesday": {
        "p1": {
          "subject": "ধর্ম ও নৈতিক শিক্ষা",
          "teacher": "Mahbubur Rahman",
          "room": "Room 502",
          "theme": "amber"
        },
        "p2": {
          "subject": "উচ্চতর গণিত",
          "teacher": "Akash",
          "room": "Room 502",
          "theme": "blue"
        },
        "p3": {
          "subject": "বাংলা সাহিত্য",
          "teacher": "Farhana Sultana",
          "room": "Room 502",
          "theme": "amber"
        },
        "p4": {
          "subject": "English For Today",
          "teacher": "Priya Nair",
          "room": "Room 502",
          "theme": "purple"
        },
        "p5": {
          "subject": "রসায়ন",
          "teacher": "Marie Curie",
          "room": "Room 502",
          "theme": "gray"
        }
      },
      "Thursday": {
        "p1": {
          "subject": "গণিত",
          "teacher": "Anisur Rahman",
          "room": "Room 502",
          "theme": "blue"
        },
        "p2": {
          "subject": "পদার্থবিজ্ঞান",
          "teacher": "Rafael Ortiz",
          "room": "Room 502",
          "theme": "emerald"
        },
        "p3": {
          "subject": "হিসাববিজ্ঞান",
          "teacher": "Robert Kiyosaki",
          "room": "Room 502",
          "theme": "emerald"
        },
        "p4": {
          "subject": "জীববিজ্ঞান",
          "teacher": "Dr. Charles Darwin",
          "room": "Room 502",
          "theme": "emerald"
        },
        "p5": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 502",
          "theme": "purple"
        }
      }
    }
  },
  {
    "id": "c6-a",
    "grade": "Class 6",
    "section": "Section A",
    "fullName": "Class 6 · Section A",
    "classTeacher": "Rafael Ortiz",
    "room": "Room 101",
    "studentCount": 32,
    "schedule": {
      "Sunday": {
        "p1": {
          "subject": "গার্হস্থ্যবিজ্ঞান",
          "teacher": "Rafael Ortiz",
          "room": "Room 101",
          "theme": "emerald"
        },
        "p2": {
          "subject": "কর্ম ও জীবনমুখী শিক্ষা",
          "teacher": "Robert Kiyosaki",
          "room": "Room 101",
          "theme": "emerald"
        },
        "p3": {
          "subject": "গার্হস্থ্যবিজ্ঞান",
          "teacher": "Dr. Charles Darwin",
          "room": "Room 101",
          "theme": "emerald"
        },
        "p4": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 101",
          "theme": "purple"
        },
        "p5": {
          "subject": "ধর্ম ও নৈতিক শিক্ষা",
          "teacher": "Mahbubur Rahman",
          "room": "Room 101",
          "theme": "amber"
        }
      },
      "Monday": {
        "p1": {
          "subject": "গার্হস্থ্যবিজ্ঞান",
          "teacher": "Marie Curie",
          "room": "Room 101",
          "theme": "emerald"
        },
        "p2": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 101",
          "theme": "amber"
        },
        "p3": {
          "subject": "কৃষিশিক্ষা",
          "teacher": "Sarah Jenkins",
          "room": "Room 101",
          "theme": "gray"
        },
        "p4": {
          "subject": "শারীরিক শিক্ষা ও স্বাস্থ্য",
          "teacher": "Subrata Roy",
          "room": "Room 101",
          "theme": "gray"
        },
        "p5": {
          "subject": "গণিত",
          "teacher": "Anisur Rahman",
          "room": "Room 101",
          "theme": "blue"
        }
      },
      "Tuesday": {
        "p1": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 101",
          "theme": "purple"
        },
        "p2": {
          "subject": "ধর্ম ও নৈতিক শিক্ষা",
          "teacher": "Mahbubur Rahman",
          "room": "Room 101",
          "theme": "amber"
        },
        "p3": {
          "subject": "গার্হস্থ্যবিজ্ঞান",
          "teacher": "Akash",
          "room": "Room 101",
          "theme": "emerald"
        },
        "p4": {
          "subject": "বাংলা ব্যাকরণ ও নির্মিতি",
          "teacher": "Farhana Sultana",
          "room": "Room 101",
          "theme": "amber"
        },
        "p5": {
          "subject": "English For Today",
          "teacher": "Priya Nair",
          "room": "Room 101",
          "theme": "purple"
        }
      },
      "Wednesday": {
        "p1": {
          "subject": "শারীরিক শিক্ষা ও স্বাস্থ্য",
          "teacher": "Subrata Roy",
          "room": "Room 101",
          "theme": "gray"
        },
        "p2": {
          "subject": "গণিত",
          "teacher": "Anisur Rahman",
          "room": "Room 101",
          "theme": "blue"
        },
        "p3": {
          "subject": "গার্হস্থ্যবিজ্ঞান",
          "teacher": "Rafael Ortiz",
          "room": "Room 101",
          "theme": "emerald"
        },
        "p4": {
          "subject": "কর্ম ও জীবনমুখী শিক্ষা",
          "teacher": "Robert Kiyosaki",
          "room": "Room 101",
          "theme": "emerald"
        },
        "p5": {
          "subject": "গার্হস্থ্যবিজ্ঞান",
          "teacher": "Dr. Charles Darwin",
          "room": "Room 101",
          "theme": "emerald"
        }
      },
      "Thursday": {
        "p1": {
          "subject": "বাংলা ব্যাকরণ ও নির্মিতি",
          "teacher": "Farhana Sultana",
          "room": "Room 101",
          "theme": "amber"
        },
        "p2": {
          "subject": "English For Today",
          "teacher": "Priya Nair",
          "room": "Room 101",
          "theme": "purple"
        },
        "p3": {
          "subject": "গার্হস্থ্যবিজ্ঞান",
          "teacher": "Marie Curie",
          "room": "Room 101",
          "theme": "emerald"
        },
        "p4": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 101",
          "theme": "amber"
        },
        "p5": {
          "subject": "কৃষিশিক্ষা",
          "teacher": "Sarah Jenkins",
          "room": "Room 101",
          "theme": "gray"
        }
      }
    }
  },
  {
    "id": "c6-b",
    "grade": "Class 6",
    "section": "Section B",
    "fullName": "Class 6 · Section B",
    "classTeacher": "Priya Nair",
    "room": "Room 102",
    "studentCount": 32,
    "schedule": {
      "Sunday": {
        "p1": {
          "subject": "English For Today",
          "teacher": "Priya Nair",
          "room": "Room 102",
          "theme": "purple"
        },
        "p2": {
          "subject": "গার্হস্থ্যবিজ্ঞান",
          "teacher": "Marie Curie",
          "room": "Room 102",
          "theme": "emerald"
        },
        "p3": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 102",
          "theme": "amber"
        },
        "p4": {
          "subject": "কৃষিশিক্ষা",
          "teacher": "Sarah Jenkins",
          "room": "Room 102",
          "theme": "gray"
        },
        "p5": {
          "subject": "শারীরিক শিক্ষা ও স্বাস্থ্য",
          "teacher": "Subrata Roy",
          "room": "Room 102",
          "theme": "gray"
        }
      },
      "Monday": {
        "p1": {
          "subject": "গার্হস্থ্যবিজ্ঞান",
          "teacher": "Dr. Charles Darwin",
          "room": "Room 102",
          "theme": "emerald"
        },
        "p2": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 102",
          "theme": "purple"
        },
        "p3": {
          "subject": "ধর্ম ও নৈতিক শিক্ষা",
          "teacher": "Mahbubur Rahman",
          "room": "Room 102",
          "theme": "amber"
        },
        "p4": {
          "subject": "গার্হস্থ্যবিজ্ঞান",
          "teacher": "Akash",
          "room": "Room 102",
          "theme": "emerald"
        },
        "p5": {
          "subject": "বাংলা ব্যাকরণ ও নির্মিতি",
          "teacher": "Farhana Sultana",
          "room": "Room 102",
          "theme": "amber"
        }
      },
      "Tuesday": {
        "p1": {
          "subject": "কৃষিশিক্ষা",
          "teacher": "Sarah Jenkins",
          "room": "Room 102",
          "theme": "gray"
        },
        "p2": {
          "subject": "শারীরিক শিক্ষা ও স্বাস্থ্য",
          "teacher": "Subrata Roy",
          "room": "Room 102",
          "theme": "gray"
        },
        "p3": {
          "subject": "গণিত",
          "teacher": "Anisur Rahman",
          "room": "Room 102",
          "theme": "blue"
        },
        "p4": {
          "subject": "গার্হস্থ্যবিজ্ঞান",
          "teacher": "Rafael Ortiz",
          "room": "Room 102",
          "theme": "emerald"
        },
        "p5": {
          "subject": "কর্ম ও জীবনমুখী শিক্ষা",
          "teacher": "Robert Kiyosaki",
          "room": "Room 102",
          "theme": "emerald"
        }
      },
      "Wednesday": {
        "p1": {
          "subject": "গার্হস্থ্যবিজ্ঞান",
          "teacher": "Akash",
          "room": "Room 102",
          "theme": "emerald"
        },
        "p2": {
          "subject": "বাংলা ব্যাকরণ ও নির্মিতি",
          "teacher": "Farhana Sultana",
          "room": "Room 102",
          "theme": "amber"
        },
        "p3": {
          "subject": "English For Today",
          "teacher": "Priya Nair",
          "room": "Room 102",
          "theme": "purple"
        },
        "p4": {
          "subject": "গার্হস্থ্যবিজ্ঞান",
          "teacher": "Marie Curie",
          "room": "Room 102",
          "theme": "emerald"
        },
        "p5": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 102",
          "theme": "amber"
        }
      },
      "Thursday": {
        "p1": {
          "subject": "গার্হস্থ্যবিজ্ঞান",
          "teacher": "Rafael Ortiz",
          "room": "Room 102",
          "theme": "emerald"
        },
        "p2": {
          "subject": "কর্ম ও জীবনমুখী শিক্ষা",
          "teacher": "Robert Kiyosaki",
          "room": "Room 102",
          "theme": "emerald"
        },
        "p3": {
          "subject": "গার্হস্থ্যবিজ্ঞান",
          "teacher": "Dr. Charles Darwin",
          "room": "Room 102",
          "theme": "emerald"
        },
        "p4": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 102",
          "theme": "purple"
        },
        "p5": {
          "subject": "ধর্ম ও নৈতিক শিক্ষা",
          "teacher": "Mahbubur Rahman",
          "room": "Room 102",
          "theme": "amber"
        }
      }
    }
  },
  {
    "id": "c7-a",
    "grade": "Class 7",
    "section": "Section A",
    "fullName": "Class 7 · Section A",
    "classTeacher": "Robert Kiyosaki",
    "room": "Room 201",
    "studentCount": 28,
    "schedule": {
      "Sunday": {
        "p1": {
          "subject": "কর্ম ও জীবনমুখী শিক্ষা",
          "teacher": "Robert Kiyosaki",
          "room": "Room 201",
          "theme": "emerald"
        },
        "p2": {
          "subject": "বিজ্ঞান",
          "teacher": "Dr. Charles Darwin",
          "room": "Room 201",
          "theme": "emerald"
        },
        "p3": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 201",
          "theme": "purple"
        },
        "p4": {
          "subject": "ধর্ম ও নৈতিক শিক্ষা",
          "teacher": "Mahbubur Rahman",
          "room": "Room 201",
          "theme": "amber"
        },
        "p5": {
          "subject": "বিজ্ঞান",
          "teacher": "Akash",
          "room": "Room 201",
          "theme": "emerald"
        }
      },
      "Monday": {
        "p1": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 201",
          "theme": "amber"
        },
        "p2": {
          "subject": "কৃষিশিক্ষা",
          "teacher": "Sarah Jenkins",
          "room": "Room 201",
          "theme": "gray"
        },
        "p3": {
          "subject": "শারীরিক শিক্ষা ও স্বাস্থ্য",
          "teacher": "Subrata Roy",
          "room": "Room 201",
          "theme": "gray"
        },
        "p4": {
          "subject": "গণিত",
          "teacher": "Anisur Rahman",
          "room": "Room 201",
          "theme": "blue"
        },
        "p5": {
          "subject": "বিজ্ঞান",
          "teacher": "Rafael Ortiz",
          "room": "Room 201",
          "theme": "emerald"
        }
      },
      "Tuesday": {
        "p1": {
          "subject": "ধর্ম ও নৈতিক শিক্ষা",
          "teacher": "Mahbubur Rahman",
          "room": "Room 201",
          "theme": "amber"
        },
        "p2": {
          "subject": "বিজ্ঞান",
          "teacher": "Akash",
          "room": "Room 201",
          "theme": "emerald"
        },
        "p3": {
          "subject": "বাংলা ব্যাকরণ ও নির্মিতি",
          "teacher": "Farhana Sultana",
          "room": "Room 201",
          "theme": "amber"
        },
        "p4": {
          "subject": "English For Today",
          "teacher": "Priya Nair",
          "room": "Room 201",
          "theme": "purple"
        },
        "p5": {
          "subject": "বিজ্ঞান",
          "teacher": "Marie Curie",
          "room": "Room 201",
          "theme": "emerald"
        }
      },
      "Wednesday": {
        "p1": {
          "subject": "গণিত",
          "teacher": "Anisur Rahman",
          "room": "Room 201",
          "theme": "blue"
        },
        "p2": {
          "subject": "বিজ্ঞান",
          "teacher": "Rafael Ortiz",
          "room": "Room 201",
          "theme": "emerald"
        },
        "p3": {
          "subject": "কর্ম ও জীবনমুখী শিক্ষা",
          "teacher": "Robert Kiyosaki",
          "room": "Room 201",
          "theme": "emerald"
        },
        "p4": {
          "subject": "বিজ্ঞান",
          "teacher": "Dr. Charles Darwin",
          "room": "Room 201",
          "theme": "emerald"
        },
        "p5": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 201",
          "theme": "purple"
        }
      },
      "Thursday": {
        "p1": {
          "subject": "English For Today",
          "teacher": "Priya Nair",
          "room": "Room 201",
          "theme": "purple"
        },
        "p2": {
          "subject": "বিজ্ঞান",
          "teacher": "Marie Curie",
          "room": "Room 201",
          "theme": "emerald"
        },
        "p3": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 201",
          "theme": "amber"
        },
        "p4": {
          "subject": "কৃষিশিক্ষা",
          "teacher": "Sarah Jenkins",
          "room": "Room 201",
          "theme": "gray"
        },
        "p5": {
          "subject": "শারীরিক শিক্ষা ও স্বাস্থ্য",
          "teacher": "Subrata Roy",
          "room": "Room 201",
          "theme": "gray"
        }
      }
    }
  },
  {
    "id": "c7-b",
    "grade": "Class 7",
    "section": "Section B",
    "fullName": "Class 7 · Section B",
    "classTeacher": "Marie Curie",
    "room": "Room 202",
    "studentCount": 28,
    "schedule": {
      "Sunday": {
        "p1": {
          "subject": "বিজ্ঞান",
          "teacher": "Marie Curie",
          "room": "Room 202",
          "theme": "emerald"
        },
        "p2": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 202",
          "theme": "amber"
        },
        "p3": {
          "subject": "কৃষিশিক্ষা",
          "teacher": "Sarah Jenkins",
          "room": "Room 202",
          "theme": "gray"
        },
        "p4": {
          "subject": "শারীরিক শিক্ষা ও স্বাস্থ্য",
          "teacher": "Subrata Roy",
          "room": "Room 202",
          "theme": "gray"
        },
        "p5": {
          "subject": "গণিত",
          "teacher": "Anisur Rahman",
          "room": "Room 202",
          "theme": "blue"
        }
      },
      "Monday": {
        "p1": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 202",
          "theme": "purple"
        },
        "p2": {
          "subject": "ধর্ম ও নৈতিক শিক্ষা",
          "teacher": "Mahbubur Rahman",
          "room": "Room 202",
          "theme": "amber"
        },
        "p3": {
          "subject": "বিজ্ঞান",
          "teacher": "Akash",
          "room": "Room 202",
          "theme": "emerald"
        },
        "p4": {
          "subject": "বাংলা ব্যাকরণ ও নির্মিতি",
          "teacher": "Farhana Sultana",
          "room": "Room 202",
          "theme": "amber"
        },
        "p5": {
          "subject": "English For Today",
          "teacher": "Priya Nair",
          "room": "Room 202",
          "theme": "purple"
        }
      },
      "Tuesday": {
        "p1": {
          "subject": "শারীরিক শিক্ষা ও স্বাস্থ্য",
          "teacher": "Subrata Roy",
          "room": "Room 202",
          "theme": "gray"
        },
        "p2": {
          "subject": "গণিত",
          "teacher": "Anisur Rahman",
          "room": "Room 202",
          "theme": "blue"
        },
        "p3": {
          "subject": "বিজ্ঞান",
          "teacher": "Rafael Ortiz",
          "room": "Room 202",
          "theme": "emerald"
        },
        "p4": {
          "subject": "কর্ম ও জীবনমুখী শিক্ষা",
          "teacher": "Robert Kiyosaki",
          "room": "Room 202",
          "theme": "emerald"
        },
        "p5": {
          "subject": "বিজ্ঞান",
          "teacher": "Dr. Charles Darwin",
          "room": "Room 202",
          "theme": "emerald"
        }
      },
      "Wednesday": {
        "p1": {
          "subject": "বাংলা ব্যাকরণ ও নির্মিতি",
          "teacher": "Farhana Sultana",
          "room": "Room 202",
          "theme": "amber"
        },
        "p2": {
          "subject": "English For Today",
          "teacher": "Priya Nair",
          "room": "Room 202",
          "theme": "purple"
        },
        "p3": {
          "subject": "বিজ্ঞান",
          "teacher": "Marie Curie",
          "room": "Room 202",
          "theme": "emerald"
        },
        "p4": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 202",
          "theme": "amber"
        },
        "p5": {
          "subject": "কৃষিশিক্ষা",
          "teacher": "Sarah Jenkins",
          "room": "Room 202",
          "theme": "gray"
        }
      },
      "Thursday": {
        "p1": {
          "subject": "কর্ম ও জীবনমুখী শিক্ষা",
          "teacher": "Robert Kiyosaki",
          "room": "Room 202",
          "theme": "emerald"
        },
        "p2": {
          "subject": "বিজ্ঞান",
          "teacher": "Dr. Charles Darwin",
          "room": "Room 202",
          "theme": "emerald"
        },
        "p3": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 202",
          "theme": "purple"
        },
        "p4": {
          "subject": "ধর্ম ও নৈতিক শিক্ষা",
          "teacher": "Mahbubur Rahman",
          "room": "Room 202",
          "theme": "amber"
        },
        "p5": {
          "subject": "বিজ্ঞান",
          "teacher": "Akash",
          "room": "Room 202",
          "theme": "emerald"
        }
      }
    }
  },
  {
    "id": "c8-a",
    "grade": "Class 8",
    "section": "Section A",
    "fullName": "Class 8 · Section A",
    "classTeacher": "Dr. Charles Darwin",
    "room": "Room 301",
    "studentCount": 30,
    "schedule": {
      "Sunday": {
        "p1": {
          "subject": "বিজ্ঞান",
          "teacher": "Dr. Charles Darwin",
          "room": "Room 301",
          "theme": "emerald"
        },
        "p2": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 301",
          "theme": "purple"
        },
        "p3": {
          "subject": "ধর্ম ও নৈতিক শিক্ষা",
          "teacher": "Mahbubur Rahman",
          "room": "Room 301",
          "theme": "amber"
        },
        "p4": {
          "subject": "বিজ্ঞান",
          "teacher": "Akash",
          "room": "Room 301",
          "theme": "emerald"
        },
        "p5": {
          "subject": "বাংলা ব্যাকরণ ও নির্মিতি",
          "teacher": "Farhana Sultana",
          "room": "Room 301",
          "theme": "amber"
        }
      },
      "Monday": {
        "p1": {
          "subject": "কৃষিশিক্ষা",
          "teacher": "Sarah Jenkins",
          "room": "Room 301",
          "theme": "gray"
        },
        "p2": {
          "subject": "শারীরিক শিক্ষা ও স্বাস্থ্য",
          "teacher": "Subrata Roy",
          "room": "Room 301",
          "theme": "gray"
        },
        "p3": {
          "subject": "গণিত",
          "teacher": "Anisur Rahman",
          "room": "Room 301",
          "theme": "blue"
        },
        "p4": {
          "subject": "বিজ্ঞান",
          "teacher": "Rafael Ortiz",
          "room": "Room 301",
          "theme": "emerald"
        },
        "p5": {
          "subject": "কর্ম ও জীবনমুখী শিক্ষা",
          "teacher": "Robert Kiyosaki",
          "room": "Room 301",
          "theme": "emerald"
        }
      },
      "Tuesday": {
        "p1": {
          "subject": "বিজ্ঞান",
          "teacher": "Akash",
          "room": "Room 301",
          "theme": "emerald"
        },
        "p2": {
          "subject": "বাংলা ব্যাকরণ ও নির্মিতি",
          "teacher": "Farhana Sultana",
          "room": "Room 301",
          "theme": "amber"
        },
        "p3": {
          "subject": "English For Today",
          "teacher": "Priya Nair",
          "room": "Room 301",
          "theme": "purple"
        },
        "p4": {
          "subject": "বিজ্ঞান",
          "teacher": "Marie Curie",
          "room": "Room 301",
          "theme": "emerald"
        },
        "p5": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 301",
          "theme": "amber"
        }
      },
      "Wednesday": {
        "p1": {
          "subject": "বিজ্ঞান",
          "teacher": "Rafael Ortiz",
          "room": "Room 301",
          "theme": "emerald"
        },
        "p2": {
          "subject": "কর্ম ও জীবনমুখী শিক্ষা",
          "teacher": "Robert Kiyosaki",
          "room": "Room 301",
          "theme": "emerald"
        },
        "p3": {
          "subject": "বিজ্ঞান",
          "teacher": "Dr. Charles Darwin",
          "room": "Room 301",
          "theme": "emerald"
        },
        "p4": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 301",
          "theme": "purple"
        },
        "p5": {
          "subject": "ধর্ম ও নৈতিক শিক্ষা",
          "teacher": "Mahbubur Rahman",
          "room": "Room 301",
          "theme": "amber"
        }
      },
      "Thursday": {
        "p1": {
          "subject": "বিজ্ঞান",
          "teacher": "Marie Curie",
          "room": "Room 301",
          "theme": "emerald"
        },
        "p2": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 301",
          "theme": "amber"
        },
        "p3": {
          "subject": "কৃষিশিক্ষা",
          "teacher": "Sarah Jenkins",
          "room": "Room 301",
          "theme": "gray"
        },
        "p4": {
          "subject": "শারীরিক শিক্ষা ও স্বাস্থ্য",
          "teacher": "Subrata Roy",
          "room": "Room 301",
          "theme": "gray"
        },
        "p5": {
          "subject": "গণিত",
          "teacher": "Anisur Rahman",
          "room": "Room 301",
          "theme": "blue"
        }
      }
    }
  },
  {
    "id": "c8-b",
    "grade": "Class 8",
    "section": "Section B",
    "fullName": "Class 8 · Section B",
    "classTeacher": "Kabir Ahmed",
    "room": "Room 302",
    "studentCount": 30,
    "schedule": {
      "Sunday": {
        "p1": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 302",
          "theme": "amber"
        },
        "p2": {
          "subject": "কৃষিশিক্ষা",
          "teacher": "Sarah Jenkins",
          "room": "Room 302",
          "theme": "gray"
        },
        "p3": {
          "subject": "শারীরিক শিক্ষা ও স্বাস্থ্য",
          "teacher": "Subrata Roy",
          "room": "Room 302",
          "theme": "gray"
        },
        "p4": {
          "subject": "গণিত",
          "teacher": "Anisur Rahman",
          "room": "Room 302",
          "theme": "blue"
        },
        "p5": {
          "subject": "বিজ্ঞান",
          "teacher": "Rafael Ortiz",
          "room": "Room 302",
          "theme": "emerald"
        }
      },
      "Monday": {
        "p1": {
          "subject": "ধর্ম ও নৈতিক শিক্ষা",
          "teacher": "Mahbubur Rahman",
          "room": "Room 302",
          "theme": "amber"
        },
        "p2": {
          "subject": "বিজ্ঞান",
          "teacher": "Akash",
          "room": "Room 302",
          "theme": "emerald"
        },
        "p3": {
          "subject": "বাংলা ব্যাকরণ ও নির্মিতি",
          "teacher": "Farhana Sultana",
          "room": "Room 302",
          "theme": "amber"
        },
        "p4": {
          "subject": "English For Today",
          "teacher": "Priya Nair",
          "room": "Room 302",
          "theme": "purple"
        },
        "p5": {
          "subject": "বিজ্ঞান",
          "teacher": "Marie Curie",
          "room": "Room 302",
          "theme": "emerald"
        }
      },
      "Tuesday": {
        "p1": {
          "subject": "গণিত",
          "teacher": "Anisur Rahman",
          "room": "Room 302",
          "theme": "blue"
        },
        "p2": {
          "subject": "বিজ্ঞান",
          "teacher": "Rafael Ortiz",
          "room": "Room 302",
          "theme": "emerald"
        },
        "p3": {
          "subject": "কর্ম ও জীবনমুখী শিক্ষা",
          "teacher": "Robert Kiyosaki",
          "room": "Room 302",
          "theme": "emerald"
        },
        "p4": {
          "subject": "বিজ্ঞান",
          "teacher": "Dr. Charles Darwin",
          "room": "Room 302",
          "theme": "emerald"
        },
        "p5": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 302",
          "theme": "purple"
        }
      },
      "Wednesday": {
        "p1": {
          "subject": "English For Today",
          "teacher": "Priya Nair",
          "room": "Room 302",
          "theme": "purple"
        },
        "p2": {
          "subject": "বিজ্ঞান",
          "teacher": "Marie Curie",
          "room": "Room 302",
          "theme": "emerald"
        },
        "p3": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 302",
          "theme": "amber"
        },
        "p4": {
          "subject": "কৃষিশিক্ষা",
          "teacher": "Sarah Jenkins",
          "room": "Room 302",
          "theme": "gray"
        },
        "p5": {
          "subject": "শারীরিক শিক্ষা ও স্বাস্থ্য",
          "teacher": "Subrata Roy",
          "room": "Room 302",
          "theme": "gray"
        }
      },
      "Thursday": {
        "p1": {
          "subject": "বিজ্ঞান",
          "teacher": "Dr. Charles Darwin",
          "room": "Room 302",
          "theme": "emerald"
        },
        "p2": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 302",
          "theme": "purple"
        },
        "p3": {
          "subject": "ধর্ম ও নৈতিক শিক্ষা",
          "teacher": "Mahbubur Rahman",
          "room": "Room 302",
          "theme": "amber"
        },
        "p4": {
          "subject": "বিজ্ঞান",
          "teacher": "Akash",
          "room": "Room 302",
          "theme": "emerald"
        },
        "p5": {
          "subject": "বাংলা ব্যাকরণ ও নির্মিতি",
          "teacher": "Farhana Sultana",
          "room": "Room 302",
          "theme": "amber"
        }
      }
    }
  },
  {
    "id": "c9-a",
    "grade": "Class 9",
    "section": "Section A",
    "fullName": "Class 9 · Section A",
    "classTeacher": "Nasreen Akter",
    "room": "Room 401",
    "studentCount": 26,
    "schedule": {
      "Sunday": {
        "p1": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 401",
          "theme": "purple"
        },
        "p2": {
          "subject": "ধর্ম ও নৈতিক শিক্ষা",
          "teacher": "Mahbubur Rahman",
          "room": "Room 401",
          "theme": "amber"
        },
        "p3": {
          "subject": "উচ্চতর গণিত",
          "teacher": "Akash",
          "room": "Room 401",
          "theme": "blue"
        },
        "p4": {
          "subject": "বাংলা সাহিত্য",
          "teacher": "Farhana Sultana",
          "room": "Room 401",
          "theme": "amber"
        },
        "p5": {
          "subject": "English For Today",
          "teacher": "Priya Nair",
          "room": "Room 401",
          "theme": "purple"
        }
      },
      "Monday": {
        "p1": {
          "subject": "শারীরিক শিক্ষা, স্বাস্থ্যবিজ্ঞান ও খেলাধুলা",
          "teacher": "Subrata Roy",
          "room": "Room 401",
          "theme": "emerald"
        },
        "p2": {
          "subject": "গণিত",
          "teacher": "Anisur Rahman",
          "room": "Room 401",
          "theme": "blue"
        },
        "p3": {
          "subject": "পদার্থবিজ্ঞান",
          "teacher": "Rafael Ortiz",
          "room": "Room 401",
          "theme": "emerald"
        },
        "p4": {
          "subject": "হিসাববিজ্ঞান",
          "teacher": "Robert Kiyosaki",
          "room": "Room 401",
          "theme": "emerald"
        },
        "p5": {
          "subject": "জীববিজ্ঞান",
          "teacher": "Dr. Charles Darwin",
          "room": "Room 401",
          "theme": "emerald"
        }
      },
      "Tuesday": {
        "p1": {
          "subject": "বাংলা সাহিত্য",
          "teacher": "Farhana Sultana",
          "room": "Room 401",
          "theme": "amber"
        },
        "p2": {
          "subject": "English For Today",
          "teacher": "Priya Nair",
          "room": "Room 401",
          "theme": "purple"
        },
        "p3": {
          "subject": "রসায়ন",
          "teacher": "Marie Curie",
          "room": "Room 401",
          "theme": "gray"
        },
        "p4": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 401",
          "theme": "amber"
        },
        "p5": {
          "subject": "ভূগোল ও পরিবেশ",
          "teacher": "Sarah Jenkins",
          "room": "Room 401",
          "theme": "rose"
        }
      },
      "Wednesday": {
        "p1": {
          "subject": "হিসাববিজ্ঞান",
          "teacher": "Robert Kiyosaki",
          "room": "Room 401",
          "theme": "emerald"
        },
        "p2": {
          "subject": "জীববিজ্ঞান",
          "teacher": "Dr. Charles Darwin",
          "room": "Room 401",
          "theme": "emerald"
        },
        "p3": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 401",
          "theme": "purple"
        },
        "p4": {
          "subject": "ধর্ম ও নৈতিক শিক্ষা",
          "teacher": "Mahbubur Rahman",
          "room": "Room 401",
          "theme": "amber"
        },
        "p5": {
          "subject": "উচ্চতর গণিত",
          "teacher": "Akash",
          "room": "Room 401",
          "theme": "blue"
        }
      },
      "Thursday": {
        "p1": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 401",
          "theme": "amber"
        },
        "p2": {
          "subject": "ভূগোল ও পরিবেশ",
          "teacher": "Sarah Jenkins",
          "room": "Room 401",
          "theme": "rose"
        },
        "p3": {
          "subject": "শারীরিক শিক্ষা, স্বাস্থ্যবিজ্ঞান ও খেলাধুলা",
          "teacher": "Subrata Roy",
          "room": "Room 401",
          "theme": "emerald"
        },
        "p4": {
          "subject": "গণিত",
          "teacher": "Anisur Rahman",
          "room": "Room 401",
          "theme": "blue"
        },
        "p5": {
          "subject": "পদার্থবিজ্ঞান",
          "teacher": "Rafael Ortiz",
          "room": "Room 401",
          "theme": "emerald"
        }
      }
    }
  },
  {
    "id": "c9-b",
    "grade": "Class 9",
    "section": "Section B",
    "fullName": "Class 9 · Section B",
    "classTeacher": "Sarah Jenkins",
    "room": "Room 402",
    "studentCount": 26,
    "schedule": {
      "Sunday": {
        "p1": {
          "subject": "ভূগোল ও পরিবেশ",
          "teacher": "Sarah Jenkins",
          "room": "Room 402",
          "theme": "rose"
        },
        "p2": {
          "subject": "শারীরিক শিক্ষা, স্বাস্থ্যবিজ্ঞান ও খেলাধুলা",
          "teacher": "Subrata Roy",
          "room": "Room 402",
          "theme": "emerald"
        },
        "p3": {
          "subject": "গণিত",
          "teacher": "Anisur Rahman",
          "room": "Room 402",
          "theme": "blue"
        },
        "p4": {
          "subject": "পদার্থবিজ্ঞান",
          "teacher": "Rafael Ortiz",
          "room": "Room 402",
          "theme": "emerald"
        },
        "p5": {
          "subject": "হিসাববিজ্ঞান",
          "teacher": "Robert Kiyosaki",
          "room": "Room 402",
          "theme": "emerald"
        }
      },
      "Monday": {
        "p1": {
          "subject": "উচ্চতর গণিত",
          "teacher": "Akash",
          "room": "Room 402",
          "theme": "blue"
        },
        "p2": {
          "subject": "বাংলা সাহিত্য",
          "teacher": "Farhana Sultana",
          "room": "Room 402",
          "theme": "amber"
        },
        "p3": {
          "subject": "English For Today",
          "teacher": "Priya Nair",
          "room": "Room 402",
          "theme": "purple"
        },
        "p4": {
          "subject": "রসায়ন",
          "teacher": "Marie Curie",
          "room": "Room 402",
          "theme": "gray"
        },
        "p5": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 402",
          "theme": "amber"
        }
      },
      "Tuesday": {
        "p1": {
          "subject": "পদার্থবিজ্ঞান",
          "teacher": "Rafael Ortiz",
          "room": "Room 402",
          "theme": "emerald"
        },
        "p2": {
          "subject": "হিসাববিজ্ঞান",
          "teacher": "Robert Kiyosaki",
          "room": "Room 402",
          "theme": "emerald"
        },
        "p3": {
          "subject": "জীববিজ্ঞান",
          "teacher": "Dr. Charles Darwin",
          "room": "Room 402",
          "theme": "emerald"
        },
        "p4": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 402",
          "theme": "purple"
        },
        "p5": {
          "subject": "ধর্ম ও নৈতিক শিক্ষা",
          "teacher": "Mahbubur Rahman",
          "room": "Room 402",
          "theme": "amber"
        }
      },
      "Wednesday": {
        "p1": {
          "subject": "রসায়ন",
          "teacher": "Marie Curie",
          "room": "Room 402",
          "theme": "gray"
        },
        "p2": {
          "subject": "বাংলাদেশ ও বিশ্বপরিচয়",
          "teacher": "Kabir Ahmed",
          "room": "Room 402",
          "theme": "amber"
        },
        "p3": {
          "subject": "ভূগোল ও পরিবেশ",
          "teacher": "Sarah Jenkins",
          "room": "Room 402",
          "theme": "rose"
        },
        "p4": {
          "subject": "শারীরিক শিক্ষা, স্বাস্থ্যবিজ্ঞান ও খেলাধুলা",
          "teacher": "Subrata Roy",
          "room": "Room 402",
          "theme": "emerald"
        },
        "p5": {
          "subject": "গণিত",
          "teacher": "Anisur Rahman",
          "room": "Room 402",
          "theme": "blue"
        }
      },
      "Thursday": {
        "p1": {
          "subject": "তথ্য ও যোগাযোগ প্রযুক্তি",
          "teacher": "Nasreen Akter",
          "room": "Room 402",
          "theme": "purple"
        },
        "p2": {
          "subject": "ধর্ম ও নৈতিক শিক্ষা",
          "teacher": "Mahbubur Rahman",
          "room": "Room 402",
          "theme": "amber"
        },
        "p3": {
          "subject": "উচ্চতর গণিত",
          "teacher": "Akash",
          "room": "Room 402",
          "theme": "blue"
        },
        "p4": {
          "subject": "বাংলা সাহিত্য",
          "teacher": "Farhana Sultana",
          "room": "Room 402",
          "theme": "amber"
        },
        "p5": {
          "subject": "English For Today",
          "teacher": "Priya Nair",
          "room": "Room 402",
          "theme": "purple"
        }
      }
    }
  }
];
