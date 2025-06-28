import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chat: {},
  all_team_chats: [],
  other_team_chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatInfo: (state, action) => {
      state.chat = action.payload;
    },
    addAllteamChat: (state, action) => {
      state.all_team_chats = action.payload;
    },

    otherTeamChat: (state, action) => {
      state.other_team_chats = action.payload;
    },

    deleteGroupChat: (state, action) => {
      state.all_team_chats = state.all_team_chats.filter(
        (chat) => chat._id !== action.payload
      );
    },
  },
});

export const { addAllteamChat, deleteGroupChat, otherTeamChat, setChatInfo } =
  chatSlice.actions;
export default chatSlice.reducer;
