import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { randomUUID, randomBytes } from "crypto";
import { postLogin } from "@/api/requests/login/postLogin";
import { cookies } from "next/headers";

const handler = NextAuth({
  /* providers */
  providers: [
    // ユーザ用認証
    CredentialsProvider({
      id: "user",
      name: "User",
      credentials: {
        email: {
          label: "メールアドレス",
          type: "email",
          placeholder: "メールアドレス",
        },
        password: { label: "パスワード", type: "password" },
      },
      authorize: async (credentials: any, req: any) => {
        try {
          const token = await postLogin({
            email: credentials.email,
            password: credentials.password,
          });
          // cookies().set("XSRF-TOKEN", token);
        } catch (error) {
          console.log(error);
          return null;
        }

        return {
          id: "aaaa",
        };
      },
    }),
  ],

  /* secret */
  secret: process.env.NEXTAUTH_SECRET,

  /* jwt */
  jwt: {
    maxAge: 3 * 24 * 60 * 60, // 3 days
  },

  /* session */
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },

  pages: {
    signIn: "login",
    error: "login",
  },
});

export { handler as GET, handler as POST };
