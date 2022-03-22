import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idMovie: null, 
};

const name = "seriesSlice";

export const seriesSlice = createSlice({
  name,
  initialState,
  reducers: {
    setIdMovie: (state, action) => {
      state.idMovie = action.payload;
    },
  },
});

export const { setIdMovie } = seriesSlice.actions;

export default seriesSlice.reducer;
