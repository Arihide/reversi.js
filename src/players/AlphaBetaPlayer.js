/*
https://qiita.com/na-o-ys/items/10d894635c2a6c07ac70
*/

import ComputerPlayer from './ComputerPlayer';
import { Pass } from '../constants';

export default class AlphaBetaPlayer extends ComputerPlayer {

    constructor() {
        super();
        this.color;
    }

    computeMove(board, callback) {

        this.color = board.turn;

        let bestMove = Pass;
        let bestScore = -Infinity;
        let score;

        for (let m of board.legalMoves) {

            board.pushMove(m);

            score = -this._alphaBetaEval(board, 3, -Infinity, Infinity);

            if (bestScore < score) {
                bestScore = score;
                bestMove = m;
            }

            board.popMove(m);
        }

        callback(bestMove);

    }

    _alphaBetaEval(board, depth, a, b) {

        if (depth <= 0) {
            return this._evalute(board, board.turn);
        }

        if (board.legalMoves.length === 0) {
            board.pushMove(Pass);
            a = -this._alphaBetaEval(board, depth - 1, -b, -a);
            board.popMove();
            return a;
        }

        for (let m of board.legalMoves) {

            board.pushMove(m);
            a = Math.max(a, -this._alphaBetaEval(board, depth - 1, -b, -a));
            board.popMove();
            if (a >= b) return a
        }

        return a;

    }

    _evalute(board, color) {

        const LineScores = [
            0, 100, -50, 100, 10, 100, -50, 100
        ]

        let lineScore = 0;

        let tb = board.bitboard[color].clone();

        let first8Bit = tb.p[0] >>> 24;
        let last8Bit = tb.p[1] & 0b11111111;

        lineScore += calcLineScore(first8Bit);
        lineScore += calcLineScore(last8Bit);

        tb.rotate90();

        first8Bit = tb.p[0] >>> 24;
        last8Bit = tb.p[1] & 0b11111111;

        lineScore += calcLineScore(first8Bit);
        lineScore += calcLineScore(last8Bit);

        tb.copy(board.bitboard[color ^ 1]);

        first8Bit = tb.p[0] >>> 24;
        last8Bit = tb.p[1] & 0b11111111;

        lineScore -= calcLineScore(first8Bit);
        lineScore -= calcLineScore(last8Bit);

        tb.rotate90();

        first8Bit = tb.p[0] >>> 24;
        last8Bit = tb.p[1] & 0b11111111;

        lineScore -= calcLineScore(first8Bit);
        lineScore -= calcLineScore(last8Bit);

        tb.copy(board.bitboard[color]);
        tb.p[0] &= 0x80402010;
        tb.p[1] &= 0x08040201;
        first8Bit = ((tb.p[0] | tb.p[1]) * 0x01010101) >>> 24;
        lineScore += calcLineScore(first8Bit);

        tb.copy(board.bitboard[color]);
        tb.p[0] &= 0x01020408;
        tb.p[1] &= 0x10204080;
        first8Bit = ((tb.p[0] | tb.p[1]) * 0x01010101) >>> 24;
        lineScore += calcLineScore(first8Bit);

        tb.copy(board.bitboard[color ^ 1]);
        tb.p[0] &= 0x80402010;
        tb.p[1] &= 0x08040201;
        first8Bit = ((tb.p[0] | tb.p[1]) * 0x01010101) >>> 24;
        lineScore -= calcLineScore(first8Bit);

        tb.copy(board.bitboard[color ^ 1]);
        tb.p[0] &= 0x01020408;
        tb.p[1] &= 0x10204080;
        first8Bit = ((tb.p[0] | tb.p[1]) * 0x01010101) >>> 24;
        lineScore -= calcLineScore(first8Bit);

        return lineScore;

        // const LineScores = [
        //     ["xxx", 100],
        //     [".xx", 100],
        //     ["..x", 100],
        //     ["x.x", 100],
        //     ["x..", 10],
        //     ["...", 0],
        //     ["xx.", -50],
        //     [".x.", -50]
        // ]


        function calcLineScore(row) {

            let leftScore = LineScores[row & 0b111];
            let rightScore = LineScores[rightToLeft(row >>> 5)];

            return leftScore + rightScore;

        }

        function rightToLeft(bit) {

            switch (bit) {
                case 0:
                case 2:
                case 5:
                case 7:
                    return bit;
                case 1:
                    return 4;
                case 3:
                    return 6;
                case 4:
                    return 1;
                case 6:
                    return 3;
                default:
                    throw new Error();
            }

        }

    }


}