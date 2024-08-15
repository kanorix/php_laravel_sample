import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "persist-auth",
  storage: typeof window === "undefined" ? undefined : window.sessionStorage,
});

export type AuthUser = {
  email: string;
};

export const authState = atom<AuthUser | null>({
  key: "auth",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
