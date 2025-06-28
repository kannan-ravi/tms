import {
  Add,
  CameraAltOutlined,
  KeyboardVoiceOutlined,
  Send,
  StopCircle,
} from "@mui/icons-material";
import { Box, Stack, TextareaAutosize } from "@mui/material";
import { useState, useRef } from "react";
import ChatBottomDrawer from "../bottom-drawer/ChatBottomDrawer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../../app/features/messageSlice";
import { environment } from "../../../constants/environment";

import { toastError } from "../../../app/features/toastSlice";

export default function ChatBottomInput({
  drawerListData,
  chatId,
  sendMessage,
  handleDocument,
}) {
  const inputField = {
    border: "none",
    outline: "none",
    width: "100%",
    p: "0px 10px",
    borderRadius: "4px",
    fontFamily: "Inherit",
    fontSize: "1rem",
  };

  const iconColor = { color: "rgba(0, 122, 255, 1)", cursor: "pointer" };

  const [open, setOpen] = useState(false);
  const { messages } = useSelector((state) => state.message);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [messageInput, setMessageInput] = useState({
    content: "",
    chatId: chatId,
    type: "text",
  });

  const handleMessageSent = async (e) => {
    e.preventDefault();
    await sendMessage(messageInput);
    setMessageInput({ content: "", chatId: chatId, type: "text" });
  };

  const [permission, setPermission] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState("inactive");

  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  const dispatch = useDispatch();

  const toggleMicrophone = async () => {
    if (!permission) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        streamRef.current = stream;
        startRecording(stream);
      } catch (error) {
        alert("Error accessing microphone: " + error.message);
      }
    } else {
      if (recordingStatus === "inactive") {
        startRecording(streamRef.current);
      } else {
        stopRecording();
      }
    }
  };

  const startRecording = (stream) => {
    const mediaRecorder = new MediaRecorder(stream);

    const chunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunks, { type: "audio/webm" });

      const audioUrl = URL.createObjectURL(audioBlob);

      handleSendAudio(audioBlob);
      setRecordingStatus("inactive");
      chunks.length = 0;
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setRecordingStatus("recording");
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingStatus === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  const handleSendAudio = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append("type", "audio");

      formData.append("chat_name", chatId);
      formData.append("chat_document", audioBlob);

      const sendMessageResponse = await fetch(
        environment + "/api/messages/file",
        {
          method: "POST",
          body: formData,
        }
      );

      const messRes = await sendMessageResponse.json();

      dispatch(setMessages([...messages, messRes]));
    } catch (error) {
      dispatch(toastError(error.message));
    }
  };
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        left: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        width="100%"
        bgcolor="rgba(246, 246, 246, 1)"
        px={2}
        py={1}
        gap={2}
        maxWidth="500px"
      >
        <Add fontSize="medium" sx={iconColor} onClick={toggleDrawer(true)} />
        <Stack
          direction="row"
          gap={1}
          p={1}
          alignItems="center"
          bgcolor="rgba(255, 255, 255, 1)"
          borderRadius="8px"
          flexGrow={1}
        >
          <TextareaAutosize
            aria-label="empty textarea"
            style={inputField}
            value={messageInput.content}
            autoFocus
            onChange={(e) =>
              setMessageInput({ ...messageInput, content: e.target.value })
            }
          />

          <Send sx={iconColor} onClick={handleMessageSent} />
        </Stack>
        <Stack direction="row" gap={1.5}>
          <Link to="/camera-capture" style={{ textDecoration: "none" }}>
            <CameraAltOutlined sx={iconColor} />
          </Link>
          {recordingStatus === "inactive" ? (
            <KeyboardVoiceOutlined
              style={{ color: "rgba(0, 122, 255, 1)", cursor: "pointer" }}
              onClick={toggleMicrophone}
            />
          ) : (
            <StopCircle
              style={{ color: "rgba(0, 122, 255, 1)", cursor: "pointer" }}
              onClick={stopRecording}
            />
          )}
        </Stack>
      </Stack>

      <ChatBottomDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        drawerListData={drawerListData}
        handleDocument={handleDocument}
      />
    </Box>
  );
}
