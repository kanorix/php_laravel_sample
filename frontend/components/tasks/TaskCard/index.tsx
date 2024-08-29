"use client";

import SelectStatus from "@/components/tasks/SelectStatus";
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
  ScrollArea,
  Breadcrumbs,
  Anchor,
  Grid,
} from "@mantine/core";
import { DateInput, DatePicker } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";

import {
  IconDeviceFloppy,
  IconPencilMinus,
  IconPlus,
  IconTrash,
  IconArrowBackUp,
} from "@tabler/icons-react";
import { memo, useCallback } from "react";

type TaskCardProps = {
  task: TaskInput;
  onSubmit?: (task: TaskInput) => void;
  onDelete?: (task: TaskInput) => void;
  readonly: boolean;
  loading: boolean;
};

const FoxImage = memo(function FoxImage({ taskId }: { taskId?: number }) {
  return (
    <Image
      h={300}
      src={`https://randomfox.ca/images/${taskId ?? 65 % 100}.jpg`}
      height={120}
      alt="Norway"
    />
  );
});

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
  const handleDelete = useCallback(
    (onDeleteFn?: (task: TaskInput) => void) => {
      const result = prompt(
        `削除するには「task-${task.id}」と入力してください。`
      );
      if (result == null) {
        // キャンセルが押下された
        return;
      }

      if (result !== `task-${task.id}`) {
        alert("入力値が異なります。");
        return;
      }
      return onDeleteFn?.(task);
    },
    [task]
  );

  return (
    <ScrollArea type="auto" scrollbarSize={4}>
      <Breadcrumbs mb={5}>
        <Anchor href="/dashboard">タスク一覧に戻る</Anchor>
      </Breadcrumbs>
      <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)">
        <Card.Section>
          <FoxImage taskId={task?.id} />
        </Card.Section>
        <Text mt="lg" fz="xs" tt="uppercase" fw={700} c="dimmed">
          {!task.id ? "new task" : `task-${task.id}`}
        </Text>
        <form onSubmit={onSubmit != null ? form.onSubmit(onSubmit) : undefined}>
          <Grid align="flex-start">
            <Grid.Col span={8}>
              <TextInput
                m="xs"
                label="タスク名"
                placeholder="タスク名を入力…"
                withAsterisk
                variant={readonly ? "unstyled" : "default"}
                readOnly={readonly}
                {...form.getInputProps("title")}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <SelectStatus
                m="xs"
                label="ステータス"
                readOnly={readonly}
                {...form.getInputProps("status")}
              />
            </Grid.Col>
          </Grid>
          <Grid align="flex-start">
            <Grid.Col span={4}>
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
            </Grid.Col>
            <Grid.Col span={2}>
              <TextInput
                m="xs"
                type="number"
                label="予定時間"
                placeholder={readonly ? "予定時間なし" : "予定時間を入力…"}
                variant={readonly ? "unstyled" : "default"}
                readOnly={readonly}
                rightSection={<Text>h</Text>}
                {...form.getInputProps("scheduledTime")}
              />
            </Grid.Col>
          </Grid>

          <Textarea
            m="xs"
            label="内容"
            placeholder={readonly ? "内容なし" : "タスクの内容を記載…"}
            minRows={2}
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

          {!readonly && (
            <Flex mt="lg" mx="xs" justify="space-between" align="center">
              <Button
                component="a"
                rightSection={<IconArrowBackUp />}
                loading={loading}
                variant="outline"
                color="orange"
                href={`/tasks/${task.id}`}
              >
                戻る
              </Button>

              {!task.id && (
                <Button
                  type="submit"
                  rightSection={<IconPlus />}
                  loading={loading}
                >
                  作成する
                </Button>
              )}
              {task.id && (
                <Button
                  type="submit"
                  rightSection={<IconDeviceFloppy />}
                  loading={loading}
                >
                  更新する
                </Button>
              )}
            </Flex>
          )}

          {readonly && (
            <Flex mt="lg" mx="xs" justify="space-between" align="center">
              <Button
                rightSection={<IconTrash />}
                loading={loading}
                color="red"
                onClick={() => handleDelete(onDelete)}
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
    </ScrollArea>
  );
}
