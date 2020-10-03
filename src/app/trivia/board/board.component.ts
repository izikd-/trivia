import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AnswerStatus, Question} from '../shared/models/question.model';
import {getQuestions, gotAnswer} from '../../store/actions/game.actions';
import {interval, Observable, Subject} from 'rxjs';
import {selectLives, selectPoints, selectProgress, selectQuestions} from '../../store/selectors/game.selector';
import {delay, map, skip, startWith, switchMap, takeUntil} from 'rxjs/operators';
import {TriviaService} from '../shared/services/trivia.service';
import {Player} from '../shared/models/leaderboard.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  currentQuestion: Question;
  currentQuestionIndex = 1;
  answerStatus: AnswerStatus;
  questions: Question[];
  gameOver = false;
  destroy$ = new Subject();
  points$: Observable<number>;
  lives$: Observable<number>;
  progress$: Observable<number>;
  gameOver$ = new Subject();
  timer$: Observable<any>;
  timerSub;
  private readonly TIMER = 20;
  private readonly resetCounter$ = new Subject<void>();

  constructor(private store: Store, private triviaService: TriviaService, private route: Router) {

  }

  ngOnInit(): void {
    this.getQuestions();
    this.points$ = this.store.select(selectPoints);
    this.lives$ = this.store.select(selectLives);
    this.lives$.pipe(
      takeUntil(this.gameOver$),
      takeUntil(this.destroy$)
    ).subscribe(lives => {
      if (lives <= 0) {
        this.endGame();
        return;
      }
    });
    this.progress$ = this.store.select(selectProgress);
    this.progress$.pipe(
      takeUntil(this.gameOver$),
      takeUntil(this.destroy$),
      delay(1000),
      skip(1)
    ).subscribe(progress => {
      if (progress >= this.questions?.length) {
        this.endGame();
        return;
      } else {
        this.nextQuestion();
      }
    });
    this.timer$ = this.resetCounter$.pipe(
      startWith(this.TIMER),
      switchMap(() => interval(1000)),
      map(sec => this.TIMER - sec),
      takeUntil(this.gameOver$),
      takeUntil(this.destroy$),
    );

    this.timerSub = this.timer$.pipe(
      takeUntil(this.gameOver$),
      takeUntil(this.destroy$),
    ).subscribe(sec => {
      if (sec === 0) {
        this.store.dispatch(gotAnswer({answer: AnswerStatus.skipped}));
      }
    });
  }

  selectAnswer(answer: any): void {
    const tempAnswerStatus = answer === this.currentQuestion.correct_answer ? AnswerStatus.true : AnswerStatus.false;
    this.store.dispatch(gotAnswer({answer: tempAnswerStatus}));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  save(player: Player): void {
    this.triviaService.saveLeaderBoard(player);
    this.route.navigate(['/']);
  }

  private resetCounter(): void {
    this.resetCounter$.next();
  }

  private getQuestions(): void {
    this.store.dispatch(getQuestions());
    this.store.select(selectQuestions).pipe(
      takeUntil(this.destroy$),
    ).subscribe((questions: Question[]) => {
      this.questions = questions;
      this.currentQuestion = this.questions[0];
    });
  }

  private nextQuestion(): void {
    if (this.gameOver) {
      return;
    }
    this.currentQuestionIndex++;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.resetCounter();
  }

  private endGame(): void {
    this.gameOver$.next();
    this.gameOver$.complete();
    this.gameOver = true;
    this.resetCounter$.complete();
  }
}
