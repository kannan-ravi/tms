import { Box } from "@mui/material";
import React from "react";
import ListItem from "../../components/chat-info/list-item/ListItem";
import ChatInfoHeader from "../../components/chat-info/info-header/ChatInfoHeader";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GroupInfo() {
  const { chat } = useSelector((state) => state.chat);
  const listData = [
    {
      title: "Meeting Scheduled",
      url: "/schedule-meeting",
      number: 2,
    },
    {
      title: "Media, Links and Docs",
      url: "/",
      number: 8,
    },
    {
      title: "Task Created",
      url: "/",
      number: 2,
    },
    {
      title: "Mute",
      url: "/",
      number: "No",
    },
    {
      title: "Custom Tone",
      url: "/schedule-meeting",
      number: null,
    },
  ];
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(https://via.placeholder.com/300)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "35vh",
        }}
      ></Box>
      <Box px={2}>
        <ChatInfoHeader />

        <Box pt={2} pb={6}>
          {listData.map((data, index) => {
            return <ListItem key={index} data={data} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}
