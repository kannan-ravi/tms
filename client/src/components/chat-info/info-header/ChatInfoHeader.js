import { Call, ChatBubble, Videocam } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function ChatInfoHeader() {
  const { chat } = useSelector((state) => state.chat);
  const headerIcon = {
    color: "rgba(0, 122, 255, 1)",
    backgroundColor: "rgba(237, 237, 255, 1)",
    p: 1.2,
    borderRadius: "50%",
    fontSize: "2.8rem",
    cursor: "pointer",
  };
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        py={2}
      >
        <Typography
          component="h2"
          variant="h6"
          fontWeight="600"
          fontFamily="inherit"
        >
          {chat.chat_name}
        </Typography>
        <Stack direction="row" gap={1}>
          <ChatBubble sx={headerIcon} />
          <Videocam sx={headerIcon} />
          <Call sx={headerIcon} />
        </Stack>
      </Stack>
      <Box
        py={2}
        borderTop={"1px solid rgba(0, 0, 0, 0.2)"}
        borderBottom={"1px solid rgba(0, 0, 0, 0.2)"}
      >
        <Typography component="p" variant="body1" fontSize="1.15rem">
          Team Memebers
        </Typography>
        <Stack direction="row" gap={1} flexWrap="wrap">
          {chat?.users
            ?.filter((members) => members.type !== "admin")
            .map((members, index, array) => (
              <Typography
                key={members._id}
                component="p"
                variant="body1"
                color="rgba(143, 155, 179, 1)"
              >
                {members.full_name}
                {index !== array.length - 1 ? "," : ""}
              </Typography>
            ))}
        </Stack>
      </Box>
    </>
  );
}
