import Bitop from './Bitop';
import { Black, White, Pass } from './constants';

export default class Move {

    constructor(color, place, flip, bbflip) {
        this.color = color;
        this.place = place;
        this.flip = flip
        this.bbflip = bbflip;
    }

    static createFromBBFlip(color, place, bbflip) {

        let flip = [];
        let fs = Bitop.bitScan(bbflip);
        while (fs !== -1) {
            flip.push(fs);
            fs = Bitop.bitScan(bbflip, fs + 1);
        }

        return new Move(color, place, flip, bbflip);

    }

    static getPassMove(color) {

        if(color === Black){
            return blackPassMove;
        }else if(color === White){
            return whitePassMove;
        }


    }

}


const blackPassMove = new Move(Black, Pass, [], new Bitop());
const whitePassMove = new Move(White, Pass, [], new Bitop());