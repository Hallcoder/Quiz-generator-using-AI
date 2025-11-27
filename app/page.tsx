"use client";

import { useState } from "react";
import QuizGenerator from "@/components/quiz/QuizGenerator";
import QuizTaking from "@/components/quiz/QuizTaking";
import QuizResults from "@/components/quiz/QuizResults";
import { Quiz, QuizResult } from "@/types/quiz";

type AppState = "generate" | "taking" | "results";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("generate");
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const handleQuizGenerated = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setAppState("taking");
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setAppState("results");
  };

  const handleRetry = () => {
    setQuizResult(null);
    setAppState("taking");
  };

  const handleNewQuiz = () => {
    setCurrentQuiz(null);
    setQuizResult(null);
    setAppState("generate");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">QuizGPT</h1>
                <p className="text-sm text-gray-500">AI-Powered Quiz Generation</p>
              </div>
            </div>

            {appState !== "generate" && (
              <button
                onClick={handleNewQuiz}
                className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                New Quiz
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        {appState === "generate" && (
          <QuizGenerator onQuizGenerated={handleQuizGenerated} />
        )}

        {appState === "taking" && currentQuiz && (
          <QuizTaking
            quiz={currentQuiz}
            onComplete={handleQuizComplete}
            onBack={handleNewQuiz}
          />
        )}

        {appState === "results" && quizResult && currentQuiz && (
          <QuizResults
            result={quizResult}
            quiz={currentQuiz}
            onRetry={handleRetry}
            onNewQuiz={handleNewQuiz}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>
              Powered by GPT-4 | Generate quizzes from text, URLs, PDFs, and images
            </p>
            <p className="mt-2 text-gray-500">
              Built with Next.js, FastAPI, and OpenAI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
