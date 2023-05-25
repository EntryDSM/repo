import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryOption = new QueryClient({});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className=" [&_*]:font-['Pretendard-Regular'] [&_*]:leading-tight">
      <QueryClientProvider client={queryOption}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}
