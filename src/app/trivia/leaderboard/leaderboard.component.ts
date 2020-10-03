import {Component, OnInit} from '@angular/core';
import {TriviaService} from '../shared/services/trivia.service';
import {Player} from '../shared/models/leaderboard.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  players: Player[];

  constructor(private triviaService: TriviaService, private route: Router) {
  }

  ngOnInit(): void {
    this.players = this.triviaService.getLeaderBoard();
  }

  startGame(): void {
    this.route.navigate(['trivia']);
  }
}
