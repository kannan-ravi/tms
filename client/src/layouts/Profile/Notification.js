import { ArrowLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Switch,
  Typography,
  FormControlLabel,
  Box,
  styled,
} from "@mui/material";
import { useState } from "react";
import SubmitButton from "../../components/ui/submit-button/SubmitButton";

export default function LoadingButtonsTransition() {
  const [notificationData, setNotificationData] = useState([
    {
      name: "Message",
      checked: true,
    },
    {
      name: "Task Update",
      checked: true,
    },
    {
      name: "Task Deadline",
      checked: false,
    },
    {
      name: "Mentor Help",
      checked: false,
    },
  ]);

  const handleSwitchChange = (event, index) => {
    const newInput = [...notificationData];
    newInput[index].checked = event.target.checked;
    setNotificationData(newInput);
  };

  const navigate = useNavigate();

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&::before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&::after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  return (
    <Box sx={{ height: "100%", pt: 12, minHeight: "100vh" }}>
      <Stack direction="row" alignItems="center" gap={1}>
        <ArrowLeft fontSize="large" onClick={() => navigate(-1)} sx={{ cursor: "pointer" }} />
        <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
          Notification
        </Typography>
      </Stack>

      <Stack px={2} py={2} rowGap={0.5}>
        {notificationData?.map((item, index) => (
          <FormControlLabel
            key={index}
            control={<Android12Switch checked={item.checked} />}
            label={item.name}
            onChange={(event) => handleSwitchChange(event, index)}
          />
        ))}
      </Stack>

      <Box
        sx={{
          px: 3,
          position: "absolute",
          bottom: "20px",
          width: "100%",
        }}
      >
        <SubmitButton text="Save Changes" />
      </Box>
    </Box>
  );
}
