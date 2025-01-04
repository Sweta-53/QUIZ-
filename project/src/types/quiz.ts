export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<string, number>;
  timeRemaining: number;
  isFinished: boolean;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  score: number;
}