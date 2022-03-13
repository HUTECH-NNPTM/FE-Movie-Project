import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null
};

const name = "userSlice";

export const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.info = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.info = null;
    }
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;

export default userSlice.reducer;
