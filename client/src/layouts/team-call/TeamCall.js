import { Box, Stack, Typography } from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function TeamCall() {
  const navigate = useNavigate();
  return (
    <Box px={2}>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="space-between"
        mt={4}
      >
        <Typography
          component="p"
          variant="body1"
          onClick={() => navigate(-1)}
          fontWeight="600"
          color="rgba(0, 122, 255, 1)"
        >
          Back
        </Typography>
        <Typography
          component="p"
          variant="body1"
          bgcolor="rgba(0, 122, 255, 1)"
          color="white"
          borderRadius={2}
          py={0.8}
          px={3.5}
        >
          Team List
        </Typography>
        <Typography
          component="p"
          variant="body1"
          fontWeight="600"
          color="rgba(0, 122, 255, 1)"
        >
          Clear
        </Typography>
      </Stack>

      <Stack gap={2.5} mt={6}>
        {[0, 1, 2, 3].map((item, index) => (
          <Stack direction="row" alignItems="center" gap={1} key={index}>
            <RemoveCircle
              fontSize="medium"
              sx={{ color: "rgba(255, 59, 48, 1)" }}
            />
            <img
              src="https://via.placeholder.com/70"
              alt="user"
              style={{ borderRadius: "50%", maxWidth: "40px" }}
            />
            <Box>
              <Typography component="p" variant="body1">
                Name
              </Typography>
              <Typography
                component="p"
                variant="body2"
                color="rgba(142, 142, 147, 1)"
              >
                Frontend senior developer
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
