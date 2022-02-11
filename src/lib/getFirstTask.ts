import { ITask } from "./types";

export default function getFirstTask(tasks: ITask[]) {
  if (!tasks.length) return;
  const filterIncompleteTasks = tasks.filter((task) => !task.isCompleted);
  if (!filterIncompleteTasks.length) return;
  return filterIncompleteTasks[0];
}
