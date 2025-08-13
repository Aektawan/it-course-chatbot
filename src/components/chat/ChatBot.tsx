import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { ChatMessage } from '@/types/chat';
import { chatbotResponses, mockCourses } from '@/services/mockData';
import { 
  Bot, 
  Send, 
  MessageCircle, 
  Sparkles,
  GraduationCap,
  BookOpen,
  HelpCircle,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface ChatBotProps {
  className?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ className }) => {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting
    const greeting = chatbotResponses.greetings[0];
    setMessages([{
      id: '1',
      content: greeting,
      isBot: true,
      timestamp: new Date(),
    }]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Course information queries
    for (const [courseCode, info] of Object.entries(chatbotResponses.courseInfo)) {
      if (message.includes(courseCode.toLowerCase()) || message.includes(courseCode)) {
        return info;
      }
    }

    // General course queries
    if (message.includes('วิชา') || message.includes('หลักสูตร') || message.includes('เรียน')) {
      const courses = mockCourses.slice(0, 3);
      return `นี่คือรายวิชาในหลักสูตร IT:\n\n${courses.map(course => 
        `🎓 ${course.code} - ${course.name} (${course.credits} หน่วยกิต)`
      ).join('\n')}`;
    }

    // Prerequisites queries
    if (message.includes('เงื่อนไข') || message.includes('prerequisite')) {
      return 'สำหรับการตรวจสอบเงื่อนไขวิชา กรุณาระบุรหัสวิชาที่ต้องการสอบถาม เช่น IT301 หรือ IT401';
    }

    // Study plan queries for authenticated users
    if (isAuthenticated && (message.includes('แผนการเรียน') || message.includes('วางแผน'))) {
      return 'คุณสามารถดูและจัดการแผนการเรียนได้ในหน้าแดชบอร์ดของคุณ คลิกที่เมนู "แดชบอร์ด" เพื่อเข้าไปจัดการ';
    }

    // Help queries
    if (message.includes('ช่วย') || message.includes('help') || message.includes('สอบถาม')) {
      return `ฉันสามารถช่วยเหลือในเรื่องต่อไปนี้:\n\n🎓 ข้อมูลรายวิชาและหลักสูตร\n📋 เงื่อนไขการเรียนวิชา\n📚 แนะนำการวางแผนการเรียน${isAuthenticated ? '\n👤 ข้อมูลส่วนตัวและผลการเรียน' : '\n🔐 เข้าสู่ระบบเพื่อใช้ฟีเจอร์เพิ่มเติม'}`;
    }

    // Default responses
    const defaultResponses = [
      'ขอโทษครับ ฉันไม่เข้าใจคำถามของคุณ กรุณาลองถามใหม่หรือพิมพ์ "ช่วย" เพื่อดูสิ่งที่ฉันสามารถตอบได้',
      'ฉันเป็นแชทบอทสำหรับให้ข้อมูลหลักสูตร IT กรุณาถามเกี่ยวกับรายวิชา หลักสูตร หรือการวางแผนการเรียน',
      'ลองถามเกี่ยวกับรายวิชา IT หรือพิมพ์รหัสวิชาที่ต้องการทราบข้อมูล เช่น "IT101" หรือ "IT301"'
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
      userId: user?.id
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className={`${className} fixed bottom-6 right-6 z-50`}>
      {/* Toggle Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 rounded-full gradient-primary shadow-elegant mb-4 transition-transform hover:scale-105"
      >
        {isExpanded ? (
          <ChevronDown className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>

      {/* Chat Window */}
      {isExpanded && (
        <Card className="w-96 h-[500px] shadow-medium animate-in slide-in-from-bottom-2 duration-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 gradient-primary rounded-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-lg">AI Assistant</span>
                  <p className="text-sm font-normal text-muted-foreground">
                    แชทบอทแนะนำหลักสูตร IT
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
                className="h-8 w-8"
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 h-[calc(500px-80px)] flex flex-col">
            {/* Chat Messages */}
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                        message.isBot 
                          ? 'chat-bubble-bot' 
                          : 'chat-bubble-user'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="chat-bubble-bot p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="space-y-3">
              {/* Quick Suggestions */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">คำถามที่ถามบ่อย:</p>
                <div className="flex flex-wrap gap-2">
                  {chatbotResponses.suggestions.map((suggestion, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-accent transition-colors text-xs"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Input Section */}
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="พิมพ์คำถามของคุณ..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon" className="gradient-primary">
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Status */}
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Sparkles className="w-3 h-3" />
                <span>
                  {isAuthenticated 
                    ? `เข้าสู่ระบบแล้วในฐานะ ${user?.name}` 
                    : 'เข้าสู่ระบบเพื่อใช้ฟีเจอร์เพิ่มเติม'
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChatBot;