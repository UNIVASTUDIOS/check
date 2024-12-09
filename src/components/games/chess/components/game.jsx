import React, { useContext } from 'react';

import '../index.css';
import Board from './board.jsx';
import King from '../pieces/king'
import FallenSoldierBlock from './fallen-soldier-block.jsx';
import initialiseChessBoard from '../helpers/board-initialiser.jsx';
import socket from '../socket/socket';
import { UserContext } from '../../../../utils/contexts/UserContext';
import Overhead from './Overhead';
import Won from '../../Won.jsx';
import Pause from '../../Pause.jsx';
// import { useParams } from 'react-router-dom';

// function generateRandomCode(length) {
//   const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   let generatedCode = "";

//   for (let i = 0; i < length; i++) {
//     let randomIndex = Math.floor(Math.random() * characters.length);
//     generatedCode += characters[randomIndex];
//   }

//   return generatedCode;
// };

class WinModal extends React.Component {
  constructor() {
    super();

    // this.props
  }

  render() {
    return <>
      <div className="winModal">
        <div>
          <h2>Player Won</h2>
          {/* <h2 style={{fontSize: 24}}>{player[0].toUpperCase() + player.slice(1)} won</h2> */}
          {/* <button onClick={() => location.reload()}>Play Again?</button> */}
        </div>
      </div>
    </>
  }
}

class Waiting extends React.Component {
  render() {
    return <>
      <div>
        <h2>Waiting For Opponent</h2>
      </div>
    </>
  }
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    
    const url = new URL(window.location)

    const search = url.hash

    const searchParams = new URLSearchParams(search)

    const roomID = Array.from(searchParams.entries())[0][1]

    console.log(url, Array.from(searchParams.entries()));
    
    // const userData = JSON.parse(sessionStorage.getItem('token'));

    // const userContextData = userData;

    // console.log(userContextData);

    const avatar = props.user.avatar;
    const username = props.user.username;

    // const roomID = url.pathname.slice(1);
    // const roomID = params.gameID;

