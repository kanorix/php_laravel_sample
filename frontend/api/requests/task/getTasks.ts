import client from "@/api/client";

export const getTasks = (): Promise<any> => {
  return client.get("/api/tasks");
};
