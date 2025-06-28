import { Box, Button, ButtonGroup, Stack } from "@mui/material";
import React, { useState } from "react";
import UserCard from "./UserCard";
import SubmitButton from "../../components/ui/submit-button/SubmitButton";

export default function ScreenShare() {
  const [selected, setSelected] = useState(1);
  return (
    <Box>
      <Stack justifyContent="center" direction="row" py={2}>
        <ButtonGroup aria-label="Button Group">
          <Button
            variant={selected === 1 ? "contained" : "outlined"}
            onClick={() => setSelected(1)}
            size="large"
          >
            All
          </Button>
          <Button
            variant={selected === 2 ? "contained" : "outlined"}
            onClick={() => setSelected(2)}
            size="large"
          >
            Selected
          </Button>
        </ButtonGroup>
      </Stack>

      <Stack py={3}>
        {[true, false, false, true, true, false].map((item, index) => {
          return <UserCard key={index} isActive={item} />;
        })}
      </Stack>

      <Box px={2} py={3}>
        <SubmitButton text={"Start Sharing"} />
      </Box>
    </Box>
  );
}
