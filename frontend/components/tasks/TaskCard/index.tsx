"use client";

import { TaskInput, schema } from "@/components/tasks/types";
import {
  Card,
  TextInput,
  Text,
  Textarea,
  TagsInput,
  Button,
  Flex,
  Image,
  Space,
} from "@mantine/core";
import { DateInput, DatePicker } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";

import {
  IconDeviceFloppy,
  IconPencilMinus,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";

type TaskCardProps = {
  task: TaskInput;
  onSubmit?: (task: TaskInput) => void;
  onDelete?: (task: TaskInput) => void;
  readonly: boolean;
  loading: boolean;
};

export default function TaskCard({
  task,
  onSubmit,
  onDelete,
  readonly,
  loading,
}: TaskCardProps) {
  const form = useForm<TaskInput>({
    initialValues: task,
    validate: zodResolver(schema),
  });

  return (
    <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)">
      <Card.Section>
        <Image
          h={300}
          src={`https://randomfox.ca/images/${task?.id ?? 65 % 100}.jpg`}
          height={160}
          alt="Norway"
        />
      </Card.Section>
      <Text mt="lg" fz="xs" tt="uppercase" fw={700} c="dimmed">
        {!task.id ? "new task" : `task-${task.id}`}
      </Text>
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(form.validate());
        }}
      > */}
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          m="xs"
          label="タスク名"
          placeholder="タスク名を入力…"
          withAsterisk
          variant={readonly ? "unstyled" : "default"}
          readOnly={readonly}
          {...form.getInputProps("title")}
        />
        <DateInput
          m="xs"
          label="期限"
          placeholder={readonly ? "期限なし" : "期限を入力…"}
          valueFormat="YYYY/MM/DD"
          clearable
          variant={readonly ? "unstyled" : "default"}
          readOnly={readonly}
          {...form.getInputProps("deadline")}
        />
        <Textarea
          m="xs"
          label="内容"
          placeholder={readonly ? "内容なし" : "タスクの内容を記載…"}
          minRows={5}
          autosize
          variant={readonly ? "unstyled" : "default"}
          readOnly={readonly}
          {...form.getInputProps("description")}
        />
        <TagsInput
          m="xs"
          label=" タグ"
          placeholder={readonly ? "タグなし" : "タグを入力…"}
          variant={readonly ? "unstyled" : "default"}
          readOnly={readonly}
          {...form.getInputProps("tags")}
        />

        <Flex mt="lg" mx="xs" justify="flex-end" align="center">
          {!readonly && !task.id && (
            <Button type="submit" rightSection={<IconPlus />} loading={loading}>
              作成する
            </Button>
          )}
          {!readonly && task.id && (
            <Button
              type="submit"
              rightSection={<IconDeviceFloppy />}
              loading={loading}
            >
              更新する
            </Button>
          )}
        </Flex>
        {readonly && (
          <Flex mt="lg" mx="xs" justify="space-between" align="center">
            <Button
              rightSection={<IconTrash />}
              loading={loading}
              color="red"
              onClick={() => onDelete?.(task)}
            >
              削除する
            </Button>
            <Button
              component="a"
              href={`/tasks/${task.id}/edit`}
              rightSection={<IconPencilMinus />}
              loading={loading}
            >
              変更する
            </Button>
          </Flex>
        )}
      </form>
    </Card>
  );
}
