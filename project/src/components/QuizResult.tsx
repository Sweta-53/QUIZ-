import React from 'react';
import { Trophy, Clock, CheckCircle } from 'lucide-react';
import type { QuizResult } from '../types/quiz';

interface QuizResultProps {
  result: QuizResult;
  onRetry: () => void;
}

export function QuizResult({ result, onRetry }: QuizResultProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      <div className="text-center">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quiz Complete!</h2>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-600">Score</span>
          </div>
          <span className="font-semibold">{result.score}%</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="text-gray-600">Time Spent</span>
          </div>
          <span className="font-semibold">{result.timeSpent} seconds</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="text-gray-600">Correct Answers</span>
          <span className="font-semibold">{result.correctAnswers}/{result.totalQuestions}</span>
        </div>
      </div>

      <button
        onClick={onRetry}
        className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}