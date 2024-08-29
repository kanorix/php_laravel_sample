import client from "@/api/client";
import { TaskInput } from "@/components/tasks/types";
import { toSnakeCase } from "@/utils/snakeToCamel";

export const putTask = ({
  task,
}: {
  task: Partial<TaskInput>;
}): Promise<TaskInput> => {
  return client.put(`/api/tasks/${task.id}`, toSnakeCase(task));
};
