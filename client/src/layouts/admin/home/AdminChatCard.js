import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { environment } from "../../../constants/environment";
import { deleteGroupChat } from "../../../app/features/chatSlice";
import { useDispatch } from "react-redux";
import { toastError, toastSuccess } from "../../../app/features/toastSlice";

export default function AdminChatCard({ chat }) {
  const dispatch = useDispatch();
  const handleChatDelete = async () => {
    try {
      const response = await fetch(`${environment}/api/chats/${chat._id}`, {
        method: "DELETE",
      }).then((res) => res.json());
      dispatch(deleteGroupChat(chat._id));
      dispatch(toastSuccess("Chat Deleted Successfully"));
    } catch (error) {
      dispatch(toastError(error.message || "Something Went Wrong"));
      console.log(error);
    }
  };
  return (
    <Stack
      key={chat._id}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={1.5}
      backgroundColor="rgba(237, 237, 255, 1)"
      borderRadius={2}
      px={2}
      py={1}
    >
      <Stack direction="row" alignItems="center" gap={1.5}>
        <Typography component="h3" variant="body1">
          {chat.chat_name}
        </Typography>
      </Stack>
      <Stack direction="row">
        <IconButton aria-label="edit">
          <Edit fontSize="small" />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleChatDelete}>
          <Delete fontSize="small" color="error" />
        </IconButton>
      </Stack>
    </Stack>
  );
}
