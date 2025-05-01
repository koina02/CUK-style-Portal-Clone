// Mock data for the campus coursework platform

export interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  description: string;
  schedule: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  status: "pending" | "submitted" | "graded" | "overdue";
  grade?: number;
  feedback?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "lecturer";
  profilePic: string;
}

export interface Announcement {
  id: string;
  courseId: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

// Mock data

export const currentUser: User = {
  id: "u1",
  name: "Alex Johnson",
  email: "alex.johnson@campus.edu",
  role: "student",
  profilePic: "https://i.pravatar.cc/150?img=11"
};

export const courses: Course[] = [
  {
    id: "c1",
    code: "CS101",
    name: "Introduction to Computer Science",
    instructor: "Dr. Sarah Williams",
    credits: 3,
    description: "Foundational concepts of computing, programming, and problem-solving.",
    schedule: "Mon/Wed/Fri 10:00 AM - 11:15 AM"
  },
  {
    id: "c2",
    code: "MATH204",
    name: "Calculus II",
    instructor: "Prof. Michael Chen",
    credits: 4,
    description: "Advanced integration techniques, infinite series, and differential equations.",
    schedule: "Tue/Thu 1:30 PM - 3:20 PM"
  },
  {
    id: "c3",
    code: "ENG215",
    name: "Creative Writing",
    instructor: "Dr. Emily Parker",
    credits: 3,
    description: "Exploration of creative writing forms including poetry, fiction, and creative non-fiction.",
    schedule: "Mon/Wed 2:00 PM - 3:15 PM"
  },
  {
    id: "c4",
    code: "BIO101",
    name: "Introduction to Biology",
    instructor: "Dr. James Rodriguez",
    credits: 4,
    description: "Basic principles of biology including cell structure, genetics, and evolution.",
    schedule: "Tue/Thu 9:30 AM - 11:20 AM"
  }
];

export const assignments: Assignment[] = [
  {
    id: "a1",
    courseId: "c1",
    title: "Programming Fundamentals",
    description: "Implement basic algorithms using pseudocode and flowcharts.",
    dueDate: "2025-05-15T23:59:00",
    points: 100,
    status: "pending"
  },
  {
    id: "a2",
    courseId: "c1",
    title: "Binary Conversion Lab",
    description: "Practice converting between decimal and binary number systems.",
    dueDate: "2025-05-08T23:59:00",
    points: 50,
    status: "submitted"
  },
  {
    id: "a3",
    courseId: "c2",
    title: "Series Convergence Proofs",
    description: "Prove the convergence or divergence of 5 given infinite series.",
    dueDate: "2025-05-10T23:59:00",
    points: 100,
    status: "graded",
    grade: 92,
    feedback: "Excellent work on the ratio test applications!"
  },
  {
    id: "a4",
    courseId: "c3",
    title: "Short Story Draft",
    description: "Submit the first draft of your short story (1500-2000 words).",
    dueDate: "2025-04-28T23:59:00",
    points: 100,
    status: "overdue"
  },
  {
    id: "a5",
    courseId: "c4",
    title: "Cell Structure Analysis",
    description: "Analyze and label the structures of plant and animal cells from microscope slides.",
    dueDate: "2025-05-20T23:59:00",
    points: 75,
    status: "pending"
  }
];

export const announcements: Announcement[] = [
  {
    id: "an1",
    courseId: "c1",
    title: "Office Hours Change",
    content: "Office hours will be moved to Tuesday 2-4pm for the remainder of the semester.",
    date: "2025-05-01T09:15:00",
    author: "Dr. Sarah Williams"
  },
  {
    id: "an2",
    courseId: "c2",
    title: "Extra Review Session",
    content: "Additional review session for the midterm exam will be held this Friday at 5pm in Room 302.",
    date: "2025-04-29T16:30:00",
    author: "Prof. Michael Chen"
  },
  {
    id: "an3",
    courseId: "c3",
    title: "Guest Speaker Next Week",
    content: "Acclaimed novelist Maria Rodriguez will be visiting our class next Wednesday.",
    date: "2025-04-30T11:45:00",
    author: "Dr. Emily Parker"
  }
];
