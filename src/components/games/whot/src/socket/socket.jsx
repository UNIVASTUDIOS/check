import { io } from "socket.io-client";
// const socket = io("https://whot.onrender.com/");
// const socket = io("http://localhost:8080");

// const dev = "http://localhost:5657/whot";
// const prod = "https://new-server-ozkr.onrender.com/whot";

// const socket = io(process.env.NODE_ENV == "development" ? dev : prod, {
//     autoConnect: false
// });


// const dev = `http://localhost`;
const dev = process.env.REACT_APP_JOSHUA == "true" ? 'http://localhost' : `https://skyboardgames.com`;
const prod = "https://skyboardgames.com";

const URL = process.env.NODE_ENV === "development" ? dev : prod;

const socket = io(URL + '/whot', {
    autoConnect: false,
    path: '/games/socket.io'
});

export default socket;