import { Box, Card, Typography, TextField, Button, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useAppDispatch } from "../redux/store";
import { addTask } from "../redux/features/task/taskSlice";
import { Field, Form, Formik } from "formik";
import { ITaskFormValues } from "../lib/types";

const AddTask = () => {
  const dispatch = useAppDispatch();
  const [openAddTask, setOpenAddTask] = useState(false);

  const handleSubmit = async (values: ITaskFormValues) => {
    if (!values.name || !values.duration) return;
    try {
      dispatch(addTask({ name: values.name, duration: values.duration * 60 }));
      toggleAddTask();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleAddTask = () => setOpenAddTask((prev) => !prev);

  return (
    <>
      <Divider />
      {!openAddTask ? (
        <Card
          onClick={toggleAddTask}
          sx={{
            m: "1rem auto",
            p: "1.5rem",
            width: "258px",
            borderRadius: "0.5rem",
            backgroundColor: "background.default",
            textAlign: "center",
            "&:hover": { cursor: "pointer", opacity: "0.7", color: "primary.main" },
          }}
        >
          <AddIcon />
          <Typography>Add Task</Typography>
        </Card>
      ) : (
        <Formik initialValues={{ name: "", duration: 0 }} onSubmit={(values) => handleSubmit(values)}>
          {() => (
            <Box
              component={Form}
              sx={{
                m: "1rem auto",
                width: "258px",
                backgroundColor: "#2f4c84",
                borderRadius: "0.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: "1rem 0.5rem",
              }}
            >
              <Field as={TextField} size="small" label="task name" name="name" required autoFocus />

              <Field
                as={TextField}
                type="number"
                size="small"
                label="duration (minutes)"
                name="duration"
                required
                InputProps={{ inputProps: { min: 1 } }}
                sx={{ mt: "1rem" }}
              />
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", mt: "1rem" }}>
                <Button size="small" variant="contained" sx={{ ml: "0.3rem" }} onClick={toggleAddTask}>
                  Cancel
                </Button>
                <Button size="small" variant="contained" type="submit">
                  Add
                </Button>
              </Box>
            </Box>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddTask;
