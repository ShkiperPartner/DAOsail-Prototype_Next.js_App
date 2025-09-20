'use client';

import React, { useState } from 'react';
import { ChatBox } from '@/components/ui/chat-box';
import { QuickQuestions } from '@/components/ui/quick-questions';
import { SoftGateBanner } from '@/components/ui/soft-gate-banner';

export default function ChatPage() {
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

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
          />
        </div>
      </div>
    </div>
  );
}
