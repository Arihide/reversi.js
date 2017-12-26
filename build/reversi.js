var Reversi =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Black = exports.Black = 0;
var White = exports.White = 1;

var Squares = exports.Squares = {
    a1: 0, b1: 1, c1: 2, d1: 3, e1: 4, f1: 5, g1: 6, h1: 7,
    a2: 8, b2: 9, c2: 10, d2: 11, e2: 12, f2: 13, g2: 14, h2: 15,
    a3: 16, b3: 17, c3: 18, d3: 19, e3: 20, f3: 21, g3: 22, h3: 23,
    a4: 24, b4: 25, c4: 26, d4: 27, e4: 28, f4: 29, g4: 30, h4: 31,
    a5: 32, b5: 33, c5: 34, d5: 35, e5: 36, f5: 37, g5: 38, h5: 39,
    a6: 40, b6: 41, c6: 42, d6: 43, e6: 44, f6: 45, g6: 46, h6: 47,
    a7: 48, b7: 49, c7: 50, d7: 51, e7: 52, f7: 53, g7: 54, h7: 55,
    a8: 56, b8: 57, c8: 58, d8: 59, e8: 60, f8: 61, g8: 62, h8: 63
};

var Pass = exports.Pass = 64;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bitop = function () {
    function Bitop() {
        var p0 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var p1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        _classCallCheck(this, Bitop);

        this.buf = new ArrayBuffer(8);
        this.p = new Uint32Array(this.buf);
        this.p[0] = p0;
        this.p[1] = p1;
    }

    _createClass(Bitop, [{
        key: "not",
        value: function not() {
            this.p[0] = ~this.p[0];
            this.p[1] = ~this.p[1];
            return this;
        }
    }, {
        key: "or",
        value: function or(b) {
            this.p[0] = b.p[0] | this.p[0];
            this.p[1] = b.p[1] | this.p[1];
            return this;
        }
    }, {
        key: "and",
        value: function and(b) {
            this.p[0] = b.p[0] & this.p[0];
            this.p[1] = b.p[1] & this.p[1];
            return this;
        }
    }, {
        key: "xor",
        value: function xor(b) {
            this.p[0] = b.p[0] ^ this.p[0];
            this.p[1] = b.p[1] ^ this.p[1];
            return this;
        }
    }, {
        key: "addOne",
        value: function addOne() {
            this.p[1]++;

            if (this.p[1] === 0) {
                this.p[0]++;
            }

            return this;
        }
    }, {
        key: "subOne",
        value: function subOne() {

            if (this.p[1] === 0) {
                this.p[0]--;
            }

            this.p[1]--;

            return this;
        }
    }, {
        key: "addPer8bit",
        value: function addPer8bit(b) {
            var tp = new Uint8Array(this.buf);
            var tb = new Uint8Array(b.buf);

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
    }, {
        key: "isZero",
        value: function isZero() {
            if (this.p[0] === 0 && this.p[1] === 0) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: "copy",
        value: function copy(b) {
            this.p[0] = b.p[0];
            this.p[1] = b.p[1];
            return this;
        }
    }, {
        key: "clone",
        value: function clone() {
            return new Bitop(this.p[0], this.p[1]);
        }
    }, {
        key: "shiftUp",
        value: function shiftUp() {
            this.p[0] = this.p[0] << 8 | this.p[1] >>> 24 & 0xff;
            this.p[1] = this.p[1] << 8;
            return this;
        }
    }, {
        key: "shiftDown",
        value: function shiftDown() {
            this.p[1] = this.p[1] >>> 8 | this.p[0] << 24 & 0xff000000;
            this.p[0] = this.p[0] >>> 8;
            return this;
        }
    }, {
        key: "shiftLeft",
        value: function shiftLeft() {
            this.p[0] = (this.p[0] & 0x7f7f7f7f) << 1;
            this.p[1] = (this.p[1] & 0x7f7f7f7f) << 1;
            return this;
        }
    }, {
        key: "shiftRight",
        value: function shiftRight() {
            this.p[0] = (this.p[0] & 0xfefefefe) >>> 1;
            this.p[1] = (this.p[1] & 0xfefefefe) >>> 1;
            return this;
        }
    }, {
        key: "pureLeftShift",
        value: function pureLeftShift(n) {
            if (n < 32) {
                this.p[0] = this.p[0] << n | this.p[1] >>> 32 - n;
                this.p[1] = this.p[1] << n;
            } else {
                this.p[0] = this.p[1] << n - 32;
                this.p[1] = 0;
            }
            return this;
        }
    }, {
        key: "pureRightShift",
        value: function pureRightShift(n) {
            if (n < 32) {
                this.p[1] = this.p[1] >>> n | this.p[0] << 32 - n;
                this.p[0] = this.p[0] >>> n;
            } else {
                this.p[1] = this.p[0] >>> n - 32;
                this.p[0] = 0;
            }
            return this;
        }
    }, {
        key: "numOfOne",
        value: function numOfOne() {

            var num1 = this.p[0],
                num2 = this.p[1];
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
    }, {
        key: "deltaSwap",
        value: function deltaSwap(mask, delta) {

            var temp = this.clone().pureRightShift(delta).xor(this).and(mask);
            this.xor(temp);
            temp.pureLeftShift(delta);
            this.xor(temp);
        }
    }, {
        key: "rotate90",
        value: function rotate90() {

            this.flipVertical();
            this.flipDiagA8H1();
        }
    }, {
        key: "rotate180",
        value: function rotate180() {

            this.flipVertical();
            this.mirrorHorizontal();
        }
    }, {
        key: "rotate270",
        value: function rotate270() {

            this.flipDiagA8H1();
            this.flipVertical();
        }
    }, {
        key: "flipVertical",
        value: function flipVertical() {
            var mask = new Bitop(0x00ff00ff, 0x00ff00ff);
            this.deltaSwap(mask, 8);

            mask.p[0] = mask.p[1] = 0x0000ffff;
            this.deltaSwap(mask, 16);

            var _ref = [this.p[1], this.p[0]];
            this.p[0] = _ref[0];
            this.p[1] = _ref[1];
        }
    }, {
        key: "mirrorHorizontal",
        value: function mirrorHorizontal() {
            var mask = new Bitop(0x55555555, 0x55555555);
            this.deltaSwap(mask, 1);

            mask.p[0] = mask.p[1] = 0x33333333;
            this.deltaSwap(mask, 2);

            mask.p[0] = mask.p[1] = 0x0f0f0f0f;
            this.deltaSwap(mask, 4);
        }
    }, {
        key: "flipDiagA1H8",
        value: function flipDiagA1H8() {

            var mask = new Bitop(0xf0f0f0f0, 0x0f0f0f0f);
            this.deltaSwap(mask, 36);

            mask.p[0] = mask.p[1] = 0xcccc0000;
            this.deltaSwap(mask, 18);

            mask.p[0] = mask.p[1] = 0xaa00aa00;
            this.deltaSwap(mask, 9);
        }
    }, {
        key: "flipDiagA8H1",
        value: function flipDiagA8H1() {

            var mask = new Bitop(0, 0xf0f0f0f0);
            this.deltaSwap(mask, 28);

            mask.p[0] = mask.p[1] = 0x0000cccc;
            this.deltaSwap(mask, 14);

            mask.p[0] = mask.p[1] = 0x00aa00aa;
            this.deltaSwap(mask, 7);
        }
    }], [{
        key: "bbSetMask",
        value: function bbSetMask(sq) {

            var bb = new Bitop();
            if (sq < 32) {
                bb.p[0] = 1 << 31 - sq;
            } else {
                bb.p[1] = 1 << 63 - sq;
            }

            return bb;
        }
    }, {
        key: "bitScan",
        value: function bitScan(b) {
            var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (b.p[0] != 0 && n < 32) {
                var sb = b.p[0].toString(2);
                var r = sb.indexOf("1", sb.length + n - 32);
                if (r != -1) {
                    return 32 - sb.length + r;
                }
            }
            if (b.p[1] != 0 && n < 64) {
                var _sb = b.p[1].toString(2);
                var _r = _sb.indexOf("1", _sb.length + n - 64);
                if (_r != -1) {
                    return 64 - _sb.length + _r;
                }
            }
            return -1;
        }
    }]);

    return Bitop;
}();

exports.default = Bitop;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BB_SQUARES = exports.BB_VOID = undefined;

var _Bitop = __webpack_require__(1);

var _Bitop2 = _interopRequireDefault(_Bitop);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BB_VOID = exports.BB_VOID = new _Bitop2.default();

var BB_SQUARES = exports.BB_SQUARES = [];
for (var isquare = 0; isquare <= _constants.Squares.h8; isquare++) {

    BB_SQUARES[isquare] = _Bitop2.default.bbSetMask(isquare);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Bitop = __webpack_require__(1);

var _Bitop2 = _interopRequireDefault(_Bitop);

var _Move = __webpack_require__(9);

var _Move2 = _interopRequireDefault(_Move);

var _constants = __webpack_require__(0);

var _Data = __webpack_require__(2);

var Data = _interopRequireWildcard(_Data);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
    function Board() {
        _classCallCheck(this, Board);

        this.initialBoard = [];
        this.bitboard = [];
        this._legalMoves = null;

        this.initialize();
    }

    _createClass(Board, [{
        key: 'initialize',
        value: function initialize() {
            var blackDiscs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [_constants.Squares.e4, _constants.Squares.d5];
            var whiteDiscs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [_constants.Squares.e5, _constants.Squares.d4];

            this.turn = _constants.Black;

            this.initialBoard[_constants.Black] = blackDiscs;
            this.initialBoard[_constants.White] = whiteDiscs;

            this.playedMoves = [];
            this.bitboard[_constants.Black] = new _Bitop2.default();
            this.bitboard[_constants.White] = new _Bitop2.default();

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = blackDiscs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var disc = _step.value;

                    this.bitboard[_constants.Black].xor(Data.BB_SQUARES[disc]);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = whiteDiscs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _disc = _step2.value;

                    this.bitboard[_constants.White].xor(Data.BB_SQUARES[_disc]);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'pushMove',
        value: function pushMove(square) {

            var move = void 0;

            if (square === _constants.Pass) {

                move = _Move2.default.getPassMove(this.turn);
            } else {

                var bbflip = this.flip(square);

                this.bitboard[this.turn].xor(Data.BB_SQUARES[square]);
                this.bitboard[_constants.Black].xor(bbflip);
                this.bitboard[_constants.White].xor(bbflip);

                move = _Move2.default.createFromBBFlip(this.turn, square, bbflip);
            }

            this.playedMoves.push(move);

            this._legalMoves = null;
            this.turn ^= 1;

            return move;
        }
    }, {
        key: 'popMove',
        value: function popMove() {

            var move = this.playedMoves.pop();

            if (move.square !== _constants.Pass) {

                this.bitboard[move.color].xor(Data.BB_SQUARES[move.square]);
                this.bitboard[_constants.Black].xor(move.bbflip);
                this.bitboard[_constants.White].xor(move.bbflip);
            }

            this._legalMoves = null;
            this.turn ^= 1;
            return move;
        }
    }, {
        key: 'checkGameOver',
        value: function checkGameOver() {

            if (this.generateLegalMoves().length === 0) {

                this.turn ^= 1;

                if (this.generateLegalMoves().length === 0) {

                    this.turn ^= 1;

                    return true;
                }

                this.turn ^= 1;
            }

            return false;
        }
    }, {
        key: 'generateLegalMoves',
        value: function generateLegalMoves() {

            var p = this.bitboard[this.turn];
            var o = this.bitboard[this.turn ^ 1];

            var temp = new _Bitop2.default();
            var moves = new _Bitop2.default();

            temp.copy(p).shiftLeft().and(o);
            for (var i = 0; i < 5; i++) {
                moves.or(temp.shiftLeft());
                temp.and(o);
            }
            moves.or(temp.shiftLeft());

            temp.copy(p).shiftRight().and(o);
            for (var _i = 0; _i < 5; _i++) {
                moves.or(temp.shiftRight());
                temp.and(o);
            }
            moves.or(temp.shiftRight());

            temp.copy(p).shiftUp().and(o);
            for (var _i2 = 0; _i2 < 5; _i2++) {
                moves.or(temp.shiftUp());
                temp.and(o);
            }
            moves.or(temp.shiftUp());

            temp.copy(p).shiftDown().and(o);
            for (var _i3 = 0; _i3 < 5; _i3++) {
                moves.or(temp.shiftDown());
                temp.and(o);
            }
            moves.or(temp.shiftDown());

            temp.copy(p).shiftLeft().shiftUp().and(o);
            for (var _i4 = 0; _i4 < 5; _i4++) {
                moves.or(temp.shiftLeft().shiftUp());
                temp.and(o);
            }
            moves.or(temp.shiftLeft().shiftUp());

            temp.copy(p).shiftLeft().shiftDown().and(o);
            for (var _i5 = 0; _i5 < 5; _i5++) {
                moves.or(temp.shiftLeft().shiftDown());
                temp.and(o);
            }
            moves.or(temp.shiftLeft().shiftDown());

            temp.copy(p).shiftRight().shiftUp().and(o);
            for (var _i6 = 0; _i6 < 5; _i6++) {
                moves.or(temp.shiftRight().shiftUp());
                temp.and(o);
            }
            moves.or(temp.shiftRight().shiftUp());

            temp.copy(p).shiftRight().shiftDown().and(o);
            for (var _i7 = 0; _i7 < 5; _i7++) {
                moves.or(temp.shiftRight().shiftDown());
                temp.and(o);
            }
            moves.or(temp.shiftRight().shiftDown());

            temp.copy(p).or(o).not();
            moves.and(temp);

            var squares = [];
            var square = _Bitop2.default.bitScan(moves);
            while (square !== -1) {
                squares.push(square);
                square = _Bitop2.default.bitScan(moves, square + 1);
            }

            return squares;
        }
    }, {
        key: 'flip',
        value: function flip(square) {

            var masks = [new _Bitop2.default(0x00808080, 0x80808080), new _Bitop2.default(0x7f000000, 0), new _Bitop2.default(0x01020408, 0x10204000), new _Bitop2.default(0x00402010, 0x08040201)];

            var masks2 = [new _Bitop2.default(0x01010101, 0x01010100), new _Bitop2.default(0, 0x000000fe), new _Bitop2.default(0x00020408, 0x10204080), new _Bitop2.default(0x80402010, 0x08040200)];

            var p = this.bitboard[this.turn];
            var o = this.bitboard[this.turn ^ 1];

            var fliped = new _Bitop2.default();
            var outflank = new _Bitop2.default();
            var delta = void 0;
            var mask = void 0;

            for (var i = 0; i < 4; i++) {

                mask = masks[i];
                mask.pureRightShift(square);
                outflank.copy(o);
                if (i) {
                    outflank.p[0] &= 0x7e7e7e7e;
                    outflank.p[1] &= 0x7e7e7e7e;
                }
                delta = _Bitop2.default.bitScan(outflank.not().and(mask));

                outflank.p[0] = 0x80000000;
                outflank.p[1] = 0;

                outflank.pureRightShift(delta);
                outflank.and(p);
                outflank.not().addOne().pureLeftShift(1);
                outflank.and(mask);
                fliped.or(outflank);

                mask = masks2[i];
                mask.pureLeftShift(63 - square);

                outflank.copy(o);
                if (i) {
                    outflank.p[0] &= 0x7e7e7e7e;
                    outflank.p[1] &= 0x7e7e7e7e;
                }

                outflank.not().and(mask).not().addOne().and(mask).and(p);
                if (outflank.isZero() !== true) {
                    outflank.subOne();
                    outflank.and(mask);
                    fliped.or(outflank);
                }
            }

            return fliped;
        }
    }, {
        key: 'legalMoves',
        get: function get() {

            if (this._legalMoves) {
                return this._legalMoves;
            }

            this._legalMoves = this.generateLegalMoves();

            return this._legalMoves;
        }
    }, {
        key: 'blackDiscNum',
        get: function get() {

            return this.bitboard[_constants.Black].numOfOne();
        }
    }, {
        key: 'whiteDiscNum',
        get: function get() {

            return this.bitboard[_constants.White].numOfOne();
        }
    }]);

    return Board;
}();

exports.default = Board;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HumanPlayer = function () {
    function HumanPlayer() {
        _classCallCheck(this, HumanPlayer);

        this.isHuman = true;
        this._callback = null;
        this._board = null;
    }

    _createClass(HumanPlayer, [{
        key: 'startTurn',
        value: function startTurn(board, callback) {

            if (board.legalMoves.length === 0) {

                callback(_constants.Pass);

                return;
            }

            this._callback = callback;
            this._board = board;
        }
    }, {
        key: 'placeDisc',
        value: function placeDisc(square) {

            if (this._callback && this._board.legalMoves.includes(square)) {

                var c = this._callback;
                this._callback = null;

                c(square);
            }
        }
    }]);

    return HumanPlayer;
}();

exports.default = HumanPlayer;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ComputerPlayer = function () {
    function ComputerPlayer() {
        _classCallCheck(this, ComputerPlayer);

        this.isComputer = true;
    }

    _createClass(ComputerPlayer, [{
        key: "startTurn",
        value: function startTurn(board, callback) {

            setTimeout(this.computeMove, 0, board, callback);
        }
    }, {
        key: "compute",
        value: function compute(board, callback) {

            throw new Error("Override 'compute' method");
        }
    }]);

    return ComputerPlayer;
}();

exports.default = ComputerPlayer;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Board = exports.RandomComputerPlayer = exports.ComputerPlayer = exports.HumanPlayer = exports.Game = undefined;

var _constants = __webpack_require__(0);

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _constants[key];
    }
  });
});

