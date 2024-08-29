import { SnakeToCamel } from "@/utils/snakeToCamel";
import { z } from "zod";

export const schema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: "タスク名は必須です。" }),
  status: z.coerce.number(),
  deadline: z
    .date()
    .nullable()
    .refine((data) => !data || data > new Date(), {
      message: "期限は未来日にしてください。",
    }),
  scheduledTime: z.coerce.number().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type TaskInput = z.infer<typeof schema>;

export type TaskResult = {
  id: number;
  // user_id: number;
  title: string;
  description: string;
  scheduled_time: number;
  status: number;
  deadline: Date | null;
  tags: string[];
};

export type Task = SnakeToCamel<TaskResult>;
