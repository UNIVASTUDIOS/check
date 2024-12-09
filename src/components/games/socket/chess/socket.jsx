import { io } from "socket.io-client";

const dev = "http://localhost:3000/chess";
const prod = "https://new-server-ozkr.onrender.com/chess";

const URL = import.meta.env.MODE === "development" ? dev : prod;

const socket = io(URL, {
    autoConnect: false
});

export default socket;