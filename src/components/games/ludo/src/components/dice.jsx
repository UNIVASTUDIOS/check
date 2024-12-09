import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentDiceState, currentPlayerState, playerName, setupState } from "../recoil/atoms";
import diceRollSound from "../assets/diceRoll2.mp3";
import socket from "../socket/socket";

/**
 * Component for DICE.
 * @returns JSX
 */
function Dice() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [diceState, setDiceState] = useRecoilState(currentDiceState);
  const currentPlayer = useRecoilValue(currentPlayerState);
  const player = useRecoilValue(playerName);
  const setup = useRecoilValue(setupState)

  // Generates random dice value between 1 and 6
  const rotateDice = () => {
    const num = Math.ceil(Math.random() * 6);

    setDiceState({
      num: num,
      isLocked: true,
      lastRolledBy: currentPlayer,
    });

    socket.emit("dice_roll", {
      roomID: setup.roomID,
      num: num,
      isLocked: true,
      lastRolledBy: currentPlayer,
    })
  }

  // Event handler for dice onClick
  const onClick = () => {
    if (!isAnimating && !diceState.isLocked) {
      setDiceState({ num: 0, isLocked: false, lastRolledBy: currentPlayer });
      setIsAnimating(true);

      new Audio(diceRollSound).play();

      setTimeout(() => {
        rotateDice();
        setIsAnimating(false);
      }, 1000);
    }
  };

  useEffect(() => {
    function handleRoll({ num, isLocked, lastRolledBy }) {
      if(!isAnimating && !diceState.isLocked) {
        setDiceState({ num: 0, isLocked: false, lastRolledBy: currentPlayer });
        setIsAnimating(true);

        new Audio(diceRollSound).play();

        setTimeout(() => {
          setDiceState({
            num: num,
            isLocked: isLocked,
            lastRolledBy: lastRolledBy,
          });
          setIsAnimating(false);
        }, 1000);
      }
    }
    socket.on("dice_roll", handleRoll);

    return () => {
      socket.off("dice_roll", handleRoll);
    }
  })


  return (
    <div
      className={"dice" + (isAnimating ? " dice-animation" : "")}
      onClick={currentPlayer == player ? onClick : () => {}}
      style={{
        // gridTemplateColumns: diceState.num > 1 ? "repeat(2, 1fr)" : "1fr",
        // gridTemplateColumns: diceState.num > 1 ? "1fr 1fr" : "1fr",
        gridTemplateColumns: diceState.num > 1 ? "50% 50%" : "100%",
        width: 25,
        height: 25
      }}
    >
      {Array(diceState.num)
        .fill()
        .map((_, i) => (
          <div key={i}>
            <div style={{ backgroundColor: currentPlayer }}></div>
          </div>
        ))}
    </div>
  );
}

export default Dice;
