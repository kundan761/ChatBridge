import { io, Socket } from "socket.io-client";

let socket: Socket;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initSocket = (userData: any) => {
  socket = io("http://localhost:5000", {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Socket connected");
    socket.emit("setup", userData);
  });

  socket.on("connected", () => {
    console.log("Setup acknowledged");
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized");
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
