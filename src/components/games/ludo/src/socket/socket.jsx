import { io } from "socket.io-client";

// const dev = "http://localhost";
// const prod = "https://new-server-ozkr.onrender.com/ludo";

const dev = process.env.REACT_APP_JOSHUA == "true" ? 'http://localhost' : `https://skyboardgames.com`;
const prod = "https://skyboardgames.com";

const URL = process.env.NODE_ENV === "development" ? dev : prod;

const socket = io(URL + '/ludo', {
    autoConnect: false,
    path: '/games/socket.io'
});

export default socket;