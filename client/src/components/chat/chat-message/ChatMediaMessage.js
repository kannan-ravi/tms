import React from 'react'
import { Box, Modal, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { environment } from "../../../constants/environment";
import { findFileExtension } from "../../../constants/fileFunctions";
import { DoneAll, PlayCircle } from "@mui/icons-material";
import { useSelector } from "react-redux";

export default function ChatMediaMessage({ message, time, isSeen }) {
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.user);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fileExtension = findFileExtension(message.file.file_format);

  return (
    <Box px={1} py={1}>
      <Box px={0.5} pb={1} pt={0.5}>
        {message?.sender?._id !== user?._id && (
          <Typography
            component="p"
            variant="body2"
            fontWeight="600"
            width="max-content"
          >
            {message.sender.full_name}
          </Typography>
        )}
      </Box>
      {fileExtension === "image" ? (
        <img
          src={`${environment}/${message.file.file_url}`}
          alt={"alt text"}
          style={{ borderRadius: "4px", maxHeight: "450px", maxWidth: "100%" }}
          onClick={handleOpen}
        />
      ) : fileExtension === "video" ? (
        <div
          style={{
            position: "relative",
            cursor: "pointer",
            maxWidth: "100%",
          }}
          onClick={handleOpen}
        >
          <video
            src={`${environment}/${message.file.file_url}`}
            style={{
              width: "100%",
              borderRadius: "4px",
            }}
          />
          <PlayCircle
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "54px",
              height: "54px",
              zIndex: 1,
              color: "lightgray",
            }}
          />
        </div>
      ) : null}

      <Stack direction="row" gap={0.5} justifyContent="flex-end" mt={0.5}>
        <Typography
          component="p"
          variant="body2"
          fontSize="12px"
          color="rgba(0, 0, 0, 0.45)"
          width="max-content"
          alignSelf="flex-end"
        >
          {time}
        </Typography>
        <DoneAll
          fontSize="small"
          sx={{
            alignSelf: "flex-end",
            color: isSeen ? "rgba(0, 167, 83, 1)" : "rgba(151, 151, 151, 1)",
          }}
        />
      </Stack>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            bgcolor: "transparent",
            display: "flex",
            justifyContent: "center",
            p: 2,

            "&:focus": {
              outline: "none",
            },
          }}
        >
          {fileExtension === "image" ? (
            <img
              src={`${environment}/${message.file.file_url}`}
              alt={"alt text"}
              style={{
                borderRadius: "8px",
                maxHeight: "450px",
                maxWidth: "100%",
              }}
            />
          ) : fileExtension === "video" ? (
            <video
              controls
              autoPlay
              style={{
                maxHeight: "80vh",
                maxWidth: "80vw",
                outline: "none",
                borderRadius: "4px",
              }}
            >
              <source
                src={`${environment}/${message.file.file_url}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : null}
        </Box>
      </Modal>
    </Box>
  );
}

