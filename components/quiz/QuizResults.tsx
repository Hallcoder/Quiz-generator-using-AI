"use client";

import { QuizResult, Quiz } from "@/types/quiz";
import QuestionCard from "./QuestionCard";

interface QuizResultsProps {
  result: QuizResult;
  quiz: Quiz;
  onRetry: () => void;
  onNewQuiz: () => void;
}

export default function QuizResults({
  result,
  quiz,
  onRetry,
  onNewQuiz,
}: QuizResultsProps) {
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return "Outstanding! 🎉";
    if (percentage >= 80) return "Great job! 👏";
    if (percentage >= 70) return "Good work! 👍";
    if (percentage >= 60) return "Not bad! 💪";
    return "Keep practicing! 📚";
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Results Header */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h1>

        {/* Score Display */}
        <div className="mb-6">
          <div className={`text-6xl font-bold mb-2 ${getScoreColor(result.percentage)}`}>
            {result.percentage}%
          </div>
          <div className="text-2xl text-gray-600 mb-2">
            {result.score} / {result.total_points} points
          </div>
          <div className="text-xl font-semibold text-gray-700">
            {getScoreMessage(result.percentage)}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">
              {result.responses.filter((r) => r.is_correct).length}
            </div>
            <div className="text-sm text-gray-600">Correct</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-600">
              {result.responses.filter((r) => !r.is_correct).length}
            </div>
            <div className="text-sm text-gray-600">Incorrect</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">
              {result.responses.length}
            </div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={onNewQuiz}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            New Quiz
          </button>
        </div>
      </div>

      {/* Detailed Review */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Review Your Answers</h2>

        <div className="space-y-4">
          {quiz.questions
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((question, index) => {
              const response = result.responses.find(
                (r) => r.question_id === question.id
              );

              return (
                <div key={question.id} className="relative">
                  {/* Correct/Incorrect Badge */}
                  <div className="absolute -left-2 top-6">
                    {response?.is_correct ? (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                        ✓
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        ✗
                      </div>
                    )}
                  </div>

                  <div className="ml-6">
                    <QuestionCard
                      question={{ ...question, correct_answer: response?.correct_answer }}
                      questionNumber={index + 1}
                      userAnswer={response?.user_answer || ""}
                      onAnswerChange={() => {}}
                      showAnswer={true}
                      isCorrect={response?.is_correct}
                    />

                    {/* Points Display */}
                    <div className="ml-11 mt-2 text-sm text-gray-600">
                      Points earned: {response?.points_earned?.toFixed(1)} / {question.points}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
