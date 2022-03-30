import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from '../saga/saga';
import ModalSlice from "../slice/modalSlice";
import seriesSlice from "../slice/seriesSlice";
import trailerReducer from "../slice/trailerSlice";
import userSlice from "../slice/userSlice";
import movieSlice from "../slice/movieSlice";


const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];
const devMode = process.env.NODE_ENV === "development";


export default configureStore({
  reducer: {
    trailer: trailerReducer,
    user: userSlice,
    modal: ModalSlice,
    series: seriesSlice,
    movies: movieSlice
  },
  middleware,
  devTools: devMode,
});

sagaMiddleware.run(rootSaga);


