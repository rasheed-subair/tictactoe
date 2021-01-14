import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  squares: any[] = [];
  xIsNext: boolean | undefined;
  winner? : string | null;
  matchRounds: number = 0;
  xScore: number = 0;
  oScore: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  setMatchRounds(rounds: number) {
    this.matchRounds = rounds;
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if(!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
    if(this.winner) {
      this.calculateScore(this.winner);
      this.matchRounds--;
      setTimeout(() => {
        this.resetBoard();
      }, 1500);
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for(let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if(
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }

  calculateScore(winner: string) {
    if(winner === 'X') {
      this.xScore ++;
      console.log(this.xScore);
    }
    else
    {
      this.oScore ++;
      console.log(this.oScore);
    }
    this.endGame();
  }

  resetBoard() {
    this.squares = [];
  }

  clearGame() {
    this.squares = [];
  }

  resetGame() {
    this.squares = [];
    this.xScore = 0;
    this.oScore = 0;
    this.matchRounds = 0;
    this.winner = null;
  }

  endGame() {
    if((this.xScore != 0 || this.oScore != 0) && this.matchRounds === 0) {
      this.xScore = 0;
      this.oScore = 0;
      this.matchRounds = 0;
    }
  }
}
