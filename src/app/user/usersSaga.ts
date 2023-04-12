import { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { User } from "./types";
import { usersActions } from "./usersSlice";

axios.defaults.baseURL = "http://localhost:8000";
const getUsers = () => axios.get<User[]>("/users");
const getUser = (user: User) => axios.get<User>(`/users/${user.id}`);
const createUser = (user: User) => axios.post(`/users`, user);
const updateUser = (user: User) => axios.put(`/users/${user.id}`, user);
const deleteUser = (user: User) =>
  axios.delete(`/users/${user.id}`, { data: user });

// worker saga: dispatchされたactionを処理
// 非同期タスクを呼出
export function* onGetUsers() {
  const response: AxiosResponse<User[]> = yield call(getUsers);
  yield put(usersActions.fetchAllSucceeded(response.data));
}
export function* onCreateUser(action: PayloadAction<User>) {
  yield createUser(action.payload);
  yield put(usersActions.fetchAll());
}
export function* onUpdateUser(action: PayloadAction<User>) {
  yield updateUser(action.payload);
  yield put(usersActions.fetchAll());
}
export function* onDeleteUser(action: PayloadAction<User>) {
  yield deleteUser(action.payload);
  yield put(usersActions.fetchAll());
}

// watcher saga: dispatchされたactionを監視して全てのactionにworkerをforkする。
export function* watchUsersAsync() {
  yield takeEvery(usersActions.fetchAll.type, onGetUsers);
  yield takeEvery(usersActions.create.type, onCreateUser);
  yield takeEvery(usersActions.update.type, onUpdateUser);
  yield takeEvery(usersActions.delete.type, onDeleteUser);
}
