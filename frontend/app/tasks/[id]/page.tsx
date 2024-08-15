"use client";

import { deleteTask } from "@/api/requests/task/deleteTask";
import TaskCard from "@/components/tasks/TaskCard";
import { useTask } from "@/components/tasks/hooks";
import { TaskInput } from "@/components/tasks/types";
import { LoadingOverlay, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function TaskInputPage({ params }: { params: { id: number } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useTask({ id: params.id });
  if (isLoading || !data) {
    return <LoadingOverlay></LoadingOverlay>;
  }

  const onDelete = (form: TaskInput) => {
    console.log("onDelete");
    setLoading(true);
    deleteTask({ task: form })
      .catch(() => {
        toast.error("削除に失敗しました。");
        setLoading(false);
      })
      .then(() => {
        router.push("/dashboard");
        toast("削除できました！");
      });
  };

  return (
    <Stack justify="center" h="80vh">
      <TaskCard
        task={data}
        onDelete={onDelete}
        readonly={true}
        loading={loading}
      />
    </Stack>
  );
}
