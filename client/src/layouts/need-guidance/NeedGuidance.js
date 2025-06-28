import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import { useState } from "react";
import CustomSelect from "../../components/ui/custom-select/CustomSelect";
import SubmitButton from "../../components/ui/submit-button/SubmitButton";

export default function NeedGuidance() {
  const fields = [
    "Front End",
    "Back End",
    "UI UX Design",
    "Marketing",
    "Testing",
  ];
  const [doubtField, setDoubtField] = useState([fields[0]]);
  const handleAssigneeChange = (event) => {
    const {
      target: { value },
    } = event;

    setDoubtField(typeof value === "string" ? value.split(",") : value);
  };

  const textAreaAutoSizeStyle = {
    width: "100%",
    outline: "none",
    padding: "10px 10px",
    borderRadius: "4px",
    fontFamily: "Inherit",
    fontSize: "inherit",
  };
  return (
    <Box p={2}>
      <Stack gap={3}>
        <CustomSelect
          value={doubtField}
          handleOnChange={handleAssigneeChange}
          menuItems={fields}
        />
        <CustomSelect
          value={doubtField}
          handleOnChange={handleAssigneeChange}
          menuItems={fields}
        />
        <TextareaAutosize
          minRows={3}
          aria-label="Description"
          placeholder="Description"
          style={textAreaAutoSizeStyle}
        />

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

        <Box sx={{ mt: 3 }}>
          <SubmitButton text="Submit Now" />
        </Box>
      </Stack>
    </Box>
  );
}
