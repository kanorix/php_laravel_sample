import client from "@/api/client";

export const postLogout = () => {
  return client.post("/logout", {});
};
