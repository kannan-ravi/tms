import {
  FiberManualRecord,
  Logout,
  NotificationsNone,
} from "@mui/icons-material";
import {
  Badge,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useSocket from "../../hooks/useSocket";
import addNotification from "react-push-notification";
import { Notifications } from "react-push-notification";
import { environment } from "../../constants/environment";

export default function NotificationDropDown() {
  const { user } = useSelector((state) => state.user);

  const socketRef = useSocket();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [notification, setNotification] = useState([]);
  const drawerOpen = Boolean(anchorEl);

  useEffect(() => {
    const handleReceiveNotification = (data) => {
      setNotification((prev) => [...prev, data]);
      // addNotification({
      //   title: "TMS",
      //   message: data.message,
      //   theme: "darkblue",
      //   duration: 5000,
      //   native: true,
      // });
    };

    socketRef.current.on("receive notification", handleReceiveNotification);

    return () => {
      socketRef.current.off("receive notification", handleReceiveNotification);
    };
  }, [socketRef]);

  const handleNotificationSeen = (taskId, notificationId) => {

    navigate(`/individual-task/${taskId}`);
  };
  const fetchNotificaitons = async () => {
    const response = await fetch(
      `${environment}/api/notification/${user._id}`
    ).then((res) => res.json());
    setNotification(response);
  };

  useEffect(() => {
    socketRef.current.emit("get notifications", user);
    fetchNotificaitons();
  }, []);

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
        <IconButton size="large">
          <Badge badgeContent={notification.length} color="error">
            <NotificationsNone
              color="action"
              fontSize="1.23rem"
              sx={{ border: 1, borderRadius: 5, p: 0.3 }}
              onClick={handleClick}
            />
          </Badge>
        </IconButton>
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
        {notification.length > 0 ? (
          notification.map((data, index) => (
            <MenuItem key={index} sx={{ maxWidth: "400px", width: "100%" }}>
              <Box onClick={() => handleNotificationSeen(data.task, data._id)}>
                <Typography
                  component="p"
                  variant="body2"
                  sx={{
                    whiteSpace: "normal",
                    overflowWrap: "break-word",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <FiberManualRecord sx={{ fontSize: "0.5rem" }} />
                  {data.message}
                </Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem sx={{ maxWidth: "400px", width: "100%" }}>
            <Typography
              component="p"
              variant="body2"
              sx={{
                whiteSpace: "normal",
                overflowWrap: "break-word",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              No Notification Found
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}