var _Data = __webpack_require__(2);

Object.keys(_Data).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Data[key];
    }
  });
});

var _ReversiGame = __webpack_require__(8);

var _ReversiGame2 = _interopRequireDefault(_ReversiGame);

var _HumanPlayer = __webpack_require__(4);

var _HumanPlayer2 = _interopRequireDefault(_HumanPlayer);

var _ComputerPlayer = __webpack_require__(5);

var _ComputerPlayer2 = _interopRequireDefault(_ComputerPlayer);

var _RandomComputerPlayer = __webpack_require__(11);

var _RandomComputerPlayer2 = _interopRequireDefault(_RandomComputerPlayer);

var _Board = __webpack_require__(3);

var _Board2 = _interopRequireDefault(_Board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Game = _ReversiGame2.default;
exports.HumanPlayer = _HumanPlayer2.default;
exports.ComputerPlayer = _ComputerPlayer2.default;
exports.RandomComputerPlayer = _RandomComputerPlayer2.default;
exports.Board = _Board2.default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Board = __webpack_require__(3);

var _Board2 = _interopRequireDefault(_Board);

var _constants = __webpack_require__(0);

var _HumanPlayer = __webpack_require__(4);

var _HumanPlayer2 = _interopRequireDefault(_HumanPlayer);

var _EventDispatcher2 = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_EventDispatcher) {
    _inherits(Game, _EventDispatcher);

    function Game() {
        _classCallCheck(this, Game);

        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this));

        _this.board = new _Board2.default();
        _this.players = [];
        _this.players[_constants.Black] = new _HumanPlayer2.default();
        _this.players[_constants.White] = new _HumanPlayer2.default();

        _this.isRunning = false;
        return _this;
    }

    _createClass(Game, [{
        key: '_doMoveAndChangeTurn',
        value: function _doMoveAndChangeTurn(square) {

            var move = this.board.pushMove(square);

            this.dispatchEvent({ type: 'finishTurn', color: move.color, player: this.players[move.color], move: move });

            if (this.board.checkGameOver() === true) {

                this.isRunning = false;
                this.dispatchEvent({ type: 'finishGame' });
                return;
            }

            this.players[this.board.turn].startTurn(this.board, this._doMoveAndChangeTurn.bind(this));
            this.dispatchEvent({ type: 'startTurn', color: this.board.turn, player: this.players[this.board.turn] });
        }
    }, {
        key: 'startGame',
        value: function startGame() {
            var blackPlayer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.players[_constants.Black];
            var whitePlayer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.players[_constants.White];
            var board = arguments[2];


            this.players[_constants.Black] = blackPlayer;
            this.players[_constants.White] = whitePlayer;

            if (board === undefined) {
                this.board.initialize();
            } else {
                this.board = board;
            }

            this.isRunning = true;

            this.players[this.board.turn].startTurn(this.board, this._doMoveAndChangeTurn.bind(this));
            this.dispatchEvent({ type: 'startTurn', player: this.players[this.board.turn] });
        }
    }, {
        key: 'undo',
        value: function undo() {

            if (!this.players[this.board.turn].isHuman) {
                return;
            }

            var move = this.board.popMove();

            while (!this.players[move.color].isHuman || move.place === _constants.Pass) {

                if (move === undefined) {
                    return;
                }

                this.dispatchEvent({ type: 'undo', move: move });

                move = this.board.popMove();
            }

            this.dispatchEvent({ type: 'undo', move: move });

            this.players[this.board.turn].startTurn(this.board);
        }
    }]);

    return Game;
}(_EventDispatcher2.EventDispatcher);

