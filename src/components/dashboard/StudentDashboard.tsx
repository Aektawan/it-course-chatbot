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
  Award,
  Save
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

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

  const userCourses = mockStudentCourses.filter(sc => sc.studentId === user?.id);
  const completedCourses = userCourses.filter(sc => sc.status === 'completed');
  const inProgressCourses = userCourses.filter(sc => sc.status === 'in_progress');
  const plannedCourses = userCourses.filter(sc => sc.status === 'planned');
  const failedCourses = userCourses.filter(sc => sc.status === 'failed');

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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="study-plan">แผนการเรียน</TabsTrigger>
            <TabsTrigger value="completed">วิชาที่ผ่าน</TabsTrigger>
            <TabsTrigger value="in-progress">กำลังเรียน</TabsTrigger>
            <TabsTrigger value="failed">ไม่ผ่าน</TabsTrigger>
            <TabsTrigger value="profile">โปรไฟล์</TabsTrigger>
          </TabsList>

          <TabsContent value="study-plan" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>แผนการเรียนตามหลักสูตร</span>
                </CardTitle>
                <CardDescription>
                  เลือกหลักสูตรและวางแผนการเรียนตามปีการศึกษา
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Program Selection */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="program-select">เลือกหลักสูตร</Label>
                    <Select defaultValue="IT-62">
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกหลักสูตร" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IT-62">IT หลักสูตร 62 (4 ปี)</SelectItem>
                        <SelectItem value="IT-67">IT หลักสูตร 67 (4 ปี)</SelectItem>
                        <SelectItem value="INE-62">INE หลักสูตร 62 (4 ปี)</SelectItem>
                        <SelectItem value="INE-67">INE หลักสูตร 67 (4 ปี)</SelectItem>
                        <SelectItem value="INET-62">INET หลักสูตร 62 (3 ปี)</SelectItem>
                        <SelectItem value="INET-67">INET หลักสูตร 67 (3 ปี)</SelectItem>
                        <SelectItem value="ITI-61">ITI หลักสูตร 61 (2 ปี)</SelectItem>
                        <SelectItem value="ITI-66">ITI หลักสูตร 66 (2 ปี)</SelectItem>
                        <SelectItem value="ITT-67">ITT หลักสูตร 67 (2 ปี)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year-select">ปีการศึกษา</Label>
                    <Select defaultValue="1">
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกปี" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">ปีที่ 1</SelectItem>
                        <SelectItem value="2">ปีที่ 2</SelectItem>
                        <SelectItem value="3">ปีที่ 3</SelectItem>
                        <SelectItem value="4">ปีที่ 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester-select">ภาคการศึกษา</Label>
                    <Select defaultValue="1">
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกภาค" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">ภาคต้น</SelectItem>
                        <SelectItem value="2">ภาคปลาย</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Study Plan Overview */}
                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
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

                {/* Recommended Courses for Selected Semester */}
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium">รายวิชาแนะนำสำหรับปี 1 ภาคต้น</h4>
                  <div className="grid gap-3">
                    <div className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <BookOpen className="w-5 h-5 text-primary" />
                          <div>
                            <div className="font-medium">IT101 - พื้นฐานเทคโนโลยีสารสนเทศ</div>
                            <div className="text-sm text-muted-foreground">3 หน่วยกิต • วิชาพื้นฐาน</div>
                          </div>
                        </div>
                        <Badge variant="outline">แนะนำ</Badge>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <BookOpen className="w-5 h-5 text-primary" />
                          <div>
                            <div className="font-medium">IT102 - การเขียนโปรแกรมพื้นฐาน</div>
                            <div className="text-sm text-muted-foreground">3 หน่วยกิต • วิชาพื้นฐาน</div>
                          </div>
                        </div>
                        <Badge variant="outline">แนะนำ</Badge>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <BookOpen className="w-5 h-5 text-primary" />
                          <div>
                            <div className="font-medium">IT103 - คณิตศาสตร์สำหรับเทคโนโลยีสารสนเทศ</div>
                            <div className="text-sm text-muted-foreground">3 หน่วยกิต • วิชาพื้นฐาน</div>
                          </div>
                        </div>
                        <Badge variant="outline">แนะนำ</Badge>
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

          <TabsContent value="failed" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>วิชาที่ไม่ผ่าน</span>
                </CardTitle>
                <CardDescription>
                  รายวิชาที่ต้องเรียนซ้ำหรือปรับปรุงผลการเรียน
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {failedCourses.length > 0 ? failedCourses.map((studentCourse) => {
                    const course = getCourseDetails(studentCourse.courseId);
                    if (!course) return null;
                    
                    return (
                      <div key={studentCourse.courseId} className="flex items-center justify-between p-4 rounded-lg border bg-destructive/5">
                        <div className="flex items-center space-x-3">
                          <AlertCircle className="w-6 h-6 text-destructive" />
                          <div>
                            <div className="font-medium">{course.code} - {course.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {course.credits} หน่วยกิต • เกรด: {studentCourse.grade}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              ควรลงทะเบียนเรียนซ้ำในภาคการศึกษาถัดไป
                            </div>
                          </div>
                        </div>
                        <Badge variant="destructive">ไม่ผ่าน</Badge>
                      </div>
                    );
                  }) : (
                    <div className="text-center p-8 text-muted-foreground">
                      <CheckCircle className="w-12 h-12 mx-auto mb-4 text-success" />
                      <p>ยินดีด้วย! คุณไม่มีวิชาที่ไม่ผ่าน</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5" />
                  <span>ข้อมูลส่วนตัว</span>
                </CardTitle>
                <CardDescription>
                  แก้ไขข้อมูลส่วนตัวและข้อมูลการศึกษา
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-name">ชื่อ-นามสกุล</Label>
                      <Input id="student-name" value={user?.name || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-email">อีเมล</Label>
                      <Input id="student-email" value={user?.email || ''} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-id">รหัสนักศึกษา</Label>
                      <Input id="student-id" value={user?.studentId || ''} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-program">หลักสูตร</Label>
                      <Input id="student-program" value={user?.program || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-year">ปีการศึกษา</Label>
                      <Select value={user?.year?.toString() || ''}>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกปีการศึกษา" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">ปี 1</SelectItem>
                          <SelectItem value="2">ปี 2</SelectItem>
                          <SelectItem value="3">ปี 3</SelectItem>
                          <SelectItem value="4">ปี 4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-gpa">เกรดเฉลี่ย</Label>
                      <Input id="student-gpa" value="3.25" disabled />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t">
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    บันทึกการเปลี่ยนแปลง
                  </Button>
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