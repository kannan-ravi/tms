import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: "tms",
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
