import { CheckCircle, Close, RadioButtonUnchecked } from "@mui/icons-material";
import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toastError } from "../../app/features/toastSlice";
import { environment } from "../../constants/environment";

export default function CheckBoxStrike({ item, singleTask, setSingleTask }) {
  const [isChecked, setIsChecked] = useState(item.isChecked);

  const dispatch = useDispatch();
  const handleCheckboxChange = async (event) => {
    const updatedChecked = event.target.checked;
    setIsChecked(updatedChecked);
    const updatedItem = {
      ...item,
      isChecked: updatedChecked,
    };

    try {
      const response = await fetch(`${environment}/api/check-list`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      }).then((res) => res.json());

      const updatedChecklist = singleTask.checklist.map((checklistItem) =>
        checklistItem._id === item._id
          ? { ...checklistItem, isChecked: updatedChecked }
          : checklistItem
      );

      setSingleTask({ ...singleTask, checklist: updatedChecklist });
    } catch (error) {
      dispatch(toastError(error.message));
    }
  };

  const handleCheckListDelete = async (id) => {
    try {
      const response = await fetch(`${environment}/api/check-list/${id}`, {
        method: "DELETE",
      });

      setSingleTask({
        ...singleTask,
        checklist: singleTask.checklist.filter((item) => item._id !== id),
      });
    } catch (error) {
      dispatch(toastError(error.message));
    }
  };

  return (
    <Stack
      direction="row"
      gap={2}
      alignItems="center"
      border="1px solid lightgray"
      borderRadius={1}
      px={1}
    >
      <FormControlLabel
        sx={{ width: "100%" }}
        control={
          <Checkbox
            icon={<RadioButtonUnchecked />}
            checkedIcon={<CheckCircle />}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        }
        label={
          <Typography
            variant="body2"
            style={{
              textDecoration: isChecked ? "line-through" : "none",
            }}
          >
            {item.list}
          </Typography>
        }
      />
      <Close
        sx={{ color: "rgba(143, 155, 179, 1)", cursor: "pointer" }}
        onClick={() => handleCheckListDelete(item._id)}
      />
    </Stack>
  );
}
