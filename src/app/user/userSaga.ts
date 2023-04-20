import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { User } from "./types";
import { userActions } from "./userSlice";

axios.defaults.baseURL = "http://localhost:8000";
const getUsers = () => axios.get<User[]>("/users");
const createUser = (user: User) => axios.post(`/users`, user);
const updateUser = (user: User) => axios.put(`/users/${user.id}`, user);
const deleteUser = (user: User) =>
  axios.delete(`/users/${user.id}`, { data: user });

// worker saga: dispatchされたactionを処理
// 非同期タスクを呼出
export function* onGetUsers() {
  const response: AxiosResponse<User[]> = yield call(getUsers);
  yield put(userActions.fetchAllSucceeded(response.data));
}
export function* onCreateUser(action: PayloadAction<User>) {
  yield createUser(action.payload);
  yield put(userActions.fetchAll());
}
export function* onUpdateUser(action: PayloadAction<User>) {
  yield updateUser(action.payload);
  yield put(userActions.fetchAll());
}
export function* onDeleteUser(action: PayloadAction<User>) {
  yield deleteUser(action.payload);
  yield put(userActions.fetchAll());
}

// watcher saga: dispatchされたactionを監視して全てのactionにworkerをforkする。
export function* watchUserAsync() {
  yield takeEvery(userActions.fetchAll.type, onGetUsers);
  yield takeEvery(userActions.create.type, onCreateUser);
  yield takeEvery(userActions.update.type, onUpdateUser);
  yield takeEvery(userActions.delete.type, onDeleteUser);
}
