import { User, UserRole } from '@/types/auth';
import { Course, StudyPlan, StudentCourse, Department, Curriculum } from '@/types/course';
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

// Mock Departments and Curricula
export const mockDepartments: Department[] = [
  {
    id: 'IT',
    code: 'IT',
    name: 'Information Technology',
    nameThai: 'เทคโนโลยีสารสนเทศ',
    curricula: [
      {
        id: 'IT-2019',
        year: 2019,
        buddhistYear: 2562,
        name: 'หลักสูตรเทคโนโลยีสารสนเทศ พ.ศ. 2562',
        duration: 4,
        totalCredits: 120,
        semesters: [
          {
            year: 1,
            semester: 1,
            courses: [
              { id: 'IT101-2019', code: 'IT101', name: 'พื้นฐานเทคโนโลยีสารสนเทศ', credits: 3, description: 'รายวิชาเบื้องต้นเกี่ยวกับเทคโนโลยีสารสนเทศ', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'ผศ.ดร.สมหญิง ผู้สอน', isActive: true },
              { id: 'IT102-2019', code: 'IT102', name: 'คณิตศาสตร์สำหรับ IT', credits: 3, description: 'คณิตศาสตร์พื้นฐานสำหรับ IT', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'ผศ.ดร.สมชาย คำนวน', isActive: true },
              { id: 'IT103-2019', code: 'IT103', name: 'ภาษาอังกฤษสำหรับ IT', credits: 3, description: 'ภาษาอังกฤษเฉพาะด้าน IT', prerequisites: [], corequisites: [], category: 'general', semester: 1, year: 1, instructor: 'อ.สมศรี ภาษา', isActive: true },
              { id: 'IT104-2019', code: 'IT104', name: 'การเขียนโปรแกรมเบื้องต้น', credits: 3, description: 'หลักการเขียนโปรแกรมขั้นพื้นฐาน', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'ผศ.ดร.สมหญิง ผู้สอน', isActive: true },
            ]
          },
          {
            year: 1,
            semester: 2,
            courses: [
              { id: 'IT201-2019', code: 'IT201', name: 'โครงสร้างข้อมูลและอัลกอริทึม', credits: 3, description: 'โครงสร้างข้อมูลและอัลกอริทึมเบื้องต้น', prerequisites: ['IT104'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'ผศ.ดร.สมชาย คำนวน', isActive: true },
              { id: 'IT202-2019', code: 'IT202', name: 'ระบบฐานข้อมูล', credits: 3, description: 'การออกแบบและจัดการฐานข้อมูล', prerequisites: ['IT101'], corequisites: [], category: 'major', semester: 2, year: 1, instructor: 'ผศ.ดร.สมหญิง ผู้สอน', isActive: true },
              { id: 'IT203-2019', code: 'IT203', name: 'สถิติสำหรับ IT', credits: 3, description: 'สถิติประยุกต์สำหรับ IT', prerequisites: ['IT102'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'อ.สมศรี วิเคราะห์', isActive: true },
              { id: 'IT204-2019', code: 'IT204', name: 'ระบบปฏิบัติการ', credits: 3, description: 'หลักการระบบปฏิบัติการ', prerequisites: ['IT101'], corequisites: [], category: 'major', semester: 2, year: 1, instructor: 'อ.สมพงษ์ ระบบ', isActive: true },
            ]
          },
        ]
      },
      {
        id: 'IT-2024',
        year: 2024,
        buddhistYear: 2567,
        name: 'หลักสูตรเทคโนโลยีสารสนเทศ พ.ศ. 2567 (ปรับปรุง)',
        duration: 4,
        totalCredits: 132,
        semesters: [
          {
            year: 1,
            semester: 1,
            courses: [
              { id: 'IT101-2024', code: 'IT101', name: 'พื้นฐานเทคโนโลยีสารสนเทศและการคำนวณ', credits: 3, description: 'รายวิชาเบื้องต้นเกี่ยวกับเทคโนโลยีสารสนเทศสมัยใหม่', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'ผศ.ดร.สมหญิง ผู้สอน', isActive: true },
              { id: 'IT102-2024', code: 'IT102', name: 'คณิตศาสตร์แยกสำหรับคอมพิวเตอร์', credits: 3, description: 'คณิตศาสตร์แยกและตรรกศาสตร์', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'ผศ.ดร.สมชาย คำนวน', isActive: true },
              { id: 'IT103-2024', code: 'IT103', name: 'การเขียนโปรแกรมเชิงวัตถุ', credits: 3, description: 'หลักการเขียนโปรแกรมเชิงวัตถุ', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'ผศ.ดร.สมหญิง ผู้สอน', isActive: true },
              { id: 'IT104-2024', code: 'IT104', name: 'ภาษาอังกฤษเทคนิค', credits: 3, description: 'ภาษาอังกฤษสำหรับสาขาเทคนิค', prerequisites: [], corequisites: [], category: 'general', semester: 1, year: 1, instructor: 'อ.สมศรี ภาษา', isActive: true },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'INE',
    code: 'INE',
    name: 'Information Network Engineering',
    nameThai: 'วิศวกรรมเครือข่ายสารสนเทศ',
    curricula: [
      {
        id: 'INE-2019',
        year: 2019,
        buddhistYear: 2562,
        name: 'หลักสูตรวิศวกรรมเครือข่ายสารสนเทศ พ.ศ. 2562',
        duration: 4,
        totalCredits: 128,
        semesters: [
          {
            year: 1,
            semester: 1,
            courses: [
              { id: 'INE101-2019', code: 'INE101', name: 'พื้นฐานวิศวกรรมเครือข่าย', credits: 3, description: 'หลักการพื้นฐานของเครือข่าย', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'ผศ.ดร.สมพงษ์ เครือข่าย', isActive: true },
              { id: 'INE102-2019', code: 'INE102', name: 'คณิตศาสตร์วิศวกรรม', credits: 3, description: 'คณิตศาสตร์สำหรับวิศวกรรม', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'ผศ.ดร.สมชาย คำนวน', isActive: true },
              { id: 'INE103-2019', code: 'INE103', name: 'ฟิสิกส์สำหรับวิศวกร', credits: 3, description: 'ฟิสิกส์ประยุกต์สำหรับวิศวกรรม', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'อ.สมศักดิ์ ฟิสิกส์', isActive: true },
              { id: 'INE104-2019', code: 'INE104', name: 'การเขียนโปรแกรมสำหรับวิศวกร', credits: 3, description: 'การเขียนโปรแกรมพื้นฐาน', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'อ.สมชาย โปรแกรม', isActive: true },
            ]
          }
        ]
      },
      {
        id: 'INE-2024',
        year: 2024,
        buddhistYear: 2567,
        name: 'หลักสูตรวิศวกรรมเครือข่ายสารสนเทศ พ.ศ. 2567',
        duration: 4,
        totalCredits: 132,
        semesters: [
          {
            year: 1,
            semester: 1,
            courses: [
              { id: 'INE101-2024', code: 'INE101', name: 'วิศวกรรมเครือข่ายสมัยใหม่', credits: 3, description: 'เทคโนโลยีเครือข่ายล่าสุด', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'ผศ.ดร.สมพงษ์ เครือข่าย', isActive: true },
              { id: 'INE102-2024', code: 'INE102', name: 'คณิตศาสตร์และสถิติวิศวกรรม', credits: 3, description: 'คณิตศาสตร์และสถิติสำหรับวิศวกรรม', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'ผศ.ดร.สมชาย คำนวน', isActive: true },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'INET',
    code: 'INET',
    name: 'Internet Technology',
    nameThai: 'เทคโนโลยีอินเทอร์เน็ต',
    curricula: [
      {
        id: 'INET-2019',
        year: 2019,
        buddhistYear: 2562,
        name: 'หลักสูตรเทคโนโลยีอินเทอร์เน็ต พ.ศ. 2562',
        duration: 3,
        totalCredits: 90,
        semesters: [
          {
            year: 1,
            semester: 1,
            courses: [
              { id: 'INET101-2019', code: 'INET101', name: 'พื้นฐานเทคโนโลยีอินเทอร์เน็ต', credits: 3, description: 'หลักการพื้นฐานอินเทอร์เน็ต', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'อ.สมใจ เว็บ', isActive: true },
              { id: 'INET102-2019', code: 'INET102', name: 'การพัฒนาเว็บไซต์', credits: 3, description: 'การออกแบบและพัฒนาเว็บไซต์', prerequisites: [], corequisites: [], category: 'major', semester: 1, year: 1, instructor: 'อ.สมใจ เว็บ', isActive: true },
            ]
          }
        ]
      },
      {
        id: 'INET-2024',
        year: 2024,
        buddhistYear: 2567,
        name: 'หลักสูตรเทคโนโลยีอินเทอร์เน็ต พ.ศ. 2567',
        duration: 3,
        totalCredits: 96,
        semesters: [
          {
            year: 1,
            semester: 1,
            courses: [
              { id: 'INET101-2024', code: 'INET101', name: 'เทคโนโลยีอินเทอร์เน็ตสมัยใหม่', credits: 3, description: 'เทคโนโลยีอินเทอร์เน็ตรุ่นใหม่', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'อ.สมใจ เว็บ', isActive: true },
              { id: 'INET102-2024', code: 'INET102', name: 'การพัฒนาแอปพลิเคชันเว็บ', credits: 3, description: 'การสร้างเว็บแอปพลิเคชัน', prerequisites: [], corequisites: [], category: 'major', semester: 1, year: 1, instructor: 'อ.สมใจ เว็บ', isActive: true },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ITI',
    code: 'ITI',
    name: 'Information Technology Innovation',
    nameThai: 'เทคโนโลยีสารสนเทศนวัตกรรม',
    curricula: [
      {
        id: 'ITI-2018',
        year: 2018,
        buddhistYear: 2561,
        name: 'หลักสูตรเทคโนโลยีสารสนเทศนวัตกรรม พ.ศ. 2561',
        duration: 2,
        totalCredits: 60,
        semesters: [
          {
            year: 1,
            semester: 1,
            courses: [
              { id: 'ITI101-2018', code: 'ITI101', name: 'นวัตกรรมเทคโนโลยีสารสนเทศ', credits: 3, description: 'แนวคิดนวัตกรรม IT', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'ผศ.ดร.สมใหม่ นวัตกรรม', isActive: true },
              { id: 'ITI102-2018', code: 'ITI102', name: 'การออกแบบผลิตภัณฑ์ดิจิทัล', credits: 3, description: 'หลักการออกแบบผลิตภัณฑ์ดิจิทัล', prerequisites: [], corequisites: [], category: 'major', semester: 1, year: 1, instructor: 'อ.สมศรี ดีไซน์', isActive: true },
            ]
          }
        ]
      },
      {
        id: 'ITI-2023',
        year: 2023,
        buddhistYear: 2566,
        name: 'หลักสูตรเทคโนโลยีสารสนเทศนวัตกรรม พ.ศ. 2566',
        duration: 2,
        totalCredits: 66,
        semesters: [
          {
            year: 1,
            semester: 1,
            courses: [
              { id: 'ITI101-2023', code: 'ITI101', name: 'นวัตกรรมและเทคโนโลยีอุบัติใหม่', credits: 3, description: 'เทคโนโลยีอุบัติใหม่และนวัตกรรม', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'ผศ.ดร.สมใหม่ นวัตกรรม', isActive: true },
              { id: 'ITI102-2023', code: 'ITI102', name: 'ปัญญาประดิษฐ์และการเรียนรู้ของเครื่อง', credits: 3, description: 'พื้นฐาน AI และ ML', prerequisites: [], corequisites: [], category: 'major', semester: 1, year: 1, instructor: 'ผศ.ดร.สมปัญญา AI', isActive: true },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ITT',
    code: 'ITT',
    name: 'Information Technology for Teachers',
    nameThai: 'เทคโนโลยีสารสนเทศสำหรับครู',
    curricula: [
      {
        id: 'ITT-2024',
        year: 2024,
        buddhistYear: 2567,
        name: 'หลักสูตรเทคโนโลยีสารสนเทศสำหรับครู พ.ศ. 2567',
        duration: 2,
        totalCredits: 72,
        semesters: [
          {
            year: 1,
            semester: 1,
            courses: [
              { id: 'ITT101-2024', code: 'ITT101', name: 'เทคโนโลยีการศึกษา', credits: 3, description: 'การใช้เทคโนโลยีในการศึกษา', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'ผศ.ดร.สมพร ครูเทค', isActive: true },
              { id: 'ITT102-2024', code: 'ITT102', name: 'การออกแบบสื่อการสอน', credits: 3, description: 'การสร้างและออกแบบสื่อการสอน', prerequisites: [], corequisites: [], category: 'major', semester: 1, year: 1, instructor: 'อ.สมจิต สื่อ', isActive: true },
            ]
          }
        ]
      }
    ]
  }
];

// Legacy Mock Courses for backward compatibility
export const mockCourses: Course[] = mockDepartments.flatMap(dept => 
  dept.curricula.flatMap(curr => 
    curr.semesters.flatMap(sem => sem.courses)
  )
);

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