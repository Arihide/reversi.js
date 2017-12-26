import Bitop from './Bitop';
import {Squares as S} from './constants';

export const BB_VOID = new Bitop();

export const BB_SQUARES = [];
for (let isquare = 0; isquare <= S.h8; isquare++) {

    BB_SQUARES[isquare] = Bitop.bbSetMask(isquare);
    
};

