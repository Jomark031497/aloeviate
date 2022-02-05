import { Card, CardContent, Box, Typography, CardActions, Button } from "@mui/material";
import { minsToTimeFormat } from "../lib/timerFormatter";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { ITask } from "../lib/types";

interface IProps {
  task: ITask;
}

const TaskCard: React.FC<IProps> = ({ task }) => {
  const handleDelete = () => {};

  const handleComplete = () => {};

  const handleReset = () => {};
  return (
    <Card sx={{ m: "0 auto 0.5rem auto", width: 260, height: 90, background: task.isCompleted ? "lightgreen" : "" }}>
      <CardContent sx={{ display: "flex", height: "100%", padding: 0, "&:last-child": { paddingBottom: 0 } }}>
        <Box
          sx={{ flex: 0.4, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Box>
              <AssignmentIcon sx={{ fontSize: "2rem" }} />
            </Box>
            <Typography variant="body2">{minsToTimeFormat(task.duration)}</Typography>
          </Box>
        </Box>
        <Box sx={{ flex: 1, p: "0.5rem", display: "flex", flexDirection: "column", width: "20%" }}>
          <Box sx={{ height: "80%", display: "flex", alignItems: "center" }}>
            <Typography variant="body2" noWrap onClick={() => console.log("im clicked")}>
              {task.name}
            </Typography>
          </Box>

          <CardActions disableSpacing sx={{ height: "20%", display: "flex", justifyContent: "space-between", p: 0 }}>
            <Button size="small" sx={{ fontSize: "0.6rem", p: 0, minWidth: 0 }} onClick={handleDelete}>
              DELETE
            </Button>
            <Button size="small" sx={{ fontSize: "0.6rem", p: 0, minWidth: 0 }} onClick={handleReset}>
              RESET
            </Button>
            <Button size="small" sx={{ fontSize: "0.6rem", p: 0, minWidth: 0 }} onClick={handleComplete}>
              COMPLETE
            </Button>
            <Button size="small" sx={{ fontSize: "0.6rem", p: 0, minWidth: 0 }}></Button>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
