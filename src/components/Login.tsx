import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
  Snackbar,
  Button,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IAuthFormValues } from "../lib/types";
import { login } from "../redux/features/auth/authSlice";
import { RootState, useAppDispatch } from "../redux/store";
import CLink from "./custom/CLink";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.auth);
  const [searchParams] = useSearchParams();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const [error, setError] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (data) navigate("/");
  }, [data, navigate]);

  const handleLogin = async (values: IAuthFormValues) => {
    if (values.username === "" || values.password === "") {
      setError("username and/or password cannot be empty");
      return;
    }
    try {
      await dispatch(login(values)).unwrap();
      navigate("/");
    } catch (err: any) {
      setError(err.error);
    }
  };

  const logInAsGuest = async () => {
    try {
      await dispatch(login({ username: "guest", password: "123qweasd" }));
    } catch (err: any) {
      console.log(err);
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleClose = () => setOpenSnackbar(false);

  useEffect(() => {
    if (searchParams.get("register")) setOpenSnackbar(true);
  }, [searchParams]);

  return (
    <Container
      maxWidth="xs"
      sx={{
        background: "linear-gradient(40deg, rgba(96,55,85,1) 0%, rgba(75,73,122,1) 59%, rgba(14,80,144,1) 100%)",
        borderRadius: "1rem",
        height: "85vh",
      }}
    >
      <Formik initialValues={{ username: "", password: "" }} onSubmit={(values) => handleLogin(values)}>
        {() => (
          <Box component={Form} sx={{ textAlign: "center", p: "8rem 3rem" }}>
            <Typography variant="h5" gutterBottom>
              Hi, Welcome back!
            </Typography>
            <Field
              as={TextField}
              name="username"
              label="username"
              size="small"
              fullWidth
              error={error ? true : false}
              sx={{ my: "0.5rem" }}
              InputLabelProps={{ style: { color: "white" } }}
            />
            <Field
              as={TextField}
              name="password"
              label="password"
              type={showPassword ? "text" : "password"}
              size="small"
              error={error ? true : false}
              fullWidth
              sx={{ my: "0.5rem" }}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePassword} onMouseDown={togglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && (
              <Typography color="error" gutterBottom align="center">
                {error}
              </Typography>
            )}

            <LoadingButton type="submit" loading={isLoading} variant="contained" sx={{ width: "10rem" }}>
              Login
            </LoadingButton>

            <Box sx={{ my: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography align="center">No account yet?</Typography>
              <CLink to="/register" sx={{ ":hover": { color: "secondary.main" } }}>
                Click here to register
              </CLink>
              <Box>or</Box>
              <Button onClick={logInAsGuest} sx={{ ":hover": { color: "secondary.main" } }}>
                Sign in as guest
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
      <Snackbar
        open={openSnackbar}
        onClose={handleClose}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ mb: 5 }}
      >
        <Alert severity="success" variant="filled">
          account registered
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
