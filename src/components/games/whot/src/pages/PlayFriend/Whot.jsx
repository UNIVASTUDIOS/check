// import { Provider } from "react-redux";
// import store from './components/games/whot/src/redux/playFriendStore';

// import store from "../../redux/playFriendStore"

import {
  UserCards,
  OpponentCards,
  CenterArea,
  InfoArea,
  GameOver,
  Preloader,
  ErrorPage,
  OnlineIndicators,
  ConnectionLoader,
} from "../../components";
import { Flipper } from "react-flip-toolkit";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "../../index.css";
import { useParams, useSearchParams } from "react-router-dom";
import socket from "../../socket/socket";
import { generateRandomCode } from "../../utils/functions/generateRandomCode";
import useIsGameOver from "../../utils/hooks/useIsGameOver";
import Overhead from "../../../Overhead";

function Whot({user}) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [turn, setTurn] = useState(1)

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

  console.log(searchParams);

  // const { room_id } = useParams();
	// console.log(room_id);
  const room_id = searchParams.get('roomID');
  console.log(room_id);
  const isGameOver = useIsGameOver();
  const [errorText, setErrorText] = useState("");
  const [onlineState, setOnlineState] = useState({
    userIsOnline: false,
    opponentIsOnline: false,
  });

  const [activeCard, userCards, opponentCards, stateHasBeenInitialized] =
    useSelector((state) => [
      state.activeCard,
      state.userCards,
      state.opponentCards,
      state.stateHasBeenInitialized,
    ]);

  const dispatch = useDispatch();

  useEffect(() => {
    let storedId = localStorage.getItem("storedId");
    if (!storedId) {
      storedId = generateRandomCode(10);
      localStorage.setItem("storedId", storedId);
    }

    const handleDispatch = (action) => {
      action.isFromServer = true;
      dispatch(action);
    };

    const handleError = (errorText) => {
      setErrorText(errorText);
    };

    const handleDisconnect = () => {
      setOnlineState((prevState) => ({ ...prevState, userIsOnline: false }));
    };

    const handleConnect = () => {
      console.log("i have connected");
      setOnlineState((prevState) => ({ ...prevState, userIsOnline: true }));
    };

    const handleOpponentOnlineState = (opponentIsOnline) => {
      setOnlineState((prevState) => ({ ...prevState, opponentIsOnline }));
    };

    const handleConfirmOnlineState = () => {
      socket.emit("confirmOnlineState", storedId, room_id);
    };

    socket.connect();

    const username = user.username;
    const avatar = user.avatar;

    socket.emit("join_room", { room_id, storedId, username, avatar });
    socket.on("dispatch", handleDispatch);
    socket.on("error", handleError);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect", handleConnect);
    socket.on("opponentOnlineStateChanged", handleOpponentOnlineState);
    socket.on("confirmOnlineState", handleConfirmOnlineState);
    socket.on("start", (playerOneInfo, playerTwoInfo) => {
        setPlayerInfo({
            playerOneInfo: playerOneInfo,
            playerTwoInfo: playerTwoInfo
        })
    })

    socket.on('change_turn', (newTurn) => {
        setTurn(newTurn)
    })

    return () => {
      socket.disconnect();
      socket.off("dispatch", handleDispatch);
      socket.off("error", handleError);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect", handleConnect);
      socket.off("opponentOnlineStateChanged", handleOpponentOnlineState);
      socket.off("confirmOnlineState", handleConfirmOnlineState);
    };
  }, []);

  useEffect(() => {
    if (isGameOver().answer && stateHasBeenInitialized) {
      let isWinner = false;
      if (userCards.length === 0) {
        isWinner = true
      }

      socket.emit("game_over", room_id, isWinner);
    }
  }, [isGameOver]);

  if (errorText) return <ErrorPage errorText={errorText} />;

  if (!stateHasBeenInitialized) {
    return <ConnectionLoader />;
  }

  return (
    <Flipper flipKey={[...userCards, ...opponentCards]}>
      <div className="App-whot">
        <Overhead playerOneInfo={playerInfo.playerOneInfo} playerTwoInfo={playerInfo.playerTwoInfo} turn={turn} winner={isGameOver()} />
        <OpponentCards />
        <CenterArea />
        <UserCards />
        {/* <InfoArea /> */}
        <GameOver />
        <Preloader />
        {/* <OnlineIndicators onlineState={onlineState} /> */}
      </div>
    </Flipper>
  );
}

export default Whot;
