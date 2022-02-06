import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Main from "./components/Main";
import Register from "./components/Register";
import { setCurrentUser } from "./redux/features/auth/authSlice";
import { RootState, useAppDispatch } from "./redux/store";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.auth);

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
    <>
      <Header />
      <Routes>
        <Route path="/" element={data ? <Main /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
