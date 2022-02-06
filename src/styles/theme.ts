import { createTheme } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: "#b293aa",
    },
    text: {
      primary: "#fff",
    },
    secondary: {
      main: "#0786ff",
    },
    background: {
      default: "#081119",
    },
  },
  typography: {
    fontFamily: "'Quicksand', sans-serif",
  },
});

export default theme;
