import React, { useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Course } from '@/types/course';
import { generateCoursesForSemester } from '@/services/completeCurriculumData';
import { Download } from 'lucide-react';
import { exportToPDF } from '@/utils/pdfExport';
import { PathOptimizer } from './arrow-routing/path-optimizer';
import { RoutingConfig } from './arrow-routing/types';

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

  // Arrow routing configuration
  const routingConfig: RoutingConfig = {
    jumpRadius: 7,
    minDistanceFromNode: 12,
    minDistanceBetweenJumps: 14,
    gapUnderBridge: 3,
    courseWidth: COURSE_WIDTH,
    courseHeight: COURSE_HEIGHT,
    gutterWidth: GUTTER_WIDTH,
    gutterHeight: GUTTER_HEIGHT,
    clearance: CLEARANCE
  };

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

  // Find available horizontal lanes in the gutter space between course rows
  const findHorizontalLane = (startRect: any, endRect: any, usedLanes: Set<string>) => {
    // Always prioritize gutter lanes that are between course rows, not at course centers
    const testYPositions = [
      startRect.bottom + GUTTER_HEIGHT / 2,  // Middle of gutter below start course
      startRect.top - GUTTER_HEIGHT / 2,     // Middle of gutter above start course  
      endRect.bottom + GUTTER_HEIGHT / 2,    // Middle of gutter below end course
      endRect.top - GUTTER_HEIGHT / 2,       // Middle of gutter above end course
    ];
    
    // Test each gutter lane position
    for (const testY of testYPositions) {
      const testLaneKey = `h-${Math.round(testY)}`;
      if (!usedLanes.has(testLaneKey) && 
          !overlapsWithCourses(startRect.right, testY - 2, endRect.left - startRect.right, 4)) {
        usedLanes.add(testLaneKey);
        return testY;
      }
    }
    
    // If all preferred lanes are taken, try offset lanes in gutters
    for (let offset = LANE_WIDTH; offset <= GUTTER_HEIGHT/2; offset += LANE_WIDTH) {
      for (const baseY of testYPositions) {
        for (const direction of [-1, 1]) {
          const testY = baseY + (offset * direction);
          const testLaneKey = `h-${Math.round(testY)}`;
          if (!usedLanes.has(testLaneKey) && 
              !overlapsWithCourses(startRect.right, testY - 2, endRect.left - startRect.right, 4)) {
            usedLanes.add(testLaneKey);
            return testY;
          }
        }
      }
    }
    
    // Last fallback - use gutter space below the lower course
    const fallbackY = Math.max(startRect.bottom, endRect.bottom) + GUTTER_HEIGHT / 2;
    return fallbackY;
  };

  // Check if there are blocking courses between start and end points
  const hasBlockingCourses = (startX: number, endX: number, y: number, startSemIndex: number, endSemIndex: number) => {
    for (let semIdx = startSemIndex + 1; semIdx < endSemIndex; semIdx++) {
      const semData = semesterLayout[semIdx];
      if (!semData) continue;
      
      for (let courseIdx = 0; courseIdx < semData.courses.length; courseIdx++) {
        const courseRect = getCourseRect(semIdx, courseIdx);
        // Check if the horizontal line at y intersects this course box
        const linePassesThroughCourse = y >= courseRect.top - CLEARANCE && y <= courseRect.bottom + CLEARANCE;
        const lineIsInHorizontalRange = startX < courseRect.right && endX > courseRect.left;
        
        if (linePassesThroughCourse && lineIsInHorizontalRange) {
          return true;
        }
      }
    }
    return false;
  };

  // Generate strict orthogonal path with 90-degree turns through gutters
  const generateOrthogonalPath = (
    startSemIndex: number, startCourseIndex: number,
    endSemIndex: number, endCourseIndex: number,
    usedLanes: Set<string>
  ) => {
    const startRect = getCourseRect(startSemIndex, startCourseIndex);
    const endRect = getCourseRect(endSemIndex, endCourseIndex);
    const startPorts = getConnectionPorts(startRect);
    const endPorts = getConnectionPorts(endRect);

    // Always use right-center to left-center connections
    let startPort = startPorts.rightCenter;
    let endPort = endPorts.leftCenter;

    const pathPoints = [startPort];

    if (startSemIndex === endSemIndex) {
      // Same column - direct horizontal connection
      pathPoints.push(endPort);
    } else {
      // Check if direct horizontal path is blocked
      const isDirectPathBlocked = hasBlockingCourses(
        startPort.x, 
        endPort.x, 
        startPort.y, 
        startSemIndex, 
        endSemIndex
      );

      const verticalDistance = endPort.y - startPort.y;
      const isApproximatelySameLevel = Math.abs(verticalDistance) < CLEARANCE;

      if (isApproximatelySameLevel && !isDirectPathBlocked) {
        // Same level, no obstacles - direct horizontal line
        pathPoints.push(endPort);
      } else {
        // Need to route around obstacles with 90-degree turns
        
        // Step 1: Move horizontally into gutter space
        const gutterX = startPort.x + GUTTER_WIDTH / 3;  // Smaller gutter offset to stay in gutters
        pathPoints.push({ x: gutterX, y: startPort.y });
        
        // Step 2: Find safe horizontal routing lane in gutter space
        let routingY = findHorizontalLane(startRect, endRect, usedLanes);
        
        if (isDirectPathBlocked || !isApproximatelySameLevel) {
          // Make sure we route in proper gutter space, not touching courses
          
          // Vertical segment to gutter routing lane
          pathPoints.push({ x: gutterX, y: routingY });
          
          // Horizontal segment across to target column in gutter lane
          const targetGutterX = endPort.x - GUTTER_WIDTH / 3;  // Smaller offset
          pathPoints.push({ x: targetGutterX, y: routingY });
          
          // Vertical segment down to target level
          if (Math.abs(routingY - endPort.y) > CLEARANCE) {
            pathPoints.push({ x: targetGutterX, y: endPort.y });
          }
        } else {
          // Horizontal routing in gutter lane
          const targetGutterX = endPort.x - GUTTER_WIDTH / 3;
          pathPoints.push({ x: targetGutterX, y: routingY });
          
          // Vertical adjustment if needed
          if (Math.abs(routingY - endPort.y) > CLEARANCE) {
            pathPoints.push({ x: targetGutterX, y: endPort.y });
          }
        }
        
        // Final connection to target
        pathPoints.push(endPort);
      }
    }

    return pathPoints;
  };

  // Collect all arrow data with advanced bridge routing
  const arrowData = useMemo(() => {
    const pathOptimizer = new PathOptimizer(routingConfig);
    const arrows: Array<{
      id: string;
      pathString: string;
      bridges: any[];
    }> = [];
    const usedLanes = new Set<string>();

    // Reset optimizer for new calculation
    pathOptimizer.reset();

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

            // Use path optimizer to handle bridges
            const arrowId = `${prereqId}-${course.id}`;
            const optimizedPath = pathOptimizer.optimizePath(pathPoints, arrowId);

            arrows.push({
              id: arrowId,
              pathString: optimizedPath.pathString,
              bridges: optimizedPath.bridges
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
              
              {/* Render orthogonal prerequisite arrows with bridges */}
              {arrowData.map((arrow) => {
                return (
                  <path
                    key={arrow.id}
                    d={arrow.pathString}
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