    this.state = {
      squares: initialiseChessBoard(),
      whiteFallenSoldiers: [],
      blackFallenSoldiers: [],
      player: 1,
      sourceSelection: -1,
      status: '',
      turn: 'white',
      winner: false,
      roomID: roomID,
      you: 1,
      opponentNewPos: 0,
      oppTurnPlayed: false,
      canStart: false,
      avatar: avatar,
      username: username,
      playerOneInfo: {},
      playerTwoInfo: {},
      pause: false,
      answer: {}
    }
  }

  componentDidUpdate() {
    // if(this.state.winner) {

    // }

    if (this.state.oppTurnPlayed) {
      console.log("did update", this.state.sourceSelection, this.state.player, this.state.you);
      console.log("opp played");
      this.handleClick(this.state.opponentNewPos);
      this.setState({ oppTurnPlayed: false })
    }

    // if(this.state.sourceSelection == -1 && this.state.player == this.state.you) {
    //     this.handleClick(this.state.opponentNewPos);
    // }
  }

  onConnect() {
    console.log("connected to chess server")
  }

  onTurnPlayed(indexClicked, newPosition, callback) {
    this.setState({ sourceSelection: indexClicked, opponentNewPos: newPosition, oppTurnPlayed: true })
    callback({
        status: "ok"
    })
  }

  onPause() {
    this.setState({
      pause: true
    })
  }

  componentDidMount() {
    socket.connect();

    socket.on('connect', this.onConnect);

    if (this.state.roomID != '') {
      console.log(this.state.roomID);

      socket.emit('join_game', this.state.roomID, this.state)

      socket.once('joined_game', (currentGameState) => {
        // console.log("joined game", currentGameState);
        console.log("joined game");

        this.setState({ you: 2 });
      })

      socket.once('start_game', (playerOneInfo, playerTwoInfo) => {
        console.log("game is starting");
        this.setState({ canStart: true , playerOneInfo: playerOneInfo, playerTwoInfo: playerTwoInfo});
      })
    }

    socket.on('turn_played', this.onTurnPlayed.bind(this))

    socket.on('pause', this.onPause.bind(this))
  }

  componentWillUnmount() {
    console.log("chess is unmounting");

    socket.off('connect', this.onConnect);

    socket.off('pause', this.onPause)

    socket.disconnect();

    socket.off('turn_played', this.onTurnPlayed);
  }

  // TODO: ADD POSSIBLE MOVES FOR PIECE
  handleClick(i) {
    if(this.state.winner) return;
    // console.clear();
    const squares = [...this.state.squares];

    if (this.state.sourceSelection === -1) {
      if (!squares[i] || squares[i].player !== this.state.player) {
        this.setState({ status: "Wrong selection. Choose player " + this.state.player + " pieces." });
        if (squares[i]) {
          squares[i].style = { ...squares[i].style, backgroundColor: "" };
        }
      }
      else {
        squares[i].style = { ...squares[i].style, backgroundColor: "RGB(111,143,114)" }; // Emerald from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html
        this.setState({
          status: "Choose destination for the selected piece",
          sourceSelection: i
        })
      }
      return
    }

    squares[this.state.sourceSelection].style = { ...squares[this.state.sourceSelection].style, backgroundColor: "" };

    if (squares[i] && squares[i].player === this.state.player) {
      this.setState({
        status: "Wrong selection. Choose valid source and destination again.",
        sourceSelection: -1,
      });
    }
    else {

      const whiteFallenSoldiers = [];
      const blackFallenSoldiers = [];
      //   const isDestEnemyOccupied = Boolean(squares[i]);
      //   console.log("uhm");
      const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, squares);

      if (isMovePossible) {
        if (squares[i] !== null) {
          if (squares[i].player === 1) {
            whiteFallenSoldiers.push(squares[i]);
          }
          else {
            blackFallenSoldiers.push(squares[i]);
          }
        }

        squares[i] = squares[this.state.sourceSelection];
        squares[this.state.sourceSelection] = null;
        console.log("check for check");
        const isCheckMe = this.isCheckForPlayer(squares, this.state.player)
        console.log("after check");

        if (isCheckMe) {
          console.log("check");
          this.setState(oldState => ({
            status: "Wrong selection. Choose valid source and destination again. Now you have a check!",
            sourceSelection: -1,
          }))
        } else {
          let player = this.state.player === 1 ? 2 : 1;
          let turn = this.state.turn === 'white' ? 'black' : 'white';

          let newState = {}

          this.setState(oldState => {
            if (player !== this.state.you) socket.emit('turn_played', this.state.roomID, this.state.sourceSelection, i, (err, respose) => {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log(respose);
                }
            });

            return {
              sourceSelection: -1,
              squares,
              whiteFallenSoldiers: [...oldState.whiteFallenSoldiers, ...whiteFallenSoldiers],
              blackFallenSoldiers: [...oldState.blackFallenSoldiers, ...blackFallenSoldiers],
              player,
              status: '',
              turn,
              roomID: oldState.roomID
            }
          });
        }
      }
      else {
        this.setState({
          status: "Wrong selection. Choose valid source and destination again.",
          sourceSelection: -1,
        });
      }
    }

    const answer = this.isGameOver(squares, this.state.player);

    if (answer.gameOver) {
      if (this.state.you == answer.winner) {
        // socket.emit("game_over", answer.winner)
        socket.emit("game_over", this.state.roomID, answer.winner)
      }

      this.setState({ winner: true , answer: answer});
    }
  }

  getKingPosition(squares, player) {
    return squares.reduce((acc, curr, i) =>
      acc || //King may be only one, if we had found it, returned his position
      ((curr //current squre mustn't be a null
        && (curr.getPlayer() === player)) //we are looking for aspecial king 
        && (curr instanceof King)
        && i), // returned position if all conditions are completed
      null)
  }

  // checks for checkmate and returns whether the game is over and theres a winner
  isGameOver(squares, player) {
    let gameOver = false;

    const isCheck = this.isCheckForPlayer(squares, player == 1 ? 2 : 1);

    console.log("is check: ", isCheck);

    const opponent = player == 1 ? 2 : 1;

    const subs = [-9, -8, -7, -1, 1, 7, 8, 9]

    function myPieceKillKing(piece, piecePos, opponentKingPos, squares) {
      const isItPossible = piece.isMovePossible(piecePos, opponentKingPos, squares)

      return isItPossible;
    }

    let positionsCanBeKilled = []

    let every = true;

    for (let i = 0; i < subs.length; ++i) {
      const pos = this.getKingPosition(squares, player == 1 ? 2 : 1);

      console.log("current king pos: ", pos);

      const newPos = pos + subs[i];

      console.log("pos to check: " + newPos);

      if (newPos < 0 || newPos > 63) continue;
      // check if king can also move to valid position
      if(squares[newPos] != null) continue;

      const mine = squares.map((square, index) => {
        if (square && square.getPlayer() == player) {
          return { piece: square, piecePos: index }
        }
      }).filter(val => val)

      console.log(mine);

      const result = mine.some(obj => myPieceKillKing(obj.piece, obj.piecePos, newPos, squares))

      console.log("can a piece kill in: " + newPos + " ", result);

      // const result = myPieceKillKing(mine.piece, mine.piecePos, newPos, squares);

      if(result == true) {
        positionsCanBeKilled.push(newPos);
      }

      if (result == false) {
        every = false;

        break
      }
      // console.log(pos);
      // if()
    }

    if(every && positionsCanBeKilled.length > 1) {
      // check if member piece can block
      console.log("check if member piece can block");

      const opponentsPieces = squares.map((square, index) => {
        if (square && square.getPlayer() != player) {
          return { piece: square, piecePos: index }
        }
      }).filter(val => val && !(val.piece instanceof King))

      console.log("opps pieces", opponentsPieces);

      console.log("positions can be killed: ", positionsCanBeKilled);

      const final = positionsCanBeKilled.every(pos => (
        opponentsPieces.some(opp => opp.piece.isMovePossible(opp.piecePos, pos, squares))
      ));

      console.log("is there hope?: ", final);

      if(!final) {
        console.log("actually over for you");
      }
      else {
        every = false;
      }
    }


    gameOver = isCheck && every;

    console.log("Is Game Over?: ", gameOver);

    if (gameOver) {
      return { gameOver: true, winner: Number(player) };
    }
    else {
      positionsCanBeKilled.splice(0, positionsCanBeKilled.length)
      return { gameOver: false, winner: 0 };
    }

  }

  isCheckForPlayer(squares, player) {
    const opponent = player === 1 ? 2 : 1
    const playersKingPosition = this.getKingPosition(squares, player)

    // CULPRIT
    // const canPieceKillPlayersKing = (piece, i) => piece.isMovePossible(playersKingPosition, i, squares)
    const canPieceKillPlayersKing = (piece, i) => {
      // console.log(piece);
      // console.log("src dest: ", i, playersKingPosition);
      // const isItPossible = piece.isMovePossible(i, playersKingPosition, Boolean(squares[playersKingPosition]))
      const isItPossible = piece.isMovePossible(i, playersKingPosition, squares)

      // console.log(isItPossible);

      // console.log(`${i} on ${playersKingPosition}: ${isItPossible}`);

      return isItPossible;
    }

    const result = squares.reduce((acc, curr, idx) => {
      // console.log(acc);
      return acc || (curr && (curr.getPlayer() === opponent) && canPieceKillPlayersKing(curr, idx) && true)
    }, false)

    // console.log(result);

    return result
  }

  render() {

    return /* this.state.winner ? (<WinModal winnerColor={this.state.answer.winner == 1 ? "white" : "black"} />) : */ (
      !this.state.canStart ? <Waiting /> :
      <div>
        <div className="game">
          <div className="game-board">
            <div>
              {/* white */}
              <div className="fallen-soldier-block">
                <FallenSoldierBlock whiteFallenSoldiers={this.state.whiteFallenSoldiers} blackFallenSoldiers={[]} />
              </div>
            </div>
            <Board
              squares={this.state.squares}
              onClick={(i) => this.state.player == this.state.you ? this.handleClick(i) : () => { }}
            />
            <div>
              {/* black */}
              <div className="fallen-soldier-block">
                <FallenSoldierBlock whiteFallenSoldiers={[]} blackFallenSoldiers={this.state.blackFallenSoldiers} />
              </div>
            </div>
          </div>
          <div>
            <Overhead 
                playerOneInfo={this.state.playerOneInfo} 
                playerTwoInfo={this.state.playerTwoInfo} 
                turn={this.state.turn}
                winner={{winner: this.state.winner, answer: this.state.answer}}
            />
          </div>
          <div>
            {this.state.winner && <Won />}
          </div>
          <div>
            {this.state.pause && <Pause />}
          </div>

          {/* <div className="game-info">
            <h3>Turn</h3>
            <div id="player-turn-box" style={{ backgroundColor: this.state.turn }}>

            </div>
            <div className="game-status">{this.state.status}</div> */}

            {/* <div className="fallen-soldier-block">

              {<FallenSoldierBlock
                whiteFallenSoldiers={this.state.whiteFallenSoldiers}
                blackFallenSoldiers={this.state.blackFallenSoldiers}
              />
              }
            </div> */}

          {/* </div> */}
        </div>

        {/* <div className="icons-attribution">
          <div> <small> Chess Icons And Favicon (extracted) By en:User:Cburnett [<a href="http://www.gnu.org/copyleft/fdl.html">GFDL</a>, <a href="http://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA-3.0</a>, <a href="http://opensource.org/licenses/bsd-license.php">BSD</a> or <a href="http://www.gnu.org/licenses/gpl.html">GPL</a>], <a href="https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces">via Wikimedia Commons</a> </small></div>
        </div>
        <ul>
          <li><a href="https://github.com/TalhaAwan/react-chess" target="_blank">Source Code</a> </li>
          <li><a href="https://www.techighness.com/post/develop-two-player-chess-game-with-react-js/">Blog Post</a></li>
        </ul> */}
      </div>

    );
  }
}

