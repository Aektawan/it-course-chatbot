import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState, LoginCredentials, RegisterCredentials, UserRole } from '@/types/auth';
import { mockUsers } from '@/services/mockData';
import { toast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  switchRole: (role: UserRole) => void; // For demo purposes
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for stored auth state
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setAuthState(prev => ({ ...prev, isLoading: false }));
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      // Mock authentication
      const user = mockUsers.find(u => u.email === credentials.email);
      if (user && credentials.password === 'password') {
        const updatedUser = { ...user, lastLogin: new Date() };
        setAuthState({
          user: updatedUser,
          isAuthenticated: true,
          isLoading: false
        });
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast({
          title: 'เข้าสู่ระบบสำเร็จ',
          description: `ยินดีต้อนรับ ${user.name}`,
        });
        return true;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      toast({
        title: 'เข้าสู่ระบบไม่สำเร็จ',
        description: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
        variant: 'destructive',
      });
      return false;
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    try {
      // Mock registration
      const newUser: User = {
        id: Date.now().toString(),
        email: credentials.email,
        name: credentials.name,
        role: credentials.email.includes('@kmutnb.ac.th') ? 'student' : 'guest',
        studentId: credentials.studentId,
        program: credentials.program,
        year: credentials.year,
        createdAt: new Date(),
        lastLogin: new Date()
      };

      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false
      });
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: 'สมัครสมาชิกสำเร็จ',
        description: `ยินดีต้อนรับ ${newUser.name}`,
      });
      return true;
    } catch (error) {
      toast({
        title: 'สมัครสมาชิกไม่สำเร็จ',
        description: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
        variant: 'destructive',
      });
      return false;
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    localStorage.removeItem('user');
    toast({
      title: 'ออกจากระบบสำเร็จ',
      description: 'แล้วพบกันใหม่',
    });
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    try {
      if (!authState.user) return false;
      
      const updatedUser = { ...authState.user, ...updates };
      setAuthState(prev => ({
        ...prev,
        user: updatedUser
      }));
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast({
        title: 'อัปเดตโปรไฟล์สำเร็จ',
        description: 'ข้อมูลของคุณถูกบันทึกแล้ว',
      });
      return true;
    } catch (error) {
      toast({
        title: 'อัปเดตโปรไฟล์ไม่สำเร็จ',
        description: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
        variant: 'destructive',
      });
      return false;
    }
  };

  const switchRole = (role: UserRole) => {
    if (!authState.user) return;
    
    const updatedUser = { ...authState.user, role };
    setAuthState(prev => ({
      ...prev,
      user: updatedUser
    }));
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    toast({
      title: 'เปลี่ยนบทบาทสำเร็จ',
      description: `เปลี่ยนเป็น ${role} แล้ว`,
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      updateProfile,
      switchRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};