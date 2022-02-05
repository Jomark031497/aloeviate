import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";

interface IValues {
  username: string;
  password: string;
}

const Register = () => {
  const handleRegister = async (values: IValues) => {
    console.log(values);
  };
  return (
    <Container maxWidth="sm" sx={{ backgroundColor: "#f5f5f5", minHeight: "93vh" }}>
      <Formik initialValues={{ username: "", password: "" }} onSubmit={(values) => handleRegister(values)}>
        {() => (
          <Box component={Form} sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: "6rem" }}>
            <Typography variant="h5">Register</Typography>
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
              register
            </Button>
          </Box>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
