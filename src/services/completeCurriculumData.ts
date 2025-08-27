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
    '68': {
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
      ],
      '3-1': [
        { code: 'IT301', name: 'Software Engineering Project', credits: 3, category: 'major', prerequisites: ['IT204', 'IT205'] },
        { code: 'IT302', name: 'Mobile Application Development', credits: 3, category: 'major', prerequisites: ['IT206', 'IT207'] },
        { code: 'IT303', name: 'Artificial Intelligence', credits: 3, category: 'elective', prerequisites: ['IT207', 'MT202'] },
        { code: 'IT304', name: 'Network Security', credits: 3, category: 'major', prerequisites: ['IT208'] },
        { code: 'IT305', name: 'Cloud Computing', credits: 3, category: 'elective', prerequisites: ['IT208'] },
        { code: 'EN301', name: 'Professional Presentation', credits: 2, category: 'general', prerequisites: ['EN202'] }
      ],
      '3-2': [
        { code: 'IT306', name: 'Machine Learning', credits: 3, category: 'elective', prerequisites: ['IT303', 'MT202'] },
        { code: 'IT307', name: 'DevOps and Deployment', credits: 3, category: 'major', prerequisites: ['IT301', 'IT305'] },
        { code: 'IT308', name: 'Data Analytics', credits: 3, category: 'elective', prerequisites: ['IT205', 'MT202'] },
        { code: 'IT309', name: 'Cybersecurity Management', credits: 3, category: 'major', prerequisites: ['IT304'] },
        { code: 'IT310', name: 'IT Project Management', credits: 3, category: 'major', prerequisites: ['IT301'] },
        { code: 'IT311', name: 'Digital Innovation', credits: 2, category: 'elective' }
      ],
      '4-1': [
        { code: 'IT401', name: 'Senior Project I', credits: 3, category: 'major', prerequisites: ['IT307', 'IT310'] },
        { code: 'IT402', name: 'Blockchain Technology', credits: 3, category: 'elective', prerequisites: ['IT304', 'IT305'] },
        { code: 'IT403', name: 'IoT Systems', credits: 3, category: 'elective', prerequisites: ['IT208', 'IT302'] },
        { code: 'IT404', name: 'Big Data Technologies', credits: 3, category: 'elective', prerequisites: ['IT308'] },
        { code: 'IT405', name: 'IT Entrepreneurship', credits: 2, category: 'elective', prerequisites: ['IT310'] },
        { code: 'IT406', name: 'Professional Ethics in IT', credits: 2, category: 'general' }
      ],
      '4-2': [
        { code: 'IT407', name: 'Senior Project II', credits: 3, category: 'major', prerequisites: ['IT401'] },
        { code: 'IT408', name: 'Advanced Software Architecture', credits: 3, category: 'elective', prerequisites: ['IT301', 'IT307'] },
        { code: 'IT409', name: 'IT Consulting', credits: 2, category: 'elective', prerequisites: ['IT310', 'IT405'] },
        { code: 'IT410', name: 'Internship', credits: 6, category: 'major', prerequisites: ['IT401'] },
        { code: 'IT411', name: 'Capstone Presentation', credits: 1, category: 'major', prerequisites: ['IT407'] }
      ]
    }
  },
  'INE': {
    '68': {
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
      ],
      '2-1': [
        { code: 'INE201', name: 'Advanced Network Protocols', credits: 3, category: 'major', prerequisites: ['INE103', 'INE104'] },
        { code: 'INE202', name: 'Network Security Fundamentals', credits: 3, category: 'major', prerequisites: ['INE103'] },
        { code: 'INE203', name: 'Routing and Switching', credits: 3, category: 'core', prerequisites: ['INE104'] },
        { code: 'MT201', name: 'Signal Processing', credits: 3, category: 'core', prerequisites: ['MT102'] },
        { code: 'EN201', name: 'Engineering Communication', credits: 2, category: 'general', prerequisites: ['EN102'] },
        { code: 'INE204', name: 'Network Design Principles', credits: 3, category: 'major', prerequisites: ['INE103'] }
      ],
      '2-2': [
        { code: 'INE205', name: 'Wireless Communication Systems', credits: 3, category: 'major', prerequisites: ['INE201', 'INE202'] },
        { code: 'INE206', name: 'Network Management', credits: 3, category: 'major', prerequisites: ['INE203', 'INE204'] },
        { code: 'INE207', name: 'Fiber Optic Communications', credits: 3, category: 'core', prerequisites: ['INE203', 'MT201'] },
        { code: 'INE208', name: 'Network Troubleshooting', credits: 3, category: 'major', prerequisites: ['INE206'] },
        { code: 'MT202', name: 'Digital Signal Processing', credits: 3, category: 'core', prerequisites: ['MT201'] },
        { code: 'EN202', name: 'Technical Documentation', credits: 2, category: 'general', prerequisites: ['EN201'] }
      ],
      '3-1': [
        { code: 'INE301', name: 'Advanced Network Security', credits: 3, category: 'major', prerequisites: ['INE202', 'INE205'] },
        { code: 'INE302', name: 'VoIP Systems', credits: 3, category: 'major', prerequisites: ['INE205', 'INE207'] },
        { code: 'INE303', name: 'Network Performance Analysis', credits: 3, category: 'elective', prerequisites: ['INE206', 'MT202'] },
        { code: 'INE304', name: 'Cloud Networking', credits: 3, category: 'elective', prerequisites: ['INE206'] },
        { code: 'INE305', name: 'Mobile Networks', credits: 3, category: 'major', prerequisites: ['INE205'] },
        { code: 'EN301', name: 'Professional Presentation', credits: 2, category: 'general', prerequisites: ['EN202'] }
      ],
      '3-2': [
        { code: 'INE306', name: 'Network Virtualization', credits: 3, category: 'elective', prerequisites: ['INE301', 'INE304'] },
        { code: 'INE307', name: 'Enterprise Network Design', credits: 3, category: 'major', prerequisites: ['INE301', 'INE303'] },
        { code: 'INE308', name: 'IoT Networks', credits: 3, category: 'elective', prerequisites: ['INE302', 'INE305'] },
        { code: 'INE309', name: 'Network Automation', credits: 3, category: 'major', prerequisites: ['INE304'] },
        { code: 'INE310', name: 'Project Management for Engineers', credits: 3, category: 'major', prerequisites: ['INE307'] },
        { code: 'INE311', name: 'Engineering Ethics', credits: 2, category: 'general' }
      ],
      '4-1': [
        { code: 'INE401', name: 'Senior Project I', credits: 3, category: 'major', prerequisites: ['INE307', 'INE310'] },
        { code: 'INE402', name: 'Advanced Cybersecurity', credits: 3, category: 'elective', prerequisites: ['INE301', 'INE306'] },
        { code: 'INE403', name: '5G Network Technologies', credits: 3, category: 'elective', prerequisites: ['INE305', 'INE308'] },
        { code: 'INE404', name: 'Software-Defined Networking', credits: 3, category: 'elective', prerequisites: ['INE306', 'INE309'] },
        { code: 'INE405', name: 'Network Consulting', credits: 2, category: 'elective', prerequisites: ['INE310'] },
        { code: 'INE406', name: 'Research Methodology', credits: 2, category: 'general' }
      ],
      '4-2': [
        { code: 'INE407', name: 'Senior Project II', credits: 3, category: 'major', prerequisites: ['INE401'] },
        { code: 'INE408', name: 'Advanced Network Solutions', credits: 3, category: 'elective', prerequisites: ['INE401'] },
        { code: 'INE409', name: 'Network Engineering Entrepreneurship', credits: 2, category: 'elective', prerequisites: ['INE405'] },
        { code: 'INE410', name: 'Professional Internship', credits: 6, category: 'major', prerequisites: ['INE401'] },
        { code: 'INE411', name: 'Capstone Presentation', credits: 1, category: 'major', prerequisites: ['INE407'] }
      ]
    }
  },
  'INET': {
    '68': {
      '1-1': [
        { code: 'INET101', name: 'Internet Technology Fundamentals', credits: 3, category: 'core' },
        { code: 'INET102', name: 'Web Development Basics', credits: 3, category: 'core' },
        { code: 'INET103', name: 'Network Protocols', credits: 3, category: 'core' },
        { code: 'MT101', name: 'Mathematics for Internet Tech', credits: 3, category: 'core' },
        { code: 'EN101', name: 'English for Internet Business', credits: 3, category: 'general' },
        { code: 'TH101', name: 'Thai Communication Skills', credits: 2, category: 'general' },
        { code: 'PE101', name: 'Physical Education', credits: 1, category: 'general' }
      ],
      '1-2': [
        { code: 'INET104', name: 'Database for Web Applications', credits: 3, category: 'core', prerequisites: ['INET101'] },
        { code: 'INET105', name: 'Advanced Web Development', credits: 3, category: 'major', prerequisites: ['INET102'] },
        { code: 'INET106', name: 'Internet Security Basics', credits: 3, category: 'major', prerequisites: ['INET103'] },
        { code: 'MT102', name: 'Statistics for Internet Business', credits: 3, category: 'core', prerequisites: ['MT101'] },
        { code: 'EN102', name: 'Technical English', credits: 3, category: 'general', prerequisites: ['EN101'] },
        { code: 'SC101', name: 'Digital Society', credits: 2, category: 'general' }
      ],
      '2-1': [
        { code: 'INET201', name: 'E-Commerce Systems', credits: 3, category: 'major', prerequisites: ['INET104', 'INET105'] },
        { code: 'INET202', name: 'Mobile Web Development', credits: 3, category: 'major', prerequisites: ['INET105'] },
        { code: 'INET203', name: 'Cloud Computing', credits: 3, category: 'major', prerequisites: ['INET106'] },
        { code: 'INET204', name: 'Web Analytics', credits: 3, category: 'major', prerequisites: ['MT102'] },
        { code: 'EN201', name: 'Business Communication', credits: 2, category: 'general', prerequisites: ['EN102'] },
        { code: 'INET205', name: 'Internet Marketing', credits: 3, category: 'elective' }
      ],
      '2-2': [
        { code: 'INET206', name: 'Advanced E-Commerce', credits: 3, category: 'major', prerequisites: ['INET201', 'INET202'] },
        { code: 'INET207', name: 'API Development', credits: 3, category: 'major', prerequisites: ['INET202', 'INET203'] },
        { code: 'INET208', name: 'Internet Business Models', credits: 3, category: 'major', prerequisites: ['INET204', 'INET205'] },
        { code: 'INET209', name: 'Web Project Management', credits: 3, category: 'major', prerequisites: ['INET204'] },
        { code: 'EN202', name: 'Professional Presentation', credits: 2, category: 'general', prerequisites: ['EN201'] },
        { code: 'INET210', name: 'Digital Innovation', credits: 2, category: 'elective' }
      ],
      '3-1': [
        { code: 'INET301', name: 'Advanced Internet Technologies', credits: 3, category: 'major', prerequisites: ['INET206', 'INET207'] },
        { code: 'INET302', name: 'Internet Entrepreneurship', credits: 3, category: 'major', prerequisites: ['INET208', 'INET209'] },
        { code: 'INET303', name: 'Capstone Project I', credits: 3, category: 'major', prerequisites: ['INET207', 'INET209'] },
        { code: 'INET304', name: 'Professional Internship', credits: 6, category: 'major', prerequisites: ['INET206'] },
        { code: 'INET305', name: 'Industry Seminar', credits: 1, category: 'major' }
      ],
      '3-2': [
        { code: 'INET306', name: 'Capstone Project II', credits: 3, category: 'major', prerequisites: ['INET303'] },
        { code: 'INET307', name: 'Advanced Internet Business', credits: 3, category: 'elective', prerequisites: ['INET302'] },
        { code: 'INET308', name: 'Internet Technology Consulting', credits: 3, category: 'elective', prerequisites: ['INET301'] },
        { code: 'INET309', name: 'Professional Portfolio', credits: 2, category: 'major', prerequisites: ['INET304'] },
        { code: 'INET310', name: 'Final Presentation', credits: 1, category: 'major', prerequisites: ['INET306'] },
        { code: 'INET311', name: 'Ethics in Internet Business', credits: 2, category: 'general' }
      ]
    }
  },
  'ITI': {
    '68': {
      '1-1': [
        { code: 'ITI101', name: 'Information Technology Fundamentals', credits: 3, category: 'core' },
        { code: 'ITI102', name: 'Programming Basics', credits: 3, category: 'core' },
        { code: 'ITI103', name: 'Computer Hardware', credits: 3, category: 'core' },
        { code: 'ITI104', name: 'Operating Systems', credits: 3, category: 'core' },
        { code: 'MT101', name: 'Applied Mathematics', credits: 3, category: 'core' },
        { code: 'EN101', name: 'Technical English', credits: 3, category: 'general' },
        { code: 'TH101', name: 'Thai Communication', credits: 2, category: 'general' }
      ],
      '1-2': [
        { code: 'ITI105', name: 'Database Systems', credits: 3, category: 'core', prerequisites: ['ITI101'] },
        { code: 'ITI106', name: 'Web Programming', credits: 3, category: 'major', prerequisites: ['ITI102'] },
        { code: 'ITI107', name: 'Network Fundamentals', credits: 3, category: 'major', prerequisites: ['ITI103'] },
        { code: 'ITI108', name: 'System Administration', credits: 3, category: 'major', prerequisites: ['ITI104'] },
        { code: 'MT102', name: 'Statistics', credits: 3, category: 'core', prerequisites: ['MT101'] },
        { code: 'EN102', name: 'Professional English', credits: 3, category: 'general', prerequisites: ['EN101'] }
      ],
      '2-1': [
        { code: 'ITI201', name: 'Advanced Programming', credits: 3, category: 'major', prerequisites: ['ITI105', 'ITI106'] },
        { code: 'ITI202', name: 'Network Administration', credits: 3, category: 'major', prerequisites: ['ITI107', 'ITI108'] },
        { code: 'ITI203', name: 'IT Project Management', credits: 3, category: 'major', prerequisites: ['ITI106'] },
        { code: 'ITI204', name: 'IT Security', credits: 3, category: 'major', prerequisites: ['ITI107'] },
        { code: 'ITI205', name: 'Professional Development', credits: 2, category: 'general', prerequisites: ['EN102'] },
        { code: 'ITI206', name: 'Industry Practicum I', credits: 4, category: 'major', prerequisites: ['ITI108'] }
      ],
      '2-2': [
        { code: 'ITI207', name: 'Capstone Project', credits: 4, category: 'major', prerequisites: ['ITI201', 'ITI203'] },
        { code: 'ITI208', name: 'Advanced IT Solutions', credits: 3, category: 'major', prerequisites: ['ITI202', 'ITI204'] },
        { code: 'ITI209', name: 'IT Consulting', credits: 3, category: 'elective', prerequisites: ['ITI203'] },
        { code: 'ITI210', name: 'Industry Practicum II', credits: 6, category: 'major', prerequisites: ['ITI206'] },
        { code: 'ITI211', name: 'Professional Presentation', credits: 1, category: 'major', prerequisites: ['ITI207'] },
        { code: 'ITI212', name: 'IT Ethics', credits: 1, category: 'general' }
      ]
    }
  },
  'ITT': {
    '68': {
      '1-1': [
        { code: 'ITT101', name: 'Tourism Technology Fundamentals', credits: 3, category: 'core' },
        { code: 'ITT102', name: 'Introduction to Tourism Industry', credits: 3, category: 'core' },
        { code: 'ITT103', name: 'Digital Marketing for Tourism', credits: 3, category: 'core' },
        { code: 'ITT104', name: 'Hospitality Management Systems', credits: 3, category: 'core' },
        { code: 'EN101', name: 'English for Tourism', credits: 3, category: 'general' },
        { code: 'TH101', name: 'Thai Culture and Heritage', credits: 2, category: 'general' },
        { code: 'MT101', name: 'Statistics for Tourism', credits: 3, category: 'core' }
      ],
      '1-2': [
        { code: 'ITT105', name: 'Tourism Website Development', credits: 3, category: 'major', prerequisites: ['ITT101'] },
        { code: 'ITT106', name: 'Travel Booking Systems', credits: 3, category: 'major', prerequisites: ['ITT102'] },
        { code: 'ITT107', name: 'Social Media Tourism Marketing', credits: 3, category: 'major', prerequisites: ['ITT103'] },
        { code: 'ITT108', name: 'Hotel Management Technology', credits: 3, category: 'major', prerequisites: ['ITT104'] },
        { code: 'EN102', name: 'Hospitality English', credits: 3, category: 'general', prerequisites: ['EN101'] },
        { code: 'ITT109', name: 'Customer Service Technology', credits: 2, category: 'major', prerequisites: ['ITT102'] }
      ],
      '2-1': [
        { code: 'ITT201', name: 'Advanced Tourism Applications', credits: 3, category: 'major', prerequisites: ['ITT105', 'ITT106'] },
        { code: 'ITT202', name: 'Tourism Analytics', credits: 3, category: 'major', prerequisites: ['ITT107', 'MT101'] },
        { code: 'ITT203', name: 'Smart Tourism Solutions', credits: 3, category: 'major', prerequisites: ['ITT108', 'ITT109'] },
        { code: 'ITT204', name: 'Tourism Project Management', credits: 3, category: 'major', prerequisites: ['ITT106'] },
        { code: 'ITT205', name: 'Professional Communication', credits: 2, category: 'general', prerequisites: ['EN102'] },
        { code: 'ITT206', name: 'Tourism Practicum I', credits: 4, category: 'major', prerequisites: ['ITT108'] }
      ],
      '2-2': [
        { code: 'ITT207', name: 'Tourism Technology Capstone', credits: 4, category: 'major', prerequisites: ['ITT201', 'ITT204'] },
        { code: 'ITT208', name: 'Advanced Tourism Marketing', credits: 3, category: 'major', prerequisites: ['ITT202', 'ITT203'] },
        { code: 'ITT209', name: 'Tourism Innovation Lab', credits: 3, category: 'elective', prerequisites: ['ITT203'] },
        { code: 'ITT210', name: 'Tourism Practicum II', credits: 6, category: 'major', prerequisites: ['ITT206'] },
        { code: 'ITT211', name: 'Capstone Presentation', credits: 1, category: 'major', prerequisites: ['ITT207'] },
        { code: 'ITT212', name: 'Tourism Ethics', credits: 1, category: 'general' }
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
  
  // Determine actual years based on program
  let actualYears = years;
  if (programCode === 'INET') {
    actualYears = 3;
  } else if (programCode === 'ITI' || programCode === 'ITT') {
    actualYears = 2;
  }
  
  for (let year = 1; year <= actualYears; year++) {
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