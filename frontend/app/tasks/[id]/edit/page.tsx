"use client";

import { postTask } from "@/api/requests/task/postTask";
import { putTask } from "@/api/requests/task/putTask";
import TaskCard from "@/components/tasks/TaskCard";
import { useTask } from "@/components/tasks/hooks";
import { TaskInput } from "@/components/tasks/types";
import { LoadingOverlay, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function TaskInputPage({ params }: { params: { id: number } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useTask({ id: params.id });
  if (isLoading || !data) {
    return <LoadingOverlay></LoadingOverlay>;
  }

  const onSubmit = (form: TaskInput) => {
    console.log("onSubmit");
    console.log(form);
    setLoading(true);
    putTask({ task: form })
      .then(() => {
        router.push("/dashboard");
        toast("作成できました！");
      })
      .catch(() => {
        toast.error("保存に失敗しました。");
        setLoading(false);
      });
  };

  return (
    <Stack justify="center" h="100%">
      <TaskCard
        task={data}
        onSubmit={onSubmit}
        readonly={false}
        loading={loading}
      />
    </Stack>
  );
}
