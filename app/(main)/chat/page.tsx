'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChatBox } from '@/components/ui/chat-box';
import { QuickQuestions } from '@/components/ui/quick-questions';
import { SoftGateBanner } from '@/components/ui/soft-gate-banner';

export default function ChatPage() {
  const searchParams = useSearchParams();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [assistantType, setAssistantType] = useState<'navigator' | 'skipper'>('navigator');

  // Read assistant parameter from URL
  useEffect(() => {
    const assistant = searchParams.get('assistant');
    if (assistant === 'navigator' || assistant === 'skipper') {
      setAssistantType(assistant);
    }
  }, [searchParams]);

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
  };

  const handleQuestionProcessed = () => {
    setSelectedQuestion('');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <SoftGateBanner />

        <div className="space-y-6">
          <QuickQuestions onQuestionClick={handleQuestionClick} />
          <ChatBox
            newQuestion={selectedQuestion}
            onQuestionProcessed={handleQuestionProcessed}
            assistantType={assistantType}
          />
        </div>
      </div>
    </div>
  );
}
