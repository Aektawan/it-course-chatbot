import React, { useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Course } from '@/types/course';
import { generateCoursesForSemester } from '@/services/completeCurriculumData';
import { ArrowDown, Download, BookOpen } from 'lucide-react';
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

  const getCategoryBadge = (category: string) => {
    const baseClasses = "text-xs px-2 py-1 rounded-full";
    switch (category) {
      case 'core': return <Badge variant="default" className={baseClasses}>วิชาแกน</Badge>;
      case 'major': return <Badge className={`bg-secondary text-secondary-foreground ${baseClasses}`}>วิชาเอก</Badge>;
      case 'elective': return <Badge className={`bg-warning text-warning-foreground ${baseClasses}`}>วิชาเลือก</Badge>;
      case 'free': return <Badge className={`bg-orange-500/90 hover:bg-orange-500/80 text-white ${baseClasses}`}>วิชาเสรี</Badge>;
      case 'general': return <Badge variant="outline" className={baseClasses}>ศึกษาทั่วไป</Badge>;
      default: return <Badge variant="outline" className={baseClasses}>{category}</Badge>;
    }
  };

  // Generate course data organized by year and semester
  const timelineData = useMemo(() => {
    const [programCode, curriculumYear] = selectedCurriculum.split(' ');
    const maxYear = programCode === 'INET' ? 3 : programCode === 'ITI' || programCode === 'ITT' ? 2 : 4;
    
    const timeline: { [year: number]: { [semester: number]: Course[] } } = {};
    
    for (let year = 1; year <= maxYear; year++) {
      timeline[year] = {};
      
      // Regular semesters
      for (let semester = 1; semester <= 2; semester++) {
        const courses = generateCoursesForSemester(programCode, curriculumYear, year, semester, 6);
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
      await exportToPDF(flowchartRef.current, `แผนภูมิหลักสูตร_${departmentName}_${selectedCurriculum}`);
    }
  };

  // Create flat semester structure for better visualization
  const semesterStructure = useMemo(() => {
    const structure: { year: number; semester: number; courses: Course[]; label: string }[] = [];
    
    Object.entries(timelineData)
      .sort(([a], [b]) => Number(a) - Number(b))
      .forEach(([year, semesters]) => {
        Object.entries(semesters)
          .sort(([a], [b]) => Number(a) - Number(b))
          .forEach(([semester, courses]) => {
            structure.push({
              year: Number(year),
              semester: Number(semester),
              courses,
              label: semester === '3' ? `ปี ${year} เทอม ${semester} (ฝึกงาน)` : `ปี ${year} เทอม ${semester}`
            });
          });
      });
    
    return structure;
  }, [timelineData]);

  return (
    <div className="space-y-4">
      {/* Header with Export Button */}
      <div className="flex justify-between items-center">
        <div className="text-center flex-1">
          <h2 className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
            แผนภูมิหลักสูตร {departmentName}
          </h2>
          <p className="text-sm text-muted-foreground">หลักสูตร {selectedCurriculum}</p>
        </div>
        <Button onClick={handleExportPDF} variant="outline" size="sm" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export PDF
        </Button>
      </div>

      {/* Semester-based Timeline Flowchart */}
      <div ref={flowchartRef} className="bg-white p-6 rounded-lg border overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {semesterStructure.map((semesterData, index) => (
            <div key={`${semesterData.year}-${semesterData.semester}`} className="space-y-4">
              {/* Semester Header */}
              <div className="text-center">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-sm">
                  {semesterData.label}
                </div>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {calculateSemesterCredits(semesterData.courses)} หน่วยกิต
                </Badge>
              </div>
              
              {/* Courses */}
              <div className="space-y-3 min-h-[400px]">
                {semesterData.courses.map((course) => (
                  <Card key={course.id} className="shadow-soft hover:shadow-medium transition-all duration-200 border-l-4 border-l-primary/30">
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <BookOpen className="w-3 h-3 text-primary flex-shrink-0" />
                            <span className="font-mono font-bold text-xs">
                              {course.code.split('-')[1] || course.code}
                            </span>
                          </div>
                          {getCategoryBadge(course.category)}
                        </div>
                        
                        <h4 className="text-xs font-medium leading-tight line-clamp-2">
                          {course.name}
                        </h4>
                        
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>{course.credits} หน่วยกิต</span>
                          {course.prerequisites && course.prerequisites.length > 0 && (
                            <span className="text-xs text-orange-600">มีวิชาบังคับก่อน</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Year indicators between semesters */}
        <div className="mt-8 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {Object.keys(timelineData)
              .sort((a, b) => Number(a) - Number(b))
              .map(year => {
                const yearSemesters = Object.keys(timelineData[Number(year)]).length;
                const gridCols = yearSemesters === 3 ? 'col-span-3' : 'col-span-2';
                
                return (
                  <div key={year} className={`flex justify-center ${gridCols}`}>
                    <div className="bg-secondary/20 px-6 py-2 rounded-full">
                      <span className="font-bold text-secondary-foreground">ปีที่ {year}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary">
            {Object.keys(timelineData).length}
          </div>
          <div className="text-sm text-muted-foreground">ปี</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-secondary">
            {semesterStructure.length}
          </div>
          <div className="text-sm text-muted-foreground">เทอม</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-orange-600">
            {semesterStructure.reduce((total, sem) => 
              total + sem.courses.reduce((sum, course) => sum + course.credits, 0), 0
            )}
          </div>
          <div className="text-sm text-muted-foreground">หน่วยกิตรวม</div>
        </Card>
      </div>
    </div>
  );
};