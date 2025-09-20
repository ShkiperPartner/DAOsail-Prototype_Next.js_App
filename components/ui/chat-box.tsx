'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EmailCapture } from '@/components/ui/email-capture';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Send,
  Loader2,
  Bot,
  User,
  AlertCircle,
  Anchor,
  Navigation,
  ArrowLeft,
  Search,
  X
} from 'lucide-react';
import { useAppContext } from '@/lib/contexts/app-context';
import { chatService, ChatMessage } from '@/lib/services/chat-service';
import { useRouter } from 'next/navigation';

interface ChatBoxProps {
  newQuestion?: string;
  onQuestionProcessed?: () => void;
  assistantType?: 'navigator' | 'skipper';
}

export function ChatBox({
  newQuestion,
  onQuestionProcessed,
  assistantType = 'navigator'
}: ChatBoxProps) {
  const router = useRouter();
  const {
    language,
    decrementResponses,
    responsesLeft,
    isAuthenticated,
    incrementStat,
    userProfile,
    guestStage,
    totalQuestionsAsked,
    captureEmail,
    getBackUrl,
    searchChats,
    chatSearchResults,
    isSearching,
    clearChatSearch
  } = useAppContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Initialize session
  useEffect(() => {
    const initSession = async () => {
      try {
        const userRole = userProfile?.role || 'Интересующийся';
        const id = await chatService.createChatSession(
          language === 'ru' ? 'Новый чат' : 'New Chat',
          assistantType,
          userRole
        );
        setSessionId(id);
      } catch (error) {
        console.error('Failed to create chat session:', error);
      }
    };

    if (isAuthenticated) {
      initSession();
    }
  }, [assistantType, isAuthenticated, language]);

  const handleSend = useCallback(async (message?: string) => {
    const messageToSend = message || input.trim();
    if (!messageToSend || isTyping) return;

    // Validate message
    const validation = chatService.validateMessage(messageToSend);
    if (!validation.isValid) {
      setError(validation.error!);
      return;
    }

    // Check if user has responses left (for non-authenticated users)
    if (!isAuthenticated && responsesLeft <= 0) {
      setError(language === 'ru'
        ? 'Достигнут лимит ответов. Зарегистрируйтесь для продолжения.'
        : 'Response limit reached. Please register to continue.'
      );
      return;
    }

    const userMessage: ChatMessage = {
      role: 'user',
      content: messageToSend,
      timestamp: new Date().toISOString()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setError(null);
    setIsTyping(true);

    try {
      // Send to OpenAI API with user role
      const userRole = userProfile?.role || 'Интересующийся';
      const userId = userProfile?.id;
      const response = await chatService.sendMessage(newMessages, assistantType, userRole, userId);

      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: response.message.content,
        timestamp: response.message.timestamp,
        assistantType: response.message.assistantType,
        model: response.message.model
      };

      setMessages(prev => [...prev, aiMessage]);

      // Update user statistics if authenticated
      if (isAuthenticated) {
        await incrementStat('questionsAsked');

        // Generate title for first message
        if (newMessages.length === 1) {
          const title = chatService.generateChatTitle(messageToSend, language);
          // TODO: Update session title in Supabase
        }
      } else {
        // Decrement responses for guests
        decrementResponses();
      }

    } catch (error) {
      console.error('Chat error:', error);
      setError(
        error instanceof Error
          ? error.message
          : language === 'ru'
            ? 'Произошла ошибка при отправке сообщения'
            : 'An error occurred while sending the message'
      );
    } finally {
      setIsTyping(false);
    }
  }, [
    input,
    isTyping,
    messages,
    assistantType,
    isAuthenticated,
    responsesLeft,
    language,
    decrementResponses,
    incrementStat
  ]);

  // Handle new question from quick questions
  useEffect(() => {
    if (newQuestion) {
      handleSend(newQuestion);
      onQuestionProcessed?.();
    }
  }, [newQuestion, handleSend, onQuestionProcessed]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat(language, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Get assistant icon and title
  const getAssistantInfo = () => {
    if (assistantType === 'skipper') {
      return {
        icon: <Anchor className="h-4 w-4" />,
        title: language === 'ru' ? 'Шкипер' : 'Skipper',
        bgColor: 'bg-orange-500'
      };
    }
    return {
      icon: <Navigation className="h-4 w-4" />,
      title: language === 'ru' ? 'Навигатор' : 'Navigator',
      bgColor: 'bg-blue-500'
    };
  };

  const assistantInfo = getAssistantInfo();

  // Navigation functions
  const handleBackClick = () => {
    const backUrl = getBackUrl();
    if (backUrl) {
      router.push(backUrl);
    } else {
      // Fallback to main page
      router.push('/');
    }
  };

  // Search functions
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchChats(searchQuery);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      clearChatSearch();
      setSearchQuery('');
    }
  };

  const handleSearchResultClick = (result: any) => {
    // Navigate to the specific chat session
    // For now, just show a snippet in the current chat
    setInput(`Ранее вы спрашивали: "${result.messageContent}"`);
    setShowSearch(false);
    clearChatSearch();
    setSearchQuery('');
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Back button */}
            {getBackUrl() && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackClick}
                className="mr-2 p-2"
                title={language === 'ru' ? 'Вернуться назад' : 'Go back'}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}

            <div className={`p-2 rounded-full ${assistantInfo.bgColor} text-white`}>
              {assistantInfo.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-lg">{assistantInfo.title}</span>
              <span className="text-sm font-normal text-muted-foreground">
                {language === 'ru' ? 'ИИ-консультант' : 'AI Assistant'}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSearch}
                className="p-2"
                title={language === 'ru' ? 'Поиск по чатам' : 'Search chats'}
              >
                {showSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </CardTitle>

        {/* Search interface */}
        {showSearch && isAuthenticated && (
          <div className="mt-3 space-y-3">
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ru' ? 'Поиск по истории чатов...' : 'Search chat history...'}
                className="flex-1"
              />
              <Button type="submit" disabled={isSearching} size="sm">
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </form>

            {/* Search results */}
            {chatSearchResults.length > 0 && (
              <div className="max-h-32 overflow-y-auto space-y-1">
                {chatSearchResults.slice(0, 5).map((result, index) => (
                  <div
                    key={index}
                    onClick={() => handleSearchResultClick(result)}
                    className="p-2 text-sm bg-muted/50 rounded cursor-pointer hover:bg-muted transition-colors"
                  >
                    <div className="font-medium text-xs text-muted-foreground mb-1">
                      {result.chatTitle}
                    </div>
                    <div className="line-clamp-2">
                      {result.messageContent}
                    </div>
                  </div>
                ))}
                {chatSearchResults.length > 5 && (
                  <div className="text-xs text-muted-foreground text-center py-1">
                    +{chatSearchResults.length - 5} {language === 'ru' ? 'еще результатов' : 'more results'}
                  </div>
                )}
              </div>
            )}

            {searchQuery && chatSearchResults.length === 0 && !isSearching && (
              <div className="text-sm text-muted-foreground text-center py-2">
                {language === 'ru' ? 'Ничего не найдено' : 'No results found'}
              </div>
            )}
          </div>
        )}
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
              messages.map((message, index) => (
                <div
                  key={`${message.timestamp}-${index}`}
                  className={`flex gap-3 chat-message ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className={`${assistantInfo.bgColor} text-white`}>
                        {assistantInfo.icon}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className={`max-w-[80%] ${
                    message.role === 'user' ? 'order-1' : ''
                  }`}>
                    <div className={`p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                      {message.model && message.role === 'assistant' && (
                        <div className="text-xs opacity-60 mt-2">
                          {message.model}
                        </div>
                      )}
                    </div>
                    <div className={`text-xs text-muted-foreground mt-1 ${
                      message.role === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>

                  {message.role === 'user' && (
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
                  <AvatarFallback className={`${assistantInfo.bgColor} text-white`}>
                    {assistantInfo.icon}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">
                      {language === 'ru'
                        ? `${assistantInfo.title} думает...`
                        : `${assistantInfo.title} is thinking...`}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Guest Flow: Email Capture or Registration */}
        {!isAuthenticated && totalQuestionsAsked === 3 && guestStage === 'initial' && (
          <div className="px-4 py-3 border-t">
            <EmailCapture
              onSkip={() => {
                // Пользователь выбрал "Позже" - продолжаем к этапу 2
              }}
            />
          </div>
        )}

        {!isAuthenticated && guestStage === 'registration_required' && (
          <div className="px-4 py-3 border-t">
            <div className="text-center p-6 border rounded-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30">
              <AlertCircle className="w-8 h-8 mx-auto mb-4 text-orange-600" />
              <h3 className="text-lg font-semibold mb-2">
                {language === 'ru' ? 'Требуется регистрация' : 'Registration Required'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {language === 'ru'
                  ? 'Если вас действительно интересует проект, зарегистрируйтесь, ибо для избежания спама я больше не смогу отвечать на ваши вопросы.'
                  : 'If you\'re really interested in the project, please register, as I can no longer answer your questions to avoid spam.'
                }
              </p>
              <Button className="w-full">
                {language === 'ru' ? 'Зарегистрироваться' : 'Register'}
              </Button>
            </div>
          </div>
        )}

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