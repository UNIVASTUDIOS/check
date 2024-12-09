// 0 - normal
// 1 - dls
// 2 - tls
// 3 - dws
// 4 - tws
// 5 - star

import Tile from "./Tile.js"
import { DLS, DWS, TLS, TWS, STAR } from "./concreteTiles.js";
import Letter from "./Letter.js";
import Player from "./Player.js";
import LetterFactory from "./LetterFactory.js";
import Word from "./Word.js";
import Bag from "./Bag.js";

import dictionary from "./dictionary.js"

const boardMap = [
    4, 0, 0, 1, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 4,
    0, 3, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 3, 0,
    0, 0, 3, 0, 0, 0, 1, 0, 1, 0, 0, 0, 3, 0, 0,
    1, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 1,
    0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0,
    0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0,
    0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0,
    4, 0, 0, 1, 0, 0, 0, 5, 0, 0, 0, 1, 0, 0, 4,
    0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0,
    0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0,
    0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0,
    1, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 1,
    0, 0, 3, 0, 0, 0, 1, 0, 1, 0, 0, 0, 3, 0, 0,
    0, 3, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 3, 0,
    4, 0, 0, 1, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 4
]

const grid = document.querySelector('#gameBoard')

// console.log(grid.children[1].getBoundingClientRect().x);

const newBoardMap = boardMap.map((number, index) => {
    if(number == 0) {
        const tile = new Tile(index);

        return tile;
    }
    if(number == 1) {
        const tile = new DLS(index);

        grid.children[index].style.backgroundColor = "#c3e7f4"
        grid.children[index].innerHTML = `<span>${tile.name}</span>`

        return tile;
    }
    if(number == 2) {
        const tile = new TLS(index);

        grid.children[index].style.backgroundColor = "#60b5da"
        grid.children[index].innerHTML = `<span>${tile.name}</span>`

        return tile;
    }
    if(number == 3) {
        const tile = new DWS(index);

        grid.children[index].style.backgroundColor = "#f3afba"
        grid.children[index].innerHTML = `<span>${tile.name}</span>`

        return tile;
    }
    if(number == 4) {
        const tile = new TWS(index);

        grid.children[index].style.backgroundColor = "#f65464"
        grid.children[index].innerHTML = `<span>${tile.name}</span>`

        return tile;
    }
    if(number == 5) {
        const tile = new STAR(index);

        grid.children[index].style.backgroundColor = "#f3afba"
        grid.children[index].innerHTML = `<span>${tile.name}</span>`
        grid.children[index].innerHTML = `<span style="font-size: 11px">${tile.name}</span>`

        return tile;
    }
});

function getRoomID() {
    const url = window.location

    // console.log(new URL(url));

    const roomID = new URL(url).searchParams.get('id')

    return roomID;
}

function joinGame(socket, roomID) {
    socket.emit('join_game', roomID)
}

const dev = 'http://localhost:3000/scrabble';
const prod = '';

const socket = io(dev, {
    autoConnect: false
})

socket.connect();

const roomID = getRoomID();

console.log(roomID);

joinGame(socket, roomID);

let canPlay = true;

socket.on('created_game', (arrayAlphabets) => {
    const finalLetters = LetterFactory.genLettersWithAlphabet(arrayAlphabets);

    console.log(finalLetters);

    startGame(finalLetters);
})

socket.on('joined_game', (arrayAlphabets) => {
    canPlay = false;

    const finalLetters = LetterFactory.genLettersWithAlphabet(arrayAlphabets);

    console.log(finalLetters);

    startGame(finalLetters);
})

