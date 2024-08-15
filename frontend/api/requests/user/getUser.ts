import client from "@/api/client";

export const getUser = () => {
  return client.get("/api/user");
};
