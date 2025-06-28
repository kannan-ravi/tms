import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { useDispatch, useSelector } from "react-redux";
import { BottomFixed } from "../../assets/styledComponent/Style";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Groups3Icon from "@mui/icons-material/Groups3";
import PersonIcon from "@mui/icons-material/Person";
import {
  AccountBox,
  ChatBubble,
  Home,
  Group,
  Restore,
} from "@mui/icons-material";
import { toastError } from "../../app/features/toastSlice";

const CustomTab = styled(Tab)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  background: "white",
  width: "100%",
}));

export default function BottomTabs() {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const chatNavigate = () => {
    if (!user.team && !user.team.team_chat._id) {
      dispatch(toastError("You are not in a team"));
    } else {
      navigate(`/chat/${user.team.team_chat._id}`);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box maxWidth="500px" width="100%">
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            icon={<Home />}
            onClick={() => navigate("/")}
          />
          <BottomNavigationAction
            icon={<ChatBubble />}
            onClick={() => chatNavigate()}
          />
          <BottomNavigationAction
            icon={<Group />}
            onClick={() => navigate("/chatrooms")}
          />
          <BottomNavigationAction
            icon={<AccountBox />}
            onClick={() => navigate("/profile")}
          />
        </BottomNavigation>
      </Box>
    </Box>
  );
}
