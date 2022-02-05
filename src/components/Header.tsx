import { AppBar, Box, Toolbar, Link, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { RootState } from "../redux/store";

const Header: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Box id="title-container" sx={{ flex: 1 }}>
            <Link
              variant="h5"
              component={RouterLink}
              to="/"
              underline="none"
              sx={{ color: "#fff", letterSpacing: "0.3rem" }}
            >
              aloeviate.
            </Link>
          </Box>

          <Box component="ul">
            {data ? (
              <>
                <Typography>{data.username}</Typography>
              </>
            ) : (
              <>
                {" "}
                <Link
                  component={RouterLink}
                  to="/login"
                  underline="none"
                  sx={{ color: "#fff", letterSpacing: "0.3rem", mx: "0.5rem" }}
                >
                  login
                </Link>
                <Link
                  component={RouterLink}
                  to="/register"
                  underline="none"
                  sx={{ color: "#fff", letterSpacing: "0.3rem", mx: "0.5rem" }}
                >
                  register
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ minHeight: { xs: 59, md: 65 } }} />
    </>
  );
};
export default Header;
