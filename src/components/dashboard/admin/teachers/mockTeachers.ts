export interface MockTeacher {
  id: string;
  name: string;
  initials: string;
  assignment: string; // e.g. "Mathematics · Grade 8A"
  email: string;
  phone?: string;
  designation?: string;
  status?: "FULL_TIME" | "PART_TIME" | "ON_LEAVE";
}

export const MOCK_TEACHERS_STATS = {
  totalStaff: 64,
  fullTime: 52,
  onLeave: 3,
  subjectsCovered: 24,
};

export const MOCK_TEACHERS: MockTeacher[] = [
  {
    id: "1",
    name: "Maya Chen",
    initials: "MC",
    assignment: "Mathematics · Grade 8A",
    email: "maya.chen@northbridge.edu",
    phone: "+1 (555) 234-5678",
    designation: "Senior Mathematics Teacher",
    status: "FULL_TIME",
  },
  {
    id: "2",
    name: "Jon Bell",
    initials: "JB",
    assignment: "English · Grade 7B",
    email: "jon.bell@northbridge.edu",
    phone: "+1 (555) 345-6789",
    designation: "Head of English Dept",
    status: "FULL_TIME",
  },
  {
    id: "3",
    name: "Priya Nair",
    initials: "PN",
    assignment: "Social Studies · Grade 6C",
    email: "priya.nair@northbridge.edu",
    phone: "+1 (555) 456-7890",
    designation: "Social Studies Faculty",
    status: "FULL_TIME",
  },
  {
    id: "4",
    name: "Rafael Ortiz",
    initials: "RO",
    assignment: "Science · Grade 10B",
    email: "rafael.ortiz@northbridge.edu",
    phone: "+1 (555) 567-8901",
    designation: "Physics & General Science Lead",
    status: "FULL_TIME",
  },
  {
    id: "5",
    name: "Sarah Jenkins",
    initials: "SJ",
    assignment: "ICT · Grade 9A",
    email: "sarah.jenkins@northbridge.edu",
    phone: "+1 (555) 678-9012",
    designation: "Computer Science Faculty",
    status: "FULL_TIME",
  },
  {
    id: "6",
    name: "Mahmud Hasan",
    initials: "MH",
    assignment: "Higher Math · Grade 10A",
    email: "mahmud.hasan@northbridge.edu",
    phone: "+1 (555) 789-0123",
    designation: "Mathematics Specialist",
    status: "FULL_TIME",
  },
  {
    id: "7",
    name: "Farhana Sultana",
    initials: "FS",
    assignment: "Bangla · Grade 8B",
    email: "farhana.sultana@northbridge.edu",
    phone: "+1 (555) 890-1234",
    designation: "Bengali Language & Literature",
    status: "ON_LEAVE",
  },
  {
    id: "8",
    name: "Tanvir Ahmed",
    initials: "TA",
    assignment: "Chemistry · Grade 9B",
    email: "tanvir.ahmed@northbridge.edu",
    phone: "+1 (555) 901-2345",
    designation: "Chemistry Instructor",
    status: "FULL_TIME",
  },
];
