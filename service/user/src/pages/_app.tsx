import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [isView, setView] = useState<boolean>(false);
  useEffect(() => setView(true), []);

  return (
    isView && (
      <div className=" [&_*]:font-['Pretendard-Regular'] [&_*]:leading-tight">
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ToastContainer autoClose={1000} />
        </QueryClientProvider>
      </div>
    )
  );
}
