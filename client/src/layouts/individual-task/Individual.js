import React from "react";
import {
  Typography,
  Box,
  Tooltip,
  Stack,
  MenuItem,
  Select,
  FormControl,
  TextareaAutosize,
} from "@mui/material";
import { spaceBtn } from "../../assets/styledComponent/Style";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import BackgroundIMAGE from "./../../assets/images/Profile1.png";

import GroupIcon from "@mui/icons-material/Group";

import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getTimeLeft } from "../../constants/DateTime";

import {
  Add,
  ArrowLeft,
  Checklist,
  DescriptionOutlined,
  Download,
  FolderOpen,
} from "@mui/icons-material";
import SubmitButton from "../../components/ui/submit-button/SubmitButton";
import CheckBoxStrike from "./CheckBoxStrike";
import AddCheckListInput from "./AddCheckListInput";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toastError, toastSuccess } from "../../app/features/toastSlice";
import { environment } from "../../constants/environment";
import { loadingEnd, loadingStart } from "../../app/features/loadingSlice";
import { setTeam } from "../../app/features/teamSlice";
import { fileNameExtractor } from "../../constants/fileFunctions";
import Loader from "../../components/ui/loader/Loader";

function Individual() {
  const { task_id } = useParams();
  const { user } = useSelector((state) => state.user);

  const { isLoading } = useSelector((state) => state.loading);

  const [singleTask, setSingleTask] = useState({});
  const [input, setInput] = useState([]);
  const [comment, setComment] = useState({
    comment: "",
    task: task_id,
  });
  const addInputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSingleTask = async () => {
    try {
      dispatch(loadingStart());
      const response = await fetch(`${environment}/api/tasks/${task_id}`).then(
        (res) => res.json()
      );
      setSingleTask(response);

      dispatch(loadingEnd());
    } catch (error) {
      console.log(error);
      dispatch(loadingEnd());
    }
  };
  const getTeamMembers = async () => {
    try {
      const response = await fetch(
        `${environment}/api/teams/${user.team._id}`
      ).then((res) => res.json());
      dispatch(setTeam(response));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleTask();
    getTeamMembers();
  }, []);

  // STATUS CHANGE (NOT STARTED, IN PROGRESS, COMPLETED)
  const handleChange = async (e) => {
    try {
      const statusChange = {
        taskId: task_id,
        status: e.target.value,
      };
      dispatch(loadingStart());
      const response = await fetch(`${environment}/api/tasks/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statusChange),
      }).then((res) => res.json());

      setSingleTask({ ...singleTask, status: response.task.status });
      dispatch(toastSuccess(response.message));
      dispatch(loadingEnd());
    } catch (error) {
      dispatch(toastError(error.message));
      console.log(error);
    }
  };

  // ON COMMENT CHANGE
  const handleOnCommentChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const handleDownloadImage = async (imageUrl) => {
    
    try {
      const response = await fetch(`${process.env.REACT_APP_ENVIRONMENT}/${imageUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "image/jpeg",
        },
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = fileNameExtractor(imageUrl);
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      dispatch(toastSuccess("Image downloaded successfully"));
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  const handleSubmitButton = async (e) => {
    e.preventDefault();
    let updated_response = { ...singleTask };
    if (input.some((item) => item.list.trim() !== "")) {
      try {
        const response = await fetch(`${environment}/api/check-list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }).then((res) => res.json());

        updated_response = {
          ...updated_response,
          checklist: [...updated_response.checklist, ...response],
        };

        setInput([]);
      } catch (error) {
        dispatch(toastError(error.message));
      }
    }

    if (comment && comment.comment !== "") {
      try {
        const response = await fetch(`${environment}/api/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
        }).then((res) => res.json());

        updated_response = {
          ...updated_response,
          comments: [...updated_response.comments, response],
        };
        setComment({
          comment: "",
          task: task_id,
        });
        dispatch(toastSuccess("Comment added successfully"));
      } catch (error) {
        dispatch(toastError(error.message));
      }
    }

    setSingleTask(updated_response);
  };

  const inputField = {
    outline: "none",
    width: "100%",
    padding: "10px 10px",
    marginTop: "1rem",
    borderRadius: "4px",
    fontFamily: "Inherit",
  };

  return (
    <>
      {isLoading && <Loader />}
      {singleTask ? (
        <Box sx={{ mx: 2, mt: 12 }}>
          <Stack direction="row" alignItems="center" sx={{ mt: 0 }}>
            <ArrowLeft fontSize="large" onClick={() => navigate(-1)} />
            <Typography
              component="h2"
              variant="h5"
              sx={{ fontWeight: "bold", fontFamily: "inherit" }}
            >
              {user.team.name}
            </Typography>
          </Stack>

          <Box sx={{}}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <Box
                  component={"img"}
                  src={BackgroundIMAGE}
                  width={"100%"}
                  sx={{ borderRadius: 1, borderColor: "lightgray", mt: 2 }}
                ></Box>
                <Box>
                  <Typography
                    component="h1"
                    variant="h5"
                    fontWeight="bold"
                    fontFamily="inherit"
                    sx={{ mt: 2 }}
                  >
                    {singleTask?.title}
                  </Typography>
                  <Stack
                    direction="row"
                    mt={2}
                    gap={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      component="p"
                      variant="caption"
                      sx={{ color: "#8E92BC" }}
                    >
                      {singleTask?.category?.map((cat, index) => (
                        <span key={index}> {cat},</span>
                      ))}
                    </Typography>

                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={
                          singleTask.status ? singleTask.status : "not-started"
                        }
                        onChange={handleChange}
                      >
                        <MenuItem value="not-started">Not Started</MenuItem>
                        <MenuItem value="in-progress">In-Progress</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Box>

                <Box mt={1}>
                  <Typography component="p" variant="body2">
                    {`Assigned By: ${singleTask?.assigned_by?.full_name}`}
                  </Typography>
                </Box>

                <Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={1}
                    mt={2}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-start"
                      gap={0.5}
                    >
                      <GroupIcon />
                      <AvatarGroup>
                        {singleTask.assigned_to &&
                          singleTask?.assigned_to.map((assignee, index) => (
                            <Tooltip title={assignee.full_name} key={index}>
                              <Avatar
                                alt={assignee.full_name}
                                src={assignee.profile_image_url}
                                sx={{ width: 20, height: 20 }}
                              />
                            </Tooltip>
                          ))}
                      </AvatarGroup>
                    </Stack>

                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <AccessTimeIcon />
                      <Typography>
                        {getTimeLeft(singleTask?.dueTime)}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Box mt={2}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <DescriptionOutlined />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Description
                    </Typography>
                  </Stack>
                  <Typography content="p" variant="body1" sx={{ mt: 1 }}>
                    {singleTask?.description}
                  </Typography>
                </Box>

                <Box sx={{ ...spaceBtn, mt: 2 }}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Checklist />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Checklist
                    </Typography>
                  </Stack>
                  <Add
                    sx={{ mr: 2, cursor: "pointer" }}
                    onClick={() => addInputRef.current.handleAddInput()}
                  />
                </Box>

                <Stack gap={1.5} mt={1}>
                  {singleTask?.checklist &&
                    singleTask?.checklist?.map((item, index) => (
                      <CheckBoxStrike key={index} item={item} singleTask={singleTask} setSingleTask={setSingleTask} />
                    ))}
                </Stack>
                <AddCheckListInput
                  task_id={task_id}
                  ref={addInputRef}
                  input={input}
                  setInput={setInput}
                />
              </Box>

              <Stack direction="row" alignItems="center" mt={2} gap={1}>
                <FolderOpen />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Files
                </Typography>
              </Stack>

              <Stack gap={1.5} mt={1}>
                {singleTask?.files_url?.map((file, index) => (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    key={index}
                    border="1px solid lightgray"
                    borderRadius={1}
                    p={1}
                  >
                    <Typography key={index}>
                      {fileNameExtractor(file)}
                    </Typography>
                    <Download onClick={() => handleDownloadImage(file)} />
                  </Stack>
                ))}
              </Stack>

              {/* <Stack direction="row" mt={2} alignItems="center" gap={1}>
                <Add />

                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Add Comments
                </Typography>
              </Stack> */}

              <Stack gap={1} mt={4}>
                {singleTask.comments &&
                  singleTask?.comments?.map((comment, index) => (
                    <Stack
                      gap={2}
                      direction="row"
                      alignItems="flex-start"
                      py={1}
                      px={2}
                      borderRadius={1}
                      key={index}
                      bgcolor={"rgba(221, 221, 233, 0.5)"}
                    >
                      <img
                        src={comment.user.profile_image_url}
                        alt="profile"
                        style={{
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          marginTop: "5px",
                        }}
                      />
                      <Stack gap={0.5}>
                        <Typography
                          component="p"
                          variant="body1"
                          fontWeight="600"
                        >
                          {comment.user.full_name}
                        </Typography>
                        <Typography component="p" variant="body1">
                          {comment.comment}
                        </Typography>
                      </Stack>
                    </Stack>
                  ))}
              </Stack>

              <TextareaAutosize
                maxRows={4}
                minRows={3}
                style={inputField}
                value={comment.comment}
                onChange={handleOnCommentChange}
                name="comment"
                placeholder="Write a comment..."
              />
              <Box
                sx={{
                  width: "100%",
                  mb: 10,
                  pt: 2,
                  px: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SubmitButton text="Submit" onClick={handleSubmitButton} />
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", fontFamily: "inherit" }}
        >
          Task Not Found
        </Typography>
      )}
    </>
  );
}

export default Individual;
