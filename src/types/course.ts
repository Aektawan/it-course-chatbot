export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  description: string;
  prerequisites: string[];
  corequisites: string[];
  category: 'core' | 'major' | 'elective' | 'general';
  semester: number;
  year: number;
  instructor?: string;
  isActive: boolean;
}

export interface StudentCourse {
  courseId: string;
  status: 'completed' | 'in_progress' | 'planned' | 'failed';
  grade?: string;
  semester: number;
  year: number;
}

export interface StudyPlan {
  id: string;
  studentId: string;
  courses: StudentCourse[];
  totalCredits: number;
  completedCredits: number;
  currentSemester: number;
  currentYear: number;
  lastUpdated: Date;
}

export interface CoursePrerequisite {
  courseId: string;
  prerequisiteId: string;
  type: 'prerequisite' | 'corequisite';
  isRequired: boolean;
}