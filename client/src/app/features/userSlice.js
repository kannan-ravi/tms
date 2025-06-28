import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  allUsers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    addAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    addSingleUser: (state, action) => {
      state.allUsers = [...state.allUsers, action.payload];
    },
    deleteUser: (state, action) => {
      state.allUsers = state.allUsers.filter(
        (user) => user._id !== action.payload
      );
    },
  },
});

export const { addUser, removeUser, addAllUsers, addSingleUser, deleteUser } =
  userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
