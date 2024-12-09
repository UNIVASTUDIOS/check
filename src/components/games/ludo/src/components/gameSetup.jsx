import { useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { playerOrder } from "../config/constants";
import * as states from "../recoil/atoms";
// import { generateRandomCode } from "../../../whot/src/utils/functions/generateRandomCode";
import socket from "../socket/socket";
import { generateRandomCode } from "../../../../../genRandomCode";

/**
 * This component is being called from GameSetup, and handles the player count buttons.
 * @param {Object} props
 * @returns JSX
 */
function PlayerButton({ count, setTransClass }) {
  const setCurrentPlayer = useRecoilState(states.currentPlayerState)[1];
  const setCurrentPlayersList = useRecoilState(
    states.currentPlayersListState
  )[1];

  const setSetup = useRecoilState(states.setupState)[1];

  const setName = useRecoilState(states.playerName)[1];

  const resetBlockState = useResetRecoilState(states.allBlockState);
  const resetCoinState = useResetRecoilState(states.allCoinState);
  const resetDiceState = useResetRecoilState(states.currentDiceState);

  // Event handler for button onClick.
  const handleClick = () => {
    const randomNum = Math.floor(Math.random() * 2);
    const playersList =
      count === 2
        ? [playerOrder[randomNum], playerOrder[randomNum + 2]]
        : count === 3
        ? playerOrder.slice(randomNum, randomNum + 3)
        : [...playerOrder];

    // reset previous states
    resetBlockState();
    resetCoinState();
    resetDiceState();

    setCurrentPlayersList([...playersList]);
    setCurrentPlayer(playersList[0]);
    // console.log(currentPlayersList, playersList);
    setTransClass(" scaleDown");

    const randomCode = generateRandomCode(6);

    console.log(randomCode)

    setSetup({
        value: true, 
        playersList: [...playersList],
        currentPlayer: playersList[0],
        roomID: randomCode
    });

    setName(playersList[0]);

    const setup = {
        value: true, 
        playersList: [...playersList],
        currentPlayer: playersList[0],
        roomID: randomCode
    }

    const userData = JSON.parse(sessionStorage.getItem('token'));

    const userContextData = userData;

    console.log(userContextData);

    const username = userContextData.user.username;
    const avatar = userContextData.user.avatar;
		
	socket.emit("create_room", randomCode, setup, username, avatar);
  };

  return (
    <div className="gameSetupPlayerSelectBtn" onClick={handleClick}>
      {count}
    </div>
  );
}

/**
 * This component handles the screen where user can choose the players count.
 * @returns JSX
 */
function GameSetup() {
  const [transClass, setTransClass] = useState("");

  return (
    <div className={"gameSetup" + transClass}>
      <h1 style={{ color: "white", fontSize: 20 }}>Welcome to LUDO</h1>
      <h1 style={{ color: "white", fontSize: 20 }}>Choose players</h1>
      <div>
        {[2, 3, 4].map((i) => (
          <PlayerButton
            key={i}
            count={i}
            setTransClass={(className) => setTransClass(className)}
          />
        ))}
      </div>
    </div>
  );
}

export default GameSetup;
