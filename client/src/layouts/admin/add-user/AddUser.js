import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SubmitButton from "../../../components/ui/submit-button/SubmitButton";
import { ArrowLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { environment } from "../../../constants/environment";
import { addSingleUser } from "../../../app/features/userSlice";
import { toastError, toastSuccess } from "../../../app/features/toastSlice";

export default function AddUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allTeams } = useSelector((state) => state.team);
  const [userData, setUserData] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    position: "",
    phone_number: "",
    team: "",
    type: "user",
    // profile_image: null,
  });

  const handleOnChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the selected file

    if (file) {
      setUserData((prevState) => ({
        ...prevState,
        profile_image: file, // Set to the selected file
      }));
    } else {
      setUserData((prevState) => ({
        ...prevState,
        profile_image: null, // No file selected, set back to null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirm_password) {
      dispatch(toastError("Passwords do not match"));
      return;
    }

    // const formData = new FormData();
    // formData.append("full_name", userData.full_name);
    // formData.append("username", userData.username);
    // formData.append("email", userData.email);
    // formData.append("password", userData.password);
    // formData.append("position", userData.position);
    // formData.append("phone_number", userData.phone_number);
    // formData.append("team", userData.team);
    // formData.append("profile_image", userData.profile_image);

    try {
      const response = await fetch(`${environment}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        if (errorResponse && errorResponse.message) {
          dispatch(toastError(errorResponse.message));
        } else {
          dispatch(toastError("Server error occurred"));
        }
        return;
      }

      const userDataResponse = await response.json();
      dispatch(addSingleUser(userDataResponse));
      dispatch(toastSuccess("User Added Successfully"));
      navigate("/admin");
    } catch (error) {
      console.error("Error during registration:", error);
      dispatch(toastError("Something Went Wrong"));
    }
  };

  const fileName = {
    fontSize: "0.9rem",
    wordBreak: "break-word",
    overflowWrap: "break-word",
  };

  return (
    <Box mt={6}>
      <Box px={2} pb={8}>
        <Stack direction="row" alignItems="center" gap={1}>
          <ArrowLeft
            fontSize="large"
            onClick={() => navigate(-1)}
            sx={{ cursor: "pointer" }}
          />
          <Typography variant="h5" component="h1">
            Add User
          </Typography>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack gap={3} py={4}>
            <Box>
              <Typography component="p" variant="overline">
                Full Name
              </Typography>
              <TextField
                hiddenLabel
                id="full_name"
                defaultValue={userData.full_name}
                size="medium"
                placeholder="Full Name"
                name="full_name"
                onChange={handleOnChange}
                fullWidth
              />
            </Box>
            <Box>
              <Typography component="p" variant="overline">
                Username
              </Typography>
              <TextField
                hiddenLabel
                id="username"
                defaultValue={userData.username}
                size="medium"
                placeholder="Username"
                name="username"
                onChange={handleOnChange}
                fullWidth
              />
            </Box>
            <Box>
              <Typography component="p" variant="overline">
                Email
              </Typography>
              <TextField
                hiddenLabel
                id="email"
                defaultValue={userData.email}
                size="medium"
                placeholder="Email"
                name="email"
                type="email"
                onChange={handleOnChange}
                fullWidth
              />
            </Box>
            <Box>
              <Typography component="p" variant="overline">
                Password
              </Typography>
              <TextField
                hiddenLabel
                id="password"
                defaultValue={userData.password}
                size="medium"
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleOnChange}
                fullWidth
              />
            </Box>
            <Box>
              <Typography component="p" variant="overline">
                Confirm Password
              </Typography>
              <TextField
                hiddenLabel
                id="confirm_password"
                defaultValue={userData.confirm_password}
                size="medium"
                placeholder="Confirm Password"
                name="confirm_password"
                type="password"
                onChange={handleOnChange}
                fullWidth
              />
            </Box>
            <Box>
              <Typography component="p" variant="overline">
                Position
              </Typography>
              <TextField
                hiddenLabel
                id="position"
                defaultValue={userData.position}
                size="medium"
                placeholder="Position"
                name="position"
                onChange={handleOnChange}
                fullWidth
              />
            </Box>
            <Box>
              <Typography component="p" variant="overline">
                Phone Number
              </Typography>
              <TextField
                hiddenLabel
                id="phone_number"
                defaultValue={userData.phone_number}
                size="medium"
                placeholder="Phone Number"
                name="phone_number"
                onChange={handleOnChange}
                fullWidth
              />
            </Box>
            <Box>
              <Typography component="p" variant="overline">
                Select Team
              </Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userData.team}
                  onChange={handleOnChange}
                  name="team"
                >
                  {allTeams?.map((team) => (
                    <MenuItem key={team._id} value={team._id}>
                      {team.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Typography component="p" variant="overline">
                User Type
              </Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userData.type}
                  onChange={handleOnChange}
                  name="type"
                >
                  {["Admin", "User", "Rep"].map((type) => (
                    <MenuItem key={type} value={type.toLowerCase()}>
                      {type === "User"
                        ? "Team Player"
                        : type === "Rep"
                        ? "Team Head"
                        : "Admin"}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* <Box>
              <Typography component="p" variant="overline">
                Upload Profile Image
              </Typography>
              <FormLabel
                htmlFor="contained-button-file"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "4px",
                  padding: "12px 24px 12px 12px",
                  backgroundColor: "rgba(245, 245, 245, 1)",
                  cursor: "pointer",
                }}
              >
                <input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  style={{ display: "none" }}
                  name="tasks_images"
                  onChange={handleFileUpload}
                />
                <Typography component="p" variant="body1">
                  {"Upload Files"}
                </Typography>
                <AddCircleOutlined
                  sx={{
                    position: "absolute",
                    right: "28px",
                    color: "rgba(0, 0, 0, 0.4)",
                  }}
                />
              </FormLabel>
            </Box> */}

            {/* {userData.profile_image && (
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Image />
                  </ListItemIcon>
                  <ListItemText
                    primary={userData.profile_image.name}
                    primaryTypographyProps={{
                      style: fileName,
                    }}
                    secondary={formatFileSize(userData.profile_image.size)}
                  />
                </ListItem>
              </List>
            )} */}
          </Stack>
          <SubmitButton text="Add User" />
        </form>
      </Box>
    </Box>
  );
}
