import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["not-started", "in-progress", "completed"],
      default: "not-started",
    },
    dueDate: { type: Date },
    dueTime: { type: Date },
    assigned_to: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    assigned_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: { type: Array },
    follower: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    files_url: { type: Array },
    is_approved: { type: Boolean, default: false },
    checklist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Checklist" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const tasksModel = mongoose.model("Task", tasksSchema);
export default tasksModel;
