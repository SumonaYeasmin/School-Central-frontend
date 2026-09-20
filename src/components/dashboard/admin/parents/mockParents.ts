export interface MockParent {
  id: string;
  name: string;
  initials: string;
  relation: "Mother" | "Father" | "Guardian";
  linkedStudent: string; // e.g. "Amina Williams"
  studentClass: string; // e.g. "Grade 7 · Section A"
  phone: string; // e.g. "+1 202 555 0118"
  email: string; // e.g. "leah.w@northbridge.edu"
  portalStatus: "Connected" | "Pending" | "Invited";
}

export const MOCK_PARENTS_STATS = {
  parentAccounts: 731,
  guardiansLinked: 842,
  newThisTerm: 29,
  pendingInvites: 18,
};

export const MOCK_PARENTS: MockParent[] = [
  {
    id: "1",
    name: "Leah Williams",
    initials: "LW",
    relation: "Mother",
    linkedStudent: "Amina Williams",
    studentClass: "Grade 7 · Section A",
    phone: "+1 202 555 0118",
    email: "leah.williams@northbridge.edu",
    portalStatus: "Connected",
  },
  {
    id: "2",
    name: "Mara Martin",
    initials: "MM",
    relation: "Mother",
    linkedStudent: "Leo Martin",
    studentClass: "Grade 8 · Section A",
    phone: "+1 202 555 0184",
    email: "mara.martin@northbridge.edu",
    portalStatus: "Connected",
  },
  {
    id: "3",
    name: "Ravi Patel",
    initials: "RP",
    relation: "Father",
    linkedStudent: "Sofia Patel",
    studentClass: "Grade 10 · Section B",
    phone: "+1 202 555 0151",
    email: "ravi.patel@northbridge.edu",
    portalStatus: "Connected",
  },
  {
    id: "4",
    name: "Jiyun Kim",
    initials: "JK",
    relation: "Mother",
    linkedStudent: "Noah Kim",
    studentClass: "Grade 6 · Section C",
    phone: "+1 202 555 0197",
    email: "jiyun.kim@northbridge.edu",
    portalStatus: "Connected",
  },
  {
    id: "5",
    name: "Vikram Sharma",
    initials: "VS",
    relation: "Father",
    linkedStudent: "Aarav Sharma",
    studentClass: "Grade 9 · Section A",
    phone: "+1 202 555 0214",
    email: "vikram.sharma@northbridge.edu",
    portalStatus: "Connected",
  },
  {
    id: "6",
    name: "Marc Dupont",
    initials: "MD",
    relation: "Father",
    linkedStudent: "Chloe Dupont",
    studentClass: "Grade 10 · Section A",
    phone: "+1 202 555 0329",
    email: "marc.dupont@northbridge.edu",
    portalStatus: "Pending",
  },
  {
    id: "7",
    name: "Tariq Rahman",
    initials: "TR",
    relation: "Father",
    linkedStudent: "Zayan Rahman",
    studentClass: "Grade 6 · Section A",
    phone: "+1 202 555 0441",
    email: "tariq.rahman@northbridge.edu",
    portalStatus: "Connected",
  },
  {
    id: "8",
    name: "Yusuf Al-Mansoor",
    initials: "YA",
    relation: "Guardian",
    linkedStudent: "Fatima Al-Mansoor",
    studentClass: "Grade 8 · Section B",
    phone: "+1 202 555 0563",
    email: "yusuf.mansoor@northbridge.edu",
    portalStatus: "Invited",
  },
];
