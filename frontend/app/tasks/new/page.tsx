"use client";

import { postTask } from "@/api/requests/task/postTask";
import { TaskInput } from "@/components/tasks/types";
import TaskCard from "@/components/tasks/TaskCard";
import { Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function TaskInputPage({ params }: { params: { id: number } }) {
  const data: TaskInput = {
    title: "",
    deadline: null,
    scheduledTime: 0,
    status: 0,
    description: "",
    tags: [],
  };
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onSubmit = (form: TaskInput) => {
    console.log("onSubmit");
    setLoading(true);
    postTask({ task: form })
      .catch(() => {
        toast.error("保存に失敗しました。");
        setLoading(false);
      })
      .then(() => {
        router.push("/dashboard");
        toast("作成できました！");
      });
  };
  return (
    <Stack justify="center" h="80vh">
      <TaskCard
        task={data}
        onSubmit={onSubmit}
        readonly={false}
        loading={loading}
      />
    </Stack>
  );
}
