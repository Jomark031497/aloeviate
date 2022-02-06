import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TaskCard from "./TaskCard";

const Tasks: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <>{data && data.map((task) => <TaskCard task={task} key={task._id} />)}</>;
};

export default Tasks;
