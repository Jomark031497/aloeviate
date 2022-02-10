import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AddTask from "./AddTask";
import TasksContainer from "./TasksContainer";
import Timer from "./Timer";

const Main: React.FC = () => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "90vh",
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(40deg, rgba(96,55,85,1) 0%, rgba(75,73,122,1) 59%, rgba(14,80,144,1) 100%)",
          height: "85vh",
          borderRadius: "1rem",
          pt: "2rem",
          my: "auto",
        }}
      >
        <Timer />
        <TasksContainer />
        <AddTask />
      </Box>
    </Container>
  );
};

export default Main;
