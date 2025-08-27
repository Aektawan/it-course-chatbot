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
      ],
      '2-2': [
        { code: 'IT305', name: 'Advanced Web Development', credits: 3, category: 'major', prerequisites: ['IT301', 'IT302'] },
        { code: 'IT306', name: 'Mobile Application Development', credits: 3, category: 'major', prerequisites: ['IT303'] },
        { code: 'IT307', name: 'Network Programming', credits: 3, category: 'major', prerequisites: ['IT301'] },
        { code: 'MT302', name: 'Applied Statistics', credits: 3, category: 'core', prerequisites: ['MT301'] },
        { code: 'EN302', name: 'Technical Documentation', credits: 2, category: 'general', prerequisites: ['EN301'] },
        { code: 'IT308', name: 'Software Testing', credits: 3, category: 'major', prerequisites: ['IT303'] }
      ],
      '3-1': [
        { code: 'IT401', name: 'System Integration', credits: 3, category: 'major', prerequisites: ['IT305', 'IT307'] },
        { code: 'IT402', name: 'Machine Learning Fundamentals', credits: 3, category: 'elective', prerequisites: ['MT302'] },
        { code: 'IT403', name: 'Cloud Computing', credits: 3, category: 'elective', prerequisites: ['IT307'] },
        { code: 'IT404', name: 'Cybersecurity', credits: 3, category: 'major', prerequisites: ['IT307'] },
        { code: 'IT405', name: 'DevOps Practices', credits: 3, category: 'elective', prerequisites: ['IT308'] },
        { code: 'EN401', name: 'Professional Communication', credits: 2, category: 'general', prerequisites: ['EN302'] }
      ],
      '3-2': [
        { code: 'IT406', name: 'Advanced Machine Learning', credits: 3, category: 'elective', prerequisites: ['IT402'] },
        { code: 'IT407', name: 'Distributed Systems', credits: 3, category: 'major', prerequisites: ['IT401', 'IT403'] },
        { code: 'IT408', name: 'Blockchain Technology', credits: 3, category: 'elective', prerequisites: ['IT404'] },
        { code: 'IT409', name: 'Data Science', credits: 3, category: 'elective', prerequisites: ['IT402', 'MT302'] },
        { code: 'IT410', name: 'Project Management', credits: 3, category: 'major', prerequisites: ['IT401'] },
        { code: 'IT411', name: 'Ethics in Technology', credits: 2, category: 'general' }
      ],
      '4-1': [
        { code: 'IT501', name: 'Senior Project I', credits: 3, category: 'major', prerequisites: ['IT407', 'IT410'] },
        { code: 'IT502', name: 'Advanced Cybersecurity', credits: 3, category: 'elective', prerequisites: ['IT404', 'IT408'] },
        { code: 'IT503', name: 'AI Applications', credits: 3, category: 'elective', prerequisites: ['IT406'] },
        { code: 'IT504', name: 'IoT Systems', credits: 3, category: 'elective', prerequisites: ['IT407'] },
        { code: 'IT505', name: 'IT Entrepreneurship', credits: 2, category: 'elective', prerequisites: ['IT410'] },
        { code: 'IT506', name: 'Research Methodology', credits: 2, category: 'general' }
      ],
      '4-2': [
        { code: 'IT507', name: 'Senior Project II', credits: 3, category: 'major', prerequisites: ['IT501'] },
        { code: 'IT508', name: 'Advanced Software Engineering', credits: 3, category: 'elective', prerequisites: ['IT501'] },
        { code: 'IT509', name: 'IT Consulting', credits: 2, category: 'elective', prerequisites: ['IT505'] },
        { code: 'IT510', name: 'Professional Internship', credits: 6, category: 'major', prerequisites: ['IT501'] },
        { code: 'IT511', name: 'Capstone Presentation', credits: 1, category: 'major', prerequisites: ['IT507'] }
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
      ],
      '2-1': [
        { code: 'INE301', name: 'Advanced Wireless Systems', credits: 3, category: 'major', prerequisites: ['INE201', 'INE203'] },
        { code: 'INE302', name: 'Network Security Management', credits: 3, category: 'major', prerequisites: ['INE202'] },
        { code: 'INE303', name: 'Enterprise Network Solutions', credits: 3, category: 'core', prerequisites: ['INE204'] },
        { code: 'MT301', name: 'Advanced Signal Processing', credits: 3, category: 'core', prerequisites: ['MT202'] },
        { code: 'EN301', name: 'Technical Presentation', credits: 2, category: 'general', prerequisites: ['EN202'] },
        { code: 'INE304', name: 'Network Optimization', credits: 3, category: 'major', prerequisites: ['INE203'] }
      ],
      '2-2': [
        { code: 'INE305', name: 'Software-Defined Networks', credits: 3, category: 'major', prerequisites: ['INE301', 'INE302'] },
        { code: 'INE306', name: 'Cloud Network Architecture', credits: 3, category: 'major', prerequisites: ['INE303', 'INE304'] },
        { code: 'INE307', name: 'IoT Network Infrastructure', credits: 3, category: 'core', prerequisites: ['INE301', 'MT301'] },
        { code: 'INE308', name: 'Network Automation Tools', credits: 3, category: 'major', prerequisites: ['INE305'] },
        { code: 'MT302', name: 'Network Analytics', credits: 3, category: 'core', prerequisites: ['MT301'] },
        { code: 'EN302', name: 'Professional Communication', credits: 2, category: 'general', prerequisites: ['EN301'] }
      ],
      '3-1': [
        { code: 'INE401', name: 'Advanced Network Security', credits: 3, category: 'major', prerequisites: ['INE305', 'INE306'] },
        { code: 'INE402', name: '5G Network Technologies', credits: 3, category: 'major', prerequisites: ['INE307', 'INE308'] },
        { code: 'INE403', name: 'Network AI and ML', credits: 3, category: 'elective', prerequisites: ['INE306', 'MT302'] },
        { code: 'INE404', name: 'Edge Computing Networks', credits: 3, category: 'elective', prerequisites: ['INE307'] },
        { code: 'INE405', name: 'Network Project Management', credits: 3, category: 'major', prerequisites: ['INE308'] },
        { code: 'EN401', name: 'Advanced Technical Communication', credits: 2, category: 'general', prerequisites: ['EN302'] }
      ],
      '3-2': [
        { code: 'INE406', name: 'Cybersecurity in Networks', credits: 3, category: 'elective', prerequisites: ['INE401', 'INE403'] },
        { code: 'INE407', name: 'Network Innovation Lab', credits: 3, category: 'major', prerequisites: ['INE402', 'INE404'] },
        { code: 'INE408', name: 'Smart City Networks', credits: 3, category: 'elective', prerequisites: ['INE402', 'INE405'] },
        { code: 'INE409', name: 'Network Consulting', credits: 3, category: 'major', prerequisites: ['INE405'] },
        { code: 'INE410', name: 'Advanced Project Management', credits: 3, category: 'major', prerequisites: ['INE407'] },
        { code: 'INE411', name: 'Ethics in Network Engineering', credits: 2, category: 'general' }
      ],
      '4-1': [
        { code: 'INE501', name: 'Senior Project I', credits: 3, category: 'major', prerequisites: ['INE407', 'INE410'] },
        { code: 'INE502', name: 'Next-Gen Network Technologies', credits: 3, category: 'elective', prerequisites: ['INE406', 'INE408'] },
        { code: 'INE503', name: 'Network Research Methods', credits: 3, category: 'elective', prerequisites: ['INE409'] },
        { code: 'INE504', name: 'Quantum Networks', credits: 3, category: 'elective', prerequisites: ['INE407'] },
        { code: 'INE505', name: 'Network Entrepreneurship', credits: 2, category: 'elective', prerequisites: ['INE409'] },
        { code: 'INE506', name: 'Research Methodology', credits: 2, category: 'general' }
      ],
      '4-2': [
        { code: 'INE507', name: 'Senior Project II', credits: 3, category: 'major', prerequisites: ['INE501'] },
        { code: 'INE508', name: 'Advanced Network Engineering', credits: 3, category: 'elective', prerequisites: ['INE501'] },
        { code: 'INE509', name: 'Network Innovation Consulting', credits: 2, category: 'elective', prerequisites: ['INE505'] },
        { code: 'INE510', name: 'Professional Internship', credits: 6, category: 'major', prerequisites: ['INE501'] },
        { code: 'INE511', name: 'Capstone Presentation', credits: 1, category: 'major', prerequisites: ['INE507'] }
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
      ],
      '2-1': [
        { code: 'INET201', name: 'Advanced Web Programming', credits: 3, category: 'major', prerequisites: ['INET101', 'INET102'] },
        { code: 'INET202', name: 'Internet Security', credits: 3, category: 'major', prerequisites: ['INET103'] },
        { code: 'INET203', name: 'Database for Web Applications', credits: 3, category: 'core', prerequisites: ['INET104'] },
        { code: 'MT201', name: 'Applied Mathematics', credits: 3, category: 'core', prerequisites: ['MT102'] },
        { code: 'EN201', name: 'Business Communication', credits: 2, category: 'general', prerequisites: ['EN102'] },
        { code: 'INET204', name: 'Mobile Web Development', credits: 3, category: 'major', prerequisites: ['INET101'] }
      ],
      '2-2': [
        { code: 'INET205', name: 'Cloud Computing', credits: 3, category: 'major', prerequisites: ['INET201', 'INET202'] },
        { code: 'INET206', name: 'Web Application Security', credits: 3, category: 'major', prerequisites: ['INET202', 'INET203'] },
        { code: 'INET207', name: 'Big Data for Internet', credits: 3, category: 'core', prerequisites: ['INET203', 'MT201'] },
        { code: 'INET208', name: 'Internet of Things', credits: 3, category: 'major', prerequisites: ['INET204'] },
        { code: 'MT202', name: 'Data Analytics', credits: 3, category: 'core', prerequisites: ['MT201'] },
        { code: 'EN202', name: 'Technical Documentation', credits: 2, category: 'general', prerequisites: ['EN201'] }
      ],
      '3-1': [
        { code: 'INET301', name: 'Advanced Cloud Solutions', credits: 3, category: 'major', prerequisites: ['INET205', 'INET206'] },
        { code: 'INET302', name: 'AI for Internet Applications', credits: 3, category: 'major', prerequisites: ['INET207', 'INET208'] },
        { code: 'INET303', name: 'Blockchain Technology', credits: 3, category: 'elective', prerequisites: ['INET206', 'MT202'] },
        { code: 'INET304', name: 'DevOps and Deployment', credits: 3, category: 'elective', prerequisites: ['INET205'] },
        { code: 'INET305', name: 'Internet Business Strategy', credits: 3, category: 'major', prerequisites: ['INET208'] },
        { code: 'EN301', name: 'Professional Presentation', credits: 2, category: 'general', prerequisites: ['EN202'] }
      ],
      '3-2': [
        { code: 'INET306', name: 'Advanced Web Security', credits: 3, category: 'elective', prerequisites: ['INET301', 'INET303'] },
        { code: 'INET307', name: 'Machine Learning for Web', credits: 3, category: 'major', prerequisites: ['INET302', 'INET304'] },
        { code: 'INET308', name: 'Digital Marketing Technology', credits: 3, category: 'elective', prerequisites: ['INET302', 'INET305'] },
        { code: 'INET309', name: 'Internet Project Management', credits: 3, category: 'major', prerequisites: ['INET305'] },
        { code: 'INET310', name: 'Advanced Web Analytics', credits: 3, category: 'major', prerequisites: ['INET307'] },
        { code: 'INET311', name: 'Digital Ethics', credits: 2, category: 'general' }
      ],
      '4-1': [
        { code: 'INET401', name: 'Senior Project I', credits: 3, category: 'major', prerequisites: ['INET307', 'INET310'] },
        { code: 'INET402', name: 'Advanced Cybersecurity', credits: 3, category: 'elective', prerequisites: ['INET306', 'INET308'] },
        { code: 'INET403', name: 'Internet Innovation Lab', credits: 3, category: 'elective', prerequisites: ['INET309'] },
        { code: 'INET404', name: 'Web3 Technologies', credits: 3, category: 'elective', prerequisites: ['INET306'] },
        { code: 'INET405', name: 'Internet Entrepreneurship', credits: 2, category: 'elective', prerequisites: ['INET309'] },
        { code: 'INET406', name: 'Research Methodology', credits: 2, category: 'general' }
      ],
      '4-2': [
        { code: 'INET407', name: 'Senior Project II', credits: 3, category: 'major', prerequisites: ['INET401'] },
        { code: 'INET408', name: 'Advanced Internet Technologies', credits: 3, category: 'elective', prerequisites: ['INET401'] },
        { code: 'INET409', name: 'Internet Consulting', credits: 2, category: 'elective', prerequisites: ['INET405'] },
        { code: 'INET410', name: 'Professional Internship', credits: 6, category: 'major', prerequisites: ['INET401'] },
        { code: 'INET411', name: 'Capstone Presentation', credits: 1, category: 'major', prerequisites: ['INET407'] }
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
      ],
      '2-1': [
        { code: 'INET301', name: 'Advanced Web Technologies', credits: 3, category: 'major', prerequisites: ['INET201', 'INET203'] },
        { code: 'INET302', name: 'Cloud Native Development', credits: 3, category: 'major', prerequisites: ['INET202', 'INET204'] },
        { code: 'INET303', name: 'AI-Powered Web Apps', credits: 3, category: 'core', prerequisites: ['INET204', 'MT202'] },
        { code: 'MT301', name: 'Machine Learning Math', credits: 3, category: 'core', prerequisites: ['MT202'] },
        { code: 'EN301', name: 'Technical Communication', credits: 2, category: 'general', prerequisites: ['EN202'] },
        { code: 'INET304', name: 'Progressive Web Apps', credits: 3, category: 'major', prerequisites: ['INET201'] }
      ],
      '2-2': [
        { code: 'INET305', name: 'Microservices Architecture', credits: 3, category: 'major', prerequisites: ['INET301', 'INET302'] },
        { code: 'INET306', name: 'Advanced Cloud Security', credits: 3, category: 'major', prerequisites: ['INET302', 'INET303'] },
        { code: 'INET307', name: 'Real-time Web Applications', credits: 3, category: 'core', prerequisites: ['INET303', 'INET304'] },
        { code: 'INET308', name: 'Web Performance Optimization', credits: 3, category: 'major', prerequisites: ['INET304'] },
        { code: 'MT302', name: 'Advanced Data Analytics', credits: 3, category: 'core', prerequisites: ['MT301'] },
        { code: 'EN302', name: 'Professional Writing', credits: 2, category: 'general', prerequisites: ['EN301'] }
      ],
      '3-1': [
        { code: 'INET401', name: 'Web3 and Blockchain', credits: 3, category: 'major', prerequisites: ['INET305', 'INET306'] },
        { code: 'INET402', name: 'Advanced AI Integration', credits: 3, category: 'major', prerequisites: ['INET307', 'INET308'] },
        { code: 'INET403', name: 'Internet Scalability', credits: 3, category: 'elective', prerequisites: ['INET305', 'MT302'] },
        { code: 'INET404', name: 'Edge Computing', credits: 3, category: 'elective', prerequisites: ['INET306'] },
        { code: 'INET405', name: 'Digital Innovation Management', credits: 3, category: 'major', prerequisites: ['INET308'] },
        { code: 'EN401', name: 'Advanced Technical Presentation', credits: 2, category: 'general', prerequisites: ['EN302'] }
      ],
      '3-2': [
        { code: 'INET406', name: 'Quantum Internet', credits: 3, category: 'elective', prerequisites: ['INET401', 'INET403'] },
        { code: 'INET407', name: 'Internet Innovation Lab', credits: 3, category: 'major', prerequisites: ['INET402', 'INET404'] },
        { code: 'INET408', name: 'Metaverse Technologies', credits: 3, category: 'elective', prerequisites: ['INET402', 'INET405'] },
        { code: 'INET409', name: 'Internet Project Leadership', credits: 3, category: 'major', prerequisites: ['INET405'] },
        { code: 'INET410', name: 'Advanced Innovation Management', credits: 3, category: 'major', prerequisites: ['INET407'] },
        { code: 'INET411', name: 'Digital Society Ethics', credits: 2, category: 'general' }
      ],
      '4-1': [
        { code: 'INET501', name: 'Senior Project I', credits: 3, category: 'major', prerequisites: ['INET407', 'INET410'] },
        { code: 'INET502', name: 'Next-Gen Internet Technologies', credits: 3, category: 'elective', prerequisites: ['INET406', 'INET408'] },
        { code: 'INET503', name: 'Internet Research Methods', credits: 3, category: 'elective', prerequisites: ['INET409'] },
        { code: 'INET504', name: 'Future Web Technologies', credits: 3, category: 'elective', prerequisites: ['INET407'] },
        { code: 'INET505', name: 'Internet Startup', credits: 2, category: 'elective', prerequisites: ['INET409'] },
        { code: 'INET506', name: 'Research Methodology', credits: 2, category: 'general' }
      ],
      '4-2': [
        { code: 'INET507', name: 'Senior Project II', credits: 3, category: 'major', prerequisites: ['INET501'] },
        { code: 'INET508', name: 'Advanced Internet Solutions', credits: 3, category: 'elective', prerequisites: ['INET501'] },
        { code: 'INET509', name: 'Internet Technology Consulting', credits: 2, category: 'elective', prerequisites: ['INET505'] },
        { code: 'INET510', name: 'Professional Internship', credits: 6, category: 'major', prerequisites: ['INET501'] },
        { code: 'INET511', name: 'Capstone Presentation', credits: 1, category: 'major', prerequisites: ['INET507'] }
      ]
    }
  },
  'ITI': {
    '61': {
      '1-1': [
        { code: 'ITI-040203123', name: 'คณิตศาสตร์เต็มหน่วยและการประยุกต์', credits: 3, category: 'core' },
        { code: 'ITI-060223110', name: 'ทักษะคอมพิวเตอร์เบื้องต้น', credits: 2, category: 'core' },
        { code: 'ITI-060223111', name: 'ดิจิทัลอิเล็กทรอนิกส์', credits: 3, category: 'core' },
        { code: 'ITI-060223112', name: 'ปฏิบัติการดิจิทัลอิเล็กทรอนิกส์', credits: 1, category: 'general' },
        { code: 'ITI-060223113', name: 'การโปรแกรมโครงสร้าง', credits: 3, category: 'general' },
        { code: 'ITI-060223114', name: 'ปฏิบัติการโปรแกรมโครงสร้าง', credits: 1, category: 'general' },        { code: 'TH101', name: 'Thai Language and Culture', credits: 2, category: 'general' },
        { code: 'ITI-060223115', name: 'การวิเคราะห์และออกแบบระบบ', credits: 3, category: 'general' },
        { code: 'ITI-080103061', name: 'การใช้ภาษาอังกฤษ 1', credits: 3, category: 'general' }
      ],
      '1-2': [
        { code: 'ITI-060223116', name: 'การโปรแกรมเชิงวัตถุ', credits: 3, category: 'core' },
        { code: 'ITI-060223117', name: 'ปฏิบัติการโปรแกรมเชิงวัตถุ', credits: 1, category: 'major' },
        { code: 'ITI-060223118', name: 'ปฏิบัติการพัฒนาเว็บแอพพลิเคชั่น', credits: 3, category: 'core' },
        { code: 'ITI-060223120', name: 'สถาปัตยกรรมคอมพิวเตอร์และองค์ประกอบ', credits: 3, category: 'general' },
        { code: 'ITI-060223121', name: 'การศึกษาโครงงานเทคโนโลยีสารสนเทศ', credits: 1, category: 'general' },
        { code: 'ITI-060223123', name: 'ระบบฐานข้อมูล', credits: 3, category: 'general' },
        { code: 'ITI-060223124', name: 'การสื่อสารข้อมูลและเครือข่ายคอมพิวเตอร์', credits: 3, category: 'general' },
        { code: 'ITI-080103062', name: 'การใช้ภาษาอังกฤษ 2', credits: 3, category: 'general' }
      ],
      '2-1': [
        { code: 'ITI-040xxxxxx', name: 'วิชาเลือกในกลุ่มวิชาวิทยาศาสตร์และคณิตศาสตร์', credits: 3, category: 'core' },
        { code: 'ITI-08xxxxxxx', name: 'วิชาเลือกในกลุ่มวิชาสังคมศาสตร์และมนุษยศาสตร์', credits: 3, category: 'major' },
        { code: 'ITI-060223122', name: 'โครงงานพิเศษเทคโนโลยีสารสนเทศ', credits: 3, category: 'core' },
        { code: 'ITI-060223119', name: 'โครงสร้างข้อมูลและขั้นตอนวิธี', credits: 3, category: 'general' },
        { code: 'ITI-060223125', name: 'ระบบปฏิบัติการคอมพิวเตอร์', credits: 3, category: 'general' },
        { code: 'ITI-060223126', name: 'รสัมมนาเทคโนโลยีสารสนเทศ', credits: 1, category: 'general' },
        { code: 'ITI-060223127', name: 'การพัฒนาโปรแกรมประยุกต์สำหรับสถาปัตยกรรมแบบโอเพ่นซอร์ส', credits: 3, category: 'general' },
        { code: 'ITI-060223xxx', name: 'วิชาเลือก 1', credits: 3, category: 'general' }
      ],
      '2-2': [
        { code: 'ITI-060223128', name: 'หัวข้อเฉพาะเรื่องทางเทคโนโลยีสารสนเทศเพื่ออุตสาหกรรม', credits: 3, category: 'major', prerequisites: ['ITI201', 'ITI202'] },
        { code: 'ITI-060223xxx ', name: 'วิชาเลือก 2', credits: 3, category: 'major', prerequisites: ['ITI203', 'ITI204'] },
        { code: 'ITI-060223xxx  ', name: 'วิชาเลือก 3', credits: 3, category: 'core', prerequisites: ['ITI203', 'MT201'] },
        { code: 'ITI-xxxxxxxxx', name: 'วิชาเลือกเสรี 1', credits: 3, category: 'major', prerequisites: ['ITI205'] },
        { code: 'ITI-xxxxxxxxx ', name: 'วิชาเลือกเสรี 2', credits: 3, category: 'core', prerequisites: ['MT201'] },
        { code: 'ITI-080103xxx', name: 'วิชาเลือกในกลุ่มวิชาภาษา', credits:3, category: 'general', prerequisites: ['EN201'] }
      ],

    },
    '66': {
      '1-1': [
        { code: 'ITI-060223130', name: 'ทักษะคอมพิวเตอร์เบื้องตอน', credits: 1, category: 'core' },
        { code: 'ITI-060223111*', name: 'ดิจิทัลอิเล็กทรอนิกส์', credits: 3, category: 'core' },
        { code: 'ITI-060223112', name: 'ปฏิบัติการดิจิทัลอิเล็กทรอนิกส์', credits: 1, category: 'core' },
        { code: 'ITI-060223131*', name: 'การโปรแกรมโครงสร้าง', credits: 2, category: 'general' },
        { code: 'ITI-060223114', name: 'ปฏิบัติการโปรแกรมโครงสร้าง', credits: 1, category: 'general' },
        { code: 'ITI-060223123*', name: 'ระบบฐานข้อมูล', credits: 3, category: 'general' },
        { code: 'ITI-080103061', name: 'การใช้ภาษาอังกฤษ 1', credits: 3, category: 'general' },
        { code: 'ITI-040xxxxxx', name: 'วิชาเลือกในกลุ่มวิชาวิทยาศาสตร์และคณิตศาสตร์', credits: 3, category: 'general' }
      ],
      '1-2': [
        { code: 'ITI-060223115', name: 'การวิเคราะห์และออกแบบระบบ', credits: 3, category: 'core' },
        { code: 'ITI-060223132', name: 'การโปรแกรมเชิงวัตถุ', credits: 2, category: 'core' },
        { code: 'ITI-060223117', name: 'ปฏิบัติการโปรแกรมเชิงวัตถุ', credits: 1, category: 'core' },
        { code: 'ITI-060223119', name: 'โครงสร้างข้อมูลและขั้นตอนวิธี', credits: 3, category: 'general' },
        { code: 'ITI-060223135*', name: 'สถาปัตยกรรมคอมพิวเตอร์และระบบปฏิบัติการ', credits: 3, category: 'general' },
        { code: 'ITI-060223136', name: 'การศึกษาโครงงานเทคโนโลยีสารสนเทศ', credits: 2, category: 'general' },
        { code: 'ITI-080103062', name: 'การใชภาษาอังกฤษ 2', credits: 3, category: 'general' },
        { code: 'ITI-080xxxxxx', name: 'วิชาเลือกในกลุ่มวิชาบูรณาการ', credits: 3, category: 'general' }
      ],
      '2-1': [
        { code: 'ITI-060223124', name: 'การสื่อสารข้อมูลและเครือข่ายคอมพิวเตอร์', credits: 3, category: 'core' },
        { code: 'ITI-060223133*', name: 'การพัฒนาเว็บแอปพลิเคชัน', credits: 2, category: 'core' },
        { code: 'ITI-060223134', name: 'ปฏิบัติการพัฒนาเว็บแอปพลิเคชัน', credits: 1, category: 'core' },
        { code: 'ITI-060223137', name: 'โครงงานพิเศษเทคโนโลยีสารสนเทศ', credits: 4, category: 'general' },
        { code: 'ITI-08xxxxxxx', name: 'วิชาเลือกในกลุ่มวิชาสังคมศาสตร์และมนุษยศาสตร์', credits: 3, category: 'general' },
        { code: 'ITI-0602232xx', name: 'วิชาเลือก', credits: 3, category: 'general' },
        { code: 'ITI-xxxxxxxxx', name: 'วิชาเลือกเสรี', credits: 3, category: 'general' }
      ],
      '2-2': [
        { code: 'ITI-060223126', name: 'สัมมนาเทคโนโลยีสารสนเทศ', credits: 1, category: 'core' },
        { code: 'ITI-060223127', name: 'การพัฒนาโปรแกรมประยุกต์สําหรับสถาปัตยกรรมแบบโอเพ่นซอร์ส', credits: 3, category: 'core' },
        { code: 'ITI-060223128', name: 'หัวข้อเฉพาะเรื่องทางเทคโนโลยีสารสนเทศเพื่ออุตสาหกรรม', credits: 3, category: 'core' },
        { code: 'ITI-060223138*', name: 'อินเทอร์เน็ตในทุกสิ่งและระบบอัจฉริยะ', credits: 3, category: 'general' },
        { code: 'ITI-060223139', name: 'ปฏิบัติการอินเทอร์เน็ตในทุกสิ่งและระบบอัจฉริยะ', credits: 1, category: 'general' },
        { code: 'ITI-080103xxx', name: 'วิชาเลือกในกลุ่มวิชาภาษา', credits: 3, category: 'general' },
        { code: 'ITI-0602232xx  ', name: 'วิชาเลือก', credits: 3, category: 'general' },
        { code: 'ITI-xxxxxxxxx      ', name: 'วิชาเลือกเสรี', credits: 3, category: 'general' }
      ],
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
        { code: 'ITT-xxxxxxxxx ', name: 'วิชาเลือกในหมวดวิชาศึกษาทั่วไป', credits: 3, category: 'elective' }                       
      ],
      '1-2': [
        { code: 'ITT-060243104*', name: 'การเขียนโปรแกรมเชิงวัตถุ', credits: 3, category: 'core' },
        { code: 'ITT-060243115*', name: 'การออกแบบจากประสบการณ์ผู้ใช้', credits: 3, category: 'major' },
        { code: 'ITT-060243122', name: 'เว็บแอปพลิเคชัน', credits: 3, category: 'core' },
        { code: 'ITT-060243112', name: 'การวิเคราะหและออกแบบระบบ', credits: 3, category: 'major' },
        { code: 'ITT-060243123', name: 'เครือข่ายคอมพิวเตอร์และอินเทอร์เน็ต', credits: 3, category: 'major' },
        { code: 'ITT-060243119', name: 'การบริหารโครงการเทคโนโลยีสารสนเทศ', credits: 3, category: 'core' },
        { code: 'ITT-060243708', name: 'กระบวนการทางธุรกิจเชิงอิเล็กทรอนิกส์', credits: 3, category: 'major' }       

      ],
      '2-1': [
        { code: 'ITT-060243116*', name: 'อินเทอร์เน็ตในทุกสรรพสิ่ง', credits: 3, category: 'major', prerequisites: ['ITT-060243104*'] },
        { code: 'ITT-060243106*', name: 'โครงสร้างข้อมูลและขั้นตอนวิธี', credits: 3, category: 'core', prerequisites: ['ITT-060243108*'] },
        { code: 'ITT-060243707', name: 'การโปรแกรมคอมพิวเตอร์ทางธุรกิจ', credits: 3, category: 'major' },
        { code: 'ITT-060243718', name: 'การวิเคราะห์ธุรกิจ', credits: 3, category: 'major' },
        { code: 'ITT-060243706', name: 'โปรแกรมประยุกต์การวางแผนทรัพยากรองค์กร', credits: 3, category: 'major', prerequisites: ['ITT-060243124'] },
        { code: 'ITT-060243118', name: 'การพัฒนาโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่', credits: 3, category: 'general', prerequisites: ['ITT-080103063'] },
        { code: 'ITT-060243111*', name: 'วิศวกรรมซอฟต์แวร์', credits: 3, category: 'general', prerequisites: ['ITT-080103063'] }
      ],
      '2-2': [
        { code: 'ITT-060243716', name: 'หัวข้อเฉพาะเรื่องทางธุรกิจดิจิทัล', credits: 3, category: 'major', prerequisites: ['ITT-060243201', 'ITT-060243202'] },
        { code: 'ITT-060243717', name: 'การประยุกต์คอมพิวเตอร์เพื่องานธุรกิจ', credits: 3, category: 'major', prerequisites: ['ITT-060243202'] },
        { code: 'ITT-060243705', name: 'ระบบอัจฉริยะเชิงธุรกิจ', credits: 3, category: 'elective', prerequisites: ['ITT-060243203'] },
        { code: 'ITT-060243202', name: 'โครงงานเทคโนโลยีสารสนเทศ 1', credits: 3, category: 'major', prerequisites: ['ITT-060243708'] },
        { code: 'ITT-xxxxxxxxx  ', name: 'วิชาเลือกเสรี', credits: 3, category: 'major', prerequisites: ['ITT-060243115*'] },
        { code: 'ITT-xxxxxxxxx   ', name: 'วิชาเลือกเสรี', credits: 3, category: 'major', prerequisites: ['ITT-060243119'] },
        { code: 'ITT-xxxxxxxxx    ', name: 'วิชาเลือกในหมวดวิชาศึกษาทั่วไป', credits: 3, category: 'major', prerequisites: ['ITT-060243119'] }
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