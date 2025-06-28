import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { environment } from "../../../constants/environment";
import { deleteUser } from "../../../app/features/userSlice";
import { toastError, toastSuccess } from "../../../app/features/toastSlice";

export default function AdminUserCard({ user }) {
  const dispatch = useDispatch();
  const handleDeleteUser = async () => {
    try {
      await fetch(`${environment}/api/users/${user._id}`, {
        method: "DELETE",
      }).then((res) => res.json());
      dispatch(deleteUser(user._id));
      dispatch(toastSuccess("User Deleted Successfully"));
    } catch (error) {
      dispatch(toastError(error.message || "Something Went Wrong"));
      console.log(error);
    }
  };
  return (
    <Stack
      key={user._id}
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
        <img
          src={user.profile_image_url}
          alt={user.full_name}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          }}
        />
        <Typography component="h3" variant="body1">
          {user.full_name}
        </Typography>
      </Stack>
      <Stack direction="row">
        <IconButton aria-label="delete">
          <Edit fontSize="small" />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDeleteUser}>
          <Delete fontSize="small" color="error" />
        </IconButton>
      </Stack>
    </Stack>
  );
}