exports.default = Game;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Bitop = __webpack_require__(1);

var _Bitop2 = _interopRequireDefault(_Bitop);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Move = function () {
    function Move(color, place, flip, bbflip) {
        _classCallCheck(this, Move);

        this.color = color;
        this.place = place;
        this.flip = flip;
        this.bbflip = bbflip;
    }

    _createClass(Move, null, [{
        key: 'createFromBBFlip',
        value: function createFromBBFlip(color, place, bbflip) {

            var flip = [];
            var fs = _Bitop2.default.bitScan(bbflip);
            while (fs !== -1) {
                flip.push(fs);
                fs = _Bitop2.default.bitScan(bbflip, fs + 1);
            }

            return new Move(color, place, flip, bbflip);
        }
    }, {
        key: 'getPassMove',
        value: function getPassMove(color) {

            if (color === _constants.Black) {
                return blackPassMove;
            } else if (color === _constants.White) {
                return whitePassMove;
            }
        }
    }]);

    return Move;
}();

exports.default = Move;


var blackPassMove = new Move(_constants.Black, _constants.Pass, [], new _Bitop2.default());
var whitePassMove = new Move(_constants.White, _constants.Pass, [], new _Bitop2.default());

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.EventDispatcher = EventDispatcher;
function EventDispatcher() {}

