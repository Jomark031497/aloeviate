import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import CLink from "./custom/CLink";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../redux/features/auth/authSlice";

const Header: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

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
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ backgroundColor: "transparent", height: "10vh", justifyContent: "center" }}
      >
        <Toolbar sx={{ alignItems: "center" }}>
          <Box id="title-container" sx={{ flex: 1 }}>
            <CLink
              variant="h5"
              to="/"
              sx={{ letterSpacing: "0.3rem", p: "1rem", ":hover": { color: "secondary.main" } }}
            >
              aloeviate.
            </CLink>
          </Box>

          <Box component="ul">
            {data ? (
              <>
                <Typography color="primary" onClick={handleLogout}>
                  {data.username}
                </Typography>
              </>
            ) : (
              <>
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <CLink to="/login" sx={{ p: { xs: "0.5rem 1rem", md: "0.5rem 2rem" } }}>
                    login
                  </CLink>
                  <CLink to="/register" sx={{ p: { xs: "0.5rem 1rem", md: "0.5rem 2rem" } }}>
                    register
                  </CLink>
                </Box>
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                  <MenuIcon sx={{ color: "primary.main" }} />
                </Box>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ minHeight: "10vh" }} />
    </>
  );
};
export default Header;
