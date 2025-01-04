import React, { useState, useEffect, useCallback } from 'react';
import { Timer } from './components/Timer';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizResult } from './components/QuizResult';
import { sampleQuestions } from './data/sampleQuestions';
import type { QuizState, QuizResult as QuizResultType } from './types/quiz';
import { Brain } from 'lucide-react';

const QUIZ_TIME = 180; // 3 minutes

function App() {
  const [questions] = useState(() => 
    [...sampleQuestions].sort(() => Math.random() - 0.5)
  );
  
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
    timeRemaining: QUIZ_TIME,
    isFinished: false
  });

  const [result, setResult] = useState<QuizResultType | null>(null);

  useEffect(() => {
    if (!quizState.isFinished) {
      const timer = setInterval(() => {
        setQuizState(prev => ({
          ...prev,
          timeRemaining: Math.max(0, prev.timeRemaining - 1)
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizState.isFinished]);

  const handleTimeUp = useCallback(() => {
    finishQuiz();
  }, []);

  const handleAnswerSelect = (answer: number) => {
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questions[prev.currentQuestionIndex].id]: answer
      }
    }));

    // Move to next question after a brief delay
    setTimeout(() => {
      if (quizState.currentQuestionIndex < questions.length - 1) {
        setQuizState(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1
        }));
      } else {
        finishQuiz();
      }
    }, 500);
  };

  const finishQuiz = () => {
    const correctAnswers = questions.filter(
      (q) => quizState.answers[q.id] === q.correctAnswer
    ).length;

    setResult({
      totalQuestions: questions.length,
      correctAnswers,
      timeSpent: QUIZ_TIME - quizState.timeRemaining,
      score: Math.round((correctAnswers / questions.length) * 100)
    });

    setQuizState(prev => ({
      ...prev,
      isFinished: true
    }));
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      answers: {},
      timeRemaining: QUIZ_TIME,
      isFinished: false
    });
    setResult(null);
  };

  const currentQuestion = questions[quizState.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-8 h-8" />
                <h1 className="text-2xl font-bold">Interactive Quiz</h1>
              </div>
              {!quizState.isFinished && (
                <Timer
                  timeRemaining={quizState.timeRemaining}
                  onTimeUp={handleTimeUp}
                />
              )}
            </div>
          </div>

          <div className="p-6">
            {!quizState.isFinished ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Question {quizState.currentQuestionIndex + 1} of {questions.length}</span>
                  <span>{Math.round((quizState.currentQuestionIndex / questions.length) * 100)}% Complete</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(quizState.currentQuestionIndex / questions.length) * 100}%`
                    }}
                  />
                </div>

                <QuizQuestion
                  question={currentQuestion}
                  selectedAnswer={quizState.answers[currentQuestion.id]}
                  onSelectAnswer={handleAnswerSelect}
                />
              </div>
            ) : result && (
              <QuizResult result={result} onRetry={resetQuiz} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;