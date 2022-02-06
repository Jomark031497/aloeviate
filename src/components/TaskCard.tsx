import { Card, CardContent, Box, Typography, CardActions } from "@mui/material";
import { minsToTimeFormat } from "../lib/timerFormatter";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { ITask } from "../lib/types";
import { useAppDispatch } from "../redux/store";
import { deleteTask, updateTask } from "../redux/features/task/taskSlice";
import CButton from "./custom/CButton";
import ColWrapper from "./custom/ColWrapper";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

interface IProps {
  task: ITask;
}

const TaskCard: React.FC<IProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    try {
      dispatch(deleteTask(task._id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const payload: ITask = {
        ...task,
        isCompleted: true,
      };
      await dispatch(updateTask(payload));
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = async () => {
    try {
      const payload: ITask = {
        ...task,
        isCompleted: false,
        elapsed: 0,
      };
      await dispatch(updateTask(payload));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      sx={{
        m: "10px auto",
        width: 260,
        height: 90,
        backgroundColor: "background.default",
      }}
    >
      <CardContent sx={{ display: "flex", height: "100%", padding: 0, "&:last-child": { paddingBottom: 0 } }}>
        <ColWrapper sx={{ flex: 0.4 }}>
          <ColWrapper>
            {task.isCompleted ? (
              <CheckBoxIcon sx={{ fontSize: "2rem", display: "block", color: "success.main" }} />
            ) : (
              <AssignmentIcon sx={{ fontSize: "2rem", display: "block" }} />
            )}

            <Typography variant="body2">{minsToTimeFormat(task.duration)}</Typography>
          </ColWrapper>
        </ColWrapper>
        <Box sx={{ flex: 1, p: "0.5rem", display: "flex", flexDirection: "column", width: "20%" }}>
          <Box sx={{ height: "80%", display: "flex", alignItems: "center" }}>
            <Typography variant="body2" noWrap sx={{ textDecoration: task.isCompleted ? "line-through" : "" }}>
              {task.name}
            </Typography>
          </Box>

          <CardActions disableSpacing sx={{ height: "20%", display: "flex", justifyContent: "space-between", p: 0 }}>
            <CButton color="error" sx={{ fontSize: "0.6rem", px: 1, minWidth: 0 }} onClick={handleDelete}>
              DELETE
            </CButton>
            <CButton
              color="success"
              disabled={task.isCompleted}
              sx={{
                fontSize: "0.6rem",
                px: 1,
                minWidth: 0,
              }}
              onClick={handleUpdate}
            >
              COMPLETE
            </CButton>
            <CButton color="secondary" sx={{ fontSize: "0.6rem", px: 1, minWidth: 0 }} onClick={handleReset}>
              RESET
            </CButton>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
