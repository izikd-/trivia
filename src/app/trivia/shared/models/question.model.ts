export interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
}

export enum AnswerStatus {
  none = -1,
  false,
  true,
  skipped
}
