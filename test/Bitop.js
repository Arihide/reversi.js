import Bitop from '../src/Bitop';

import assert from 'assert'

describe('bit test', () => {
    it('last bit', () => {
        for (let i = 0; i < 64; i++) {
            let b = Bitop.bbSetMask(i);
            let l = Bitop.bitScan(b);
            assert.equal(i, l);
        }
    });

    it('pure shift', () => {

        let b = new Bitop(0x55555555, 0x55555555);
        b.pureLeftShift(4);

        assert.equal(b.p[0], 0x55555555);
        assert.equal(b.p[1], 0x55555550);

    });

    it('num of 1', ()=>{

        let b = new Bitop(0b000101000101010100101010010110, 0b111010011111010111);
        let num = b.numOfOne()

        assert.equal(num, 25);
        
    });

    it('delta swap', () => {

        let b = new Bitop(0x0055aaff, 0x81422418);
        let mask = new Bitop(0x0000f000, 0xf0000f00);
        let delta = 4;

        b.deltaSwap(mask, delta);

        assert.equal(b.p[0], 0x005a5af8);
        assert.equal(b.p[1], 0xf1424218);

    });

    it('flip vertical', () => {

        let b = new Bitop(0x0055aaff, 0x81422418);

        b.flipVertical();

        assert.equal(b.p[0], 0x18244281);
        assert.equal(b.p[1], 0xffaa5500);

    });

    it('mirror horizontal', () => {

        let b = new Bitop(0x0055aaff, 0x81422418);

        b.mirrorHorizontal();

        assert.equal(b.p[0], 0x00aa55ff);
        assert.equal(b.p[1], 0x81422418);

    });

    it('flip diag a8 h1', () => {

        let b = new Bitop(0x80808080, 0x80808080);
        b.flipDiagA8H1();

        assert.equal(b.p[0], 0xff000000);
        assert.equal(b.p[1], 0x00000000);

    });

    it('rotate90', () => { //右回転

        let b = new Bitop(0x0055aaff, 0x81422418);

        b.rotate90();

        assert.equal(b.p[0], 0x1c2a4c8a);
        assert.equal(b.p[1], 0x8c4a2c1a);

    });

    it('rotate180', () => {

        let b = new Bitop(0x0055aaff, 0x81422418);

        b.rotate180();

        assert.equal(b.p[0], 0x18244281);
        assert.equal(b.p[1], 0xff55aa00);

        b.p[0] = 0x00040000;

    });
});