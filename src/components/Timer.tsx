import { Box, IconButton, Typography } from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayCircle";
import PauseIcon from "@mui/icons-material/PauseCircle";
import { useState } from "react";

const Timer: React.FC = () => {
  const [playTimer, setPlayTimer] = useState(false);
  return (
    <Box id="timer-container" sx={{ my: "1rem" }}>
      <>
        <Typography variant="h2" align="center">
          00:00
        </Typography>
        <Typography variant="h6" align="center">
          No Task
        </Typography>
      </>

      <Box id="timer-action-button" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {playTimer ? (
          <IconButton sx={{ mx: "1rem" }} onClick={() => setPlayTimer(false)}>
            <PauseIcon sx={{ fontSize: "4rem" }} />
          </IconButton>
        ) : (
          <IconButton sx={{ mx: "1rem" }} onClick={() => setPlayTimer(true)}>
            <PlayIcon sx={{ fontSize: "4rem" }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Timer;
