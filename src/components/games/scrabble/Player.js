export default class Player {
    playerNumber = 0;
    turnScore = 0;
    totalScore = 0;

    constructor(playerNumber) {
        this.playerNumber = playerNumber;
    }

    setTotalScore(totalScore) {
        this.totalScore = totalScore;
    }

    getTotalScore() {
        return this.totalScore
    }

    setTurnScore(turnScore) {
        this.turnScore = turnScore;
    }
}