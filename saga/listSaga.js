import { call, put, takeEvery, delay } from "redux-saga/effects";
import {
  removeSeries,
  setLoading,
  fetchSeries,
  createSeries,
  updateSeries,
} from "../slice/seriesSlice";
import listApi from "../axios/listApi";
import { toast } from "react-toastify";

function* watchRemoveList({ payload }) {
  try {
    yield put(setLoading(true));
    yield call(listApi.delete, payload);
    const series = yield call(listApi.getAllList);
    yield put(fetchSeries(series));
    yield delay(2000);
    yield put(setLoading(false));
    toast.success("Delete series success !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  } catch (error) {
    console.log(error);
    toast.error("Delete series Fail !", {
      position: toast.POSITION.TOP_RIGHT,
    });
    yield put(setLoading(false));
  }
}

function* watchCreateList({ payload }) {
  try {
    yield put(setLoading(true));
    yield call(listApi.create, payload);
    const series = yield call(listApi.getAllList);
    yield put(fetchSeries(series));
    yield delay(2000);
    yield put(setLoading(false));
    toast.success("Create series success !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  } catch (error) {
    console.log(error);
    toast.error("Create series Fail !", {
      position: toast.POSITION.TOP_RIGHT,
    });
    yield put(setLoading(false));
  }
}

function* watchUpdateList({ payload }) {
  try {
    yield put(setLoading(true));
    yield call(listApi.update, payload);
    const series = yield call(listApi.getAllList);
    yield put(fetchSeries(series));
    yield delay(2000);
    yield put(setLoading(false));
    toast.success("Update series success !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  } catch (error) {
    console.log(error);
    toast.error("Update series Fail !", {
      position: toast.POSITION.TOP_RIGHT,
    });
    yield put(setLoading(false));
  }
}

export const listSagas = [
  takeEvery(removeSeries.type, watchRemoveList),
  takeEvery(createSeries.type, watchCreateList),
  takeEvery(updateSeries.type, watchUpdateList),
];
