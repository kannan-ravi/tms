import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    message: { type: String },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["chat_message", "task"] },
    receiver: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    is_seen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const notificationModel = mongoose.model("Notification", notificationSchema);
export default notificationModel;
