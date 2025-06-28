import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    position: { type: String, required: true },
    profile_image_url: { type: String },
    phone_number: { type: Number },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    type: {
      type: String,
      enum: ["user", "rep", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const usersModel = mongoose.model("User", usersSchema);
export default usersModel;
