"use client";

import { useState } from "react";
import { Quiz, QuizResult } from "@/types/quiz";
import { quizApi } from "@/lib/api/quiz";
import QuestionCard from "./QuestionCard";

interface QuizTakingProps {
  quiz: Quiz;
  onComplete: (result: QuizResult) => void;
  onBack: () => void;
}

export default function QuizTaking({ quiz, onComplete, onBack }: QuizTakingProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    const unanswered = quiz.questions.filter((q) => !answers[q.id]);
    if (unanswered.length > 0) {
      setError(`Please answer all questions. ${unanswered.length} question(s) remaining.`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const submission = {
        quiz_id: quiz.id,
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          question_id: parseInt(questionId),
          user_answer: answer,
        })),
      };

      const result = await quizApi.submitQuiz(submission);
      onComplete(result);
    } catch (err: any) {
      setError(err.message || "Failed to submit quiz");
    } finally {
      setLoading(false);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = quiz.questions.length;
  const progress = (answeredCount / totalQuestions) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{quiz.title}</h1>
            {quiz.description && (
              <p className="text-gray-600 mt-2">{quiz.description}</p>
            )}
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>
              {answeredCount} / {totalQuestions} questions answered
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Quiz Info */}
        <div className="flex gap-4 text-sm text-gray-600 mt-4">
          <span className="px-3 py-1 bg-gray-100 rounded-full">
            Difficulty: {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full">
            {totalQuestions} Questions
          </span>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {quiz.questions
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              questionNumber={index + 1}
              userAnswer={answers[question.id] || ""}
              onAnswerChange={(answer) => handleAnswerChange(question.id, answer)}
            />
          ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <button
          onClick={handleSubmit}
          disabled={loading || answeredCount === 0}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit Quiz"}
        </button>
      </div>
    </div>
  );
}
