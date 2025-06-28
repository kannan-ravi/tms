import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import connectDB from "./config/dbConn.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";
import teamRoutes from "./routes/team.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import checkListRoutes from "./routes/checklist.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import categoriesRoutes from "./routes/category.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = 5000 || process.env.PORT;
connectDB();
app.use(cors());
app.use(express.static("./server/uploads"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/check-list", checkListRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/notification", notificationRoutes);

const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "/client/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
  server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
