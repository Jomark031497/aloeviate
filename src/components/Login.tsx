import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IAuthFormValues } from "../lib/types";
import { login } from "../redux/features/auth/authSlice";
import { RootState, useAppDispatch } from "../redux/store";

const Login = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (values: IAuthFormValues) => {
    try {
      await dispatch(login(values));
      navigate("/");
    } catch (err: any) {
      setError(err);
    }
  };

  useEffect(() => {
    console.log("i ran");
    if (data) navigate("/");
  }, [data, navigate]);

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: "#f5f5f5", minHeight: "93vh" }}>
      <Formik initialValues={{ username: "", password: "" }} onSubmit={(values) => handleLogin(values)}>
        {() => (
          <Box component={Form} sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: "6rem" }}>
            <Typography variant="h5">LOGIN</Typography>
            <Field as={TextField} name="username" label="username" size="small" sx={{ width: "70%", my: "0.5rem" }} />
            <Field
              as={TextField}
              name="password"
              label="password"
              type="password"
              size="small"
              sx={{ width: "70%", my: "0.5rem" }}
            />
            {error && (
              <Typography color="error" gutterBottom>
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" sx={{ width: "40%" }}>
              Login
            </Button>
          </Box>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
