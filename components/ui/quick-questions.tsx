'use client';

import React from 'react';
import { quickQuestions } from '@/data/quick-questions';
import { useAppContext } from '@/lib/contexts/app-context';

interface QuickQuestionsProps {
  onQuestionClick: (question: string) => void;
}

export function QuickQuestions({ onQuestionClick }: QuickQuestionsProps) {
  const { language } = useAppContext();

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">
        {language === 'ru' ? 'Быстрые вопросы' : 'Quick Questions'}
      </h3>
      <div className="flex flex-wrap gap-2">
        {quickQuestions.map((question) => (
          <button
            key={question.id}
            onClick={() => onQuestionClick(
              language === 'ru' ? question.textRu : question.text
            )}
            className="quick-chip"
          >
            {language === 'ru' ? question.textRu : question.text}
          </button>
        ))}
      </div>
    </div>
  );
}