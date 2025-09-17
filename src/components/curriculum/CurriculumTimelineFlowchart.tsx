import React, { useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Course } from '@/types/course';
import { generateCoursesForSemester } from '@/services/completeCurriculumData';
import { Download } from 'lucide-react';
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
      
      // Regular semesters with more courses for better flowchart
      for (let semester = 1; semester <= 2; semester++) {
        const courses = generateCoursesForSemester(programCode, curriculumYear, year, semester, 7);
        if (courses.length > 0) {
          timeline[year][semester] = courses;
        }
      }
      
      // Special semester 3 for specific programs
      if ((programCode === 'IT' || programCode === 'INE') && year === 3) {
        const courses = generateCoursesForSemester(programCode, curriculumYear, year, 3, 2);
        if (courses.length > 0) timeline[year][3] = courses;
      }
      if (programCode === 'INET' && year === 2) {
        const courses = generateCoursesForSemester(programCode, curriculumYear, year, 3, 2);
        if (courses.length > 0) timeline[year][3] = courses;
      }
      if (programCode === 'ITI' && year === 1) {
        const courses = generateCoursesForSemester(programCode, curriculumYear, year, 3, 2);
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
    const lecture = credits;
    const lab = 0;
    const individual = credits * 2;
    return `${credits}(${lecture}-${lab}-${individual})`;
  };

  // Create a flat list of all semesters for easier layout
  const semesterLayout = useMemo(() => {
    const layout: Array<{
      year: number;
      semester: number;
      courses: Course[];
      label: string;
      isInternship: boolean;
    }> = [];

    Object.entries(timelineData)
      .sort(([a], [b]) => Number(a) - Number(b))
      .forEach(([year, semesters]) => {
        Object.entries(semesters)
          .sort(([a], [b]) => Number(a) - Number(b))
          .forEach(([semester, courses]) => {
            layout.push({
              year: Number(year),
              semester: Number(semester),
              courses,
              label: semester === '3' ? 'ฝึกงาน' : `เทอมที่ ${semester}`,
              isInternship: semester === '3'
            });
          });
      });

    return layout;
  }, [timelineData]);

  // Find prerequisite relationships for drawing arrows
  const findPrerequisites = (course: Course) => {
    const prereqIds: string[] = [];
    if (course.prerequisites && course.prerequisites.length > 0) {
      console.log(`Finding prerequisites for ${course.code}:`, course.prerequisites);
      
      // Find courses in previous semesters that match prerequisites
      semesterLayout.forEach((semData) => {
        semData.courses.forEach((c) => {
          if (course.prerequisites.some(prereq => 
            c.code.includes(prereq.split(' ')[0]) || 
            c.name.includes(prereq) ||
            prereq.includes(c.code.split('-')[1] || c.code)
          )) {
            console.log(`Found prerequisite match: ${c.code} for ${course.code}`);
            prereqIds.push(c.id);
          }
        });
      });
    }
    console.log(`Prerequisites found for ${course.code}:`, prereqIds.length);
    return prereqIds;
  };

  // Calculate course positions for arrow routing
  const getCoursePosition = (semIndex: number, courseIndex: number) => {
    const colWidth = 100 / semesterLayout.length;
    const courseHeight = 90; // 80px height + 10px gap
    const startY = 10; // Header offset

    return {
      left: semIndex * colWidth,
      right: (semIndex + 1) * colWidth,
      top: startY + courseIndex * courseHeight,
      bottom: startY + courseIndex * courseHeight + 80,
      centerX: semIndex * colWidth + colWidth / 2,
      centerY: startY + courseIndex * courseHeight + 40
    };
  };

  // Check if a point is inside any course box
  const isPointInCourseBox = (x: number, y: number, excludeSemester?: number, excludeCourse?: number) => {
    for (let semIndex = 0; semIndex < semesterLayout.length; semIndex++) {
      if (semIndex === excludeSemester) continue;
      
      for (let courseIndex = 0; courseIndex < semesterLayout[semIndex].courses.length; courseIndex++) {
        if (semIndex === excludeSemester && courseIndex === excludeCourse) continue;
        
        const pos = getCoursePosition(semIndex, courseIndex);
        const colWidth = 100 / semesterLayout.length;
        
        if (x >= pos.left && x <= pos.right && y >= pos.top && y <= pos.bottom) {
          return true;
        }
      }
    }
    return false;
  };

  // Generate orthogonal path from source to target avoiding obstacles
  const generateOrthogonalPath = (
    startSemIndex: number, startCourseIndex: number,
    endSemIndex: number, endCourseIndex: number,
    arrowIndex: number
  ) => {
    const colWidth = 100 / semesterLayout.length;
    const startPos = getCoursePosition(startSemIndex, startCourseIndex);
    const endPos = getCoursePosition(endSemIndex, endCourseIndex);
    
    console.log(`Generating path from sem ${startSemIndex} course ${startCourseIndex} to sem ${endSemIndex} course ${endCourseIndex}`);
    
    // Connection points - exit from right of source, enter from left of target
    const startX = startPos.right - 1; // Small offset to avoid border
    const startY = startPos.centerY;
    const endX = endPos.left + 1; // Small offset to avoid border
    const endY = endPos.centerY;
    
    console.log(`Path coordinates: (${startX}%, ${startY}) to (${endX}%, ${endY})`);
    
    // Calculate intermediate routing points to avoid course blocks
    const midX1 = startX + (colWidth * 0.2); // Move right from source
    const midX2 = endX - (colWidth * 0.2); // Move left to target
    
    // Use different Y channels to avoid arrow overlaps
    const channelOffset = arrowIndex * 5; // Vertical separation for multiple arrows
    const routingY = Math.min(startY, endY) - 20 - channelOffset;
    
    // Create clean orthogonal path through white spaces
    const pathPoints = [
      { x: startX, y: startY }, // Start from right edge of source
      { x: midX1, y: startY }, // Move horizontally right
      { x: midX1, y: routingY }, // Move vertically to routing channel
      { x: midX2, y: routingY }, // Move horizontally across
      { x: midX2, y: endY }, // Move vertically to target level
      { x: endX, y: endY } // Enter left edge of target
    ];

    return pathPoints;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center bg-white p-4 border-b-2 border-black">
        <h1 className="text-lg font-bold">
          แผนผังรายวิชาตามแผนการเรียนของนักศึกษาวิทยาลัยนวัตกรรม หลักสูตร {departmentName} (ปรับปรุง ปี {selectedCurriculum.split(' ')[1]})
        </h1>
        <Button 
          onClick={handleExportPDF} 
          variant="outline" 
          size="sm" 
          className="mt-2 border-black"
        >
          <Download className="w-4 h-4 mr-2" />
          ส่งออก PDF
        </Button>
      </div>

      {/* Flowchart */}
      <div ref={flowchartRef} className="bg-white overflow-x-auto">
        <div className="inline-block min-w-full p-4">
          {/* Semester Headers */}
          <div className="grid grid-flow-col auto-cols-fr gap-4 mb-2">
            {semesterLayout.map((semData, index) => (
              <div key={index} className="text-center">
                <div className="font-bold text-sm mb-1">
                  ปีที่ {semData.year} {semData.label}
                </div>
              </div>
            ))}
          </div>

          {/* Course Grid with SVG Arrows */}
          <div className="relative">
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              style={{ minHeight: '600px' }}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Draw orthogonal arrows between prerequisites */}
              {semesterLayout.map((semData, semIndex) =>
                semData.courses.map((course, courseIndex) => {
                  const prereqIds = findPrerequisites(course);
                  console.log(`Course ${course.code} has ${prereqIds.length} prerequisites`);
                  
                  return prereqIds.map((prereqId, arrowIndex) => {
                    // Find prerequisite course position
                    let prereqSemIndex = -1;
                    let prereqCourseIndex = -1;
                    
                    semesterLayout.forEach((prevSem, prevSemIndex) => {
                      const courseIdx = prevSem.courses.findIndex(c => c.id === prereqId);
                      if (courseIdx !== -1 && prevSemIndex < semIndex) {
                        prereqSemIndex = prevSemIndex;
                        prereqCourseIndex = courseIdx;
                      }
                    });

                    if (prereqSemIndex >= 0) {
                      console.log(`Drawing arrow from ${prereqSemIndex},${prereqCourseIndex} to ${semIndex},${courseIndex}`);
                      
                      // Generate orthogonal path
                      const pathPoints = generateOrthogonalPath(
                        prereqSemIndex, prereqCourseIndex,
                        semIndex, courseIndex,
                        arrowIndex
                      );

                      // Create SVG path string using viewBox coordinates
                      const pathString = pathPoints.map((point, index) => {
                        const x = point.x;
                        const y = (point.y / 600) * 100; // Convert pixel position to viewBox percentage
                        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ');

                      console.log(`Generated path: ${pathString}`);

                      return (
                        <g key={`${course.id}-${prereqId}-${arrowIndex}`}>
                          <defs>
                            <marker
                              id={`arrowhead-${course.id}-${arrowIndex}`}
                              markerWidth="2"
                              markerHeight="1.5"
                              refX="1.8"
                              refY="0.75"
                              orient="auto"
                              markerUnits="strokeWidth"
                            >
                              <polygon
                                points="0 0, 2 0.75, 0 1.5"
                                fill="black"
                              />
                            </marker>
                          </defs>
                          {/* Orthogonal path */}
                          <path
                            d={pathString}
                            stroke="black"
                            strokeWidth="0.3"
                            fill="none"
                            markerEnd={`url(#arrowhead-${course.id}-${arrowIndex})`}
                          />
                        </g>
                      );
                    }
                    return null;
                  });
                })
              )}
            </svg>

            {/* Course Boxes Grid */}
            <div className="grid grid-flow-col auto-cols-fr gap-4 relative z-20">
              {semesterLayout.map((semData, semIndex) => (
                <div key={semIndex} className="space-y-3">
                  {/* Course boxes */}
                  <div className="space-y-3" style={{ minHeight: '500px' }}>
                    {semData.courses.map((course, courseIndex) => (
                      <div
                        key={course.id}
                        id={`course-${course.id}`}
                        className="border-2 border-black bg-white p-1 text-xs relative flex flex-col justify-between"
                        style={{ height: '80px', minWidth: '120px' }}
                      >
                        {/* Course Code */}
                        <div className="font-bold text-center text-[10px] leading-tight">
                          {course.code}
                        </div>
                        
                        {/* Course Name */}
                        <div className="text-center leading-tight flex-1 flex items-center justify-center px-1" style={{ fontSize: '8px' }}>
                          <span className="line-clamp-3 overflow-hidden text-ellipsis">
                            {course.name}
                          </span>
                        </div>
                        
                        {/* Credits */}
                        <div className="text-center font-bold text-[9px]">
                          {formatCredits(course.credits)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Credits Summary */}
                  <div className="text-center text-sm font-bold border-t-2 border-black pt-2">
                    {calculateSemesterCredits(semData.courses)} หน่วยกิต
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white p-4 border-2 border-black">
        <div className="text-center">
          <h3 className="font-bold mb-2">สรุปหลักสูตร</h3>
          <div className="flex justify-center space-x-8 text-sm">
            <div>
              <span className="font-bold">ระยะเวลา:</span> {Object.keys(timelineData).length} ปี
            </div>
            <div>
              <span className="font-bold">หน่วยกิตรวม:</span> {
                Object.values(timelineData).reduce((total, year) => 
                  total + Object.values(year).reduce((yearTotal, courses) => 
                    yearTotal + courses.reduce((sum, course) => sum + course.credits, 0), 0
                  ), 0
                )
              } หน่วยกิต
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};