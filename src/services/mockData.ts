import { User, UserRole } from '@/types/auth';
import { Course, StudyPlan, StudentCourse } from '@/types/course';
import { ChatMessage } from '@/types/chat';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'student@kmutnb.ac.th',
    name: 'นายสมชาย วิทยากร',
    role: 'student',
    studentId: '64090501001',
    program: 'เทคโนโลยีสารสนเทศ',
    year: 2,
    avatar: '/avatars/student.jpg',
    createdAt: new Date('2023-01-15'),
    lastLogin: new Date()
  },
  {
    id: '2',
    email: 'instructor@kmutnb.ac.th',
    name: 'ผศ.ดร.สมหญิง ผู้สอน',
    role: 'instructor',
    avatar: '/avatars/instructor.jpg',
    createdAt: new Date('2020-06-01'),
    lastLogin: new Date()
  },
  {
    id: '3',
    email: 'staff@kmutnb.ac.th',
    name: 'นางสมใจ บุคลากร',
    role: 'staff',
    avatar: '/avatars/staff.jpg',
    createdAt: new Date('2019-03-20'),
    lastLogin: new Date()
  },
  {
    id: '4',
    email: 'admin@kmutnb.ac.th',
    name: 'นายผู้ดูแล ระบบ',
    role: 'admin',
    avatar: '/avatars/admin.jpg',
    createdAt: new Date('2018-01-10'),
    lastLogin: new Date()
  }
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: '1',
    code: 'IT101',
    name: 'พื้นฐานเทคโนโลยีสารสนเทศ',
    credits: 3,
    description: 'รายวิชาเบื้องต้นเกี่ยวกับเทคโนโลยีสารสนเทศ',
    prerequisites: [],
    corequisites: [],
    category: 'core',
    semester: 1,
    year: 1,
    instructor: 'ผศ.ดร.สมหญิง ผู้สอน',
    isActive: true
  },
  {
    id: '2',
    code: 'IT201',
    name: 'การเขียนโปรแกรมเบื้องต้น',
    credits: 3,
    description: 'หลักการเขียนโปรแกรมขั้นพื้นฐาน',
    prerequisites: ['IT101'],
    corequisites: [],
    category: 'core',
    semester: 2,
    year: 1,
    instructor: 'ผศ.ดร.สมหญิง ผู้สอน',
    isActive: true
  },
  {
    id: '3',
    code: 'IT301',
    name: 'ฐานข้อมูล',
    credits: 3,
    description: 'การออกแบบและจัดการฐานข้อมูล',
    prerequisites: ['IT201'],
    corequisites: [],
    category: 'major',
    semester: 1,
    year: 2,
    instructor: 'ผศ.ดร.สมหญิง ผู้สอน',
    isActive: true
  },
  {
    id: '4',
    code: 'IT302',
    name: 'เครือข่ายคอมพิวเตอร์',
    credits: 3,
    description: 'หลักการและการจัดการเครือข่าย',
    prerequisites: ['IT101'],
    corequisites: [],
    category: 'major',
    semester: 2,
    year: 2,
    instructor: 'ผศ.ดร.สมหญิง ผู้สอน',
    isActive: true
  },
  {
    id: '5',
    code: 'IT401',
    name: 'การพัฒนาเว็บแอปพลิเคชัน',
    credits: 3,
    description: 'การพัฒนาแอปพลิเคชันบนเว็บ',
    prerequisites: ['IT301'],
    corequisites: [],
    category: 'major',
    semester: 1,
    year: 3,
    instructor: 'ผศ.ดร.สมหญิง ผู้สอน',
    isActive: true
  }
];

// Mock Student Courses
export const mockStudentCourses: StudentCourse[] = [
  {
    studentId: '1',
    courseId: '1',
    status: 'completed',
    grade: 'A',
    semester: '1/2566'
  },
  {
    studentId: '1',
    courseId: '2',
    status: 'completed',
    grade: 'B+',
    semester: '2/2566'
  },
  {
    studentId: '1',
    courseId: '3',
    status: 'in_progress',
    semester: '1/2567'
  },
  {
    studentId: '1',
    courseId: '4',
    status: 'planned',
    semester: '2/2567'
  },
  {
    studentId: '1',
    courseId: '5',
    status: 'failed',
    grade: 'F',
    semester: '1/2566'
  },
  // Additional students
  {
    studentId: '2',
    courseId: '1',
    status: 'completed',
    grade: 'B',
    semester: '1/2566'
  },
  {
    studentId: '2',
    courseId: '2',
    status: 'in_progress',
    semester: '1/2567'
  },
  {
    studentId: '3',
    courseId: '1',
    status: 'completed',
    grade: 'A',
    semester: '1/2566'
  },
  {
    studentId: '3',
    courseId: '3',
    status: 'failed',
    grade: 'F',
    semester: '2/2566'
  }
];

// Mock Study Plan
export const mockStudyPlan: StudyPlan = {
  id: '1',
  studentId: '1',
  courses: mockStudentCourses,
  totalCredits: 120,
  completedCredits: 6,
  currentSemester: 1,
  currentYear: 2,
  lastUpdated: new Date()
};

// Mock Chat Messages
export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    content: 'สวัสดีครับ! ผมสามารถช่วยเหลือเรื่องหลักสูตรเทคโนโลยีสารสนเทศได้ค่ะ',
    isBot: true,
    timestamp: new Date()
  }
];

// Mock Audit Logs
export const mockAuditLogs = [
  {
    id: '1',
    userId: '4',
    action: 'CREATE_COURSE',
    target: 'IT501',
    details: 'Created new course: Advanced Web Development',
    timestamp: new Date(),
    ipAddress: '192.168.1.1'
  },
  {
    id: '2',
    userId: '4',
    action: 'UPDATE_USER_ROLE',
    target: 'user:5',
    details: 'Changed role from student to instructor',
    timestamp: new Date(Date.now() - 3600000),
    ipAddress: '192.168.1.1'
  }
];

// Chatbot responses
export const chatbotResponses = {
  greetings: [
    'สวัสดีครับ! ผมสามารถช่วยเหลือเรื่องหลักสูตรเทคโนโลยีสารสนเทศได้ค่ะ',
    'ยินดีต้อนรับ! มีอะไรให้ช่วยเหลือเกี่ยวกับหลักสูตรไหมครับ?',
    'สวัสดีค่ะ! ต้องการสอบถามข้อมูลหลักสูตรใดบ้างคะ?'
  ],
  courseInfo: {
    'IT101': 'วิชา IT101 พื้นฐานเทคโนโลยีสารสนเทศ เป็นวิชาพื้นฐาน 3 หน่วยกิต ไม่มีวิชาที่ต้องเรียนมาก่อน',
    'IT201': 'วิชา IT201 การเขียนโปรแกรมเบื้องต้น 3 หน่วยกิต ต้องเรียน IT101 มาก่อน',
    'IT301': 'วิชา IT301 ฐานข้อมูล 3 หน่วยกิต ต้องเรียน IT201 มาก่อน'
  },
  suggestions: [
    'สอบถามข้อมูลวิชา',
    'ดูรายวิชาที่ยังไม่ผ่าน',
    'วางแผนการเรียน',
    'ตรวจสอบเงื่อนไขวิชา'
  ]
};