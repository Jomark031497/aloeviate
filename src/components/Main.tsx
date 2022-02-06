import { Container } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../redux/features/auth/authSlice";
import { RootState, useAppDispatch } from "../redux/store";
import AddTask from "./AddTask";
import TasksContainer from "./TasksContainer";
import Timer from "./Timer";

const Main: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.auth);

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
  }, [dispatch, navigate]);

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
