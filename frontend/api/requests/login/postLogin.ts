import client from "@/api/client";
import { cookies } from "next/headers";

type PostLoginParam = {
  email: string;
  password: string;
};

export const postLogin = async (param: PostLoginParam) => {
  const csrfCookies = await client.get("/sanctum/csrf-cookie");
  const xsrf = csrfCookies.headers["set-cookie"] as string[];
  // const token = decodeURIComponent(xsrf[0].split(";")[0].split("=")[1]);
  console.table(param);

  cookies().set(
    "XSRF-TOKEN",
    decodeURIComponent(xsrf[0].split(";")[0].split("=")[1]),
    {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    }
  );
  cookies().set(
    "laravel_session",
    decodeURIComponent(xsrf[1].split(";")[0].split("=")[1]),
    {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    }
  );
  const rsp = await client.post("/login", param, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(rsp);

  return rsp;

  // const loginCookies = login.headers["set-cookie"] as string[];
  // console.log("-----");
  // console.log(loginCookies);
  // console.log("-----");
  // const xsrfToken = decodeURIComponent(loginCookies[0]);
  // const sessionToken = decodeURIComponent(loginCookies[1]);
  // return {
  //   xsrfToken,
  //   sessionToken,
  // };
};
