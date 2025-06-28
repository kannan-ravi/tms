import { Lock } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setEditTaskMessage } from "../../../app/features/messageSlice";

export default function ChatTaskMessage({ message, time }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  return (
    <Box px={1.5} py={1}>
      <Box py={0.5}>
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
      <Link
        to={
          user._id === user.team.team_chat.group_admin._id
            ? `/edit-task/${message.task}`
            : ""
        }
        onClick={() => dispatch(setEditTaskMessage(message._id))}
        style={{ textDecoration: "none", color: "unset" }}
      >
        <Typography component="p" variant="body1" width="fit-content">
          {message.message}
        </Typography>
      </Link>
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
        <Lock
          fontSize="small"
          sx={{
            alignSelf: "flex-end",
            color: "rgba(151, 151, 151, 1)",
          }}
        />
      </Stack>
    </Box>
  );
}
