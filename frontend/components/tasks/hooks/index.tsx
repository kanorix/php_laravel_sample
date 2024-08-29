import client from "@/api/client";
import { Task, TaskInput, TaskResult } from "@/components/tasks/types";
import { SnakeToCamel, toCamelCase } from "@/utils/snakeToCamel";
import useSWR from "swr";

const fetcher = (url: string) => client.get(url).then((res) => res.data);

const initialTask: TaskInput = {
  title: "",
  deadline: null,
  scheduledTime: 0,
  status: 0,
  description: "",
  tags: [],
};

export const useTasks = () => {
  const { data, isLoading, error } = useSWR<TaskResult[]>(
    "/api/tasks",
    fetcher
  );
  return {
    data: data
      ? data.map(toCamelCase).map((e) => {
          return { ...e, deadline: e.deadline ? new Date(e.deadline) : null };
        })
      : undefined,
    isLoading,
    error,
  };
};

function removeNulls<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null)
  ) as Partial<T>;
}

export const useTask = ({
  id,
}: {
  id: number;
}): {
  data?: TaskInput;
  isLoading: boolean;
} => {
  const { data, isLoading } = useSWR<TaskResult>(`/api/tasks/${id}`, fetcher);
  if (!data) {
    return {
      data: undefined,
      isLoading,
    };
  }
  const cameledTask = removeNulls(toCamelCase(data));

  console.log(cameledTask);
  const task = {
    id: id,
    ...initialTask,
    ...cameledTask,
    deadline: cameledTask.deadline ? new Date(cameledTask.deadline) : null,
  };
  return {
    data: task as TaskInput,
    isLoading,
  };
};
