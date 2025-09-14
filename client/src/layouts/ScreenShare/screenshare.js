import React from "react";
import { Box } from "@mui/material";

import ChatDateBadge from "../../components/chat/date-badge/ChatDateBadge";
import ChatReceivedMessage from "../../components/chat/received-message/ChatReceivedMessage";

import ChatSentMessage from "../../components/chat/sent-message/ChatSentMessage";
import ChatSentImage from "../../components/chat/sent-image/ChatSentImage";

export default function TeamPage() {
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
