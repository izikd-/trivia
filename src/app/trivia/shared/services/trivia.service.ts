import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Question} from '../models/question.model';
import {HttpClient} from '@angular/common/http';
import {map, pluck} from 'rxjs/operators';
import {Player} from '../models/leaderboard.model';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  questions$: Observable<Question[]>;

  constructor(private http: HttpClient) {
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<any>(`https://opentdb.com/api.php?amount=10&type=multiple`)
      .pipe(
        pluck('results'),
        map((questions: Question[]) => {
          return questions.map((q: Question) => {
            // Combine all answers to a new array then shuffle them
            return {...q, answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)};
          });
        })
      );
  }

  saveLeaderBoard(player: Player): void {
    const leaderboard = this.getLeaderBoard();
    leaderboard.push(player);
    leaderboard.sort((player1, player2) => +player2.score - +player1.score);
    leaderboard.slice(0, 10);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  }

  getLeaderBoard(): Player[] {
    return localStorage.getItem('leaderboard') ? JSON.parse(localStorage.getItem('leaderboard')) : [];
  }
}
