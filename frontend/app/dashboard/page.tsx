"use client";
import { TaskInput } from "@/components/tasks/types";
import { useTasks } from "@/components/tasks/hooks";
import {
  Anchor,
  Button,
  LoadingOverlay,
  Table,
  Text,
  Box,
  Stack,
  Flex,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import dayjs from "dayjs";
import { Bounce, toast } from "react-toastify";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

type TaskCardProps = {
  task: TaskInput;
};

export default function DashboradPage() {
  const { data, isLoading } = useTasks();

  const rows = data?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>
        <Anchor size="sm" href={`/tasks/${element.id}`} target="_blank">
          {element.title}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Box w={300}>
          <Text truncate="end">{element.description}</Text>
        </Box>
      </Table.Td>
      <Table.Td>{element.scheduledTime}</Table.Td>
      <Table.Td>
        {element.deadline ? dayjs(element.deadline).format("YYYY/MM/DD") : ""}
      </Table.Td>
    </Table.Tr>
  ));

  console.log(rows?.length);

  if (isLoading) {
    return <LoadingOverlay></LoadingOverlay>;
  }
  return (
    <Stack>
      <Table stickyHeader>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>タスク名</Table.Th>
            <Table.Th>内容</Table.Th>
            <Table.Th>時間</Table.Th>
            <Table.Th>期限</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        <Table.Caption></Table.Caption>
      </Table>
      <Flex mt="lg" mx="xs" justify="flex-end" align="center">
        <Button component="a" href="/tasks/new" rightSection={<IconPlus />}>
          新規追加する
        </Button>
      </Flex>
    </Stack>
  );
}
