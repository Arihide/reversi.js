import Bitop from './Bitop';
import Move from './Move';

import { Black, White, Squares, Pass } from './constants';
import * as Data from './Data';


export default class Board {

    constructor() {
        
        this.initialBoard = [];
        this.bitboard = [new Bitop(), new Bitop()];
        this._legalMoves = null;

        this.initialize();
    }

    initialize(blackDiscs = [Squares.e4, Squares.d5], whiteDiscs = [Squares.e5, Squares.d4]) {
        this.turn = Black;

        this.initialBoard[Black] = blackDiscs;
        this.initialBoard[White] = whiteDiscs;

        this.playedMoves = [];

        this.bitboard[Black].set(0, 0);
        this.bitboard[White].set(0, 0);

        for (let disc of blackDiscs) {
            this.bitboard[Black].xor(Data.BB_SQUARES[disc]);
        }

        for (let disc of whiteDiscs) {
            this.bitboard[White].xor(Data.BB_SQUARES[disc]);
        }

    }

    get legalMoves() {

        if (this._legalMoves) {
            return this._legalMoves;
        }

        this._legalMoves = this.generateLegalMoves();

        return this._legalMoves

    }

    get blackDiscNum() {

        return this.bitboard[Black].numOfOne()

    }

    get whiteDiscNum() {

        return this.bitboard[White].numOfOne();

    }

    pushMove(square) {

        let move;

        if (square === Pass) {

            move = Move.getPassMove(this.turn);

        } else {

            let bbflip = this.flip(square);

            this.bitboard[this.turn].xor(Data.BB_SQUARES[square]);
            this.bitboard[Black].xor(bbflip);
            this.bitboard[White].xor(bbflip);

            move = Move.createFromBBFlip(this.turn, square, bbflip);

        }

        this.playedMoves.push(move);

        this._legalMoves = null;
        this.turn ^= 1;

        return move;
    }

    popMove() {

        let move = this.playedMoves.pop();

        if (move === undefined) return undefined;

        if (move.place !== Pass) {

            this.bitboard[move.color].xor(Data.BB_SQUARES[move.place]);
            this.bitboard[Black].xor(move.bbflip);
            this.bitboard[White].xor(move.bbflip);

        }

        this._legalMoves = null;
        this.turn ^= 1;
        return move;

    }

    checkGameOver() {

        if (this.generateLegalMoves().length === 0) {

            this.turn ^= 1;

            if (this.generateLegalMoves().length === 0) {

                this.turn ^= 1;

                return true

            }

            this.turn ^= 1;
        }

        return false;

    }

    generateLegalMoves() {

        /*
        *   http://www.creativ.xyz/reversi-gen-valid-139
        */

        let p = this.bitboard[this.turn];
        let o = this.bitboard[this.turn ^ 1];

        let temp = new Bitop();
        let moves = new Bitop();

        temp.copy(p).shiftLeft().and(o);
        for (let i = 0; i < 5; i++) {
            moves.or(temp.shiftLeft());
            temp.and(o);
            // temp.or(temp.clone().shiftLeft().and(o));
        }
        moves.or(temp.shiftLeft());

        temp.copy(p).shiftRight().and(o);
        for (let i = 0; i < 5; i++) {
            moves.or(temp.shiftRight());
            temp.and(o);
        }
        moves.or(temp.shiftRight());

        temp.copy(p).shiftUp().and(o)
        for (let i = 0; i < 5; i++) {
            moves.or(temp.shiftUp());
            temp.and(o);
        }
        moves.or(temp.shiftUp());

        temp.copy(p).shiftDown().and(o)
        for (let i = 0; i < 5; i++) {
            moves.or(temp.shiftDown());
            temp.and(o);
        }
        moves.or(temp.shiftDown());

        temp.copy(p).shiftLeft().shiftUp().and(o);
        for (let i = 0; i < 5; i++) {
            moves.or(temp.shiftLeft().shiftUp());
            temp.and(o);
        }
        moves.or(temp.shiftLeft().shiftUp());

        temp.copy(p).shiftLeft().shiftDown().and(o);
        for (let i = 0; i < 5; i++) {
            moves.or(temp.shiftLeft().shiftDown());
            temp.and(o);
        }
        moves.or(temp.shiftLeft().shiftDown());

        temp.copy(p).shiftRight().shiftUp().and(o);
        for (let i = 0; i < 5; i++) {
            moves.or(temp.shiftRight().shiftUp());
            temp.and(o);
        }
        moves.or(temp.shiftRight().shiftUp());

        temp.copy(p).shiftRight().shiftDown().and(o);
        for (let i = 0; i < 5; i++) {
            moves.or(temp.shiftRight().shiftDown());
            temp.and(o);
        }
        moves.or(temp.shiftRight().shiftDown());

        temp.copy(p).or(o).not(); //blank
        moves.and(temp);

        let squares = [];
        let square = Bitop.bitScan(moves);
        while (square !== -1) {
            squares.push(square);
            square = Bitop.bitScan(moves, square + 1);
        }

        return squares;

    }

    flip(square) {

        /*  右下に置いたときバグ確認
        *   http://www.amy.hi-ho.ne.jp/okuhara/flipcuda.htm
        *   http://primenumber.hatenadiary.jp/entry/2016/12/26/063226
        */


        const masks = [
            new Bitop(0x00808080, 0x80808080),  //bottom
            new Bitop(0x7f000000, 0),           //right
            new Bitop(0x01020408, 0x10204000),
            new Bitop(0x00402010, 0x08040201)
        ];

        const masks2 = [
            new Bitop(0x01010101, 0x01010100),  //top
            new Bitop(0, 0x000000fe),           //left
            new Bitop(0x00020408, 0x10204080),
            new Bitop(0x80402010, 0x08040200)
        ]

        let p = this.bitboard[this.turn];
        let o = this.bitboard[this.turn ^ 1];

        let fliped = new Bitop();
        let outflank = new Bitop();
        let delta;
        let mask;

        for (let i = 0; i < 4; i++) {

            mask = masks[i];
            mask.pureRightShift(square);
            outflank.copy(o);
            if (i) {
                outflank.p[0] &= 0x7e7e7e7e;
                outflank.p[1] &= 0x7e7e7e7e;
            }
            delta = Bitop.bitScan(outflank.not().and(mask));

            outflank.p[0] = 0x80000000;
            outflank.p[1] = 0;

            outflank.pureRightShift(delta);
            outflank.and(p);
            outflank.not().addOne().pureLeftShift(1);
            outflank.and(mask);
            fliped.or(outflank);

            mask = masks2[i];

            mask.pureLeftShift(63 - square);

            // outflank.copy(mask).not();
            outflank.copy(o);
            if (i) {
                outflank.p[0] &= 0x7e7e7e7e;
                outflank.p[1] &= 0x7e7e7e7e;
            }
            // outflank.or(o).addOne().and(mask).and(p);
            outflank.not().and(mask).not().addOne().and(mask).and(p);
            if (outflank.isZero() !== true) {
                outflank.subOne();
                outflank.and(mask);
                fliped.or(outflank);
            }

        }

        return fliped;

    }

}