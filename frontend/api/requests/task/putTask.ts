import client from "@/api/client";
import { TaskInput } from "@/components/tasks/types";

export const putTask = ({ task }: { task: TaskInput }): Promise<TaskInput> => {
  return client.put(`/api/tasks/${task.id}`, task);
};
