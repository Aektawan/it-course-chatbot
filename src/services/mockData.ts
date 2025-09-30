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
        id: 'IT-62',
        year: 2019,
        buddhistYear: 2562,
        name: 'หลักสูตรเทคโนโลยีสารสนเทศ พ.ศ. 2562 (IT 62)',
        duration: 4,
        totalCredits: 128,
        semesters: [
          // Year 1
          { year: 1, semester: 1, courses: [
            { id: 'IT101-62', code: 'IT101', name: 'Introduction to Information Technology', credits: 3, description: 'พื้นฐานเทคโนโลยีสารสนเทศ', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Smith', isActive: true },
            { id: 'IT102-62', code: 'IT102', name: 'Mathematics for IT', credits: 3, description: 'คณิตศาสตร์สำหรับ IT', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Johnson', isActive: true },
            { id: 'IT103-62', code: 'IT103', name: 'Programming Fundamentals', credits: 3, description: 'พื้นฐานการเขียนโปรแกรม', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Brown', isActive: true },
            { id: 'IT104-62', code: 'IT104', name: 'English for IT', credits: 2, description: 'ภาษาอังกฤษสำหรับ IT', prerequisites: [], corequisites: [], category: 'general', semester: 1, year: 1, instructor: 'Prof. Wilson', isActive: true },
            { id: 'IT105-62', code: 'IT105', name: 'Computer Systems', credits: 3, description: 'ระบบคอมพิวเตอร์', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Davis', isActive: true },
            { id: 'IT106-62', code: 'IT106', name: 'Digital Logic', credits: 2, description: 'ตรรกศาสตร์ดิจิทัล', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Miller', isActive: true }
          ]},
          { year: 1, semester: 2, courses: [
            { id: 'IT201-62', code: 'IT201', name: 'Data Structures', credits: 3, description: 'โครงสร้างข้อมูล', prerequisites: ['IT103'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Brown', isActive: true },
            { id: 'IT202-62', code: 'IT202', name: 'Database Systems', credits: 3, description: 'ระบบฐานข้อมูล', prerequisites: [], corequisites: [], category: 'major', semester: 2, year: 1, instructor: 'Dr. Garcia', isActive: true },
            { id: 'IT203-62', code: 'IT203', name: 'Web Development', credits: 3, description: 'การพัฒนาเว็บไซต์', prerequisites: ['IT103'], corequisites: [], category: 'major', semester: 2, year: 1, instructor: 'Dr. Martinez', isActive: true },
            { id: 'IT204-62', code: 'IT204', name: 'Statistics for IT', credits: 3, description: 'สถิติสำหรับ IT', prerequisites: ['IT102'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Johnson', isActive: true },
            { id: 'IT205-62', code: 'IT205', name: 'Network Fundamentals', credits: 3, description: 'พื้นฐานเครือข่าย', prerequisites: [], corequisites: [], category: 'major', semester: 2, year: 1, instructor: 'Dr. Lee', isActive: true },
            { id: 'IT206-62', code: 'IT206', name: 'Operating Systems', credits: 2, description: 'ระบบปฏิบัติการ', prerequisites: ['IT105'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Davis', isActive: true }
          ]},
          // Year 2
          { year: 2, semester: 1, courses: [
            { id: 'IT301-62', code: 'IT301', name: 'Algorithms', credits: 3, description: 'อัลกอริทึม', prerequisites: ['IT201'], corequisites: [], category: 'core', semester: 1, year: 2, instructor: 'Dr. Brown', isActive: true },
            { id: 'IT302-62', code: 'IT302', name: 'Software Engineering', credits: 3, description: 'วิศวกรรมซอฟต์แวร์', prerequisites: ['IT201'], corequisites: [], category: 'major', semester: 1, year: 2, instructor: 'Dr. Williams', isActive: true },
            { id: 'IT303-62', code: 'IT303', name: 'Mobile Development', credits: 3, description: 'การพัฒนาแอปมือถือ', prerequisites: ['IT203'], corequisites: [], category: 'major', semester: 1, year: 2, instructor: 'Dr. Martinez', isActive: true },
            { id: 'IT304-62', code: 'IT304', name: 'Computer Graphics', credits: 3, description: 'คอมพิวเตอร์กราฟิก', prerequisites: ['IT102'], corequisites: [], category: 'elective', semester: 1, year: 2, instructor: 'Dr. Taylor', isActive: true },
            { id: 'IT305-62', code: 'IT305', name: 'Human-Computer Interaction', credits: 2, description: 'ปฏิสัมพันธ์ระหว่างมนุษย์และคอมพิวเตอร์', prerequisites: [], corequisites: [], category: 'elective', semester: 1, year: 2, instructor: 'Dr. Anderson', isActive: true },
            { id: 'IT306-62', code: 'IT306', name: 'System Analysis', credits: 3, description: 'การวิเคราะห์ระบบ', prerequisites: ['IT202'], corequisites: [], category: 'major', semester: 1, year: 2, instructor: 'Dr. Garcia', isActive: true }
          ]},
          { year: 2, semester: 2, courses: [
            { id: 'IT401-62', code: 'IT401', name: 'Information Security', credits: 3, description: 'ความปลอดภัยสารสนเทศ', prerequisites: ['IT205'], corequisites: [], category: 'major', semester: 2, year: 2, instructor: 'Dr. White', isActive: true },
            { id: 'IT402-62', code: 'IT402', name: 'Data Analytics', credits: 3, description: 'การวิเคราะห์ข้อมูล', prerequisites: ['IT204'], corequisites: [], category: 'major', semester: 2, year: 2, instructor: 'Dr. Johnson', isActive: true },
            { id: 'IT403-62', code: 'IT403', name: 'Cloud Computing', credits: 3, description: 'คลาวด์คอมพิวติ้ง', prerequisites: ['IT205'], corequisites: [], category: 'elective', semester: 2, year: 2, instructor: 'Dr. Clark', isActive: true },
            { id: 'IT404-62', code: 'IT404', name: 'Machine Learning', credits: 3, description: 'การเรียนรู้ของเครื่อง', prerequisites: ['IT204'], corequisites: [], category: 'elective', semester: 2, year: 2, instructor: 'Dr. Moore', isActive: true },
            { id: 'IT405-62', code: 'IT405', name: 'Project Management', credits: 2, description: 'การจัดการโครงการ', prerequisites: [], corequisites: [], category: 'general', semester: 2, year: 2, instructor: 'Dr. Thomas', isActive: true },
            { id: 'IT406-62', code: 'IT406', name: 'Advanced Database', credits: 3, description: 'ฐานข้อมูลขั้นสูง', prerequisites: ['IT202'], corequisites: [], category: 'major', semester: 2, year: 2, instructor: 'Dr. Garcia', isActive: true }
          ]},
          // Year 3
          { year: 3, semester: 1, courses: [
            { id: 'IT501-62', code: 'IT501', name: 'Advanced Programming', credits: 3, description: 'การเขียนโปรแกรมขั้นสูง', prerequisites: ['IT301'], corequisites: [], category: 'major', semester: 1, year: 3, instructor: 'Dr. Brown', isActive: true },
            { id: 'IT502-62', code: 'IT502', name: 'Distributed Systems', credits: 3, description: 'ระบบกระจาย', prerequisites: ['IT205'], corequisites: [], category: 'major', semester: 1, year: 3, instructor: 'Dr. Lee', isActive: true },
            { id: 'IT503-62', code: 'IT503', name: 'Artificial Intelligence', credits: 3, description: 'ปัญญาประดิษฐ์', prerequisites: ['IT301'], corequisites: [], category: 'elective', semester: 1, year: 3, instructor: 'Dr. Moore', isActive: true },
            { id: 'IT504-62', code: 'IT504', name: 'Enterprise Systems', credits: 3, description: 'ระบบองค์กร', prerequisites: ['IT306'], corequisites: [], category: 'major', semester: 1, year: 3, instructor: 'Dr. Williams', isActive: true },
            { id: 'IT505-62', code: 'IT505', name: 'Digital Forensics', credits: 2, description: 'นิติวิทยาศาสตร์ดิจิทัล', prerequisites: ['IT401'], corequisites: [], category: 'elective', semester: 1, year: 3, instructor: 'Dr. White', isActive: true },
            { id: 'IT506-62', code: 'IT506', name: 'IoT Systems', credits: 3, description: 'ระบบอินเทอร์เน็ตของสรรพสิ่ง', prerequisites: ['IT205'], corequisites: [], category: 'elective', semester: 1, year: 3, instructor: 'Dr. Clark', isActive: true }
          ]},
          { year: 3, semester: 2, courses: [
            { id: 'IT601-62', code: 'IT601', name: 'Capstone Project I', credits: 3, description: 'โครงงานวิจัย 1', prerequisites: ['IT302'], corequisites: [], category: 'major', semester: 2, year: 3, instructor: 'Dr. Williams', isActive: true },
            { id: 'IT602-62', code: 'IT602', name: 'Big Data', credits: 3, description: 'ข้อมูลขนาดใหญ่', prerequisites: ['IT402'], corequisites: [], category: 'elective', semester: 2, year: 3, instructor: 'Dr. Johnson', isActive: true },
            { id: 'IT603-62', code: 'IT603', name: 'Blockchain Technology', credits: 3, description: 'เทคโนโลยีบล็อกเชน', prerequisites: ['IT401'], corequisites: [], category: 'elective', semester: 2, year: 3, instructor: 'Dr. White', isActive: true },
            { id: 'IT604-62', code: 'IT604', name: 'Advanced Networks', credits: 3, description: 'เครือข่ายขั้นสูง', prerequisites: ['IT502'], corequisites: [], category: 'major', semester: 2, year: 3, instructor: 'Dr. Lee', isActive: true },
            { id: 'IT605-62', code: 'IT605', name: 'Ethics in IT', credits: 2, description: 'จริยธรรมทางเทคโนโลยีสารสนเทศ', prerequisites: [], corequisites: [], category: 'general', semester: 2, year: 3, instructor: 'Dr. Thomas', isActive: true },
            { id: 'IT606-62', code: 'IT606', name: 'Research Methods', credits: 2, description: 'วิธีการวิจัย', prerequisites: [], corequisites: [], category: 'general', semester: 2, year: 3, instructor: 'Dr. Anderson', isActive: true }
          ]},
          // Year 4
          { year: 4, semester: 1, courses: [
            { id: 'IT701-62', code: 'IT701', name: 'Capstone Project II', credits: 3, description: 'โครงงานวิจัย 2', prerequisites: ['IT601'], corequisites: [], category: 'major', semester: 1, year: 4, instructor: 'Dr. Williams', isActive: true },
            { id: 'IT702-62', code: 'IT702', name: 'Industry Internship', credits: 3, description: 'การฝึกงานในอุตสาหกรรม', prerequisites: [], corequisites: [], category: 'major', semester: 1, year: 4, instructor: 'Dr. Thomas', isActive: true },
            { id: 'IT703-62', code: 'IT703', name: 'IT Entrepreneurship', credits: 3, description: 'การเป็นผู้ประกอบการด้าน IT', prerequisites: [], corequisites: [], category: 'elective', semester: 1, year: 4, instructor: 'Dr. Taylor', isActive: true },
            { id: 'IT704-62', code: 'IT704', name: 'Advanced AI', credits: 3, description: 'ปัญญาประดิษฐ์ขั้นสูง', prerequisites: ['IT503'], corequisites: [], category: 'elective', semester: 1, year: 4, instructor: 'Dr. Moore', isActive: true },
            { id: 'IT705-62', code: 'IT705', name: 'Systems Integration', credits: 2, description: 'การผสมผสานระบบ', prerequisites: ['IT504'], corequisites: [], category: 'major', semester: 1, year: 4, instructor: 'Dr. Clark', isActive: true },
            { id: 'IT706-62', code: 'IT706', name: 'Professional Skills', credits: 2, description: 'ทักษะวิชาชีพ', prerequisites: [], corequisites: [], category: 'general', semester: 1, year: 4, instructor: 'Dr. Anderson', isActive: true }
          ]},
          { year: 4, semester: 2, courses: [
            { id: 'IT801-62', code: 'IT801', name: 'Senior Project', credits: 3, description: 'โครงงานพิเศษ', prerequisites: ['IT701'], corequisites: [], category: 'major', semester: 2, year: 4, instructor: 'Dr. Williams', isActive: true },
            { id: 'IT802-62', code: 'IT802', name: 'IT Seminar', credits: 2, description: 'สัมมนาเทคโนโลยีสารสนเทศ', prerequisites: [], corequisites: [], category: 'major', semester: 2, year: 4, instructor: 'Dr. Smith', isActive: true },
            { id: 'IT803-62', code: 'IT803', name: 'Advanced Elective I', credits: 3, description: 'วิชาเลือกขั้นสูง 1', prerequisites: [], corequisites: [], category: 'elective', semester: 2, year: 4, instructor: 'Various', isActive: true },
            { id: 'IT804-62', code: 'IT804', name: 'Advanced Elective II', credits: 3, description: 'วิชาเลือกขั้นสูง 2', prerequisites: [], corequisites: [], category: 'elective', semester: 2, year: 4, instructor: 'Various', isActive: true },
            { id: 'IT805-62', code: 'IT805', name: 'IT Industry Trends', credits: 2, description: 'แนวโน้มอุตสาหกรรม IT', prerequisites: [], corequisites: [], category: 'general', semester: 2, year: 4, instructor: 'Dr. Taylor', isActive: true },
            { id: 'IT806-62', code: 'IT806', name: 'Portfolio Development', credits: 2, description: 'การพัฒนาผลงาน', prerequisites: [], corequisites: [], category: 'major', semester: 2, year: 4, instructor: 'Dr. Anderson', isActive: true }
          ]}
        ]
      },
      {
        id: 'IT-67',
        year: 2024,
        buddhistYear: 2567,
        name: 'หลักสูตรเทคโนโลยีสารสนเทศ พ.ศ. 2567 (IT 67)',
        duration: 4,
        totalCredits: 132,
        semesters: [
          // Year 1
          { year: 1, semester: 1, courses: [
            { id: 'IT101-67', code: 'IT101', name: 'Modern IT Fundamentals', credits: 3, description: 'พื้นฐานเทคโนโลยีสารสนเทศสมัยใหม่', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Smith', isActive: true },
            { id: 'IT102-67', code: 'IT102', name: 'Discrete Mathematics', credits: 3, description: 'คณิตศาสตร์แยก', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Johnson', isActive: true },
            { id: 'IT103-67', code: 'IT103', name: 'Object-Oriented Programming', credits: 3, description: 'การเขียนโปรแกรมเชิงวัตถุ', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Brown', isActive: true },
            { id: 'IT104-67', code: 'IT104', name: 'Technical English', credits: 2, description: 'ภาษาอังกฤษเทคนิค', prerequisites: [], corequisites: [], category: 'general', semester: 1, year: 1, instructor: 'Prof. Wilson', isActive: true },
            { id: 'IT105-67', code: 'IT105', name: 'Computer Architecture', credits: 3, description: 'สถาปัตยกรรมคอมพิวเตอร์', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Davis', isActive: true },
            { id: 'IT106-67', code: 'IT106', name: 'Digital Innovation', credits: 2, description: 'นวัตกรรมดิจิทัล', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Miller', isActive: true }
          ]},
          { year: 1, semester: 2, courses: [
            { id: 'IT201-67', code: 'IT201', name: 'Advanced Data Structures', credits: 3, description: 'โครงสร้างข้อมูลขั้นสูง', prerequisites: ['IT103'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Brown', isActive: true },
            { id: 'IT202-67', code: 'IT202', name: 'Modern Database Systems', credits: 3, description: 'ระบบฐานข้อมูลสมัยใหม่', prerequisites: [], corequisites: [], category: 'major', semester: 2, year: 1, instructor: 'Dr. Garcia', isActive: true },
            { id: 'IT203-67', code: 'IT203', name: 'Full-Stack Development', credits: 3, description: 'การพัฒนาเว็บแบบเต็มรูปแบบ', prerequisites: ['IT103'], corequisites: [], category: 'major', semester: 2, year: 1, instructor: 'Dr. Martinez', isActive: true },
            { id: 'IT204-67', code: 'IT204', name: 'Applied Statistics', credits: 3, description: 'สถิติประยุกต์', prerequisites: ['IT102'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Johnson', isActive: true },
            { id: 'IT205-67', code: 'IT205', name: 'Network Engineering', credits: 3, description: 'วิศวกรรมเครือข่าย', prerequisites: [], corequisites: [], category: 'major', semester: 2, year: 1, instructor: 'Dr. Lee', isActive: true },
            { id: 'IT206-67', code: 'IT206', name: 'Modern OS Concepts', credits: 2, description: 'แนวคิดระบบปฏิบัติการสมัยใหม่', prerequisites: ['IT105'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Davis', isActive: true }
          ]},
          // Similar pattern for remaining semesters...
          { year: 2, semester: 1, courses: [
            { id: 'IT301-67', code: 'IT301', name: 'Advanced Algorithms', credits: 3, description: 'อัลกอริทึมขั้นสูง', prerequisites: ['IT201'], corequisites: [], category: 'core', semester: 1, year: 2, instructor: 'Dr. Brown', isActive: true },
            { id: 'IT302-67', code: 'IT302', name: 'Agile Software Engineering', credits: 3, description: 'วิศวกรรมซอฟต์แวร์แบบ Agile', prerequisites: ['IT201'], corequisites: [], category: 'major', semester: 1, year: 2, instructor: 'Dr. Williams', isActive: true },
            { id: 'IT303-67', code: 'IT303', name: 'Mobile App Development', credits: 3, description: 'การพัฒนาแอปพลิเคชันมือถือ', prerequisites: ['IT203'], corequisites: [], category: 'major', semester: 1, year: 2, instructor: 'Dr. Martinez', isActive: true },
            { id: 'IT304-67', code: 'IT304', name: '3D Graphics & VR', credits: 3, description: 'กราฟิก 3 มิติและความจริงเสมือน', prerequisites: ['IT102'], corequisites: [], category: 'elective', semester: 1, year: 2, instructor: 'Dr. Taylor', isActive: true },
            { id: 'IT305-67', code: 'IT305', name: 'UX/UI Design', credits: 2, description: 'การออกแบบประสบการณ์ผู้ใช้', prerequisites: [], corequisites: [], category: 'elective', semester: 1, year: 2, instructor: 'Dr. Anderson', isActive: true },
            { id: 'IT306-67', code: 'IT306', name: 'Enterprise Architecture', credits: 3, description: 'สถาปัตยกรรมองค์กร', prerequisites: ['IT202'], corequisites: [], category: 'major', semester: 1, year: 2, instructor: 'Dr. Garcia', isActive: true }
          ]},
          { year: 2, semester: 2, courses: [
            { id: 'IT401-67', code: 'IT401', name: 'Cybersecurity', credits: 3, description: 'ความปลอดภัยไซเบอร์', prerequisites: ['IT205'], corequisites: [], category: 'major', semester: 2, year: 2, instructor: 'Dr. White', isActive: true },
            { id: 'IT402-67', code: 'IT402', name: 'Data Science', credits: 3, description: 'วิทยาการข้อมูล', prerequisites: ['IT204'], corequisites: [], category: 'major', semester: 2, year: 2, instructor: 'Dr. Johnson', isActive: true },
            { id: 'IT403-67', code: 'IT403', name: 'Cloud Native Development', credits: 3, description: 'การพัฒนาแบบ Cloud Native', prerequisites: ['IT205'], corequisites: [], category: 'elective', semester: 2, year: 2, instructor: 'Dr. Clark', isActive: true },
            { id: 'IT404-67', code: 'IT404', name: 'AI & Machine Learning', credits: 3, description: 'ปัญญาประดิษฐ์และการเรียนรู้ของเครื่อง', prerequisites: ['IT204'], corequisites: [], category: 'elective', semester: 2, year: 2, instructor: 'Dr. Moore', isActive: true },
            { id: 'IT405-67', code: 'IT405', name: 'Agile Project Management', credits: 2, description: 'การจัดการโครงการแบบ Agile', prerequisites: [], corequisites: [], category: 'general', semester: 2, year: 2, instructor: 'Dr. Thomas', isActive: true },
            { id: 'IT406-67', code: 'IT406', name: 'NoSQL Databases', credits: 3, description: 'ฐานข้อมูล NoSQL', prerequisites: ['IT202'], corequisites: [], category: 'major', semester: 2, year: 2, instructor: 'Dr. Garcia', isActive: true }
          ]},
          { year: 3, semester: 1, courses: [
            { id: 'IT501-67', code: 'IT501', name: 'Microservices Architecture', credits: 3, description: 'สถาปัตยกรรม Microservices', prerequisites: ['IT301'], corequisites: [], category: 'major', semester: 1, year: 3, instructor: 'Dr. Brown', isActive: true },
            { id: 'IT502-67', code: 'IT502', name: 'Distributed Computing', credits: 3, description: 'การคำนวณแบบกระจาย', prerequisites: ['IT205'], corequisites: [], category: 'major', semester: 1, year: 3, instructor: 'Dr. Lee', isActive: true },
            { id: 'IT503-67', code: 'IT503', name: 'Deep Learning', credits: 3, description: 'การเรียนรู้เชิงลึก', prerequisites: ['IT404'], corequisites: [], category: 'elective', semester: 1, year: 3, instructor: 'Dr. Moore', isActive: true },
            { id: 'IT504-67', code: 'IT504', name: 'Digital Transformation', credits: 3, description: 'การเปลี่ยนแปลงดิจิทัล', prerequisites: ['IT306'], corequisites: [], category: 'major', semester: 1, year: 3, instructor: 'Dr. Williams', isActive: true },
            { id: 'IT505-67', code: 'IT505', name: 'Ethical Hacking', credits: 2, description: 'การแฮกเพื่อความปลอดภัย', prerequisites: ['IT401'], corequisites: [], category: 'elective', semester: 1, year: 3, instructor: 'Dr. White', isActive: true },
            { id: 'IT506-67', code: 'IT506', name: 'Edge Computing', credits: 3, description: 'การคำนวณที่ขอบเครือข่าย', prerequisites: ['IT205'], corequisites: [], category: 'elective', semester: 1, year: 3, instructor: 'Dr. Clark', isActive: true }
          ]},
          { year: 3, semester: 2, courses: [
            { id: 'IT601-67', code: 'IT601', name: 'Innovation Project I', credits: 3, description: 'โครงการนวัตกรรม 1', prerequisites: ['IT302'], corequisites: [], category: 'major', semester: 2, year: 3, instructor: 'Dr. Williams', isActive: true },
            { id: 'IT602-67', code: 'IT602', name: 'Big Data Analytics', credits: 3, description: 'การวิเคราะห์ข้อมูลขนาดใหญ่', prerequisites: ['IT402'], corequisites: [], category: 'elective', semester: 2, year: 3, instructor: 'Dr. Johnson', isActive: true },
            { id: 'IT603-67', code: 'IT603', name: 'Quantum Computing', credits: 3, description: 'การคำนวณควอนตัม', prerequisites: ['IT301'], corequisites: [], category: 'elective', semester: 2, year: 3, instructor: 'Dr. Davis', isActive: true },
            { id: 'IT604-67', code: 'IT604', name: '5G Networks', credits: 3, description: 'เครือข่าย 5G', prerequisites: ['IT502'], corequisites: [], category: 'major', semester: 2, year: 3, instructor: 'Dr. Lee', isActive: true },
            { id: 'IT605-67', code: 'IT605', name: 'Tech Ethics', credits: 2, description: 'จริยธรรมเทคโนโลยี', prerequisites: [], corequisites: [], category: 'general', semester: 2, year: 3, instructor: 'Dr. Thomas', isActive: true },
            { id: 'IT606-67', code: 'IT606', name: 'Research Methodology', credits: 2, description: 'ระเบียบวิธีวิจัย', prerequisites: [], corequisites: [], category: 'general', semester: 2, year: 3, instructor: 'Dr. Anderson', isActive: true }
          ]},
          { year: 4, semester: 1, courses: [
            { id: 'IT701-67', code: 'IT701', name: 'Innovation Project II', credits: 3, description: 'โครงการนวัตกรรม 2', prerequisites: ['IT601'], corequisites: [], category: 'major', semester: 1, year: 4, instructor: 'Dr. Williams', isActive: true },
            { id: 'IT702-67', code: 'IT702', name: 'Industry Partnership', credits: 3, description: 'ความร่วมมืออุตสาหกรรม', prerequisites: [], corequisites: [], category: 'major', semester: 1, year: 4, instructor: 'Dr. Thomas', isActive: true },
            { id: 'IT703-67', code: 'IT703', name: 'Tech Startup', credits: 3, description: 'การสร้างธุรกิจเทคโนโลยี', prerequisites: [], corequisites: [], category: 'elective', semester: 1, year: 4, instructor: 'Dr. Taylor', isActive: true },
            { id: 'IT704-67', code: 'IT704', name: 'Generative AI', credits: 3, description: 'ปัญญาประดิษฐ์เชิงสร้างสรรค์', prerequisites: ['IT503'], corequisites: [], category: 'elective', semester: 1, year: 4, instructor: 'Dr. Moore', isActive: true },
            { id: 'IT705-67', code: 'IT705', name: 'DevOps & CI/CD', credits: 2, description: 'DevOps และการส่งมอบต่อเนื่อง', prerequisites: ['IT504'], corequisites: [], category: 'major', semester: 1, year: 4, instructor: 'Dr. Clark', isActive: true },
            { id: 'IT706-67', code: 'IT706', name: 'Leadership Skills', credits: 2, description: 'ทักษะความเป็นผู้นำ', prerequisites: [], corequisites: [], category: 'general', semester: 1, year: 4, instructor: 'Dr. Anderson', isActive: true }
          ]},
          { year: 4, semester: 2, courses: [
            { id: 'IT801-67', code: 'IT801', name: 'Capstone Project', credits: 3, description: 'โครงงานสำเร็จการศึกษา', prerequisites: ['IT701'], corequisites: [], category: 'major', semester: 2, year: 4, instructor: 'Dr. Williams', isActive: true },
            { id: 'IT802-67', code: 'IT802', name: 'Tech Conference', credits: 2, description: 'การประชุมวิชาการเทคโนโลยี', prerequisites: [], corequisites: [], category: 'major', semester: 2, year: 4, instructor: 'Dr. Smith', isActive: true },
            { id: 'IT803-67', code: 'IT803', name: 'Specialized Elective I', credits: 3, description: 'วิชาเลือกเฉพาะทาง 1', prerequisites: [], corequisites: [], category: 'elective', semester: 2, year: 4, instructor: 'Various', isActive: true },
            { id: 'IT804-67', code: 'IT804', name: 'Specialized Elective II', credits: 3, description: 'วิชาเลือกเฉพาะทาง 2', prerequisites: [], corequisites: [], category: 'elective', semester: 2, year: 4, instructor: 'Various', isActive: true },
            { id: 'IT805-67', code: 'IT805', name: 'Future Tech Trends', credits: 2, description: 'แนวโน้มเทคโนโลยีอนาคต', prerequisites: [], corequisites: [], category: 'general', semester: 2, year: 4, instructor: 'Dr. Taylor', isActive: true },
            { id: 'IT806-67', code: 'IT806', name: 'Professional Portfolio', credits: 2, description: 'ผลงานวิชาชีพ', prerequisites: [], corequisites: [], category: 'major', semester: 2, year: 4, instructor: 'Dr. Anderson', isActive: true }
          ]}
        ]
      },
      {
        id: 'IT-62-COOP',
        year: 2019,
        buddhistYear: 2562,
        name: 'หลักสูตรเทคโนโลยีสารสนเทศ พ.ศ. 2562 สหกิจศึกษา (IT 62 สหกิจ)',
        duration: 4,
        totalCredits: 128,
        semesters: []
      },
      {
        id: 'IT-67-COOP',
        year: 2024,
        buddhistYear: 2567,
        name: 'หลักสูตรเทคโนโลยีสารสนเทศ พ.ศ. 2567 สหกิจศึกษา (IT 67 สหกิจ)',
        duration: 4,
        totalCredits: 132,
        semesters: []
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
        id: 'INE-62',
        year: 2019,
        buddhistYear: 2562,
        name: 'หลักสูตรวิศวกรรมเครือข่ายสารสนเทศ พ.ศ. 2562 (INE 62)',
        duration: 4,
        totalCredits: 128,
        semesters: [
          { year: 1, semester: 1, courses: [
            { id: 'INE101-62', code: 'INE101', name: 'Network Engineering Fundamentals', credits: 3, description: 'พื้นฐานวิศวกรรมเครือข่าย', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Network', isActive: true },
            { id: 'INE102-62', code: 'INE102', name: 'Mathematics for Engineers', credits: 3, description: 'คณิตศาสตร์สำหรับวิศวกร', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Math', isActive: true },
            { id: 'INE103-62', code: 'INE103', name: 'Physics for Engineers', credits: 3, description: 'ฟิสิกส์สำหรับวิศวกร', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Physics', isActive: true },
            { id: 'INE104-62', code: 'INE104', name: 'Programming for Engineers', credits: 2, description: 'การเขียนโปรแกรมสำหรับวิศวกร', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Code', isActive: true },
            { id: 'INE105-62', code: 'INE105', name: 'Digital Systems', credits: 3, description: 'ระบบดิจิทัล', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Digital', isActive: true },
            { id: 'INE106-62', code: 'INE106', name: 'Technical English', credits: 2, description: 'ภาษาอังกฤษเทคนิค', prerequisites: [], corequisites: [], category: 'general', semester: 1, year: 1, instructor: 'Prof. English', isActive: true }
          ]},
          { year: 1, semester: 2, courses: [
            { id: 'INE201-62', code: 'INE201', name: 'Circuit Analysis', credits: 3, description: 'การวิเคราะห์วงจร', prerequisites: ['INE103'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Circuit', isActive: true },
            { id: 'INE202-62', code: 'INE202', name: 'Data Communications', credits: 3, description: 'การสื่อสารข้อมูล', prerequisites: ['INE101'], corequisites: [], category: 'major', semester: 2, year: 1, instructor: 'Dr. Comm', isActive: true },
            { id: 'INE203-62', code: 'INE203', name: 'Network Protocols', credits: 3, description: 'โปรโตคอลเครือข่าย', prerequisites: ['INE101'], corequisites: [], category: 'major', semester: 2, year: 1, instructor: 'Dr. Protocol', isActive: true },
            { id: 'INE204-62', code: 'INE204', name: 'Advanced Programming', credits: 3, description: 'การเขียนโปรแกรมขั้นสูง', prerequisites: ['INE104'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Code', isActive: true },
            { id: 'INE205-62', code: 'INE205', name: 'Statistics for Engineers', credits: 3, description: 'สถิติสำหรับวิศวกร', prerequisites: ['INE102'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Stats', isActive: true },
            { id: 'INE206-62', code: 'INE206', name: 'Linear Algebra', credits: 2, description: 'พีชคณิตเชิงเส้น', prerequisites: ['INE102'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Math', isActive: true }
          ]},
          { year: 2, semester: 1, courses: [
            { id: 'INE301-62', code: 'INE301', name: 'Network Security', credits: 3, description: 'ความปลอดภัยเครือข่าย', prerequisites: ['INE203'], corequisites: [], category: 'major', semester: 1, year: 2, instructor: 'Dr. Security', isActive: true },
            { id: 'INE302-62', code: 'INE302', name: 'Wireless Networks', credits: 3, description: 'เครือข่ายไร้สาย', prerequisites: ['INE202'], corequisites: [], category: 'major', semester: 1, year: 2, instructor: 'Dr. Wireless', isActive: true },
            { id: 'INE303-62', code: 'INE303', name: 'Network Design', credits: 3, description: 'การออกแบบเครือข่าย', prerequisites: ['INE203'], corequisites: [], category: 'major', semester: 1, year: 2, instructor: 'Dr. Design', isActive: true },
            { id: 'INE304-62', code: 'INE304', name: 'Signal Processing', credits: 3, description: 'การประมวลผลสัญญาณ', prerequisites: ['INE201'], corequisites: [], category: 'core', semester: 1, year: 2, instructor: 'Dr. Signal', isActive: true },
            { id: 'INE305-62', code: 'INE305', name: 'Database Systems', credits: 2, description: 'ระบบฐานข้อมูล', prerequisites: ['INE204'], corequisites: [], category: 'elective', semester: 1, year: 2, instructor: 'Dr. Database', isActive: true },
            { id: 'INE306-62', code: 'INE306', name: 'Network Management', credits: 3, description: 'การจัดการเครือข่าย', prerequisites: ['INE203'], corequisites: [], category: 'major', semester: 1, year: 2, instructor: 'Dr. Manage', isActive: true }
          ]},
          { year: 2, semester: 2, courses: [
            { id: 'INE401-62', code: 'INE401', name: 'Advanced Network Security', credits: 3, description: 'ความปลอดภัยเครือข่ายขั้นสูง', prerequisites: ['INE301'], corequisites: [], category: 'major', semester: 2, year: 2, instructor: 'Dr. Security', isActive: true },
            { id: 'INE402-62', code: 'INE402', name: 'Network Performance', credits: 3, description: 'ประสิทธิภาพเครือข่าย', prerequisites: ['INE303'], corequisites: [], category: 'major', semester: 2, year: 2, instructor: 'Dr. Performance', isActive: true },
            { id: 'INE403-62', code: 'INE403', name: 'Cloud Networking', credits: 3, description: 'เครือข่ายบนคลาวด์', prerequisites: ['INE302'], corequisites: [], category: 'elective', semester: 2, year: 2, instructor: 'Dr. Cloud', isActive: true },
            { id: 'INE404-62', code: 'INE404', name: 'Network Automation', credits: 3, description: 'ระบบอัตโนมัติเครือข่าย', prerequisites: ['INE306'], corequisites: [], category: 'major', semester: 2, year: 2, instructor: 'Dr. Auto', isActive: true },
            { id: 'INE405-62', code: 'INE405', name: 'Project Management', credits: 2, description: 'การจัดการโครงการ', prerequisites: [], corequisites: [], category: 'general', semester: 2, year: 2, instructor: 'Dr. PM', isActive: true },
            { id: 'INE406-62', code: 'INE406', name: 'Network Testing', credits: 3, description: 'การทดสอบเครือข่าย', prerequisites: ['INE303'], corequisites: [], category: 'major', semester: 2, year: 2, instructor: 'Dr. Test', isActive: true }
          ]},
          { year: 3, semester: 1, courses: [
            { id: 'INE501-62', code: 'INE501', name: 'Enterprise Networks', credits: 3, description: 'เครือข่ายองค์กร', prerequisites: ['INE303'], corequisites: [], category: 'major', semester: 1, year: 3, instructor: 'Dr. Enterprise', isActive: true },
            { id: 'INE502-62', code: 'INE502', name: 'Network Troubleshooting', credits: 3, description: 'การแก้ปัญหาเครือข่าย', prerequisites: ['INE402'], corequisites: [], category: 'major', semester: 1, year: 3, instructor: 'Dr. Troubleshoot', isActive: true },
            { id: 'INE503-62', code: 'INE503', name: 'IoT Networks', credits: 3, description: 'เครือข่าย IoT', prerequisites: ['INE302'], corequisites: [], category: 'elective', semester: 1, year: 3, instructor: 'Dr. IoT', isActive: true },
            { id: 'INE504-62', code: 'INE504', name: 'Network Forensics', credits: 3, description: 'นิติวิทยาศาสตร์เครือข่าย', prerequisites: ['INE401'], corequisites: [], category: 'elective', semester: 1, year: 3, instructor: 'Dr. Forensics', isActive: true },
            { id: 'INE505-62', code: 'INE505', name: 'Advanced Routing', credits: 2, description: 'การกำหนดเส้นทางขั้นสูง', prerequisites: ['INE303'], corequisites: [], category: 'major', semester: 1, year: 3, instructor: 'Dr. Route', isActive: true },
            { id: 'INE506-62', code: 'INE506', name: 'Network Virtualization', credits: 3, description: 'การสร้างเครือข่ายเสมือน', prerequisites: ['INE403'], corequisites: [], category: 'elective', semester: 1, year: 3, instructor: 'Dr. Virtual', isActive: true }
          ]},
          { year: 3, semester: 2, courses: [
            { id: 'INE601-62', code: 'INE601', name: 'Capstone Project I', credits: 3, description: 'โครงงานวิจัย 1', prerequisites: ['INE501'], corequisites: [], category: 'major', semester: 2, year: 3, instructor: 'Dr. Project', isActive: true },
            { id: 'INE602-62', code: 'INE602', name: '5G Networks', credits: 3, description: 'เครือข่าย 5G', prerequisites: ['INE302'], corequisites: [], category: 'elective', semester: 2, year: 3, instructor: 'Dr. 5G', isActive: true },
            { id: 'INE603-62', code: 'INE603', name: 'Software Defined Networks', credits: 3, description: 'เครือข่ายที่กำหนดด้วยซอฟต์แวร์', prerequisites: ['INE506'], corequisites: [], category: 'elective', semester: 2, year: 3, instructor: 'Dr. SDN', isActive: true },
            { id: 'INE604-62', code: 'INE604', name: 'Network Economics', credits: 3, description: 'เศรษฐศาสตร์เครือข่าย', prerequisites: [], corequisites: [], category: 'general', semester: 2, year: 3, instructor: 'Dr. Economics', isActive: true },
            { id: 'INE605-62', code: 'INE605', name: 'Ethics in Engineering', credits: 2, description: 'จริยธรรมทางวิศวกรรม', prerequisites: [], corequisites: [], category: 'general', semester: 2, year: 3, instructor: 'Dr. Ethics', isActive: true },
            { id: 'INE606-62', code: 'INE606', name: 'Research Methods', credits: 2, description: 'วิธีการวิจัย', prerequisites: [], corequisites: [], category: 'general', semester: 2, year: 3, instructor: 'Dr. Research', isActive: true }
          ]},
          { year: 4, semester: 1, courses: [
            { id: 'INE701-62', code: 'INE701', name: 'Capstone Project II', credits: 3, description: 'โครงงานวิจัย 2', prerequisites: ['INE601'], corequisites: [], category: 'major', semester: 1, year: 4, instructor: 'Dr. Project', isActive: true },
            { id: 'INE702-62', code: 'INE702', name: 'Industry Internship', credits: 3, description: 'การฝึกงานในอุตสาหกรรม', prerequisites: [], corequisites: [], category: 'major', semester: 1, year: 4, instructor: 'Dr. Industry', isActive: true },
            { id: 'INE703-62', code: 'INE703', name: 'Network Entrepreneurship', credits: 3, description: 'การเป็นผู้ประกอบการด้านเครือข่าย', prerequisites: [], corequisites: [], category: 'elective', semester: 1, year: 4, instructor: 'Dr. Business', isActive: true },
            { id: 'INE704-62', code: 'INE704', name: 'Advanced Security', credits: 3, description: 'ความปลอดภัยขั้นสูง', prerequisites: ['INE504'], corequisites: [], category: 'elective', semester: 1, year: 4, instructor: 'Dr. Security', isActive: true },
            { id: 'INE705-62', code: 'INE705', name: 'Network Integration', credits: 2, description: 'การผสมผสานเครือข่าย', prerequisites: ['INE501'], corequisites: [], category: 'major', semester: 1, year: 4, instructor: 'Dr. Integration', isActive: true },
            { id: 'INE706-62', code: 'INE706', name: 'Professional Skills', credits: 2, description: 'ทักษะวิชาชีพ', prerequisites: [], corequisites: [], category: 'general', semester: 1, year: 4, instructor: 'Dr. Professional', isActive: true }
          ]},
          { year: 4, semester: 2, courses: [
            { id: 'INE801-62', code: 'INE801', name: 'Senior Project', credits: 3, description: 'โครงงานพิเศษ', prerequisites: ['INE701'], corequisites: [], category: 'major', semester: 2, year: 4, instructor: 'Dr. Project', isActive: true },
            { id: 'INE802-62', code: 'INE802', name: 'Network Seminar', credits: 2, description: 'สัมมนาเครือข่าย', prerequisites: [], corequisites: [], category: 'major', semester: 2, year: 4, instructor: 'Dr. Seminar', isActive: true },
            { id: 'INE803-62', code: 'INE803', name: 'Advanced Elective I', credits: 3, description: 'วิชาเลือกขั้นสูง 1', prerequisites: [], corequisites: [], category: 'elective', semester: 2, year: 4, instructor: 'Various', isActive: true },
            { id: 'INE804-62', code: 'INE804', name: 'Advanced Elective II', credits: 3, description: 'วิชาเลือกขั้นสูง 2', prerequisites: [], corequisites: [], category: 'elective', semester: 2, year: 4, instructor: 'Various', isActive: true },
            { id: 'INE805-62', code: 'INE805', name: 'Network Trends', credits: 2, description: 'แนวโน้มเครือข่าย', prerequisites: [], corequisites: [], category: 'general', semester: 2, year: 4, instructor: 'Dr. Trends', isActive: true },
            { id: 'INE806-62', code: 'INE806', name: 'Portfolio Development', credits: 2, description: 'การพัฒนาผลงาน', prerequisites: [], corequisites: [], category: 'major', semester: 2, year: 4, instructor: 'Dr. Portfolio', isActive: true }
          ]}
        ]
      },
      {
        id: 'INE-62-COOP',
        year: 2019,
        buddhistYear: 2562,
        name: 'หลักสูตรวิศวกรรมเครือข่ายสารสนเทศ (สหกิจศึกษา) พ.ศ. 2562 (INE 62)',
        duration: 4,
        totalCredits: 127,
        semesters: [
          { year: 1, semester: 1, courses: [
            { id: 'INE101-62-COOP', code: 'INE101', name: 'Network Engineering Fundamentals', credits: 3, description: 'พื้นฐานวิศวกรรมเครือข่าย', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Network', isActive: true },
            { id: 'INE102-62-COOP', code: 'INE102', name: 'Mathematics for Engineers', credits: 3, description: 'คณิตศาสตร์สำหรับวิศวกร', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Math', isActive: true },
            { id: 'INE103-62-COOP', code: 'INE103', name: 'Physics for Engineers', credits: 3, description: 'ฟิสิกส์สำหรับวิศวกร', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Physics', isActive: true },
            { id: 'INE104-62-COOP', code: 'INE104', name: 'Programming for Engineers', credits: 2, description: 'การเขียนโปรแกรมสำหรับวิศวกร', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Code', isActive: true },
            { id: 'INE105-62-COOP', code: 'INE105', name: 'Digital Systems', credits: 3, description: 'ระบบดิจิทัล', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Digital', isActive: true },
            { id: 'INE106-62-COOP', code: 'INE106', name: 'Technical English', credits: 2, description: 'ภาษาอังกฤษเทคนิค', prerequisites: [], corequisites: [], category: 'general', semester: 1, year: 1, instructor: 'Prof. English', isActive: true }
          ]},
          { year: 1, semester: 2, courses: [
            { id: 'INE201-62-COOP', code: 'INE201', name: 'Circuit Analysis', credits: 3, description: 'การวิเคราะห์วงจร', prerequisites: ['INE103'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Circuit', isActive: true },
            { id: 'INE202-62-COOP', code: 'INE202', name: 'Data Communications', credits: 3, description: 'การสื่อสารข้อมูล', prerequisites: ['INE101'], corequisites: [], category: 'major', semester: 2, year: 1, instructor: 'Dr. Comm', isActive: true },
            { id: 'INE203-62-COOP', code: 'INE203', name: 'Network Protocols', credits: 3, description: 'โปรโตคอลเครือข่าย', prerequisites: ['INE101'], corequisites: [], category: 'major', semester: 2, year: 1, instructor: 'Dr. Protocol', isActive: true },
            { id: 'INE204-62-COOP', code: 'INE204', name: 'Advanced Programming', credits: 3, description: 'การเขียนโปรแกรมขั้นสูง', prerequisites: ['INE104'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Code', isActive: true },
            { id: 'INE205-62-COOP', code: 'INE205', name: 'Statistics for Engineers', credits: 3, description: 'สถิติสำหรับวิศวกร', prerequisites: ['INE102'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Stats', isActive: true },
            { id: 'INE206-62-COOP', code: 'INE206', name: 'Linear Algebra', credits: 2, description: 'พีชคณิตเชิงเส้น', prerequisites: ['INE102'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Math', isActive: true }
          ]}
        ]
      },
      {
        id: 'INE-67-COOP',
        year: 2024,
        buddhistYear: 2567,
        name: 'หลักสูตรวิศวกรรมเครือข่ายสารสนเทศ (สหกิจศึกษา) พ.ศ. 2567 (INE 67)',
        duration: 4,
        totalCredits: 131,
        semesters: [
          { year: 1, semester: 1, courses: [
            { id: 'INE101-67-COOP', code: 'INE101', name: 'Modern Network Engineering', credits: 3, description: 'วิศวกรรมเครือข่ายสมัยใหม่', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Modern', isActive: true },
            { id: 'INE102-67-COOP', code: 'INE102', name: 'Engineering Mathematics', credits: 3, description: 'คณิตศาสตร์วิศวกรรม', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Math', isActive: true },
            { id: 'INE103-67-COOP', code: 'INE103', name: 'Applied Physics', credits: 3, description: 'ฟิสิกส์ประยุกต์', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Physics', isActive: true },
            { id: 'INE104-67-COOP', code: 'INE104', name: 'Python Programming', credits: 2, description: 'การเขียนโปรแกรม Python', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Python', isActive: true },
            { id: 'INE105-67-COOP', code: 'INE105', name: 'Digital Innovation', credits: 3, description: 'นวัตกรรมดิจิทัล', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Innovation', isActive: true },
            { id: 'INE106-67-COOP', code: 'INE106', name: 'Communication Skills', credits: 2, description: 'ทักษะการสื่อสาร', prerequisites: [], corequisites: [], category: 'general', semester: 1, year: 1, instructor: 'Prof. Comm', isActive: true }
          ]},
          { year: 1, semester: 2, courses: [
            { id: 'INE201-67-COOP', code: 'INE201', name: 'Advanced Circuit Analysis', credits: 3, description: 'การวิเคราะห์วงจรขั้นสูง', prerequisites: ['INE103'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Circuit', isActive: true },
            { id: 'INE202-67-COOP', code: 'INE202', name: 'Data Communication Systems', credits: 3, description: 'ระบบการสื่อสารข้อมูล', prerequisites: ['INE101'], corequisites: [], category: 'major', semester: 2, year: 1, instructor: 'Dr. DataComm', isActive: true },
            { id: 'INE203-67-COOP', code: 'INE203', name: 'Network Protocols & Standards', credits: 3, description: 'โปรโตคอลและมาตรฐานเครือข่าย', prerequisites: ['INE101'], corequisites: [], category: 'major', semester: 2, year: 1, instructor: 'Dr. Standards', isActive: true },
            { id: 'INE204-67-COOP', code: 'INE204', name: 'Object-Oriented Programming', credits: 3, description: 'การเขียนโปรแกรมเชิงวัตถุ', prerequisites: ['INE104'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. OOP', isActive: true },
            { id: 'INE205-67-COOP', code: 'INE205', name: 'Engineering Statistics', credits: 3, description: 'สถิติวิศวกรรม', prerequisites: ['INE102'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Stats', isActive: true },
            { id: 'INE206-67-COOP', code: 'INE206', name: 'Linear Systems', credits: 2, description: 'ระบบเชิงเส้น', prerequisites: ['INE102'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Linear', isActive: true }
          ]}
        ]
      },
      {
        id: 'INE-67',
        year: 2024,
        buddhistYear: 2567,
        name: 'หลักสูตรวิศวกรรมเครือข่ายสารสนเทศ พ.ศ. 2567 (INE 67)',
        duration: 4,
        totalCredits: 132,
        semesters: [
          { year: 1, semester: 1, courses: [
            { id: 'INE101-67', code: 'INE101', name: 'Modern Network Engineering', credits: 3, description: 'วิศวกรรมเครือข่ายสมัยใหม่', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Modern', isActive: true },
            { id: 'INE102-67', code: 'INE102', name: 'Engineering Mathematics', credits: 3, description: 'คณิตศาสตร์วิศวกรรม', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Math', isActive: true },
            { id: 'INE103-67', code: 'INE103', name: 'Applied Physics', credits: 3, description: 'ฟิสิกส์ประยุกต์', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Physics', isActive: true },
            { id: 'INE104-67', code: 'INE104', name: 'Python Programming', credits: 2, description: 'การเขียนโปรแกรม Python', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Python', isActive: true },
            { id: 'INE105-67', code: 'INE105', name: 'Digital Innovation', credits: 3, description: 'นวัตกรรมดิจิทัล', prerequisites: [], corequisites: [], category: 'core', semester: 1, year: 1, instructor: 'Dr. Innovation', isActive: true },
            { id: 'INE106-67', code: 'INE106', name: 'Communication Skills', credits: 2, description: 'ทักษะการสื่อสาร', prerequisites: [], corequisites: [], category: 'general', semester: 1, year: 1, instructor: 'Prof. Comm', isActive: true }
          ]},
          // Continue with similar pattern for remaining semesters...
          { year: 1, semester: 2, courses: [
            { id: 'INE201-67', code: 'INE201', name: 'Advanced Circuit Analysis', credits: 3, description: 'การวิเคราะห์วงจรขั้นสูง', prerequisites: ['INE103'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Circuit', isActive: true },
            { id: 'INE202-67', code: 'INE202', name: 'Data Communication Systems', credits: 3, description: 'ระบบการสื่อสารข้อมูล', prerequisites: ['INE101'], corequisites: [], category: 'major', semester: 2, year: 1, instructor: 'Dr. DataComm', isActive: true },
            { id: 'INE203-67', code: 'INE203', name: 'Network Protocols & Standards', credits: 3, description: 'โปรโตคอลและมาตรฐานเครือข่าย', prerequisites: ['INE101'], corequisites: [], category: 'major', semester: 2, year: 1, instructor: 'Dr. Standards', isActive: true },
            { id: 'INE204-67', code: 'INE204', name: 'Object-Oriented Programming', credits: 3, description: 'การเขียนโปรแกรมเชิงวัตถุ', prerequisites: ['INE104'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. OOP', isActive: true },
            { id: 'INE205-67', code: 'INE205', name: 'Engineering Statistics', credits: 3, description: 'สถิติวิศวกรรม', prerequisites: ['INE102'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Stats', isActive: true },
            { id: 'INE206-67', code: 'INE206', name: 'Linear Systems', credits: 2, description: 'ระบบเชิงเส้น', prerequisites: ['INE102'], corequisites: [], category: 'core', semester: 2, year: 1, instructor: 'Dr. Linear', isActive: true }
          ]},
          { year: 2, semester: 1, courses: [
            { id: 'INE301-67', code: 'INE301', name: 'Cybersecurity Fundamentals', credits: 3, description: 'พื้นฐานความปลอดภัยไซเบอร์', prerequisites: ['INE203'], corequisites: [], category: 'major', semester: 1, year: 2, instructor: 'Dr. Cyber', isActive: true },
            { id: 'INE302-67', code: 'INE302', name: '5G & Beyond Networks', credits: 3, description: 'เครือข่าย 5G และอนาคต', prerequisites: ['INE202'], corequisites: [], category: 'major', semester: 1, year: 2, instructor: 'Dr. 5G', isActive: true },
            { id: 'INE303-67', code: 'INE303', name: 'Smart Network Design', credits: 3, description: 'การออกแบบเครือข่ายอัจฉริยะ', prerequisites: ['INE203'], corequisites: [], category: 'major', semester: 1, year: 2, instructor: 'Dr. Smart', isActive: true },
            { id: 'INE304-67', code: 'INE304', name: 'AI for Networks', credits: 3, description: 'ปัญญาประดิษฐ์สำหรับเครือข่าย', prerequisites: ['INE204'], corequisites: [], category: 'elective', semester: 1, year: 2, instructor: 'Dr. AI', isActive: true },
            { id: 'INE305-67', code: 'INE305', name: 'Cloud Infrastructure', credits: 2, description: 'โครงสร้างพื้นฐานคลาวด์', prerequisites: ['INE204'], corequisites: [], category: 'elective', semester: 1, year: 2, instructor: 'Dr. Cloud', isActive: true },
            { id: 'INE306-67', code: 'INE306', name: 'Network Automation', credits: 3, description: 'ระบบอัตโนมัติเครือข่าย', prerequisites: ['INE203'], corequisites: [], category: 'major', semester: 1, year: 2, instructor: 'Dr. Auto', isActive: true }
          ]},
          { year: 2, semester: 2, courses: [
            { id: 'INE401-67', code: 'INE401', name: 'Advanced Cybersecurity', credits: 3, description: 'ความปลอดภัยไซเบอร์ขั้นสูง', prerequisites: ['INE301'], corequisites: [], category: 'major', semester: 2, year: 2, instructor: 'Dr. Cyber', isActive: true },
            { id: 'INE402-67', code: 'INE402', name: 'Network Performance Analytics', credits: 3, description: 'การวิเคราะห์ประสิทธิภาพเครือข่าย', prerequisites: ['INE303'], corequisites: [], category: 'major', semester: 2, year: 2, instructor: 'Dr. Analytics', isActive: true },
            { id: 'INE403-67', code: 'INE403', name: 'Edge Computing Networks', credits: 3, description: 'เครือข่าย Edge Computing', prerequisites: ['INE305'], corequisites: [], category: 'elective', semester: 2, year: 2, instructor: 'Dr. Edge', isActive: true },
            { id: 'INE404-67', code: 'INE404', name: 'Intelligent Network Management', credits: 3, description: 'การจัดการเครือข่ายอัจฉริยะ', prerequisites: ['INE306'], corequisites: [], category: 'major', semester: 2, year: 2, instructor: 'Dr. Intelligent', isActive: true },
            { id: 'INE405-67', code: 'INE405', name: 'Agile Project Management', credits: 2, description: 'การจัดการโครงการแบบ Agile', prerequisites: [], corequisites: [], category: 'general', semester: 2, year: 2, instructor: 'Dr. Agile', isActive: true },
            { id: 'INE406-67', code: 'INE406', name: 'Network Simulation', credits: 3, description: 'การจำลองเครือข่าย', prerequisites: ['INE303'], corequisites: [], category: 'major', semester: 2, year: 2, instructor: 'Dr. Simulation', isActive: true }
          ]},
          { year: 3, semester: 1, courses: [
            { id: 'INE501-67', code: 'INE501', name: 'Enterprise Network Architecture', credits: 3, description: 'สถาปัตยกรรมเครือข่ายองค์กร', prerequisites: ['INE303'], corequisites: [], category: 'major', semester: 1, year: 3, instructor: 'Dr. Enterprise', isActive: true },
            { id: 'INE502-67', code: 'INE502', name: 'Network DevOps', credits: 3, description: 'DevOps สำหรับเครือข่าย', prerequisites: ['INE404'], corequisites: [], category: 'major', semester: 1, year: 3, instructor: 'Dr. DevOps', isActive: true },
            { id: 'INE503-67', code: 'INE503', name: 'IoT & Smart Cities', credits: 3, description: 'IoT และเมืองอัจฉริยะ', prerequisites: ['INE302'], corequisites: [], category: 'elective', semester: 1, year: 3, instructor: 'Dr. SmartCity', isActive: true },
            { id: 'INE504-67', code: 'INE504', name: 'Blockchain Networks', credits: 3, description: 'เครือข่าย Blockchain', prerequisites: ['INE401'], corequisites: [], category: 'elective', semester: 1, year: 3, instructor: 'Dr. Blockchain', isActive: true },
            { id: 'INE505-67', code: 'INE505', name: 'SD-WAN Technologies', credits: 2, description: 'เทคโนโลยี SD-WAN', prerequisites: ['INE306'], corequisites: [], category: 'major', semester: 1, year: 3, instructor: 'Dr. SDWAN', isActive: true },
            { id: 'INE506-67', code: 'INE506', name: 'Quantum Networks', credits: 3, description: 'เครือข่ายควอนตัม', prerequisites: ['INE401'], corequisites: [], category: 'elective', semester: 1, year: 3, instructor: 'Dr. Quantum', isActive: true }
          ]},
          { year: 3, semester: 2, courses: [
            { id: 'INE601-67', code: 'INE601', name: 'Innovation Project I', credits: 3, description: 'โครงการนวัตกรรม 1', prerequisites: ['INE501'], corequisites: [], category: 'major', semester: 2, year: 3, instructor: 'Dr. Innovation', isActive: true },
            { id: 'INE602-67', code: 'INE602', name: '6G Research', credits: 3, description: 'การวิจัย 6G', prerequisites: ['INE302'], corequisites: [], category: 'elective', semester: 2, year: 3, instructor: 'Dr. 6G', isActive: true },
            { id: 'INE603-67', code: 'INE603', name: 'Intent-Based Networking', credits: 3, description: 'เครือข่ายตามเจตนา', prerequisites: ['INE502'], corequisites: [], category: 'elective', semester: 2, year: 3, instructor: 'Dr. Intent', isActive: true },
            { id: 'INE604-67', code: 'INE604', name: 'Network Economics & Business', credits: 3, description: 'เศรษฐศาสตร์และธุรกิจเครือข่าย', prerequisites: [], corequisites: [], category: 'general', semester: 2, year: 3, instructor: 'Dr. Business', isActive: true },
            { id: 'INE605-67', code: 'INE605', name: 'Sustainable Technology', credits: 2, description: 'เทคโนโลยียั่งยืน', prerequisites: [], corequisites: [], category: 'general', semester: 2, year: 3, instructor: 'Dr. Sustainable', isActive: true },
            { id: 'INE606-67', code: 'INE606', name: 'Advanced Research Methods', credits: 2, description: 'วิธีการวิจัยขั้นสูง', prerequisites: [], corequisites: [], category: 'general', semester: 2, year: 3, instructor: 'Dr. Research', isActive: true }
          ]},
          { year: 4, semester: 1, courses: [
            { id: 'INE701-67', code: 'INE701', name: 'Innovation Project II', credits: 3, description: 'โครงการนวัตกรรม 2', prerequisites: ['INE601'], corequisites: [], category: 'major', semester: 1, year: 4, instructor: 'Dr. Innovation', isActive: true },
            { id: 'INE702-67', code: 'INE702', name: 'Industry Partnership Program', credits: 3, description: 'โปรแกรมความร่วมมืออุตสาหกรรม', prerequisites: [], corequisites: [], category: 'major', semester: 1, year: 4, instructor: 'Dr. Partnership', isActive: true },
            { id: 'INE703-67', code: 'INE703', name: 'Network Startup', credits: 3, description: 'การสร้างธุรกิจเครือข่าย', prerequisites: [], corequisites: [], category: 'elective', semester: 1, year: 4, instructor: 'Dr. Startup', isActive: true },
            { id: 'INE704-67', code: 'INE704', name: 'Advanced AI Networks', credits: 3, description: 'เครือข่าย AI ขั้นสูง', prerequisites: ['INE304'], corequisites: [], category: 'elective', semester: 1, year: 4, instructor: 'Dr. AdvancedAI', isActive: true },
            { id: 'INE705-67', code: 'INE705', name: 'Network Integration & Testing', credits: 2, description: 'การผสมผสานและทดสอบเครือข่าย', prerequisites: ['INE501'], corequisites: [], category: 'major', semester: 1, year: 4, instructor: 'Dr. Testing', isActive: true },
            { id: 'INE706-67', code: 'INE706', name: 'Leadership & Innovation', credits: 2, description: 'ภาวะผู้นำและนวัตกรรม', prerequisites: [], corequisites: [], category: 'general', semester: 1, year: 4, instructor: 'Dr. Leadership', isActive: true }
          ]},
          { year: 4, semester: 2, courses: [
            { id: 'INE801-67', code: 'INE801', name: 'Capstone Innovation Project', credits: 3, description: 'โครงงานนวัตกรรมสำเร็จการศึกษา', prerequisites: ['INE701'], corequisites: [], category: 'major', semester: 2, year: 4, instructor: 'Dr. Capstone', isActive: true },
            { id: 'INE802-67', code: 'INE802', name: 'Tech Conference & Presentation', credits: 2, description: 'การประชุมและนำเสนอเทคโนโลยี', prerequisites: [], corequisites: [], category: 'major', semester: 2, year: 4, instructor: 'Dr. Conference', isActive: true },
            { id: 'INE803-67', code: 'INE803', name: 'Specialized Elective I', credits: 3, description: 'วิชาเลือกเฉพาะทาง 1', prerequisites: [], corequisites: [], category: 'elective', semester: 2, year: 4, instructor: 'Various', isActive: true },
            { id: 'INE804-67', code: 'INE804', name: 'Specialized Elective II', credits: 3, description: 'วิชาเลือกเฉพาะทาง 2', prerequisites: [], corequisites: [], category: 'elective', semester: 2, year: 4, instructor: 'Various', isActive: true },
            { id: 'INE805-67', code: 'INE805', name: 'Future Network Trends', credits: 2, description: 'แนวโน้มเครือข่ายอนาคต', prerequisites: [], corequisites: [], category: 'general', semester: 2, year: 4, instructor: 'Dr. Future', isActive: true },
            { id: 'INE806-67', code: 'INE806', name: 'Professional Portfolio', credits: 2, description: 'ผลงานวิชาชีพ', prerequisites: [], corequisites: [], category: 'major', semester: 2, year: 4, instructor: 'Dr. Portfolio', isActive: true }
          ]}
        ]
      }
    ]
  }
];

// Normalize: set description, mainCategory, subCategory to empty strings for every course
for (const department of mockDepartments) {
  for (const curriculum of department.curricula) {
    for (const semester of curriculum.semesters) {
      for (const course of semester.courses as Array<Course & { mainCategory?: string; subCategory?: string }>) {
        course.description = '';
        (course as any).mainCategory = '';
        (course as any).subCategory = '';
      }
    }
  }
}

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