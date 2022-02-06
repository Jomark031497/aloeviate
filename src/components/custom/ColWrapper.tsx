import Box, { BoxProps } from "@mui/material/Box";

interface IProps extends BoxProps {}

const ColWrapper: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      sx={{ ...props.sx, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}
    >
      {children}
    </Box>
  );
};

export default ColWrapper;
