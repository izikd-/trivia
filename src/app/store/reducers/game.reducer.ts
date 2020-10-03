import {Action, createReducer, on} from '@ngrx/store';
import * as GameActions from '../actions/game.actions';
import {Question} from '../../trivia/shared/models/question.model';


export interface GameState {
  username: string | null;
  points: number;
  lives: number;
  progress: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  questions: Question[];
}

export const initialState: GameState = {
  username: null,
  points: 0,
  lives: 3,
  progress: 0,
  totalQuestions: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  questions: []
};

const gameReducerInternal = createReducer(
  initialState,
  on(GameActions.successGetQuestions, (state, {questions}) => {
    return {...state, questions};
  }),
  on(GameActions.gotAnswer, state => {
    return {
      ...state,
      progress: state.progress + 1
    };
  }),
  on(GameActions.correctAnswer, state => {
    return {...state, correctAnswers: state.correctAnswers + 1, points: state.points + 10};
  }),
  on(GameActions.wrongAnswer, state => {
    return {...state, lives: state.lives - 1};
  }),
);

export function GameReducer(state: GameState | undefined, action: Action): GameState {
  return gameReducerInternal(state, action);
}

