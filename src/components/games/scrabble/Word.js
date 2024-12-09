import Letter from "./Letter.js";

export default class Word {
    lettersArray = [new Letter()];
    word = "";
    orientation = "";

    constructor(lettersArray = [new Letter], orientation = "") {
        this.lettersArray.splice(0, 1);

        this.lettersArray = lettersArray;

        this.word = lettersArray.map(letter => letter.alphabet).join("");
        
        this.orientation = orientation
    }

    getWord() {
        return this.word;
    }
}