import axios from "axios";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Main from "./components/Main";
import Register from "./components/Register";
import { setCurrentUser } from "./redux/features/auth/authSlice";
import { useAppDispatch } from "./redux/store";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get("/api/auth/me");
        dispatch(setCurrentUser(data));
      } catch (error) {
        console.log("may error");
        navigate("/login");
      }
    };
    checkAuth();
  }, [dispatch, navigate]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
