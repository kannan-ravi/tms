import React from 'react'
import { DescriptionTwoTone, DoneAll } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ChatBottomDrawer from "../bottom-drawer/ChatBottomDrawer";

export default function ChatSentImage() {
  const isSeen = true;
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [priority, setPriority] = useState("");
  const drawerListData = [
    {
      text: "High",
    },
    {
      text: "Medium",
    },
  ];
  return (
    <Stack justifyContent="flex-end" flexDirection="row" py={1}>
      <Box
        bgcolor={`${
          priority === "High"
            ? "rgba(182, 18, 18, 1)"
            : priority === "Medium"
            ? "rgba(0, 122, 255, 1)"
            : "rgba(220, 247, 197, 1)"
        }`}
        borderRadius="6px"
        onClick={toggleDrawer(true)}
      >
        <Box px={0.5} py={0.5}>
          <Box
            bgcolor="rgba(255, 255, 255, 0.25)"
            display="flex"
            alignItems="center"
            gap={1}
            p={1}
            borderRadius="4px"
          >
            <DescriptionTwoTone
              fontSize="large"
              sx={{
                color:
                  priority !== ""
                    ? "rgba(255, 255, 255, 1)"
                    : "rgba(167, 167, 167, 0.5)",
              }}
            />
            <Typography
              component="p"
              variant="h6"
              width="max-content"
              color={
                priority !== ""
                  ? "rgba(255, 255, 255, 1)"
                  : "rgba(167, 167, 167, 0.5)"
              }
            >
              IMG_0475
            </Typography>
          </Box>
        </Box>
        <Box px={2} py={1} display="flex" gap={1}>
          <Typography
            component="p"
            fontSize="12px"
            variant="body2"
            width="max-content"
            color={priority !== "" && "rgba(255, 255, 255, 1)"}
          >
            2.4 MB png
          </Typography>
          <Typography
            component="p"
            variant="body2"
            fontSize="12px"
            color={
              priority !== "" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0.45)"
            }
            width="max-content"
            alignSelf="flex-end"
          >
            10:00
          </Typography>
          <DoneAll
            fontSize="small"
            sx={{
              alignSelf: "flex-end",
              color: isSeen ? "rgba(0, 167, 83, 1)" : "rgba(151, 151, 151, 1)",
            }}
          />
        </Box>
      </Box>
      <ChatBottomDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        drawerListData={drawerListData}
        title="Set Priority"
        setPriority={setPriority}
      />
    </Stack>
  );
}
