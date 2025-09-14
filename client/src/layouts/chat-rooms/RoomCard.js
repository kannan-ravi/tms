import React from "react";
import { ArrowRight, DoneAll } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function RoomCard({ chat }) {
  return (
    <Stack direction="row" alignItems="center" gap={2.5} px={2}>
      <img
        style={{ height: 50, width: 50, borderRadius: "50%" }}
        alt="Profile"
        src="https://via.placeholder.com/50"
      />
      <Link
        to={`/create-task/${chat._id}`}
        style={{
          width: "100%",
          textDecoration: "none",
          color: "unset",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Typography
            component="p"
            variant="h6"
            fontWeight="600"
            fontFamily="inherit"
          >
            {chat.chat_name}
          </Typography>
          <Typography component="p" variant="caption">
            20/03/24
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <DoneAll />
          <Typography
            component="p"
            variant="body1"
            fontFamily="inherit"
            color="rgba(142, 142, 147, 1)"
          >
            2 new messages
          </Typography>
        </Stack>
      </Link>
      <ArrowRight />
    </Stack>
  );
}
