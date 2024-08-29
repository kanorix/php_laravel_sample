import { STATUS } from "@/components/tasks/SelectStatus";
import { Center, Loader, MantineSize, Select } from "@mantine/core";
import { useState } from "react";

type SelectStatusAsyncProps = {
  initialStatus: number;
  loading: boolean;
  onChangeStatus: (value: number, notifySuccess: () => void) => void;
  size: "xs" | "sm";
};

export default function SelectStatusAsync({
  loading,
  initialStatus,
  onChangeStatus,
  size,
}: SelectStatusAsyncProps) {
  const [status, setStatus] = useState(initialStatus);

  if (loading) {
    return (
      <Center h={size == "xs" ? "30px" : "36px"}>
        <Loader color="blue" size="xs" type="bars" />
      </Center>
    );
  }

  return (
    <Select
      size={size}
      data={STATUS}
      defaultValue={status.toString()}
      onChange={(value: string | null) => {
        const status = Number(value ?? 0);
        onChangeStatus(status, () => setStatus(status));
      }}
    />
  );
}
