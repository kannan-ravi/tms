import {
  Box,
  FormControl,
  InputLabel,
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
import { addAllUsers } from "../../../app/features/userSlice";
import { toastError, toastSuccess } from "../../../app/features/toastSlice";

export default function AddChat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedChat, setSelectedChat] = useState([]);

  const { allUsers } = useSelector((state) => state.user);
  const [input, setInput] = useState({
    name: "",
    users: selectedChat,
  });

  const handleOnChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleChatChange = (e) => {
    const selectedValues = e.target.value;
    setSelectedChat(selectedValues);

    setInput((prevInput) => ({
      ...prevInput,
      users: selectedValues,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.name !== "") {
      try {
        const response = await fetch(`${environment}/api/chats/group`, {
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
        dispatch(toastSuccess("Team Added Successfully"));
        dispatch(addAllteamChat(responseData));
        navigate("/admin");
      } catch (error) {
        console.error("Fetch error:", error.message);
        dispatch(toastError(error.message || "Something Went Wrong"));
      }
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

  useEffect(() => {
    getallUsers();
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
            Add Chat
          </Typography>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack gap={3} py={4}>
            <Box>
              <Typography component="p" variant="overline">
                Chat Name
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
            {/* <Box>
              <Typography component="p" variant="overline">
                Select User
              </Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="users"
                  name="users"
                  value={selectedChat}
                  onChange={handleChatChange}
                  multiple
                >
                  {allUsers?.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.full_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box> */}
          </Stack>

          <Box mt={4}>
            <SubmitButton text="Add Team" />
          </Box>
        </form>
      </Box>
    </Box>
  );
}
