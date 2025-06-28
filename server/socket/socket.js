import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = new Map();

io.on("connection", (socket) => {
  // CODE -> CHAT
  socket.on("chat_user", (user) => {
    socket.join(user._id);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("sendMessage", (messageData) => {
    const { chat_name, ...rest } = messageData;
    socket.to(chat_name).emit("receive_message", rest);
  });

  // CODE -> TASKS
  socket.on("get notifications", (user) => {
    userSocketMap.set(user._id, socket.id);
  });

  socket.on("task created", (socketData) => {
    try {
      const parsedData =
        typeof socketData === "string" ? JSON.parse(socketData) : socketData;
      const { assigned_to, assigned_by } = parsedData;

      if (Array.isArray(assigned_to)) {
        assigned_to.forEach((recipient) => {
          const recipientSocketId = userSocketMap.get(recipient.id);
          if (recipientSocketId) {
            io.to(recipientSocketId).emit("receive notification", {
              message: `A task has been assigned by ${assigned_by.full_name}`,
            });
          } else {
            console.error(`Socket ID not found for recipient ${recipient.id}`);
          }
        });
      } else {
        console.error("assigned_to is not an array or is undefined");
      }
    } catch (error) {
      console.error("Failed to parse socketData:", error);
    }
  });
  socket.on("disconnect", () => {});
});

export { app, io, server };
