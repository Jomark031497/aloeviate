import { Box, IconButton, Typography } from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayCircle";
import PauseIcon from "@mui/icons-material/PauseCircle";
import { useEffect, useRef, useState } from "react";
import { ITask } from "../lib/types";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { minsToTimeFormat } from "../lib/timerFormatter";
import { updateTask } from "../redux/features/task/taskSlice";

const Timer: React.FC = () => {
  const { data: tasks } = useSelector((state: RootState) => state.tasks);
  const dispatch = useAppDispatch();

  const [playTimer, setPlayTimer] = useState(false);
  const [activeTask, setActiveTask] = useState<ITask | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const taskDurationRef = useRef<any>(null);
  const taskNameRef = useRef<any>(null);

  const startTimer = () => {
    if (!activeTask) return;
    setPlayTimer(true);
  };

  const pauseTimer = () => {
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
    console.log("filtering useEffect ran");
    if (!tasks.length) {
      console.log("no tasks at all");
      return;
    }

    const incompleteTasks = tasks.filter((task) => !task.isCompleted);

    if (!incompleteTasks.length) {
      console.log("no incomplete tasks!");
      setActiveTask(null);
      return;
    } else {
      setActiveTask(incompleteTasks[0]);
    }

    let countdown: any;
    let elapsedCounter: any;

    if (playTimer && activeTask) {
      let duration = activeTask.duration - elapsed;
      elapsedCounter = 0;
      countdown = setInterval(() => {
        if (duration <= 1) {
          setPlayTimer(false);
          dispatch(updateTask({ ...activeTask, isCompleted: true }));
          clearRef();
        }

        duration -= 1;
        elapsedCounter += 1;
        updateRef(activeTask.name, duration);
        console.log(duration, elapsedCounter);
      }, 500);
    }

    return () => clearInterval(countdown);
  }, [tasks, activeTask, playTimer, dispatch]);

  return (
    <Box id="timer-container" sx={{ my: "1rem" }}>
      <>
        <Typography variant="h2" align="center" ref={taskDurationRef}>
          00:00
        </Typography>
        <Typography variant="h6" align="center" ref={taskNameRef}>
          No Task
        </Typography>
      </>

      <Box id="timer-action-button" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {playTimer ? (
          <IconButton sx={{ mx: "1rem" }} onClick={() => pauseTimer()}>
            <PauseIcon sx={{ fontSize: "4rem" }} />
          </IconButton>
        ) : (
          <IconButton sx={{ mx: "1rem" }} onClick={() => startTimer()}>
            <PlayIcon sx={{ fontSize: "4rem" }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Timer;
