import { Pass } from '../constants';

export default class HumanPlayer {

    constructor() {
        this.isHuman = true;
        this._callback = null;
        this._board = null;
    }

    startTurn(board, callback) {

        if (board.legalMoves.length === 0) {

            callback(Pass);

            return;

        }

        this._callback = callback;
        this._board = board;

    }

    placeDisc(square) {

        if (this._callback && this._board.legalMoves.includes(square)) {

            let c = this._callback;
            this._callback = null;

            c(square);

        }

    }

}