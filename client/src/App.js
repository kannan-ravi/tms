import React from "react";
import { Box } from "@mui/material";
import SnackBarToast from "./components/ui/snack-bar-toast/SnackBarToast";
import router from "./router";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <Box
      maxWidth="500px"
      display="flex"
      flexDirection="column"
      mx="auto"
      position="relative"
      maxHeight="100vh"
    >
      <SnackBarToast />
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
