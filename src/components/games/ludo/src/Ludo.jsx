import "./styles/App.css";

// import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import _ from "lodash";

import * as states from "./recoil/atoms";

import HomeCenter from "./components/homeCenter";
import StepsGrid from "./components/stepsGrid";
import HomeBox from "./components/homeBox";
import GameSetup from "./components/gameSetup";
import { colorMap, moves, playerOrder } from "./config/constants";
import { useEffect, useMemo, useState } from "react";
import socket from "./socket/socket";
import Overhead from "./Overhead";
import Waiting from "../../Waiting";


function WinModal({ player }) {

  return (
    <>
      <div className="winModal">
        <div>
          <h2 style={{ fontSize: 24 }}>{player[0].toUpperCase() + player.slice(1)} won</h2>
          <button onClick={() => ''}>Play Again?</button>
        </div>
      </div>
    </>
  )
}

function Emulation() {
  const [currentPlayer, setCurrentPlayer] = useRecoilState(
    states.currentPlayerState
  );
  const [diceState, setDiceState] = useRecoilState(states.currentDiceState);
  const [blockState, setBlockState] = useRecoilState(states.allBlockState);
  const [coinState, setCoinState] = useRecoilState(states.allCoinState);
  const playersList = useRecoilValue(states.currentPlayersListState);

  // useEffect(() => {
  //   console.log(JSON.stringify({ blockState, coinState }, 0, 2));
  // }, [JSON.stringify(coinState), JSON.stringify(blockState)]);

  return (
    <div>
      {[1, 2, 3, 4, 5, 6, 12, 24, 32, 56].map((i) => (
        <button
          key={i}
          onClick={() => {
            setDiceState({
              num: i,
              isLocked: false,
              lastRolledBy: currentPlayer,
            });
          }}
        >
          {i}
        </button>
      ))}
      <br />
      {playersList.map((elem, i) => (
        <button
          key={i}
          onClick={() => {
            setCurrentPlayer(elem);
          }}
          style={{ backgroundColor: elem }}
        >
          {elem}
        </button>
      ))}
      <div>
        <span>Enter (eg; p1-t40): </span>
        <input
          type="text"
          onKeyUp={({ code, currentTarget: { value } }) => {
            if (code === "Enter") {
              if (value.match(/^[pyrt][0-3]-[pyrt]\d{2}$/)) {
                const [coinKey, boxKey] = value.split("-");
                const parent = colorMap[coinKey[0]];
                if (!playersList.includes(parent)) return;
                const oldPosition = coinState[parent][coinKey].position;

                setCoinState({
                  ...coinState,
                  [parent]: {
                    ...coinState[parent],
                    [coinKey]: { position: boxKey, isTurnAvailable: false },
                  },
                });

                const oldBlockState = _.cloneDeep(blockState);

                oldPosition &&
                  !oldPosition.includes("home") &&
                  oldBlockState[oldPosition].splice(
                    oldBlockState[oldPosition].indexOf(coinKey),
                    1
                  );

                setBlockState({
                  ...oldBlockState,
                  [boxKey]: [
                    ...new Set([...(oldBlockState[boxKey] || []), coinKey]),
                  ],
                });
              } else alert("Wrong input!");
            }
          }}
        ></input>
      </div>
    </div>
  );
}

