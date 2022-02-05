import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { IAuthFormValues } from "../lib/types";
import { register } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();

  const handleRegister = async (values: IAuthFormValues) => {
    try {
      await dispatch(register(values));
      navigate("/login");
    } catch (err: any) {
      setError(err);
    }
  };
  return (
    <Container maxWidth="sm" sx={{ backgroundColor: "#f5f5f5", minHeight: "93vh" }}>
      <Formik initialValues={{ username: "", password: "" }} onSubmit={(values) => handleRegister(values)}>
        {() => (
          <Box component={Form} sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: "6rem" }}>
            <Typography variant="h5">Register</Typography>
            <Field
              as={TextField}
              name="username"
              label="username"
              size="small"
              error={error ? true : false}
              sx={{ width: "70%", my: "0.5rem" }}
            />
            <Field
              as={TextField}
              name="password"
              label="password"
              type="password"
              size="small"
              error={error ? true : false}
              sx={{ width: "70%", my: "0.5rem" }}
            />
            {error && (
              <Typography color="error" gutterBottom>
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" sx={{ width: "40%" }}>
              register
            </Button>
          </Box>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
