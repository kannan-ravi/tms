import React from "react";
import {
  Typography,
  Box,
  OutlinedInput,
  Stack,
  Tooltip,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";

import { spaceBtn } from "../../assets/styledComponent/Style";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import LinearProgress from "@mui/material/LinearProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { getTimeLeft } from "../../constants/DateTime";
import Loader from "../../components/ui/loader/Loader";
import { ArrowLeft, Search, Tune } from "@mui/icons-material";
import { loadingEnd, loadingStart } from "../../app/features/loadingSlice";
import { useEffect, useState } from "react";
import { environment } from "../../constants/environment";
import { calculateChecklistPercentage } from "../../constants/taskFunctions";

function TimeLimit() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);
  const [teamTasks, setTeamTask] = useState([]);
  const [filterBy, setFilterBy] = useState("all");

  const [filteredTeamTasks, setFilteredTeamTasks] = useState();
  const [filterInput, setFilterInput] = useState("");
  const [myTeamTask, setMyTeamTask] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const filterMenuOpen = Boolean(anchorEl);

  const navigate = useNavigate();

  const getTeamTask = async () => {
    try {
      dispatch(loadingStart());
      const response = await fetch(
        `${environment}/api/tasks/myteam/${user?._id}`
      );
      const data = await response.json();

      setTeamTask(data);
      setFilteredTeamTasks(data);

      dispatch(loadingEnd());
    } catch (error) {
      console.log(error);
      dispatch(loadingEnd());
    }
  };

  const otherTeamTasks = async () => {
    try {
      dispatch(loadingStart());
      const response = await fetch(
        `${environment}/api/tasks/other-team-tasks/${user?._id}`
      ).then((res) => res.json());
      setTeamTask(response);
      setFilteredTeamTasks(response);
      dispatch(loadingEnd());
    } catch (error) {
      console.log(error);
      setTeamTask([]);
      dispatch(loadingEnd());
    }
  };

  useEffect(() => {
    if (myTeamTask) {
      getTeamTask();
    } else {
      otherTeamTasks();
    }
  }, [myTeamTask]);

  const handleSearchTeamTask = () => {
    var filtered = teamTasks;

    if (filterBy === "all" && myTeamTask) {
      filtered = filtered;
    } else if (filterBy === "my-team" && myTeamTask) {
      filtered = filtered.filter((task) => task.isAssignedByTeamMember);
    } else if (filterBy === "other-team" && myTeamTask) {
      filtered = filtered.filter((task) => !task.isAssignedByTeamMember);
    }

    if (filterInput !== "") {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(filterInput.toLowerCase())
      );
    }

    setFilteredTeamTasks(filtered);
  };

  useEffect(() => {
    handleSearchTeamTask();
  }, [filterBy, filterInput]);

  const handleFilterMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const filterMenuItemStyle = {
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
  };
  return (
    <Box sx={{ mx: 2, mt: 12, pb: 12 }}>
      <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 0 }}>
        <ArrowLeft fontSize="large" onClick={() => navigate(-1)} />
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", fontFamily: "inherit" }}
        >
          Time Limit
        </Typography>
      </Stack>

      {/* --------------------------------Search Button--------------------------------- */}
      <Stack direction="row" alignItems="center" gap={2}>
        <Box sx={{ width: "100%" }}>
          <OutlinedInput
            sx={{ borderRadius: 2, my: 2 }}
            placeholder="Search task"
            onChange={(e) => setFilterInput(e.target.value)}
            fullWidth
            type="text"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="search input"
                  edge="end"
                  onClick={handleSearchTeamTask}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>

        {myTeamTask && (
          <Box>
            <Tooltip title="Filter">
              <IconButton onClick={handleFilterMenuClick}>
                <Tune
                  sx={{
                    color: "rgba(0, 0, 0, 0.87)",
                    fontSize: "2rem",
                  }}
                />
              </IconButton>
            </Tooltip>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={filterMenuOpen}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  setFilterBy("all");
                  setAnchorEl(null);
                }}
                sx={filterBy === "all" ? filterMenuItemStyle : null}
              >
                All
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setFilterBy("my-team");
                  setAnchorEl(null);
                }}
                sx={filterBy === "my-team" ? filterMenuItemStyle : null}
              >
                By My Team
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setFilterBy("other-team");
                  setAnchorEl(null);
                }}
                sx={filterBy === "other-team" ? filterMenuItemStyle : null}
              >
                By Other Team
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Stack>

      {isLoading && <Loader loading={isLoading} />}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2 }}>
        <Button
          onClick={() => setMyTeamTask(true)}
          variant={myTeamTask ? "contained" : "outlined"}
        >
          My Team
        </Button>
        <Button
          onClick={() => setMyTeamTask(false)}
          variant={!myTeamTask ? "contained" : "outlined"}
        >
          Other Team
        </Button>
      </Box>

      {filteredTeamTasks &&
        filteredTeamTasks.length > 0 &&
        filteredTeamTasks.map((task, index) => {
          return (
            <Box
              key={task._id || index}
              sx={{
                mt: 3,
                border: 1,
                borderRadius: 4.6,
                boxShadow: 3,
                borderColor: "lightgray",
                p: 2.5,
              }}
            >
              <Link
                to={
                  (myTeamTask && task.isAssignedByTeamMember) ||
                  (myTeamTask && task.isAssignedToMe) ||
                  task?.assigned_by === user?._id
                    ? `/individual-task/${task._id}`
                    : ""
                }
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ mt: 1 }}>
                      <Typography>{task.title}</Typography>
                      <Typography
                        sx={{ color: "#54577A" }}
                        component="p"
                        variant="overline"
                      >
                        {user.team.name}
                      </Typography>
                    </Box>
                    <Box sx={{ width: "100%", mt: 2 }}>
                      <Box sx={{ ...spaceBtn }}>
                        <Typography>Progress</Typography>
                        <Typography sx={{ color: "#546FFF" }}>
                          {calculateChecklistPercentage(
                            task.checkedCount,
                            task.checklist.length
                          )}
                          %
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        valueBuffer={10}
                        value={calculateChecklistPercentage(
                          task.checkedCount,
                          task.checklist.length
                        )}
                        sx={{ borderRadius: 1, mt: 1.3 }}
                      />
                    </Box>
                    <Typography component="p" variant="body2" mt={2}>
                      Status: {task?.is_approved ? "Approved" : "Not Approved"}
                    </Typography>
                    <Box sx={{ ...spaceBtn, mt: 3 }}>
                      <Stack gap={1} direction="row" alignItems="center">
                        <AccessTimeIcon />
                        {getTimeLeft(task.dueTime) === "Exceeds deadline" ? (
                          <Typography
                            component="p"
                            variant="body1"
                            fontSize="13px"
                            color="rgba(182, 18, 18, 1)"
                            fontWeight="bold"
                          >
                            {getTimeLeft(task.dueTime)}
                          </Typography>
                        ) : (
                          <Typography component="p" variant="body2">
                            {getTimeLeft(task.dueTime)}
                          </Typography>
                        )}
                      </Stack>
                      <Box sx={{ my: 1 }}>
                        <AvatarGroup sx={{ mt: 0 }}>
                          {task.assigned_to.map((assignee, index) => {
                            return (
                              <Tooltip
                                title={assignee.full_name}
                                key={assignee._id || index}
                              >
                                <Avatar
                                  alt={assignee.full_name}
                                  src={assignee.profile_image_url}
                                  sx={{ width: 20, height: 20 }}
                                />
                              </Tooltip>
                            );
                          })}
                        </AvatarGroup>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Link>
            </Box>
          );
        })}

      {filteredTeamTasks && filteredTeamTasks.length === 0 && (
        <Stack justifyContent="center" alignItems="center" mt={5} gap={4}>
          <Typography variant="h5" textAlign="center">
            No tasks found
          </Typography>
          <Link to={`/create-task/${user.team.team_chat._id}`}>
            <Button variant="contained" size="large">
              Create Task Here
            </Button>
          </Link>
        </Stack>
      )}
    </Box>
  );
}

export default TimeLimit;
