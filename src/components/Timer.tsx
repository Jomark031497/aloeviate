import { Box, IconButton, Typography } from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayCircle";
import PauseIcon from "@mui/icons-material/PauseCircle";
import { useEffect, useRef, useState } from "react";
import { ITask } from "../lib/types";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { minsToTimeFormat, timeFormatToSecs } from "../lib/timerFormatter";
import { updateTask } from "../redux/features/task/taskSlice";

const Timer: React.FC = () => {
  const { data: tasks } = useSelector((state: RootState) => state.tasks);
  const dispatch = useAppDispatch();

  const [playTimer, setPlayTimer] = useState(false);
  const [activeTask, setActiveTask] = useState<ITask | null>(null);

  const taskDurationRef = useRef<any>(null);
  const taskNameRef = useRef<any>(null);

  const startTimer = () => {
    if (!activeTask) return;
    setPlayTimer(true);
  };

  const pauseTimer = () => {
    if (!activeTask) return;
    setActiveTask({
      ...activeTask,
      elapsed: activeTask.duration - timeFormatToSecs(taskDurationRef.current.innerHTML),
    });

    setPlayTimer(false);
  };

  const updateRef = (name: string, duration: number) => {
    taskDurationRef.current.innerHTML = minsToTimeFormat(duration);
    taskNameRef.current.innerHTML = name;
  };

  const clearRef = () => {
    taskDurationRef.current.innerHTML = "00:00";
    taskNameRef.current.innerHTML = "No Task";
  };

  useEffect(() => {
    if (!tasks) return;

    const incompleteTasks = tasks.filter((task) => !task.isCompleted);
    if (!incompleteTasks.length) {
      setActiveTask(null);
      clearRef();
      return;
    }

    const currentTask = incompleteTasks[0];
    setActiveTask(currentTask);
    updateRef(currentTask.name, currentTask.duration);
  }, [tasks]);

  useEffect(() => {
    if (!activeTask) {
      setPlayTimer(false);
      return;
    }

    let countdown: any;

    if (playTimer && activeTask.duration !== activeTask.elapsed) {
      let duration = activeTask.duration - activeTask.elapsed;

      countdown = setInterval(() => {
        if (duration <= 1) {
          clearInterval(countdown);
          setPlayTimer(false);
          clearRef();
          dispatch(updateTask({ ...activeTask, isCompleted: true, elapsed: 0 }));
          setActiveTask(null);
        }
        duration -= 1;
        updateRef(activeTask.name, duration);
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [activeTask, playTimer, dispatch]);

  return (
    <Box id="timer-container" sx={{ my: "1rem" }}>
      <Box>
        <Typography variant="h2" align="center" ref={taskDurationRef}>
          00:00
        </Typography>
        <Typography variant="h6" align="center" ref={taskNameRef}>
          No Task
        </Typography>
      </Box>

      <Box id="timer-action-button" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {playTimer ? (
          <IconButton sx={{ mx: "1rem" }} onClick={() => pauseTimer()}>
            <PauseIcon sx={{ fontSize: "4rem", color: "text.primary" }} />
          </IconButton>
        ) : (
          <IconButton sx={{ mx: "1rem" }} onClick={() => startTimer()}>
            <PlayIcon sx={{ fontSize: "4rem", color: "text.primary" }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Timer;
