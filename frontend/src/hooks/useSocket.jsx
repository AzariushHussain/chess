import { useEffect, useState } from "react";

const WS_URL = "wss://chess-production-c8e0.up.railway.app/"

export const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket(WS_URL)
        ws.onopen = () => {
            setSocket(ws)
        }

        ws.onclose = () => {
            setSocket(ws)
        }

        return () => {
            ws.close()
        }

    }, [])

    return socket
    
}