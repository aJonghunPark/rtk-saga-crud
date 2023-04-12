import { all, fork } from "redux-saga/effects";

import { watchUsersAsync } from "./user/usersSaga";

export function* rootSaga() {
  yield all([fork(watchUsersAsync)]);
}
