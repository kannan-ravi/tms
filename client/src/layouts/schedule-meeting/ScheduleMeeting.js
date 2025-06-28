import { StaticDatePicker } from "@mui/x-date-pickers";
import { Box } from "@mui/material";

import ScheduledCard from "./ScheduledCard";
import SheduleMeetingDrawer from "./SheduleMeetingDrawer";
import { useState } from "react";

export default function ScheduleMeeting() {
  const [open, setOpen] = useState(false);
  const [scheduleMeetingDate, setScheduleMeetingDate] = useState(new Date());

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <Box>
      <Box py={2}>
        <StaticDatePicker
          onChange={toggleDrawer(true)}
          minDate={new Date()}
          defaultValue={scheduleMeetingDate}
          slotProps={{
            actionBar: {
              actions: [],
            },
          }}
        />
      </Box>
      <Box px={2} pb={4}>
        {[1, 2, 3, 4].map((item, index) => (
          <ScheduledCard key={index} />
        ))}
      </Box>

      <SheduleMeetingDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        date={scheduleMeetingDate}
        setDate={setScheduleMeetingDate}
      />
    </Box>
  );
}
