import React, { useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Course } from '@/types/course';
import { generateCoursesForSemester } from '@/services/completeCurriculumData';
import { ArrowRight, Download, BookOpen } from 'lucide-react';
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

  // Generate course data organized by timeline
  const timelineData = useMemo(() => {
    const [programCode, curriculumYear] = selectedCurriculum.split(' ');
    const maxYear = programCode === 'INET' ? 3 : programCode === 'ITI' || programCode === 'ITT' ? 2 : 4;
    
    const timeline: { [year: number]: { [semester: number]: Course[] } } = {};
    
    for (let year = 1; year <= maxYear; year++) {
      timeline[year] = {};
      
      // Regular semesters
      for (let semester = 1; semester <= 2; semester++) {
        const courses = generateCoursesForSemester(programCode, curriculumYear, year, semester, 6); // Limit courses for better display
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

      {/* Timeline Flowchart */}
      <div ref={flowchartRef} className="bg-white p-6 rounded-lg border overflow-x-auto">
        <div className="inline-flex gap-6 min-w-max">
          {Object.entries(timelineData)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([year, semesters], yearIndex) => (
              <React.Fragment key={year}>
                {/* Year Container */}
                <div className="flex flex-col items-center space-y-4 min-w-[280px]">
                  {/* Year Header */}
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-center w-full">
                    ปีที่ {year}
                  </div>
                  
                  {/* Semesters */}
                  <div className="space-y-6 w-full">
                    {Object.entries(semesters)
                      .sort(([a], [b]) => Number(a) - Number(b))
                      .map(([semester, courses]) => (
                        <div key={semester} className="space-y-3">
                          {/* Semester Header */}
                          <div className="bg-secondary/20 border-l-4 border-l-secondary px-3 py-2 rounded">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-sm">
                                เทอมที่ {semester}
                                {semester === '3' && ' (ฝึกงาน)'}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {calculateSemesterCredits(courses)} หน่วยกิต
                              </Badge>
                            </div>
                          </div>
                          
                          {/* Courses */}
                          <div className="space-y-2">
                            {courses.map((course, idx) => (
                              <Card key={course.id} className="shadow-soft hover:shadow-medium transition-all duration-200 border-l-4 border-l-primary/30">
                                <CardContent className="p-3">
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-2">
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
                </div>
                
                {/* Arrow between years */}
                {yearIndex < Object.keys(timelineData).length - 1 && (
                  <div className="flex items-center justify-center pt-16">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary">
            {Object.keys(timelineData).length}
          </div>
          <div className="text-sm text-muted-foreground">ปี</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-secondary">
            {Object.values(timelineData).reduce((total, year) => 
              total + Object.keys(year).length, 0
            )}
          </div>
          <div className="text-sm text-muted-foreground">เทอม</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-orange-600">
            {Object.values(timelineData).reduce((total, year) => 
              total + Object.values(year).reduce((yearTotal, courses) => 
                yearTotal + courses.reduce((sum, course) => sum + course.credits, 0), 0
              ), 0
            )}
          </div>
          <div className="text-sm text-muted-foreground">หน่วยกิตรวม</div>
        </Card>
      </div>
    </div>
  );
};