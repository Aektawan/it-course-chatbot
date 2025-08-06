import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { mockUsers, mockCourses, mockStudentCourses } from '@/services/mockData';
import StudentDetailView from './StudentDetailView';
import { 
  UserCheck, 
  GraduationCap, 
  BookOpen, 
  Search,
  TrendingUp,
  Users,
  Calendar,
  Award,
  AlertCircle
} from 'lucide-react';

const InstructorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  // Mock data for students under instructor's care
  const studentsUnderCare = mockUsers.filter(u => u.role === 'student').slice(0, 5);
  const instructorCourses = mockCourses.filter(course => course.instructor === user?.name);

  const getStudentStats = (studentId: string) => {
    const studentCourses = mockStudentCourses.filter(sc => sc.courseId);
    const completed = studentCourses.filter(sc => sc.status === 'completed').length;
    const inProgress = studentCourses.filter(sc => sc.status === 'in_progress').length;
    const failed = studentCourses.filter(sc => sc.status === 'failed').length;
    
    return { completed, inProgress, failed, total: completed + inProgress + failed };
  };

  const filteredStudents = studentsUnderCare.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If a student is selected, show their detail view
  if (selectedStudentId) {
    const selectedStudent = mockUsers.find(u => u.id === selectedStudentId);
    if (selectedStudent) {
      return (
        <div className="min-h-screen p-6 gradient-subtle">
          <div className="container mx-auto">
            <StudentDetailView 
              student={selectedStudent} 
              onBack={() => setSelectedStudentId(null)} 
            />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen p-6 gradient-subtle">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">แดชบอร์ดอาจารย์</h1>
            <p className="text-muted-foreground">
              ยินดีต้อนรับ, {user?.name}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserCheck className="w-8 h-8 text-secondary" />
            <div className="text-right">
              <div className="font-medium">อาจารย์ประจำ</div>
              <div className="text-sm text-muted-foreground">คณะเทคโนโลยีสารสนเทศ</div>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                นักศึกษาที่ดูแล
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-secondary" />
                <span className="text-2xl font-bold">{studentsUnderCare.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                วิชาที่สอน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold">{instructorCourses.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                นักศึกษาผ่าน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Award className="w-8 h-8 text-success" />
                <span className="text-2xl font-bold">85%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ภาคการศึกษา
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Calendar className="w-8 h-8 text-info" />
                <span className="text-2xl font-bold">1/2567</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="students">นักศึกษาที่ดูแล</TabsTrigger>
            <TabsTrigger value="courses">วิชาที่สอน</TabsTrigger>
            <TabsTrigger value="statistics">สถิติ</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <GraduationCap className="w-5 h-5" />
                      <span>รายชื่อนักศึกษา</span>
                    </CardTitle>
                    <CardDescription>
                      นักศึกษาที่อยู่ในการดูแลของคุณ
                    </CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="ค้นหานักศึกษา..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student) => {
                    const stats = getStudentStats(student.id);
                    return (
                      <div key={student.id} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-soft transition-shadow">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>
                              {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {student.studentId} • {student.program}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                ปี {student.year}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                ผ่าน {stats.completed} วิชา
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedStudentId(student.id)}
                          >
                            ดูรายละเอียด
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>วิชาที่สอน</span>
                </CardTitle>
                <CardDescription>
                  รายวิชาที่คุณรับผิดชอบในภาคการศึกษานี้
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {instructorCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 rounded-lg border bg-primary/5">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="w-6 h-6 text-primary" />
                        <div>
                          <div className="font-medium">{course.code} - {course.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {course.credits} หน่วยกิต • {course.category} • ภาคที่ {course.semester}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {course.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {course.isActive ? 'เปิดสอน' : 'ปิดสอน'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          จัดการ
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>สถิติผลการเรียน</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">นักศึกษาผ่าน</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-success/20 rounded-full h-2">
                          <div className="bg-success h-2 rounded-full" style={{ width: '85%' }} />
                        </div>
                        <span className="font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">กำลังเรียน</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-warning/20 rounded-full h-2">
                          <div className="bg-warning h-2 rounded-full" style={{ width: '10%' }} />
                        </div>
                        <span className="font-medium">10%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">ไม่ผ่าน</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-destructive/20 rounded-full h-2">
                          <div className="bg-destructive h-2 rounded-full" style={{ width: '5%' }} />
                        </div>
                        <span className="font-medium">5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>นักศึกษาที่ต้องช่วยเหลือ</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {studentsUnderCare.slice(0, 3).map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 rounded-lg bg-warning/5 border border-warning/20">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback className="text-xs">
                              {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{student.name}</div>
                            <div className="text-xs text-muted-foreground">
                              มีวิชาค้างหลายวิชา
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          ติดต่อ
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InstructorDashboard;