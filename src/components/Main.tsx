import { Container } from "@mui/material";
import { useEffect } from "react";
import { getTasks } from "../redux/features/task/taskSlice";
import { useAppDispatch } from "../redux/store";
import AddTask from "./AddTask";
import Tasks from "./Tasks";
import Timer from "./Timer";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await dispatch(getTasks());
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [dispatch]);
  return (
    <Container maxWidth="xs" sx={{ background: "lightgrey", py: 10 }}>
      <Timer />
      <Tasks />
      <AddTask />
    </Container>
  );
};

export default Main;
