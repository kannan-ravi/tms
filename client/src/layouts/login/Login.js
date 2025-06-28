import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { addUser } from "../../app/features/userSlice";
import { toastError, toastSuccess } from "../../app/features/toastSlice";
import SnackBarToast from "../../components/ui/snack-bar-toast/SnackBarToast";
import Loader from "../../components/ui/loader/Loader";
import { environment } from "../../constants/environment";
import { loadingEnd, loadingStart } from "../../app/features/loadingSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.loading);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loginData.email && loginData.password) {
      try {
        dispatch(loadingStart());
        const response = await fetch(`${environment}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        const data = await response.json();
        dispatch(addUser(data));
        dispatch(toastSuccess("Login Successful"));
        dispatch(loadingEnd());
        
        if (data.success === false) {
          dispatch(toastError(data.message));
          return;
        }
        navigate("/");
      } catch (err) {
        dispatch(toastError(err.message));
        dispatch(loadingEnd());
      }
    } else {
      dispatch(toastError("Please fill all the fields"));
    }
  };

  return (
    <>
      {isLoading && <Loader loading={isLoading} />}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 2,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="email"
                name="email"
                required
                fullWidth
                id="firstName"
                label="Email"
                value={loginData.email}
                onChange={handleOnChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleOnChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Remember me"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="" variant="body2">
                Forgot Password?
              </Link>
            </Grid>
          </Grid>
        </Box>
        <SnackBarToast />
      </Box>
    </>
  );
}
