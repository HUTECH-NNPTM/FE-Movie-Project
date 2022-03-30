import { all } from "@redux-saga/core/effects";
import { movieSagas } from "./moviesSaga";
import { listSagas } from "./listSaga";

function* rootSaga() {
  yield all([...movieSagas, ...listSagas]);
}

export default rootSaga;
