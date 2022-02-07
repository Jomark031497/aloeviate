import { Container } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/store";
import AddTask from "./AddTask";
import TasksContainer from "./TasksContainer";
import Timer from "./Timer";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get("/api/auth/me");
        dispatch(setCurrentUser(data));
      } catch (error) {
        navigate("/login");
      }
    };
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Timer />
      <TasksContainer />
      <AddTask />
    </Container>
  );
};

export default Main;
