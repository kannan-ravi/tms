import {
  Box,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomSelect from "../../components/ui/custom-select/CustomSelect";
import { DesktopDatePicker, TimePicker } from "@mui/x-date-pickers";
import { Add } from "@mui/icons-material";
import SubmitButton from "../../components/ui/submit-button/SubmitButton";

export default function SheduleMeetingDrawer({
  open,
  toggleDrawer,
  date,
  setDate,
}) {
  const names = ["Oliver Hansen", "Van Henry", "April Tucker", "Ralph Hubbard"];
  const [assignee, setAssignee] = useState([names[0]]);

  const textAreaAutoSizeStyle = {
    width: "100%",
    outline: "none",
    padding: "10px 10px",
    borderRadius: "4px",
    fontFamily: "Inherit",
    fontSize: "inherit",
  };

  const handleAssigneeChange = (event) => {
    const {
      target: { value },
    } = event;

    setAssignee(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Drawer open={open} anchor="bottom" onClose={toggleDrawer(false)}>
      <Box px={2} py={4}>
        <Typography
          component="h2"
          variant="h5"
          fontWeight="600"
          textAlign="center"
          fontFamily="inherit"
        >
          Schedule Meeting
        </Typography>

        <Stack gap={2} py={2}>
          <CustomSelect
            value={assignee}
            handleOnChange={handleAssigneeChange}
            menuItems={names}
          />
          <TextareaAutosize
            aria-label="Description"
            placeholder="Type the description here..."
            minRows={3}
            style={textAreaAutoSizeStyle}
          />
          <DesktopDatePicker defaultValue={date} onChange={(e) => setDate(e)} />

          <Stack direction="row" gap={2}>
            <TimePicker label="Start Time" />
            <TimePicker label="End Time" />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              component="p"
              variant="body2"
              color="rgba(0, 0, 0, 0.85)"
            >
              Reminds me
            </Typography>
            <Switch />
          </Stack>

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Select Priority
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{
                justifyContent: "space-between",
                px: 1.5,
                mt: 1,
              }}
            >
              <FormControlLabel
                value="high"
                control={<Radio />}
                label="High"
                sx={{
                  background: "rgba(182, 18, 18, 0.12)",
                  pr: 3,
                  borderRadius: "6px",
                }}
              />
              <FormControlLabel
                value="medium"
                control={<Radio size="small" />}
                label="Medium"
                sx={{
                  background: "rgba(0, 179, 131, 0.12)",
                  pr: 3,
                  borderRadius: "6px",
                }}
              />
              <FormControlLabel
                value="low"
                control={<Radio size="small" />}
                label="Low"
                sx={{
                  background: "rgba(0, 149, 255, 0.12)",
                  pr: 3,
                  borderRadius: "6px",
                }}
              />
            </RadioGroup>
          </FormControl>

          <FormLabel
            htmlFor="contained-button-file"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              borderRadius: "4px",
              padding: "12px 24px 12px 12px",
              backgroundColor: "rgba(245, 245, 245, 1)",
            }}
          >
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              sx={{ display: "none" }}
            />
            <Add />
            <Typography
              component="p"
              variant="body2"
              color="rgba(0, 0, 0, 0.85)"
              ml={1}
            >
              Add File
            </Typography>
          </FormLabel>

          <SubmitButton text={"Schedule Meeting"} />
        </Stack>
      </Box>
    </Drawer>
  );
}
