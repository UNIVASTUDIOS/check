import { applyMiddleware, createStore } from "redux";
import combinedReducer from "./reducers/playFriendCombinedReducer";
import socket from "../socket/socket";

// let pathname = window.location.pathname;
// let room_id = pathname.slice(pathname.length - 4, pathname.length);

// console.log(pathname, room_id);

const enhancedReducer = (state, action) => {
  if (action.type === "INITIALIZE_DECK") {
    return action.payload;
  }

  if (action.type === "UPDATE_STATE") {
    const { playerOneState, playerTwoState } = action.payload;
    let newState = state.player === "one" ? playerOneState : playerTwoState;
    return { ...newState, infoShown: state.infoShown };
  }

  return combinedReducer(state, action);
};

const getUpdatedState = ({ getState }) => {
  return (next) => (action) => {
    const url = new URL(window.location)

    const search = url.hash

    const searchParams = new URLSearchParams(search)

    const roomID = Array.from(searchParams.entries())[0][1]

    console.log(url, Array.from(searchParams.entries()));

    const returnValue = next(action);

    const updatedState = getState();
    if (
      action.type !== "UPDATE_STATE" &&
      action.type !== "TOGGLE_INFO_SHOWN" &&
      action.type !== "INITIALIZE_DECK"
    ) {
      console.log("gotten state", roomID);
      socket.emit("sendUpdatedState", updatedState, roomID);
    }

    return returnValue;
  };
};

const store = createStore(enhancedReducer, applyMiddleware(getUpdatedState));

export default store;
