import { Logout } from "@mui/icons-material";
import { Box, ListItemIcon, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useLogoutMutation } from "../../app/services/userApi";
import { useNavigate } from "react-router-dom";
import { toastSuccess } from "../../app/features/toastSlice";
import { removeUser } from "../../app/features/userSlice";
import { environment } from "../../constants/environment";

export default function AccountDropDown() {
  const { user } = useSelector((state) => state.user);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const drawerOpen = Boolean(anchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${environment}/api/auth/logout`, {
        method: "POST",
      });
      dispatch(removeUser());
      dispatch(toastSuccess("Logout Successful"));
      handleClose();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            height: 33,
            width: 33,
            cursor: "pointer",
            borderRadius: 49,
          }}
          alt={user?.full_name}
          src={user?.profile_image_url}
          onClick={handleClick}
        />
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={drawerOpen}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => handleLogout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
