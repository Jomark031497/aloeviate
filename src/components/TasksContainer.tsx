import { Box, Divider, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getTasks } from "../redux/features/task/taskSlice";
import { RootState, useAppDispatch } from "../redux/store";
import LoadingSkeleton from "./custom/LoadingSkeleton";
import TaskCard from "./TaskCard";

const Tasks: React.FC = () => {
  const { data: tasks } = useSelector((state: RootState) => state.tasks);
  const { isLoading } = useSelector((state: RootState) => state.tasks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <Box id="tasks-container" sx={{ mx: "auto" }}>
          {tasks.length ? (
            <>
              <Box>
                {tasks &&
                  tasks.map((task) => {
                    return task.isCompleted ? null : <TaskCard task={task} key={task._id} />;
                  })}
              </Box>
              <Divider sx={{ width: 260, m: "1rem auto" }} />
              <Typography align="center" color="textSecondary">
                Completed tasks
              </Typography>
              <Box>
                {tasks &&
                  tasks.map((task) => {
                    return task.isCompleted ? <TaskCard task={task} key={task._id} /> : null;
                  })}
              </Box>
            </>
          ) : (
            <Typography align="center">No tasks available</Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default Tasks;
