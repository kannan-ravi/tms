import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  editTaskMessage: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setEditTaskMessage: (state, action) => {
      state.editTaskMessage = action.payload;
    },
  },
});

export const { setMessages, setEditTaskMessage } = messageSlice.actions;
export default messageSlice.reducer;