function Ludo(props) {
  const [won, setWon] = useRecoilState(states.wonState);
  const [setup, setSetup] = useRecoilState(states.setupState);
  const setCurrentPlayer = useRecoilState(states.currentPlayerState)[1];
  const setCurrentPlayersList = useRecoilState(states.currentPlayersListState)[1];
  const setName = useRecoilState(states.playerName)[1];
  const [start, setStart] = useState(false);
  const [playerInfo, setPlayerInfo] = useState({
    playerOneInfo: {
        username: '',
        avatar: ''
    }, 
    playerTwoInfo: {
        username: '',
        avatar: ''
    }
  });

  const displayModal = useMemo(() => won.win ? true : false, [won])

  const url = new URL(window.location)


  // const url = new URL(document.URL);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => console.log("connected"));

    const search = url.hash

    const searchParams = new URLSearchParams(search)

    const roomID = Array.from(searchParams.entries())[0][1]

    console.log(url, Array.from(searchParams.entries()));

    // const roomID = url.pathname.slice(1);

    console.log(roomID);

    const userData = JSON.parse(sessionStorage.getItem('token'));

    const userContextData = userData;

    console.log(userContextData);

    const username = props.user.username;
    const avatar = props.user.avatar;

    // if (roomID != "") {
    //   socket.emit("join_room", roomID);
    // }

    const randomNum = Math.floor(Math.random() * 2);
    const playersList = [playerOrder[randomNum], playerOrder[randomNum + 2]]

    setCurrentPlayersList([...playersList]);
    setCurrentPlayer(playersList[0]);
    // console.log(currentPlayersList, playersList);

    setSetup({
      value: true,
      playersList: [...playersList],
      currentPlayer: playersList[0],
      roomID: roomID
    });

    setName(playersList[0]);

    const setup = {
      value: true,
      playersList: [...playersList],
      currentPlayer: playersList[0],
      roomID: roomID
    }

    // if (roomID != "") {
    //   socket.emit("join_room", roomID);
    // }

    socket.emit("create_room", roomID, setup, username, avatar);

    socket.on("already_created", (serverSetup) => {
      console.log("already created");
      setSetup(serverSetup)

      setCurrentPlayersList([...serverSetup.playersList]);
      setCurrentPlayer(serverSetup.playersList[0]);

      setName(serverSetup.playersList[1]);


      // console.log(currentPlayersList, playersList);
    })

    socket.on('start_game', (playerOneInfo, playerTwoInfo) => {
        setStart(true);

        setPlayerInfo({
            playerOneInfo: playerOneInfo,
            playerTwoInfo: playerTwoInfo
        })
    })

    return () => {
      socket.close();
    }

  }, [])

  return (
    <div id="ludo-root">
      {displayModal && <WinModal player={won.player} />}
      {!start && <Waiting />}
      {setup.value == false ? <GameSetup /> : null}
      {
        setup.value && start && <>
          <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <h2 style={{ display: "inline", fontSize: 24, color: "red" }}>L</h2>
            <h2 style={{ display: "inline", fontSize: 24, color: "#ffeb3b" }}>U</h2>
            <h2 style={{ display: "inline", fontSize: 24, color: "blue" }}>D</h2>
            <h2 style={{ display: "inline", fontSize: 24, color: "green" }}>O</h2>
          </div>
          <div>
            <Overhead 
                playerOneInfo={playerInfo.playerOneInfo}
                playerTwoInfo={playerInfo.playerTwoInfo}
                colors={setup.playersList}
                // turn={setup.currentPlayer}
                winner={{winner: false}}

            />
          </div>
          <div style={{
            // height: "89vh",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}>

            <div className="App">
              <div className="boardWrapper">
                <div className="innerRow">
                  <HomeBox parent="palegreen" />
                  <StepsGrid parent="yellow" adjacentDirection="leftOrTop" />
                  <HomeBox parent="yellow" />
                </div>
                <div className="innerRow">
                  <StepsGrid
                    style={{ transform: "rotate(90deg)" }}
                    parent="palegreen"
                    adjacentDirection="rightOrBottom"
                  />
                  <HomeCenter />
                  <StepsGrid
                    style={{ transform: "rotate(90deg)" }}
                    parent="royalblue"
                    adjacentDirection="leftOrTop"
                  />
                </div>
                <div className="innerRow">
                  <HomeBox parent="tomato" />
                  <StepsGrid parent="tomato" adjacentDirection="rightOrBottom" />
                  <HomeBox parent="royalblue" />
                </div>
              </div>
              <br />
              <div>
                {process.env.NODE_ENV === "development" && <Emulation />}
              </div>
              {/* <Emulation /> */}
            </div>
          </div></>
      }
    </div>
  );
}

export default Ludo;
