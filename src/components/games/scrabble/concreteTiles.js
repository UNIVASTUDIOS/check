import Tile from "./Tile.js";

export class DLS extends Tile {
    constructor(index) {
        super(index);
        this.name = "DOUBLE LETTER SCORE"
        this.letterMultiplier = 2;
        
    }
}

export class TLS extends Tile {
    constructor(index) {
        super(index);
        this.name = "TRIPLE LETTER SCORE"
        this.letterMultiplier = 3;
        
    }
}

export class DWS extends Tile {
    constructor(index) {
        super(index);
        this.name = "DOUBLE WORD SCORE"
        this.wordMultiplier = 2;
        
    }
}

export class TWS extends Tile {
    constructor(index) {
        super(index);
        this.name = "TRIPLE WORD SCORE"
        this.wordMultiplier = 3;
        
    }
}

export class STAR extends Tile {
    constructor(index) {
        super(index);
        this.name = "★"
        
    }
}