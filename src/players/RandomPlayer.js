import ComputerPlayer from './ComputerPlayer';
import { Pass } from '../constants';

export default class RandomPlayer extends ComputerPlayer {

    constructor() {

        super();

    }

    computeMove(board, callback) {

        let movable = board.legalMoves;

        if (movable.length === 0) {

            callback(Pass);

            return;

        }

        let idx = Math.floor(Math.random() * movable.length);

        callback(movable[idx]);

    }

}