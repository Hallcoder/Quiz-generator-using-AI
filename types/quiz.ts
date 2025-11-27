export enum DifficultyLevel {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export enum QuestionType {
  MULTIPLE_CHOICE = "multiple_choice",
  TRUE_FALSE = "true_false",
  SHORT_ANSWER = "short_answer",
  FILL_IN_BLANK = "fill_in_blank",
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  question_type: QuestionType;
  question_text: string;
  options?: QuestionOption[];
  correct_answer?: string;
  explanation?: string;
  points: number;
  order?: number;
}

export interface Quiz {
  id: number;
  title: string;
  description?: string;
  difficulty: DifficultyLevel;
  source_type: string;
  created_at: string;
  questions: Question[];
}

export interface QuizGenerationRequest {
  content?: string;
  content_type: "text" | "url" | "pdf" | "image";
  difficulty: DifficultyLevel;
  num_questions: number;
  question_types: QuestionType[];
  file?: File;
}

export interface AnswerSubmission {
  question_id: number;
  user_answer: string;
}

export interface QuizSubmission {
  quiz_id: number;
  user_id?: string;
  answers: AnswerSubmission[];
}

export interface ResponseFeedback {
  question_id: number;
  user_answer: string;
  is_correct: boolean;
  correct_answer: string;
  explanation?: string;
  points_earned: number;
}

export interface QuizResult {
  attempt_id: number;
  quiz_id: number;
  score: number;
  total_points: number;
  percentage: number;
  responses: ResponseFeedback[];
  completed_at: string;
}
