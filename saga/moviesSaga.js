import { call, put, takeEvery, delay } from "redux-saga/effects";
import { removeMovie, fetchMovie, setLoading, createMovie, updateMovie } from "../slice/movieSlice";
import movieApi from "../axios/movieApi";
import { toast } from "react-toastify";

function* watchRemoveMovie({ payload }) {
  try {
    yield put(setLoading(true));
    yield call(movieApi.deleteMovie, payload);
    const movies = yield call(movieApi.getAllMovies);
    yield put(fetchMovie(movies));
    yield delay(2000);
    yield put(setLoading(false));
    toast.success("Delete movie success !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  } catch (error) {
    toast.error("Delete movie Fail !", {
      position: toast.POSITION.TOP_RIGHT,
    });
    yield put(setLoading(false));
  }
}
function* watchCreateMovie({ payload }) {
  try {
    yield put(setLoading(true));
    yield call(movieApi.create, payload);
    const movies = yield call(movieApi.getAllMovies);
    yield put(fetchMovie(movies));
    yield delay(2000);
    yield put(setLoading(false));
    toast.success("Create movie success !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  } catch (error) {
    toast.error("Create movie Fail!", {
      position: toast.POSITION.TOP_RIGHT,
    });
    yield put(setLoading(false));
  }
}

function* watchUpdateMovie({ payload }) {
  try {
    yield put(setLoading(true));
    yield call(movieApi.update, payload);
    const movies = yield call(movieApi.getAllMovies);
    yield put(fetchMovie(movies));
    yield delay(2000);
    yield put(setLoading(false));
    toast.success("Update movie success !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  } catch (error) {
    toast.error("Update movie Fail!", {
      position: toast.POSITION.TOP_RIGHT,
    });
    yield put(setLoading(false));
  }
}

export const movieSagas = [
  takeEvery(removeMovie.type, watchRemoveMovie),
  takeEvery(createMovie.type, watchCreateMovie),
  takeEvery(updateMovie.type, watchUpdateMovie),
];
