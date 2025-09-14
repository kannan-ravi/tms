import React from "react";
import { Typography, Box, Stack } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "@mui/icons-material";
import RoomCard from "./RoomCard";
import { useEffect } from "react";
import { environment } from "../../constants/environment";
import { useDispatch, useSelector } from "react-redux";
import { addAllteamChat, otherTeamChat } from "../../app/features/chatSlice";

function ChatRooms() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { other_team_chats } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const getAllChats = async () => {
    try {
      const response = await fetch(`${environment}/api/chats/all`).then((res) =>
        res.json()
      );
      const filteredChats = response.filter(
        (chat) => chat._id !== user.team.team_chat._id
      );

      dispatch(addAllteamChat(response));
      dispatch(otherTeamChat(filteredChats));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllChats();
  }, []);
  return (
    <>
      {other_team_chats.length > 0 && (
        <Box mt={12} mb={4}>
          <Stack direction="row" alignItems="center" px={2} gap={1}>
            <ArrowLeft
              fontSize="large"
              onClick={() => navigate(-1)}
              sx={{ cursor: "pointer" }}
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", fontFamily: "inherit" }}
            >
              Other Teams
            </Typography>
          </Stack>
          {/* --------------------------Group------------------------ */}
          <Stack gap={3} mt={5}>
            {other_team_chats.map((chat, index) => (
              <RoomCard key={index} chat={chat} />
            ))}
          </Stack>
        </Box>
      )}
    </>
  );
}

export default ChatRooms;
