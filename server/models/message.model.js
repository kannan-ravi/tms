import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["text", "document", "photos-videos", "audio", "task"],
    },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String, trim: true },
    file: {
      file_url: { type: String },
      file_size: { type: Number },
      file_format: { type: String },
    },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    chat_name: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    read_by: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const messageModel = mongoose.model("Message", messageSchema);
export default messageModel;
