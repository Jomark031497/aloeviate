import { AppBar, Toolbar, Link, Box } from "@mui/material";

const Header: React.FC = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Box id="title-container" sx={{ flex: 1 }}>
            <Link variant="h5" underline="none" sx={{ color: "white", letterSpacing: "0.3rem" }}>
              aloeviate.
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ minHeight: { xs: 59, md: 65 } }} />
    </>
  );
};

export default Header;
