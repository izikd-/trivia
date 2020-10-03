import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from '../../shared/models/leaderboard.model';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {

  @Input() score;
  @Output() save = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  saveScore(name: string): void {
    const player: Player = {
      name,
      score: this.score
    };
    this.save.emit(player);
  }
}
