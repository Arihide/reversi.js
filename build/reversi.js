var Reversi=function(t){var i={};function e(s){if(i[s])return i[s].exports;var r=i[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,e),r.l=!0,r.exports}return e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var r in t)e.d(s,r,function(i){return t[i]}.bind(null,r));return s},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){t.exports=e(1)},function(t,i,e){"use strict";e.r(i),e.d(i,"Game",(function(){return g})),e.d(i,"HumanPlayer",(function(){return b})),e.d(i,"ComputerPlayer",(function(){return y})),e.d(i,"RandomPlayer",(function(){return w})),e.d(i,"AlphaBetaPlayer",(function(){return M})),e.d(i,"Board",(function(){return c})),e.d(i,"Black",(function(){return n})),e.d(i,"White",(function(){return h})),e.d(i,"Squares",(function(){return o})),e.d(i,"Pass",(function(){return a})),e.d(i,"BB_VOID",(function(){return d})),e.d(i,"BB_SQUARES",(function(){return f}));const s=[0,9,1,10,13,21,2,29,11,14,16,18,22,25,3,30,8,12,20,28,15,17,24,7,19,27,23,6,26,5,4,31];class r{constructor(t=0,i=0){this.buf=new ArrayBuffer(8),this.p=new Uint32Array(this.buf),this.p[0]=t,this.p[1]=i}not(){return this.p[0]=~this.p[0],this.p[1]=~this.p[1],this}or(t){return this.p[0]=t.p[0]|this.p[0],this.p[1]=t.p[1]|this.p[1],this}and(t){return this.p[0]=t.p[0]&this.p[0],this.p[1]=t.p[1]&this.p[1],this}xor(t){return this.p[0]=t.p[0]^this.p[0],this.p[1]=t.p[1]^this.p[1],this}set(t,i){this.p[0]=t,this.p[1]=i}addOne(){return this.p[1]++,0===this.p[1]&&this.p[0]++,this}subOne(){return 0===this.p[1]&&this.p[0]--,this.p[1]--,this}addPer8bit(t){let i=new Uint8Array(this.buf),e=new Uint8Array(t.buf);return i[0]+=e[0],i[1]+=e[1],i[2]+=e[2],i[3]+=e[3],i[4]+=e[4],i[5]+=e[5],i[6]+=e[6],i[7]+=e[7],this}isZero(){return 0===this.p[0]&&0===this.p[1]}copy(t){return this.p[0]=t.p[0],this.p[1]=t.p[1],this}clone(){return new r(this.p[0],this.p[1])}shiftUp(){return this.p[0]=this.p[0]<<8|this.p[1]>>>24&255,this.p[1]=this.p[1]<<8,this}shiftDown(){return this.p[1]=this.p[1]>>>8|this.p[0]<<24&4278190080,this.p[0]=this.p[0]>>>8,this}shiftLeft(){return this.p[0]=(2139062143&this.p[0])<<1,this.p[1]=(2139062143&this.p[1])<<1,this}shiftRight(){return this.p[0]=(4278124286&this.p[0])>>>1,this.p[1]=(4278124286&this.p[1])>>>1,this}pureLeftShift(t){return t>0&&t<32?(this.p[0]=this.p[0]<<t|this.p[1]>>>32-t,this.p[1]=this.p[1]<<t):t>0&&t<64&&(this.p[0]=this.p[1]<<t-32,this.p[1]=0),this}pureRightShift(t){return t>0&&t<32?(this.p[1]=this.p[1]>>>t|this.p[0]<<32-t,this.p[0]=this.p[0]>>>t):t>0&&t<64&&(this.p[1]=this.p[0]>>>t-32,this.p[0]=0),this}numOfOne(){let t=this.p[0],i=this.p[1];return t=(1431655765&t)+((2863311530&t)>>>1),t=(858993459&t)+((3435973836&t)>>>2),t=(252645135&t)+((4042322160&t)>>>4),t=(16711935&t)+((4278255360&t)>>>8),t=(65535&t)+((4294901760&t)>>>16),i=(1431655765&i)+((2863311530&i)>>>1),i=(858993459&i)+((3435973836&i)>>>2),i=(252645135&i)+((4042322160&i)>>>4),i=(16711935&i)+((4278255360&i)>>>8),i=(65535&i)+((4294901760&i)>>>16),t+i}deltaSwap(t,i){let e=this.clone().pureRightShift(i).xor(this).and(t);this.xor(e),e.pureLeftShift(i),this.xor(e)}rotate90(){this.flipVertical(),this.flipDiagA8H1()}rotate180(){this.flipVertical(),this.mirrorHorizontal()}rotate270(){this.flipDiagA8H1(),this.flipVertical()}flipVertical(){let t=new r(16711935,16711935);this.deltaSwap(t,8),t.p[0]=t.p[1]=65535,this.deltaSwap(t,16),[this.p[0],this.p[1]]=[this.p[1],this.p[0]]}mirrorHorizontal(){let t=new r(1431655765,1431655765);this.deltaSwap(t,1),t.p[0]=t.p[1]=858993459,this.deltaSwap(t,2),t.p[0]=t.p[1]=252645135,this.deltaSwap(t,4)}flipDiagA1H8(){let t=new r(4042322160,252645135);this.deltaSwap(t,36),t.p[0]=t.p[1]=3435921408,this.deltaSwap(t,18),t.p[0]=t.p[1]=2852170240,this.deltaSwap(t,9)}flipDiagA8H1(){let t=new r(0,4042322160);this.deltaSwap(t,28),t.p[0]=t.p[1]=52428,this.deltaSwap(t,14),t.p[0]=t.p[1]=11141290,this.deltaSwap(t,7)}static bbSetMask(t){let i=new r;return t<32?i.p[0]=1<<31-t:i.p[1]=1<<63-t,i}static bitScan(t,i=0){let e=t.p[0];if(i<32&&(e<<=i,e>>>=i,0!=e)){return e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,e|=e>>>16,31-s[130329821*e>>>27]}if(e=t.p[1],e<<=i<32?0:i-32,e>>>=i<32?0:i-32,0!=e&&i<64){return e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,e|=e>>>16,31-s[130329821*e>>>27]+32}return-1}}const n=0,h=1,o={a1:0,b1:1,c1:2,d1:3,e1:4,f1:5,g1:6,h1:7,a2:8,b2:9,c2:10,d2:11,e2:12,f2:13,g2:14,h2:15,a3:16,b3:17,c3:18,d3:19,e3:20,f3:21,g3:22,h3:23,a4:24,b4:25,c4:26,d4:27,e4:28,f4:29,g4:30,h4:31,a5:32,b5:33,c5:34,d5:35,e5:36,f5:37,g5:38,h5:39,a6:40,b6:41,c6:42,d6:43,e6:44,f6:45,g6:46,h6:47,a7:48,b7:49,c7:50,d7:51,e7:52,f7:53,g7:54,h7:55,a8:56,b8:57,c8:58,d8:59,e8:60,f8:61,g8:62,h8:63},a=64;class p{constructor(t,i,e,s){this.color=t,this.place=i,this.flip=e,this.bbflip=s}static createFromBBFlip(t,i,e){let s=[],n=r.bitScan(e);for(;-1!==n;)s.push(n),n=r.bitScan(e,n+1);return new p(t,i,s,e)}static getPassMove(t){return t===n?l:t===h?u:void 0}}const l=new p(n,a,[],new r),u=new p(h,a,[],new r),d=new r,f=[];for(let t=0;t<=o.h8;t++)f[t]=r.bbSetMask(t);class c{constructor(){this.initialBoard=[],this.bitboard=[new r,new r],this._legalMoves=null,this.initialize()}initialize(t=[o.e4,o.d5],i=[o.e5,o.d4]){this.turn=n,this.initialBoard[n]=t,this.initialBoard[h]=i,this.playedMoves=[],this.bitboard[n].set(0,0),this.bitboard[h].set(0,0);for(let i of t)this.bitboard[n].xor(f[i]);for(let t of i)this.bitboard[h].xor(f[t]);this._legalMoves=null}get legalMoves(){return this._legalMoves||(this._legalMoves=this.generateLegalMoves()),this._legalMoves}get blackDiscNum(){return this.bitboard[n].numOfOne()}get whiteDiscNum(){return this.bitboard[h].numOfOne()}pushMove(t){let i;if(t===a)i=p.getPassMove(this.turn);else{let e=this.flip(t);this.bitboard[this.turn].xor(f[t]),this.bitboard[n].xor(e),this.bitboard[h].xor(e),i=p.createFromBBFlip(this.turn,t,e)}return this.playedMoves.push(i),this._legalMoves=null,this.turn^=1,i}popMove(){let t=this.playedMoves.pop();if(void 0!==t)return t.place!==a&&(this.bitboard[t.color].xor(f[t.place]),this.bitboard[n].xor(t.bbflip),this.bitboard[h].xor(t.bbflip)),this._legalMoves=null,this.turn^=1,t}checkGameOver(){if(0===this.generateLegalMoves().length){if(this.turn^=1,0===this.generateLegalMoves().length)return this.turn^=1,!0;this.turn^=1}return!1}generateLegalMoves(){let t=this.bitboard[this.turn],i=this.bitboard[1^this.turn],e=new r,s=new r;e.copy(t).shiftLeft().and(i);for(let t=0;t<5;t++)s.or(e.shiftLeft()),e.and(i);s.or(e.shiftLeft()),e.copy(t).shiftRight().and(i);for(let t=0;t<5;t++)s.or(e.shiftRight()),e.and(i);s.or(e.shiftRight()),e.copy(t).shiftUp().and(i);for(let t=0;t<5;t++)s.or(e.shiftUp()),e.and(i);s.or(e.shiftUp()),e.copy(t).shiftDown().and(i);for(let t=0;t<5;t++)s.or(e.shiftDown()),e.and(i);s.or(e.shiftDown()),e.copy(t).shiftLeft().shiftUp().and(i);for(let t=0;t<5;t++)s.or(e.shiftLeft().shiftUp()),e.and(i);s.or(e.shiftLeft().shiftUp()),e.copy(t).shiftLeft().shiftDown().and(i);for(let t=0;t<5;t++)s.or(e.shiftLeft().shiftDown()),e.and(i);s.or(e.shiftLeft().shiftDown()),e.copy(t).shiftRight().shiftUp().and(i);for(let t=0;t<5;t++)s.or(e.shiftRight().shiftUp()),e.and(i);s.or(e.shiftRight().shiftUp()),e.copy(t).shiftRight().shiftDown().and(i);for(let t=0;t<5;t++)s.or(e.shiftRight().shiftDown()),e.and(i);s.or(e.shiftRight().shiftDown()),e.copy(t).or(i).not(),s.and(e);let n=[],h=r.bitScan(s);for(;-1!==h;)n.push(h),h=r.bitScan(s,h+1);return n}flip(t){const i=[new r(8421504,2155905152),new r(2130706432,0),new r(16909320,270548992),new r(4202512,134480385)],e=[new r(16843009,16843008),new r(0,254),new r(132104,270549120),new r(2151686160,134480384)];let s,n,h=this.bitboard[this.turn],o=this.bitboard[1^this.turn],a=new r,p=new r;for(let l=0;l<4;l++)n=i[l],n.pureRightShift(t),p.copy(o),l&&(p.p[0]&=2122219134,p.p[1]&=2122219134),s=r.bitScan(p.not().and(n)),p.p[0]=2147483648,p.p[1]=0,p.pureRightShift(s),p.and(h),p.not().addOne().pureLeftShift(1),p.and(n),a.or(p),n=e[l],n.pureLeftShift(63-t),p.copy(o),l&&(p.p[0]&=2122219134,p.p[1]&=2122219134),p.not().and(n).not().addOne().and(n).and(h),!0!==p.isZero()&&(p.subOne(),p.and(n),a.or(p));return a}}class b{constructor(){this.isHuman=!0,this._callback=null,this._board=null}startTurn(t,i){0!==t.legalMoves.length?(this._callback=i,this._board=t):i(a)}placeDisc(t){if(this._callback&&this._board.legalMoves.includes(t)){let i=this._callback;this._callback=null,i(t)}}}function v(){}Object.assign(v.prototype,{addEventListener:function(t,i){void 0===this._listeners&&(this._listeners={});var e=this._listeners;void 0===e[t]&&(e[t]=[]),-1===e[t].indexOf(i)&&e[t].push(i)},hasEventListener:function(t,i){if(void 0===this._listeners)return!1;var e=this._listeners;return void 0!==e[t]&&-1!==e[t].indexOf(i)},removeEventListener:function(t,i){if(void 0!==this._listeners){var e=this._listeners[t];if(void 0!==e){var s=e.indexOf(i);-1!==s&&e.splice(s,1)}}},dispatchEvent:function(t){if(void 0!==this._listeners){var i=this._listeners[t.type];if(void 0!==i){t.target=this;for(var e=i.slice(0),s=0,r=e.length;s<r;s++)e[s].call(this,t)}}}});class g extends v{constructor(){super(),this.board=new c,this.players=[],this.players[n]=new b,this.players[h]=new b,this.isRunning=!1}_doMoveAndChangeTurn(t){let i=this.board.pushMove(t);if(this.dispatchEvent({type:"finishTurn",color:i.color,player:this.players[i.color],move:i}),!0===this.board.checkGameOver())return this.isRunning=!1,void this.dispatchEvent({type:"finishGame"});this.players[this.board.turn].startTurn(this.board,this._doMoveAndChangeTurn.bind(this)),this.dispatchEvent({type:"startTurn",color:this.board.turn,player:this.players[this.board.turn]})}startGame(t=this.players[n],i=this.players[h],e){this.players[n]=t,this.players[h]=i,void 0===e?this.board.initialize():this.board=e,this.isRunning=!0,this.players[this.board.turn].startTurn(this.board,this._doMoveAndChangeTurn.bind(this)),this.dispatchEvent({type:"startTurn",player:this.players[this.board.turn]})}undo(){if(!this.players[this.board.turn].isHuman)return;let t;do{if(t=this.board.popMove(),void 0===t)break;this.dispatchEvent({type:"undo",move:t})}while(!this.players[t.color].isHuman||t.place===a);this.players[this.board.turn].startTurn(this.board,this._doMoveAndChangeTurn.bind(this)),this.dispatchEvent({type:"startTurn",color:this.board.turn,player:this.players[this.board.turn]})}}class y{constructor(){this.isComputer=!0}startTurn(t,i){setTimeout(this.computeMove.bind(this,t,i),0)}computeMove(t,i){throw new Error("You need to override 'compute' method")}}class w extends y{constructor(){super()}computeMove(t,i){let e=t.legalMoves;0!==e.length?i(e[Math.floor(Math.random()*e.length)]):i(a)}}class M extends y{constructor(){super(),this.color}computeMove(t,i){this.color=t.turn;let e,s=a,r=-1/0;for(let i of t.legalMoves)t.pushMove(i),e=-this._alphaBetaEval(t,3,-1/0,1/0),r<e&&(r=e,s=i),t.popMove(i);i(s)}_alphaBetaEval(t,i,e,s){if(i<=0)return this._evalute(t,t.turn);if(0===t.legalMoves.length)return t.pushMove(a),e=-this._alphaBetaEval(t,i-1,-s,-e),t.popMove(),e;for(let r of t.legalMoves)if(t.pushMove(r),e=Math.max(e,-this._alphaBetaEval(t,i-1,-s,-e)),t.popMove(),e>=s)return e;return e}_evalute(t,i){const e=[0,100,-50,100,10,100,-50,100];let s=0,r=t.bitboard[i].clone(),n=r.p[0]>>>24,h=255&r.p[1];return s+=o(n),s+=o(h),r.rotate90(),n=r.p[0]>>>24,h=255&r.p[1],s+=o(n),s+=o(h),r.copy(t.bitboard[1^i]),n=r.p[0]>>>24,h=255&r.p[1],s-=o(n),s-=o(h),r.rotate90(),n=r.p[0]>>>24,h=255&r.p[1],s-=o(n),s-=o(h),r.copy(t.bitboard[i]),r.p[0]&=2151686160,r.p[1]&=134480385,n=16843009*(r.p[0]|r.p[1])>>>24,s+=o(n),r.copy(t.bitboard[i]),r.p[0]&=16909320,r.p[1]&=270549120,n=16843009*(r.p[0]|r.p[1])>>>24,s+=o(n),r.copy(t.bitboard[1^i]),r.p[0]&=2151686160,r.p[1]&=134480385,n=16843009*(r.p[0]|r.p[1])>>>24,s-=o(n),r.copy(t.bitboard[1^i]),r.p[0]&=16909320,r.p[1]&=270549120,n=16843009*(r.p[0]|r.p[1])>>>24,s-=o(n),s;function o(t){return e[7&t]+e[function(t){switch(t){case 0:case 2:case 5:case 7:return t;case 1:return 4;case 3:return 6;case 4:return 1;case 6:return 3;default:throw new Error}}(t>>>5)]}}}}]);