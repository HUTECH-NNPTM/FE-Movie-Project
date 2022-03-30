import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idMovie: null,
  data: null,
  loading: false,
};

const name = "seriesSlice";

export const seriesSlice = createSlice({
  name,
  initialState,
  reducers: {
    removeSeries: (state, action) => {
      return state;
    },
    createSeries: (state, action) => {
      return state;
    },
    updateSeries: (state, action) => {
      return state;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setIdMovie: (state, action) => {
      state.idMovie = action.payload;
    },
    fetchSeries: (state, action) => {
      state.data = null;
      state.data = action.payload;
    },
  },
});

export const { setIdMovie, fetchSeries, setLoading, removeSeries, createSeries, updateSeries } = seriesSlice.actions;

export default seriesSlice.reducer;