function startGame(finalLetters = [new Letter()]) {
    socket.on('update_bag', (arrayAlphabets) => {
        finalLetters = LetterFactory.genLettersWithAlphabet(arrayAlphabets);

        console.log("on update bag", finalLetters);
    })

    const letterBG = "./assets/letterBG.jpg";

    function genRandomPlayerLetters(totalLetters, range) {
        const randomLetters = [new Letter()];
        randomLetters.splice(0, 1);

        for(let i = 0; i < range; ++i) {
            const randomIndex = Math.floor(Math.random() * totalLetters.length);

            const randomLetter = totalLetters[randomIndex];

            randomLetters.push(randomLetter);

            totalLetters.splice(randomIndex, 1);
        }

        return randomLetters;
    }

    let playerLetters = [...genRandomPlayerLetters(finalLetters, 7)];

    socket.emit('update_bag', roomID, finalLetters.map(letter => letter.alphabet));

    function isColliding(x1, y1, w1, h1, x2, y2, w2, h2) {
        if(
            x1 + w1 > x2 &&
            x1 < x2 + w2 &&
            y1 + h1 > y2 &&
            y1 < y2 + h2
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    function resetLetterRack(currentElement) {
        currentElement.style.position = "relative";
        currentElement.style.left = "0";
        currentElement.style.top = "0";
    }

    const wordBoard = document.querySelector('#wordBoard');

    const playedWords = [new Word()];

    playedWords.splice(0, 1);

    const playedTiles = [new Tile()];

    playedTiles.splice(0, 1);

    // console.log(grid.childNodes);

    const collidingTiles = [];

    function removeTileFromPlayed(currentElement, playedTiles, collidingTiles) {
        const placedIndex = currentElement.getAttribute('data-setIndex');
        if(placedIndex != null) {
            currentElement.setAttribute('data-setIndex', null);

            let indexToRemove;

            playedTiles.forEach((playedTile, index) => {
                if(playedTile.index == placedIndex) {
                    const alpha = playedTile.getLetter().alphabet;
                    const score = playedTile.getLetter().score;

                    playerLetters.push(new Letter(alpha, score, letterBG))

                    playedTile.letter = new Letter();

                    indexToRemove = index;
                }
            })

            playedTiles.splice(indexToRemove, 1);


            // console.log(playedTiles);
        }

        resetLetterRack(currentElement);

        collidingTiles.splice(0, collidingTiles.length);
    }

    function tileOnTouchStart(e, currentElement) {
        if(!canPlay) return;

        console.log("touch start");

        const placedIndex = currentElement.getAttribute('data-setIndex');
        if(placedIndex != null) {
            currentElement.setAttribute('data-setIndex', null);

            let indexToRemove;

            playedTiles.forEach((playedTile, index) => {
                if(playedTile.index == placedIndex) {
                    const alpha = playedTile.getLetter().alphabet;
                    const score = playedTile.getLetter().score;

                    playerLetters.push(new Letter(alpha, score, letterBG))

                    playedTile.letter = new Letter();

                    indexToRemove = index;
                }
            })

            playedTiles.splice(indexToRemove, 1);


            // console.log(playedTiles);
        }

        collidingTiles.splice(0, collidingTiles.length);

        // console.log(placedIndex);

        currentElement.style.position = "absolute";

        currentElement.style.left = e.touches[0].clientX - 10 + "px";
        currentElement.style.top = e.touches[0].clientY - 10 + "px";
    }

    function tileOnTouchMove(e, currentElement) {
        if(!canPlay) return;
        currentElement.style.left = (e.touches[0].clientX - 10) + "px";
        currentElement.style.top = (e.touches[0].clientY - 10) + "px";

        // const x1 = e.touches[0].clientX - 10
        // const y1 = e.touches[0].clientY - 10
        
        // for(let i = 0; i < grid.children.length; ++i) {
        //     const currentCell = grid.children.item(i);

        //     const x2 = currentCell.getBoundingClientRect().x;
        //     const y2 = currentCell.getBoundingClientRect().y;

        //     if(isColliding(x1, y1, 20, 20, x2, y2, 20, 20)) {
        //         console.log(true);
        //     }
        // }
    }

    function tileOnTouchEnd(e, currentElement, currentLetter) {
        if(!canPlay) return;
        let collision = false;

        const x1 = currentElement.getBoundingClientRect().x;
        const y1 = currentElement.getBoundingClientRect().y;
        
        for(let i = 0; i < grid.children.length; ++i) {
            const currentCell = grid.children.item(i);
            currentCell.setAttribute('data-index', i);

            const x2 = currentCell.getBoundingClientRect().x;
            const y2 = currentCell.getBoundingClientRect().y;

            if(isColliding(x1, y1, 20, 20, x2, y2, 20, 20)) {
                collision = true;
                // console.log(currentCell);
                collidingTiles.push(currentCell);
            }
        }

        const collidingTilesInfo = collidingTiles.map((tile, index) => {
            const x2 = tile.getBoundingClientRect().x;
            const y2 = tile.getBoundingClientRect().y;

            const x1Overlap1 = Math.abs((x1 + 20) - x2);
            const x1Overlap2 = Math.abs(x1 - (x2 + 20));

            const y1Overlap1 = Math.abs((y1 + 20) - y2);
            const y1Overlap2 = Math.abs(y1 - (y2 + 20));

            // console.log(x1Overlap1, x1Overlap2);
            // console.log(y1Overlap1, y1Overlap2);

            const minX = Math.min(x1Overlap1, x1Overlap2);
            const minY = Math.min(y1Overlap1, y1Overlap2);

            const areaOfOverlap = minX * minY;

            return {[areaOfOverlap]: tile}
        })

        const maxArea = collidingTilesInfo.reduce((prev, curr) => {
            for(const key in curr) {
                return Number(key) > prev ? Number(key) : prev
            }
        }, 0);

        const finalArr = collidingTilesInfo.filter(tileInfo => tileInfo[maxArea]);

        if(finalArr.length == 0) {
            resetLetterRack(currentElement);

            return
        };

        const finalTile = finalArr[0][maxArea];

        const currentCellMapIndex = Number(finalTile.getAttribute('data-index'));

        const playedTile = newBoardMap[currentCellMapIndex];

        // console.log(playedTile);

        if(playedTile.letter.alphabet != '') {
            resetLetterRack(currentElement);

            return
        }

        const finalX = finalTile.getBoundingClientRect().x;
        const finalY = finalTile.getBoundingClientRect().y;

        currentElement.style.left = finalX + "px";
        currentElement.style.top = finalY + "px";

        // const currentCellMapIndex = Number(finalTile.getAttribute('data-index'));

        // const playedTile = newBoardMap[currentCellMapIndex];

        playedTile.setLetter(currentLetter);

        currentElement.setAttribute('data-setIndex', currentCellMapIndex);

        currentLetter.setIndexPlaced(currentCellMapIndex);

        playedTiles.push(playedTile);

        playerLetters = playerLetters.filter(letter => letter != currentLetter);

        // console.log(playedTile);

        // console.log(newBoardMap[currentCellMapIndex]);

        // console.log(currentLetter);

        // console.log(finalTile);

        // console.log(collidingTilesInfo);

        // console.log(maxArea, collidingTilesInfo);

        // console.log(Math.max(collidingTilesInfo.re));

        // console.log(collidingTilesInfo);

        // console.log(collidingTiles);
        // console.log(currentElement.style.left, currentElement.style.top);

        // console.log(playedTiles);
    }

    for(let i = 0; i < wordBoard.children.length; ++i) {
        const currentElement = wordBoard.children.item(i);

        const currentLetter = playerLetters[i];
        const url = currentLetter.bg;
        const letter = currentLetter.alphabet;
        const score = currentLetter.score;

        // console.log(currentElement.style);
        // console.log(grid.children[0].style.getBoundingClientRect());
        // currentElement.width = 100

        // console.log(grid.children[0].getBoundingClientRect().width, grid.children[0].getBoundingClientRect().height);

        currentElement.style.width = grid.children[0].getBoundingClientRect().width + "px";
        currentElement.style.height = grid.children[0].getBoundingClientRect().height + "px";
        currentElement.style.backgroundImage = `url('${url}')`
        currentElement.innerHTML = `${letter}<span>${score}</span>`

        currentElement.addEventListener('touchstart', (e) => tileOnTouchStart(e, currentElement))

        currentElement.addEventListener('touchmove', (e) => tileOnTouchMove(e, currentElement))

        currentElement.addEventListener('touchend', (e) => tileOnTouchEnd(e, currentElement, currentLetter))
    }

    const playTurnButton = document.querySelector('#lowerUI button');

    playTurnButton.addEventListener('click', update)

    let playerTurn = 0;

    const player1 = new Player(0);
    const player2 = new Player(1);

    const players = [player1, player2];

    let currentPlayer = players[playerTurn];

    const scoreBoard = document.querySelector('#scoreBoard');

    /**
     * @param {Array<{index: number, letterAlphabet: string, letterScore: number, totalScore: number}>} state
     */

    function handleStateUpdate(state) {
        state.forEach(tileState => {
            const letter = new Letter(tileState.letterAlphabet, tileState.letterScore, letterBG)
            const tile = newBoardMap[tileState.index]

            if(tile.getLetter().alphabet != '') {
                return;
            }

            letter.setIndexPlaced(tileState.index)
            tile.setLetter(letter)

            const currentGridCell = grid.children[tileState.index];

            const letterDiv = document.createElement('div')

            document.body.appendChild(letterDiv);

            letterDiv.style.width = grid.children[0].getBoundingClientRect().width + "px";
            letterDiv.style.height = grid.children[0].getBoundingClientRect().height + "px";
            letterDiv.style.paddingTop = wordBoard.children[0].style.paddingTop;
            letterDiv.style.paddingLeft = wordBoard.children[0].style.paddingLeft;
            letterDiv.style.position = "absolute"
            letterDiv.style.backgroundImage = `url('${letterBG}')`
            letterDiv.innerHTML = `${tileState.letterAlphabet}<span style='font-size: 8px'>${tileState.letterScore}</span>`

            letterDiv.style.left = currentGridCell.getBoundingClientRect().x + "px";
            letterDiv.style.top = currentGridCell.getBoundingClientRect().y + "px";

            // currentPlayer.setTotalScore(newTotalScore);

            scoreBoard.children[1].children[1].textContent = tileState.totalScore;

        })

        updateTurn()

        canPlay = true;
    }

    socket.on('update_state', handleStateUpdate)

    function update(e) {
        console.log("played", playedTiles);
        if(playedTiles.length < 1) {
            updateTurn();

            const state = [];

            // console.log(playedTiles);

            socket.emit('update_state', roomID, state);

            canPlay = false;

            return;
        }

        const isCorrectlyPlaced = checkPlayedTiles();

        if(!isCorrectlyPlaced) {
            return
        }

        const word = convertToWord(playedTiles);

        console.log(word);

        const isWord = checkIfWord(word);

        if(!isWord) {
            alert("NOT A WORD");

            for(let i = 0; i < wordBoard.children.length; ++i) {
                const currentElement = wordBoard.children[i];

                const indexPlaced = currentElement.getAttribute('data-setIndex')

                if(indexPlaced != null && playedTiles.map(tile => tile.index).includes(Number(indexPlaced))) {
                    removeTileFromPlayed(currentElement, playedTiles, collidingTiles);
                }
            }

            playedTiles.splice(0, playedTiles.length);

            return
        }

        playedWords.push(word);
        // console.log("go on");

        const finalWordScore = calculateWordScore();

        const currentPlayer = players[playerTurn];

        console.log("current player", currentPlayer);

        const currentPlayerTotalScore = currentPlayer.getTotalScore();

        console.log("old", currentPlayerTotalScore);
        console.log("new", finalWordScore);

        const newTotalScore = currentPlayerTotalScore + finalWordScore

        currentPlayer.setTotalScore(newTotalScore);

        scoreBoard.children[0].children[1].textContent = newTotalScore;

        updateTurn();

        const state = [];

        playedTiles.forEach(tile => {
            const tileState = {
                index: tile.index,
                letterAlphabet: tile.getLetter().alphabet,
                letterScore: tile.getLetter().score,
                totalScore: newTotalScore
            }

            state.push(tileState);
        })

        // console.log(playedTiles);

        socket.emit('update_state', roomID, state);

        console.log(playerLetters.length, playedTiles.length);

        console.log(playerLetters);

        replacePlayedLetters(7 - playerLetters.length);

        playedTiles.splice(0, playedTiles.length);

        socket.emit('update_bag', roomID, finalLetters.map(letter => letter.alphabet));

        console.log("update bag", finalLetters);

        canPlay = false;
    }

    function replacePlayedLetters(amountToReplace) {
        const newLetters = genRandomPlayerLetters(finalLetters, amountToReplace);

        newLetters.forEach(newLetter => {
            const letterDiv = document.createElement('div');
            letterDiv.style.width = grid.children[0].getBoundingClientRect().width + "px";
            letterDiv.style.height = grid.children[0].getBoundingClientRect().height + "px";
            letterDiv.style.position = "relative"
            letterDiv.style.backgroundImage = `url('${newLetter.bg}')`
            letterDiv.innerHTML = `${newLetter.alphabet}<span style='font-size: 8px'>${newLetter.score}</span>`

            wordBoard.appendChild(letterDiv)

            letterDiv.addEventListener('touchstart', (e) => tileOnTouchStart(e, letterDiv))

            letterDiv.addEventListener('touchmove', (e) => tileOnTouchMove(e, letterDiv))

            letterDiv.addEventListener('touchend', (e) => tileOnTouchEnd(e, letterDiv, newLetter))

            playerLetters.push(newLetter);
        })

        console.log("added new letters", newLetters);
    }

    function isHorizontal(indices) {
        if(indices.length < 2) return false;

        const differences = indices.slice(1).map((index, i) => index - indices[i]);

        return differences.every(diff => diff === 1);
    }

    function isVertical(indices, numColumns) {
        if(indices.length < 2) return false;

        const expectedDifference = numColumns;

        const differences = indices.slice(1).map((index, i) => index - indices[i]);

        return differences.every(diff => diff === expectedDifference);
    }

    function checkHorizontalDiff(indices) {
        const indicesToCheck = [];

        const first = indices[0];

        indicesToCheck.push(first);

        for(let i = 1; i < 225; ++i) {
            const newIndex = first + i;

            if(newIndex % 15 == 0) break;

            const tile = newBoardMap[newIndex];

            if(tile.getLetter().alphabet == '') {
                break
            }
            else {
                indicesToCheck.push(newIndex);
            }
        }

        console.log("hori", indicesToCheck);

        return indicesToCheck;

    }

    function checkVerticalDiff(indices) {
        const indicesToCheck = [];

        const first = indices[0];

        indicesToCheck.push(first);

        for(let i = 15; i < 225; i += 15) {
            const newIndex = first + i;

            if(newIndex > 224) break;

            const tile = newBoardMap[newIndex];

            if(tile.getLetter().alphabet == '') {
                break
            }
            else {
                indicesToCheck.push(newIndex);
            }
        }

        console.log("verti", indicesToCheck);

        return indicesToCheck;
    }

    function convertToWord(playedTiles = [new Tile()]) {
        const letterArray = playedTiles.sort((a, b) => a.index - b.index).map(tile => tile.getLetter());

        const word = new Word(letterArray);

        return word;
    }

    function checkIfWord(word) {
        const wordToCheck = word.word;

        const isWord = dictionary.includes(wordToCheck);

        // console.log(isWord);

        return isWord;
    }

    function checkBeforeHori(indices = [0]) {
        const moreIndices = [0];
        moreIndices.splice(0, 1);

        let end = false;

        let currentIndex = indices[0];

        while(!end) {
            let prevIndex = currentIndex - 1;

            if(prevIndex < 0) {
                end = true;

                break;
            }
            else {
                const tile = newBoardMap[prevIndex];

                if(tile.getLetter().alphabet == '') {
                    end = true;

                    break
                }
                else {
                    moreIndices.push(prevIndex);
                }
            }

            --currentIndex;
        }

        return moreIndices.sort((a, b) => a - b);
    }

    function checkBeforeVerti(indices = [0]) {
        const moreIndices = [0];
        moreIndices.splice(0, 1);

        let end = false;

        let currentIndex = indices[0];

        while(!end) {
            let prevIndex = currentIndex - 15;

            if(prevIndex % 15 == 14) {
                end = true;

                break;
            }
            else {
                const tile = newBoardMap[prevIndex];

                if(tile.getLetter().alphabet == '') {
                    end = true;

                    break
                }
                else {
                    moreIndices.push(prevIndex);
                }
            }

            currentIndex -= 15;
        }

        return moreIndices.sort((a, b) => a - b);
    }

    function checkPlayedTiles() {
        const tileIndices = playedTiles.map(tile => tile.index).sort((a, b) => a - b);

        const verticalToCheck = checkVerticalDiff(tileIndices);
        const horizontalToCheck = checkHorizontalDiff(tileIndices);

        if(verticalToCheck.length < tileIndices.length && horizontalToCheck.length < tileIndices.length) {
            alert('WRONG X2');

            return false
        }

        const isHori = isHorizontal(horizontalToCheck);
        const isVert = isVertical(verticalToCheck, 15);

        console.log(isHori, isVert);

        if(!isHori && !isVert) {
            // console.log(tileIndices);

            alert('WRONG');

            return false;
        }
        else {
            if(isHori && !isVert) {
                const moreIndices = checkBeforeHori(horizontalToCheck);

                const moreTiles = moreIndices.map(index => newBoardMap[index]);

                console.log("more tiles", moreTiles);

                const finalHorizontalToCheck = moreIndices.concat(horizontalToCheck)

                const newTilesIndices = finalHorizontalToCheck.filter(index => tileIndices.indexOf(index) == -1);

                // console.log("unq hori", newTilesIndices);

                newTilesIndices.forEach(index => {
                    const tile = newBoardMap[index];

                    playedTiles.push(tile);
                })
            }
            else if(!isHori && isVert) {
                const moreIndices = checkBeforeVerti(verticalToCheck);

                const moreTiles = moreIndices.map(index => newBoardMap[index]);

                console.log("more tiles", moreTiles);

                const finalVerticalToCheck = moreIndices.concat(verticalToCheck)

                const newTilesIndices = finalVerticalToCheck.filter(index => tileIndices.indexOf(index) == -1);

                // console.log("unq vert", newTilesIndices);

                newTilesIndices.forEach(index => {
                    const tile = newBoardMap[index];

                    playedTiles.push(tile);
                })
            }
            else {
                
            }

            // console.log(playedTiles);

            return true;
        }
    }

    function calculateWordScore() {
        console.log(playedTiles);
        const preWordScore = playedTiles.reduce((prevScore, tile) => {
            return (tile.letterMultiplier * tile.getLetter().score) + prevScore;
        }, 0);

        const finalWordScore = playedTiles.reduce((prevWordScore, tile) => prevWordScore * tile.wordMultiplier, preWordScore)

        return finalWordScore;

        // console.log(preWordScore, finalWordScore);
    }

    function updateTurn() {
        playerTurn = playerTurn == 0 ? 1 : 0;

        currentPlayer = players[playerTurn];
    }
}