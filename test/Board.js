import Board from '../src/Board';
import { Squares as S } from '../src/constants';

import assert from 'assert'

describe('board test', () => {

    it('flip', () => {
        let b = new Board();
        b.initialize([S.b2, S.c3, S.d4, S.e5, S.f6, S.g7], [S.a1]);
        b.turn = 1;
        let flip = b.flip(S.h8);

        assert.equal(flip.p[0], 0x00402010);
        assert.equal(flip.p[1], 0x08040200);

        b.initialize([S.a3, S.a4, S.a5, S.a6, S.a7, S.a8, S.b1, S.b2, S.b3, S.c2, S.d2, S.e2], [S.a1, S.c3, S.c4, S.c5, S.f2, S.h1, S.h2, S.h3, S.h4]);
        b.turn = 1;
        flip = b.flip(S.a2);

        console.log(flip.p[0].toString(16));

        assert.equal(flip.p[0], 0x00784000);
        assert.equal(flip.p[1], 0);
    });

});