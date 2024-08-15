"use client";

import { postLogout } from "@/api/requests/logout/postLogout";
import { authState } from "@/state/authState";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useRecoilState(authState);
  // const onClick = async () => {
  //   setLoading(true);
  //   let res: any;
  //   try {
  //     res = await postLogin({ email: email, password: password });
  //     console.debug(authUser);
  //   } catch (e) {
  //     console.debug(e);
  //   }
  //   if (res && res.status === 200) {
  //     setAuthUser({ email: email });
  //   }
  //   setLoading(false);
  //   // postLogout();
  // };

  // console.log(authUser);
  // useEffect(() => {
  //   if (authUser) redirect("/");
  // }, [authUser]);

  const onSubmit = async () => {
    setLoading(true);
    const result = await signIn("user", {
      redirect: false,
      email: email,
      password: password,
    });

    if (result?.error) {
      // ログイン失敗時処理
      console.log(result?.error);
      setLoading(false);
    } else {
      // ログイン成功時トップページへリダイレクト
      location.href = "/dashboard";
    }
  };

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Group justify="space-between" mt="lg">
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button
          fullWidth
          mt="xl"
          onClick={onSubmit}
          loading={loading}
          disabled={loading}
        >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
