import { MoreHoriz, TripOriginOutlined } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

export default function ScheduledCard() {
  return (
    <Box p={2}>
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" gap={1} alignItems="center">
          <TripOriginOutlined
            sx={{ color: "rgba(0, 179, 131, 1)", fontSize: "1rem" }}
          />
          <Typography
            component="p"
            variant="body2"
            color="rgba(143, 155, 179, 1)"
          >
            10:00-13:00
          </Typography>
        </Stack>
        <MoreHoriz sx={{ color: "rgba(143, 155, 179, 1)" }} />
      </Stack>
      <Typography component="h2" variant="h6">
        Lorem ipsum dolor amit
      </Typography>
      <Typography component="p" variant="body2" color="rgba(143, 155, 179, 1)">
        Lorem ipsum dolor amit
      </Typography>
    </Box>
  );
}
