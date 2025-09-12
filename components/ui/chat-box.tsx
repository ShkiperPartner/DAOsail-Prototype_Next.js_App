'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Loader2, 
  Bot, 
  User,
  AlertCircle 
} from 'lucide-react';
import { useAppContext } from '@/lib/contexts/app-context';
import { mockChatMessages, ChatMessage } from '@/data/chat-messages';

interface ChatBoxProps {
  newQuestion?: string;
  onQuestionProcessed?: () => void;
}

export function ChatBox({ newQuestion, onQuestionProcessed }: ChatBoxProps) {
  const { language, decrementResponses, responsesLeft } = useAppContext();
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Handle new question from quick questions
  useEffect(() => {
    if (newQuestion) {
      handleSend(newQuestion);
      onQuestionProcessed?.();
    }
  }, [newQuestion]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (message?: string) => {
    const messageToSend = message || input.trim();
    if (!messageToSend || isTyping) return;

    // Check if user has responses left
    if (responsesLeft <= 0) {
      setError(language === 'ru' 
        ? 'Достигнут лимит ответов. Зарегистрируйтесь для продолжения.' 
        : 'Response limit reached. Please register to continue.'
      );
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: messageToSend,
      contentRu: messageToSend, // In real app, this would be translated
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setError(null);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Thank you for your question! This is a mock response. In the real application, this would be replaced with actual AI-generated content based on your input.',
        contentRu: 'Спасибо за ваш вопрос! Это тестовый ответ. В реальном приложении он будет заменён на ответ, генерируемый ИИ на основе вашего запроса.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      decrementResponses();
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat(language, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          {language === 'ru' ? 'Чат с ИИ' : 'AI Chat'}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages area */}
        <ScrollArea 
          className="flex-1 px-4" 
          ref={scrollAreaRef}
        >
          <div className="space-y-4 pb-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>
                  {language === 'ru' 
                    ? 'Начните разговор, задав вопрос ниже' 
                    : 'Start a conversation by asking a question below'
                  }
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 chat-message ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type === 'assistant' && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[80%] ${
                    message.type === 'user' ? 'order-1' : ''
                  }`}>
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">
                        {language === 'ru' ? message.contentRu : message.content}
                      </p>
                    </div>
                    <div className={`text-xs text-muted-foreground mt-1 ${
                      message.type === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                  
                  {message.type === 'user' && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-accent text-accent-foreground">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))
            )}
            
            {isTyping && (
              <div className="flex gap-3 justify-start chat-message">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">
                      {language === 'ru' ? 'Печатает...' : 'Typing...'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Error message */}
        {error && (
          <div className="px-4 py-2 bg-destructive/10 border-t border-destructive/20">
            <div className="flex items-center gap-2 text-destructive text-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder={
                language === 'ru'
                  ? 'Задайте ваш вопрос...'
                  : 'Ask your question...'
              }
              disabled={isTyping || responsesLeft <= 0}
              className="flex-1"
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping || responsesLeft <= 0}
              size="sm"
              aria-label={language === 'ru' ? 'Отправить сообщение' : 'Send message'}
            >
              {isTyping ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {/* Hints */}
          <div className="mt-2 text-xs text-muted-foreground">
            {language === 'ru' ? (
              <>Enter для отправки • Shift+Enter для новой строки</>
            ) : (
              <>Enter to send • Shift+Enter for new line</>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}