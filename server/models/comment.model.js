import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment: { type: String, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;
