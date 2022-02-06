import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CLink from "./custom/CLink";

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
                <Typography onClick={handleLogout}>{data.username}</Typography>
              </>
            ) : (
              <>
                <CLink
                  to="/login"
                  sx={{
                    p: { xs: "0.5rem 1rem", md: "0.5rem 2rem" },
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "secondary.main",
                    mx: { xs: "0.5rem", md: "1rem" },
                    ":hover": {
                      borderColor: "primary.main",
                      color: "secondary.main",
                    },
                  }}
                >
                  login
                </CLink>
                <CLink
                  to="/register"
                  sx={{
                    p: { xs: "0.5rem 1rem", md: "0.5rem 2rem" },
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "secondary.main",
                    mx: { xs: "0.5rem", md: "1rem" },
                    ":hover": {
                      borderColor: "primary.main",
                      color: "secondary.main",
                    },
                  }}
                >
                  register
                </CLink>
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
