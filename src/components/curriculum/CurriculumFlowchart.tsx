import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Department, Curriculum, Course } from '@/types/course';
import { ArrowDown, BookOpen } from 'lucide-react';

interface CurriculumFlowchartProps {
  curriculum: Curriculum;
  departmentName: string;
}

export const CurriculumFlowchart: React.FC<CurriculumFlowchartProps> = ({ curriculum, departmentName }) => {
  const getCategoryBadge = (category: string) => {
    const baseClasses = "text-xs px-2 py-1 rounded-full";
    switch (category) {
      case 'core': return <Badge variant="default" className={baseClasses}>วิชาแกน</Badge>;
      case 'major': return <Badge className={`bg-secondary text-secondary-foreground ${baseClasses}`}>วิชาเอก</Badge>;
      case 'elective': return <Badge className={`bg-warning text-warning-foreground ${baseClasses}`}>วิชาเลือก</Badge>;
      case 'general': return <Badge variant="outline" className={baseClasses}>ศึกษาทั่วไป</Badge>;
      default: return <Badge variant="outline" className={baseClasses}>{category}</Badge>;
    }
  };

  // Group courses by year and semester
  const coursesByYear = useMemo(() => {
    const grouped: { [key: number]: { [key: number]: Course[] } } = {};
    
    curriculum.semesters.forEach(semesterData => {
      if (!grouped[semesterData.year]) {
        grouped[semesterData.year] = {};
      }
      grouped[semesterData.year][semesterData.semester] = semesterData.courses;
    });
    
    return grouped;
  }, [curriculum]);

  // Calculate credits for each semester
  const calculateSemesterCredits = (courses: Course[]) => {
    return courses.reduce((sum, course) => sum + course.credits, 0);
  };

  // Find prerequisites within the curriculum
  const findPrerequisiteConnections = (course: Course) => {
    const connections: Course[] = [];
    if (course.prerequisites && course.prerequisites.length > 0) {
      curriculum.semesters.forEach(semesterData => {
        semesterData.courses.forEach(prereqCourse => {
          if (course.prerequisites.includes(prereqCourse.code)) {
            connections.push(prereqCourse);
          }
        });
      });
    }
    return connections;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
          แผนผังหลักสูตร {departmentName}
        </h2>
        <p className="text-lg text-muted-foreground">{curriculum.name}</p>
        <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
          <span>ระยะเวลา: {curriculum.duration} ปี</span>
          <span>หน่วยกิต: {curriculum.totalCredits} หน่วยกิต</span>
        </div>
      </div>

      {/* Years and Semesters */}
      <div className="space-y-8">
        {Object.entries(coursesByYear)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([year, semesters]) => (
            <Card key={year} className="shadow-medium">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-xl text-center">
                  ปีที่ {year}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {Object.entries(semesters)
                    .sort(([a], [b]) => Number(a) - Number(b))
                    .map(([semester, courses]) => (
                      <div key={semester} className="space-y-4">
                        {/* Semester Header */}
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-primary">
                            เทอมที่ {semester}
                            {semester === '3' && ' (ฝึกงาน)'}
                          </h3>
                          <Badge variant="secondary" className="text-sm">
                            {calculateSemesterCredits(courses)} หน่วยกิต
                          </Badge>
                        </div>

                        {/* Courses Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {courses.map((course) => {
                            const prerequisites = findPrerequisiteConnections(course);
                            return (
                              <div key={course.id} className="relative">
                                <Card className="shadow-soft hover:shadow-medium transition-all duration-300 border-l-4 border-l-primary/30">
                                  <CardContent className="p-4 space-y-3">
                                    <div className="flex items-start justify-between">
                                      <div className="space-y-1 flex-1">
                                        <div className="flex items-center space-x-2">
                                          <BookOpen className="w-4 h-4 text-primary" />
                                          <span className="font-mono font-bold text-sm">{course.code}</span>
                                        </div>
                                        <h4 className="font-medium text-sm leading-tight line-clamp-2">
                                          {course.name}
                                        </h4>
                                      </div>
                                      <div className="text-right space-y-1 ml-2">
                                        {getCategoryBadge(course.category)}
                                        <div className="text-xs text-muted-foreground">
                                          {course.credits} หน่วยกิต
                                        </div>
                                      </div>
                                    </div>

                                    {/* Prerequisites indicator */}
                                    {prerequisites.length > 0 && (
                                      <div className="space-y-2">
                                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                          <ArrowDown className="w-3 h-3" />
                                          <span>วิชาบังคับก่อน:</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                          {prerequisites.map((prereq) => (
                                            <Badge key={prereq.id} variant="outline" className="text-xs px-2 py-0.5">
                                              {prereq.code}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Summary */}
      <Card className="shadow-medium bg-primary/5">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold">สรุปหลักสูตร</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">{curriculum.totalCredits}</div>
                <div className="text-sm text-muted-foreground">หน่วยกิตรวม</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">{curriculum.duration}</div>
                <div className="text-sm text-muted-foreground">ปี</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">
                  {curriculum.semesters.length}
                </div>
                <div className="text-sm text-muted-foreground">เทอม</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};