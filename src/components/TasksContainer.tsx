import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getTasks } from "../redux/features/task/taskSlice";
import { RootState, useAppDispatch } from "../redux/store";
import TaskCard from "./TaskCard";

const Tasks: React.FC = () => {
  const { data: tasks } = useSelector((state: RootState) => state.tasks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return <>{tasks && tasks.map((task) => <TaskCard task={task} key={task._id} />)}</>;
};

export default Tasks;
