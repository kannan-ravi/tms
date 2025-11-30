import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function AddCategory({ data, setTaskData, taskData, isEdit }) {
  const [inputValue, setInputValue] = useState("");

  const handleOnChange = (e, newValue) => {
    setTaskData({
      ...taskData,
      category: newValue.map((category) => category), // Return the plain text category directly
    });
  };

  const handleInputChange = (e, newInputValue) => {
    if (newInputValue.endsWith(",")) {
      const newCategory = newInputValue.slice(0, -1).trim();
      if (newCategory && !taskData.category.includes(newCategory)) {
        setTaskData({
          ...taskData,
          category: [...taskData.category, newCategory],
        });
      }
      setInputValue("");
    } else {
      setInputValue(newInputValue);
    }
  };

  const handleCategoryClick = (categoryName) => {
    if (!taskData.category.includes(categoryName)) {
      setTaskData({
        ...taskData,
        category: [...taskData.category, categoryName],
      });
    }
  };

  const categoryNames = data.map((category) => category.category_name);

  return (
    <>
      <Box>
        <Typography component="p" variant="overline">
          Add Category
        </Typography>
        {!isEdit && (
          <Autocomplete
            multiple
            id="tags-filled"
            options={categoryNames}
            value={taskData.category}
            freeSolo
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onChange={handleOnChange}
            sx={{ borderRadius: "4px" }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                placeholder="Add Category"
              />
            )}
          />
        )}
      </Box>
      <Box bgcolor="rgba(235, 235, 235, 0.8)" p={2} borderRadius="4px">
        <Stack direction="row" gap={2} flexWrap="wrap">
          {data.length > 0 ? (
            data.map((category, index) => (
              <Typography
                key={index}
                component="p"
                variant="overline"
                onClick={() => handleCategoryClick(category.category_name)}
                sx={{
                  background: "rgba(118, 74, 241, 0.1)",
                  color: "rgba(118, 74, 241, 1)",
                  p: "0px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {category.category_name}
              </Typography>
            ))
          ) : (
            <Box width="100%">
              <Typography component="p" variant="overline" textAlign="center" width="100%">Category&apos;s Not Found</Typography>
              <Typography component="p" variant="caption" textAlign="center" width="100%">You can add new category</Typography>
              
            </Box>
          )}
        </Stack>
      </Box>
    </>
  );
}
