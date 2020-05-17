import Board from '../src/Board';
import AlphaBetaPlayer from '../src/players/AlphaBetaPlayer'
import { Squares as S } from '../src/constants';

import assert from 'assert'

describe('board test', () => {

    it('initialize', () => {
        let board = new Board()

        var cpu = new AlphaBetaPlayer();

        while (board.checkGameOver() !== true) {
            cpu.computeMove(board, move => {
                board.pushMove(move)
            })
        }
    })

});