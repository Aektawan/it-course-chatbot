import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockCourses } from '@/services/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BookOpen, 
  Search, 
  Filter,
  GraduationCap,
  Clock,
  User,
  AlertCircle
} from 'lucide-react';

const Courses: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || course.year.toString() === selectedYear;
    
    return matchesSearch && matchesCategory && matchesYear;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'core': return <Badge variant="default">วิชาแกน</Badge>;
      case 'major': return <Badge className="bg-secondary text-secondary-foreground">วิชาเอก</Badge>;
      case 'elective': return <Badge className="bg-warning text-warning-foreground">วิชาเลือก</Badge>;
      case 'general': return <Badge variant="outline">ศึกษาทั่วไป</Badge>;
      default: return <Badge variant="outline">{category}</Badge>;
    }
  };

  return (
    <div className="min-h-screen p-6 gradient-subtle">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">หลักสูตรเทคโนโลยีสารสนเทศ</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            สำรวจรายวิชาในหลักสูตรและวางแผนการเรียนของคุณ
          </p>
        </div>

        {/* Filters */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>ค้นหาและกรองรายวิชา</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ค้นหารายวิชา..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="หมวดวิชา" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทุกหมวดวิชา</SelectItem>
                  <SelectItem value="core">วิชาแกน</SelectItem>
                  <SelectItem value="major">วิชาเอก</SelectItem>
                  <SelectItem value="elective">วิชาเลือก</SelectItem>
                  <SelectItem value="general">ศึกษาทั่วไป</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="ชั้นปี" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทุกชั้นปี</SelectItem>
                  <SelectItem value="1">ปี 1</SelectItem>
                  <SelectItem value="2">ปี 2</SelectItem>
                  <SelectItem value="3">ปี 3</SelectItem>
                  <SelectItem value="4">ปี 4</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedYear('all');
                }}
              >
                ล้างตัวกรอง
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span className="font-mono font-bold text-lg">{course.code}</span>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {course.name}
                    </CardTitle>
                  </div>
                  <div className="text-right space-y-1">
                    {getCategoryBadge(course.category)}
                    <div className="text-sm text-muted-foreground">
                      {course.credits} หน่วยกิต
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed">
                  {course.description}
                </CardDescription>

                <div className="space-y-3">
                  {/* Course Info */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span>ภาค {course.semester}/ปี {course.year}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3 text-muted-foreground" />
                      <span className="truncate">{course.instructor}</span>
                    </div>
                  </div>

                  {/* Prerequisites */}
                  {course.prerequisites.length > 0 && (
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <AlertCircle className="w-3 h-3" />
                        <span>ต้องเรียนก่อน:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {course.prerequisites.map((prereq, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {prereq}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Corequisites */}
                  {course.corequisites.length > 0 && (
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <AlertCircle className="w-3 h-3" />
                        <span>เรียนพร้อมกัน:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {course.corequisites.map((coreq, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {coreq}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <Badge variant={course.isActive ? "default" : "secondary"}>
                    {course.isActive ? 'เปิดสอน' : 'ปิดสอน'}
                  </Badge>
                  
                  {isAuthenticated && (
                    <Button size="sm" variant="outline">
                      เพิ่มในแผน
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <Card className="shadow-medium">
            <CardContent className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">ไม่พบรายวิชา</h3>
              <p className="text-muted-foreground">
                ลองเปลี่ยนเงื่อนไขการค้นหาหรือล้างตัวกรอง
              </p>
            </CardContent>
          </Card>
        )}

        {/* Course Summary */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>สรุปหลักสูตร</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{mockCourses.length}</div>
                <div className="text-sm text-muted-foreground">รายวิชาทั้งหมด</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">
                  {mockCourses.reduce((sum, course) => sum + course.credits, 0)}
                </div>
                <div className="text-sm text-muted-foreground">หน่วยกิตรวม</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">
                  {mockCourses.filter(c => c.category === 'core').length}
                </div>
                <div className="text-sm text-muted-foreground">วิชาแกน</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">
                  {mockCourses.filter(c => c.category === 'major').length}
                </div>
                <div className="text-sm text-muted-foreground">วิชาเอก</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Courses;