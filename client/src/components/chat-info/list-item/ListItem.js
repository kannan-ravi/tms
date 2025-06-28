import { KeyboardArrowRight, Star } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import React from "react";

export default function ListItem({ data }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      py={2}
      borderTop="1px solid rgba(0, 0, 0, 0.2)"
      borderBottom="1px solid rgba(0, 0, 0, 0.2)"
    >
      <Stack direction="row" alignItems="center" gap={2}>
        <Star
          sx={{
            color: "white",
            backgroundColor: "rgba(251, 181, 0, 1)",
            p: 1,
            borderRadius: "6px",
            fontSize: "2.2rem",
            cursor: "pointer",
          }}
        />
        <Typography component="p" variant="h6">
          {data.title}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        <Typography component="p" variant="body1" color="rgba(60, 60, 67, 0.6)">
          {data.number || "Default (None)"}
        </Typography>
        <KeyboardArrowRight sx={{ color: "rgba(60, 60, 67, 0.6)" }} />
      </Stack>
    </Stack>
  );
}
