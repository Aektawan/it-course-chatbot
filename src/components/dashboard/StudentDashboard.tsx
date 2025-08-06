import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { mockCourses, mockStudentCourses, mockStudyPlan } from '@/services/mockData';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Calendar,
  Target,
  TrendingUp,
  Award
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [studyPlan] = useState(mockStudyPlan);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-warning" />;
      case 'planned': return <Calendar className="w-4 h-4 text-info" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-destructive" />;
      default: return <BookOpen className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-success text-success-foreground">ผ่านแล้ว</Badge>;
      case 'in_progress': return <Badge className="bg-warning text-warning-foreground">กำลังเรียน</Badge>;
      case 'planned': return <Badge className="bg-info text-info-foreground">วางแผนไว้</Badge>;
      case 'failed': return <Badge variant="destructive">ไม่ผ่าน</Badge>;
      default: return <Badge variant="outline">ยังไม่ได้เรียน</Badge>;
    }
  };

  const getCourseDetails = (courseId: string) => {
    return mockCourses.find(course => course.id === courseId);
  };

  const completedCourses = mockStudentCourses.filter(sc => sc.status === 'completed');
  const inProgressCourses = mockStudentCourses.filter(sc => sc.status === 'in_progress');
  const plannedCourses = mockStudentCourses.filter(sc => sc.status === 'planned');
  const failedCourses = mockStudentCourses.filter(sc => sc.status === 'failed');

  const progressPercentage = (studyPlan.completedCredits / studyPlan.totalCredits) * 100;

  return (
    <div className="min-h-screen p-6 gradient-subtle">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">แดชบอร์ดนักศึกษา</h1>
            <p className="text-muted-foreground">
              ยินดีต้อนรับ, {user?.name}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <div className="text-right">
              <div className="font-medium">{user?.studentId}</div>
              <div className="text-sm text-muted-foreground">{user?.program}</div>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ความก้าวหน้า
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{studyPlan.completedCredits}</span>
                  <span className="text-sm text-muted-foreground">/ {studyPlan.totalCredits} หน่วยกิต</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {progressPercentage.toFixed(1)}% เสร็จสิ้น
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                วิชาที่ผ่านแล้ว
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-8 h-8 text-success" />
                <span className="text-2xl font-bold">{completedCourses.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                กำลังเรียน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Clock className="w-8 h-8 text-warning" />
                <span className="text-2xl font-bold">{inProgressCourses.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                วางแผนไว้
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Calendar className="w-8 h-8 text-info" />
                <span className="text-2xl font-bold">{plannedCourses.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="study-plan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="study-plan">แผนการเรียน</TabsTrigger>
            <TabsTrigger value="completed">วิชาที่ผ่าน</TabsTrigger>
            <TabsTrigger value="in-progress">กำลังเรียน</TabsTrigger>
            <TabsTrigger value="recommendations">แนะนำวิชา</TabsTrigger>
          </TabsList>

          <TabsContent value="study-plan" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>แผนการเรียนโดยรวม</span>
                </CardTitle>
                <CardDescription>
                  ภาพรวมการเรียนและความก้าวหน้าตามหลักสูตร
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">สถิติการเรียน</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">วิชาที่ผ่านแล้ว</span>
                        <span className="font-medium">{completedCourses.length} วิชา</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">วิชาที่กำลังเรียน</span>
                        <span className="font-medium">{inProgressCourses.length} วิชา</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">วิชาที่วางแผนไว้</span>
                        <span className="font-medium">{plannedCourses.length} วิชา</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">ข้อมูลการเรียน</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">ภาคการศึกษาปัจจุบัน</span>
                        <span className="font-medium">{studyPlan.currentSemester}/{studyPlan.currentYear}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">หน่วยกิตสะสม</span>
                        <span className="font-medium">{studyPlan.completedCredits} หน่วยกิต</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">เหลืออีก</span>
                        <span className="font-medium">{studyPlan.totalCredits - studyPlan.completedCredits} หน่วยกิต</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>วิชาที่ผ่านแล้ว</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {completedCourses.map((studentCourse) => {
                    const course = getCourseDetails(studentCourse.courseId);
                    if (!course) return null;
                    
                    return (
                      <div key={studentCourse.courseId} className="flex items-center justify-between p-4 rounded-lg border bg-success/5">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-6 h-6 text-success" />
                          <div>
                            <div className="font-medium">{course.code} - {course.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {course.credits} หน่วยกิต • เกรด: {studentCourse.grade}
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-success text-success-foreground">ผ่านแล้ว</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>วิชาที่กำลังเรียน</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {inProgressCourses.map((studentCourse) => {
                    const course = getCourseDetails(studentCourse.courseId);
                    if (!course) return null;
                    
                    return (
                      <div key={studentCourse.courseId} className="flex items-center justify-between p-4 rounded-lg border bg-warning/5">
                        <div className="flex items-center space-x-3">
                          <Clock className="w-6 h-6 text-warning" />
                          <div>
                            <div className="font-medium">{course.code} - {course.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {course.credits} หน่วยกิต • อาจารย์: {course.instructor}
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-warning text-warning-foreground">กำลังเรียน</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>แนะนำวิชาสำหรับภาคต่อไป</span>
                </CardTitle>
                <CardDescription>
                  วิชาที่แนะนำให้เรียนในภาคการศึกษาถัดไป
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockCourses.filter(course => !mockStudentCourses.some(sc => sc.courseId === course.id)).slice(0, 3).map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 rounded-lg border bg-info/5">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="w-6 h-6 text-info" />
                        <div>
                          <div className="font-medium">{course.code} - {course.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {course.credits} หน่วยกิต • {course.description}
                          </div>
                          {course.prerequisites.length > 0 && (
                            <div className="text-xs text-muted-foreground mt-1">
                              ต้องผ่าน: {course.prerequisites.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        เพิ่มในแผน
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;