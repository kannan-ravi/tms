import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  team: [],
  allTeams: [],
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action) => {
      state.team = action.payload;
    },
    setAllTeams: (state, action) => {
      state.allTeams = action.payload;
    },
    deleteTeam: (state, action) => {
      state.allTeams = state.allTeams.filter(
        (team) => team._id !== action.payload
      );
    },
  },
});

export const { setTeam, setAllTeams, deleteTeam } = teamSlice.actions;
export default teamSlice.reducer;
