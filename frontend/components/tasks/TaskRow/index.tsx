"use client";

import { putTask } from "@/api/requests/task/putTask";
import SelectStatusAsync from "@/components/tasks/SelectStatusAsync";
import { Task } from "@/components/tasks/types";
import { Text, Anchor, Table, Box } from "@mantine/core";

import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";

type TaskRowProps = {
  task: Task;
};

const truncate = (value: string, length: number) => {
  return value.length <= length ? value : value.substr(0, length) + "...";
};

export default function TaskRow({ task }: TaskRowProps) {
  const [loading, setLoading] = useState(false);
  const onChangeStatus = (value: number, notifySuccess: () => void) => {
    console.log("onSubmit");

    setLoading(true);
    putTask({ task: { id: task.id, status: value } })
      .then(() => {
        // ステータス変更が成功した場合、成功を子コンポーネントに通知する関数を呼ぶ
        notifySuccess();
      })
      .catch(() => {
        toast.error("保存に失敗しました。");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Table.Tr key={task.id}>
      <Table.Td>{task.id}</Table.Td>
      <Table.Td>
        <Anchor size="sm" href={`/tasks/${task.id}`} target="_blank">
          {truncate(task.title, 20)}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Box w={300}>
          <Text truncate="end">{task.description}</Text>
        </Box>
      </Table.Td>
      <Table.Td>{task.scheduledTime && `${task.scheduledTime} h`}</Table.Td>
      <Table.Td>
        {task.deadline ? dayjs(task.deadline).format("YYYY/MM/DD") : ""}
      </Table.Td>
      <Table.Td width="120px">
        <SelectStatusAsync
          size="xs"
          initialStatus={task.status}
          loading={loading}
          onChangeStatus={onChangeStatus}
        />
      </Table.Td>
    </Table.Tr>
  );
}
