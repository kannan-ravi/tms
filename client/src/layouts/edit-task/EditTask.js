import { Image } from "@mui/icons-material";
import {
  Box,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SubmitButton from "../../components/ui/submit-button/SubmitButton";
import AddCategory from "../../components/create-task/add-category/AddCategory";
import { textAreaAutoSizeStyle } from "../../assets/styledComponent/Style";

import { useDispatch, useSelector } from "react-redux";

import { toastError, toastSuccess } from "../../app/features/toastSlice";
import { sameDueDateTime } from "../../constants/DateTime";
import { fileNameExtractor } from "../../constants/fileFunctions";

import useSocket from "../../hooks/useSocket";
import { environment } from "../../constants/environment";
import { loadingEnd, loadingStart } from "../../app/features/loadingSlice";
import { setMessages } from "../../app/features/messageSlice";

export default function EditTask() {
  const navigate = useNavigate();
  const { task_id } = useParams();
  const socketRef = useSocket();
  const dispatch = useDispatch();
  const { editTaskMessage, messages } = useSelector((state) => state.message);
  const [singleTask, setSingleTask] = useState({});

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

  useEffect(() => {
    getSingleTask();
  }, []);

  const [taskData, setTaskData] = useState({
    messageId: editTaskMessage,
    dueDate: singleTask?.dueDate || "",
    dueTime: singleTask?.dueTime || "",
  });

  const handleOnChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
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

  const handleApprove = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${environment}/api/tasks/${task_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      }).then((res) => res.json());

      dispatch(toastSuccess("Task Approved"));
      navigate("/time-limit");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Box>
      {Object.keys(singleTask).length > 0 && (
        <form onSubmit={handleApprove} encType="multipart/form-data">
          <Stack gap={3} px={2} py={4}>
            <Box>
              <Typography component="p" variant="overline">
                Title
              </Typography>
              <TextField
                hiddenLabel
                id="outlined-size-small"
                defaultValue={singleTask?.title}
                size="medium"
                placeholder="Title"
                name="title"
                onChange={handleOnChange}
                disabled
                fullWidth
              />
            </Box>
            <Stack direction="row" gap={3}>
              <Box>
                <Typography component="p" variant="overline">
                  Due Date
                </Typography>
                <DatePicker
                  onChange={handleDateChange}
                  defaultValue={new Date(singleTask?.dueDate)}
                />
              </Box>
              <Box>
                <Typography component="p" variant="overline">
                  Time
                </Typography>
                <TimePicker
                  onChange={handleTimePicker}
                  defaultValue={new Date(singleTask?.dueTime)}
                />
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
                defaultValue={singleTask?.description}
                disabled
              />
            </Box>
            <AddCategory data={singleTask?.category} isEdit={true} />
            {/* <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography component="p" variant="overline">
                  Assigned To
                </Typography>
                <CustomSelect
                  value={[singleTask?.assigned_to]}
                  isDisabled={true}
                  isEdit={true}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography component="p" variant="overline">
                  Follower
                </Typography>
                <CustomSelect
                  value={[singleTask?.follower._id]}
                  isDisabled={true}
                  isEdit={true}
                />
              </Grid>
            </Grid> */}
            <Box>
              <Typography component="p" variant="overline">
                Uploaded Files
              </Typography>
            </Box>

            {Array.isArray(singleTask?.files_url) &&
            singleTask?.files_url.length > 0 ? (
              singleTask?.files_url.map((tasks_image, index) => {
                return (
                  <List key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <Image />
                      </ListItemIcon>
                      <ListItemText
                        primary={fileNameExtractor(tasks_image)}
                        primaryTypographyProps={{ fontSize: "0.9rem" }}
                      />
                    </ListItem>
                  </List>
                );
              })
            ) : (
              <Typography
                component="p"
                variant="body1"
                textTransform="uppercase"
                textAlign="center"
              >
                No Files has updated
              </Typography>
            )}

            <SubmitButton text="Approve" />
          </Stack>
        </form>
      )}
    </Box>
  );
}
