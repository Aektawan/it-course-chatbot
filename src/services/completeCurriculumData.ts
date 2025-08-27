// Complete mock data for all curricula
import { Department } from '@/types/course';

interface CourseData {
  code: string;
  name: string;
  credits: number;
  category: 'core' | 'major' | 'elective' | 'general';
  prerequisites?: string[];
  corequisites?: string[];
}

interface SemesterData {
  [key: string]: CourseData[];
}

interface CurriculumData {
  [year: string]: SemesterData;
}

interface ProgramData {
  [program: string]: CurriculumData;
}

// Course data by program, curriculum year, and semester
const courseDatabase: ProgramData = {
  'IT': {
    '62': {
      '1-1': [
        { code: 'IT101', name: 'Introduction to Information Technology', credits: 3, category: 'core' },
        { code: 'IT102', name: 'Computer Programming Fundamentals', credits: 3, category: 'core' },
        { code: 'MT101', name: 'Mathematics for IT', credits: 3, category: 'core' },
        { code: 'EN101', name: 'English for Communication', credits: 3, category: 'general' },
        { code: 'TH101', name: 'Thai Language', credits: 2, category: 'general' },
        { code: 'PE101', name: 'Physical Education', credits: 1, category: 'general' }
      ],
      '1-2': [
        { code: 'IT103', name: 'Database Systems', credits: 3, category: 'core', prerequisites: ['IT101'] },
        { code: 'IT104', name: 'Web Development', credits: 3, category: 'major', prerequisites: ['IT102'] },
        { code: 'MT102', name: 'Statistics for IT', credits: 3, category: 'core', prerequisites: ['MT101'] },
        { code: 'EN102', name: 'English for IT', credits: 3, category: 'general', prerequisites: ['EN101'] },
        { code: 'SC101', name: 'Science and Technology', credits: 2, category: 'general' },
        { code: 'PE102', name: 'Sports and Recreation', credits: 1, category: 'general' }
      ],
      '2-1': [
        { code: 'IT201', name: 'Advanced Programming', credits: 3, category: 'core', prerequisites: ['IT102', 'IT104'] },
        { code: 'IT202', name: 'System Analysis and Design', credits: 3, category: 'major', prerequisites: ['IT103'] },
        { code: 'IT203', name: 'Network Fundamentals', credits: 3, category: 'major' },
        { code: 'MT201', name: 'Discrete Mathematics', credits: 3, category: 'core', prerequisites: ['MT102'] },
        { code: 'EN201', name: 'Technical Writing', credits: 2, category: 'general', prerequisites: ['EN102'] },
        { code: 'IT204', name: 'Software Engineering', credits: 3, category: 'major', prerequisites: ['IT201'] }
      ],
      '2-2': [
        { code: 'IT205', name: 'Advanced Database Systems', credits: 3, category: 'major', prerequisites: ['IT103', 'IT201'] },
        { code: 'IT206', name: 'Web Application Development', credits: 3, category: 'major', prerequisites: ['IT104', 'IT201'] },
        { code: 'IT207', name: 'Data Structures and Algorithms', credits: 3, category: 'core', prerequisites: ['IT201', 'MT201'] },
        { code: 'IT208', name: 'Computer Networks', credits: 3, category: 'major', prerequisites: ['IT203'] },
        { code: 'MT202', name: 'Linear Algebra', credits: 3, category: 'core', prerequisites: ['MT201'] },
        { code: 'EN202', name: 'Business Communication', credits: 2, category: 'general', prerequisites: ['EN201'] }
      ]
    },
    '67': {
      '1-1': [
        { code: 'IT201', name: 'Digital Literacy', credits: 3, category: 'core' },
        { code: 'IT202', name: 'Programming Logic', credits: 3, category: 'core' },
        { code: 'MT201', name: 'Discrete Mathematics', credits: 3, category: 'core' },
        { code: 'EN201', name: 'Communication Skills', credits: 3, category: 'general' },
        { code: 'TH201', name: 'Thai for Academic Writing', credits: 2, category: 'general' },
        { code: 'PE201', name: 'Health and Fitness', credits: 1, category: 'general' },
        { code: 'SO201', name: 'Society and Ethics', credits: 2, category: 'general' }
      ],
      '1-2': [
        { code: 'IT203', name: 'Data Structures', credits: 3, category: 'core', prerequisites: ['IT202'] },
        { code: 'IT204', name: 'Object-Oriented Programming', credits: 3, category: 'major', prerequisites: ['IT202'] },
        { code: 'MT202', name: 'Linear Algebra', credits: 3, category: 'core', prerequisites: ['MT201'] },
        { code: 'EN202', name: 'Technical English', credits: 3, category: 'general', prerequisites: ['EN201'] },
        { code: 'SC201', name: 'Environmental Science', credits: 2, category: 'general' },
        { code: 'PE202', name: 'Team Sports', credits: 1, category: 'general' }
      ],
      '2-1': [
        { code: 'IT301', name: 'Advanced Object-Oriented Programming', credits: 3, category: 'major', prerequisites: ['IT203', 'IT204'] },
        { code: 'IT302', name: 'Database Design and Implementation', credits: 3, category: 'core', prerequisites: ['IT203'] },
        { code: 'IT303', name: 'Software Architecture', credits: 3, category: 'major', prerequisites: ['IT204'] },
        { code: 'MT301', name: 'Probability and Statistics', credits: 3, category: 'core', prerequisites: ['MT202'] },
        { code: 'EN301', name: 'Professional Presentation', credits: 2, category: 'general', prerequisites: ['EN202'] },
        { code: 'IT304', name: 'Human-Computer Interaction', credits: 3, category: 'elective' }
      ]
    }
  },
  'INE': {
    '62': {
      '1-1': [
        { code: 'INE101', name: 'Network Engineering Fundamentals', credits: 3, category: 'core' },
        { code: 'INE102', name: 'Digital Electronics', credits: 3, category: 'core' },
        { code: 'MT101', name: 'Engineering Mathematics I', credits: 3, category: 'core' },
        { code: 'EN101', name: 'English Communication', credits: 3, category: 'general' },
        { code: 'TH101', name: 'Thai Language Skills', credits: 2, category: 'general' },
        { code: 'PE101', name: 'Physical Fitness', credits: 1, category: 'general' }
      ],
      '1-2': [
        { code: 'INE103', name: 'Computer Networks', credits: 3, category: 'core' },
        { code: 'INE104', name: 'Network Protocols', credits: 3, category: 'major' },
        { code: 'MT102', name: 'Engineering Mathematics II', credits: 3, category: 'core' },
        { code: 'EN102', name: 'Technical Communication', credits: 3, category: 'general' },
        { code: 'SC101', name: 'Physics for Engineers', credits: 3, category: 'general' },
        { code: 'PE102', name: 'Recreation Activities', credits: 1, category: 'general' }
      ]
    },
    '67': {
      '1-1': [
        { code: 'INE201', name: 'Modern Network Infrastructure', credits: 3, category: 'core' },
        { code: 'INE202', name: 'Network Security Basics', credits: 3, category: 'core' },
        { code: 'MT201', name: 'Applied Mathematics', credits: 3, category: 'core' },
        { code: 'EN201', name: 'Professional English', credits: 3, category: 'general' },
        { code: 'TH201', name: 'Academic Thai', credits: 2, category: 'general' },
        { code: 'PE201', name: 'Wellness and Health', credits: 1, category: 'general' },
        { code: 'SO201', name: 'Engineering Ethics', credits: 2, category: 'general' }
      ],
      '1-2': [
        { code: 'INE203', name: 'Wireless Networks', credits: 3, category: 'core' },
        { code: 'INE204', name: 'Network Design', credits: 3, category: 'major' },
        { code: 'MT202', name: 'Probability and Statistics', credits: 3, category: 'core' },
        { code: 'EN202', name: 'Engineering English', credits: 3, category: 'general' },
        { code: 'SC201', name: 'Applied Physics', credits: 3, category: 'general' },
        { code: 'PE202', name: 'Competitive Sports', credits: 1, category: 'general' }
      ]
    }
  },
  'INET': {
    '62': {
      '1-1': [
        { code: 'INET101', name: 'Internet Technology Fundamentals', credits: 3, category: 'core' },
        { code: 'INET102', name: 'Web Programming Basics', credits: 3, category: 'core' },
        { code: 'MT101', name: 'Mathematics for Internet Tech', credits: 3, category: 'core' },
        { code: 'EN101', name: 'English for Digital Age', credits: 3, category: 'general' },
        { code: 'TH101', name: 'Thai Communication', credits: 2, category: 'general' },
        { code: 'PE101', name: 'Physical Education', credits: 1, category: 'general' }
      ],
      '1-2': [
        { code: 'INET103', name: 'Internet Protocols', credits: 3, category: 'core' },
        { code: 'INET104', name: 'E-Commerce Systems', credits: 3, category: 'major' },
        { code: 'MT102', name: 'Statistics for Internet', credits: 3, category: 'core' },
        { code: 'EN102', name: 'Technical Writing', credits: 3, category: 'general' },
        { code: 'SC101', name: 'Computer Science Fundamentals', credits: 3, category: 'general' },
        { code: 'PE102', name: 'Sports and Wellness', credits: 1, category: 'general' }
      ]
    },
    '67': {
      '1-1': [
        { code: 'INET201', name: 'Modern Web Technologies', credits: 3, category: 'core' },
        { code: 'INET202', name: 'Cloud Computing Basics', credits: 3, category: 'core' },
        { code: 'MT201', name: 'Digital Mathematics', credits: 3, category: 'core' },
        { code: 'EN201', name: 'Global Communication', credits: 3, category: 'general' },
        { code: 'TH201', name: 'Academic Thai Writing', credits: 2, category: 'general' },
        { code: 'PE201', name: 'Health and Fitness', credits: 1, category: 'general' },
        { code: 'SO201', name: 'Digital Society', credits: 2, category: 'general' }
      ],
      '1-2': [
        { code: 'INET203', name: 'Internet Security', credits: 3, category: 'core' },
        { code: 'INET204', name: 'Mobile App Development', credits: 3, category: 'major' },
        { code: 'MT202', name: 'Applied Statistics', credits: 3, category: 'core' },
        { code: 'EN202', name: 'Business English', credits: 3, category: 'general' },
        { code: 'SC201', name: 'Innovation and Technology', credits: 2, category: 'general' },
        { code: 'PE202', name: 'Team Building Activities', credits: 1, category: 'general' }
      ]
    }
  },
  'ITI': {
    '61': {
      '1-1': [
        { code: 'ITI101', name: 'IT and Communication Fundamentals', credits: 3, category: 'core' },
        { code: 'ITI102', name: 'Digital Media Basics', credits: 3, category: 'core' },
        { code: 'MT101', name: 'Mathematics for IT Communication', credits: 3, category: 'core' },
        { code: 'EN101', name: 'English for Media', credits: 3, category: 'general' },
        { code: 'TH101', name: 'Thai Language and Culture', credits: 2, category: 'general' },
        { code: 'PE101', name: 'Physical Wellness', credits: 1, category: 'general' }
      ],
      '1-2': [
        { code: 'ITI103', name: 'Multimedia Systems', credits: 3, category: 'core' },
        { code: 'ITI104', name: 'Communication Networks', credits: 3, category: 'major' },
        { code: 'MT102', name: 'Statistics for Communication', credits: 3, category: 'core' },
        { code: 'EN102', name: 'Media English', credits: 3, category: 'general' },
        { code: 'SC101', name: 'Digital Arts and Science', credits: 2, category: 'general' },
        { code: 'PE102', name: 'Creative Movement', credits: 1, category: 'general' }
      ]
    },
    '66': {
      '1-1': [
        { code: 'ITI201', name: 'Digital Communication Theory', credits: 3, category: 'core' },
        { code: 'ITI202', name: 'Interactive Media Design', credits: 3, category: 'core' },
        { code: 'MT201', name: 'Applied Mathematics for Media', credits: 3, category: 'core' },
        { code: 'EN201', name: 'International Communication', credits: 3, category: 'general' },
        { code: 'TH201', name: 'Thai Media and Literature', credits: 2, category: 'general' },
        { code: 'PE201', name: 'Health and Movement', credits: 1, category: 'general' },
        { code: 'SO201', name: 'Media and Society', credits: 2, category: 'general' }
      ],
      '1-2': [
        { code: 'ITI203', name: 'Broadcast Technology', credits: 3, category: 'core' },
        { code: 'ITI204', name: 'Digital Content Creation', credits: 3, category: 'major' },
        { code: 'MT202', name: 'Media Statistics', credits: 3, category: 'core' },
        { code: 'EN202', name: 'Media Production English', credits: 3, category: 'general' },
        { code: 'SC201', name: 'Technology and Innovation', credits: 2, category: 'general' },
        { code: 'PE202', name: 'Performance Arts', credits: 1, category: 'general' }
      ]
    }
  },
  'ITT': {
    '67': {
      '1-1': [
        { code: 'ITT-060243102', name: 'การโปรแกรมคอมพิวเตอร์', credits: 3, category: 'core' },
        { code: 'ITT-060243105', name: 'ความรู้พื้นฐานในการออกแบบกราฟิก', credits: 3, category: 'core' },
        { code: 'ITT-060243108*', name: 'ระบบฐานข้อมูล', credits: 3, category: 'core' },
        { code: 'ITT-060243124', name: 'ธุรกิจดิจิทัลเบื้องต้น', credits: 3, category: 'core' },
        { code: 'ITT-080103063', name: 'การใช้ภาษาอังกฤษ', credits: 3, category: 'core' },
        { code: 'ITT-xxxxxxxxx', name: 'วิชาเลือกในหมวดวิชาศึกษาทั่วไป', credits: 3, category: 'elective' },
        { code: 'ITT-xxxxxxxxx ', name: 'วิชาเลือกในหมวดวิชาศึกษาทั่วไป', credits: 3, category: 'elective' },                         
        { code: 'MT101', name: 'Mathematics for Tourism Tech', credits: 3, category: 'core' },
        { code: 'EN101', name: 'English for Tourism', credits: 3, category: 'general' },
        { code: 'TH101', name: 'Thai Culture and Heritage', credits: 2, category: 'general' },
        { code: 'PE101', name: 'Outdoor Activities', credits: 1, category: 'general' },
        { code: 'TO101', name: 'Introduction to Tourism', credits: 2, category: 'major' }
      ],
      '1-2': [
        { code: 'ITT-060243104*', name: 'การเขียนโปรแกรมเชิงวัตถุ', credits: 3, category: 'core' },
        { code: 'ITT-060243115*', name: 'การออกแบบจากประสบการณ์ผู้ใช้', credits: 3, category: 'major' },
        { code: 'ITT-060243122', name: 'เว็บแอปพลิเคชัน', credits: 3, category: 'core' },
        { code: 'ITT-060243112', name: 'การวิเคราะหและออกแบบระบบ', credits: 3, category: 'major' },
        { code: 'ITT-060243123', name: 'เครือข่ายคอมพิวเตอร์และอินเทอร์เน็ต', credits: 3, category: 'major' },
        { code: 'ITT-060243119', name: 'การบริหารโครงการเทคโนโลยีสารสนเทศ', credits: 3, category: 'core' },
        { code: 'ITT-060243708', name: 'กระบวนการทางธุรกิจเชิงอิเล็กทรอนิกส์', credits: 3, category: 'major' },        
        { code: 'MT102', name: 'Statistics for Tourism', credits: 3, category: 'core' },
        { code: 'EN102', name: 'Hospitality English', credits: 3, category: 'general' },
        { code: 'SC101', name: 'Sustainable Tourism', credits: 2, category: 'general' },
        { code: 'PE102', name: 'Adventure Sports', credits: 1, category: 'general' }
      ]
    }
  }
};

