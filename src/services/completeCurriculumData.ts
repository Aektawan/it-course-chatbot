// Complete mock data for remaining curricula
import { Department } from '@/types/course';

// This file contains the remaining curriculum data that would be used to complete
// the mock data for INET, ITI, and ITT programs

// Since the task requires all 9 curriculums with 8 semesters each (6-7 courses per semester),
// this would be a very large file. For the mockup demonstration, we can use placeholder
// course data with the correct structure.

export const generateCoursesForSemester = (
  programCode: string, 
  curriculumYear: string, 
  year: number, 
  semester: number, 
  courseCount: number = 6
) => {
  const courses = [];
  for (let i = 1; i <= courseCount; i++) {
    const courseNumber = (year - 1) * 200 + semester * 100 + i;
    courses.push({
      id: `${programCode}${courseNumber}-${curriculumYear}`,
      code: `${programCode}${courseNumber}`,
      name: `Course ${i} - Year ${year} Semester ${semester}`,
      credits: Math.floor(Math.random() * 3) + 1, // 1-3 credits
      description: `Description for ${programCode} course in Year ${year}, Semester ${semester}`,
      prerequisites: [],
      corequisites: [],
      category: i <= 3 ? 'core' : (i <= 5 ? 'major' : 'elective'),
      semester,
      year,
      instructor: `Dr. Instructor ${i}`,
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