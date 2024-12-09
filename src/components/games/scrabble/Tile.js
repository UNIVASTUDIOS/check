import Letter from "./Letter.js";

export default class Tile {
    index = 0;
    name = '';
    wordMultiplier = 1;
    letterMultiplier = 1;
    letter = new Letter();

    constructor(index) {
        this.index = index;
    }

    setLetter(letter) {
        this.letter = letter;
    }

    getLetter() {
        return this.letter;
    }

    reset() {
        this.letter = new Letter();
    }
}