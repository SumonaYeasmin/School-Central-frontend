"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Backend WebSocket URL
const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface UseSocketProps {
  userId?: string;
  role?: string; // "ADMIN" | "TEACHER" | "PARENT" | "STUDENT"
}

export function useSocket({ userId, role }: UseSocketProps = {}) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // 1. Initialize socket connection with user role and userId in query
    const socketInstance = io(SOCKET_URL, {
      query: {
        userId: userId || "",
        role: role || "GUEST",
      },
      transports: ["websocket", "polling"],
      autoConnect: true,
    });

    socketInstance.on("connect", () => {
      console.log(`⚡ Connected to WebSocket Server (ID: ${socketInstance.id})`);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("🔌 Disconnected from WebSocket Server:", reason);
    });

    setSocket(socketInstance);

    // 2. Cleanup on unmount or user change
    return () => {
      socketInstance.disconnect();
    };
  }, [userId, role]);

  return socket;
}
