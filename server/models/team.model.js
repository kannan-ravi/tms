import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  team_chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
});

const teamModel = mongoose.model("Team", teamSchema);
export default teamModel;
