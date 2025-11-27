import { apiClient } from "./client";
import {
  Quiz,
  QuizGenerationRequest,
  QuizSubmission,
  QuizResult,
} from "@/types/quiz";

export const quizApi = {
  async generateQuiz(request: QuizGenerationRequest): Promise<Quiz> {
    const formData = new FormData();

    if (request.file) {
      formData.append("file", request.file);
    }

    if (request.content) {
      formData.append("content", request.content);
    }

    formData.append("content_type", request.content_type);
    formData.append("difficulty", request.difficulty);
    formData.append("num_questions", request.num_questions.toString());
    formData.append("question_types", request.question_types.join(","));

    return apiClient.postFormData<Quiz>("/api/quiz/generate", formData);
  },

  async getQuiz(quizId: number): Promise<Quiz> {
    return apiClient.get<Quiz>(`/api/quiz/${quizId}`);
  },

  async getQuizWithAnswers(quizId: number): Promise<Quiz> {
    return apiClient.get<Quiz>(`/api/quiz/${quizId}/full`);
  },

  async submitQuiz(submission: QuizSubmission): Promise<QuizResult> {
    return apiClient.post<QuizResult>("/api/quiz/submit", submission);
  },

  async listQuizzes(skip: number = 0, limit: number = 10): Promise<Quiz[]> {
    return apiClient.get<Quiz[]>(`/api/quiz/list?skip=${skip}&limit=${limit}`);
  },

  async deleteQuiz(quizId: number): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/api/quiz/${quizId}`);
  },
};
