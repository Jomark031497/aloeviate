import Skeleton from "@mui/lab/Skeleton";
import Box from "@mui/material/Box";

const LoadingSkeleton = () => {
  return (
    <Box sx={{ width: 260, mx: "auto" }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
};

export default LoadingSkeleton;
