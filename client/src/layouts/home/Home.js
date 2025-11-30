import {
  Typography,
  Box,
  OutlinedInput,
  Button,
  Fade,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { spaceBtn } from "../../assets/styledComponent/Style";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import TaskCard from "./TaskCard";
import Loader from "../../components/ui/loader/Loader";
import TimeLimitCard from "./TimeLimitCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { environment } from "../../constants/environment";
import { loadingEnd, loadingStart } from "../../app/features/loadingSlice";
import { toastError } from "../../app/features/toastSlice";
import { Search } from "@mui/icons-material";

function Home() {
  const [taskStatus, setTaskStatus] = useState("All");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);
  const [taskSearching, setTaskSearching] = useState(false);
  const [filteredMyTasks, setFilteredMyTasks] = useState();
  const [teamTasks, setTeamTask] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
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

  const { user } = useSelector((state) => state.user);

  const getTeamTask = async () => {
    try {
      dispatch(loadingStart());
      const response = await fetch(
        `${environment}/api/tasks/myteam/${user?._id}`
      );
      const data = await response.json();

      setTeamTask(data);

      if (data.success === false) {
        dispatch(toastError(response.message));
        return;
      }
      dispatch(loadingEnd());
    } catch (error) {
      console.log(error);
      dispatch(loadingEnd());
    }
  };

  const getUserTasks = async () => {
    try {
      dispatch(loadingStart());
      const response = await fetch(
        `${environment}/api/tasks/my-tasks/${user?._id}`
      ).then((res) => res.json());

      setMyTasks(response);
      dispatch(loadingEnd());
    } catch (error) {
      console.log(error);
      dispatch(loadingEnd());
    }
  };

  useEffect(() => {
    getTeamTask();
    getUserTasks();
  }, []);

  const handleSearchMyTask = (e) => {
    const searchMyTask = e.target.value;
    if (searchMyTask !== "") {
      setTaskSearching(true);
      const filtered = myTasks.filter((task) => {
        return task.title.toLowerCase().includes(searchMyTask.toLowerCase());
      });
      setFilteredMyTasks(filtered);
      setTaskSearching(false);
    } else {
      setFilteredMyTasks();
      setTaskSearching(false);
    }
  };

  const filteredTasks =
    myTasks.length > 0
      ? myTasks.filter((task) => {
          if (taskStatus === "All") {
            return true;
          } else {
            return task.status === taskStatus;
          }
        })
      : null;

  return (
    <Box sx={{ mx: 2 }}>
      <Box sx={{ mt: 14 }}>
        <Typography
          component={"h2"}
          sx={{ fontWeight: "bold", fontFamily: "inherit", fontSize: 18 }}
        >
          {`Hello ${user?.full_name}`}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Let&apos;s finish your task today!
        </Typography>
      </Box>

      <Box position="relative">
        <OutlinedInput
          sx={{ borderRadius: 2, my: 2 }}
          placeholder="Find your task"
          onChange={handleSearchMyTask}
          fullWidth
          type="text"
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="search input" edge="end">
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
        <Box
          position="absolute"
          left={0}
          top="72px"
          zIndex={2}
          width="100%"
          boxShadow={3}
          backgroundColor="#F8F7F7"
          borderRadius={1}
        >
          {filteredMyTasks?.length > 0 ? (
            filteredMyTasks?.map((task) => (
              <Link
                to={`/individual-task/${task._id}`}
                key={task._id}
                style={{ textDecoration: "none", color: "unset" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 1.5,
                    borderBottom: "1px solid rgba(142, 142, 147, 1)",
                  }}
                >
                  <Typography component="p" variant="body2">
                    {task.title}
                  </Typography>
                </Box>
              </Link>
            ))
          ) : filteredMyTasks?.length === 0 ? (
            <Typography
              component="p"
              variant="body2"
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 1.5,
                borderBottom: "1px solid rgba(142, 142, 147, 1)",
              }}
            >
              No Task Found
            </Typography>
          ) : null}
        </Box>
      </Box>

      <Box sx={{ mt: 2, ...spaceBtn }}>
        <Typography
          component={"h2"}
          sx={{ fontWeight: "bold", fontFamily: "inherit", fontSize: 18 }}
        >
          Time Limit
        </Typography>

        <Link to="/time-limit" style={{ textDecoration: "none" }}>
          View All
        </Link>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Swiper
          spaceBetween={15}
          slidesPerView={2}
          style={{ padding: "1rem 0" }}
        >
          {teamTasks?.length === 0 ? (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              minHeight="80px"
            >
              <Typography textAlign="center" component="p" variant="h6">
                No Task Found
              </Typography>
            </Stack>
          ) : (
            teamTasks?.map((task) => (
              <SwiperSlide key={task._id}>
                <TimeLimitCard task={task} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </Box>

      {/*MY-TASK in-PROGRESS  COMPLETED BUtton*/}

      <Box sx={{ ...spaceBtn, mt: 3 }}>
        <Button
          sx={{
            ...taskButton,
            ...(taskStatus === "All"
              ? buttonActiveStyles
              : buttonUnActiveStyles),
          }}
          variant="contained"
          size="large"
          onClick={() => setTaskStatus("All")}
        >
          My Task
        </Button>

        <Button
          sx={{
            ...taskButton,
            ...(taskStatus === "in-progress"
              ? buttonActiveStyles
              : buttonUnActiveStyles),
          }}
          variant="contained"
          size="large"
          onClick={() => setTaskStatus("in-progress")}
        >
          In-Progress
        </Button>

        <Button
          sx={{
            ...taskButton,
            ...(taskStatus === "completed"
              ? buttonActiveStyles
              : buttonUnActiveStyles),
          }}
          variant="contained"
          size="large"
          onClick={() => setTaskStatus("completed")}
        >
          Completed
        </Button>
      </Box>

      <Box sx={{ mb: 12 }}>
        {isLoading && <Loader loading={isLoading} />}
        {filteredTasks?.length === 0 || !filteredTasks ? (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            minHeight="150px"
          >
            <Typography textAlign="center" component="p" variant="h6">
              No Task Found
            </Typography>
          </Stack>
        ) : (
          filteredTasks?.map((task) => (
            <Fade in key={task._id}>
              <Box sx={{ my: 2 }}>
                <TaskCard task={task} />
              </Box>
            </Fade>
          ))
        )}
      </Box>
    </Box>
  );
}

export default Home;
