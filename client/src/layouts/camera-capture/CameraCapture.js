import React from "react";
import {
  Camera,
  FlashOff,
  FlashOn,
  FlipCameraIos,
  KeyboardBackspace,
  StopCircle,
  Videocam,
} from "@mui/icons-material";
import { Box, Button, ButtonGroup, Stack } from "@mui/material";
import { useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../app/features/messageSlice";
import { useNavigate } from "react-router-dom";
import { environment } from "../../constants/environment";
import WebCam from "react-webcam";
import useSocket from "../../hooks/useSocket";
import ImageCapture from "../../components/capture/ImageCapture";
import VideoCapture from "../../components/capture/VideoCapture";

export default function CameraCapture() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);

  const divRef = useRef(null);

  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [cameraCaptureMode, setCameraCaptureMode] = useState("photo");
  const [isRearSideCamera, setIsRearSideCamera] = useState(true);

  const socketRef = useSocket();

  const captureModeButton = (mode) => {
    const captureModeButtonStyle = {
      backgroundColor: cameraCaptureMode === mode ? "black" : "white",
      color: cameraCaptureMode === mode ? "white" : "black",
      "&:hover": {
        backgroundColor: cameraCaptureMode === mode ? "black" : "white",
        color: cameraCaptureMode === mode ? "white" : "black",
      },
    };

    return captureModeButtonStyle;
  };

  const handleUploadCameraPhoto = async () => {
    if (imgSrc) {
      const blob = await fetch(imgSrc).then((res) => res.blob());
      const formData = new FormData();
      formData.append("type", "photos-videos");
      formData.append("chat_name", user.team.team_chat._id);
      formData.append("chat_document", blob);
      try {
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
        navigate(`/chat/${user.team.team_chat._id}`);
      } catch (error) {
        console.log(error);
      }
    } else if (recordedVideo) {
      const formData = new FormData();
      formData.append("type", "photos-videos");
      formData.append("chat_name", user.team.team_chat._id);
      formData.append("chat_document", recordedVideo, "captured_video.webm");

      try {
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
        navigate(`/chat/${user.team.team_chat._id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const toggleFlashlight = useCallback(() => {
    const videoTrack = webcamRef.current?.video?.srcObject?.getVideoTracks()[0];
    if (videoTrack && "getCapabilities" in videoTrack.getSettings()) {
      const capabilities = videoTrack.getCapabilities();
      if (capabilities.torch) {
        videoTrack.applyConstraints({
          advanced: [{ torch: !isFlashlightOn }],
        });
        setIsFlashlightOn(!isFlashlightOn);
      }
    }
  }, [isFlashlightOn]);

  const mediaRecorder = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [stream, setStream] = useState(null);
  const [videoChunks, setVideoChunks] = useState([]);
  const [recordedVideo, setRecordedVideo] = useState(null);

  const startRecording = async () => {
    setCapturing(true);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setStream(stream);
    const media = new MediaRecorder(stream, { mimeType: "video/webm" });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localVideoChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localVideoChunks.push(event.data);
    };
    setVideoChunks(localVideoChunks);
  };

  const stopRecording = () => {
    setCapturing(false);
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const videoBlob = new Blob(videoChunks, { type: "video/webm" });

      setRecordedVideo(videoBlob);
      setVideoChunks([]);

      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  };

  return (
    <Box position="relative" sx={{ height: "100vh" }} ref={divRef}>
      <KeyboardBackspace
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: "2%",
          left: "6%",
          fontSize: "40px",
          color: "white",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      />

      {!imgSrc && !recordedVideo && (
        <Stack justifyContent="center" alignItems="center" height="100%">
          {cameraCaptureMode === "photo" ? (
            <WebCam
              ref={webcamRef}
              audio={false}
              width={"100%"}
              height={"100%"}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: isRearSideCamera ? "environment" : "user",
              }}
            />
          ) : (
            <WebCam
              ref={webcamRef}
              audio={true}
              width={"100%"}
              height={"100%"}
              videoConstraints={{
                facingMode: isRearSideCamera ? "environment" : "user",
              }}
            />
          )}
          <Box
            sx={{
              position: "absolute",
              bottom: "10%",
              left: 0,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
              padding: "0 20px",
            }}
          >
            <ButtonGroup>
              <Button
                sx={captureModeButton("photo")}
                onClick={() => setCameraCaptureMode("photo")}
                variant={
                  cameraCaptureMode === "photo" ? "contained" : "outlined"
                }
              >
                photo
              </Button>
              <Button
                sx={captureModeButton("video")}
                onClick={() => setCameraCaptureMode("video")}
                variant={
                  cameraCaptureMode === "video" ? "contained" : "outlined"
                }
              >
                video
              </Button>
            </ButtonGroup>
            <Stack
              direction="row"
              alignItems="center"
              gap={2}
              justifyContent="space-between"
              width="100%"
            >
              <button
                style={{
                  width: "80px",
                  height: "80px",
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  cursor: "pointer",
                }}
                onClick={toggleFlashlight}
              >
                {isFlashlightOn ? (
                  <FlashOff sx={{ fontSize: "40px" }} />
                ) : (
                  <FlashOn sx={{ fontSize: "40px" }} />
                )}
              </button>
              <button
                style={{
                  width: "80px",
                  height: "80px",
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  cursor: "pointer",
                }}
              >
                {cameraCaptureMode === "photo" ? (
                  <Camera sx={{ fontSize: "50px" }} onClick={capture} />
                ) : capturing ? (
                  <StopCircle
                    sx={{ fontSize: "50px" }}
                    onClick={stopRecording}
                  />
                ) : (
                  <Videocam
                    sx={{ fontSize: "50px" }}
                    onClick={startRecording}
                  />
                )}
              </button>
              <button
                style={{
                  width: "80px",
                  height: "80px",
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  cursor: "pointer",
                }}
              >
                <FlipCameraIos
                  sx={{ fontSize: "40px" }}
                  onClick={() => setIsRearSideCamera(!isRearSideCamera)}
                />
              </button>
            </Stack>
          </Box>
          <KeyboardBackspace
            sx={{
              fontSize: "40px",
              color: "black",
              position: "absolute",
              top: "2%",
              left: "6%",
              backdropFilter: "blur(10px)",
              backgroundColor: "white",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={() => navigate(-1)}
          />
        </Stack>
      )}

      <ImageCapture
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
        handleUploadCameraPhoto={handleUploadCameraPhoto}
      />
      <VideoCapture
        recordedVideo={recordedVideo}
        setRecordedVideo={setRecordedVideo}
        handleUploadCameraPhoto={handleUploadCameraPhoto}
      />
    </Box>
  );
}
