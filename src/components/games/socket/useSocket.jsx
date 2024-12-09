import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function useSocket(id) {
    const [socket, setSocket] = useState();

    console.log("starting");

    useEffect(() => {
        console.log("connecting");
        const dev = `http://localhost:3000/${id}`;
        const prod = `https://new-server-ozkr.onrender.com/${id}`;
        
        const URL = process.env.NODE_ENV === "development" ? dev : prod;
        
        const socket = io(URL, {
            autoConnect: false
        });

        setSocket(socket)

    }, [])
    
    return socket;
}
