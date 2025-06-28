import { DoneAll } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function ChatTextMessage({ message, time, isSeen }) {
  const { user } = useSelector((state) => state.user);

  return (
    <Box px={1.5} py={1}>
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
      <Typography component="p" variant="body1" width="max-content">
        {message.message}
      </Typography>
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
    </Box>
  );
}
