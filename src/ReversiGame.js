import Board from './Board';
import { Black, White, Squares, Pass } from './constants';

import HumanPlayer from './players/HumanPlayer';

import { EventDispatcher } from './EventDispatcher'

export default class Game extends EventDispatcher {

    constructor() {
        super();
        this.board = new Board();
        this.players = [];
        this.players[Black] = new HumanPlayer();
        this.players[White] = new HumanPlayer();

        //for debug checking pass
        // this.initialDiscs[Black] = [Squares.a1];
        // this.initialDiscs[White] = [Squares.a2, Squares.a4, Squares.b1];

        this.isRunning = false;
    }

    _doMoveAndChangeTurn(square) {

        let move = this.board.pushMove(square);

        this.dispatchEvent({ type: 'finishTurn', color: move.color, player: this.players[move.color], move: move });

        if (this.board.checkGameOver() === true) {

            this.isRunning = false;
            this.dispatchEvent({ type: 'finishGame' });
            return;

        }

        this.players[this.board.turn].startTurn(this.board, this._doMoveAndChangeTurn.bind(this));
        this.dispatchEvent({ type: 'startTurn', color: this.board.turn, player: this.players[this.board.turn] });


    }

    startGame(blackPlayer = this.players[Black], whitePlayer = this.players[White], board) {

        this.players[Black] = blackPlayer;
        this.players[White] = whitePlayer;

        if (board === undefined) {
            this.board.initialize();
        }else{
            this.board = board;
        }

        this.isRunning = true;

        this.players[this.board.turn].startTurn(this.board, this._doMoveAndChangeTurn.bind(this));
        this.dispatchEvent({ type: 'startTurn', player: this.players[this.board.turn] });

    }

    undo() {
        //undo previous move and if last move is computer, undo until human move.
        //[●,○]

        if (!this.players[this.board.turn].isHuman) {
            return
        }

        let move = this.board.popMove();

        while (!this.players[move.color].isHuman || move.place === Pass) {

            if (move === undefined) {
                return;
            }

            this.dispatchEvent({ type: 'undo', move: move });

            move = this.board.popMove();
        }

        this.dispatchEvent({ type: 'undo', move: move });

        this.players[this.board.turn].startTurn(this.board);

    }

}