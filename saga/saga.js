import { all } from "@redux-saga/core/effects";
import { movieSagas } from "./moviesSaga";

function* rootSaga() {
  yield all([...movieSagas]);
}

export default rootSaga;
