import { combineReducers } from "redux";

const initialState = {
  messages: [],
  user: null,
  users: [],
  typingUser: null, // Track the user who is typing
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_TYPING_USER":
      return { ...state, typingUser: action.payload };
    default:
      return state;
  }
};

export default combineReducers({ chat: chatReducer });