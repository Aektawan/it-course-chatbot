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
      }
    ]
  },
  // Add remaining departments with placeholder data for now
  {
    id: 'INE',
    code: 'INE', 
    name: 'Information Network Engineering',
    nameThai: 'วิศวกรรมเครือข่ายสารสนเทศ',
    curricula: [
      { id: 'INE-62', year: 2019, buddhistYear: 2562, name: 'หลักสูตรวิศวกรรมเครือข่ายสารสนเทศ พ.ศ. 2562', duration: 4, totalCredits: 128, semesters: [] },
      { id: 'INE-67', year: 2024, buddhistYear: 2567, name: 'หลักสูตรวิศวกรรมเครือข่ายสารสนเทศ พ.ศ. 2567', duration: 4, totalCredits: 132, semesters: [] }
    ]
  },
  {
    id: 'INET',
    code: 'INET',
    name: 'Internet Technology', 
    nameThai: 'เทคโนโลยีอินเทอร์เน็ต',
    curricula: [
      { id: 'INET-62', year: 2019, buddhistYear: 2562, name: 'หลักสูตรเทคโนโลยีอินเทอร์เน็ต พ.ศ. 2562', duration: 3, totalCredits: 90, semesters: [] },
      { id: 'INET-67', year: 2024, buddhistYear: 2567, name: 'หลักสูตรเทคโนโลยีอินเทอร์เน็ต พ.ศ. 2567', duration: 3, totalCredits: 96, semesters: [] }
    ]
  },
  {
    id: 'ITI',
    code: 'ITI',
    name: 'Information Technology Innovation',
    nameThai: 'เทคโนโลยีสารสนเทศนวัตกรรม',
    curricula: [
      { id: 'ITI-61', year: 2018, buddhistYear: 2561, name: 'หลักสูตรเทคโนโลยีสารสนเทศนวัตกรรม พ.ศ. 2561', duration: 2, totalCredits: 60, semesters: [] },
      { id: 'ITI-66', year: 2023, buddhistYear: 2566, name: 'หลักสูตรเทคโนโลยีสารสนเทศนวัตกรรม พ.ศ. 2566', duration: 2, totalCredits: 66, semesters: [] }
    ]
  },
  {
    id: 'ITT',
    code: 'ITT',
    name: 'Information Technology for Teachers',
    nameThai: 'เทคโนโลยีสารสนเทศสำหรับครู',
    curricula: [
      { id: 'ITT-67', year: 2024, buddhistYear: 2567, name: 'หลักสูตรเทคโนโลยีสารสนเทศสำหรับครู พ.ศ. 2567', duration: 2, totalCredits: 72, semesters: [] }
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