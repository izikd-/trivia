import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as GameActions from '../actions/game.actions';
import {AnswerStatus, Question} from '../../trivia/shared/models/question.model';
import {TriviaService} from '../../trivia/shared/services/trivia.service';
import {of} from 'rxjs';


@Injectable()
export class GameEffects {
  gotAnswer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GameActions.gotAnswer),
        map(({answer}) => {
          if (answer === AnswerStatus.true) {
            return GameActions.correctAnswer();
          } else if (answer === AnswerStatus.false) {
            return GameActions.wrongAnswer();
          }
          return GameActions.skippedAnswer();
        }),
      )
  );

  getQuestions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.getQuestions),
      switchMap(() => this.triviaService.getQuestions().pipe(
        map((questions: Question[]) => {
          return GameActions.successGetQuestions({questions});
        }),
        catchError(errorMessage => {
          console.log(errorMessage);
          return of(GameActions.failedGetQuestions());
        })
      )),
    );
  });

  constructor(
    private actions$: Actions,
    private router: Router,
    private triviaService: TriviaService
  ) {
  }

}

