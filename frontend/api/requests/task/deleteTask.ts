import client from "@/api/client";
import { TaskInput } from "@/components/tasks/types";

export const deleteTask = ({
  task,
}: {
  task: TaskInput;
}): Promise<TaskInput> => {
  return client.delete(`/api/tasks/${task.id}`);
};
