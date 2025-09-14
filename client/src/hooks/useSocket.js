import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export default function useSocket() {
  const socketRef = useRef(null);
  const { user } = useSelector((state) => state.user);
  const [socketConnected, setSocketConnected] = useState(false);
  useEffect(() => {
    socketRef.current = io("http://localhost:5000");
    socketRef.current.on("connection", () => setSocketConnected(true));

    return () => {
      socketRef.current.disconnect();
    };
  }, [user, setSocketConnected]);

  return socketRef;
}
