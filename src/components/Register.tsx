import { Container, Box, Typography, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { IAuthFormValues } from "../lib/types";
import { register } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import CLink from "./custom/CLink";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (values: IAuthFormValues) => {
    if (values.username === "" || values.password === "") {
      setError("username and/or password cannot be empty");
      return;
    }

    try {
      await dispatch(register(values)).unwrap();
      navigate("/login?register=true");
    } catch (err: any) {
      setError(err.error);
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "85vh",
        background: "linear-gradient(40deg, rgba(96,55,85,1) 0%, rgba(75,73,122,1) 59%, rgba(14,80,144,1) 100%)",
        borderRadius: "1rem",
        width: { xs: "90vw" },
      }}
    >
      <Formik initialValues={{ username: "", password: "" }} onSubmit={(values) => handleRegister(values)}>
        {() => (
          <Box component={Form} sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: "6rem" }}>
            <Typography variant="h5" gutterBottom>
              Let's Register!
            </Typography>
            <Field
              as={TextField}
              name="username"
              label="username"
              size="small"
              error={error ? true : false}
              sx={{ width: "70%", my: "0.5rem" }}
              InputLabelProps={{ style: { color: "white" } }}
            />
            <Field
              as={TextField}
              name="password"
              label="password"
              type={showPassword ? "text" : "password"}
              size="small"
              error={error ? true : false}
              sx={{ width: "70%", my: "0.5rem" }}
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
              <Typography color="error" variant="body1" gutterBottom align="center">
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" sx={{ width: "40%" }}>
              Register
            </Button>

            <Box sx={{ my: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography align="center">Already have an account?</Typography>
              <CLink to="/login" sx={{ ":hover": { color: "secondary.main" } }}>
                Click here to login
              </CLink>
              {/* <Box>or</Box>
              <CLink to="/" sx={{ ":hover": { color: "secondary.main" } }}>
                Sign in as guest
              </CLink> */}
            </Box>
          </Box>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
