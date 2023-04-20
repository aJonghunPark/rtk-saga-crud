import { all, fork } from "redux-saga/effects";

import { watchUserAsync } from "./user/userSaga";

export function* rootSaga() {
  yield all([fork(watchUserAsync)]);
}
