import { Clear, Done } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import React from "react";

export default function VideoCapture({
  recordedVideo,
  handleUploadCameraPhoto,
  setRecordedVideo,
}) {
  const handleReTakeVideo = () => {
    setRecordedVideo(null);
  };
  return (
    <>
      {recordedVideo && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          height="100%"
          position="relative"
        >
          <video
            controls
            style={{
              width: "100%",
              padding: "0px 10px",
              borderRadius: "12px",
              zIndex: 1,
            }}
          >
            <source
              src={URL.createObjectURL(recordedVideo)}
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              maxWidth: "500px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
            }}
          >
            <button
              style={{
                position: "absolute",
                bottom: "6%",
                left: "10%",
                transform: "translate(0%, -50%)",
                width: "80px",
                height: "80px",
                border: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                backgroundColor: "#d9534f",
                cursor: "pointer",
              }}
              onClick={handleReTakeVideo}
            >
              <Clear sx={{ fontSize: "40px", color: "white" }} />
            </button>
            <button
              style={{
                position: "absolute",
                bottom: "6%",
                right: "10%",
                transform: "translate(0%, -50%)",
                width: "80px",
                height: "80px",
                border: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                backgroundColor: "#28a745",
                cursor: "pointer",
              }}
              onClick={handleUploadCameraPhoto}
            >
              <Done sx={{ fontSize: "40px", color: "white" }} />
            </button>
          </Box>
        </Stack>
      )}
    </>
  );
}
