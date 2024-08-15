import { z } from "zod";

export type TaskInput = {
  id?: number;
  title: string;
  deadline: Date | null;
  scheduledTime: number;
  status: number;
  description: string;
  tags: string[];
};

export const schema = z.object({
  title: z.string().min(1, { message: "タスク名は必須です。" }),
  deadline: z
    .date()
    .nullable()
    .refine((data) => !data || data > new Date(), {
      message: "期限は未来日にしてください。",
    }),
  scheduledTime: z.number().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
