import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  severity: "",
  message: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    toastSuccess: (state, action) => {
      state.open = true;
      state.severity = "success";
      state.message = action.payload;
    },
    toastError: (state, action) => {
      state.open = true;
      state.severity = "error";
      state.message = action.payload;
    },

    toastClose: (state) => {
      state.open = false;
      state.severity = "";
      state.message = "";
    },
  },
});

export const { toastSuccess, toastError, toastClose } = toastSlice.actions;
export default toastSlice.reducer;
