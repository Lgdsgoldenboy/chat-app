import { eventChannel } from "redux-saga";
import { takeEvery, put, take } from "redux-saga/effects";
import { onMessage, onUserList, onTyping, onMessageHistory } from "../services/socket";

function* handleIncomingMessage() {
  const channel = eventChannel((emit) => {
    onMessage((msg) => emit(msg));
    return () => {};
  });
  while (true) {
    const msg = yield take(channel);
    yield put({ type: "ADD_MESSAGE", payload: msg });
  }
}

function* handleUserList() {
  const channel = eventChannel((emit) => {
    onUserList((users) => emit(users));
    return () => {};
  });
  while (true) {
    const users = yield take(channel);
    yield put({ type: "SET_USERS", payload: users });
  }
}

function* handleTyping() {
  const channel = eventChannel((emit) => {
    onTyping((username) => emit(username));
    return () => {};
  });
  while (true) {
    const username = yield take(channel);
    yield put({ type: "SET_TYPING_USER", payload: username });
    yield new Promise((resolve) => setTimeout(resolve, 2000));
    yield put({ type: "SET_TYPING_USER", payload: null });
  }
}

function* handleMessageHistory() {
  const channel = eventChannel((emit) => {
    onMessageHistory((messages) => emit(messages));
    return () => {};
  });
  const history = yield take(channel);
  for (const msg of history) {
    yield put({ type: "ADD_MESSAGE", payload: msg });
  }
}

function* rootSaga() {
  yield takeEvery("LISTEN_MESSAGES", handleIncomingMessage);
  yield takeEvery("LISTEN_USERS", handleUserList);
  yield takeEvery("LISTEN_TYPING", handleTyping);
  yield takeEvery("LISTEN_MESSAGE_HISTORY", handleMessageHistory);
}

export default rootSaga;