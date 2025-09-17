import React, { useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Course } from '@/types/course';
import { generateCoursesForSemester } from '@/services/completeCurriculumData';
import { Download, ArrowDownRight } from 'lucide-react';
import { exportToPDF } from '@/utils/pdfExport';

interface CurriculumTimelineFlowchartProps {
  selectedDepartment: string;
  selectedCurriculum: string;
  departmentName: string;
}

export const CurriculumTimelineFlowchart: React.FC<CurriculumTimelineFlowchartProps> = ({ 
  selectedDepartment, 
  selectedCurriculum, 
  departmentName 
}) => {
  const flowchartRef = useRef<HTMLDivElement>(null);

  // Generate course data organized by year and semester
  const timelineData = useMemo(() => {
    const [programCode, curriculumYear] = selectedCurriculum.split(' ');
    const maxYear = programCode === 'INET' ? 3 : programCode === 'ITI' || programCode === 'ITT' ? 2 : 4;
    
    const timeline: { [year: number]: { [semester: number]: Course[] } } = {};
    
    for (let year = 1; year <= maxYear; year++) {
      timeline[year] = {};
      
      // Regular semesters
      for (let semester = 1; semester <= 2; semester++) {
        const courses = generateCoursesForSemester(programCode, curriculumYear, year, semester, 8);
        if (courses.length > 0) {
          timeline[year][semester] = courses;
        }
      }
      
      // Special semester 3 for specific programs
      if ((programCode === 'IT' || programCode === 'INE') && year === 3) {
        const courses = generateCoursesForSemester(programCode, curriculumYear, year, 3, 4);
        if (courses.length > 0) timeline[year][3] = courses;
      }
      if (programCode === 'INET' && year === 2) {
        const courses = generateCoursesForSemester(programCode, curriculumYear, year, 3, 4);
        if (courses.length > 0) timeline[year][3] = courses;
      }
      if (programCode === 'ITI' && year === 1) {
        const courses = generateCoursesForSemester(programCode, curriculumYear, year, 3, 4);
        if (courses.length > 0) timeline[year][3] = courses;
      }
    }
    
    return timeline;
  }, [selectedCurriculum]);

  const calculateSemesterCredits = (courses: Course[]) => {
    return courses.reduce((sum, course) => sum + course.credits, 0);
  };

  const handleExportPDF = async () => {
    if (flowchartRef.current) {
      await exportToPDF(flowchartRef.current, `แผนผังหลักสูตร_${departmentName}_${selectedCurriculum}`);
    }
  };

  // Format credits in Thai academic style (e.g., 3(3-0-6))
  const formatCredits = (credits: number) => {
    // Assuming lecture-lab-individual format for academic credits
    const lecture = credits;
    const lab = 0;
    const individual = credits * 2;
    return `${credits}(${lecture}-${lab}-${individual})`;
  };

  // Find prerequisites within the current curriculum
  const findPrerequisiteInCurriculum = (course: Course) => {
    const prerequisites: Course[] = [];
    if (course.prerequisites && course.prerequisites.length > 0) {
      Object.values(timelineData).forEach(yearData => {
        Object.values(yearData).forEach(courses => {
          courses.forEach(prereqCourse => {
            if (course.prerequisites.some(prereq => 
              prereqCourse.code.includes(prereq.split(' ')[0]) || 
              prereqCourse.name.includes(prereq)
            )) {
              prerequisites.push(prereqCourse);
            }
          });
        });
      });
    }
    return prerequisites;
  };

  // Get category color for academic style
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return 'border-gray-800 bg-gray-100';
      case 'major': return 'border-gray-600 bg-gray-50';
      case 'elective': return 'border-gray-400 bg-white';
      case 'free': return 'border-gray-300 bg-gray-25';
      case 'general': return 'border-gray-500 bg-gray-75';
      default: return 'border-gray-400 bg-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Export Button */}
      <div className="flex justify-between items-center bg-white p-4 border-b-2 border-gray-800">
        <div className="text-center flex-1">
          <h1 className="text-2xl font-bold text-gray-800">
            แผนผังรายวิชา {departmentName}
          </h1>
          <p className="text-lg text-gray-600">หลักสูตร {selectedCurriculum}</p>
        </div>
        <Button onClick={handleExportPDF} variant="outline" size="sm" className="flex items-center gap-2 border-gray-800">
          <Download className="w-4 h-4" />
          ส่งออก PDF
        </Button>
      </div>

      {/* Academic Timeline Flowchart */}
      <div ref={flowchartRef} className="bg-white p-8 border-2 border-gray-300">
        <div className="space-y-8">
          {Object.entries(timelineData)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([year, semesters]) => (
              <div key={year} className="space-y-6">
                {/* Year Header */}
                <div className="text-center">
                  <div className="inline-block bg-gray-800 text-white px-8 py-3 text-xl font-bold">
                    ปีที่ {year}
                  </div>
                </div>

                {/* Semesters Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Object.entries(semesters)
                    .sort(([a], [b]) => Number(a) - Number(b))
                    .map(([semester, courses]) => (
                      <div key={semester} className="border-2 border-gray-800 bg-gray-50">
                        {/* Semester Header */}
                        <div className="bg-gray-800 text-white text-center py-2">
                          <h3 className="text-lg font-bold">
                            เทอมที่ {semester}
                            {semester === '3' && ' (ฝึกงาน)'}
                          </h3>
                        </div>
                        
                        {/* Course List */}
                        <div className="p-4 space-y-3 min-h-[400px]">
                          {courses.map((course, index) => {
                            const prerequisites = findPrerequisiteInCurriculum(course);
                            
                            return (
                              <div key={course.id} className="relative">
                                {/* Course Box */}
                                <div className={`border-2 ${getCategoryColor(course.category)} p-3 relative`}>
                                  <div className="space-y-2">
                                    {/* Course Code */}
                                    <div className="font-bold text-sm text-gray-800">
                                      {course.code}
                                    </div>
                                    
                                    {/* Course Name */}
                                    <div className="text-xs leading-tight text-gray-700 font-medium min-h-[32px]">
                                      {course.name}
                                    </div>
                                    
                                    {/* Credits */}
                                    <div className="text-xs font-bold text-gray-800 text-center">
                                      {formatCredits(course.credits)}
                                    </div>
                                  </div>

                                  {/* Prerequisites indicator */}
                                  {prerequisites.length > 0 && (
                                    <div className="absolute -top-2 -left-2">
                                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                                    </div>
                                  )}
                                </div>

                                {/* Prerequisites info */}
                                {prerequisites.length > 0 && (
                                  <div className="mt-1 text-xs text-red-600">
                                    วิชาบังคับก่อน: {prerequisites.map(p => p.code).join(', ')}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* Semester Credits Total */}
                        <div className="bg-gray-200 border-t-2 border-gray-800 text-center py-2">
                          <span className="font-bold text-gray-800">
                            รวม {calculateSemesterCredits(courses)} หน่วยกิต
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
                
                {/* Year separator */}
                {Number(year) < Object.keys(timelineData).length && (
                  <div className="border-b-2 border-gray-400 my-8"></div>
                )}
              </div>
            ))}
        </div>

        {/* Legend */}
        <div className="mt-8 p-4 border-2 border-gray-300 bg-gray-50">
          <h4 className="font-bold text-gray-800 mb-2">หมายเหตุ:</h4>
          <div className="text-xs text-gray-700 space-y-1">
            <p>• รูปแบบหน่วยกิต: หน่วยกิต(ทฤษฎี-ปฏิบัติ-ศึกษาด้วยตนเอง)</p>
            <p>• <ArrowDownRight className="w-3 h-3 inline text-red-600" /> แสดงวิชาที่มีวิชาบังคับก่อน</p>
            <p>• หลักสูตร {selectedCurriculum} - {departmentName}</p>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-white border-2 border-gray-300 p-6">
        <h3 className="text-lg font-bold text-gray-800 text-center mb-4">สรุปหลักสูตร</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center border border-gray-400 p-4">
            <div className="text-3xl font-bold text-gray-800">
              {Object.keys(timelineData).length}
            </div>
            <div className="text-sm text-gray-600">ปีการศึกษา</div>
          </div>
          <div className="text-center border border-gray-400 p-4">
            <div className="text-3xl font-bold text-gray-800">
              {Object.values(timelineData).reduce((total, year) => 
                total + Object.keys(year).length, 0
              )}
            </div>
            <div className="text-sm text-gray-600">ภาคการศึกษา</div>
          </div>
          <div className="text-center border border-gray-400 p-4">
            <div className="text-3xl font-bold text-gray-800">
              {Object.values(timelineData).reduce((total, year) => 
                total + Object.values(year).reduce((yearTotal, courses) => 
                  yearTotal + courses.reduce((sum, course) => sum + course.credits, 0), 0
                ), 0
              )}
            </div>
            <div className="text-sm text-gray-600">หน่วยกิตรวม</div>
          </div>
        </div>
      </div>
    </div>
  );
};