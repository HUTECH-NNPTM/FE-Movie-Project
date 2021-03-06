import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
};

const name = "movieSlice";

export const movieSlice = createSlice({
  name,
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    removeMovie: (state, action) => {
      return state;
    },
    createMovie: (state, action) => {
      return state;
    },
    updateMovie: (state, action) => {
      return state;
    },
    updateMovie: (state, action) => {
      return state;
    },
    fetchMovie: (state, action) => {
      state.data = null;
      state.data = action.payload;
    },
  },
});


export const { removeMovie, fetchMovie, createMovie, setLoading, updateMovie } =
  movieSlice.actions;

export default movieSlice.reducer;
