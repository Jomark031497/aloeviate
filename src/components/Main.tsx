import { Container } from "@mui/material";
import AddTask from "./AddTask";
import TasksContainer from "./TasksContainer";
import Timer from "./Timer";

const Main: React.FC = () => {
  return (
    <Container maxWidth="xs" sx={{ background: "lightgrey", minHeight: "94.5vh", pt: 10 }}>
      <Timer />
      <TasksContainer />
      <AddTask />
    </Container>
  );
};

export default Main;
