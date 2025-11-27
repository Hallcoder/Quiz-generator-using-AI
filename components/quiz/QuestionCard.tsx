"use client";

import { Question, QuestionType } from "@/types/quiz";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
  showAnswer?: boolean;
  isCorrect?: boolean;
}

export default function QuestionCard({
  question,
  questionNumber,
  userAnswer,
  onAnswerChange,
  showAnswer = false,
  isCorrect,
}: QuestionCardProps) {
  const renderQuestionInput = () => {
    switch (question.question_type) {
      case QuestionType.MULTIPLE_CHOICE:
        return (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <label
                key={option.id}
                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  userAnswer === option.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                } ${
                  showAnswer && option.id === question.correct_answer
                    ? "border-green-500 bg-green-50"
                    : ""
                } ${
                  showAnswer &&
                  userAnswer === option.id &&
                  option.id !== question.correct_answer
                    ? "border-red-500 bg-red-50"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.id}
                  checked={userAnswer === option.id}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  disabled={showAnswer}
                  className="mr-3"
                />
                <span className="text-gray-700">{option.text}</span>
              </label>
            ))}
          </div>
        );

      case QuestionType.TRUE_FALSE:
        return (
          <div className="space-y-2">
            {["True", "False"].map((option) => (
              <label
                key={option}
                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  userAnswer === option
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                } ${
                  showAnswer && option === question.correct_answer
                    ? "border-green-500 bg-green-50"
                    : ""
                } ${
                  showAnswer &&
                  userAnswer === option &&
                  option !== question.correct_answer
                    ? "border-red-500 bg-red-50"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={userAnswer === option}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  disabled={showAnswer}
                  className="mr-3"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case QuestionType.SHORT_ANSWER:
      case QuestionType.FILL_IN_BLANK:
        return (
          <textarea
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            disabled={showAnswer}
            placeholder="Type your answer here..."
            rows={3}
            className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              showAnswer
                ? isCorrect
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
                : "border-gray-300"
            }`}
          />
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-start mb-4">
        <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
          {questionNumber}
        </span>
        <div className="flex-grow">
          <p className="text-lg text-gray-800 font-medium">
            {question.question_text}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {question.points} point{question.points !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="ml-11">{renderQuestionInput()}</div>

      {showAnswer && question.explanation && (
        <div className="ml-11 mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-sm font-semibold text-blue-900 mb-1">Explanation:</p>
          <p className="text-sm text-blue-800">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
