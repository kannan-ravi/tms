import React, { useEffect, useState } from "react";
import { Typography, Box, Stack, CircularProgress } from "@mui/material";

import { spaceBtn, vAlign } from "../../assets/styledComponent/Style";

// import Circular from "./loader";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { environment } from "../../constants/environment";
import Dropdown from "./dropdown";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { ArrowBackIosNew } from "@mui/icons-material";
import { LineChart } from "@mui/x-charts/LineChart";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [myTasks, setMyTasks] = useState({
    total_tasks: 0,
    completed_tasks: 0,
    completed_percentage: "0%",
  });

  const pData = [1, 3, 2, 2, 2, 2];
  const xLabels = ["S", "M", "T", "W", "T", "F"];

  const fetchUserTask = async () => {
    try {
      const response = await fetch(
        `${environment}/api/tasks/my-tasks/${user?._id}`
      ).then((res) => res.json());
      setMyTasks({
        total_tasks: response.length,
        completed_tasks: response.filter((task) => task.status === "completed")
          .length,
        completed_percentage: Math.round(
          (response.filter((task) => task.status === "completed").length /
            response.length) *
            100
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserTask();
  }, []);

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ ml: 2 }}>
        <ArrowBackIosNew onClick={() => navigate(-1)} />
      </Box>

      <Box textAlign="center">
        <Typography
          component="h1"
          variant="h6"
          sx={{ fontWeight: "600", mb: 2, fontFamily: "inherit" }}
        >
          Profile
        </Typography>
        <Box
          component="img"
          sx={{
            height: 90,
            width: 90,
            borderRadius: 1,
          }}
          alt="Profile"
          src={user?.profile_image_url}
        />

        <Typography component="p" variant="h6" mt={2}>
          {user?.full_name}
        </Typography>
        <Typography sx={{ color: "gray" }}>{user?.position}</Typography>
      </Box>

      {/* ----------------Running Tast----------------------------------     */}

      <Stack
        direction="column"
        rowGap={1}
        mt={4}
        p={2.5}
        mx={1.5}
        borderRadius={3}
        backgroundColor="black"
        color="white"
        boxShadow="2.82px 2.82px 15.03px 0px rgba(0, 0, 0, 0.08)"
      >
        <Typography sx={{ fontSize: "25px" }}>Running Task</Typography>
        <Box sx={{ textAlign: "end", fontSize: 40 }}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <Stack direction="row" alignItems="center" gap={3}>
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  value={Number(myTasks?.completed_percentage)}
                  size={90}
                  thickness={4}
                  sx={{ borderRadius: 3 }}
                  variant="determinate"
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    sx={{ color: "white", fontSize: "20px" }}
                  >
                    {myTasks?.completed_percentage}%
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ fontSize: 30 }}>
                {myTasks?.total_tasks}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography sx={{ fontSize: 40 }}>
            {myTasks.completed_tasks}
          </Typography>

          <Typography component="p" variant="h5">
            Tasks
          </Typography>
        </Stack>
      </Stack>

      <Box
        sx={{
          mt: 2,
          border: 1,
          borderColor: "#F5F5F7",
          borderRadius: 3,
          backgroundColor: "#F5F5F7",
        }}
      >
        <Box sx={{ ...spaceBtn }}>
          <Box sx={{ p: 3, fontWeight: "bold" }}>Activity</Box>
          <Box sx={{ ...vAlign, mx: 1 }}>
            <Box sx={{ p: 3 }}></Box>
            <Box sx={{ mx: 2 }}>
              <Dropdown />
            </Box>
          </Box>
        </Box>
        <Box px={3} py={3}>
          <Box
            sx={{
              border: 1,
              borderRadius: 3,
              backgroundColor: "#FFFFFF",
              borderColor: "#FFFFFF",
              width: "100%",
              height: 200,
            }}
          >
            <LineChart
              series={[{ data: pData }]}
              xAxis={[{ scaleType: "point", data: xLabels }]}
            />
          </Box>
        </Box>
      </Box>

      {/* -----------------------Contact Details----------------------------- */}

      <Box
        sx={{
          border: 1,
          backgroundColor: "#F8F6FF",
          borderColor: "#F8F6FF",
          borderRadius: 3,
          mt: 4,
          mx: 1,
          py: 2,
        }}
      >
        <Box sx={{ ...vAlign }}>
          <Box>
            <AccessTimeIcon
              sx={{ color: "#37E2D5", mx: 3, verticalAlign: "center" }}
            />
          </Box>
          <Stack direction="row" alignItems="center" gap={1.5}>
            <Typography component="p" variant="body1">
              Check-in Time
            </Typography>
            <Typography sx={{ color: "grey" }} component="p" variant="body2">
              Mar 21 2024, 08:35 AM
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          border: 1,
          backgroundColor: "#F8F6FF",
          borderColor: "#F8F6FF",
          borderRadius: 3,
          mt: 4,
          mx: 1,
          py: 2,
        }}
      >
        <Box sx={{ ...vAlign }}>
          <Box>
            <MailOutlineIcon
              sx={{ color: "#F73D93", mx: 3, verticalAlign: "center" }}
            />
          </Box>
          <Stack direction="row" alignItems="center" gap={1.5}>
            <Typography component="p" variant="body1">
              Email
            </Typography>
            <Typography sx={{ color: "grey" }} component="p" variant="body2">
              {user?.email}
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          border: 1,
          backgroundColor: "#F8F6FF",
          borderColor: "#F8F6FF",
          borderRadius: 3,
          mt: 4,
          mx: 1,
          py: 2,
        }}
      >
        <Box sx={{ ...vAlign }}>
          <Box>
            <PhoneIcon
              sx={{ color: "#EE5007", mx: 3, verticalAlign: "center" }}
            />
          </Box>
          <Stack direction="row" alignItems="center" gap={1.5}>
            <Typography component="p" variant="body1">
              Phone
            </Typography>
            <Typography sx={{ color: "grey" }} component="p" variant="body2">
              {user?.phone_number}
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          border: 1,
          backgroundColor: "#F8F6FF",
          borderColor: "#F8F6FF",
          borderRadius: 3,
          mt: 4,
          mb: 15,
          mx: 1,
          py: 2,
        }}
      >
        <Box sx={{ ...vAlign }}>
          <Box>
            <NotificationsIcon
              sx={{ color: "#8E92BC", mx: 3, verticalAlign: "center" }}
            />
          </Box>
          <Box>
            <Link
              to="/notification"
              style={{ textDecoration: "none", color: "unset" }}
            >
              <Typography component="p" variant="body1">
                Notification
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
