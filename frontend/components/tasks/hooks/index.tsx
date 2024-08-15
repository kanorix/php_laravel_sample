import client from "@/api/client";
import { TaskInput } from "@/components/tasks/types";
import { SnakeToCamel, toCamelCase } from "@/utils/snakeToCamel";
import useSWR from "swr";

const fetcher = (url: string) => client.get(url).then((res) => res.data);

export type Task = {
  id: number;
  // user_id: number;
  title: string;
  description: string;
  status: number;
  scheduled_time: number;
  deadline: Date | null;
  tags: string[];
};

const initialTask: TaskInput = {
  title: "",
  deadline: null,
  scheduledTime: 0,
  status: 0,
  description: "",
  tags: [],
};

export const useTasks = () => {
  const { data, isLoading } = useSWR<Task[]>("/api/tasks", fetcher);
  return {
    data: data
      ? data.map(toCamelCase).map((e) => {
          return { ...e, deadline: e.deadline ? new Date(e.deadline) : null };
        })
      : undefined,
    isLoading,
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
  data?: SnakeToCamel<Task>;
  isLoading: boolean;
} => {
  const { data, isLoading } = useSWR<Task>(`/api/tasks/${id}`, fetcher);
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
    data: task,
    isLoading,
  };
};
