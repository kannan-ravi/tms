import { Add, Logout } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { environment } from "../../../constants/environment";
import { setAllTeams } from "../../../app/features/teamSlice";
import { Link, useNavigate } from "react-router-dom";
import AdminTeamCard from "./AdminTeamCard";
import { addAllUsers, removeUser } from "../../../app/features/userSlice";
import AdminUserCard from "./AdminUserCard";
import { addAllteamChat } from "../../../app/features/chatSlice";
import AdminChatCard from "./AdminChatCard";
import { toastSuccess } from "../../../app/features/toastSlice";
import { spaceBtn } from "../../../assets/styledComponent/Style";
export default function AdminHome() {
  const { allUsers } = useSelector((state) => state.user);
  const { allTeams } = useSelector((state) => state.team);
  const { all_team_chats } = useSelector((state) => state.chat);
  const [userType, setUserType] = useState("user");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const taskButton = {
    fontWeight: "600",
    color: "black",
    fontFamily: "inherit",
    fontSize: "10px",
    borderRadius: "49px",
    "&:hover": {
      background: "white",
    },
  };
  const buttonActiveStyles = {
    background: "white",
  };

  const buttonUnActiveStyles = {
    background: "rgba(229, 234, 252, 1)",
  };
  const getAllTeams = async () => {
    try {
      const response = await fetch(`${environment}/api/teams/all-teams`).then(
        (res) => res.json()
      );

      dispatch(setAllTeams(response));
    } catch (error) {
      console.log(error);
    }
  };

  const getallUsers = async () => {
    try {
      const response = await fetch(
        `${environment}/api/users/get-all-users`
      ).then((res) => res.json());

      dispatch(addAllUsers(response));
    } catch (error) {
      console.log(error);
    }
  };

  const getAllChats = async () => {
    try {
      const response = await fetch(`${environment}/api/chats/all`).then((res) =>
        res.json()
      );
      dispatch(addAllteamChat(response));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${environment}/api/auth/logout`, {
        method: "POST",
      });
      dispatch(removeUser());
      dispatch(toastSuccess("Logout Successful"));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTeams();
    getallUsers();
    getAllChats();
  }, []);

  const filteredTasks =
    allUsers.length > 0
      ? allUsers.filter((user) => user.type === userType)
      : [];

  return (
    <Box px={2} py={6}>
      <Stack direction="row" justifyContent="flex-end" pb={3}>
        <Logout
          sx={{ cursor: "pointer" }}
          fontSize="small"
          onClick={handleLogout}
        />
      </Stack>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="h2" variant="h5">
            Chats
          </Typography>
          <Link to="/admin/add-chat">
            <Button variant="outlined" startIcon={<Add />} size="small">
              Add Chat
            </Button>
          </Link>
        </Stack>

        <Stack mt={3} gap={2}>
          {all_team_chats.length > 0 &&
            all_team_chats?.map((chat) => (
              <AdminChatCard key={chat._id} chat={chat} />
            ))}
        </Stack>
      </Box>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt={6}
        >
          <Typography component="h2" variant="h5">
            Team
          </Typography>
          <Link to="/admin/add-team">
            <Button variant="outlined" startIcon={<Add />} size="small">
              Add Team
            </Button>
          </Link>
        </Stack>
        <Stack mt={3} gap={2}>
          {allTeams.map((team) => (
            <AdminTeamCard key={team._id} team={team} />
          ))}
        </Stack>
      </Box>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt={6}
        >
          <Typography component="h2" variant="h5">
            Users
          </Typography>
          <Link to="/admin/add-user">
            <Button variant="outlined" startIcon={<Add />} size="small">
              Add User
            </Button>
          </Link>
        </Stack>

        <Box sx={{ ...spaceBtn, mt: 3 }}>
          <Button
            sx={{
              ...taskButton,
              ...(userType === "user"
                ? buttonActiveStyles
                : buttonUnActiveStyles),
            }}
            variant="contained"
            size="large"
            onClick={() => setUserType("user")}
          >
            Player
          </Button>

          <Button
            sx={{
              ...taskButton,
              ...(userType === "rep"
                ? buttonActiveStyles
                : buttonUnActiveStyles),
            }}
            variant="contained"
            size="large"
            onClick={() => setUserType("rep")}
          >
            Head
          </Button>

          <Button
            sx={{
              ...taskButton,
              ...(userType === "admin"
                ? buttonActiveStyles
                : buttonUnActiveStyles),
            }}
            variant="contained"
            size="large"
            onClick={() => setUserType("admin")}
          >
            Admin
          </Button>
        </Box>

        <Stack mt={3} gap={2}>
          {filteredTasks.length > 0 &&
            filteredTasks?.map((user) => (
              <AdminUserCard key={user._id} user={user} />
            ))}
        </Stack>
      </Box>
    </Box>
  );
}
