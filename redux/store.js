import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import trailerReducer from "../slice/trailerSlice";
import userSlice from "../slice/userSlice";
import ModalSlice from "../slice/modalSlice";

// import saga from '../saga/saga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];
const devMode = process.env.NODE_ENV === "development";

export default configureStore({
  reducer: {
    trailer: trailerReducer,
    user: userSlice,
    modal: ModalSlice
  },
  middleware,
  devTools: devMode,
});

// sagaMiddleware.run(saga);
