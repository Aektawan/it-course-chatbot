import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { mockCourses } from '@/services/mockData';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Settings, 
  BookOpen, 
  Link,
  Plus,
  Trash2,
  Save,
  AlertCircle,
  CheckCircle,
  Search
} from 'lucide-react';

const StaffDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [prerequisiteToAdd, setPrerequisiteToAdd] = useState<string>('');
  const [coursePrerequisites, setCoursePrerequisites] = useState<{ [key: string]: string[] }>({
    'IT201': ['IT101'],
    'IT301': ['IT201'],
    'IT401': ['IT301']
  });

  const filteredCourses = mockCourses.filter(course =>
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addPrerequisite = () => {
    if (selectedCourse && prerequisiteToAdd && selectedCourse !== prerequisiteToAdd) {
      setCoursePrerequisites(prev => ({
        ...prev,
        [selectedCourse]: [...(prev[selectedCourse] || []), prerequisiteToAdd]
      }));
      setPrerequisiteToAdd('');
      toast({
        title: 'เพิ่มเงื่อนไขสำเร็จ',
        description: `เพิ่มเงื่อนไขวิชา ${prerequisiteToAdd} สำหรับ ${selectedCourse}`,
      });
    }
  };

  const removePrerequisite = (courseCode: string, prerequisite: string) => {
    setCoursePrerequisites(prev => ({
      ...prev,
      [courseCode]: (prev[courseCode] || []).filter(p => p !== prerequisite)
    }));
    toast({
      title: 'ลบเงื่อนไขสำเร็จ',
      description: `ลบเงื่อนไขวิชา ${prerequisite} ออกจาก ${courseCode}`,
    });
  };

  const saveAllPrerequisites = () => {
    // Simulate API call
    toast({
      title: 'บันทึกการเปลี่ยนแปลงสำเร็จ',
      description: 'เงื่อนไขรายวิชาทั้งหมดถูกอัปเดตแล้ว',
    });
  };

  const stats = {
    totalCourses: mockCourses.length,
    coursesWithPrerequisites: Object.keys(coursePrerequisites).length,
    totalPrerequisites: Object.values(coursePrerequisites).flat().length
  };

  return (
    <div className="min-h-screen p-6 gradient-subtle">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">แดชบอร์ดบุคลากร</h1>
            <p className="text-muted-foreground">
              ยินดีต้อนรับ, {user?.name}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-8 h-8 text-staff" />
            <div className="text-right">
              <div className="font-medium">บุคลากรวิชาการ</div>
              <div className="text-sm text-muted-foreground">จัดการเงื่อนไขรายวิชา</div>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                รายวิชาทั้งหมด
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold">{stats.totalCourses}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                วิชาที่มีเงื่อนไข
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Link className="w-8 h-8 text-warning" />
                <span className="text-2xl font-bold">{stats.coursesWithPrerequisites}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                เงื่อนไขทั้งหมด
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Settings className="w-8 h-8 text-success" />
                <span className="text-2xl font-bold">{stats.totalPrerequisites}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="manage" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manage">จัดการเงื่อนไขวิชา</TabsTrigger>
            <TabsTrigger value="overview">ภาพรวมเงื่อนไข</TabsTrigger>
          </TabsList>

          <TabsContent value="manage" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>จัดการเงื่อนไขรายวิชา</span>
                </CardTitle>
                <CardDescription>
                  ตั้งค่าและแก้ไขเงื่อนไขการเรียนวิชาต่างๆ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add Prerequisite Form */}
                <div className="grid md:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/30">
                  <div className="space-y-2">
                    <Label htmlFor="course-select">เลือกวิชา</Label>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกรายวิชา" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCourses.map((course) => (
                          <SelectItem key={course.id} value={course.code}>
                            {course.code} - {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prerequisite-select">วิชาที่ต้องเรียนก่อน</Label>
                    <Select value={prerequisiteToAdd} onValueChange={setPrerequisiteToAdd}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกวิชาเงื่อนไข" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCourses
                          .filter(course => course.code !== selectedCourse)
                          .map((course) => (
                            <SelectItem key={course.id} value={course.code}>
                              {course.code} - {course.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button 
                      onClick={addPrerequisite}
                      disabled={!selectedCourse || !prerequisiteToAdd}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      เพิ่มเงื่อนไข
                    </Button>
                  </div>
                </div>

                {/* Search */}
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหารายวิชา..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Course Prerequisites List */}
                <div className="space-y-4">
                  {filteredCourses.map((course) => {
                    const prerequisites = coursePrerequisites[course.code] || [];
                    return (
                      <div key={course.id} className="p-4 border rounded-lg hover:shadow-soft transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <BookOpen className="w-5 h-5 text-primary" />
                              <h3 className="font-medium">{course.code} - {course.name}</h3>
                              <Badge variant="outline">{course.credits} หน่วยกิต</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {course.description}
                            </p>
                            
                            {prerequisites.length > 0 ? (
                              <div className="space-y-2">
                                <p className="text-sm font-medium">เงื่อนไขการเรียน:</p>
                                <div className="flex flex-wrap gap-2">
                                  {prerequisites.map((prerequisite, index) => (
                                    <div key={index} className="flex items-center space-x-1 bg-warning/10 border border-warning/20 rounded-lg px-3 py-1">
                                      <span className="text-sm">{prerequisite}</span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-auto w-auto p-1 hover:bg-destructive hover:text-destructive-foreground"
                                        onClick={() => removePrerequisite(course.code, prerequisite)}
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                  ไม่มีเงื่อนไขการเรียนสำหรับวิชานี้
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4 border-t">
                  <Button onClick={saveAllPrerequisites} className="bg-success text-success-foreground hover:bg-success/90">
                    <Save className="w-4 h-4 mr-2" />
                    บันทึกการเปลี่ยนแปลง
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>ภาพรวมเงื่อนไขรายวิชา</span>
                </CardTitle>
                <CardDescription>
                  แสดงเงื่อนไขการเรียนทั้งหมดในหลักสูตร
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(coursePrerequisites).map(([courseCode, prerequisites]) => {
                    const course = mockCourses.find(c => c.code === courseCode);
                    if (!course) return null;

                    return (
                      <div key={courseCode} className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-3">
                          <CheckCircle className="w-5 h-5 text-success" />
                          <h3 className="font-medium">{course.code} - {course.name}</h3>
                        </div>
                        
                        <div className="ml-7">
                          <p className="text-sm text-muted-foreground mb-2">
                            ต้องเรียนผ่านวิชาต่อไปนี้ก่อน:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {prerequisites.map((prerequisite, index) => (
                              <Badge key={index} variant="secondary">
                                {prerequisite}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {Object.keys(coursePrerequisites).length === 0 && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        ยังไม่มีการตั้งเงื่อนไขรายวิชา
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StaffDashboard;