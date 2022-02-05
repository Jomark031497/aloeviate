import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TaskCard from "./TaskCard";

const Tasks: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.tasks);

  return <>{data && data.map((task) => <TaskCard task={task} key={task._id} />)}</>;
};

export default Tasks;
