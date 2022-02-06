import Button, { ButtonProps } from "@mui/material/Button";

interface IProps extends ButtonProps {}

const CButton: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <Button size="small" variant="outlined" {...props}>
      {children}
    </Button>
  );
};

export default CButton;
