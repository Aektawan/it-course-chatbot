import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { LoginCredentials } from '@/types/auth';
import { 
  Bot, 
  Mail, 
  Lock, 
  LogIn,
  AlertCircle,
  GraduationCap,
  UserCheck,
  Users,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const demoAccounts = [
    { email: 'student@kmutnb.ac.th', role: 'student', name: 'นักศึกษา', icon: <GraduationCap className="w-4 h-4" /> },
    { email: 'instructor@kmutnb.ac.th', role: 'instructor', name: 'อาจารย์', icon: <UserCheck className="w-4 h-4" /> },
    { email: 'staff@kmutnb.ac.th', role: 'staff', name: 'บุคลากร', icon: <Users className="w-4 h-4" /> },
    { email: 'admin@kmutnb.ac.th', role: 'admin', name: 'ผู้ดูแลระบบ', icon: <Shield className="w-4 h-4" /> }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(formData);
      if (success) {
        navigate('/');
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (email: string) => {
    setFormData({ email, password: 'password' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 gradient-subtle">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="p-3 gradient-primary rounded-xl">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                IT-Chatbot
              </div>
              <div className="text-sm text-muted-foreground">
                ระบบแนะนำหลักสูตร IT
              </div>
            </div>
          </Link>
        </div>

        {/* Login Form */}
        <Card className="shadow-large">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">เข้าสู่ระบบ</CardTitle>
            <CardDescription>
              กรุณาเข้าสู่ระบบด้วยอีเมลมหาวิทยาลัยของคุณ
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">อีเมล</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@kmutnb.ac.th"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">รหัสผ่าน</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="รหัสผ่านของคุณ"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-primary" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>กำลังเข้าสู่ระบบ...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <LogIn className="w-4 h-4" />
                    <span>เข้าสู่ระบบ</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  หรือทดลองใช้งาน
                </span>
              </div>
            </div>

            {/* Demo Accounts */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground text-center">
                บัญชีทดลองใช้งาน (รหัสผ่าน: password)
              </p>
              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map((account, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin(account.email)}
                    className="flex items-center space-x-1 text-xs h-9"
                  >
                    {account.icon}
                    <span>{account.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                ยังไม่มีบัญชี?{' '}
                <Link 
                  to="/register" 
                  className="text-primary hover:underline font-medium"
                >
                  สมัครสมาชิก
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            สำหรับบุคลากรของ{' '}
            <span className="font-medium text-foreground">
              มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;