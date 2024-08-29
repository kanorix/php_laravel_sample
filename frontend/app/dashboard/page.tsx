"use client";
import { TaskInput } from "@/components/tasks/types";
import { useTasks } from "@/components/tasks/hooks";
import {
  Button,
  Table,
  Text,
  Stack,
  Flex,
  ScrollArea,
  Center,
  Title,
  Box,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import TaskRow from "@/components/tasks/TaskRow";
import TaskHeader from "@/components/tasks/TaskHeader";
import Loading from "@/components/common/Loading";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

type TaskCardProps = {
  task: TaskInput;
};

export default function DashboradPage() {
  const { data, isLoading, error } = useTasks();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Flex direction="column" align="center">
        <Box>
          <Title>エラーが発生しました</Title>
        </Box>
        <Box>{error instanceof Error && error.message}</Box>
        <Box>{!(error instanceof Error) && JSON.stringify(error)}</Box>
      </Flex>
    );
  }

  const rows = data?.map((element) => (
    <TaskRow key={element.id} task={element} />
  ));

  return (
    <Stack>
      <Flex mx="xs" justify="flex-end" align="center">
        <Button component="a" href="/tasks/new" rightSection={<IconPlus />}>
          新規追加する
        </Button>
      </Flex>
      {!data?.length || (
        <ScrollArea>
          <Table stickyHeader>
            <TaskHeader />
            <Table.Tbody>{rows}</Table.Tbody>
            <Table.Caption></Table.Caption>
          </Table>
        </ScrollArea>
      )}
      {!!data?.length || (
        <Center>
          <Text>「新規作成」から新しいタスクを作成できます！</Text>
        </Center>
      )}
    </Stack>
  );
}
