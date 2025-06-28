import { useState, useEffect } from "react";
import { LinearProgress, Box } from "@mui/material";

export default function Loader({ loading }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;

    if (loading) {
      timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 95 ? 95 : prevProgress + 1
        );
      }, 50);
    } else {
      setProgress(100);
      setTimeout(() => {
        setProgress(0);
      }, 200);
    }

    return () => {
      clearInterval(timer);
    };
  }, [loading]);

  return (
    <Box
      sx={{ width: "100%", position: "absolute", top: 0, left: 0, zIndex: 1100 }}
    >
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          zIndex: 90,
          height: 4,
          borderRadius: 2,
          backgroundColor: "#f0f0f0",
          "& .MuiLinearProgress-bar": {
            borderRadius: 2,
            backgroundColor: "#1a90ff",
          },
        }}
      />
    </Box>
  );
}
