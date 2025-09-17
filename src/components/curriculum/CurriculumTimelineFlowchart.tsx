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

  // DIAGRAM ENGINE - Curriculum flowchart with prerequisite arrows
  // Following strict orthogonal routing rules through white gutters

  // Course layout constants
  const COURSE_WIDTH = 120;
  const COURSE_HEIGHT = 80;
  const GUTTER_WIDTH = 32;
  const GUTTER_HEIGHT = 24;
  const CLEARANCE = 8;
  const LANE_WIDTH = 4;

  // Find prerequisite relationships
  const findPrerequisites = (course: Course) => {
    const prereqIds: string[] = [];
    if (course.prerequisites && course.prerequisites.length > 0) {
      semesterLayout.forEach((semData) => {
        semData.courses.forEach((c) => {
          if (course.prerequisites.some(prereq => 
            c.code.includes(prereq.split(' ')[0]) || 
            c.name.includes(prereq) ||
            prereq.includes(c.code.split('-')[1] || c.code)
          )) {
            prereqIds.push(c.id);
          }
        });
      });
    }
    return prereqIds;
  };

  // Calculate precise course positions in the grid
  const getCourseRect = (semIndex: number, courseIndex: number) => {
    const x = semIndex * (COURSE_WIDTH + GUTTER_WIDTH);
    const y = courseIndex * (COURSE_HEIGHT + GUTTER_HEIGHT) + 60; // Header offset
    
    return {
      x,
      y,
      width: COURSE_WIDTH,
      height: COURSE_HEIGHT,
      centerX: x + COURSE_WIDTH / 2,
      centerY: y + COURSE_HEIGHT / 2,
      left: x,
      right: x + COURSE_WIDTH,
      top: y,
      bottom: y + COURSE_HEIGHT
    };
  };

  // Get connection ports for courses
  const getConnectionPorts = (rect: any) => ({
    topCenter: { x: rect.centerX, y: rect.top },
    bottomCenter: { x: rect.centerX, y: rect.bottom },
    rightCenter: { x: rect.right, y: rect.centerY },
    leftCenter: { x: rect.left, y: rect.centerY }
  });

  // Check if a rectangular area overlaps with any course box
  const overlapsWithCourses = (x: number, y: number, width: number, height: number, excludeBoxes: string[] = []) => {
    return semesterLayout.some((semData, semIdx) =>
      semData.courses.some((course, courseIdx) => {
        if (excludeBoxes.includes(`${semIdx}-${courseIdx}`)) return false;
        
        const courseRect = getCourseRect(semIdx, courseIdx);
        return !(x >= courseRect.right + CLEARANCE || 
                x + width <= courseRect.left - CLEARANCE ||
                y >= courseRect.bottom + CLEARANCE || 
                y + height <= courseRect.top - CLEARANCE);
      })
    );
  };

  // Gutter center rail routing constants
  const SAFE_CLEARANCE = 8;     // Minimum clearance from nodes
  const STUB_LENGTH = 12;       // Vertical stub before turning
  const LANE_STEP = GUTTER_HEIGHT / 3; // Spacing between parallel rails

  // Calculate gutter center rail Y position between two course rows
  const getGutterCenterY = (upperRowIndex: number, lowerRowIndex: number) => {
    const upperY = upperRowIndex * (COURSE_HEIGHT + GUTTER_HEIGHT) + 60; // Header offset
    const lowerY = lowerRowIndex * (COURSE_HEIGHT + GUTTER_HEIGHT) + 60;
    const upperBottom = upperY + COURSE_HEIGHT;
    const lowerTop = lowerY;
    return (upperBottom + lowerTop) / 2;
  };

  // Find available horizontal rail in gutter space using center rail + lane shifting
  const findHorizontalRail = (
    startRowIndex: number, 
    endRowIndex: number, 
    usedLanes: Set<string>
  ) => {
    // Determine which rows this connection passes between
    const minRow = Math.min(startRowIndex, endRowIndex);
    const maxRow = Math.max(startRowIndex, endRowIndex);
    
    // For same-row connections, use gutter below that row
    let gutterRowIndex;
    if (startRowIndex === endRowIndex) {
      gutterRowIndex = startRowIndex;
    } else {
      // Use the gutter between the rows or below the lower row
      gutterRowIndex = Math.max(minRow, maxRow - 1);
    }
    
    // Calculate center rail Y position
    const centerY = getGutterCenterY(gutterRowIndex, gutterRowIndex + 1);
    
    // Try center rail first
    const centerLaneKey = `rail-${gutterRowIndex}-0`;
    if (!usedLanes.has(centerLaneKey)) {
      usedLanes.add(centerLaneKey);
      return centerY;
    }
    
    // Try shifted rails above and below center
    for (let k = 1; k <= 3; k++) {
      // Try rail above center
      const aboveY = centerY - k * LANE_STEP;
      const aboveLaneKey = `rail-${gutterRowIndex}-${-k}`;
      if (!usedLanes.has(aboveLaneKey) && aboveY > 60 + SAFE_CLEARANCE) { // Above header
        usedLanes.add(aboveLaneKey);
        return aboveY;
      }
      
      // Try rail below center
      const belowY = centerY + k * LANE_STEP;
      const belowLaneKey = `rail-${gutterRowIndex}-${k}`;
      if (!usedLanes.has(belowLaneKey)) {
        usedLanes.add(belowLaneKey);
        return belowY;
      }
    }
    
    // Fallback to center rail
    return centerY;
  };

  // Generate orthogonal path using gutter center rails with stub connections
  const generateOrthogonalPath = (
    startSemIndex: number, startCourseIndex: number,
    endSemIndex: number, endCourseIndex: number,
    usedLanes: Set<string>
  ) => {
    const startRect = getCourseRect(startSemIndex, startCourseIndex);
    const endRect = getCourseRect(endSemIndex, endCourseIndex);
    
    // Connection ports
    const startPorts = getConnectionPorts(startRect);
    const endPorts = getConnectionPorts(endRect);
    
    const pathPoints = [];
    
    if (startSemIndex === endSemIndex) {
      // Same column - use bottom-center to top-center with gutter routing
      const startPort = startPorts.bottomCenter;
      const endPort = endPorts.topCenter;
      
      pathPoints.push(startPort);
      
      // Stub down into gutter
      const stubDownY = startPort.y + STUB_LENGTH;
      pathPoints.push({ x: startPort.x, y: stubDownY });
      
      // Find horizontal rail in gutter below this row
      const railY = findHorizontalRail(startCourseIndex, endCourseIndex, usedLanes);
      
      // Go to rail level
      pathPoints.push({ x: startPort.x, y: railY });
      
      // Move horizontally to target X
      pathPoints.push({ x: endPort.x, y: railY });
      
      // Stub up to target (if different Y levels)
      if (Math.abs(railY - endPort.y) > STUB_LENGTH) {
        const stubUpY = endPort.y - STUB_LENGTH;
        pathPoints.push({ x: endPort.x, y: stubUpY });
      }
      
      pathPoints.push(endPort);
      
    } else {
      // Different columns - use right-center to left-center
      const startPort = startPorts.rightCenter;
      const endPort = endPorts.leftCenter;
      
      pathPoints.push(startPort);
      
      // Find horizontal rail between the course rows
      const railY = findHorizontalRail(startCourseIndex, endCourseIndex, usedLanes);
      
      // Stub from start port to rail level
      if (Math.abs(startPort.y - railY) > CLEARANCE) {
        // Small horizontal stub to enter gutter
        const stubX = startPort.x + STUB_LENGTH;
        pathPoints.push({ x: stubX, y: startPort.y });
        
        // Vertical to rail level
        pathPoints.push({ x: stubX, y: railY });
        
        // Horizontal across on rail
        const targetStubX = endPort.x - STUB_LENGTH;
        pathPoints.push({ x: targetStubX, y: railY });
        
        // Vertical stub to target level
        pathPoints.push({ x: targetStubX, y: endPort.y });
      } else {
        // Direct horizontal at approximately same level
        pathPoints.push({ x: endPort.x - STUB_LENGTH, y: railY });
        pathPoints.push({ x: endPort.x - STUB_LENGTH, y: endPort.y });
      }
      
      pathPoints.push(endPort);
    }
    
    return pathPoints;
  };

  // Collect all arrow data with collision-free routing
  const arrowData = useMemo(() => {
    const arrows: Array<{
      id: string;
      pathPoints: Array<{ x: number; y: number }>;
    }> = [];
    const usedLanes = new Set<string>();

    semesterLayout.forEach((semData, semIndex) => {
      semData.courses.forEach((course, courseIndex) => {
        const prereqIds = findPrerequisites(course);
        
        prereqIds.forEach((prereqId) => {
          // Find prerequisite position
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
            const pathPoints = generateOrthogonalPath(
              prereqSemIndex, prereqCourseIndex,
              semIndex, courseIndex,
              usedLanes
            );

            arrows.push({
              id: `${prereqId}-${course.id}`,
              pathPoints
            });
          }
        });
      });
    });

    return arrows;
  }, [semesterLayout]);

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
          <div className="relative mb-2" style={{ 
            height: '40px',
            width: `${semesterLayout.length * (COURSE_WIDTH + GUTTER_WIDTH)}px`
          }}>
            {semesterLayout.map((semData, index) => (
              <div 
                key={index} 
                className="absolute text-center"
                style={{
                  left: `${index * (COURSE_WIDTH + GUTTER_WIDTH)}px`,
                  width: `${COURSE_WIDTH}px`,
                  top: '0px'
                }}
              >
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
              style={{ 
                minHeight: '600px',
                width: `${semesterLayout.length * (COURSE_WIDTH + GUTTER_WIDTH)}px`,
                height: `${Math.max(...semesterLayout.map(s => s.courses.length)) * (COURSE_HEIGHT + GUTTER_HEIGHT) + 200}px`
              }}
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="6"
                  markerHeight="5"
                  refX="5.5"
                  refY="2.5"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <polygon
                    points="0 0, 6 2.5, 0 5"
                    fill="#000"
                  />
                </marker>
              </defs>
              
              {/* Render orthogonal prerequisite arrows */}
              {arrowData.map((arrow) => {
                const pathString = arrow.pathPoints.map((point, index) => 
                  `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
                ).join(' ');

                return (
                  <path
                    key={arrow.id}
                    d={pathString}
                    stroke="#000"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrowhead)"
                    style={{
                      filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                    }}
                  />
                );
              })}
            </svg>

            {/* Course Boxes Grid - Fixed positioning to match arrow coordinates */}
            <div className="relative" style={{ 
              height: `${Math.max(...semesterLayout.map(s => s.courses.length)) * (COURSE_HEIGHT + GUTTER_HEIGHT) + 200}px`,
              width: `${semesterLayout.length * (COURSE_WIDTH + GUTTER_WIDTH)}px`
            }}>
              {semesterLayout.map((semData, semIndex) => 
                semData.courses.map((course, courseIndex) => {
                  const rect = getCourseRect(semIndex, courseIndex);
                  
                  return (
                    <div
                      key={course.id}
                      id={`course-${course.id}`}
                      className="absolute border-2 border-black bg-white p-2 text-xs flex flex-col justify-between shadow-sm"
                      style={{ 
                        left: `${rect.x}px`,
                        top: `${rect.y}px`,
                        width: `${COURSE_WIDTH}px`,
                        height: `${COURSE_HEIGHT}px`
                      }}
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
                  );
                })
              )}
              
              {/* Credits Summary for each semester */}
              {semesterLayout.map((semData, semIndex) => {
                const rect = getCourseRect(semIndex, semData.courses.length);
                
                return (
                  <div
                    key={`summary-${semIndex}`}
                    className="absolute text-center text-sm font-bold border-t-2 border-black pt-2 bg-white"
                    style={{
                      left: `${rect.x}px`,
                      top: `${rect.y + 10}px`,
                      width: `${COURSE_WIDTH}px`
                    }}
                  >
                    {calculateSemesterCredits(semData.courses)} หน่วยกิต
                  </div>
                );
              })}
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