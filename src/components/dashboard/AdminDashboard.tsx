import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { mockUsers, mockCourses, mockAuditLogs } from '@/services/mockData';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Users, 
  BookOpen, 
  Plus,
  Edit,
  Trash2,
  Search,
  FileText,
  Clock,
  Settings,
  Download,
  Upload,
  UserPlus,
  History,
  Save
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    credits: 3,
    description: '',
    category: 'core' as const
  });

  const stats = {
    totalUsers: mockUsers.length,
    totalCourses: mockCourses.length,
    activeUsers: mockUsers.filter(u => u.lastLogin).length,
    activeCourses: mockCourses.filter(c => c.isActive).length
  };

  const addCourse = () => {
    if (newCourse.code && newCourse.name) {
      toast({
        title: 'เพิ่มรายวิชาสำเร็จ',
        description: `เพิ่มวิชา ${newCourse.code} - ${newCourse.name} แล้ว`,
      });
      setNewCourse({
        code: '',
        name: '',
        credits: 3,
        description: '',
        category: 'core'
      });
    }
  };

  const changeUserRole = (userId: string, newRole: string) => {
    toast({
      title: 'เปลี่ยนบทบาทสำเร็จ',
      description: `เปลี่ยนบทบาทผู้ใช้เป็น ${newRole} แล้ว`,
    });
  };

  const exportData = () => {
    toast({
      title: 'ส่งออกข้อมูลสำเร็จ',
      description: 'ไฟล์ข้อมูลหลักสูตรถูกส่งออกแล้ว',
    });
  };

  const filteredUsers = mockUsers.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 gradient-subtle">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">แดशบอร์ดผู้ดูแลระบบ</h1>
            <p className="text-muted-foreground">
              ยินดีต้อนรับ, {user?.name} • ระดับสิทธิ์: Super Admin
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-admin" />
            <div className="text-right">
              <div className="font-medium">ผู้ดูแลระบบ</div>
              <div className="text-sm text-muted-foreground">สิทธิ์การเข้าถึงเต็ม</div>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ผู้ใช้ทั้งหมด
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold">{stats.totalUsers}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                รายวิชาทั้งหมด
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-8 h-8 text-secondary" />
                <span className="text-2xl font-bold">{stats.totalCourses}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ผู้ใช้ที่ใช้งาน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-success" />
                <span className="text-2xl font-bold">{stats.activeUsers}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                วิชาที่เปิดสอน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-8 h-8 text-warning" />
                <span className="text-2xl font-bold">{stats.activeCourses}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="users">จัดการผู้ใช้</TabsTrigger>
            <TabsTrigger value="courses">จัดการรายวิชา</TabsTrigger>
            <TabsTrigger value="import-export">นำเข้า/ส่งออก</TabsTrigger>
            <TabsTrigger value="audit">Audit Log</TabsTrigger>
            <TabsTrigger value="settings">ตั้งค่าระบบ</TabsTrigger>
          </TabsList>

          {/* Users Management */}
          <TabsContent value="users" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>จัดการผู้ใช้</span>
                    </CardTitle>
                    <CardDescription>
                      จัดการบัญชีผู้ใช้และบทบาท
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="ค้นหาผู้ใช้..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <UserPlus className="w-4 h-4 mr-2" />
                          เพิ่มผู้ใช้
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>เพิ่มผู้ใช้ใหม่</DialogTitle>
                          <DialogDescription>
                            สร้างบัญชีผู้ใช้ใหม่และกำหนดบทบาท
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="new-user-name">ชื่อ-นามสกุล</Label>
                              <Input id="new-user-name" placeholder="นายสมชาย ใจดี" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="new-user-email">อีเมล</Label>
                              <Input id="new-user-email" placeholder="somchai@kmutnb.ac.th" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-user-role">บทบาท</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="เลือกบทบาท" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="student">นักศึกษา</SelectItem>
                                <SelectItem value="instructor">อาจารย์</SelectItem>
                                <SelectItem value="staff">บุคลากร</SelectItem>
                                <SelectItem value="admin">ผู้ดูแลระบบ</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full">สร้างบัญชี</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((userData) => (
                    <div key={userData.id} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-soft transition-shadow">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={userData.avatar} alt={userData.name} />
                          <AvatarFallback>
                            {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{userData.name}</div>
                          <div className="text-sm text-muted-foreground">{userData.email}</div>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={`role-${userData.role}`}>
                              {userData.role}
                            </Badge>
                            {userData.studentId && (
                              <Badge variant="outline">{userData.studentId}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select
                          value={userData.role}
                          onValueChange={(value) => changeUserRole(userData.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">นักศึกษา</SelectItem>
                            <SelectItem value="instructor">อาจารย์</SelectItem>
                            <SelectItem value="staff">บุคลากร</SelectItem>
                            <SelectItem value="admin">ผู้ดูแลระบบ</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Course Management */}
          <TabsContent value="courses" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5" />
                      <span>จัดการรายวิชา</span>
                    </CardTitle>
                    <CardDescription>
                      เพิ่ม แก้ไข และลบรายวิชาในหลักสูตร
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        เพิ่มรายวิชา
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>เพิ่มรายวิชาใหม่</DialogTitle>
                        <DialogDescription>
                          กรอกข้อมูลรายวิชาที่ต้องการเพิ่มในหลักสูตร
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="course-code">รหัสวิชา</Label>
                            <Input
                              id="course-code"
                              placeholder="IT501"
                              value={newCourse.code}
                              onChange={(e) => setNewCourse(prev => ({ ...prev, code: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="course-credits">หน่วยกิต</Label>
                            <Input
                              id="course-credits"
                              type="number"
                              min="1"
                              max="6"
                              value={newCourse.credits}
                              onChange={(e) => setNewCourse(prev => ({ ...prev, credits: parseInt(e.target.value) }))}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="course-name">ชื่อวิชา</Label>
                          <Input
                            id="course-name"
                            placeholder="การพัฒนาแอปพลิเคชันขั้นสูง"
                            value={newCourse.name}
                            onChange={(e) => setNewCourse(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="course-category">หมวดวิชา</Label>
                          <Select
                            value={newCourse.category}
                            onValueChange={(value) => setNewCourse(prev => ({ ...prev, category: value as any }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="core">วิชาแกน</SelectItem>
                              <SelectItem value="major">วิชาเอก</SelectItem>
                              <SelectItem value="elective">วิชาเลือก</SelectItem>
                              <SelectItem value="general">วิชาศึกษาทั่วไป</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="course-description">รายละเอียดวิชา</Label>
                          <Textarea
                            id="course-description"
                            placeholder="อธิบายเนื้อหาและจุดประสงค์ของรายวิชา"
                            value={newCourse.description}
                            onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                          />
                        </div>
                        <Button onClick={addCourse} className="w-full">
                          เพิ่มรายวิชา
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-soft transition-shadow">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="w-6 h-6 text-primary" />
                        <div>
                          <div className="font-medium">{course.code} - {course.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {course.credits} หน่วยกิต • {course.category} • อาจารย์: {course.instructor}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {course.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={course.isActive ? "default" : "secondary"}>
                          {course.isActive ? 'เปิดสอน' : 'ปิดสอน'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Import/Export */}
          <TabsContent value="import-export" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="w-5 h-5" />
                    <span>นำเข้าข้อมูล</span>
                  </CardTitle>
                  <CardDescription>
                    นำเข้าข้อมูลหลักสูตรและผู้ใช้จากไฟล์
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>นำเข้าหลักสูตร (CSV/Excel)</Label>
                    <Button variant="outline" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      เลือกไฟล์หลักสูตร
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>นำเข้าผู้ใช้ (CSV/Excel)</Label>
                    <Button variant="outline" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      เลือกไฟล์ผู้ใช้
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>ส่งออกข้อมูล</span>
                  </CardTitle>
                  <CardDescription>
                    ส่งออกข้อมูลสำหรับการสำรองหรือวิเคราะห์
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={exportData} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    ส่งออกข้อมูลหลักสูตร
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    ส่งออกข้อมูลผู้ใช้
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    ส่งออกข้อมูลสถิติ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Audit Log */}
          <TabsContent value="audit" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="w-5 h-5" />
                  <span>บันทึกการดำเนินการ (Audit Log)</span>
                </CardTitle>
                <CardDescription>
                  ติดตามการเปลี่ยนแปลงและกิจกรรมของระบบ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAuditLogs.map((log) => (
                    <div key={log.id} className="flex items-start justify-between p-4 rounded-lg border">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-info/10">
                          <FileText className="w-4 h-4 text-info" />
                        </div>
                        <div>
                          <div className="font-medium">{log.action}</div>
                          <div className="text-sm text-muted-foreground">{log.details}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            ผู้ใช้: {mockUsers.find(u => u.id === log.userId)?.name} • IP: {log.ipAddress}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{log.timestamp.toLocaleString('th-TH')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>ตั้งค่าระบบ</span>
                </CardTitle>
                <CardDescription>
                  กำหนดค่าการทำงานของระบบ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>ชื่อระบบ</Label>
                    <Input defaultValue="IT-Chatbot ระบบแนะนำหลักสูตร" />
                  </div>
                  <div className="space-y-2">
                    <Label>จำนวนข้อความสูงสุดในแชท</Label>
                    <Input type="number" defaultValue="100" />
                  </div>
                  <div className="space-y-2">
                    <Label>จำนวนวันเก็บ Audit Log</Label>
                    <Input type="number" defaultValue="90" />
                  </div>
                  <div className="space-y-2">
                    <Label>อีเมลผู้ดูแลระบบ</Label>
                    <Input defaultValue="admin@kmutnb.ac.th" />
                  </div>
                </div>
                <Button className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  บันทึกการตั้งค่า
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;