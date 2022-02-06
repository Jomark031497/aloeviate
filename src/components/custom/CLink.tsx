import Link, { LinkProps } from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom/";

interface IProps extends LinkProps {
  to: string;
}

const CLink: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <Link component={RouterLink} underline="none" {...props}>
      {children}
    </Link>
  );
};

export default CLink;
