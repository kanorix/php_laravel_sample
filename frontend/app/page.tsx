"use client";

import { authState } from "@/state/authState";
import { redirect } from "next/navigation";
import { useRecoilValue } from "recoil";

export default function HomePage() {
  const authUser = useRecoilValue(authState);
  // if (!authUser) redirect(`/login`);
  return <div>Home page</div>;
}
