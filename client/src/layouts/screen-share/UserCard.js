import { Circle } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

export default function UserCard({ isActive }) {
  return (
    <Box
      p={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack direction="row" alignItems="center" gap={2}>
        <img
          src="https://via.placeholder.com/60"
          alt="user"
          style={{ borderRadius: "50%" }}
        />
        <Box>
          <Typography component="p" variant="h6" fontFamily="inherit">
            Name
          </Typography>
          <Typography
            component="p"
            variant="body1"
            fontFamily="inherit"
            color="rgba(142, 142, 147, 1)"
          >
            Frontend developer
          </Typography>
        </Box>
      </Stack>

      <Circle
        sx={{
          color: isActive ? "rgba(0, 167, 83, 1)" : "rgba(255, 59, 48, 1)",
        }}
      />
    </Box>
  );
}
