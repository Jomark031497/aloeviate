import { Container } from "@mui/material";
import AddTask from "./AddTask";
import Tasks from "./Tasks";
import Timer from "./Timer";

const Main: React.FC = () => {
  return (
    <Container maxWidth="xs" sx={{ background: "lightgrey", minHeight: "94.5vh", pt: 10 }}>
      <Timer />
      <Tasks />
      <AddTask />
    </Container>
  );
};

export default Main;
