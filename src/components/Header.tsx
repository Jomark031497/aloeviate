import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CLink from "./custom/CLink";
import MenuIcon from "@mui/icons-material/Menu";

const Header: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ backgroundColor: "background.default", height: "10vh", justifyContent: "center" }}
      >
        <Toolbar sx={{ alignItems: "center" }}>
          <CLink
            variant="h5"
            to="/"
            sx={{ flex: 1, letterSpacing: "0.3rem", p: "1rem", ":hover": { color: "secondary.main" } }}
          >
            aloeviate.
          </CLink>

          <Box component="ul">
            {data ? (
              <>
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                  <MenuIcon sx={{ color: "primary.main" }} />
                </Box>
                <Typography color="primary" onClick={handleLogout} sx={{ display: { xs: "none", md: "block" } }}>
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
