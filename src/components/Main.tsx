import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import AddTask from "./AddTask";
import TasksContainer from "./TasksContainer";
import Timer from "./Timer";

const Main: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.auth);

  return (
    <Container maxWidth="xs" sx={{ background: "lightgrey", minHeight: "94.5vh", pt: 10 }}>
      {data && (
        <>
          <Timer />
          <TasksContainer />
          <AddTask />
        </>
      )}
    </Container>
  );
};

export default Main;
