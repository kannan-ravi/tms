import { Box, Typography } from "@mui/material";

export default function ChatDateBadge() {
  return (
    <Box display="flex" justifyContent="center" my={3}>
      <Typography
        component="p"
        variant="body2"
        fontSize="12px"
        color="rgba(60, 60, 67, 1)"
        bgcolor="rgba(221, 221, 233, 1)"
        width="fit-content"
        px={2}
        py={0.5}
        borderRadius="15px"
      >
        Thurs, Mar 20
      </Typography>
    </Box>
  );
}
