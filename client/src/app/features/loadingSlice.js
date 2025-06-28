import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadingStart: (state) => {
      state.isLoading = true;
    },
    loadingEnd: (state) => {
      state.isLoading = false;
    },
  },
});

export const { loadingEnd, loadingStart } = loadingSlice.actions;
export const selectUser = (state) => state.user.user;

export default loadingSlice.reducer;
