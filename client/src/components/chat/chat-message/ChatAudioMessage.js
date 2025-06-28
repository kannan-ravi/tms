import { Box, Slider, Stack, Typography } from "@mui/material";
import {
  PlayArrow,
  Pause,
  DoneAll,
  Circle,
  FiberManualRecord,
} from "@mui/icons-material";

import { styled } from "@mui/material/styles";
import { useRef, useState } from "react";
import { environment } from "../../../constants/environment";
import { fileNameExtractor } from "../../../constants/fileFunctions";

export default function ChatAudioMessage({ message, time, isSeen }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const iOSBoxShadow =
    "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

  const IOSSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.mode === "dark" ? "#0a84ff" : "#007bff",
    height: 5,
    width: 180,
    padding: "15px 0",
    "& .MuiSlider-thumb": {
      height: 15,
      width: 15,
      backgroundColor: "#fff",
      boxShadow: "0 0 2px 0px rgba(0, 0, 0, 0.1)",
      "&:focus, &:hover, &.Mui-active": {
        boxShadow: "0px 0px 3px 1px rgba(0, 0, 0, 0.1)",

        "@media (hover: none)": {
          boxShadow: iOSBoxShadow,
        },
      },
      "&:before": {
        boxShadow:
          "0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)",
      },
    },
    "& .MuiSlider-valueLabel": {
      fontSize: 12,
      fontWeight: "normal",
      top: -6,
      backgroundColor: "unset",
      color: theme.palette.text.primary,
      "&::before": {
        display: "none",
      },
      "& *": {
        background: "transparent",
        color: theme.palette.mode === "dark" ? "#fff" : "#000",
      },
    },
    "& .MuiSlider-track": {
      border: "none",
      height: 6,
    },
    "& .MuiSlider-rail": {
      opacity: 0.5,
      boxShadow: "inset 0px 0px 4px -2px #000",
      backgroundColor: "#d0d0d0",
    },
  }));

  const handlePlay = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };

  const handlePause = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <Box pl={1} pr={2} py={1}>
      <Stack direction="row" gap={2} alignItems="center">
        <audio
          ref={audioRef}
          src={`${environment}/${message.file.file_url}`}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnd}
        />

        {isPlaying ? (
          <Pause fontSize="large" onClick={handlePause} />
        ) : (
          <PlayArrow fontSize="large" onClick={handlePlay} />
        )}

        <IOSSlider
          aria-label="ios slider"
          defaultValue={currentTime}
          max={audioRef.current?.duration || 0}
          onChange={(event, value) => {
            audioRef.current.currentTime = value;
            setCurrentTime(value);
          }}
        />
      </Stack>
      <Stack direction="row" gap={0.5} justifyContent="space-between" mt={0.5} pl={1}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography component="p" variant="body2" fontSize="12px">
            {fileNameExtractor(message.file.file_format)}
          </Typography>
          <FiberManualRecord sx={{ fontSize: "6px" }} />
          <Typography component="p" variant="body2" fontSize="12px">
            {formatTime(currentTime)}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography
            component="p"
            variant="body2"
            fontSize="12px"
            color="rgba(0, 0, 0, 0.45)"
            width="max-content"
            alignSelf="flex-end"
          >
            {time}
          </Typography>
          <DoneAll
            fontSize="small"
            sx={{
              alignSelf: "flex-end",
              color: isSeen ? "rgba(0, 167, 83, 1)" : "rgba(151, 151, 151, 1)",
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