Object.assign(EventDispatcher.prototype, {

	addEventListener: function addEventListener(type, listener) {

		if (this._listeners === undefined) this._listeners = {};

		var listeners = this._listeners;

		if (listeners[type] === undefined) {

			listeners[type] = [];
		}

		if (listeners[type].indexOf(listener) === -1) {

			listeners[type].push(listener);
		}
	},

	hasEventListener: function hasEventListener(type, listener) {

		if (this._listeners === undefined) return false;

		var listeners = this._listeners;

		return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
	},

	removeEventListener: function removeEventListener(type, listener) {

		if (this._listeners === undefined) return;

		var listeners = this._listeners;
		var listenerArray = listeners[type];

		if (listenerArray !== undefined) {

			var index = listenerArray.indexOf(listener);

			if (index !== -1) {

				listenerArray.splice(index, 1);
			}
		}
	},

	dispatchEvent: function dispatchEvent(event) {

		if (this._listeners === undefined) return;

		var listeners = this._listeners;
		var listenerArray = listeners[event.type];

		if (listenerArray !== undefined) {

			event.target = this;

			var array = listenerArray.slice(0);

			for (var i = 0, l = array.length; i < l; i++) {

				array[i].call(this, event);
			}
		}
	}

});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ComputerPlayer2 = __webpack_require__(5);

var _ComputerPlayer3 = _interopRequireDefault(_ComputerPlayer2);

var _constants = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RandomComputerPlayer = function (_ComputerPlayer) {
    _inherits(RandomComputerPlayer, _ComputerPlayer);

    function RandomComputerPlayer() {
        _classCallCheck(this, RandomComputerPlayer);

        return _possibleConstructorReturn(this, (RandomComputerPlayer.__proto__ || Object.getPrototypeOf(RandomComputerPlayer)).call(this));
    }

    _createClass(RandomComputerPlayer, [{
        key: 'computeMove',
        value: function computeMove(board, callback) {

            var movable = board.legalMoves;

            if (movable.length === 0) {

                callback(_constants.Pass);

                return;
            }

            var idx = Math.floor(Math.random() * movable.length);

            callback(movable[idx]);
        }
    }]);

    return RandomComputerPlayer;
}(_ComputerPlayer3.default);

exports.default = RandomComputerPlayer;

/***/ })
/******/ ]);