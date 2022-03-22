import { call, put, takeEvery, delay } from "redux-saga/effects";
import { removeMovie, fetchMovie, setLoading } from "../slice/movieSlice";
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
    console.log(error);
  }
}

export const movieSagas = [takeEvery(removeMovie.type, watchRemoveMovie)];
