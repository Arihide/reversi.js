export default class Bitop {
    constructor(p0 = 0, p1 = 0) {
        this.buf = new ArrayBuffer(8)
        this.p = new Uint32Array(this.buf);
        this.p[0] = p0;
        this.p[1] = p1;
    }

    not() {
        this.p[0] = ~this.p[0];
        this.p[1] = ~this.p[1];
        return this;
    }

    or(b) {
        this.p[0] = b.p[0] | this.p[0];
        this.p[1] = b.p[1] | this.p[1];
        return this;
    }

    and(b) {
        this.p[0] = b.p[0] & this.p[0];
        this.p[1] = b.p[1] & this.p[1];
        return this;
    }

    xor(b) {
        this.p[0] = b.p[0] ^ this.p[0];
        this.p[1] = b.p[1] ^ this.p[1];
        return this;
    }

    addOne() {
        this.p[1]++;

        if (this.p[1] === 0) {
            this.p[0]++;
        }

        return this;

    }

    subOne() {

        if (this.p[1] === 0) {
            this.p[0]--;
        }

        this.p[1]--;

        return this;
    }

    addPer8bit(b) {
        let tp = new Uint8Array(this.buf);
        let tb = new Uint8Array(b.buf);

        tp[0] += tb[0];
        tp[1] += tb[1];
        tp[2] += tb[2];
        tp[3] += tb[3];
        tp[4] += tb[4];
        tp[5] += tb[5];
        tp[6] += tb[6];
        tp[7] += tb[7];

        return this;
    }

    isZero() {
        if (this.p[0] === 0 && this.p[1] === 0) {
            return true;
        } else {
            return false;
        }
    }

    copy(b) {
        this.p[0] = b.p[0];
        this.p[1] = b.p[1];
        return this;
    }

    clone() {
        return new Bitop(this.p[0], this.p[1]);
    }

    shiftUp() {
        this.p[0] = (this.p[0] << 8) | ((this.p[1] >>> 24) & 0xff);
        this.p[1] = (this.p[1] << 8);
        return this;
    }

    shiftDown() {
        this.p[1] = (this.p[1] >>> 8) | ((this.p[0] << 24) & 0xff000000);
        this.p[0] = (this.p[0] >>> 8);
        return this;
    }

    shiftLeft() {
        this.p[0] = (this.p[0] & 0x7f7f7f7f) << 1;
        this.p[1] = (this.p[1] & 0x7f7f7f7f) << 1;
        return this;
    }

    shiftRight() {
        this.p[0] = (this.p[0] & 0xfefefefe) >>> 1;
        this.p[1] = (this.p[1] & 0xfefefefe) >>> 1;
        return this;
    }

    pureLeftShift(n) {
        if (n < 32) {
            this.p[0] = (this.p[0] << n) | (this.p[1] >>> (32 - n));
            this.p[1] = this.p[1] << n;
        } else {
            this.p[0] = this.p[1] << (n - 32);
            this.p[1] = 0;
        }
        return this;
    }

    pureRightShift(n) {
        if (n < 32) {
            this.p[1] = (this.p[1] >>> n) | (this.p[0] << (32 - n));
            this.p[0] = this.p[0] >>> n;
        } else {
            this.p[1] = this.p[0] >>> (n - 32);
            this.p[0] = 0;
        }
        return this;
    }

    numOfOne() {

        /*
        *   https://www.slideshare.net/KMC_JP/slide-www, pp.38-
        *   http://www.creativ.xyz/reversi-bit-count-164
        */

        let num1 = this.p[0], num2 = this.p[1];
        num1 = (num1 & 0x55555555) + ((num1 & 0xaaaaaaaa) >>> 1);
        num1 = (num1 & 0x33333333) + ((num1 & 0xcccccccc) >>> 2);
        num1 = (num1 & 0x0f0f0f0f) + ((num1 & 0xf0f0f0f0) >>> 4);
        num1 = (num1 & 0x00ff00ff) + ((num1 & 0xff00ff00) >>> 8);
        num1 = (num1 & 0x0000ffff) + ((num1 & 0xffff0000) >>> 16);
        num2 = (num2 & 0x55555555) + ((num2 & 0xaaaaaaaa) >>> 1);
        num2 = (num2 & 0x33333333) + ((num2 & 0xcccccccc) >>> 2);
        num2 = (num2 & 0x0f0f0f0f) + ((num2 & 0xf0f0f0f0) >>> 4);
        num2 = (num2 & 0x00ff00ff) + ((num2 & 0xff00ff00) >>> 8);
        num2 = (num2 & 0x0000ffff) + ((num2 & 0xffff0000) >>> 16);

        return num1 + num2;

    }

    deltaSwap(mask, delta) {

        /*
        * http://primenumber.hatenadiary.jp/entry/2016/12/03/203823
        */

        let temp = this.clone().pureRightShift(delta).xor(this).and(mask);
        this.xor(temp);
        temp.pureLeftShift(delta);
        this.xor(temp);

    }

    rotate90() {　//右回転

        this.flipVertical();
        this.flipDiagA8H1();

    }

    rotate180() {

        this.flipVertical();
        this.mirrorHorizontal();

    }

    rotate270() {

        this.flipDiagA8H1();
        this.flipVertical();

    }

    flipVertical() {
        let mask = new Bitop(0x00ff00ff, 0x00ff00ff);
        this.deltaSwap(mask, 8);

        mask.p[0] = mask.p[1] = 0x0000ffff;
        this.deltaSwap(mask, 16);

        [this.p[0], this.p[1]] = [this.p[1], this.p[0]];
    }

    mirrorHorizontal() {
        let mask = new Bitop(0x55555555, 0x55555555);
        this.deltaSwap(mask, 1);


        mask.p[0] = mask.p[1] = 0x33333333;
        this.deltaSwap(mask, 2);

        mask.p[0] = mask.p[1] = 0x0f0f0f0f;
        this.deltaSwap(mask, 4);
    }

    flipDiagA1H8() {

        let mask = new Bitop(0xf0f0f0f0, 0x0f0f0f0f);
        this.deltaSwap(mask, 36);

        mask.p[0] = mask.p[1] = 0xcccc0000;
        this.deltaSwap(mask, 18);

        mask.p[0] = mask.p[1] = 0xaa00aa00;
        this.deltaSwap(mask, 9);

    }

    flipDiagA8H1() {

        let mask = new Bitop(0, 0xf0f0f0f0);
        this.deltaSwap(mask, 28);

        mask.p[0] = mask.p[1] = 0x0000cccc;
        this.deltaSwap(mask, 14);

        mask.p[0] = mask.p[1] = 0x00aa00aa;
        this.deltaSwap(mask, 7);

    }

    static bbSetMask(sq) {

        let bb = new Bitop();
        if (sq < 32) {
            bb.p[0] = 1 << (31 - sq);
        } else {
            bb.p[1] = 1 << (63 - sq);
        }

        return bb;
    }

    static bitScan(b, n = 0) {
        if (b.p[0] != 0 && n < 32) {
            let sb = b.p[0].toString(2);
            let r = sb.indexOf("1", sb.length + n - 32)
            if (r != -1) {
                return 32 - sb.length + r;
            }
        }
        if (b.p[1] != 0 && n < 64) {
            let sb = b.p[1].toString(2);
            let r = sb.indexOf("1", sb.length + n - 64)
            if (r != -1) {
                return 64 - sb.length + r;
            }
        }
        return -1;
    }
}