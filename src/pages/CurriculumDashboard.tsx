import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockDepartments } from '@/services/mockData';
import { 
  BookOpen, 
  Search, 
  GraduationCap,
  Clock,
  User,
  AlertCircle,
  Calendar,
  Award
} from 'lucide-react';

const CurriculumDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');

  // Create curriculum options
  const curriculumOptions = useMemo(() => {
    const options: Array<{value: string, label: string, description: string}> = [];
    
    mockDepartments.forEach(dept => {
      dept.curricula.forEach(curr => {
        options.push({
          value: curr.id,
          label: `${dept.code} ${curr.buddhistYear - 543}`,
          description: curr.name
        });
      });
    });
    
    return options;
  }, []);

  // Get selected curriculum data
  const selectedCurriculumData = useMemo(() => {
    if (!selectedCurriculum) return null;
    
    for (const dept of mockDepartments) {
      const curriculum = dept.curricula.find(curr => curr.id === selectedCurriculum);
      if (curriculum) {
        return { department: dept, curriculum };
      }
    }
    return null;
  }, [selectedCurriculum]);

  // Create semester options based on selected curriculum
  const semesterOptions = useMemo(() => {
    if (!selectedCurriculumData) return [];
    
    const options: Array<{value: string, label: string}> = [];
    const maxYear = selectedCurriculumData.curriculum.duration;
    
    for (let year = 1; year <= maxYear; year++) {
      for (let semester = 1; semester <= 2; semester++) {
        options.push({
          value: `${year}-${semester}`,
          label: `ปี ${year} เทอม ${semester}`
        });
      }
    }
    
    return options;
  }, [selectedCurriculumData]);

  // Get courses for selected semester
  const selectedSemesterCourses = useMemo(() => {
    if (!selectedCurriculumData || !selectedSemester) return [];
    
    const [yearStr, semesterStr] = selectedSemester.split('-');
    const year = parseInt(yearStr);
    const semester = parseInt(semesterStr);
    
    const semesterData = selectedCurriculumData.curriculum.semesters.find(
      sem => sem.year === year && sem.semester === semester
    );
    
    return semesterData?.courses || [];
  }, [selectedCurriculumData, selectedSemester]);

  // Filter courses based on search term
  const filteredCourses = useMemo(() => {
    if (!searchTerm) return selectedSemesterCourses;
    
    return selectedSemesterCourses.filter(course =>
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selectedSemesterCourses, searchTerm]);

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
            <h1 className="text-4xl font-bold">แดชบอร์ดหลักสูตร</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            เลือกหลักสูตรและเทอมเพื่อดูรายวิชาที่เรียนในแต่ละภาคการศึกษา
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>ค้นหาและเลือกหลักสูตร</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ค้นหารายวิชา..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Curriculum Selection */}
              <Select value={selectedCurriculum} onValueChange={setSelectedCurriculum}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกหลักสูตร" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg">
                  {curriculumOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Semester Selection */}
              <Select 
                value={selectedSemester} 
                onValueChange={setSelectedSemester}
                disabled={!selectedCurriculum}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกเทอม" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg">
                  {semesterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCurriculum('');
                  setSelectedSemester('');
                }}
              >
                ล้างตัวกรอง
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Curriculum Description */}
        {selectedCurriculumData && (
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-primary" />
                <span>{selectedCurriculumData.curriculum.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {selectedCurriculumData.curriculum.duration}
                  </div>
                  <div className="text-sm text-muted-foreground">ปีการศึกษา</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">
                    {selectedCurriculumData.curriculum.totalCredits}
                  </div>
                  <div className="text-sm text-muted-foreground">หน่วยกิตรวม</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">
                    {selectedCurriculumData.curriculum.semesters.length}
                  </div>
                  <div className="text-sm text-muted-foreground">เทอมทั้งหมด</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-warning">
                    {selectedCurriculumData.curriculum.semesters.reduce(
                      (total, sem) => total + sem.courses.length, 0
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">รายวิชาทั้งหมด</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Course List */}
        {filteredCourses.length > 0 && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-primary" />
                <span>
                  รายวิชา{selectedSemester && ` - ${semesterOptions.find(opt => opt.value === selectedSemester)?.label}`}
                </span>
              </h2>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {filteredCourses.length} รายวิชา
              </Badge>
            </div>

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
                      
                      <Button size="sm" variant="outline">
                        ดูรายละเอียด
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* No Selection State */}
        {!selectedCurriculum && (
          <Card className="shadow-medium">
            <CardContent className="text-center py-12">
              <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">เลือกหลักสูตรเพื่อเริ่มต้น</h3>
              <p className="text-muted-foreground">
                กรุณาเลือกหลักสูตรจากเมนูด้านบนเพื่อดูรายวิชาและแผนการเรียน
              </p>
            </CardContent>
          </Card>
        )}

        {/* No Semester Selection */}
        {selectedCurriculum && !selectedSemester && (
          <Card className="shadow-medium">
            <CardContent className="text-center py-12">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">เลือกเทอมการศึกษา</h3>
              <p className="text-muted-foreground">
                กรุณาเลือกเทอมการศึกษาเพื่อดูรายวิชาในเทอมนั้น ๆ
              </p>
            </CardContent>
          </Card>
        )}

        {/* No Results */}
        {selectedCurriculum && selectedSemester && filteredCourses.length === 0 && (
          <Card className="shadow-medium">
            <CardContent className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">ไม่พบรายวิชา</h3>
              <p className="text-muted-foreground">
                ลองเปลี่ยนเงื่อนไขการค้นหาหรือเลือกเทอมอื่น
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CurriculumDashboard;