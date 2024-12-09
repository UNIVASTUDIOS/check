import { useEffect, useState } from "react"
import Overhead from "./Overhead"

import socket from "./socket"

import Tile from "./Tile.js"
import { DLS, DWS, TLS, TWS, STAR } from "./concreteTiles.js";
import Letter from "./Letter.js";
import Player from "./Player.js";
import LetterFactory from "./LetterFactory.js";
import Word from "./Word.js";
import Bag from "./Bag.js";

import dictionary from "./dictionary.js"
import Waiting from "../Waiting";

export default function SGame(props) {
    const [playerInfo, setPlayerInfo] = useState({
        playerOneInfo: {
            username: '',
            socketID: '',
            avatar: ''
        },
        playerTwoInfo: {
            username: '',
            socketID: '',
            avatar: ''
        }
    })

    const [start, setStart] = useState(false);

    const [currentTurn, setCurrentTurn] = useState(0);
    // const currentTurn = {
    //     turn: 0
    // }

    useEffect(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
            // const url = window.location
        
            // // console.log(new URL(url));
        
            // const roomID = new URL(url).searchParams.get('id')
        
            // return roomID;
            const url = new URL(window.location)

            const search = url.hash

            const searchParams = new URLSearchParams(search)

            const roomID = Array.from(searchParams.entries())[0][1]

            console.log(url, Array.from(searchParams.entries()));

            return roomID;
        }
        
        function joinGame(socket, roomID) {
            const userData = JSON.parse(sessionStorage.getItem('token'));

            const userContextData = userData;

            console.log(userContextData);

            const username = props.user.username;
            const avatar = props.user.avatar;

            socket.emit('join_game', roomID, username, avatar)
        }
        
        socket.connect();
        
        const roomID = getRoomID();
        
        console.log(roomID);
        
        joinGame(socket, roomID);
        
        let canPlay = true;

        const listeners = []

        function removeAllListeners() {
            console.log("removing listeners");
            listeners.forEach(listener => {
                listener.element.removeEventListener(listener.eventType, listener.handler)
            })

            listeners.splice(0, listeners.length)

            console.log("done");
        }

        // startGame(LetterFactory.genLetters());
        
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

        socket.on('start_game', (playerOneInfo, playerTwoInfo) => {
            setPlayerInfo({
                playerOneInfo: playerOneInfo,
                playerTwoInfo: playerTwoInfo
            })

            setStart(true);
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
        
            // removes TILE from played
            function removeTileFromPlayed(currentElement, playedTiles, collidingTiles) {
                const placedIndex = currentElement.getAttribute('data-setIndex');
                if(placedIndex != null) {
                    currentElement.setAttribute('data-setIndex', null);
        
                    let indexToRemove;
                    let indicesToRemove = [];
        
                    playedTiles.forEach((playedTile, index) => {
                        if(playedTile.index == placedIndex) {
                            const alpha = playedTile.getLetter().alphabet;
                            const score = playedTile.getLetter().score;
                            console.log("played tile before removal", alpha);
        
                            playerLetters.push(new Letter(alpha, score, letterBG))
        
                            playedTile.letter = new Letter();

                            console.log(playedTile);
        
                            indexToRemove = index;
                            // indicesToRemove.push(index);
                        }
                    })

                    // indicesToRemove.in

                    // playedTiles.splice(0);
                    
                    // playedTiles = playedTiles.filter(playedTile => !indicesToRemove.includes(playedTile.index));
                    playedTiles.splice(indexToRemove, 1);
        
        
                    // console.log(playedTiles);
                }
        
                resetLetterRack(currentElement);
        
                collidingTiles.splice(0, collidingTiles.length);
            }

            function notMobileDown(currentElement, onMove, e) {
                tileOnTouchStart(e, currentElement)
                currentElement.addEventListener('mousemove', onMove)
            }

            function notMobileUp(currentElement, currentLetter, onMove, e) {
                tileOnTouchEnd(e, currentElement, currentLetter)
                currentElement.removeEventListener('mousemove', onMove);
            }

            // let notMobileDown = desk.bind(null, )

        
            function tileOnTouchStart(currentElement, e) {
                // e.preventDefault();
                currentElement.style.zIndex = 1;
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

                            // playerLetters
        
                            playerLetters.push(playedTile.getLetter())
        
                            playedTile.letter = new Letter();
        
                            indexToRemove = index;

                            console.log("tile", playedTile);
                        }
                    })
        
                    playedTiles.splice(indexToRemove, 1);
        
        
                    // console.log(playedTiles);
                }
        
                collidingTiles.splice(0, collidingTiles.length);
        
                // console.log(placedIndex);
        
                currentElement.style.position = "absolute";
                // console.log(e);

                if(isMobile) {
                    currentElement.style.left = e.touches[0].clientX - 10 + "px";
                    currentElement.style.top = e.touches[0].clientY - 10 + "px";
                }
                else {
                    currentElement.style.left = e/* .touches[0] */.clientX - 10 + "px";
                    currentElement.style.top = e/* .touches[0] */.clientY - 10 + "px";
                }
            }
        
            function tileOnTouchMove(currentElement, e) {
                if(!canPlay) return;
                if(isMobile) {
                    currentElement.style.left = e.touches[0].clientX - 10 + "px";
                    currentElement.style.top = e.touches[0].clientY - 10 + "px";
                }
                else {
                    currentElement.style.left = e/* .touches[0] */.clientX - 10 + "px";
                    currentElement.style.top = e/* .touches[0] */.clientY - 10 + "px";
                }
        
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
        
            function tileOnTouchEnd(currentElement, currentLetter, e) {
                console.log("touchend");
                currentElement.style.zIndex = 0;
                if(!canPlay) return;
                let collision = false;
        
                const x1 = currentElement.getBoundingClientRect().x;
                const y1 = currentElement.getBoundingClientRect().y;

                // console.log("tile coord", x1, y1);
                
                for(let i = 0; i < grid.children.length; ++i) {
                    const currentCell = grid.children.item(i);
                    currentCell.setAttribute('data-index', i);
        
                    const x2 = currentCell.getBoundingClientRect().x;
                    const y2 = currentCell.getBoundingClientRect().y;

                    // console.log(x2, y2);
        
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
        
                console.log("current state of played tiles", playedTiles);
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

                const onMove = function(e) {
                    tileOnTouchMove(e, currentElement);
                }

                if(!isMobile) {
                    const boundDown = notMobileDown.bind(null, currentElement, onMove)
                    currentElement.addEventListener('mousedown', boundDown)

                    listeners.push(
                        {
                            element: currentElement,
                            eventType: 'mousedown',
                            handler: boundDown
                        }
                    )

                    const boundUp = notMobileUp.bind(null, currentElement, currentLetter, onMove)
                    currentElement.addEventListener('mouseup', boundUp)

                    listeners.push(
                        {
                            element: currentElement,
                            eventType: 'mouseup',
                            handler: boundUp
                        }
                    )
                }
                else {
                    const boundStart = tileOnTouchStart.bind(null, currentElement);
                    const boundMove = tileOnTouchMove.bind(null, currentElement)
                    const boundEnd = tileOnTouchEnd.bind(null, currentElement, currentLetter)

                    currentElement.addEventListener('touchstart', boundStart)

                    listeners.push({
                        element: currentElement,
                        eventType: 'touchstart',
                        handler: boundStart
                    })

                    currentElement.addEventListener('touchmove', boundMove)

                    listeners.push({
                        element: currentElement,
                        eventType: 'touchmove',
                        handler: boundMove
                    })

                    currentElement.addEventListener('touchend', boundEnd)

                    listeners.push({
                        element: currentElement,
                        eventType: 'touchend',
                        handler: boundEnd
                    })
                }
        
                // currentElement.addEventListener(`${isMobile ? 'touchstart' : 'mousedown'}`, (e) => {
                //     tileOnTouchStart(e, currentElement)
                //     if(!isMobile) {
                //         currentElement.addEventListener('mousemove', onMove)
                //     }
                // })

                // if(isMobile) {
                //     currentElement.addEventListener('touchmove', onMove)
                // }
        
        
                // currentElement.addEventListener(`${isMobile ? 'touchend' : 'mouseup'}`, (e) => {
                //     tileOnTouchEnd(e, currentElement, currentLetter)
                //     if(!isMobile) {
                //         currentElement.removeEventListener('mousemove', onMove);
                //     }
                // })
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

                    const gameSection = document.querySelector('#game-section');
        
                    gameSection.appendChild(letterDiv);
        
                    letterDiv.style.width = grid.children[0].getBoundingClientRect().width + "px";
                    letterDiv.style.height = grid.children[0].getBoundingClientRect().height + "px";
                    letterDiv.style.paddingTop = wordBoard.children[0].style.paddingTop;
                    letterDiv.style.paddingLeft = wordBoard.children[0].style.paddingLeft;
                    letterDiv.style.position = "absolute"
                    letterDiv.style.backgroundImage = `url('${letterBG}')`
                    letterDiv.innerHTML = `${tileState.letterAlphabet}<span>${tileState.letterScore}</span>`
                    letterDiv.classList.add('game-tile')
        
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
        
                const {isCorrectlyPlaced, orientation} = checkPlayedTiles();
        
                if(!isCorrectlyPlaced) {
                    console.log("incorrectly placed");
                    for(let i = 0; i < wordBoard.children.length; ++i) {
                        const currentElement = wordBoard.children[i];
        
                        const indexPlaced = currentElement.getAttribute('data-setIndex')
        
                        if(indexPlaced != null && playedTiles.map(tile => tile.index).includes(Number(indexPlaced))) {
                            removeTileFromPlayed(currentElement, playedTiles, collidingTiles);
                        }
                    }

                    playedTiles.splice(0, playedTiles.length);

                    console.log(playerLetters);

                    return
                }
        
                const word = convertToWord(playedTiles, orientation);
        
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

                    console.log(playerLetters);
        
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
                    letterDiv.innerHTML = `${newLetter.alphabet}<span>${newLetter.score}</span>`

                    
        
                    wordBoard.appendChild(letterDiv)

                    const onMove = function(e) {
                        tileOnTouchMove(e, letterDiv);
                    }

                    if(!isMobile) {
                        const boundDown = notMobileDown.bind(null, letterDiv, onMove)
                        letterDiv.addEventListener('mousedown', boundDown)
    
                        listeners.push(
                            {
                                element: letterDiv,
                                eventType: 'mousedown',
                                handler: boundDown
                            }
                        )
    
                        const boundUp = notMobileUp.bind(null, letterDiv, newLetter, onMove)
                        letterDiv.addEventListener('mouseup', boundUp)
    
                        listeners.push(
                            {
                                element: letterDiv,
                                eventType: 'mouseup',
                                handler: boundUp
                            }
                        )
                    }
                    else {
                        const boundStart = tileOnTouchStart.bind(null, letterDiv);
                        const boundMove = tileOnTouchMove.bind(null, letterDiv)
                        const boundEnd = tileOnTouchEnd.bind(null, letterDiv, newLetter)
    
                        letterDiv.addEventListener('touchstart', boundStart)
    
                        listeners.push({
                            element: letterDiv,
                            eventType: 'touchstart',
                            handler: boundStart
                        })
    
                        letterDiv.addEventListener('touchmove', boundMove)
    
                        listeners.push({
                            element: letterDiv,
                            eventType: 'touchmove',
                            handler: boundMove
                        })
    
                        letterDiv.addEventListener('touchend', boundEnd)
    
                        listeners.push({
                            element: letterDiv,
                            eventType: 'touchend',
                            handler: boundEnd
                        })
                    }

                    // letterDiv.addEventListener(`${isMobile ? 'touchstart' : 'mousedown'}`, (e) => {
                    //     tileOnTouchStart(e, letterDiv)
                    //     if(!isMobile) {
                    //         letterDiv.addEventListener('mousemove', onMove)
                    //     }
                    // })
    
                    // if(isMobile) {
                    //     letterDiv.addEventListener('touchmove', onMove)
                    // }
            
            
                    // letterDiv.addEventListener(`${isMobile ? 'touchend' : 'mouseup'}`, (e) => {
                    //     tileOnTouchEnd(e, letterDiv, newLetter)
                    //     if(!isMobile) {
                    //         letterDiv.removeEventListener('mousemove', onMove);
                    //     }
                    // })
        
                    // letterDiv.addEventListener('touchstart', (e) => tileOnTouchStart(e, letterDiv))
        
                    // letterDiv.addEventListener('touchmove', (e) => tileOnTouchMove(e, letterDiv))
        
                    // letterDiv.addEventListener('touchend', (e) => tileOnTouchEnd(e, letterDiv, newLetter))
        
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
        
            function convertToWord(playedTiles = [new Tile()], orientation = "") {
                const letterArray = playedTiles.sort((a, b) => a.index - b.index).map(tile => tile.getLetter());
        
                const word = new Word(letterArray, orientation);
        
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

            function checkSideHori(indices = [0]) {
                let isValid = true;

                for(let i = 0; i < indices.length; ++i) {
                    const currentIndex = indices[i];

                    // up
                    let indexToCheckUp = currentIndex - 15;
                    // down
                    let indexToCheckDown = currentIndex + 15;

                    if(indexToCheckUp < 0) {
                        console.log("checking down");
                        // checkdown
                        const downIndices = [0];
                        downIndices.splice(0, 1);
                        for(let i = indexToCheckDown; i < 225; i += 15) {
                            const tile = newBoardMap[i];
                
                            if(tile.getLetter().alphabet != '') {
                                console.log("not valid");
                                isValid = false;
                                break;
                            }
                            else {
                                break;
                            }
                        }
                    }
                    else if(indexToCheckDown > 224) {
                        console.log("checking up");
                        // checkup
                        for(let i = indexToCheckUp; i < 225; i -= 15) {
                            const tile = newBoardMap[i];
                
                            if(tile.getLetter().alphabet != '') {
                                console.log("not valid");
                                isValid = false;
                                break;
                            }
                            else {
                                break;
                            }
                        }
                    }
                    else {
                        console.log("checking down and up");
                        for(let i = indexToCheckDown; i < 225; i += 15) {
                            const tile = newBoardMap[i];
                
                            if(tile.getLetter().alphabet != '') {
                                console.log("not valid down");
                                isValid = false;
                                break;
                            }
                            else {
                                break;
                            }
                        }
                        if(isValid) {
                            for(let i = indexToCheckUp; i < 225; i -= 15) {
                                const tile = newBoardMap[i];
                    
                                if(tile.getLetter().alphabet != '') {
                                    console.log("not valid up");
                                    isValid = false;
                                    break;
                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }

                    if(!isValid) break;
                }

                return isValid;
            }

            function checkSideVert(indices = [0]) {
                let isValid = true;

                for(let i = 0; i < indices.length; ++i) {
                    const currentIndex = indices[i];

                    // left
                    let indexToCheckLeft = currentIndex - 1;
                    // right
                    let indexToCheckRight = currentIndex + 1;

                    if(indexToCheckLeft % 15 == 14) {
                        // check right
                        console.log("checking right");

                        const rightIndices = [0];
                        rightIndices.splice(0, 1);
                        for(let i = indexToCheckRight; i < 225; i += 1) {
                            const tile = newBoardMap[i];
                
                            if(tile.getLetter().alphabet != '') {
                                console.log("not valid");
                                isValid = false;
                                break;
                            }
                            else {
                                break;
                            }
                        }
                    }
                    else if(indexToCheckRight % 15 == 0) {
                        // check left
                        console.log("checking left");

                        const leftIndices = [0];
                        leftIndices.splice(0, 1);
                        for(let i = indexToCheckLeft; i < 225; i -= 1) {
                            const tile = newBoardMap[i];
                
                            if(tile.getLetter().alphabet != '') {
                                console.log("not valid");
                                isValid = false;
                                break;
                            }
                            else {
                                break;
                            }
                        }
                    }
                    else {
                        console.log("checking right and left");
                        for(let i = indexToCheckRight; i < 225; i += 1) {
                            const tile = newBoardMap[i];
                
                            if(tile.getLetter().alphabet != '') {
                                console.log("not valid right");
                                isValid = false;
                                break;
                            }
                            else {
                                break;
                            }
                        }
                        if(isValid) {
                            for(let i = indexToCheckLeft; i < 225; i -= 1) {
                                const tile = newBoardMap[i];
                    
                                if(tile.getLetter().alphabet != '') {
                                    console.log("not valid left");
                                    isValid = false;
                                    break;
                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }

                    if(!isValid) break;
                }

                return isValid;
            }
        
            function checkPlayedTiles() {
                const tileIndices = playedTiles.map(tile => tile.index).sort((a, b) => a - b);
        
                const verticalToCheck = checkVerticalDiff(tileIndices);
                const horizontalToCheck = checkHorizontalDiff(tileIndices);
        
                if(verticalToCheck.length < tileIndices.length && horizontalToCheck.length < tileIndices.length) {
                    alert('WRONG X2');

                    return {isCorrectlyPlaced: false};
        
                    // return false
                }
        
                const isHori = isHorizontal(horizontalToCheck);
                const isVert = isVertical(verticalToCheck, 15);
        
                console.log(isHori, isVert);
        
                if(!isHori && !isVert) {
                    // console.log(tileIndices);
        
                    alert('WRONG');
                    return {isCorrectlyPlaced: false};
        
                    // return false;
                }
                else {
                    if(isHori && !isVert) {
                        if(!checkSideHori(tileIndices)) {
                            console.log("checking side hori for normal indices", tileIndices);
                            alert('OMO');
                            return {isCorrectlyPlaced: false, orientation: isHori ? "horizontal" : "vertical"}
                        };
                        
                        const moreIndices = checkBeforeHori(horizontalToCheck);
        
                        const moreTiles = moreIndices.map(index => newBoardMap[index]);
        
                        console.log("more tiles", moreTiles);
        
                        const finalHorizontalToCheck = moreIndices.concat(horizontalToCheck)
        
                        const newTilesIndices = finalHorizontalToCheck.filter(index => tileIndices.indexOf(index) == -1);

                        // if(!checkSideHori(horizontalToCheck)) {
                        //     console.log("checking side hori for to check indices", horizontalToCheck);
                        //     alert('OMO');
                        //     return {isCorrectlyPlaced: false, orientation: isHori ? "horizontal" : "vertical"}
                        // };
        
                        // console.log("unq hori", newTilesIndices);
        
                        newTilesIndices.forEach(index => {
                            const tile = newBoardMap[index];
        
                            playedTiles.push(tile);
                        })
                    }
                    else if(!isHori && isVert) {
                        if(!checkSideVert(tileIndices)) {
                            console.log("checking side vert for normal indices", tileIndices);
                            alert('OMO');
                            return {isCorrectlyPlaced: false, orientation: isHori ? "horizontal" : "vertical"}
                        };

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
        
                    return {isCorrectlyPlaced: true, orientation: isHori ? "horizontal" : "vertical"};
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

                setCurrentTurn(playerTurn);
                // currentTurn. = playerTurn;
            }
        }

        return () => {
            socket.disconnect();
            socket.removeAllListeners()
            console.log("disconnected");
            removeAllListeners();
        }
    }, [])

    return (
        <>
            <main>
                {!start && <Waiting />}
                <section id="game-section">
                    <div id="game">
                        <Overhead
                            playerOneInfo={playerInfo.playerOneInfo} playerTwoInfo={playerInfo.playerTwoInfo}
                            winner={{winner: false}}
                            turn={currentTurn}
                        />
                        <div id="scoreBoard">
                            <div class="info">
                                <span>You:</span>
                                <span class="score">0</span>
                            </div>
                            <div class="info">
                                <span>Opponent:</span>
                                <span class="score">0</span>
                            </div>
                            <div id="lowerUI">
                                <button>finish turn</button>
                            </div>
                        </div>
                        <div id="gameBoard">
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                            <div class="boardCell"></div>
                        </div>
                        <div id="wordBoard">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        {/* <div className="turn-div">
                            <div>
                                <h5>Your Turn, press finish turn to end turn</h5>
                            </div>
                        </div> */}
                    </div>
                </section>
            </main>
        </>
    )
}