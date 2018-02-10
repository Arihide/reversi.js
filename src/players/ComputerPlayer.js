

export default class ComputerPlayer {

    constructor() {
        this.isComputer = true;
    }

    startTurn(board, callback) {

        setTimeout(this.computeMove.bind(this, board, callback), 0);

    }

    computeMove(board, callback) {

        throw new Error("You need to override 'compute' method");

    }

}