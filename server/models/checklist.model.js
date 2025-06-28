import mongoose from "mongoose";

const checklistSchema = new mongoose.Schema(
  {
    list: { type: String, required: true },
    isChecked: { type: Boolean, default: false },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  },
  { timestamps: true }
);

const checklistModel = mongoose.model("Checklist", checklistSchema);
export default checklistModel;
