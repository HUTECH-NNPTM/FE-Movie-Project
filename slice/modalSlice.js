import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  idModal: null,
};

const name = "modalSlice";

export const modalSlice = createSlice({
  name,
  initialState,
  reducers: {
    openModalDetail: (state, action) => {
      state.isOpen = action.payload;
    },
    closeModalDetail: (state, action) => {
      state.isOpen = action.payload;
    },
    setModalId: (state, action) => {
      state.idModal = action.payload;
    },
  },
});

export const { openModalDetail, closeModalDetail, setModalId } = modalSlice.actions;

export default modalSlice.reducer;
