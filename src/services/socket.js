import { io } from "socket.io-client";

const socket = io("https://your-render-server-url.onrender.com");

export const connectSocket = () => socket.connect();
export const disconnectSocket = () => socket.disconnect();
export const sendMessage = (message) => socket.emit("message", message);
export const joinChat = (username) => socket.emit("join", username);
export const sendTyping = (username) => socket.emit("typing", username);
export const onMessage = (callback) => socket.on("message", callback);
export const onUserList = (callback) => socket.on("userList", callback);
export const onTyping = (callback) => socket.on("typing", callback);
export const onMessageHistory = (callback) => socket.on("messageHistory", callback);