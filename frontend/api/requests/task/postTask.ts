import client from "@/api/client";
import { TaskInput } from "@/components/tasks/types";

export const postTask = ({ task }: { task: TaskInput }): Promise<TaskInput> => {
  return client.post("/api/tasks", {
    ...task,
    scheduled_time: task.scheduledTime,
  });
};
