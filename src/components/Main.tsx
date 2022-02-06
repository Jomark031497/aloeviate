import { Container } from "@mui/material";
import AddTask from "./AddTask";
import TasksContainer from "./TasksContainer";
import Timer from "./Timer";

const Main: React.FC = () => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "85vh",
        background: "linear-gradient(40deg, rgba(96,55,85,1) 0%, rgba(75,73,122,1) 59%, rgba(14,80,144,1) 100%)",
        borderRadius: "1rem",
        width: { xs: "90vw" },
        pt: 10,
        pb: 3,
      }}
    >
      <>
        <Timer />
        <TasksContainer />
        <AddTask />
      </>
    </Container>
  );
};

export default Main;
