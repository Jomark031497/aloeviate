import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import React from "react";

interface IValues {
  username: string;
  password: string;
}

const Login = () => {
  const handleLogin = async (values: IValues) => {
    console.log(values);
  };

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
