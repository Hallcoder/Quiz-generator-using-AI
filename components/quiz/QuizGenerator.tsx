"use client";

import { useState } from "react";
import { quizApi } from "@/lib/api/quiz";
import { DifficultyLevel, QuestionType, Quiz } from "@/types/quiz";

interface QuizGeneratorProps {
  onQuizGenerated: (quiz: Quiz) => void;
}

export default function QuizGenerator({ onQuizGenerated }: QuizGeneratorProps) {
  const [contentType, setContentType] = useState<"text" | "url" | "pdf" | "image">("text");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(DifficultyLevel.MEDIUM);
  const [numQuestions, setNumQuestions] = useState(10);
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([QuestionType.MULTIPLE_CHOICE]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const toggleQuestionType = (type: QuestionType) => {
    if (questionTypes.includes(type)) {
      if (questionTypes.length > 1) {
        setQuestionTypes(questionTypes.filter((t) => t !== type));
      }
    } else {
      setQuestionTypes([...questionTypes, type]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const quiz = await quizApi.generateQuiz({
        content: contentType === "text" || contentType === "url" ? content : undefined,
        content_type: contentType,
        difficulty,
        num_questions: numQuestions,
        question_types: questionTypes,
        file: contentType === "pdf" || contentType === "image" ? file || undefined : undefined,
      });

      onQuizGenerated(quiz);
    } catch (err: any) {
      setError(err.message || "Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Generate Quiz</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Content Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Source
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(["text", "url", "pdf", "image"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setContentType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  contentType === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Content Input */}
        {(contentType === "text" || contentType === "url") && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {contentType === "text" ? "Enter Text Content" : "Enter URL"}
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                contentType === "text"
                  ? "Paste your learning content here..."
                  : "https://example.com/article"
              }
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        )}

        {/* File Upload */}
        {(contentType === "pdf" || contentType === "image") && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload {contentType === "pdf" ? "PDF" : "Image"}
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept={contentType === "pdf" ? ".pdf" : "image/*"}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
        )}

        {/* Difficulty Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.values(DifficultyLevel).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDifficulty(level)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  difficulty === level
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Number of Questions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Questions: {numQuestions}
          </label>
          <input
            type="range"
            min="5"
            max="50"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Question Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question Types (select at least one)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(QuestionType).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => toggleQuestionType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  questionTypes.includes(type)
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Generating Quiz..." : "Generate Quiz"}
        </button>
      </form>
    </div>
  );
}
