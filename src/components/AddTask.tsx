import { Box, Card, Typography, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useAppDispatch } from "../redux/store";
import { addTask } from "../redux/features/task/taskSlice";

const AddTask = () => {
  const dispatch = useAppDispatch();
  const [openAddTask, setOpenAddTask] = useState(false);
  const [task, setTask] = useState({
    name: "",
    duration: "0",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.name || !task.duration) return;
    try {
      const newTask = {
        name: task.name,
        duration: parseInt(task.duration) * 60,
      };

      dispatch(addTask(newTask));
      setTask({ name: "", duration: "0" });
      setOpenAddTask(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ mx: "auto" }}>
      {!openAddTask ? (
        <Card
          onClick={() => setOpenAddTask(!openAddTask)}
          sx={{
            m: "1rem auto",
            width: "258px",
            height: "90px",
            background: "white",
            borderRadius: "0.5rem",
            border: "2px dashed gray",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "lightgrey",
            "&:hover": { cursor: "pointer", backgroundColor: "gray", border: "2px dashed lightgrey", opacity: "0.7" },
          }}
        >
          <AddIcon sx={{ color: "text.secondary" }} />
          <Typography variant="body2" color="textSecondary">
            Add Task
          </Typography>
        </Card>
      ) : (
        <Card
          component="form"
          onSubmit={handleSubmit}
          sx={{
            m: "1rem auto",
            width: "258px",
            background: "white",
            borderRadius: "0.5rem",
            border: "2px dashed gray",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: "0.5rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              size="small"
              label="task name"
              value={task.name}
              required
              onChange={(e) => setTask({ ...task, name: e.target.value })}
              sx={{ my: "0.5rem" }}
            />
          </Box>
          <TextField
            type="number"
            size="small"
            label="duration (minutes)"
            value={task.duration}
            required
            onChange={(e) => setTask({ ...task, duration: e.target.value })}
            InputProps={{
              inputProps: { min: 1 },
            }}
            sx={{ my: "0.5rem" }}
          />
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
            <Button size="small" variant="contained" sx={{ ml: "0.3rem" }} onClick={() => setOpenAddTask(!openAddTask)}>
              Cancel
            </Button>
            <Button size="small" variant="contained" type="submit">
              Add
            </Button>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default AddTask;