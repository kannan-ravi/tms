import React from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SubmitButton from "../../../components/ui/submit-button/SubmitButton";
import { ArrowLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { environment } from "../../../constants/environment";
import { addAllteamChat } from "../../../app/features/chatSlice";
import { setAllTeams } from "../../../app/features/teamSlice";
import { toastError, toastSuccess } from "../../../app/features/toastSlice";

export default function AddTeam() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedChat, setSelectedChat] = useState("");
  const { all_team_chats } = useSelector((state) => state.chat);
  const { allTeams } = useSelector((state) => state.team);
  const [input, setInput] = useState({
    name: "",
    team_chat: selectedChat,
  });

  const handleOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.name !== "" && input.team_chat !== "") {
      try {
        const response = await fetch(`${environment}/api/teams`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        dispatch(setAllTeams([...allTeams, responseData]));
        dispatch(toastSuccess("Team Added Successfully"));
        navigate("/admin");
      } catch (error) {
        dispatch(toastError(error.message || "Something Went Wrong"));
        console.log(error);
      }
    }
  };

  const getAllTeamChat = async () => {
    try {
      const response = await fetch(`${environment}/api/chats/all`).then((res) =>
        res.json()
      );
      dispatch(addAllteamChat(response));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTeamChat();
  }, []);
  return (
    <Box mt={6} px={2}>
      <Box>
        <Stack direction="row" alignItems="center" gap={1}>
          <ArrowLeft
            fontSize="large"
            onClick={() => navigate(-1)}
            sx={{ cursor: "pointer" }}
          />
          <Typography variant="h5" component="h1">
            Add Team
          </Typography>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack gap={3} py={4}>
            <Box>
              <Typography component="p" variant="overline">
                Team Name
              </Typography>
              <TextField
                hiddenLabel
                id="outlined-size-small"
                defaultValue={input.name}
                size="medium"
                placeholder="Name"
                name="name"
                onChange={handleOnChange}
                fullWidth
              />
            </Box>
            <Box>
              <Typography component="p" variant="overline">
                Select Team Chat
              </Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={input.team_chat}
                  onChange={handleOnChange}
                  name="team_chat"
                >
                  {all_team_chats?.map((chat) => (
                    <MenuItem key={chat._id} value={chat._id}>
                      {chat.chat_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Stack>

          <Box mt={4}>
            <SubmitButton text="Add Team" />
          </Box>
        </form>
      </Box>
    </Box>
  );
}
