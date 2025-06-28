import { Box } from "@mui/material";
import {
  ChecklistOutlined,
  CalendarMonthOutlined,
  ScreenShareOutlined,
  ArticleOutlined,  
  ImageOutlined,
  AudiotrackOutlined,
} from "@mui/icons-material";

import ChatHeader from "../../components/chat/header/ChatHeader";
import ChatDateBadge from "../../components/chat/date-badge/ChatDateBadge";
import ChatReceivedMessage from "../../components/chat/received-message/ChatReceivedMessage";

import ChatSentMessage from "../../components/chat/sent-message/ChatSentMessage";
import ChatSentImage from "../../components/chat/sent-image/ChatSentImage";

import ChatBottomInput from "../../components/chat/bottom-input/ChatBottomInput";

export default function TeamPage() {
  const drawerListData = [
    { icon: <ChecklistOutlined />, text: "Create a Task", url: "/create-task" },
    {
      icon: <CalendarMonthOutlined />,
      text: "Schedule a Meeting",
      url: "/schedule-meeting",
    },
    {
      icon: <ScreenShareOutlined />,
      text: "Screen Sharing",
      url: "/screen-sharing",
    },
    { icon: <ArticleOutlined />, text: "Document", url: "/document" },
    {
      icon: <ImageOutlined />,
      text: "Photo & Video Library",
      url: "/photo-video",
    },
    { icon: <AudiotrackOutlined />, text: "Audio", url: "/audio" },
  ];

  return (
    <Box>
      <Box px={2}>
        <ChatDateBadge />
        <ChatReceivedMessage />
        <ChatSentMessage message="Good Morning Team" />
        <ChatSentMessage message="Sort out this query first" />
        <ChatSentImage />
      </Box>
      {/* <ChatBottomInput drawerListData={drawerListData} /> */}
    </Box>
  );
}
