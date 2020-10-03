import {createAction, props} from '@ngrx/store';
import {AnswerStatus, Question} from '../../trivia/shared/models/question.model';

export const getQuestions = createAction(
  '[Trivia] Get Questions'
);
export const successGetQuestions = createAction(
  '[Trivia] Success Get Questions',
  props<{ questions: Question[] }>()
);
export const failedGetQuestions = createAction(
  '[Trivia] Failed Get Questions'
);

export const gotAnswer = createAction(
  '[Trivia] Got Answer',
  props<{ answer: AnswerStatus }>()
);
export const correctAnswer = createAction(
  '[Trivia] Correct Answer'
);
export const wrongAnswer = createAction(
  '[Trivia] Wrong Answer'
);
export const skippedAnswer = createAction(
  '[Trivia] Skipped Answer'
);
