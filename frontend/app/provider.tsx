"use client";

import { RecoilRoot } from "recoil";
import { ReactNode } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/theme";

const Providers = ({ children }: { children: ReactNode }) => (
  <RecoilRoot>
    <MantineProvider theme={theme}>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </MantineProvider>
  </RecoilRoot>
);

export default Providers;
