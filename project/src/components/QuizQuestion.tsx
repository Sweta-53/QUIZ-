import React from 'react';
import type { Question } from '../types/quiz';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer?: number;
  onSelectAnswer: (answer: number) => void;
}

export function QuizQuestion({ question, selectedAnswer, onSelectAnswer }: QuizQuestionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{question.text}</h2>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            className={`w-full p-4 text-left rounded-lg transition-colors ${
              selectedAnswer === index
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}