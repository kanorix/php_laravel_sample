import { Table } from "@mantine/core";

type TaskHeaderProps = {};

export default function TaskHeader({}: TaskHeaderProps) {
  return (
    <Table.Thead>
      <Table.Tr>
        <Table.Th>ID</Table.Th>
        <Table.Th>タスク名</Table.Th>
        <Table.Th>内容</Table.Th>
        <Table.Th>時間</Table.Th>
        <Table.Th>期限</Table.Th>
        <Table.Th>ステータス</Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
}
