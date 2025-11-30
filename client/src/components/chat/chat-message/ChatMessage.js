import React from "react";
import { Box, Stack } from "@mui/material";
import { useState } from "react";
import ChatBottomDrawer from "../bottom-drawer/ChatBottomDrawer";
import { useSelector } from "react-redux";
import ChatTextMessage from "./ChatTextMessage";
import ChatFileMessage from "./ChatFileMessage";
import ChatTaskMessage from "./ChatTaskMessage";
import ChatMediaMessage from "./ChatMediaMessage";
import ChatAudioMessage from "./ChatAudioMessage";

export default function ChatMessage({ message, time, type }) {
  const isSeen = true;
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [priority, setPriority] = useState("");
  const drawerListData = [
    {
      text: "High",
    },
    {
      text: "Medium",
    },
  ];

  const { user } = useSelector((state) => state.user);

  return (
    <Stack
      justifyContent={
        message?.sender?._id === user?._id ? "flex-end" : "flex-start"
      }
      flexDirection="row"
      py={1}
    >
      <Box
        maxWidth="80%"
        bgcolor={`${
          priority === "High"
            ? "rgba(182, 18, 18, 1)"
            : priority === "Medium"
            ? "rgba(0, 122, 255, 1)"
            : "rgba(220, 247, 197, 1)"
        }`}
        borderRadius="6px"
        display="flex"
      >
        {type === "text" ? (
          <ChatTextMessage message={message} time={time} isSeen={isSeen} />
        ) : type === "document" ? (
          <ChatFileMessage
            message={message}
            isSeen={isSeen}
            time={time}
            priority={priority}
          />
        ) : type === "task" &&
          (message?.sender?._id === user?._id ||
            user?._id === user?.team.team_chat.group_admin._id) ? (
          <ChatTaskMessage message={message} time={time} />
        ) : type === "photos-videos" ? (
          <ChatMediaMessage message={message} isSeen={isSeen} time={time} />
        ) : type === "audio" ? (
          <ChatAudioMessage message={message} isSeen={isSeen} time={time} />
        ) : null}
      </Box>
      <ChatBottomDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        drawerListData={drawerListData}
        title="Set Priority"
        setPriority={setPriority}
      />
    </Stack>
  );
}
