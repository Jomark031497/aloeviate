import { createTheme } from "@mui/material";
let theme = createTheme();

theme = createTheme(theme, {
  palette: {
    primary: {
      main: "#41B3A3",
    },
    secondary: {
      main: "#E27D60",
    },
  },
  typography: {},
});

export default theme;
