import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import {
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { forwardRef, useImperativeHandle } from "react";
const AddCheckListInput = forwardRef(({ task_id, input, setInput }, ref) => {
  const handleOnInputChange = (event, index) => {
    const newInput = [...input];
    newInput[index].list = event.target.value;
    setInput(newInput);
  };

  const handleCheckboxChange = (event, index) => {
    const newInput = [...input];
    newInput[index].isChecked = event.target.checked;
    setInput(newInput);
  };

  useImperativeHandle(ref, () => ({
    handleAddInput() {
      if (input.length === 0 || input[input.length - 1].list !== "") {
        setInput([
          ...input,
          {
            isChecked: false,
            list: "",
            task_id: task_id,
          },
        ]);
      }
    },
  }));

  return (
    <Box>
      {input.map((item, index) => (
        <Stack direction="row" key={index}>
          <FormControlLabel
            control={
              <Checkbox
                icon={<RadioButtonUnchecked />}
                checkedIcon={<CheckCircle />}
                checked={item.isChecked}
                onChange={(event) => handleCheckboxChange(event, index)}
              />
            }
          />
          <TextField
            sx={{ width: "80%" }}
            variant="standard"
            onChange={(event) => handleOnInputChange(event, index)}
            value={item.list}
            autoFocus
          />
        </Stack>
      ))}
    </Box>
  );
});

export default AddCheckListInput;
