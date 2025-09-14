import React from "react";
import { CircularProgress, Stack } from "@mui/material";


export default function LazyLoader() {
  return (
    <Stack height="100vh" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Stack>
  );
}
