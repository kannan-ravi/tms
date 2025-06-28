import {
  ArrowBackIos,
  LocalPhoneOutlined,
  VideocamOutlined,
} from "@mui/icons-material";
import Chartheader from "../../../assets/images/Header.png";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { environment } from "../../../constants/environment";
import { useEffect, useState } from "react";
import { setChatInfo } from "../../../app/features/chatSlice";

export default function ChatHeader() {
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { chat } = useSelector((state) => state.chat);

  const getChatInfo = async () => {
    try {
      const response = await fetch(`${environment}/api/chats/${chatId}`).then(
        (res) => res.json()
      );
      dispatch(setChatInfo(response));
    } catch (error) {}
  };

  useEffect(() => {
    getChatInfo();
  }, [chatId]);
  return (
    <Stack
      px={2}
      py={2}
      direction="row"
      justifyContent="space-between"
      bgcolor="rgba(246, 246, 246, 1)"
      position="sticky"
      top={0}
      zIndex={1}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ArrowBackIos
          sx={{ cursor: "pointer", color: "rgba(0, 122, 255, 1)" }}
          onClick={() => navigate(-1)}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
          <img
            src={Chartheader}
            alt="Group Chat"
            style={{ borderRadius: "50%", width: "100%", maxWidth: "40px" }}
          />
          <Box>
            <Typography component="h1" variant="h6" fontWeight="600">
              {chat.chat_name}
            </Typography>
            {location.pathname !== `/group-info/${chatId}` && (
              <Link
                to={`/group-info/${chatId}`}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  component="p"
                  variant="body2"
                  fontSize="12px"
                  color="rgba(142, 142, 147, 1)"
                >
                  tap here for members info
                </Typography>
              </Link>
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* <VideocamOutlined
          fontSize="medium"
          sx={{ cursor: "pointer", color: "rgba(0, 122, 255, 1)" }}
        /> */}
        <Tooltip title="in-progress">
          <Link to="/team-call">
            <LocalPhoneOutlined
              fontSize="medium"
              sx={{ cursor: "pointer", color: "rgba(0, 122, 255, 1)" }}
            />
          </Link>
        </Tooltip>
      </Box>
    </Stack>
  );
}
