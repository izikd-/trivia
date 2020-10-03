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
  errMsg = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  private isValidName(name: string): boolean{
    return new RegExp(/^[a-z0-9]+$/i).test(name);
  }

  saveScore(name: string): void {
    if (!this.isValidName(name)){
      this.errMsg = 'Use alpha-numeric characters only';
      return;
    }
    this.errMsg = '';
    const player: Player = {
      name,
      score: this.score
    };
    this.save.emit(player);
  }
}
