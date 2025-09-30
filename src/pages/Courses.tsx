import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockCourses, mockDepartments } from '@/services/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { generateCoursesForSemester } from '@/services/completeCurriculumData';
import { CurriculumFlowchart } from '@/components/curriculum/CurriculumFlowchart';
import { CurriculumTimelineFlowchart } from '@/components/curriculum/CurriculumTimelineFlowchart';
import { 
  BookOpen, 
  Search, 
  Filter,
  GraduationCap,
  Clock,
  AlertCircle,
  Info,
  Network
} from 'lucide-react';

const Courses: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<string>('courses');

  // Filter curricula based on selected department
  const getAvailableCurricula = () => {
    switch (selectedDepartment) {
      case 'IT': return [
        { value: 'IT 62', label: 'IT 62' },
        { value: 'IT 67', label: 'IT 67' }
      ];
      case 'INE': return [
        { value: 'INE 62', label: 'INE 62' },
        { value: 'INE 67', label: 'INE 67' }
      ];
      case 'INET': return [
        { value: 'INET 62', label: 'INET 62' },
        { value: 'INET 67', label: 'INET 67' }
      ];
      case 'ITI': return [
        { value: 'ITI 61', label: 'ITI 61' },
        { value: 'ITI 66', label: 'ITI 66' }
      ];
      case 'ITT': return [
        { value: 'ITT 67', label: 'ITT 67' }
      ];
      default: return [
        { value: 'IT 62', label: 'IT 62' },
        { value: 'IT 67', label: 'IT 67' },
        { value: 'INE 62', label: 'INE 62' },
        { value: 'INE 67', label: 'INE 67' },
        { value: 'INET 62', label: 'INET 62' },
        { value: 'INET 67', label: 'INET 67' },
        { value: 'ITI 61', label: 'ITI 61' },
        { value: 'ITI 66', label: 'ITI 66' },
        { value: 'ITT 67', label: 'ITT 67' }
      ];
    }
  };

  // Get available semesters based on selected curriculum
  const getAvailableSemesters = () => {
    const baseSemesters = [
      { value: 'all', label: 'ทุกเทอม' },
      { value: '1-1', label: 'ปี 1 – เทอม 1' },
      { value: '1-2', label: 'ปี 1 – เทอม 2' },
      { value: '2-1', label: 'ปี 2 – เทอม 1' },
      { value: '2-2', label: 'ปี 2 – เทอม 2' },
      { value: '3-1', label: 'ปี 3 – เทอม 1' },
      { value: '3-2', label: 'ปี 3 – เทอม 2' },
      { value: '4-1', label: 'ปี 4 – เทอม 1' },
      { value: '4-2', label: 'ปี 4 – เทอม 2' }
    ];

    if (selectedCurriculum !== 'all') {
      const [programCode] = selectedCurriculum.split(' ');
      
      // Add semester 3 based on program
      if (programCode === 'IT' || programCode === 'INE') {
        // Year 3 semester 3 for IT and INE
        const index = baseSemesters.findIndex(s => s.value === '3-2');
        baseSemesters.splice(index + 1, 0, { value: '3-3', label: 'ปี 3 – เทอม 3 (ฝึกงาน)' });
      } else if (programCode === 'INET') {
        // INET: 3 years, 7 semesters (Year 2 has semester 3 internship)
        const index = baseSemesters.findIndex(s => s.value === '2-2');
        baseSemesters.splice(index + 1, 0, { value: '2-3', label: 'ปี 2 – เทอม 3 (ฝึกงาน)' });
        
        // Remove year 4 semesters for INET (3-year program, 7 semesters)
        return baseSemesters.filter(s => 
          s.value === 'all' || 
          !s.value.startsWith('4-')
        );
      } else if (programCode === 'ITI') {
        // ITI: 2 years, 5 semesters (Year 1 has semester 3 internship)
        const index = baseSemesters.findIndex(s => s.value === '1-2');
        baseSemesters.splice(index + 1, 0, { value: '1-3', label: 'ปี 1 – เทอม 3 (ฝึกงาน)' });
        
        // Remove year 3 and 4 semesters for ITI (2-year program, 5 semesters)
        return baseSemesters.filter(s => 
          s.value === 'all' || 
          s.value.startsWith('1-') || 
          s.value.startsWith('2-')
        );
      } else if (programCode === 'ITT') {
        // ITT: 2 years, 4 semesters (no internship)
        return baseSemesters.filter(s => 
          s.value === 'all' || 
          s.value.startsWith('1-') || 
          s.value.startsWith('2-')
        );
      }
    }

    return baseSemesters;
  };

  // Auto-select the latest curriculum when department changes
  React.useEffect(() => {
    if (selectedDepartment !== 'all') {
      const availableCurricula = getAvailableCurricula();
      // Find the curriculum with the highest number for the selected department
      if (availableCurricula.length > 0) {
        const latestCurriculum = availableCurricula.reduce((latest, current) => {
          const latestYear = parseInt(latest.value.split(' ')[1]);
          const currentYear = parseInt(current.value.split(' ')[1]);
          return currentYear > latestYear ? current : latest;
        });
        setSelectedCurriculum(latestCurriculum.value);
      } else {
        setSelectedCurriculum('all');
      }
    } else {
      setSelectedCurriculum('all');
    }
  }, [selectedDepartment]);

  // Reset semester when curriculum changes
  React.useEffect(() => {
    if (selectedCurriculum !== 'all') {
      const availableSemesters = getAvailableSemesters();
      if (!availableSemesters.some(s => s.value === selectedSemester)) {
        setSelectedSemester('all');
      }
    }
  }, [selectedCurriculum]);

  // Generate courses based on selections
  const generateFilteredCourses = () => {
    // Only show courses if both department and curriculum are selected
    if (selectedDepartment !== 'all' && selectedCurriculum !== 'all') {
      // If specific curriculum and semester are selected, show only those courses
      if (selectedSemester !== 'all') {
        const [year, semester] = selectedSemester.split('-').map(Number);
        const [programCode, curriculumYear] = selectedCurriculum.split(' ');
        return generateCoursesForSemester(programCode, curriculumYear, year, semester, 7);
      }
      
      // If only curriculum is selected, show all courses for that curriculum
      const [programCode, curriculumYear] = selectedCurriculum.split(' ');
      const allCourses = [];
      const maxYear = programCode === 'INET' ? 3 : programCode === 'ITI' || programCode === 'ITT' ? 2 : 4;
      // Generate courses for all semesters
      for (let year = 1; year <= maxYear; year++) {
        for (let semester = 1; semester <= 2; semester++) {
          allCourses.push(...generateCoursesForSemester(programCode, curriculumYear, year, semester, 7));
        }
        // Add semester 3 for specific programs and years
        if ((programCode === 'IT' || programCode === 'INE') && year === 3) {
          allCourses.push(...generateCoursesForSemester(programCode, curriculumYear, year, 3, 7));
        }
        if (programCode === 'INET' && year === 2) {
          allCourses.push(...generateCoursesForSemester(programCode, curriculumYear, year, 3, 7));
        }
        if ((programCode === 'ITI') && year === 1) {
          allCourses.push(...generateCoursesForSemester(programCode, curriculumYear, year, 3, 7));
        }
      }
      return allCourses;
    }
    
    // If department and curriculum are not both selected, return empty array
    return [];
  };

  const allCourses = generateFilteredCourses();
  
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || course.code.startsWith(selectedDepartment);
    const matchesCurriculum = selectedCurriculum === 'all' || course.code.startsWith(selectedCurriculum.split(' ')[0]);
    
    return matchesSearch && matchesDepartment && matchesCurriculum;
  });

  const getCategoryBadge = (category: string) => {
    const baseClasses = "min-w-[80px] text-center whitespace-nowrap text-xs px-2 py-1 flex items-center justify-center";
    switch (category) {
      case 'core': return <Badge variant="default" className={baseClasses}>วิชาแกน</Badge>;
      case 'major': return <Badge className={`bg-secondary text-secondary-foreground ${baseClasses}`}>วิชาเอก</Badge>;
      case 'elective': return <Badge className={`bg-warning text-warning-foreground ${baseClasses}`}>วิชาเลือก</Badge>;
      case 'free':
        return (
          <Badge className={`bg-orange-500/90 hover:bg-orange-500/80 text-white ${baseClasses}`}>
            วิชาเสรี
          </Badge>
        );
      case 'general': return <Badge variant="outline" className={baseClasses}>ศึกษาทั่วไป</Badge>;
      default: return <Badge variant="outline" className={baseClasses}>{category}</Badge>;
    }
  };

  // Get current curriculum for flowchart
  const getCurrentCurriculum = () => {
    if (selectedDepartment === 'all' || selectedCurriculum === 'all') {
      return null;
    }
    
    const department = mockDepartments.find(dept => dept.code === selectedDepartment);
    if (!department) return null;
    
    const curriculum = department.curricula.find(curr => 
      curr.name.includes(selectedCurriculum.split(' ')[1])
    );
    return curriculum || null;
  };

  const currentCurriculum = getCurrentCurriculum();

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
            <div className="grid md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ค้นหารายวิชา..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="สาขาวิชา" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  <SelectItem value="all">ทุกสาขาวิชา</SelectItem>
                  <SelectItem value="IT">เทคโนโลยีสารสนเทศ (IT)</SelectItem>
                  <SelectItem value="INE">วิศวกรรมสารสนเทศและเครือข่าย (INE)</SelectItem>
                  <SelectItem value="INET">วิศวกรรมสารสนเทศและเครือข่าย (INET)</SelectItem>
                  <SelectItem value="ITI">เทคโนโลยีสารสนเทศ (ต่อเนื่อง) (ITI)</SelectItem>
                  <SelectItem value="ITT">เทคโนโลยีสารสนเทศ (ITT)</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={selectedCurriculum} 
                onValueChange={setSelectedCurriculum}
                disabled={selectedDepartment === 'all'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="หลักสูตรปีการศึกษา" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  <SelectItem value="all">ทุกหลักสูตร</SelectItem>
                  {getAvailableCurricula().map((curriculum) => (
                    <SelectItem key={curriculum.value} value={curriculum.value}>
                      {curriculum.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="เทอม" />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  {getAvailableSemesters().map((semester) => (
                    <SelectItem key={semester.value} value={semester.value}>
                      {semester.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDepartment('all');
                  setSelectedCurriculum('all');
                  setSelectedSemester('all');
                }}
              >
                ล้างตัวกรอง
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="courses" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>รายวิชา</span>
            </TabsTrigger>
            <TabsTrigger value="flowchart" className="flex items-center space-x-2">
              <Network className="w-4 h-4" />
              <span>แผนผังหลักสูตร</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
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
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>ภาค {course.semester}/ปี {course.year}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="flex items-center space-x-2">
                            <Info className="w-4 h-4" />
                            <span>รายละเอียด</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center space-x-2">
                              <BookOpen className="w-5 h-5 text-primary" />
                              <span>{course.code} - {course.name}</span>
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                              {getCategoryBadge(course.category)}
                              <span className="text-sm text-muted-foreground">{course.credits} หน่วยกิต</span>
                              <span className="text-sm text-muted-foreground">ภาค {course.semester}/ปี {course.year}</span>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">คำอธิบายรายวิชา</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>
                            </div>

                            {course.prerequisites.length > 0 && (
                              <div>
                                <h4 className="font-medium mb-2 flex items-center space-x-2">
                                  <AlertCircle className="w-4 h-4" />
                                  <span>วิชาที่ต้องเรียนก่อน</span>
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {course.prerequisites.map((prereq, index) => (
                                    <Badge key={index} variant="outline">
                                      {prereq}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {course.corequisites.length > 0 && (
                              <div>
                                <h4 className="font-medium mb-2 flex items-center space-x-2">
                                  <AlertCircle className="w-4 h-4" />
                                  <span>วิชาที่ต้องเรียนพร้อมกัน</span>
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {course.corequisites.map((coreq, index) => (
                                    <Badge key={index} variant="outline">
                                      {coreq}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {course.instructor && (
                              <div>
                                <h4 className="font-medium mb-2">อาจารย์ผู้สอน</h4>
                                <p className="text-sm text-muted-foreground">{course.instructor}</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      {isAuthenticated && (
                        <Button size="sm">
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

            {/* Summary Statistics */}
            <Card className="shadow-medium">
              <CardContent className="p-6">
                <div className="grid grid-cols-5 gap-4">
                  <div className="text-center space-y-2 min-h-[80px] bg-primary/5 rounded-lg flex flex-col justify-center p-4">
                    <div className="text-2xl font-bold text-primary">{filteredCourses.length}</div>
                    <div className="text-sm text-muted-foreground">รายวิชาทั้งหมด</div>
                  </div>
                  <div className="text-center space-y-2 min-h-[80px] bg-secondary/10 rounded-lg flex flex-col justify-center p-4">
                    <div className="text-2xl font-bold text-emerald-600">
                      {filteredCourses.reduce((sum, course) => sum + course.credits, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">หน่วยกิตรวม</div>
                  </div>
                  <div className="text-center space-y-2 min-h-[80px] bg-blue-50 rounded-lg flex flex-col justify-center p-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {filteredCourses.filter(course => course.mainCategory === 'หมวดวิชาเฉพาะ').length}
                    </div>
                    <div className="text-sm text-muted-foreground">วิชาเฉพาะ</div>
                  </div>
                  <div className="text-center space-y-2 min-h-[80px] bg-green-50 rounded-lg flex flex-col justify-center p-4">
                    <div className="text-2xl font-bold text-green-600">
                      {filteredCourses.filter(course => course.mainCategory === 'หมวดวิชาศึกษาทั่วไป').length}
                    </div>
                    <div className="text-sm text-muted-foreground">วิชาทั่วไป</div>
                  </div>
                  <div className="text-center space-y-2 min-h-[80px] bg-warning/10 rounded-lg flex flex-col justify-center p-4">
                    <div className="text-2xl font-bold text-warning">
                      {filteredCourses.filter(course => course.mainCategory === 'หมวดวิชาเลือกเสรี').length}
                    </div>
                    <div className="text-sm text-muted-foreground">วิชาเลือกเสรี</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flowchart" className="space-y-6">
            {selectedDepartment !== 'all' && selectedCurriculum !== 'all' ? (
              <CurriculumTimelineFlowchart 
                selectedDepartment={selectedDepartment}
                selectedCurriculum={selectedCurriculum}
                departmentName={mockDepartments.find(dept => dept.code === selectedDepartment)?.nameThai || 'หลักสูตร'}
              />
            ) : (
              <Card className="shadow-medium">
                <CardContent className="p-12 text-center space-y-4">
                  <Network className="w-16 h-16 text-muted-foreground mx-auto" />
                  <h3 className="text-xl font-semibold text-muted-foreground">
                    เลือกสาขาวิชาและหลักสูตรเพื่อดูแผนผัง
                  </h3>
                  <p className="text-muted-foreground">
                    กรุณาเลือกสาขาวิชาและหลักสูตรปีการศึกษาที่ต้องการดูแผนผังหลักสูตรจากตัวกรองด้านบน
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Courses;