import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, disconnectSocket, sendMessage, sendTyping } from "../services/socket";
import Login from "./Login";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const user = useSelector((state) => state.chat.user);
  const users = useSelector((state) => state.chat.users);
  const typingUser = useSelector((state) => state.chat.typingUser);

  useEffect(() => {
    if (user) {
      connectSocket();
      dispatch({ type: "LISTEN_MESSAGES" });
      dispatch({ type: "LISTEN_USERS" });
      dispatch({ type: "LISTEN_TYPING" });
      dispatch({ type: "LISTEN_MESSAGE_HISTORY" });
      setIsLoggedIn(true);
    }

    return () => {
      if (user) disconnectSocket();
    };
  }, [dispatch, user]);

  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (user) sendTyping(user);
  };

  const handleSend = () => {
    if (message.trim()) {
      const msgData = { user, text: message, timestamp: new Date() };
      sendMessage(msgData);
      setMessage("");
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 flex gap-4">
      <div className="w-1/4 bg-gray-800 p-4 rounded h-96 overflow-y-auto">
        <h2 className="text-lg font-bold text-white mb-2">Online Users</h2>
        {users.map((u) => (
          <div key={u.id} className="text-white mb-1">
            {u.username}
          </div>
        ))}
      </div>
      <div className="w-3/4 flex flex-col">
        <div className="h-96 overflow-y-auto border p-4 mb-4 rounded bg-gray-900 text-white">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-2">
              <span className="font-bold">{msg.user}: </span>
              <span>{msg.text}</span>
              <span className="text-gray-400 text-sm ml-2">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
          {typingUser && typingUser !== user && (
            <div className="text-gray-400 italic">
              {typingUser} is typing...
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={handleTyping}
            className="flex-1 border p-2 rounded bg-gray-800 text-white"
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;