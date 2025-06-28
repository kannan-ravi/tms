import { MenuItem, OutlinedInput, Select } from "@mui/material";
import React from "react";

export default function CustomSelect({
  value,
  handleOnChange,
  menuItems,
  isDisabled,
  isEdit,
}) {
  return (
    <Select
      labelId="demo-multiple-name-label"
      id="demo-multiple-name"
      multiple
      value={value}
      onChange={handleOnChange}
      input={<OutlinedInput />}
      sx={{ width: "100%" }}
      disabled={isDisabled}
    >
      {!isEdit &&
        menuItems.map(
          (item, index) =>
            item.type !== "admin" && (
              <MenuItem key={index} value={item._id}>
                {item.full_name}
              </MenuItem>
            )
        )}
    </Select>
  );
}
