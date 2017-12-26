

export default class ComputerPlayer {

    constructor() {
        this.isComputer = true;
    }

    startTurn(board, callback) {

        setTimeout(this.computeMove, 0, board, callback);

    }

    compute(board, callback) {

        throw new Error("Override 'compute' method");

    }

}