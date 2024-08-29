import {
  Center,
  Loader,
  MantineSize,
  Select,
  SelectProps,
  TextInput,
} from "@mantine/core";
import { useState } from "react";

export const STATUS = [
  { value: "0", label: "TODO" },
  { value: "1", label: "WIP" },
  { value: "2", label: "DONE" },
];

// めんどくさいのでanyで誤魔化します
export default function SelectStatus(props: any) {
  if (props.readOnly) {
    return (
      <TextInput
        {...props}
        variant="unstyled"
        readOnly={true}
        value={STATUS.filter((s) => s.value == props.value)[0].label}
      />
    );
  }
  return <Select {...props} data={STATUS} value={`${props.value}`} />;
}