export const generateCoursesForSemester = (
  programCode: string, 
  curriculumYear: string, 
  year: number, 
  semester: number, 
  courseCount: number = 6
) => {
  const semesterKey = `${year}-${semester}`;
  const programData = courseDatabase[programCode];
  
  if (programData && programData[curriculumYear]) {
    const curriculumData = programData[curriculumYear];
    const semesterCourses = curriculumData[semesterKey];
    
    if (semesterCourses && Array.isArray(semesterCourses)) {
      return semesterCourses.map((course) => ({
        id: `${course.code}-${curriculumYear}`,
        code: course.code,
        name: course.name,
        credits: course.credits,
        description: `รายละเอียดของ ${course.name} สำหรับหลักสูตร ${programCode} ${curriculumYear}`,
        prerequisites: course.prerequisites || [],
        corequisites: course.corequisites || [],
        category: course.category,
        semester,
        year,
        isActive: true
      }));
    }
  }
  
  // Fallback to generated courses if specific data not found
  const courses = [];
  for (let i = 1; i <= courseCount; i++) {
    const courseNumber = (year - 1) * 200 + semester * 100 + i;
    courses.push({
      id: `${programCode}${courseNumber}-${curriculumYear}`,
      code: `${programCode}${courseNumber}`,
      name: `Course ${i} - Year ${year} Semester ${semester}`,
      credits: Math.floor(Math.random() * 3) + 1,
      description: `Description for ${programCode} course in Year ${year}, Semester ${semester}`,
      prerequisites: [],
      corequisites: [],
      category: (i <= 3 ? 'core' : (i <= 5 ? 'major' : 'elective')) as 'core' | 'major' | 'elective' | 'general',
      semester,
      year,
      isActive: true
    });
  }
  return courses;
};

// Helper function to generate complete curriculum data
export const generateCompleteCurriculum = (
  programCode: string,
  curriculumId: string,
  curriculumYear: string,
  years: number = 4
) => {
  const semesters = [];
  for (let year = 1; year <= years; year++) {
    for (let semester = 1; semester <= 2; semester++) {
      semesters.push({
        year,
        semester,
        courses: generateCoursesForSemester(programCode, curriculumYear, year, semester)
      });
    }
  }
  return semesters;
};