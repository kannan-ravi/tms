import React from "react";
import { Button } from "@mui/material";

export default function SubmitButton(props) {
  return (
    <Button
      type="submit"
      variant="contained"
      size="large"
      fullWidth
      onClick={props.onClick}
      sx={{
        py: 2,
        borderRadius: "49px",
        bgcolor: "rgba(75, 123, 229, 1)",
        fontWeight: "600",
        fontSize: "1rem",
      }}
    >
      {props.text}
    </Button>
  );
}
