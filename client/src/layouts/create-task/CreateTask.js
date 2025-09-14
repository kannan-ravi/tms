import React from "react";
import { AddCircleOutlined, Delete, Image } from "@mui/icons-material";
import {
  Box,
  FormLabel,
  Grid,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";

import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomSelect from "../../components/ui/custom-select/CustomSelect";
import SubmitButton from "../../components/ui/submit-button/SubmitButton";
import AddCategory from "../../components/create-task/add-category/AddCategory";
import { textAreaAutoSizeStyle } from "../../assets/styledComponent/Style";

import { useDispatch, useSelector } from "react-redux";

import { toastError, toastSuccess } from "../../app/features/toastSlice";
import { sameDueDateTime } from "../../constants/DateTime";
import { formatFileSize } from "../../constants/fileFunctions";
import { setMessages } from "../../app/features/messageSlice";

import { environment } from "../../constants/environment";

import useSocket from "../../hooks/useSocket";

export default function CreateTask() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const { messages } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.user);
  const { chat } = useSelector((state) => state.chat);

  const socketRef = useSocket();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    dueTime: "",
    category: [],
    assigned_to: [],
    follower: chat?.group_admin?._id,
    chat_id: chatId,
    tasks_images: [],
  });
  const dispatch = useDispatch();

  const handleAssigneeChange = (event) => {
    const {
      target: { value },
    } = event;

    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      assigned_to: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleOnChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    setTaskData((prevState) => ({
      ...prevState,
      tasks_images: [...prevState.tasks_images, ...files],
    }));
  };

  const handleFileDelete = (fileName) => {
    setTaskData((prevState) => ({
      ...prevState,
      tasks_images: prevState.tasks_images.filter(
        (file) => file.name !== fileName
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (taskData.assigned_to.length > 0 && taskData.title) {
      try {
        const formData = new FormData();
        formData.append("title", taskData.title);
        formData.append("description", taskData.description);
        formData.append("dueDate", taskData.dueDate);
        formData.append("dueTime", taskData.dueTime);
        formData.append("chat_name", chatId);
        formData.append("follower", taskData.follower);
        formData.append("chat_id", taskData.chat_id);
        for (const assigned_to of taskData.assigned_to) {
          formData.append("assigned_to", assigned_to);
        }
        for (const category of taskData.category) {
          formData.append("category", category);
        }
        for (const file of taskData.tasks_images) {
          formData.append("tasks_images", file);
        }

        const response = await fetch(`${environment}/api/tasks`, {
          method: "POST",
          body: formData,
        }).then((res) => res.json());

        const getFullName = taskData.assigned_to
          .map((id) => {
            const user = chat.users.find((user) => user._id === id);
            const userDeatils = {
              full_name: user.full_name,
              id: user._id,
            };
            return user ? userDeatils : null;
          })
          .filter((name) => name !== null);

        const socketData = {
          assigned_to: getFullName,
          assigned_by: {
            _id: user._id,
            full_name: user.full_name,
          },
        };

        socketRef.current.emit("task created", JSON.stringify(socketData));
        socketRef.current.emit("sendMessage", response);
        dispatch(setMessages([...messages, response]));
        navigate(-1);
        dispatch(toastSuccess("Task created successfully"));
      } catch (error) {
        dispatch(toastError(error.data.message));
      }
    } else {
      dispatch(toastError("Please fill all the fields"));
    }
  };

  const handleDateChange = (e) => {
    setTaskData({ ...taskData, dueDate: e });
  };

  const handleTimePicker = (e) => {
    if (taskData.dueDate) {
      const newDueTime = sameDueDateTime(taskData.dueDate, e);
      setTaskData({ ...taskData, dueTime: newDueTime });
    } else {
      dispatch(toastError("Please select a due date first"));
    }
  };

  const [categoryNames, setCategoryNames] = useState([]);

  const getAllCategories = async () => {
    try {
      const response = await fetch(`${environment}/api/categories`).then(
        (res) => res.json()
      );
      setCategoryNames(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Box>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Stack gap={3} px={2} py={4}>
          <Box>
            <Typography component="p" variant="overline">
              Title
            </Typography>
            <TextField
              hiddenLabel
              id="outlined-size-small"
              defaultValue={taskData.title}
              size="medium"
              placeholder="Title"
              name="title"
              onChange={handleOnChange}
              fullWidth
            />
          </Box>
          <Stack direction="row" gap={3}>
            <Box>
              <Typography component="p" variant="overline">
                Due Date
              </Typography>
              <DatePicker onChange={handleDateChange} minDate={new Date()} />
            </Box>
            <Box>
              <Typography component="p" variant="overline">
                Time
              </Typography>
              <TimePicker onChange={handleTimePicker} minTime={new Date()} />
            </Box>
          </Stack>
          <Box>
            <Typography component="p" variant="overline">
              Description
            </Typography>
            <TextareaAutosize
              aria-label="Description"
              placeholder="Description"
              style={textAreaAutoSizeStyle}
              name="description"
              onChange={handleOnChange}
              defaultValue={taskData.description}
            />
          </Box>
          {categoryNames && (
            <AddCategory
              data={categoryNames}
              setTaskData={setTaskData}
              taskData={taskData}
            />
          )}
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography component="p" variant="overline">
                Assigned To
              </Typography>
              <CustomSelect
                value={taskData.assigned_to}
                handleOnChange={handleAssigneeChange}
                menuItems={chat?.users ? chat?.users : []}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography component="p" variant="overline">
                Follower
              </Typography>
              <CustomSelect
                value={[taskData.follower]}
                handleOnChange={handleAssigneeChange}
                menuItems={chat?.users ? chat?.users : []}
                isDisabled={true}
              />
            </Grid>
          </Grid>
          <Box>
            <Typography component="p" variant="overline">
              Upload Files
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
                multiple
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
          </Box>

          {Array.isArray(taskData.tasks_images) &&
            taskData.tasks_images.length > 0 &&
            taskData.tasks_images.map((tasks_image, index) => {
              return (
                <List key={index}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleFileDelete(tasks_image.name)}
                      >
                        <Delete />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      <Image />
                    </ListItemIcon>
                    <ListItemText
                      primary={tasks_image.name}
                      primaryTypographyProps={{ fontSize: "0.9rem" }}
                      secondary={formatFileSize(tasks_image.size)}
                    />
                  </ListItem>
                </List>
              );
            })}

          <SubmitButton text="Create" />
        </Stack>
      </form>
    </Box>
  );
}
