// src/components/Login.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { joinChat } from "../services/socket";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      dispatch({ type: "SET_USER", payload: username });
      joinChat(username);
      onLogin();
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 rounded">
      <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded border border-gray-600"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Join Chat
        </button>
      </form>
    </div>
  );
};

export default Login;