import { DescriptionTwoTone, DoneAll, FileDownload } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import {
  fileFormatExtractor,
  fileNameExtractor,
  formatFileSize,
} from "../../../constants/fileFunctions";
import { toastSuccess } from "../../../app/features/toastSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ChatFileMessage({ message, isSeen, time, priority }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_ENVIRONMENT}/${imageUrl}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "image/jpeg",
          },
        }
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = fileNameExtractor(imageUrl);
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      dispatch(toastSuccess("Image downloaded successfully"));
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <Box>
      <Box px={0.5} py={0.5}>
        <Box px={1} py={0.5}>
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
        <Box
          bgcolor="rgba(255, 255, 255, 0.25)"
          display="flex"
          alignItems="center"
          gap={1}
          p={1}
          borderRadius="4px"
        >
          <DescriptionTwoTone
            fontSize="medium"
            sx={{
              color:
                priority !== ""
                  ? "rgba(255, 255, 255, 1)"
                  : "rgba(107, 107, 107, 1)",
            }}
          />
          <Typography
            component="p"
            variant="body2"
            width="fit-content"
            color={
              priority !== ""
                ? "rgba(255, 255, 255, 1)"
                : "rgba(107, 107, 107, 1)"
            }
          >
            {fileNameExtractor(message.file.file_url)}
          </Typography>
        </Box>
      </Box>
      <Stack
        direction="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={1}
        gap={1}
      >
        <Typography
          component="p"
          fontSize="12px"
          variant="body2"
          width="max-content"
          color={priority !== "" && "rgba(255, 255, 255, 1)"}
        >
          {formatFileSize(message.file.file_size)}
          {"  --  "}
          {fileFormatExtractor(message.file.file_format)}
        </Typography>
        <Stack direction="row" gap={0.5}>
          <FileDownload
            fontSize="small"
            sx={{ cursor: "pointer", color: "rgba(0, 0, 0, 0.4)" }}
            onClick={() => handleDownload(message.file.file_url)}
          />

          <Typography
            component="p"
            variant="body2"
            fontSize="12px"
            color={
              priority !== "" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0.45)"
            }
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
      </Stack>
    </Box>
  );
}
