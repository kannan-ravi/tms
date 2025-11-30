import React from "react";
import { Box } from "@mui/material";
import {
  ChecklistOutlined,
  CalendarMonthOutlined,
  ArticleOutlined,
  ImageOutlined,
  AudiotrackOutlined,
} from "@mui/icons-material";

import ChatMessage from "../../components/chat/chat-message/ChatMessage";

import ChatBottomInput from "../../components/chat/bottom-input/ChatBottomInput";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { useEffect, useRef } from "react";
import { environment } from "../../constants/environment";
import { setMessages } from "../../app/features/messageSlice";

import { toastError } from "../../app/features/toastSlice";
import useSocket from "../../hooks/useSocket";

export default function Chat() {
  const { chatId } = useParams();
  const drawerListData = [
    {
      icon: <ChecklistOutlined />,
      text: "Create a Task",
      url: `/create-task/${chatId}`,
      type: "link",
    },
    {
      icon: <CalendarMonthOutlined />,
      text: "Schedule a Meeting",
      url: "/schedule-meeting",
      type: "link",
    },
    // {
    //   icon: <ScreenShareOutlined />,
    //   text: "Screen Sharing",
    //   url: "/screen-sharing",
    // },
    {
      icon: <ArticleOutlined />,
      text: "Document",
      type: "document",
    },
    {
      icon: <ImageOutlined />,
      text: "Photo & Video Library",
      type: "photos-videos",
    },
    {
      icon: <AudiotrackOutlined />,
      text: "Audio",
      type: "audio",
    },
  ];

  const { user } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  // const [socketConnected, setSocketConnected] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const socketRef = useSocket();
  useEffect(() => {
    socketRef.current.on("receive_message", (message) => {
      dispatch(setMessages([...messages, message]));
    });
    scrollToBottom();
  }, [dispatch, messages]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${environment}/api/messages/${chatId}`);
      const data = await response.json();
      dispatch(setMessages(data));

      socketRef.current.emit("chat_user", user);
      socketRef.current.emit("join chat", chatId);
    };
    fetchData();
  }, [chatId, dispatch]);

  const handleMessageSent = async (messageInput) => {
    try {
      const sendMessageResponse = await fetch(environment + "/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageInput),
      });

      const messRes = await sendMessageResponse.json();
      socketRef.current.emit("sendMessage", messRes);
      dispatch(setMessages([...messages, messRes]));
    } catch (error) {
      dispatch(toastError(error.data.message));
    }
  };

  const handleDocument = async (e, textType) => {
    try {
      const file = e.target.files[0];
      const fileType = file.type;
      const fileTypeArray = fileType.split("/");

      if (!file) {
        return dispatch(toastError("Please select a file"));
      }

      if (!fileType) {
        return dispatch(toastError("File type not recognized"));
      }

      if (fileTypeArray.length !== 2) {
        return dispatch(toastError("Invalid file type format"));
      }

      const formData = new FormData();
      formData.append("type", textType);

      formData.append("chat_name", chatId);
      formData.append("chat_document", file);

      const sendMessageResponse = await fetch(
        environment + "/api/messages/file",
        {
          method: "POST",
          body: formData,
        }
      );

      const messRes = await sendMessageResponse.json();

      socketRef.current.emit("sendMessage", messRes);
      dispatch(setMessages([...messages, messRes]));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      {messages.length > 0 && (
        <Box px={2} mb={8} mt={3}>
          {/* <ChatDateBadge /> */}

          {messages?.map((message) => {
            if (message?.type === "text") {
              return (
                <ChatMessage
                  key={message._id}
                  message={message}
                  time={format(new Date(message?.updatedAt), "hh:mm a")}
                  type={message?.type}
                />
              );
            } else if (message?.type === "task") {
              return (
                <ChatMessage
                  key={message._id}
                  message={message}
                  time={format(new Date(message?.updatedAt), "hh:mm a")}
                  type={message?.type}
                />
              );
            } else if (message?.type === "document") {
              return (
                <ChatMessage
                  key={message._id}
                  message={message}
                  time={format(new Date(message?.updatedAt), "hh:mm a")}
                  type={message?.type}
                />
              );
            } else if (message?.type === "photos-videos") {
              return (
                <ChatMessage
                  key={message._id}
                  message={message}
                  time={format(new Date(message?.updatedAt), "hh:mm a")}
                  type={message?.type}
                />
              );
            } else if (message?.type === "audio") {
              return (
                <ChatMessage
                  key={message._id}
                  message={message}
                  time={format(new Date(message?.updatedAt), "hh:mm a")}
                  type={message?.type}
                />
              );
            }
          })}
          <Box ref={messagesEndRef}></Box>
        </Box>
      )}
      <ChatBottomInput
        drawerListData={drawerListData}
        chatId={chatId}
        sendMessage={handleMessageSent}
        handleDocument={handleDocument}
      />
    </Box>
  );
}
