import { io } from "socket.io-client"

// const dev = `http://localhost`;
const dev = process.env.REACT_APP_JOSHUA == "true" ? 'http://localhost' : `https://skyboardgames.com`;
// const dev = `http://127.0.0.1:3000/`;
// const dev = `http://192.168.8.100:3000/`;
const prod = `https://skyboardgames.com`;

const URL = process.env.NODE_ENV === "development" ? dev : prod;

const socket = io(URL, {
    autoConnect: false,
    path: '/games/socket.io'
});

export default socket;