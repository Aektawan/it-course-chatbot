import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { mockDepartments, mockStudentCourses, mockStudyPlan } from '@/services/mockData';
import { Department, Curriculum } from '@/types/course';
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
  Save,
  Settings,
  ChevronDown
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [studyPlan] = useState(mockStudyPlan);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  
  const selectedDept = mockDepartments.find(d => d.id === selectedDepartment);
  const selectedCurr = selectedDept?.curricula.find(c => c.id === selectedCurriculum);
  const selectedSemesterData = selectedCurr?.semesters.find(s => s.year === selectedYear && s.semester === selectedSemester);

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

  const allCourses = mockDepartments.flatMap(dept => 
    dept.curricula.flatMap(curr => 
      curr.semesters.flatMap(sem => sem.courses)
    )
  );

  const getCourseDetails = (courseId: string) => {
    return allCourses.find(course => course.id === courseId);
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
            {/* Department and Curriculum Selection */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>เลือกหลักสูตรของคุณ</span>
                </CardTitle>
                <CardDescription>
                  เลือกสาขาวิชาและหลักสูตรเพื่อดูแผนการเรียน
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>สาขาวิชา</Label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกสาขาวิชา" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockDepartments.map(dept => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.code} - {dept.nameThai}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>หลักสูตร</Label>
                    <Select 
                      value={selectedCurriculum} 
                      onValueChange={setSelectedCurriculum}
                      disabled={!selectedDepartment}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกหลักสูตร" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedDept?.curricula.map(curr => (
                          <SelectItem key={curr.id} value={curr.id}>
                            {curr.name} ({curr.duration} ปี)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {selectedCurr && (
                  <div className="pt-4 border-t">
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="p-4 rounded-lg bg-primary/5 text-center">
                        <div className="text-2xl font-bold text-primary">{selectedCurr.duration}</div>
                        <div className="text-sm text-muted-foreground">ปีการศึกษา</div>
                      </div>
                      <div className="p-4 rounded-lg bg-success/5 text-center">
                        <div className="text-2xl font-bold text-success">{selectedCurr.totalCredits}</div>
                        <div className="text-sm text-muted-foreground">หน่วยกิตรวม</div>
                      </div>
                      <div className="p-4 rounded-lg bg-info/5 text-center">
                        <div className="text-2xl font-bold text-info">{selectedCurr.semesters.length}</div>
                        <div className="text-sm text-muted-foreground">ภาคการศึกษา</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Study Plan Content */}
            {selectedCurr && (
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>แผนการเรียน - {selectedCurr.name}</span>
                  </CardTitle>
                  <CardDescription>
                    เลือกปีและภาคการศึกษาเพื่อดูรายวิชา
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Year and Semester Selection */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>ปีการศึกษา</Label>
                      <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: selectedCurr.duration }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              ปีที่ {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>ภาคการศึกษา</Label>
                      <Select value={selectedSemester.toString()} onValueChange={(value) => setSelectedSemester(parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">ภาคต้น</SelectItem>
                          <SelectItem value="2">ภาคปลาย</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Course List for Selected Semester */}
                  {selectedSemesterData && (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">
                          รายวิชา ปีที่ {selectedYear} ภาค{selectedSemester === 1 ? 'ต้น' : 'ปลาย'}
                        </h4>
                        <div className="text-sm text-muted-foreground">
                          {selectedSemesterData.courses.reduce((sum, course) => sum + course.credits, 0)} หน่วยกิตรวม
                        </div>
                      </div>
                      
                      <div className="grid gap-3">
                        {selectedSemesterData.courses.map((course) => (
                          <div key={course.id} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <BookOpen className="w-5 h-5 text-primary" />
                                <div className="flex-1">
                                  <div className="font-medium">{course.code} - {course.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {course.credits} หน่วยกิต • {course.category === 'core' ? 'วิชาหลัก' : 
                                     course.category === 'major' ? 'วิชาเฉพาะ' : 
                                     course.category === 'elective' ? 'วิชาเลือก' : 'วิชาศึกษาทั่วไป'}
                                  </div>
                                  {course.prerequisites.length > 0 && (
                                    <div className="text-xs text-warning mt-1">
                                      ต้องเรียน: {course.prerequisites.join(', ')} มาก่อน
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col items-end space-y-1">
                                <Badge 
                                  variant={
                                    course.category === 'core' ? 'default' :
                                    course.category === 'major' ? 'secondary' : 'outline'
                                  }
                                >
                                  {course.category === 'core' ? 'หลัก' : 
                                   course.category === 'major' ? 'เฉพาะ' : 
                                   course.category === 'elective' ? 'เลือก' : 'ทั่วไป'}
                                </Badge>
                                {course.instructor && (
                                  <div className="text-xs text-muted-foreground">
                                    {course.instructor}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedCurr && !selectedSemesterData && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>ไม่มีข้อมูลรายวิชาสำหรับภาคการศึกษาที่เลือก</p>
                    </div>
                  )}

                  {/* All Semesters Overview */}
                  {selectedCurr && (
                    <div className="space-y-4 pt-4 border-t">
                      <h4 className="font-medium">ภาพรวมแผนการเรียนทั้งหมด</h4>
                      <div className="grid gap-3">
                        {Array.from({ length: selectedCurr.duration }, (_, yearIndex) => (
                          <div key={yearIndex} className="space-y-2">
                            <h5 className="font-medium text-primary">ปีที่ {yearIndex + 1}</h5>
                            <div className="grid md:grid-cols-2 gap-2">
                              {[1, 2].map(semesterNum => {
                                const semester = selectedCurr.semesters.find(s => 
                                  s.year === yearIndex + 1 && s.semester === semesterNum
                                );
                                return (
                                  <div 
                                    key={semesterNum}
                                    className="p-3 rounded-lg border bg-card/50 cursor-pointer hover:bg-card transition-colors"
                                    onClick={() => {
                                      setSelectedYear(yearIndex + 1);
                                      setSelectedSemester(semesterNum);
                                    }}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="font-medium text-sm">
                                        ภาค{semesterNum === 1 ? 'ต้น' : 'ปลาย'}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        {semester ? `${semester.courses.length} วิชา` : 'ไม่มีข้อมูล'}
                                      </div>
                                    </div>
                                    {semester && (
                                      <div className="text-xs text-muted-foreground mt-1">
                                        {semester.courses.reduce((sum, c) => sum + c.credits, 0)} หน่วยกิต
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* No Selection State */}
            {!selectedDepartment && (
              <Card className="shadow-medium">
                <CardContent className="py-12 text-center">
                  <GraduationCap className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium mb-2">เริ่มต้นวางแผนการเรียนของคุณ</h3>
                  <p className="text-muted-foreground mb-4">
                    เลือกสาขาวิชาและหลักสูตรที่คุณสนใจเพื่อดูแผนการเรียนและรายวิชาต่างๆ
                  </p>
                </CardContent>
              </Card>
            )}
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